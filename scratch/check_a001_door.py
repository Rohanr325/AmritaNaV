with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect where A-001 door is:
# door is [526, 696]
# nearest waypoint:
# let's see which waypoint is nearest to [526, 696]
import re
import math
wp_raw = re.findall(r"'(\w+)':\s*\{\s*id:\s*'\w+',\s*x:\s*([0-9.]+),\s*y:\s*([0-9.]+)", text)
waypoints = {m[0]: {'x': float(m[1]), 'y': float(m[2])} for m in wp_raw}

door = [526, 696]
for n, pt in waypoints.items():
    d = math.hypot(door[0] - pt['x'], door[1] - pt['y'])
    if d < 10:
        print(f"{n}: dist = {d}")
