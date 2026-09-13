with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

for wp in ['wp_outdoor_west_breezeway', 'wp_outdoor_amri_top', 'wp_outdoor_breezeway_east', 'wp_outdoor_s004a_east', 'wp_se_research_cell', 'wp_se_faculty_s004', 'wp_se_corridor_hub']:
    m = re.search(rf"'{wp}':\s*\{{ id:\s*'{wp}',\s*x:\s*([0-9.]+),\s*y:\s*([0-9.]+)", text)
    if m:
        print(f"{wp}: x={m.group(1)}, y={m.group(2)}")

# Find all edges mentioning these waypoints
print("\n--- EDGES ---")
for wp in ['wp_outdoor_west_breezeway', 'wp_outdoor_amri_top', 'wp_outdoor_breezeway_east', 'wp_outdoor_s004a_east', 'wp_admin_white_junc', 'wp_admin_white_path']:
    edges = re.findall(rf"\[\s*'{wp}'\s*,\s*'(\w+)'\s*,\s*([0-9.]+)\s*\]", text)
    for e in edges:
        print(f"{wp} -> {e[0]} (dist {e[1]})")
    edges_rev = re.findall(rf"\[\s*'(\w+)'\s*,\s*'{wp}'\s*,\s*([0-9.]+)\s*\]", text)
    for e in edges_rev:
        print(f"{e[0]} -> {wp} (dist {e[1]})")
