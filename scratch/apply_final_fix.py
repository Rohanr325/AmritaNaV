import re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Top Bridge corridor in Floor 2
    old_corr = """    <!-- Top Bridge across Atrium -->
    <rect class="corridor-floor" x="346" y="166" width="62" height="9" rx="1" />
    <line class="corridor-centerline" x1="350" y1="170" x2="404" y2="170" />
"""
    assert old_corr in content, f"old_corr not found in {filepath}"
    content = content.replace(old_corr, "")

    # 2. Building wing bridge in Floor 2
    old_wing = """    <rect class="building-wing" x="346" y="166" width="60" height="16" />\n"""
    assert old_wing in content, f"old_wing not found in {filepath}"
    content = content.replace(old_wing, "")

    # 3. Courtyard patio in Floor 2 (open up the atrium void to y=156)
    old_patio = """    <!-- 1) Grand Central Courtyard - Upper Atrium -->
    <rect class="courtyard-patio" x="352" y="180" width="48" height="216" rx="3" />"""
    new_patio = """    <!-- 1) Grand Central Courtyard - Upper Atrium -->
    <rect class="courtyard-patio" x="352" y="156" width="48" height="240" rx="3" />"""
    assert old_patio in content, f"old_patio not found in {filepath}"
    content = content.replace(old_patio, new_patio)

    # 4. North Stairs in Floor 2 stairs array
    old_stairs = """      { x: 368, y: 172, w: 14, h: 16, steps: 5, dir: 'h' }, // North Stairs\n"""
    assert old_stairs in content, f"old_stairs not found in {filepath}"
    content = content.replace(old_stairs, "")

    # 5. Waypoint wp_f2_north_stair
    old_wp = """  // Top Bridge & Stairs
  wp_f2_north_stair: { id: 'wp_f2_north_stair', x: 374, y: 170, label: 'North Stairs (2nd Fl)' },
"""
    assert old_wp in content, f"old_wp not found in {filepath}"
    content = content.replace(old_wp, "")

    # 6. Edges across top bridge
    old_edges = """  // Top Bridge
  ['wp_f2_spine_w_top', 'wp_f2_north_stair'],
  ['wp_f2_north_stair', 'wp_f2_spine_e_top'],
"""
    assert old_edges in content, f"old_edges not found in {filepath}"
    content = content.replace(old_edges, "")

    # 7. SHARED_STAIRS stair_north
    old_shared = """,
  { id: 'stair_north', name: 'North Stairs', f0Node: 'wp_north_exit_hub', f2Node: 'wp_f2_north_stair' }"""
    assert old_shared in content, f"old_shared not found in {filepath}"
    content = content.replace(old_shared, "")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully updated {filepath}")

update_file('script.js')
update_file('app.js')
