import re

for fname in ['script.js', 'app.js']:
    with open(fname, 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Update SHARED_STAIRS to match exact Floor 0 node IDs (if not already replaced)
    old_stairs = """const SHARED_STAIRS = [
  { id: 'stair_admin_w', name: 'Admin West Staircase', f0Node: 'wp_admin_w_stairs', f2Node: 'wp_f2_stair_admin_w' },
  { id: 'stair_admin_e', name: 'Admin East Staircase', f0Node: 'wp_admin_e_stairs', f2Node: 'wp_f2_stair_admin_e' },
  { id: 'stair_mid', name: 'Central Mid-Bridge Stairs', f0Node: 'wp_mid_bridge_stairs', f2Node: 'wp_f2_mid_stair' },
  { id: 'stair_north', name: 'North Stairs', f0Node: 'wp_north_exit_hub', f2Node: 'wp_f2_north_stair' }
];"""

    new_stairs = """const SHARED_STAIRS = [
  { id: 'stair_admin_w', name: 'Admin West Staircase', f0Node: 'wp_admin_west_st', f2Node: 'wp_f2_stair_admin_w' },
  { id: 'stair_admin_e', name: 'Admin East Staircase', f0Node: 'wp_admin_east_st', f2Node: 'wp_f2_stair_admin_e' },
  { id: 'stair_mid', name: 'Central Mid-Bridge Stairs', f0Node: 'wp_west_lower_bridge', f2Node: 'wp_f2_mid_stair' },
  { id: 'stair_north', name: 'North Stairs', f0Node: 'wp_north_exit_hub', f2Node: 'wp_f2_north_stair' }
];"""
    if old_stairs in text:
        text = text.replace(old_stairs, new_stairs)

    # 2. Update Floor 2 courtyardsHtml to add Admin lightwells & porch terrace X-box
    old_f2_court = """    <!-- 7) N204 Inner Courtyard -->
    <rect class="courtyard-patio" x="148" y="496" width="110" height="26" rx="2" />
    <text x="203" y="511" text-anchor="middle" font-size="5" fill="rgba(16, 185, 129, 0.6)" font-weight="600" letter-spacing="1">COURTYARD</text>

    `,"""

    new_f2_court = """    <!-- 7) N204 Inner Courtyard -->
    <rect class="courtyard-patio" x="148" y="496" width="110" height="26" rx="2" />
    <text x="203" y="511" text-anchor="middle" font-size="5" fill="rgba(16, 185, 129, 0.6)" font-weight="600" letter-spacing="1">COURTYARD</text>

    <!-- 8) Admin Block 2nd Fl Light Wells (Flanking A207 as in blueprint) -->
    <rect class="lightwell-gap" x="300" y="752" width="26" height="32" rx="1" />
    <rect class="lightwell-gap" x="422" y="752" width="26" height="32" rx="1" />

    <!-- 9) Front Entrance Terrace Roof (X-Box below A207 as in blueprint) -->
    <rect class="lightwell-gap" x="334" y="810" width="80" height="34" rx="2" />
    <line x1="334" y1="810" x2="414" y2="844" stroke="rgba(56, 189, 248, 0.35)" stroke-width="0.8" />
    <line x1="334" y1="844" x2="414" y2="810" stroke="rgba(56, 189, 248, 0.35)" stroke-width="0.8" />
    <text x="374" y="855" text-anchor="middle" font-size="5" fill="rgba(148, 163, 184, 0.6)" font-weight="600" letter-spacing="1">TERRACE</text>
    `,"""
    if old_f2_court in text:
        text = text.replace(old_f2_court, new_f2_court)

    # 3. Update renderFloor room text generation to handle narrow vertical rooms (rotate -90)
    old_render_room = """    let roomsHtml = '';
    fData.rooms.forEach(r => {
      const showName = r.h >= 24 && r.w >= 36;
      const isSmall = r.w < 42 || r.h < 26;
      const codeY = showName ? (r.cy - 3) : r.cy + 3;
      const nameY = r.cy + 9;
      const fontSize = (r.w < 30) ? '6px' : (isSmall ? '7px' : '8.5px');

      let displayName = r.name;
      if (r.w < 42 && displayName.length > 10) {
        displayName = displayName.substring(0, 9) + '..';
      } else if (displayName.length > 13 && r.w < 68) {
        displayName = displayName.substring(0, 11) + '..';
      }

      roomsHtml += `
        <g class="room-group" id="room-${r.id}" data-id="${r.id}" data-category="${r.category}" tabindex="0" role="button" aria-label="${r.code} - ${r.name}">
          <rect class="room-rect" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="2" />
          <text class="room-code-text" x="${r.cx}" y="${codeY}" text-anchor="middle" font-size="${fontSize}">${r.code}</text>
          ${showName ? `<text class="room-name-text" x="${r.cx}" y="${nameY}" text-anchor="middle">${displayName}</text>` : ''}
        </g>
      `;
    });"""

    new_render_room = """    let roomsHtml = '';
    fData.rooms.forEach(r => {
      const isNarrowVertical = r.w < 26 && r.h >= 36;
      const showName = r.h >= 24 && r.w >= 36 && !isNarrowVertical;
      const isSmall = r.w < 42 || r.h < 26;
      let codeY = showName ? (r.cy - 3) : r.cy + 3;
      const nameY = r.cy + 9;
      let fontSize = (r.w < 30) ? '5.5px' : (isSmall ? '7px' : '8.5px');
      let transformAttr = '';

      if (isNarrowVertical) {
        transformAttr = `transform="rotate(-90 ${r.cx} ${r.cy})"`;
        codeY = r.cy + 2;
        fontSize = '5px';
      }

      let displayName = r.name;
      if (r.w < 42 && displayName.length > 10) {
        displayName = displayName.substring(0, 9) + '..';
      } else if (displayName.length > 13 && r.w < 68) {
        displayName = displayName.substring(0, 11) + '..';
      }

      roomsHtml += `
        <g class="room-group" id="room-${r.id}" data-id="${r.id}" data-category="${r.category}" tabindex="0" role="button" aria-label="${r.code} - ${r.name}">
          <rect class="room-rect" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="2" />
          <text class="room-code-text" x="${r.cx}" y="${codeY}" text-anchor="middle" font-size="${fontSize}" ${transformAttr}>${r.code}</text>
          ${showName ? `<text class="room-name-text" x="${r.cx}" y="${nameY}" text-anchor="middle">${displayName}</text>` : ''}
        </g>
      `;
    });"""

    assert old_render_room in text, f"old_render_room not found in {fname}"
    text = text.replace(old_render_room, new_render_room)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(text)

print("Successfully applied Floor 2 refinements to script.js and app.js!")
