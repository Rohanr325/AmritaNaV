# Update app.js with:
# 1. Amritheswari Hall (A-006) and Acharya Hall (A-001) resized to fit orange box: x: 168/526, y: 600, w: 56, h: 108
# 2. Boys Restroom (WC-ADM1) in left green box: x: 224, y: 708, w: 38, h: 42
# 3. Girls Restroom (WC-ADM2) in right green box: x: 484, y: 708, w: 40, h: 42
# 4. White line pathway along x: 232 from y: 600 to 696
# 5. Updated WAYPOINTS and HALLWAY_EDGES
# 6. Updated SVG layers

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update ROOMS_DATA
old_rooms = """  // ---------- ADMIN BLOCK (A) - BOTTOM SECTION ----------
  { id: 'GAD-PR', code: 'GAD', name: 'GAD - PR Office', wing: 'Admin Block (A)', category: 'OFFICE', x: 334, y: 810, w: 78, h: 36, door: [374, 810], desc: 'General Administration Department & Public Relations Liaison Office at the main entrance porch.' },
  { id: 'PRAYER-HALL-A', code: 'PRY-A', name: 'Central Prayer & Admin Hall', wing: 'Admin Block (A)', category: 'ROOM', x: 326, y: 708, w: 96, h: 102, door: [374, 708], desc: 'Unified central sanctuary, administrative registry (ADM-01), reception desk (REC), and student services hub.' },
  { id: 'A-004', code: 'A-004', name: 'Executive Office A-004', wing: 'Admin Block (A)', category: 'OFFICE', x: 300, y: 708, w: 26, h: 44, door: [313, 708], desc: 'Administrative Liaison and records archive.' },
  { id: 'A-005', code: 'A-005', name: 'Special Programs / Meditation', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 262, y: 708, w: 38, h: 76, door: [281, 708], desc: 'Dedicated serene hall for IAM Meditation, yoga sessions, and discourses.' },
  { id: 'A-006', code: 'A-006', name: 'Amritheswari Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 168, y: 644, w: 54, h: 96, door: [222, 696], desc: 'Grand University Cultural Auditorium with stage lighting and 600+ seating capacity.' },
  { id: 'A-003', code: 'A-003', name: 'Admin Suite A-003', wing: 'Admin Block (A)', category: 'OFFICE', x: 422, y: 708, w: 26, h: 76, door: [435, 708], desc: 'Administrative advisory and conference chamber.' },
  { id: 'A-002', code: 'A-002', name: 'ENGM Conference Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 448, y: 708, w: 36, h: 44, door: [466, 708], desc: 'Corporate boardroom and executive seminar conference suite.' },
  { id: 'A-001', code: 'A-001', name: 'Acharya Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 526, y: 644, w: 54, h: 96, door: [526, 696], desc: 'Premier University Auditorium with 500+ seating capacity for convocations and symposiums.' },"""

new_rooms = """  // ---------- ADMIN BLOCK (A) - BOTTOM SECTION ----------
  { id: 'GAD-PR', code: 'GAD', name: 'GAD - PR Office', wing: 'Admin Block (A)', category: 'OFFICE', x: 334, y: 810, w: 78, h: 36, door: [374, 810], desc: 'General Administration Department & Public Relations Liaison Office at the main entrance porch.' },
  { id: 'PRAYER-HALL-A', code: 'PRY-A', name: 'Central Prayer & Admin Hall', wing: 'Admin Block (A)', category: 'ROOM', x: 326, y: 708, w: 96, h: 102, door: [374, 708], desc: 'Unified central sanctuary, administrative registry (ADM-01), reception desk (REC), and student services hub.' },
  { id: 'A-004', code: 'A-004', name: 'Executive Office A-004', wing: 'Admin Block (A)', category: 'OFFICE', x: 300, y: 708, w: 26, h: 44, door: [313, 708], desc: 'Administrative Liaison and records archive.' },
  { id: 'A-005', code: 'A-005', name: 'Special Programs / Meditation', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 262, y: 708, w: 38, h: 76, door: [281, 708], desc: 'Dedicated serene hall for IAM Meditation, yoga sessions, and discourses.' },
  { id: 'TOILET-BOYS-ADMIN', code: 'WC-ADM1', name: 'Boys Restroom (Admin / A-006)', wing: 'Admin Block (A)', category: 'TOILET', x: 224, y: 708, w: 38, h: 42, door: [243, 708], desc: 'Gents washroom and sanitary facility adjacent to Amritheswari Hall.' },
  { id: 'A-006', code: 'A-006', name: 'Amritheswari Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 168, y: 600, w: 56, h: 108, door: [224, 696], desc: 'Grand University Cultural Auditorium with stage lighting and 600+ seating capacity.' },
  { id: 'A-003', code: 'A-003', name: 'Admin Suite A-003', wing: 'Admin Block (A)', category: 'OFFICE', x: 422, y: 708, w: 26, h: 76, door: [435, 708], desc: 'Administrative advisory and conference chamber.' },
  { id: 'A-002', code: 'A-002', name: 'ENGM Conference Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 448, y: 708, w: 36, h: 44, door: [466, 708], desc: 'Corporate boardroom and executive seminar conference suite.' },
  { id: 'TOILET-GIRLS-ADMIN', code: 'WC-ADM2', name: 'Girls Restroom (Admin / A-001)', wing: 'Admin Block (A)', category: 'TOILET', x: 484, y: 708, w: 40, h: 42, door: [504, 708], desc: 'Ladies washroom and sanitary facility adjacent to Acharya Hall.' },
  { id: 'A-001', code: 'A-001', name: 'Acharya Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 526, y: 600, w: 56, h: 108, door: [526, 696], desc: 'Premier University Auditorium with 500+ seating capacity for convocations and symposiums.' },"""

assert old_rooms in content, "Could not find old_rooms in app.js"
content = content.replace(old_rooms, new_rooms)

# 2. Update WAYPOINTS
old_admin_wps = """  // 8. South Lobby & Admin Axial Corridor (Transverse corridor at Y = 696)
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

new_admin_wps = """  // 8. South Lobby & Admin Axial Corridor (Transverse corridor at Y = 696)
  'wp_admin_west_end':       { id: 'wp_admin_west_end',       x: 224, y: 696, label: 'Amritheswari Hall Foyer (A-006)' },
  'wp_admin_white_path':     { id: 'wp_admin_white_path',     x: 232, y: 648, label: 'Amritheswari East Breezeway Pathway' },
  'wp_admin_wc_boys':        { id: 'wp_admin_wc_boys',        x: 243, y: 696, label: 'Boys Restroom Walkway (Admin)' },
  'wp_admin_west_st':        { id: 'wp_admin_west_st',        x: 262, y: 696, label: 'Admin West Stairs' },
  'wp_admin_a005':           { id: 'wp_admin_a005',           x: 281, y: 696, label: 'A-005 Meditation Hall Walkway' },
  'wp_admin_a004':           { id: 'wp_admin_a004',           x: 313, y: 696, label: 'A-004 Executive Office Walkway' },
  'wp_admin_cross':          { id: 'wp_admin_cross',          x: 374, y: 696, label: 'Admin Grand Cross Hallway / Central Hall' },
  'wp_admin_a003':           { id: 'wp_admin_a003',           x: 435, y: 696, label: 'A-003 Admin Suite Walkway' },
  'wp_admin_a002':           { id: 'wp_admin_a002',           x: 466, y: 696, label: 'A-002 ENGM Conference Walkway' },
  'wp_admin_east_st':        { id: 'wp_admin_east_st',        x: 486, y: 696, label: 'Admin East Stairs' },
  'wp_admin_wc_girls':       { id: 'wp_admin_wc_girls',       x: 504, y: 696, label: 'Girls Restroom Walkway (Admin)' },
  'wp_admin_east_end':       { id: 'wp_admin_east_end',       x: 526, y: 696, label: 'Acharya Hall Foyer (A-001)' },
  'wp_gad_pr':               { id: 'wp_gad_pr',               x: 374, y: 810, label: 'GAD - PR Office Walkway' },
  'wp_entrance':             { id: 'wp_entrance',             x: 374, y: 861, label: 'Main Entrance Porch' },"""

assert old_admin_wps in content, "Could not find old_admin_wps in app.js"
content = content.replace(old_admin_wps, new_admin_wps)

# Update wp_outdoor_west_breezeway
content = content.replace(
    "'wp_outdoor_west_breezeway':  { id: 'wp_outdoor_west_breezeway',  x: 220, y: 676, label: 'West Courtyard Breezeway Entry' },",
    "'wp_outdoor_west_breezeway':  { id: 'wp_outdoor_west_breezeway',  x: 232, y: 600, label: 'West Courtyard Breezeway Entry' },"
)

# 3. Update HALLWAY_EDGES
old_edges = """  // South Lobby & Admin Axial Corridor (Transverse corridor along Y = 696)
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

new_edges = """  // South Lobby & Admin Axial Corridor (Transverse corridor along Y = 696)
  ['wp_admin_west_end', 'wp_admin_white_path', 'indoor'],
  ['wp_admin_white_path', 'wp_admin_wc_boys', 'indoor'],
  ['wp_admin_west_end', 'wp_admin_wc_boys', 'indoor'],
  ['wp_admin_wc_boys', 'wp_admin_west_st', 'indoor'],
  ['wp_admin_west_st', 'wp_admin_a005', 'indoor'],
  ['wp_admin_a005', 'wp_admin_a004', 'indoor'],
  ['wp_admin_a004', 'wp_west_south_junc', 'indoor'],
  ['wp_west_south_junc', 'wp_admin_cross', 'indoor'],
  ['wp_admin_cross', 'wp_east_south_junc', 'indoor'],
  ['wp_east_south_junc', 'wp_admin_a003', 'indoor'],
  ['wp_admin_a003', 'wp_admin_a002', 'indoor'],
  ['wp_admin_a002', 'wp_admin_east_st', 'indoor'],
  ['wp_admin_east_st', 'wp_admin_wc_girls', 'indoor'],
  ['wp_admin_wc_girls', 'wp_admin_east_end', 'indoor'],
  ['wp_admin_cross', 'wp_gad_pr', 'indoor'],
  ['wp_gad_pr', 'wp_entrance', 'indoor'],

  // White line pathway along East side of Amritheswari Hall:
  ['wp_admin_white_path', 'wp_outdoor_west_breezeway', 'indoor'],"""

assert old_edges in content, "Could not find old_edges in app.js"
content = content.replace(old_edges, new_edges)

# 4. Update SVG layers:
# layerBuildingBase auditoriums
old_auditoriums = """    <!-- Amritheswari Hall Wing (Detached Auditorium A-006, aligned to x=168) -->
    <rect class="building-wing" x="168" y="640" width="58" height="102" rx="2" />

    <!-- South Outer Workshops (Upper - WC-S2, S-011B to Workshop, WC-S1, aligned to x=580) -->
    <rect class="building-wing" x="522" y="266" width="60" height="172" rx="2" />

    <!-- South Outer Labs (Lower - Materials to Manufacturing to Faculty, aligned to x=580) -->
    <rect class="building-wing" x="522" y="444" width="60" height="134" rx="2" />

    <!-- Acharya Hall Wing (Detached Auditorium A-001, aligned to x=580) -->
    <rect class="building-wing" x="522" y="640" width="60" height="102" rx="2" />"""

new_auditoriums = """    <!-- Amritheswari Hall Wing (Resized to fit orange box: x=168, y=596..710) -->
    <rect class="building-wing" x="168" y="596" width="58" height="114" rx="2" />

    <!-- South Outer Workshops (Upper - WC-S2, S-011B to Workshop, WC-S1, aligned to x=580) -->
    <rect class="building-wing" x="522" y="266" width="60" height="172" rx="2" />

    <!-- South Outer Labs (Lower - Materials to Manufacturing to Faculty, aligned to x=580) -->
    <rect class="building-wing" x="522" y="444" width="60" height="134" rx="2" />

    <!-- Acharya Hall Wing (Resized & aligned to fit orange box: x=524, y=596..710) -->
    <rect class="building-wing" x="524" y="596" width="60" height="114" rx="2" />"""

assert old_auditoriums in content, "Could not find old_auditoriums in app.js"
content = content.replace(old_auditoriums, new_auditoriums)

# Update layerCorridors to include the white line pathway
old_corridors = """    <!-- Admin Transverse Grand Cross Corridor (Single clean pathway above green line at y=696) -->
    <rect class="corridor-floor" x="220" y="688" width="308" height="18" rx="1" />
    <line class="corridor-centerline" x1="222" y1="696" x2="526" y2="696" />"""

new_corridors = """    <!-- Admin Transverse Grand Cross Corridor (Single clean pathway above green line at y=696) -->
    <rect class="corridor-floor" x="220" y="688" width="308" height="18" rx="1" />
    <line class="corridor-centerline" x1="222" y1="696" x2="526" y2="696" />

    <!-- Amritheswari East Breezeway Pathway (White line in user sketch) -->
    <rect class="corridor-floor" x="227" y="600" width="10" height="96" rx="1" />
    <line class="corridor-centerline" x1="232" y1="600" x2="232" y2="696" />"""

assert old_corridors in content, "Could not find old_corridors in app.js"
content = content.replace(old_corridors, new_corridors)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated app.js successfully!')
