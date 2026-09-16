import re

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add svgUserLocationPin to layerNavigation
stair_pin_str = '''        <g id="svgStairPin" class="route-pin stair" style="display: none;">
          <circle cx="0" cy="0" r="10" class="stair-pin-halo" />
          <circle cx="0" cy="0" r="6" class="stair-pin-core" />
          <text id="svgStairPinText" x="0" y="2.5" class="stair-pin-icon" text-anchor="middle">▲</text>
        </g>'''

user_location_svg_pin = '''        <g id="svgStairPin" class="route-pin stair" style="display: none;">
          <circle cx="0" cy="0" r="10" class="stair-pin-halo" />
          <circle cx="0" cy="0" r="6" class="stair-pin-core" />
          <text id="svgStairPinText" x="0" y="2.5" class="stair-pin-icon" text-anchor="middle">▲</text>
        </g>
        <!-- Google Maps-style Live User Location Marker -->
        <g id="svgUserLocationPin" class="route-pin user-location" style="display: none;">
          <circle cx="0" cy="0" r="18" class="user-beacon-ripple" />
          <circle cx="0" cy="0" r="11" class="user-beacon-halo" />
          <circle cx="0" cy="0" r="6" class="user-beacon-core" />
          <g transform="translate(0, -18)">
            <rect x="-24" y="-8" width="48" height="15" rx="7.5" class="user-badge-bg" />
            <text x="0" y="2.5" class="user-badge-text" text-anchor="middle">YOU</text>
          </g>
        </g>'''

if 'id="svgUserLocationPin"' not in html:
    assert stair_pin_str in html, "Could not find stair_pin_str in index.html"
    html = html.replace(stair_pin_str, user_location_svg_pin, 1)

# Add User Location status pill to header toolbar
theme_bar_end = '''      <button id="themeLightBtn" class="pill-btn" title="Architectural Clean Light">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
        </svg>
        <span>Light</span>
      </button>
    </div>'''

user_loc_pill_bar = '''      <button id="themeLightBtn" class="pill-btn" title="Architectural Clean Light">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
        </svg>
        <span>Light</span>
      </button>
    </div>

    <!-- User Location Status Pill -->
    <div class="glass-pill-bar user-loc-bar">
      <button id="userLocationBtn" class="pill-btn user-loc-pill" title="Click to view or set your current location">
        <span class="user-loc-pulse-dot unset"></span>
        <span id="userLocationBtnLabel" class="user-loc-label">Your Location: <strong>Not Set</strong></span>
      </button>
    </div>'''

if 'id="userLocationBtn"' not in html:
    assert theme_bar_end in html, "Could not find theme_bar_end in index.html"
    html = html.replace(theme_bar_end, user_loc_pill_bar, 1)

# Add pinpointBanner right below </header>
header_end = '</header>'
pinpoint_banner_html = '''</header>

  <!-- Map Pinpoint Mode Floating Banner -->
  <div id="pinpointBanner" class="pinpoint-banner" style="display: none;">
    <div class="pinpoint-banner-content">
      <span class="pinpoint-pulse"></span>
      <span>Click anywhere on the floor plan to set your location</span>
    </div>
    <button id="cancelPinpointBtn" class="pinpoint-cancel-btn">Cancel</button>
  </div>'''

if 'id="pinpointBanner"' not in html:
    assert header_end in html, "Could not find header_end in index.html"
    html = html.replace(header_end, pinpoint_banner_html, 1)

# Replace zoom-controls with map-action-controls including myLocationFabBtn
old_zoom_html = '''  <!-- ================= 4. FLOATING ZOOM CONTROLS ================= -->
  <div class="zoom-controls">
    <button id="zoomInBtn" class="zoom-btn" title="Zoom In" aria-label="Zoom In">+</button>
    <button id="zoomOutBtn" class="zoom-btn" title="Zoom Out" aria-label="Zoom Out">&minus;</button>
  </div>'''

new_fab_zoom_html = '''  <!-- ================= 4. FLOATING MAP ACTION CONTROLS ================= -->
  <div class="map-action-controls">
    <button id="myLocationFabBtn" class="my-location-fab" title="My Location (Google Maps GPS)" aria-label="Show My Location">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="7"></circle>
        <line x1="12" y1="1" x2="12" y2="4"></line>
        <line x1="12" y1="20" x2="12" y2="23"></line>
        <line x1="1" y1="12" x2="4" y2="12"></line>
        <line x1="20" y1="12" x2="23" y2="12"></line>
        <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
      </svg>
    </button>
    <div class="zoom-controls">
      <button id="zoomInBtn" class="zoom-btn" title="Zoom In" aria-label="Zoom In">+</button>
      <button id="zoomOutBtn" class="zoom-btn" title="Zoom Out" aria-label="Zoom Out">&minus;</button>
    </div>
  </div>'''

if 'id="myLocationFabBtn"' not in html:
    assert old_zoom_html in html, "Could not find old_zoom_html in index.html"
    html = html.replace(old_zoom_html, new_fab_zoom_html, 1)

# Add directions-loc-banner and useMyLocationQuickBtn
old_dir_section = '''      <!-- DIRECTIONS SECTION -->
      <section id="directionsSection" class="directions-panel" style="display: none;">
        <div class="route-inputs-card">
          <div class="route-row">
            <span class="route-dot start" title="Starting Point"></span>
            <div class="route-select-wrapper">
              <select id="startRoomSelect" class="route-select" aria-label="Start Location">
                <option value="">Select start location...</option>
              </select>
            </div>
          </div>'''

new_dir_section = '''      <!-- DIRECTIONS SECTION -->
      <section id="directionsSection" class="directions-panel" style="display: none;">
        <!-- User Location Status / Switcher Banner in Directions -->
        <div class="directions-loc-banner">
          <div class="dir-loc-info">
            <span class="dir-loc-dot unset"></span>
            <div class="dir-loc-text-col">
              <span id="dirLocTitle" class="dir-loc-title">Your Location</span>
              <span id="dirLocSub" class="dir-loc-sub">Not set &bull; Tap to assign</span>
            </div>
          </div>
          <button id="dirLocActionBtn" class="dir-loc-btn" title="Set or change your location">Set Location</button>
        </div>

        <div class="route-inputs-card">
          <div class="route-row">
            <span class="route-dot start" title="Starting Point"></span>
            <div class="route-select-wrapper">
              <select id="startRoomSelect" class="route-select" aria-label="Start Location">
                <option value="">Select start location...</option>
              </select>
            </div>
            <button id="useMyLocationQuickBtn" class="quick-loc-btn" title="Use My Location as Start Point" aria-label="Use My Location">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="7"></circle>
                <line x1="12" y1="1" x2="12" y2="4"></line>
                <line x1="12" y1="20" x2="12" y2="23"></line>
                <line x1="1" y1="12" x2="4" y2="12"></line>
                <line x1="20" y1="12" x2="23" y2="12"></line>
                <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
              </svg>
            </button>
          </div>'''

if 'id="dirLocTitle"' not in html:
    assert old_dir_section in html, "Could not find old_dir_section in index.html"
    html = html.replace(old_dir_section, new_dir_section, 1)

# Add User Location Modal dialog before script tag
modal_html = '''  <!-- ================= 6. USER LOCATION PERMISSION & SELECTION MODAL ================= -->
  <div id="userLocationModal" class="location-modal-backdrop" style="display: none;">
    <div class="location-modal-card" role="dialog" aria-labelledby="locModalTitle" aria-modal="true">
      <header class="loc-modal-header">
        <div class="loc-header-title-box">
          <div class="loc-header-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="7"></circle>
              <line x1="12" y1="1" x2="12" y2="4"></line>
              <line x1="12" y1="20" x2="12" y2="23"></line>
              <line x1="1" y1="12" x2="4" y2="12"></line>
              <line x1="20" y1="12" x2="23" y2="12"></line>
              <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
            </svg>
          </div>
          <div>
            <h2 id="locModalTitle" class="loc-modal-title">Where are you right now?</h2>
            <p class="loc-modal-sub">Enable location permission or pick where you are on campus</p>
          </div>
        </div>
        <button id="closeLocModalBtn" class="modal-close-btn" title="Close" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </header>

      <!-- Quick Action Buttons: Auto-Detect GPS & Pinpoint -->
      <div class="loc-quick-actions">
        <button id="btnAutoDetectLoc" class="loc-action-btn gps" title="Use GPS Location">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="7"></circle>
            <line x1="12" y1="1" x2="12" y2="4"></line>
            <line x1="12" y1="20" x2="12" y2="23"></line>
            <line x1="1" y1="12" x2="4" y2="12"></line>
            <line x1="20" y1="12" x2="23" y2="12"></line>
            <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
          </svg>
          <div>
            <strong>Use Precise GPS</strong>
            <small>Google Maps style auto-detect</small>
          </div>
        </button>

        <button id="btnPinpointOnMap" class="loc-action-btn pinpoint" title="Pinpoint on map">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <div>
            <strong>Pinpoint on Map</strong>
            <small>Tap your spot on floor plan</small>
          </div>
        </button>
      </div>

      <!-- Search Box inside Modal -->
      <div class="loc-search-box">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input id="locSearchInput" class="search-input" type="text" placeholder="Or search your room, lab, or hall..." autocomplete="off" />
        <button id="clearLocSearchBtn" class="clear-btn" style="display: none;">&times;</button>
      </div>

      <!-- Dynamic Search Suggestions Results -->
      <div id="locSearchResults" class="loc-search-results" style="display: none;"></div>

      <!-- Popular Campus Landmarks Grid -->
      <div id="locPopularSection" class="loc-popular-section">
        <span class="section-label">Popular Starting Locations</span>
        <div id="locLandmarkGrid" class="loc-landmark-grid"></div>
      </div>
    </div>
  </div>

  <!-- Complete Application Logic -->
  <script src="script.js"></script>'''

old_script_tag = '''  <!-- Complete Application Logic -->
  <script src="script.js"></script>'''

if 'id="userLocationModal"' not in html:
    assert old_script_tag in html, "Could not find old_script_tag in index.html"
    html = html.replace(old_script_tag, modal_html, 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html successfully!")
