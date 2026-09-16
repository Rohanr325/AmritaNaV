# Apply permission notice and simulation handling to index.html, styles.css, style.css, app.js, script.js

# 1. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target_modal_header_end = '</header>'
permission_notice_html = '''</header>

      <!-- Permission Denied / File Protocol Notice Banner -->
      <div id="locPermissionNotice" class="loc-permission-notice" style="display: none;">
        <div class="loc-notice-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span id="locNoticeTitle" class="loc-notice-title">Location Permission Blocked</span>
        </div>
        <p id="locNoticeDesc" class="loc-notice-desc">
          Your browser blocked GPS access or is running under <code>file://</code> protocol. Tap <strong>Simulate Location</strong> to test with live demo coordinates, or allow location in your browser site settings.
        </p>
        <div class="loc-notice-actions">
          <button id="btnSimulateCampusLoc" class="loc-notice-btn primary">
            📍 Simulate at Main Entrance
          </button>
          <button id="btnPinpointFromNotice" class="loc-notice-btn secondary">
            🎯 Pinpoint on Map
          </button>
        </div>
      </div>'''

if 'id="locPermissionNotice"' not in html:
    # Find loc-modal-header
    idx = html.find('class="loc-modal-header"')
    assert idx != -1, "Could not find loc-modal-header in index.html"
    end_hdr = html.find('</header>', idx)
    html = html[:end_hdr] + permission_notice_html + html[end_hdr + len('</header>'):]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Updated index.html with locPermissionNotice banner!")

# 2. Update style.css and styles.css
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

notice_css = '''
/* Permission Notice Banner in Modal */
.loc-permission-notice {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  margin-bottom: 16px;
  animation: noticeSlide 0.25s ease-out;
}

@keyframes noticeSlide {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.loc-notice-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f87171;
  font-weight: 700;
  font-size: 0.82rem;
  margin-bottom: 6px;
}

.loc-notice-desc {
  font-size: 0.75rem;
  line-height: 1.45;
  color: #cbd5e1;
  margin: 0 0 10px 0;
}

.loc-notice-desc code {
  background: rgba(0, 0, 0, 0.3);
  padding: 1px 5px;
  border-radius: 4px;
  color: #38bdf8;
  font-family: monospace;
}

.loc-notice-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.loc-notice-btn {
  padding: 6px 12px;
  font-size: 0.74rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-fast);
}

.loc-notice-btn.primary {
  background: rgba(6, 182, 212, 0.25);
  color: #38bdf8;
  border: 1px solid rgba(6, 182, 212, 0.5);
}

.loc-notice-btn.primary:hover {
  background: #06b6d4;
  color: #03131e;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
}

.loc-notice-btn.secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.loc-notice-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

body.theme-light .loc-permission-notice {
  background: #fef2f2;
  border-color: #fca5a5;
}

body.theme-light .loc-notice-header {
  color: #ef4444;
}

body.theme-light .loc-notice-desc {
  color: #475569;
}
'''

if '.loc-permission-notice' not in css:
    css = css + '\n' + notice_css
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write(css)
    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("Updated styles.css and style.css!")

# 3. Update app.js and script.js with enhanced permission error handling & simulation
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace handleAutoDetectGPS
old_auto_detect = '''function handleAutoDetectGPS(userInitiated = false) {
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
}'''

new_auto_detect = '''function showPermissionNotice(reason = 'denied') {
  const notice = document.getElementById('locPermissionNotice');
  const title = document.getElementById('locNoticeTitle');
  const desc = document.getElementById('locNoticeDesc');
  if (!notice) return;

  notice.style.display = 'block';

  if (reason === 'file_protocol') {
    if (title) title.textContent = 'Browser Security: file:// Protocol';
    if (desc) desc.innerHTML = 'Chrome and Edge block live GPS sensors when opening HTML directly from a folder (<code>file://</code>). Run via a local server (<code>http://localhost:8000</code>) or tap below to test with simulated campus GPS!';
  } else if (reason === 'denied') {
    if (title) title.textContent = 'Location Permission Was Blocked';
    if (desc) desc.innerHTML = 'Location permission is currently blocked in your browser. To unblock: click the <strong>Tune / Lock icon (⚙️)</strong> to the left of the URL bar &rarr; set <strong>Location to "Allow"</strong> &rarr; reload. Or tap below to simulate your location immediately!';
  } else {
    if (title) title.textContent = 'GPS Signal Unavailable';
    if (desc) desc.innerHTML = 'Could not acquire satellite fix (low indoor signal or timed out). Tap below to simulate your location at the Main Entrance or pinpoint anywhere on the map.';
  }
}

function handleAutoDetectGPS(userInitiated = false) {
  const fab = document.getElementById('myLocationFabBtn');
  if (fab) fab.classList.add('tracking');

  // Detect file:// protocol restriction in modern browsers
  if (window.location.protocol === 'file:') {
    if (fab) fab.classList.remove('tracking');
    console.warn('Note: Browsers block Geolocation API under file:// protocol. Local server recommended.');
    showToast('Browsers block GPS on file://. Opening location helper...');
    openLocationModal();
    showPermissionNotice('file_protocol');
    return;
  }

  if (!navigator.geolocation) {
    if (fab) fab.classList.remove('tracking');
    showToast('GPS geolocation is not supported on this device/browser.');
    openLocationModal();
    showPermissionNotice('unavailable');
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
        showToast('Location permission denied. Tap to simulate or allow in settings.');
        openLocationModal();
        showPermissionNotice('denied');
      } else {
        showToast('Indoor GPS signal low. Defaulted to Main Entrance (Reception).');
        fallbackToCampusEntrance();
        openLocationModal();
        showPermissionNotice('unavailable');
      }
    },
    { enableHighAccuracy: true, timeout: 9000, maximumAge: 0 }
  );
}'''

assert old_auto_detect in js, "Could not find old_auto_detect in app.js"
js = js.replace(old_auto_detect, new_auto_detect, 1)

# Add listeners for simulate button and notice pinpoint button
old_listeners_hook = "  const btnPinpoint = document.getElementById('btnPinpointOnMap');\n  if (btnPinpoint) btnPinpoint.addEventListener('click', enablePinpointMode);"

new_listeners_hook = """  // Simulate Campus Location from Notice
  const btnSimCampus = document.getElementById('btnSimulateCampusLoc');
  if (btnSimCampus) {
    btnSimCampus.addEventListener('click', () => {
      closeLocationModal();
      processGPSCoords({ latitude: 9.0945, longitude: 76.4918, accuracy: 8 }, false);
      showToast('📍 Simulated GPS Location at Amrita Main Entrance (GAD)');
    });
  }

  const btnPinpointNotice = document.getElementById('btnPinpointFromNotice');
  if (btnPinpointNotice) {
    btnPinpointNotice.addEventListener('click', enablePinpointMode);
  }

  const btnPinpoint = document.getElementById('btnPinpointOnMap');
  if (btnPinpoint) btnPinpoint.addEventListener('click', enablePinpointMode);"""

assert old_listeners_hook in js, "Could not find old_listeners_hook in app.js"
js = js.replace(old_listeners_hook, new_listeners_hook, 1)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Successfully updated app.js and script.js with permission notice & simulation!")
