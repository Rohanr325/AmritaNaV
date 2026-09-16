import re

def update_code(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Floor 0 waypoints: add 4 stair hubs
    old_f0_wp_target = "  'wp_admin_east_st':        { id: 'wp_admin_east_st',        x: 486, y: 696, label: 'Admin East Stairs' },"
    new_f0_wp_target = """  'wp_admin_east_st':        { id: 'wp_admin_east_st',        x: 486, y: 696, label: 'Admin East Corridor' },
  // 4 Master Staircase Hubs
  'wp_north_stair_hub':      { id: 'wp_north_stair_hub',      x: 376, y: 268, label: 'North Atrium Stairs (to 2nd Fl)' },
  'wp_mid_stair_hub':        { id: 'wp_mid_stair_hub',        x: 376, y: 506, label: 'Mid Atrium Stairs (to 2nd Fl)' },
  'wp_sw_stair_hub':         { id: 'wp_sw_stair_hub',         x: 346, y: 660, label: 'SW Courtyard Stairs (to 2nd Fl)' },
  'wp_se_stair_hub':         { id: 'wp_se_stair_hub',         x: 404, y: 660, label: 'SE Courtyard Stairs (to 2nd Fl)' },"""
    assert old_f0_wp_target in content, f"old_f0_wp_target not found in {filepath}"
    content = content.replace(old_f0_wp_target, new_f0_wp_target, 1)

    # 2. Update Floor 0 edges: connect the 4 stair hubs
    old_f0_edge1 = "  ['wp_west_admis', 'wp_west_south_junc', 'indoor'],"
    new_f0_edge1 = """  ['wp_west_admis', 'wp_sw_stair_hub', 'indoor'],
  ['wp_sw_stair_hub', 'wp_west_south_junc', 'indoor'],"""
    assert old_f0_edge1 in content, f"old_f0_edge1 not found in {filepath}"
    content = content.replace(old_f0_edge1, new_f0_edge1, 1)

    old_f0_edge2 = "  ['wp_east_guest', 'wp_east_south_junc', 'indoor'],"
    new_f0_edge2 = """  ['wp_east_guest', 'wp_se_stair_hub', 'indoor'],
  ['wp_se_stair_hub', 'wp_east_south_junc', 'indoor'],"""
    assert old_f0_edge2 in content, f"old_f0_edge2 not found in {filepath}"
    content = content.replace(old_f0_edge2, new_f0_edge2, 1)

    old_f0_edge3 = "  ['wp_west_lower_bridge', 'wp_east_lower_bridge', 'indoor'],"
    new_f0_edge3 = """  ['wp_west_lower_bridge', 'wp_mid_stair_hub', 'indoor'],
  ['wp_mid_stair_hub', 'wp_east_lower_bridge', 'indoor'],
  ['wp_west_upper_branch', 'wp_north_stair_hub', 'indoor'],
  ['wp_north_stair_hub', 'wp_east_upper_branch', 'indoor'],"""
    assert old_f0_edge3 in content, f"old_f0_edge3 not found in {filepath}"
    content = content.replace(old_f0_edge3, new_f0_edge3, 1)

    # 3. Update Floor 0 stairs array (include preceding line for uniqueness)
    old_f0_stairs = """  ['wp_outdoor_sw_north_junc', 'wp_nw_lab_metallurgy', 'outdoor']
    ],
    stairs: [
      { x: 368, y: 491, w: 14, h: 16, steps: 5, dir: 'h' }, // Central Mid-Bridge
      { x: 262, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }, // Admin West
      { x: 486, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }  // Admin East
    ],"""
    new_f0_stairs = """  ['wp_outdoor_sw_north_junc', 'wp_nw_lab_metallurgy', 'outdoor']
    ],
    stairs: [
      { id: 'stair_north', name: 'North Atrium Stairs', type: 'atrium_double', x: 355, y: 253, w: 42, h: 20, targetFloor: 2, badge: 'STAIRS ▲ 2F', labelX: 376, labelY: 248 },
      { id: 'stair_mid', name: 'Mid Atrium Stairs', type: 'atrium_double', x: 355, y: 490, w: 42, h: 20, targetFloor: 2, badge: 'STAIRS ▲ 2F', labelX: 376, labelY: 485 },
      { id: 'stair_sw', name: 'South-West Courtyard Stairs', type: 'l_shaped_sw', x: 316, y: 636, w: 34, h: 52, targetFloor: 2, badge: 'STAIRS ▲ 2F', labelX: 326, labelY: 630 },
      { id: 'stair_se', name: 'South-East Courtyard Stairs', type: 'l_shaped_se', x: 398, y: 636, w: 34, h: 52, targetFloor: 2, badge: 'STAIRS ▲ 2F', labelX: 422, labelY: 630 }
    ],"""
    assert old_f0_stairs in content, f"old_f0_stairs not found in {filepath}"
    content = content.replace(old_f0_stairs, new_f0_stairs, 1)

    # 4. Adjust Floor 0 courtyard text so OPEN ATRIUM at y=260 doesn't overlap North Stairs
    old_court_text = """    <rect class="courtyard-patio" x="352" y="180" width="48" height="308" rx="3" />
    <text x="376" y="260" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 260)" font-weight="600" letter-spacing="1.5">OPEN ATRIUM</text>"""
    new_court_text = """    <rect class="courtyard-patio" x="352" y="180" width="48" height="308" rx="3" />
    <text x="376" y="220" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 220)" font-weight="600" letter-spacing="1.5">OPEN ATRIUM</text>"""
    if old_court_text in content:
        content = content.replace(old_court_text, new_court_text, 1)

    # 5. Update Floor 2 waypoints: add 4 stair hubs
    old_f2_wp_target = "  wp_f2_mid_stair: { id: 'wp_f2_mid_stair', x: 374, y: 508, label: 'Central Mid Stairs (2nd Fl)' },"
    new_f2_wp_target = """  wp_f2_mid_stair: { id: 'wp_f2_mid_stair', x: 376, y: 506, label: 'Mid Atrium Stairs (2nd Fl)' },
  wp_f2_north_stair: { id: 'wp_f2_north_stair', x: 376, y: 268, label: 'North Atrium Stairs (2nd Fl)' },
  wp_f2_sw_stair_hub: { id: 'wp_f2_sw_stair_hub', x: 346, y: 660, label: 'SW Courtyard Stairs (2nd Fl)' },
  wp_f2_se_stair_hub: { id: 'wp_f2_se_stair_hub', x: 404, y: 660, label: 'SE Courtyard Stairs (2nd Fl)' },"""
    assert old_f2_wp_target in content, f"old_f2_wp_target not found in {filepath}"
    content = content.replace(old_f2_wp_target, new_f2_wp_target, 1)

    # 6. Update Floor 2 edges
    old_f2_edge1 = "  ['wp_f2_spine_w_bottom', 'wp_f2_n201'],"
    new_f2_edge1 = """  ['wp_f2_spine_w_bottom', 'wp_f2_sw_stair_hub'],
  ['wp_f2_sw_stair_hub', 'wp_f2_n201'],"""
    assert old_f2_edge1 in content, f"old_f2_edge1 not found in {filepath}"
    content = content.replace(old_f2_edge1, new_f2_edge1, 1)

    old_f2_edge2 = "  ['wp_f2_spine_e_bottom', 'wp_f2_s201'],"
    new_f2_edge2 = """  ['wp_f2_spine_e_bottom', 'wp_f2_se_stair_hub'],
  ['wp_f2_se_stair_hub', 'wp_f2_s201'],"""
    assert old_f2_edge2 in content, f"old_f2_edge2 not found in {filepath}"
    content = content.replace(old_f2_edge2, new_f2_edge2, 1)

    old_f2_edge3 = "  ['wp_f2_spine_w_cross_upper', 'wp_f2_spine_e_cross_upper'],"
    new_f2_edge3 = """  ['wp_f2_spine_w_cross_upper', 'wp_f2_north_stair'],
  ['wp_f2_north_stair', 'wp_f2_spine_e_cross_upper'],"""
    assert old_f2_edge3 in content, f"old_f2_edge3 not found in {filepath}"
    content = content.replace(old_f2_edge3, new_f2_edge3, 1)

    # 7. Update Floor 2 stairs array (include preceding line for uniqueness)
    old_f2_stairs = """  ['wp_f2_unesco_mid', 'wp_f2_spine_e_mid_east']
    ],
    stairs: [
      { x: 368, y: 491, w: 14, h: 16, steps: 5, dir: 'h' }, // Central Mid-Bridge
      { x: 262, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }, // Admin West
      { x: 486, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }  // Admin East
    ],"""
    new_f2_stairs = """  ['wp_f2_unesco_mid', 'wp_f2_spine_e_mid_east']
    ],
    stairs: [
      { id: 'stair_north', name: 'North Atrium Stairs', type: 'atrium_double', x: 355, y: 253, w: 42, h: 20, targetFloor: 0, badge: 'STAIRS ▼ GF', labelX: 376, labelY: 248 },
      { id: 'stair_mid', name: 'Mid Atrium Stairs', type: 'atrium_double', x: 355, y: 490, w: 42, h: 20, targetFloor: 0, badge: 'STAIRS ▼ GF', labelX: 376, labelY: 485 },
      { id: 'stair_sw', name: 'South-West Courtyard Stairs', type: 'l_shaped_sw', x: 316, y: 636, w: 34, h: 52, targetFloor: 0, badge: 'STAIRS ▼ GF', labelX: 326, labelY: 630 },
      { id: 'stair_se', name: 'South-East Courtyard Stairs', type: 'l_shaped_se', x: 398, y: 636, w: 34, h: 52, targetFloor: 0, badge: 'STAIRS ▼ GF', labelX: 422, labelY: 630 }
    ],"""
    assert old_f2_stairs in content, f"old_f2_stairs not found in {filepath}"
    content = content.replace(old_f2_stairs, new_f2_stairs, 1)

    # 8. Update SHARED_STAIRS
    old_shared = """const SHARED_STAIRS = [
  { id: 'stair_admin_w', name: 'Admin West Staircase', f0Node: 'wp_admin_west_st', f2Node: 'wp_f2_stair_admin_w' },
  { id: 'stair_admin_e', name: 'Admin East Staircase', f0Node: 'wp_admin_east_st', f2Node: 'wp_f2_stair_admin_e' },
  { id: 'stair_mid', name: 'Central Mid-Bridge Stairs', f0Node: 'wp_west_lower_bridge', f2Node: 'wp_f2_mid_stair' }
];"""
    new_shared = """const SHARED_STAIRS = [
  { id: 'stair_north', name: 'North Atrium Stairs', f0Node: 'wp_north_stair_hub', f2Node: 'wp_f2_north_stair' },
  { id: 'stair_mid', name: 'Mid Atrium Stairs', f0Node: 'wp_mid_stair_hub', f2Node: 'wp_f2_mid_stair' },
  { id: 'stair_sw', name: 'South-West Courtyard Stairs', f0Node: 'wp_sw_stair_hub', f2Node: 'wp_f2_sw_stair_hub' },
  { id: 'stair_se', name: 'South-East Courtyard Stairs', f0Node: 'wp_se_stair_hub', f2Node: 'wp_f2_se_stair_hub' }
];"""
    assert old_shared in content, f"old_shared not found in {filepath}"
    content = content.replace(old_shared, new_shared, 1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully updated {filepath}")

update_code('script.js')
update_code('app.js')
