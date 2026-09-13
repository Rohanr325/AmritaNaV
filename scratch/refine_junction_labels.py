with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update text truncation for small rooms in renderSvgMap
old_label_code = """    let displayName = r.name;
    if (displayName.length > 14 && r.w < 55) {
      displayName = displayName.substring(0, 12) + '..';
    }"""

new_label_code = """    let displayName = r.name;
    if (r.w < 42 && displayName.length > 10) {
      displayName = displayName.substring(0, 9) + '..';
    } else if (displayName.length > 14 && r.w < 55) {
      displayName = displayName.substring(0, 12) + '..';
    }"""

assert old_label_code in content, "Could not find old_label_code"
content = content.replace(old_label_code, new_label_code)

# 2. Update room names/codes for the two toilets and A-002
old_room_defs = """  { id: 'TOILET-BOYS-ADMIN', code: 'WC-ADM1', name: 'Boys Restroom (Admin / A-006)', wing: 'Admin Block (A)', category: 'TOILET', x: 224, y: 708, w: 38, h: 42, door: [243, 708], desc: 'Gents washroom and sanitary facility adjacent to Amritheswari Hall.' },
  { id: 'A-006', code: 'A-006', name: 'Amritheswari Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 168, y: 600, w: 56, h: 108, door: [224, 696], desc: 'Grand University Cultural Auditorium with stage lighting and 600+ seating capacity.' },
  { id: 'A-003', code: 'A-003', name: 'Admin Suite A-003', wing: 'Admin Block (A)', category: 'OFFICE', x: 422, y: 708, w: 26, h: 76, door: [435, 708], desc: 'Administrative advisory and conference chamber.' },
  { id: 'A-002', code: 'A-002', name: 'ENGM Conference Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 448, y: 708, w: 36, h: 44, door: [466, 708], desc: 'Corporate boardroom and executive seminar conference suite.' },
  { id: 'TOILET-GIRLS-ADMIN', code: 'WC-ADM2', name: 'Girls Restroom (Admin / A-001)', wing: 'Admin Block (A)', category: 'TOILET', x: 484, y: 708, w: 40, h: 42, door: [504, 708], desc: 'Ladies washroom and sanitary facility adjacent to Acharya Hall.' },"""

new_room_defs = """  { id: 'TOILET-BOYS-ADMIN', code: 'WC-BOYS', name: 'Boys Restroom', wing: 'Admin Block (A)', category: 'TOILET', x: 224, y: 708, w: 38, h: 42, door: [243, 708], desc: 'Gents washroom and sanitary facility adjacent to Amritheswari Hall.' },
  { id: 'A-006', code: 'A-006', name: 'Amritheswari Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 168, y: 600, w: 56, h: 108, door: [224, 696], desc: 'Grand University Cultural Auditorium with stage lighting and 600+ seating capacity.' },
  { id: 'A-003', code: 'A-003', name: 'Admin Suite A-003', wing: 'Admin Block (A)', category: 'OFFICE', x: 422, y: 708, w: 26, h: 76, door: [435, 708], desc: 'Administrative advisory and conference chamber.' },
  { id: 'A-002', code: 'A-002', name: 'ENGM Conf Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 448, y: 708, w: 36, h: 44, door: [466, 708], desc: 'Corporate boardroom and executive seminar conference suite.' },
  { id: 'TOILET-GIRLS-ADMIN', code: 'WC-GIRLS', name: 'Girls Restroom', wing: 'Admin Block (A)', category: 'TOILET', x: 484, y: 708, w: 40, h: 42, door: [504, 708], desc: 'Ladies washroom and sanitary facility adjacent to Acharya Hall.' },"""

assert old_room_defs in content, "Could not find old_room_defs"
content = content.replace(old_room_defs, new_room_defs)

# 3. Update WAYPOINTS and EDGES for clean orthogonal T-junction
old_wp_block = """  'wp_admin_west_end':       { id: 'wp_admin_west_end',       x: 224, y: 696, label: 'Amritheswari Hall Foyer (A-006)' },
  'wp_admin_white_path':     { id: 'wp_admin_white_path',     x: 232, y: 648, label: 'Amritheswari East Breezeway Pathway' },
  'wp_admin_wc_boys':        { id: 'wp_admin_wc_boys',        x: 243, y: 696, label: 'Boys Restroom Walkway (Admin)' },"""

new_wp_block = """  'wp_admin_west_end':       { id: 'wp_admin_west_end',       x: 224, y: 696, label: 'Amritheswari Hall Foyer (A-006)' },
  'wp_admin_white_junc':     { id: 'wp_admin_white_junc',     x: 232, y: 696, label: 'Amritheswari Corridor T-Junction' },
  'wp_admin_white_path':     { id: 'wp_admin_white_path',     x: 232, y: 648, label: 'Amritheswari East Breezeway Pathway' },
  'wp_admin_wc_boys':        { id: 'wp_admin_wc_boys',        x: 243, y: 696, label: 'Boys Restroom Walkway (Admin)' },"""

assert old_wp_block in content, "Could not find old_wp_block"
content = content.replace(old_wp_block, new_wp_block)

old_edges_block = """  // South Lobby & Admin Axial Corridor (Transverse corridor along Y = 696)
  ['wp_admin_west_end', 'wp_admin_white_path', 'indoor'],
  ['wp_admin_white_path', 'wp_admin_wc_boys', 'indoor'],
  ['wp_admin_west_end', 'wp_admin_wc_boys', 'indoor'],"""

new_edges_block = """  // South Lobby & Admin Axial Corridor (Transverse corridor along Y = 696)
  ['wp_admin_west_end', 'wp_admin_white_junc', 'indoor'],
  ['wp_admin_white_junc', 'wp_admin_wc_boys', 'indoor'],
  ['wp_admin_white_junc', 'wp_admin_white_path', 'indoor'],"""

assert old_edges_block in content, "Could not find old_edges_block"
content = content.replace(old_edges_block, new_edges_block)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated app.js with perfected orthogonal T-junction and labels!')
