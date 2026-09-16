import re

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add focusPoint to SvgViewport
viewport_target = '''  focusRoom(room) {
    const targetW = Math.max(room.w * 3.5, 240);
    const targetH = targetW * (this.base.h / this.base.w);
    this.current = {
      x: room.cx - targetW / 2,
      y: room.cy - targetH / 2,
      w: targetW,
      h: targetH
    };
    this.updateViewBox();
  }'''

viewport_replacement = '''  focusPoint(x, y, zoomWidth = 260) {
    const targetW = zoomWidth;
    const targetH = targetW * (this.base.h / this.base.w);
    this.current = {
      x: x - targetW / 2,
      y: y - targetH / 2,
      w: targetW,
      h: targetH
    };
    this.updateViewBox();
  }

  focusRoom(room) {
    const targetW = Math.max(room.w * 3.5, 240);
    const targetH = targetW * (this.base.h / this.base.w);
    this.current = {
      x: room.cx - targetW / 2,
      y: room.cy - targetH / 2,
      w: targetW,
      h: targetH
    };
    this.updateViewBox();
  }'''

if 'focusPoint(x, y' not in code:
    assert viewport_target in code, "Could not find focusRoom in SvgViewport"
    code = code.replace(viewport_target, viewport_replacement, 1)

# 2. Add Campus GPS Reference & Distance calculation functions
gps_constants_and_helpers = '''
// ==========================================================================
// 7C. GEOGRAPHIC CAMPUS GPS PROJECTION & ACCURATE AUTO-DETECT
// ==========================================================================
const CAMPUS_GPS = {
  lat: 9.0945,      // Latitude of Main Entrance Porch (GAD-PR)
  lng: 76.4918,     // Longitude of Main Entrance Porch (GAD-PR)
  svgX: 374,        // SVG X of GAD-PR entrance door
  svgY: 810,        // SVG Y of GAD-PR entrance door
  mPerDegLat: 111139,
  mPerDegLng: 109742,
  svgUnitsPerMeter: 2.5 // 1 SVG unit ≈ 0.4 m -> 2.5 SVG units per meter
};

function haversineDistMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

let locationWatchId = null;
function startLocationWatcher() {
  if (!navigator.geolocation || locationWatchId !== null) return;
  locationWatchId = navigator.geolocation.watchPosition(
    (pos) => {
      const distFromCampus = haversineDistMeters(pos.coords.latitude, pos.coords.longitude, CAMPUS_GPS.lat, CAMPUS_GPS.lng);
      if (distFromCampus <= 1500) {
        processGPSCoords(pos.coords, true);
      }
    },
    (err) => {
      console.warn('WatchPosition notification:', err.message);
    },
    { enableHighAccuracy: true, maximumAge: 6000 }
  );
}

function processGPSCoords(coords, isUpdate = false) {
  const lat = coords.latitude;
  const lng = coords.longitude;
  const acc = Math.round(coords.accuracy || 8);
  const distFromCampus = haversineDistMeters(lat, lng, CAMPUS_GPS.lat, CAMPUS_GPS.lng);

  if (distFromCampus <= 1500) {
    // User is on or adjacent to Amritapuri Campus!
    const dNorth = (lat - CAMPUS_GPS.lat) * CAMPUS_GPS.mPerDegLat;
    const dEast = (lng - CAMPUS_GPS.lng) * CAMPUS_GPS.mPerDegLng;
    let svgX = Math.round(CAMPUS_GPS.svgX + dEast * CAMPUS_GPS.svgUnitsPerMeter);
    let svgY = Math.round(CAMPUS_GPS.svgY - dNorth * CAMPUS_GPS.svgUnitsPerMeter);

    // Clamp within campus building limits
    svgX = Math.max(50, Math.min(svgX, 680));
    svgY = Math.max(100, Math.min(svgY, 950));

    // Find nearest walkable waypoint
    const f0 = FLOORS_DATA[0];
    let nearestWp = null;
    let minD = Infinity;
    Object.entries(f0.waypoints).forEach(([id, wp]) => {
      if (id.startsWith('door_') || id.startsWith('wp_outdoor')) return;
      const d = Math.hypot(svgX - wp.x, svgY - wp.y);
      if (d < minD) {
        minD = d;
        nearestWp = wp;
      }
    });

    setUserLocation({
      type: 'custom',
      name: `Live GPS Location (±${acc}m)`,
      floor: 0,
      x: svgX,
      y: svgY,
      nearestWaypointId: nearestWp ? nearestWp.id : 'wp_north_exit_hub',
      accuracy: acc
    }, true, isUpdate);

    if (viewport && !isUpdate) {
      viewport.focusPoint(svgX, svgY, 260);
    }
    if (!isUpdate) {
      showToast(`📍 Live Location Detected (Accuracy ±${acc}m)`);
    }
  } else {
    // User is outside campus (remote / testing)
    const distKm = (distFromCampus / 1000).toFixed(1);
    const defaultRoom = ALL_ROOMS.find(r => r.id === 'GAD-PR');
    if (defaultRoom) {
      setUserLocation({
        type: 'room',
        roomId: defaultRoom.id,
        name: `Main Entrance (GPS: ${distKm} km away)`,
        code: defaultRoom.code,
        wing: defaultRoom.wing,
        floor: defaultRoom.floor,
        x: defaultRoom.door[0],
        y: defaultRoom.door[1],
        accuracy: acc
      });
      if (viewport && !isUpdate) {
        viewport.focusPoint(defaultRoom.door[0], defaultRoom.door[1], 280);
      }
    }
    showToast(`📍 GPS Connected (${distKm} km from campus). Start set to Main Entrance.`);
  }

  const fab = document.getElementById('myLocationFabBtn');
  if (fab) fab.classList.add('active');
}

function fallbackToCampusEntrance() {
  const defaultRoom = ALL_ROOMS.find(r => r.id === 'GAD-PR');
  if (defaultRoom) {
    setUserLocation({
      type: 'room',
      roomId: defaultRoom.id,
      name: `${defaultRoom.name} (Default)`,
      code: defaultRoom.code,
      wing: defaultRoom.wing,
      floor: defaultRoom.floor,
      x: defaultRoom.door[0],
      y: defaultRoom.door[1]
    });
    if (viewport) {
      viewport.focusPoint(defaultRoom.door[0], defaultRoom.door[1], 280);
    }
  }
}

function handleAutoDetectGPS(userInitiated = false) {
  const fab = document.getElementById('myLocationFabBtn');
  if (fab) fab.classList.add('tracking');

  if (!navigator.geolocation) {
    if (fab) fab.classList.remove('tracking');
    showToast('GPS geolocation is not supported on this device/browser.');
    fallbackToCampusEntrance();
    closeLocationModal();
    return;
  }

  if (userInitiated) {
    showToast('Requesting GPS location...');
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      if (fab) fab.classList.remove('tracking');
      processGPSCoords(pos.coords, false);
      closeLocationModal();
      startLocationWatcher();
    },
    (err) => {
      if (fab) fab.classList.remove('tracking');
      console.warn('Geolocation error / denied:', err.code, err.message);

      if (err.code === 1) { // PERMISSION_DENIED
        showToast('Location permission denied. Select your location or tap map to pinpoint.');
        if (!appState.userLocation) {
          openLocationModal();
        }
      } else {
        showToast('Indoor GPS signal low. Defaulted to Main Entrance (Reception).');
        fallbackToCampusEntrance();
        closeLocationModal();
      }
    },
    { enableHighAccuracy: true, timeout: 9000, maximumAge: 0 }
  );
}
'''

# Replace old handleAutoDetectGPS
old_auto_detect_re = r'function handleAutoDetectGPS\(\) \{[\s\S]*?\n\}'
match = re.search(old_auto_detect_re, code)
assert match is not None, "Could not find old handleAutoDetectGPS function"
code = code[:match.start()] + gps_constants_and_helpers.strip() + code[match.end():]

# Update setUserLocation to also highlight myLocationFabBtn
set_user_loc_search = "  if (!silent) {\n    showToast(`📍 Location set: ${loc.name}`);\n  }"
set_user_loc_replace = """  const myLocFab = document.getElementById('myLocationFabBtn');
  if (myLocFab) myLocFab.classList.add('active');

  if (!silent) {
    showToast(`📍 Location set: ${loc.name}`);
  }"""

if "myLocFab.classList.add('active')" not in code:
    assert set_user_loc_search in code, "Could not find showToast in setUserLocation"
    code = code.replace(set_user_loc_search, set_user_loc_replace, 1)

# Add myLocationFabBtn event listener in DOMContentLoaded
old_listeners_marker = "  const useMyLocBtn = document.getElementById('useMyLocationQuickBtn');"
new_fab_listener = """  // Floating Google Maps 'My Location' FAB
  const myLocationFab = document.getElementById('myLocationFabBtn');
  if (myLocationFab) {
    myLocationFab.addEventListener('click', () => {
      if (appState.userLocation) {
        if (appState.userLocation.floor !== appState.currentFloor) {
          switchFloor(appState.userLocation.floor);
        }
        if (viewport) {
          viewport.focusPoint(appState.userLocation.x, appState.userLocation.y, 250);
        }
        showToast(`📍 Centered on ${appState.userLocation.name}`);
        handleAutoDetectGPS(true);
      } else {
        handleAutoDetectGPS(true);
      }
    });
  }

  const useMyLocBtn = document.getElementById('useMyLocationQuickBtn');"""

if 'myLocationFabBtn' not in code[code.find('DOMContentLoaded'):]:
    assert old_listeners_marker in code, "Could not find useMyLocationQuickBtn in app.js"
    code = code.replace(old_listeners_marker, new_fab_listener, 1)

# Update the auto-prompt timeout at the bottom of DOMContentLoaded
old_prompt_tail = """  // If user location is not set, ask user with the location modal after brief delay
  if (!appState.userLocation) {
    setTimeout(() => {
      if (!appState.userLocation && !appState.currentRoute) {
        openLocationModal();
      }
    }, 750);
  }"""

new_prompt_tail = """  // Auto-request location permission like Google Maps on initial load
  setTimeout(() => {
    if (!appState.userLocation && !appState.currentRoute) {
      handleAutoDetectGPS(false);
    }
  }, 500);"""

if 'handleAutoDetectGPS(false)' not in code:
    assert old_prompt_tail in code, "Could not find old_prompt_tail in app.js"
    code = code.replace(old_prompt_tail, new_prompt_tail, 1)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(code)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully applied full GPS engine to app.js and script.js!")
