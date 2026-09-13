# Apply updates to app.js
import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update ROOMS_DATA Admin Block section
old_admin_block = """  // ---------- ADMIN BLOCK (A) - BOTTOM SECTION ----------
  { id: 'RECEPTION', code: 'REC', name: 'Reception & Telephone', wing: 'Admin Block (A)', category: 'FACILITY', x: 340, y: 784, w: 66, h: 26, door: [375, 784], desc: 'Main reception desk, visitor badges, security check-in and telephone operator services.' },
  { id: 'GAD-PR', code: 'GAD', name: 'GAD - PR Office', wing: 'Admin Block (A)', category: 'OFFICE', x: 334, y: 810, w: 78, h: 36, door: [375, 810], desc: 'General Administration Department & Public Relations Liaison Office at the main entrance porch.' },
  { id: 'ADMIN-A', code: 'ADM-01', name: 'Admin Block Central Office', wing: 'Admin Block (A)', category: 'OFFICE', x: 340, y: 750, w: 66, h: 34, door: [375, 750], desc: 'Ground Floor Administrative Registry and University Central Enquiries.' },
  { id: 'PRAYER-HALL-A', code: 'PRY-A', name: 'Central Prayer Hall', wing: 'Admin Block (A)', category: 'ROOM', x: 340, y: 710, w: 66, h: 40, door: [375, 730], desc: 'Central prayer, contemplation and reflection sanctuary at the heart of the ground floor.' },
  { id: 'A-004', code: 'A-004', name: 'Executive Office A-004', wing: 'Admin Block (A)', category: 'OFFICE', x: 314, y: 740, w: 26, h: 44, door: [327, 740], desc: 'Administrative Liaison and records archive.' },
  { id: 'A-005', code: 'A-005', name: 'Special Programs / Meditation', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 276, y: 740, w: 38, h: 44, door: [295, 740], desc: 'Dedicated serene hall for IAM Meditation, yoga sessions, and discourses.' },
  { id: 'A-006', code: 'A-006', name: 'Amritheswari Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 168, y: 644, w: 54, h: 96, door: [222, 730], desc: 'Grand University Cultural Auditorium with stage lighting and 600+ seating capacity.' },
  { id: 'A-003', code: 'A-003', name: 'Admin Suite A-003', wing: 'Admin Block (A)', category: 'OFFICE', x: 406, y: 740, w: 26, h: 44, door: [419, 740], desc: 'Administrative advisory and conference chamber.' },
  { id: 'A-002', code: 'A-002', name: 'ENGM Conference Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 432, y: 740, w: 36, h: 44, door: [450, 740], desc: 'Corporate boardroom and executive seminar conference suite.' },
  { id: 'A-001', code: 'A-001', name: 'Acharya Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 526, y: 644, w: 54, h: 96, door: [526, 730], desc: 'Premier University Auditorium with 500+ seating capacity for convocations and symposiums.' },"""

new_admin_block = """  // ---------- ADMIN BLOCK (A) - BOTTOM SECTION ----------
  { id: 'GAD-PR', code: 'GAD', name: 'GAD - PR Office', wing: 'Admin Block (A)', category: 'OFFICE', x: 334, y: 810, w: 78, h: 36, door: [374, 810], desc: 'General Administration Department & Public Relations Liaison Office at the main entrance porch.' },
  { id: 'PRAYER-HALL-A', code: 'PRY-A', name: 'Central Prayer & Admin Hall', wing: 'Admin Block (A)', category: 'ROOM', x: 326, y: 708, w: 96, h: 102, door: [374, 708], desc: 'Unified central sanctuary, administrative registry (ADM-01), reception desk (REC), and student services hub.' },
  { id: 'A-004', code: 'A-004', name: 'Executive Office A-004', wing: 'Admin Block (A)', category: 'OFFICE', x: 300, y: 708, w: 26, h: 44, door: [313, 708], desc: 'Administrative Liaison and records archive.' },
  { id: 'A-005', code: 'A-005', name: 'Special Programs / Meditation', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 262, y: 708, w: 38, h: 76, door: [281, 708], desc: 'Dedicated serene hall for IAM Meditation, yoga sessions, and discourses.' },
  { id: 'A-006', code: 'A-006', name: 'Amritheswari Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 168, y: 644, w: 54, h: 96, door: [222, 696], desc: 'Grand University Cultural Auditorium with stage lighting and 600+ seating capacity.' },
  { id: 'A-003', code: 'A-003', name: 'Admin Suite A-003', wing: 'Admin Block (A)', category: 'OFFICE', x: 422, y: 708, w: 26, h: 76, door: [435, 708], desc: 'Administrative advisory and conference chamber.' },
  { id: 'A-002', code: 'A-002', name: 'ENGM Conference Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 448, y: 708, w: 36, h: 44, door: [466, 708], desc: 'Corporate boardroom and executive seminar conference suite.' },
  { id: 'A-001', code: 'A-001', name: 'Acharya Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 526, y: 644, w: 54, h: 96, door: [526, 696], desc: 'Premier University Auditorium with 500+ seating capacity for convocations and symposiums.' },"""

assert old_admin_block in content, "Could not find old_admin_block in app.js"
content = content.replace(old_admin_block, new_admin_block)

# 2. Update WAYPOINTS
old_wp = """  'wp_west_south_junc':    { id: 'wp_west_south_junc',    x: 350, y: 730, label: 'West Veranda South Junction (PRY-A West / A-004)' },"""
new_wp = """  'wp_west_south_junc':    { id: 'wp_west_south_junc',    x: 350, y: 696, label: 'West Veranda South Junction (PRY-A West / A-004)' },"""
content = content.replace(old_wp, new_wp)

old_wp2 = """  'wp_east_south_junc':    { id: 'wp_east_south_junc',    x: 404, y: 730, label: 'East Veranda South Junction (PRY-A East / A-003)' },"""
new_wp2 = """  'wp_east_south_junc':    { id: 'wp_east_south_junc',    x: 404, y: 696, label: 'East Veranda South Junction (PRY-A East / A-003)' },"""
content = content.replace(old_wp2, new_wp2)

old_admin_wps = """  // 8. South Lobby & Admin Axial Corridor
  'wp_admin_west_end':       { id: 'wp_admin_west_end',       x: 222, y: 730, label: 'Amritheswari Hall Foyer (A-006)' },
  'wp_admin_west_st':        { id: 'wp_admin_west_st',        x: 272, y: 730, label: 'Admin West Stairs' },
  'wp_admin_a005':           { id: 'wp_admin_a005',           x: 295, y: 730, label: 'A-005 Meditation Hall Walkway' },
  'wp_admin_a004':           { id: 'wp_admin_a004',           x: 327, y: 730, label: 'A-004 Executive Office Walkway' },
  'wp_admin_cross':          { id: 'wp_admin_cross',          x: 375, y: 730, label: 'Admin Grand Cross Hallway / Prayer Hall' },
  'wp_admin_a003':           { id: 'wp_admin_a003',           x: 419, y: 730, label: 'A-003 Admin Suite Walkway' },
  'wp_admin_a002':           { id: 'wp_admin_a002',           x: 450, y: 730, label: 'A-002 ENGM Conference Walkway' },
  'wp_admin_east_st':        { id: 'wp_admin_east_st',        x: 460, y: 730, label: 'Admin East Stairs' },
  'wp_admin_east_end':       { id: 'wp_admin_east_end',       x: 526, y: 730, label: 'Acharya Hall Foyer (A-001)' },
  'wp_admin_office':         { id: 'wp_admin_office',         x: 375, y: 750, label: 'Admin Central Office (ADM-01)' },
  'wp_reception':            { id: 'wp_reception',            x: 375, y: 784, label: 'Reception Foyer (REC)' },
  'wp_gad_pr':               { id: 'wp_gad_pr',               x: 375, y: 810, label: 'GAD - PR Office Walkway' },
  'wp_entrance':             { id: 'wp_entrance',             x: 375, y: 861, label: 'Main Entrance Porch' },"""

new_admin_wps = """  // 8. South Lobby & Admin Axial Corridor (Transverse corridor at Y = 696)
  'wp_admin_west_end':       { id: 'wp_admin_west_end',       x: 222, y: 696, label: 'Amritheswari Hall Foyer (A-006)' },
  'wp_admin_west_st':        { id: 'wp_admin_west_st',        x: 262, y: 696, label: 'Admin West Stairs' },
  'wp_admin_a005':           { id: 'wp_admin_a005',           x: 281, y: 696, label: 'A-005 Meditation Hall Walkway' },
  'wp_admin_a004':           { id: 'wp_admin_a004',           x: 313, y: 696, label: 'A-004 Executive Office Walkway' },
  'wp_admin_cross':          { id: 'wp_admin_cross',          x: 374, y: 696, label: 'Admin Grand Cross Hallway / Central Hall' },
  'wp_admin_a003':           { id: 'wp_admin_a003',           x: 435, y: 696, label: 'A-003 Admin Suite Walkway' },
  'wp_admin_a002':           { id: 'wp_admin_a002',           x: 466, y: 696, label: 'A-002 ENGM Conference Walkway' },
  'wp_admin_east_st':        { id: 'wp_admin_east_st',        x: 494, y: 696, label: 'Admin East Stairs' },
  'wp_admin_east_end':       { id: 'wp_admin_east_end',       x: 526, y: 696, label: 'Acharya Hall Foyer (A-001)' },
  'wp_gad_pr':               { id: 'wp_gad_pr',               x: 374, y: 810, label: 'GAD - PR Office Walkway' },
  'wp_entrance':             { id: 'wp_entrance',             x: 374, y: 861, label: 'Main Entrance Porch' },"""

assert old_admin_wps in content, "Could not find old_admin_wps in app.js"
content = content.replace(old_admin_wps, new_admin_wps)

# 3. Update HALLWAY_EDGES for Admin
old_edges = """  // South Lobby & Admin Axial Corridor
  ['wp_admin_cross', 'wp_west_south_junc', 'indoor'],
  ['wp_west_south_junc', 'wp_admin_a004', 'indoor'],
  ['wp_admin_a004', 'wp_admin_a005', 'indoor'],
  ['wp_admin_a005', 'wp_admin_west_st', 'indoor'],
  ['wp_admin_west_st', 'wp_admin_west_end', 'indoor'],
  ['wp_admin_cross', 'wp_east_south_junc', 'indoor'],
  ['wp_east_south_junc', 'wp_admin_a003', 'indoor'],
  ['wp_admin_a003', 'wp_admin_a002', 'indoor'],
  ['wp_admin_a002', 'wp_admin_east_st', 'indoor'],
  ['wp_admin_east_st', 'wp_admin_east_end', 'indoor'],
  ['wp_admin_cross', 'wp_admin_office', 'indoor'],
  ['wp_admin_office', 'wp_reception', 'indoor'],
  ['wp_reception', 'wp_gad_pr', 'indoor'],
  ['wp_gad_pr', 'wp_entrance', 'indoor'],"""

new_edges = """  // South Lobby & Admin Axial Corridor (Transverse corridor along Y = 696)
  ['wp_admin_west_end', 'wp_admin_west_st', 'indoor'],
  ['wp_admin_west_st', 'wp_admin_a005', 'indoor'],
  ['wp_admin_a005', 'wp_admin_a004', 'indoor'],
  ['wp_admin_a004', 'wp_west_south_junc', 'indoor'],
  ['wp_west_south_junc', 'wp_admin_cross', 'indoor'],
  ['wp_admin_cross', 'wp_east_south_junc', 'indoor'],
  ['wp_east_south_junc', 'wp_admin_a003', 'indoor'],
  ['wp_admin_a003', 'wp_admin_a002', 'indoor'],
  ['wp_admin_a002', 'wp_admin_east_st', 'indoor'],
  ['wp_admin_east_st', 'wp_admin_east_end', 'indoor'],
  ['wp_admin_cross', 'wp_gad_pr', 'indoor'],
  ['wp_gad_pr', 'wp_entrance', 'indoor'],"""

assert old_edges in content, "Could not find old_edges in app.js"
content = content.replace(old_edges, new_edges)

# 4. Update SVG layers: layerBuildingBase, layerCourtyards, layerCorridors, layerStairs
old_svg_base = """    <!-- Admin Block Footprint -->
    <path class="building-wing" d="
      M 220 706 L 524 706 L 524 786 L 460 786 L 460 810 L 416 810 L 416 850 L 330 850 L 330 810 L 274 810 L 274 786 L 220 786 Z
    " />"""

new_svg_base = """    <!-- Admin Block Footprint (Spans corridor at y=688 to room bottom y=786/848) -->
    <path class="building-wing" d="
      M 220 688 L 526 688 L 526 786 L 424 786 L 424 848 L 324 848 L 324 786 L 220 786 Z
    " />"""

assert old_svg_base in content, "Could not find old_svg_base in app.js"
content = content.replace(old_svg_base, new_svg_base)

old_svg_courts = """    <!-- 2) Grand Central Courtyard - Lower Quadrangle -->
    <rect class="courtyard-patio" x="352" y="518" width="48" height="180" rx="3" />
    <text x="376" y="594" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 594)" font-weight="600" letter-spacing="1.5">CENTRAL COURTYARD</text>

    <!-- CAD Architectural Dimension Line: 10782 mm -->
    <g class="courtyard-dimension-group">
      <line class="dimension-line" x1="353" y1="624" x2="399" y2="624" />
      <line class="dimension-tick" x1="353" y1="619" x2="353" y2="629" />
      <line class="dimension-tick" x1="399" y1="619" x2="399" y2="629" />
      <polygon points="353,624 357.5,622 357.5,626" fill="rgba(56, 189, 248, 0.75)" />
      <polygon points="399,624 394.5,622 394.5,626" fill="rgba(56, 189, 248, 0.75)" />
      <text class="dimension-text" x="376" y="619" text-anchor="middle" transform="rotate(-90 376 619)">10782 mm</text>
    </g>

    <!-- 3) North Light-Well Gap -->
    <rect class="lightwell-gap" x="228" y="278" width="72" height="132" rx="3" />
    <text x="264" y="344" text-anchor="middle" font-size="5" fill="rgba(56, 189, 248, 0.55)" transform="rotate(-90 264 344)" font-weight="600" letter-spacing="1">LIGHT WELL</text>

    <!-- 4) North Breezeway Gap -->
    <rect class="breezeway-gap" x="228" y="574" width="74" height="162" rx="3" />
    <text x="265" y="659" text-anchor="middle" font-size="5" fill="rgba(148, 163, 184, 0.55)" transform="rotate(-90 265 659)" font-weight="600" letter-spacing="1">BREEZEWAY</text>

    <!-- 5) South Light-Well Gap -->
    <rect class="lightwell-gap" x="448" y="280" width="70" height="158" rx="3" />
    <text x="483" y="360" text-anchor="middle" font-size="5" fill="rgba(56, 189, 248, 0.55)" transform="rotate(-90 483 360)" font-weight="600" letter-spacing="1">LIGHT WELL</text>

    <!-- 6) South Breezeway Gap -->
    <rect class="breezeway-gap" x="448" y="574" width="70" height="162" rx="3" />
    <text x="483" y="659" text-anchor="middle" font-size="5" fill="rgba(148, 163, 184, 0.55)" transform="rotate(-90 483 659)" font-weight="600" letter-spacing="1">BREEZEWAY</text>

    <!-- 7) Patios Flanking Central Prayer Hall (Marked with green boxes by user) -->
    <rect class="courtyard-patio" x="168" y="744" width="104" height="66" rx="2" />
    <rect class="courtyard-patio" x="470" y="744" width="112" height="66" rx="2" />"""

new_svg_courts = """    <!-- 2) Grand Central Courtyard - Lower Quadrangle (Reaches corridor at y=688) -->
    <rect class="courtyard-patio" x="352" y="518" width="48" height="170" rx="3" />
    <text x="376" y="594" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 594)" font-weight="600" letter-spacing="1.5">CENTRAL COURTYARD</text>

    <!-- CAD Architectural Dimension Line: 10782 mm -->
    <g class="courtyard-dimension-group">
      <line class="dimension-line" x1="353" y1="624" x2="399" y2="624" />
      <line class="dimension-tick" x1="353" y1="619" x2="353" y2="629" />
      <line class="dimension-tick" x1="399" y1="619" x2="399" y2="629" />
      <polygon points="353,624 357.5,622 357.5,626" fill="rgba(56, 189, 248, 0.75)" />
      <polygon points="399,624 394.5,622 394.5,626" fill="rgba(56, 189, 248, 0.75)" />
      <text class="dimension-text" x="376" y="619" text-anchor="middle" transform="rotate(-90 376 619)">10782 mm</text>
    </g>

    <!-- 3) North Light-Well Gap -->
    <rect class="lightwell-gap" x="228" y="278" width="72" height="132" rx="3" />
    <text x="264" y="344" text-anchor="middle" font-size="5" fill="rgba(56, 189, 248, 0.55)" transform="rotate(-90 264 344)" font-weight="600" letter-spacing="1">LIGHT WELL</text>

    <!-- 4) North Breezeway Gap -->
    <rect class="breezeway-gap" x="228" y="574" width="74" height="114" rx="3" />
    <text x="265" y="631" text-anchor="middle" font-size="5" fill="rgba(148, 163, 184, 0.55)" transform="rotate(-90 265 631)" font-weight="600" letter-spacing="1">BREEZEWAY</text>

    <!-- 5) South Light-Well Gap -->
    <rect class="lightwell-gap" x="448" y="280" width="70" height="158" rx="3" />
    <text x="483" y="360" text-anchor="middle" font-size="5" fill="rgba(56, 189, 248, 0.55)" transform="rotate(-90 483 360)" font-weight="600" letter-spacing="1">LIGHT WELL</text>

    <!-- 6) South Breezeway Gap -->
    <rect class="breezeway-gap" x="448" y="574" width="70" height="114" rx="3" />
    <text x="483" y="631" text-anchor="middle" font-size="5" fill="rgba(148, 163, 184, 0.55)" transform="rotate(-90 483 631)" font-weight="600" letter-spacing="1">BREEZEWAY</text>

    <!-- 7) Patios Flanking Lower Wings -->
    <rect class="courtyard-patio" x="168" y="744" width="92" height="42" rx="2" />
    <rect class="courtyard-patio" x="484" y="744" width="98" height="42" rx="2" />"""

assert old_svg_courts in content, "Could not find old_svg_courts in app.js"
content = content.replace(old_svg_courts, new_svg_courts)

old_svg_corrs = """    <!-- Admin Transverse Grand Cross Corridor (Single clean pathway) -->
    <rect class="corridor-floor" x="168" y="722" width="414" height="16" rx="1" />
    <line class="corridor-centerline" x1="172" y1="730" x2="576" y2="730" />

    <!-- North Spine Veranda Corridor (Single clean pathway along N-block rooms) -->
    <rect class="corridor-floor" x="346" y="162" width="8" height="564" />
    <line class="corridor-centerline" x1="350" y1="162" x2="350" y2="730" />

    <!-- South Spine Veranda Corridor (Single clean pathway along S-block rooms) -->
    <rect class="corridor-floor" x="400" y="162" width="8" height="564" />
    <line class="corridor-centerline" x1="404" y1="162" x2="404" y2="730" />"""

new_svg_corrs = """    <!-- Admin Transverse Grand Cross Corridor (Single clean pathway above green line at y=696) -->
    <rect class="corridor-floor" x="220" y="688" width="308" height="18" rx="1" />
    <line class="corridor-centerline" x1="222" y1="696" x2="526" y2="696" />

    <!-- North Spine Veranda Corridor (Single clean pathway along N-block rooms) -->
    <rect class="corridor-floor" x="346" y="162" width="8" height="534" />
    <line class="corridor-centerline" x1="350" y1="162" x2="350" y2="696" />

    <!-- South Spine Veranda Corridor (Single clean pathway along S-block rooms) -->
    <rect class="corridor-floor" x="400" y="162" width="8" height="534" />
    <line class="corridor-centerline" x1="404" y1="162" x2="404" y2="696" />"""

assert old_svg_corrs in content, "Could not find old_svg_corrs in app.js"
content = content.replace(old_svg_corrs, new_svg_corrs)

old_entrance_foyer = """    <!-- Main Entrance & Reception Foyer -->
    <rect class="corridor-floor" x="368" y="730" width="14" height="132" rx="1" />
    <line class="corridor-centerline" x1="375" y1="730" x2="375" y2="861" />"""

new_entrance_foyer = """    <!-- Main Entrance & Reception Foyer -->
    <rect class="corridor-floor" x="368" y="806" width="12" height="55" rx="1" />
    <line class="corridor-centerline" x1="374" y1="808" x2="374" y2="861" />"""

assert old_entrance_foyer in content, "Could not find old_entrance_foyer in app.js"
content = content.replace(old_entrance_foyer, new_entrance_foyer)

old_stairs = """  const stairs = [
    { x: 368, y: 491, w: 14, h: 16, steps: 5, dir: 'h' }, // Central Mid-Bridge
    { x: 272, y: 722, w: 12, h: 16, steps: 5, dir: 'v' }, // Admin West
    { x: 456, y: 722, w: 12, h: 16, steps: 5, dir: 'v' }  // Admin East
  ];"""

new_stairs = """  const stairs = [
    { x: 368, y: 491, w: 14, h: 16, steps: 5, dir: 'h' }, // Central Mid-Bridge
    { x: 262, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }, // Admin West
    { x: 486, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }  // Admin East
  ];"""

assert old_stairs in content, "Could not find old_stairs in app.js"
content = content.replace(old_stairs, new_stairs)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully applied all changes to app.js!')
