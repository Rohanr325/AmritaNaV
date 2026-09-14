for fname in ['script.js', 'app.js']:
    with open(fname, 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Update A-003 and A-002 sizes in ROOMS_DATA
    old_rooms = """  { id: 'A-003', code: 'A-003', name: 'Admin Suite A-003', wing: 'Admin Block (A)', category: 'OFFICE', x: 422, y: 708, w: 26, h: 76, door: [435, 708], desc: 'Administrative advisory and conference chamber.' },
  { id: 'A-002', code: 'A-002', name: 'ENGM Conf Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 448, y: 708, w: 36, h: 44, door: [466, 708], desc: 'Corporate boardroom and executive seminar conference suite.' },"""

    new_rooms = """  { id: 'A-003', code: 'A-003', name: 'Admin Suite A-003', wing: 'Admin Block (A)', category: 'OFFICE', x: 422, y: 708, w: 26, h: 44, door: [435, 708], desc: 'Administrative advisory and conference chamber.' },
  { id: 'A-002', code: 'A-002', name: 'ENGM Conf Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 448, y: 708, w: 38, h: 76, door: [467, 708], desc: 'Corporate boardroom and executive seminar conference suite.' },"""

    assert old_rooms in text, f"old_rooms not found in {fname}"
    text = text.replace(old_rooms, new_rooms)

    # 2. Update WC-GIRLS if needed to ensure x=486, w=38
    old_wc = "{ id: 'TOILET-GIRLS-ADMIN', code: 'WC-GIRLS', name: 'Girls Restroom', wing: 'Admin Block (A)', category: 'TOILET', x: 484, y: 708, w: 40, h: 42, door: [504, 708]"
    new_wc = "{ id: 'TOILET-GIRLS-ADMIN', code: 'WC-GIRLS', name: 'Girls Restroom', wing: 'Admin Block (A)', category: 'TOILET', x: 486, y: 708, w: 38, h: 42, door: [505, 708]"
    if old_wc in text:
        text = text.replace(old_wc, new_wc)

    # 3. Update waypoint coordinates for A-002 and WC-GIRLS
    old_wp = """  'wp_admin_a002':           { id: 'wp_admin_a002',           x: 466, y: 696, label: 'A-002 ENGM Conference Walkway' },"""
    new_wp = """  'wp_admin_a002':           { id: 'wp_admin_a002',           x: 467, y: 696, label: 'A-002 ENGM Conference Walkway' },"""
    if old_wp in text:
        text = text.replace(old_wp, new_wp)

    old_wc_wp = """  'wp_admin_wc_girls':       { id: 'wp_admin_wc_girls',       x: 504, y: 696, label: 'Girls Restroom Walkway (Admin)' },"""
    new_wc_wp = """  'wp_admin_wc_girls':       { id: 'wp_admin_wc_girls',       x: 505, y: 696, label: 'Girls Restroom Walkway (Admin)' },"""
    if old_wc_wp in text:
        text = text.replace(old_wc_wp, new_wc_wp)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(text)

print("Successfully updated A-002 and A-003 sizes in script.js and app.js!")
