css_to_add = """
/* Enhanced Interactive Staircase Styling */
.stair-group {
  cursor: pointer;
  outline: none;
  transition: opacity 0.2s ease, filter 0.2s ease;
}

.stair-box {
  fill: rgba(245, 158, 11, 0.12);
  stroke: rgba(245, 158, 11, 0.85);
  stroke-width: 1.2;
  transition: all 0.25s ease;
}

.stair-inner-box {
  fill: rgba(245, 158, 11, 0.06);
  stroke: rgba(245, 158, 11, 0.5);
  stroke-width: 0.8;
}

.stair-landing {
  fill: rgba(245, 158, 11, 0.22);
  stroke: rgba(245, 158, 11, 0.7);
  stroke-width: 0.8;
}

.stair-step {
  stroke: rgba(245, 158, 11, 0.8);
  stroke-width: 0.85;
}

.stair-group:hover .stair-box {
  stroke: #fbbf24;
  fill: rgba(245, 158, 11, 0.3);
  filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.85));
}

.stair-group:hover .stair-step {
  stroke: #fef08a;
  stroke-width: 1.1;
}

.stair-group:hover .stair-badge-bg {
  stroke: #fbbf24;
  fill: #2d2315;
  filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.6));
}

.stair-badge-group {
  pointer-events: none;
}

.stair-badge-bg {
  fill: #0d1624;
  stroke: #f59e0b;
  stroke-width: 0.8;
  rx: 2;
  transition: all 0.2s ease;
}

.stair-badge-text {
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: 4.8px;
  font-weight: 800;
  fill: #f59e0b;
  letter-spacing: 0.3px;
}

.stair-flash .stair-box {
  animation: stairPulse 0.9s ease infinite alternate;
}

@keyframes stairPulse {
  0% { fill: rgba(245, 158, 11, 0.2); filter: drop-shadow(0 0 4px #f59e0b); }
  100% { fill: rgba(245, 158, 11, 0.6); filter: drop-shadow(0 0 14px #fbbf24); }
}

/* Multi-Floor Route Journey Bar */
.multi-floor-journey-bar {
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 45;
  background: rgba(13, 22, 38, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(245, 158, 11, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.55), 0 0 16px rgba(245, 158, 11, 0.25);
  border-radius: 24px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: 'Inter', sans-serif;
  animation: slideDownFade 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideDownFade {
  from { opacity: 0; transform: translate(-50%, -10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

.journey-info {
  display: flex;
  align-items: center;
  gap: 8px;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  padding-right: 12px;
}

.journey-badge {
  font-family: 'Outfit', sans-serif;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.8px;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
  padding: 2px 8px;
  border-radius: 12px;
}

.journey-summary {
  font-size: 0.78rem;
  color: #e2e8f0;
  font-weight: 600;
  white-space: nowrap;
}

.journey-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.journey-leg-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.journey-leg-btn .leg-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  font-size: 0.65rem;
}

.journey-leg-btn.active {
  background: rgba(6, 182, 212, 0.22);
  border-color: #06b6d4;
  color: #38bdf8;
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
}

.journey-leg-btn.active .leg-num {
  background: #06b6d4;
  color: #03131e;
}

.journey-stair-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.15);
  border: 1px dashed rgba(245, 158, 11, 0.5);
  padding: 3px 9px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.journey-stair-indicator:hover {
  background: rgba(245, 158, 11, 0.3);
  border-color: #f59e0b;
  transform: scale(1.03);
}

/* Stair Transition Pin on Map */
.route-pin.stair .stair-pin-halo {
  fill: rgba(245, 158, 11, 0.25);
  animation: stairPinPulse 1.6s infinite ease-out;
}

.route-pin.stair .stair-pin-core {
  fill: #f59e0b;
  stroke: #ffffff;
  stroke-width: 1.5;
}

.route-pin.stair .stair-pin-icon {
  font-family: 'Inter', sans-serif;
  font-size: 6px;
  font-weight: 900;
  fill: #03131e;
}

@keyframes stairPinPulse {
  0% { r: 7; opacity: 0.9; }
  50% { r: 15; opacity: 0.2; }
  100% { r: 7; opacity: 0.9; }
}

/* Legend Swatch for Staircase */
.legend-swatch.stair {
  background: rgba(245, 158, 11, 0.3);
  border: 1px solid #f59e0b;
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.5);
}

/* Nav Toast Notification */
.nav-toast {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.94);
  backdrop-filter: blur(12px);
  border: 1px solid #06b6d4;
  color: #f8fafc;
  padding: 7px 18px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  z-index: 100;
  pointer-events: none;
  animation: toastFade 2.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes toastFade {
  0% { opacity: 0; transform: translate(-50%, 15px); }
  15% { opacity: 1; transform: translate(-50%, 0); }
  80% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -10px); }
}
"""

def update_css_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace old .stair-box and .stair-step with full definition
    old_stair_css = """.stair-box {
  fill: rgba(42, 78, 119, 0.2);
  stroke: var(--svg-stair);
  stroke-width: 1;
}

.stair-step {
  stroke: var(--svg-stair);
  stroke-width: 0.9;
}"""
    if old_stair_css in content:
        content = content.replace(old_stair_css, "")
    
    content += "\n" + css_to_add

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated CSS: {filepath}")

update_css_file('style.css')
update_css_file('styles.css')
