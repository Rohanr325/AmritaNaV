import re

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. corridorsHtml
part1 = """    <!-- Top Bridge across Atrium -->
    <rect class="corridor-floor" x="346" y="166" width="62" height="9" rx="1" />
    <line class="corridor-centerline" x1="350" y1="170" x2="404" y2="170" />
"""
assert part1 in text, "part1 not found"
text = text.replace(part1, "")

# 2. buildingBaseHtml
part2 = """    <rect class="building-wing" x="346" y="166" width="60" height="16" />\n"""
assert part2 in text, "part2 not found"
text = text.replace(part2, "")

# 3. stairs
part3 = """      { x: 368, y: 172, w: 14, h: 16, steps: 5, dir: 'h' }, // North Stairs\n"""
assert part3 in text, "part3 not found"
text = text.replace(part3, "")

# 4. waypoint
part4 = """  // Top Bridge & Stairs
  wp_f2_north_stair: { id: 'wp_f2_north_stair', x: 374, y: 170, label: 'North Stairs (2nd Fl)' },
"""
assert part4 in text, "part4 not found"
text = text.replace(part4, "")

# 5. edges
part5 = """  // Top Bridge
  ['wp_f2_spine_w_top', 'wp_f2_north_stair'],
  ['wp_f2_north_stair', 'wp_f2_spine_e_top'],
"""
assert part5 in text, "part5 not found"
text = text.replace(part5, "")

# 6. SHARED_STAIRS
part6 = """  { id: 'stair_north', name: 'North Stairs', f0Node: 'wp_north_exit_hub', f2Node: 'wp_f2_north_stair' }\n"""
assert part6 in text, "part6 not found"
text = text.replace(part6, "")
# Clean up trailing comma on previous line if needed
text = text.replace("f2Node: 'wp_f2_mid_stair' },\n];", "f2Node: 'wp_f2_mid_stair' }\n];")

with open('scratch/script_test_mod.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully created scratch/script_test_mod.js")
