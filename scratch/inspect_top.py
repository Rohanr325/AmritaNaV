with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Look at Floor 0 top bridge vs Floor 2
print("=== Floor 0 Top Bridge references ===")
f0_idx = text.find("Floor 0")
f2_idx = text.find("FLOORS_DATA = {")
f2_end = text.find("ALL_ROOMS =")
f0_part = text[f0_idx:text.find("id: 2,")]
f2_part = text[text.find("id: 2,"):f2_end]

for line in f0_part.splitlines():
    if "Top Bridge" in line or "wp_west_spine_top" in line or "wp_north_exit_hub" in line:
        print("F0:", line.strip())

print("\n=== Floor 2 Top Bridge references ===")
for line in f2_part.splitlines():
    if "Top Bridge" in line or "spine_w_top" in line or "north_stair" in line or "166" in line or "170" in line or "172" in line:
        print("F2:", line.strip())
