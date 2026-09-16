def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace stair rendering in renderFloor
    old_render_stairs = """  // 4. Staircases
  const stairGroup = document.getElementById('layerStairs');
  if (stairGroup) {
    let stairHtml = '';
    fData.stairs.forEach(st => {
      stairHtml += `<rect class="stair-box" x="${st.x}" y="${st.y}" width="${st.w}" height="${st.h}" />`;
      for (let i = 1; i < st.steps; i++) {
        if (st.dir === 'v') {
          const yLine = st.y + (st.h / st.steps) * i;
          stairHtml += `<line class="stair-step" x1="${st.x}" y1="${yLine}" x2="${st.x + st.w}" y2="${yLine}" />`;
        } else {
          const xLine = st.x + (st.w / st.steps) * i;
          stairHtml += `<line class="stair-step" x1="${xLine}" y1="${st.y}" x2="${xLine}" y2="${st.y + st.h}" />`;
        }
      }
    });
    stairGroup.innerHTML = stairHtml;
  }"""

    new_render_stairs = """  // 4. Staircases (Interactive Vector CAD with Step Treads & Direction Badges)
  const stairGroup = document.getElementById('layerStairs');
  if (stairGroup) {
    let stairHtml = '';
    fData.stairs.forEach(st => {
      stairHtml += `<g class="stair-group" id="stair-${st.id}" data-stair-id="${st.id}" data-name="${st.name}" data-target-floor="${st.targetFloor}" tabindex="0" role="button" aria-label="${st.name} to ${st.targetFloor === 2 ? '2nd Floor' : 'Ground Floor'}">`;
      
      if (st.type === 'atrium_double') {
        // Grand Central Atrium Staircase: double flight with central run and landing
        stairHtml += `
          <!-- Outer boundary -->
          <rect class="stair-box" x="${st.x}" y="${st.y}" width="${st.w}" height="${st.h}" rx="2" />
          <!-- Center upper flight -->
          <rect class="stair-inner-box" x="${st.x + 12}" y="${st.y}" width="18" height="9" />
          <line class="stair-step" x1="${st.x + 16}" y1="${st.y}" x2="${st.x + 16}" y2="${st.y + 9}" />
          <line class="stair-step" x1="${st.x + 21}" y1="${st.y}" x2="${st.x + 21}" y2="${st.y + 9}" />
          <line class="stair-step" x1="${st.x + 26}" y1="${st.y}" x2="${st.x + 26}" y2="${st.y + 9}" />
          <!-- Left side flight -->
          <rect class="stair-inner-box" x="${st.x}" y="${st.y + 7}" width="12" height="13" />
          <line class="stair-step" x1="${st.x}" y1="${st.y + 10}" x2="${st.x + 12}" y2="${st.y + 10}" />
          <line class="stair-step" x1="${st.x}" y1="${st.y + 13}" x2="${st.x + 12}" y2="${st.y + 13}" />
          <line class="stair-step" x1="${st.x}" y1="${st.y + 16}" x2="${st.x + 12}" y2="${st.y + 16}" />
          <!-- Right side flight -->
          <rect class="stair-inner-box" x="${st.x + 30}" y="${st.y + 7}" width="12" height="13" />
          <line class="stair-step" x1="${st.x + 30}" y1="${st.y + 10}" x2="${st.x + 42}" y2="${st.y + 10}" />
          <line class="stair-step" x1="${st.x + 30}" y1="${st.y + 13}" x2="${st.x + 42}" y2="${st.y + 13}" />
          <line class="stair-step" x1="${st.x + 30}" y1="${st.y + 16}" x2="${st.x + 42}" y2="${st.y + 16}" />
          <!-- Center landing -->
          <rect class="stair-landing" x="${st.x + 12}" y="${st.y + 9}" width="18" height="11" />
        `;
      } else if (st.type === 'l_shaped_sw') {
        // South-West Courtyard Corner Staircase (L-Shape south of N-001 / N201)
        stairHtml += `
          <!-- Outer boundary L-path -->
          <path class="stair-box" d="M 316 636 L 350 636 L 350 688 L 334 688 L 334 656 L 316 656 Z" />
          <!-- Corner landing -->
          <rect class="stair-landing" x="316" y="636" width="14" height="20" />
          <!-- Top horizontal run treads -->
          <line class="stair-step" x1="334" y1="636" x2="334" y2="656" />
          <line class="stair-step" x1="338" y1="636" x2="338" y2="656" />
          <line class="stair-step" x1="342" y1="636" x2="342" y2="656" />
          <line class="stair-step" x1="346" y1="636" x2="346" y2="656" />
          <!-- Lower vertical run treads -->
          <line class="stair-step" x1="334" y1="662" x2="350" y2="662" />
          <line class="stair-step" x1="334" y1="667" x2="350" y2="667" />
          <line class="stair-step" x1="334" y1="672" x2="350" y2="672" />
          <line class="stair-step" x1="334" y1="677" x2="350" y2="677" />
          <line class="stair-step" x1="334" y1="682" x2="350" y2="682" />
        `;
      } else if (st.type === 'l_shaped_se') {
        // South-East Courtyard Corner Staircase (L-Shape south of S-001 / S201)
        stairHtml += `
          <!-- Outer boundary L-path -->
          <path class="stair-box" d="M 398 636 L 432 636 L 432 656 L 414 656 L 414 688 L 398 688 Z" />
          <!-- Corner landing -->
          <rect class="stair-landing" x="418" y="636" width="14" height="20" />
          <!-- Top horizontal run treads -->
          <line class="stair-step" x1="402" y1="636" x2="402" y2="656" />
          <line class="stair-step" x1="406" y1="636" x2="406" y2="656" />
          <line class="stair-step" x1="410" y1="636" x2="410" y2="656" />
          <line class="stair-step" x1="414" y1="636" x2="414" y2="656" />
          <!-- Lower vertical run treads -->
          <line class="stair-step" x1="398" y1="662" x2="414" y2="662" />
          <line class="stair-step" x1="398" y1="667" x2="414" y2="667" />
          <line class="stair-step" x1="398" y1="672" x2="414" y2="672" />
          <line class="stair-step" x1="398" y1="677" x2="414" y2="677" />
          <line class="stair-step" x1="398" y1="682" x2="414" y2="682" />
        `;
      } else {
        stairHtml += `<rect class="stair-box" x="${st.x}" y="${st.y}" width="${st.w}" height="${st.h}" />`;
      }

      // Directional Floor Badge / Label
      stairHtml += `
        <g class="stair-badge-group">
          <rect class="stair-badge-bg" x="${st.labelX - 16}" y="${st.labelY - 5}" width="32" height="8" rx="2" />
          <text class="stair-badge-text" x="${st.labelX}" y="${st.labelY + 1}" text-anchor="middle">${st.badge}</text>
        </g>
      </g>`;
    });
    stairGroup.innerHTML = stairHtml;
    setupStairEvents();
  }"""

    assert old_render_stairs in content, f"old_render_stairs not found in {filepath}"
    content = content.replace(old_render_stairs, new_render_stairs, 1)

    # 2. Add showToast and setupStairEvents helper functions
    stair_helper_code = """
function showToast(message) {
  const existing = document.querySelector('.nav-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'nav-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 2700);
}

function setupStairEvents() {
  document.querySelectorAll('.stair-group').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetFloor = parseInt(el.getAttribute('data-target-floor'), 10);
      const stairName = el.getAttribute('data-name');
      const stairId = el.getAttribute('data-stair-id');
      switchFloor(targetFloor);
      showToast(`Switched to ${targetFloor === 2 ? '2nd Floor' : 'Ground Floor'} via ${stairName}`);
      setTimeout(() => {
        const newStairEl = document.getElementById('stair-' + stairId);
        if (newStairEl) {
          newStairEl.classList.add('stair-flash');
          setTimeout(() => newStairEl.classList.remove('stair-flash'), 1800);
        }
      }, 50);
    });
  });
}
"""
    if "function setupStairEvents()" not in content:
        # Insert before renderActiveRouteGraphics or switchFloor
        idx = content.find("function switchFloor(")
        assert idx != -1, f"switchFloor not found in {filepath}"
        content = content[:idx] + stair_helper_code + "\n" + content[idx:]

    # 3. Enhance renderActiveRouteGraphics to handle Multi-Floor Journey Bar and Stair Transition Pin
    old_route_graphics = """  if (activeLeg) {
    if (glowPath && corePath) {
      glowPath.setAttribute('d', activeLeg.indoorD || '');
      corePath.setAttribute('d', activeLeg.indoorD || '');
    }
    if (outdoorGlow && outdoorCore) {
      outdoorGlow.setAttribute('d', activeLeg.outdoorD || '');
      outdoorCore.setAttribute('d', activeLeg.outdoorD || '');
    }
    if (pStart && pDest && startPin && destPin) {
      startPin.setAttribute('transform', `translate(${pStart[0]}, ${pStart[1]})`);
      destPin.setAttribute('transform', `translate(${pDest[0]}, ${pDest[1]})`);
      startPin.style.display = 'block';
      destPin.style.display = 'block';
    }
    if (viewport && activeLeg.points.length > 0) {
      const xs = activeLeg.points.map(p => p[0]);
      const ys = activeLeg.points.map(p => p[1]);
      viewport.focusBounds(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys));
    }
  } else {
    // Current floor does not have a route segment
    if (glowPath) glowPath.setAttribute('d', '');
    if (corePath) corePath.setAttribute('d', '');
    if (outdoorGlow) outdoorGlow.setAttribute('d', '');
    if (outdoorCore) outdoorCore.setAttribute('d', '');
    if (startPin) startPin.style.display = 'none';
    if (destPin) destPin.style.display = 'none';
  }"""

    new_route_graphics = """  const stairPin = document.getElementById('svgStairPin');
  const stairPinText = document.getElementById('svgStairPinText');
  const journeyBar = document.getElementById('multiFloorJourneyBar');
  const journeySummary = document.getElementById('journeySummaryText');
  const journeyStairName = document.getElementById('journeyStairName');
  const leg0Btn = document.getElementById('journeyLeg0Btn');
  const leg2Btn = document.getElementById('journeyLeg2Btn');

  // Update Multi-Floor Journey Bar
  if (route.isMultiFloor && journeyBar) {
    journeyBar.style.display = 'flex';
    if (journeySummary) {
      journeySummary.textContent = `${route.startRoom.name} (${route.fStart === 0 ? 'Ground' : '2nd Fl'}) → ${route.destRoom.name} (${route.fDest === 0 ? 'Ground' : '2nd Fl'})`;
    }
    if (journeyStairName) {
      journeyStairName.textContent = route.staircase ? route.staircase.name : 'Staircase';
    }
    if (leg0Btn) leg0Btn.classList.toggle('active', appState.currentFloor === 0);
    if (leg2Btn) leg2Btn.classList.toggle('active', appState.currentFloor === 2);
  } else if (journeyBar) {
    journeyBar.style.display = 'none';
  }

  if (activeLeg) {
    if (glowPath && corePath) {
      glowPath.setAttribute('d', activeLeg.indoorD || '');
      corePath.setAttribute('d', activeLeg.indoorD || '');
    }
    if (outdoorGlow && outdoorCore) {
      outdoorGlow.setAttribute('d', activeLeg.outdoorD || '');
      outdoorCore.setAttribute('d', activeLeg.outdoorD || '');
    }
    if (pStart && pDest && startPin && destPin) {
      startPin.setAttribute('transform', `translate(${pStart[0]}, ${pStart[1]})`);
      destPin.setAttribute('transform', `translate(${pDest[0]}, ${pDest[1]})`);
      startPin.style.display = 'block';
      destPin.style.display = 'block';
    }

    // Position Stair Pin at vertical transition hub
    if (route.isMultiFloor && stairPin) {
      const isStartFloor = (appState.currentFloor === route.fStart);
      const stairNode = isStartFloor
        ? (route.fStart === 0 ? route.staircase.f0Node : route.staircase.f2Node)
        : (route.fDest === 0 ? route.staircase.f0Node : route.staircase.f2Node);
      const stairPt = FLOORS_DATA[appState.currentFloor].waypoints[stairNode];
      if (stairPt) {
        stairPin.setAttribute('transform', `translate(${stairPt.x}, ${stairPt.y})`);
        if (stairPinText) {
          stairPinText.textContent = isStartFloor ? (route.fStart === 0 ? '▲' : '▼') : (route.fDest === 0 ? '▼' : '▲');
        }
        stairPin.style.display = 'block';
      }
    } else if (stairPin) {
      stairPin.style.display = 'none';
    }

    if (viewport && activeLeg.points.length > 0) {
      const xs = activeLeg.points.map(p => p[0]);
      const ys = activeLeg.points.map(p => p[1]);
      viewport.focusBounds(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys));
    }
  } else {
    // Current floor does not have a route segment
    if (glowPath) glowPath.setAttribute('d', '');
    if (corePath) corePath.setAttribute('d', '');
    if (outdoorGlow) outdoorGlow.setAttribute('d', '');
    if (outdoorCore) outdoorCore.setAttribute('d', '');
    if (startPin) startPin.style.display = 'none';
    if (destPin) destPin.style.display = 'none';
    if (stairPin) stairPin.style.display = 'none';
  }"""

    assert old_route_graphics in content, f"old_route_graphics not found in {filepath}"
    content = content.replace(old_route_graphics, new_route_graphics, 1)

    # 4. In clearRoute, hide journey bar and stair pin
    old_clear_route = """  if (startPin) startPin.style.display = 'none';
  if (destPin) destPin.style.display = 'none';
  if (walker) walker.style.display = 'none';"""

    new_clear_route = """  if (startPin) startPin.style.display = 'none';
  if (destPin) destPin.style.display = 'none';
  if (walker) walker.style.display = 'none';
  const stairPin = document.getElementById('svgStairPin');
  if (stairPin) stairPin.style.display = 'none';
  const journeyBar = document.getElementById('multiFloorJourneyBar');
  if (journeyBar) journeyBar.style.display = 'none';"""

    assert old_clear_route in content, f"old_clear_route not found in {filepath}"
    content = content.replace(old_clear_route, new_clear_route, 1)

    # 5. Connect Multi-Floor Journey Bar button clicks and presets
    old_journey_click_search = "  // Walking simulation button"
    new_journey_clicks = """  // Multi-Floor Journey Bar Controls
  const journeyLeg0Btn = document.getElementById('journeyLeg0Btn');
  const journeyLeg2Btn = document.getElementById('journeyLeg2Btn');
  const journeyStairIndicator = document.getElementById('journeyStairIndicator');

  if (journeyLeg0Btn) journeyLeg0Btn.addEventListener('click', () => switchFloor(0));
  if (journeyLeg2Btn) journeyLeg2Btn.addEventListener('click', () => switchFloor(2));
  if (journeyStairIndicator) {
    journeyStairIndicator.addEventListener('click', () => {
      const nextFloor = (appState.currentFloor === 0) ? 2 : 0;
      switchFloor(nextFloor);
    });
  }

  // Walking simulation button"""

    if "journeyLeg0Btn" not in content:
        assert old_journey_click_search in content, f"old_journey_click_search not found in {filepath}"
        content = content.replace(old_journey_click_search, new_journey_clicks, 1)

    # 6. Add popular presets for multi-floor
    old_preset_code = """      if (preset === 'REC_TO_COMP') { start = 'GAD-PR'; dest = 'S-013'; }
      else if (preset === 'AMRI_TO_ROBOT') { start = 'A-006'; dest = 'S-011'; }
      else if (preset === 'ADMIN_TO_PRIN') { start = 'GAD-PR'; dest = 'N-013'; }
      else if (preset === 'ACHA_TO_NANO') { start = 'A-001'; dest = 'N-005-006'; }"""

    new_preset_code = """      if (preset === 'REC_TO_COMP') { start = 'GAD-PR'; dest = 'S-013'; }
      else if (preset === 'AMRI_TO_ROBOT') { start = 'A-006'; dest = 'S-011'; }
      else if (preset === 'ADMIN_TO_PRIN') { start = 'GAD-PR'; dest = 'N-013'; }
      else if (preset === 'ACHA_TO_NANO') { start = 'A-001'; dest = 'N-005-006'; }
      else if (preset === 'REC_TO_N204') { start = 'GAD-PR'; dest = 'N204B'; }
      else if (preset === 'ACHA_TO_UNESCO') { start = 'A-001'; dest = 'UNESCO'; }"""

    if old_preset_code in content:
        content = content.replace(old_preset_code, new_preset_code, 1)

    # 7. Multi-floor simulation auto-transition
    old_sim_finish = """    if (!p2) {
      appState.isSimulating = false;"""

    new_sim_finish = """    if (!p2) {
      // If multi-floor and just finished leg 1 at stairs, transition to next floor!
      if (route.isMultiFloor && appState.currentFloor === route.fStart) {
        switchFloor(route.fDest);
        points = route.leg2.points;
        seg = 0;
        t = 0;
        const wk = document.getElementById('svgWalkerAvatar');
        if (wk) wk.style.display = 'block';
        showToast(`Ascending ${route.staircase.name} to 2nd Floor...`);
        appState.simFrameId = requestAnimationFrame(step);
        return;
      }

      appState.isSimulating = false;"""

    if old_sim_finish in content:
        content = content.replace(old_sim_finish, new_sim_finish, 1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated renderer and UI in {filepath}")

update_file('script.js')
update_file('app.js')
