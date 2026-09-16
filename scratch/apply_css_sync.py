# Synchronize styles.css and style.css with complete styling including FAB

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

fab_css = '''
/* Floating Map Action Controls & Google Maps My Location FAB */
.map-action-controls {
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 20;
}

.map-action-controls .zoom-controls {
  position: static;
  bottom: auto;
  right: auto;
}

.my-location-fab {
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-full);
  background: rgba(13, 21, 34, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(6, 182, 212, 0.45);
  color: #38bdf8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.55), 0 0 14px rgba(6, 182, 212, 0.25);
  transition: all var(--transition-fast);
}

.my-location-fab:hover {
  background: rgba(6, 182, 212, 0.22);
  border-color: #06b6d4;
  color: #ffffff;
  transform: scale(1.08);
  box-shadow: 0 8px 25px rgba(6, 182, 212, 0.45);
}

.my-location-fab.active {
  background: #06b6d4;
  color: #03131e;
  border-color: #ffffff;
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.75);
}

.my-location-fab.tracking {
  animation: fabTrackingPulse 1.8s infinite;
}

@keyframes fabTrackingPulse {
  0% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.7); }
  70% { box-shadow: 0 0 0 14px rgba(6, 182, 212, 0); }
  100% { box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); }
}

body.theme-light .my-location-fab {
  background: rgba(255, 255, 255, 0.94);
  border-color: rgba(2, 132, 199, 0.4);
  color: #0284c7;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15), 0 0 10px rgba(2, 132, 199, 0.2);
}

body.theme-light .my-location-fab:hover {
  background: #f0f9ff;
  border-color: #0284c7;
  color: #0369a1;
}

body.theme-light .my-location-fab.active {
  background: #0284c7;
  color: #ffffff;
}
'''

if '.map-action-controls' not in css:
    css = css + '\n' + fab_css

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Synchronized style.css and styles.css with full FAB & user location styling!")
