with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Find all rooms
room_matches = re.findall(r"\{\s*id:\s*'([^']+)',\s*code:\s*'([^']+)',\s*name:\s*'([^']+)',.*?x:\s*([0-9.]+),\s*y:\s*([0-9.]+),\s*w:\s*([0-9.]+),\s*h:\s*([0-9.]+),\s*door:\s*\[([0-9., ]+)\]", text, re.S)
rooms = [{'id': r[0], 'code': r[1], 'name': r[2], 'x': float(r[3]), 'y': float(r[4]), 'w': float(r[5]), 'h': float(r[6]), 'door': [float(v) for v in r[7].split(',')]} for r in room_matches]

# Check room overlaps with each other
print('=== CHECKING ROOMS OVERLAPPING WITH OTHER ROOMS ===')
for i in range(len(rooms)):
    for j in range(i+1, len(rooms)):
        r1, r2 = rooms[i], rooms[j]
        ox = max(0, min(r1['x'] + r1['w'], r2['x'] + r2['w']) - max(r1['x'], r2['x']))
        oy = max(0, min(r1['y'] + r1['h'], r2['y'] + r2['h']) - max(r1['y'], r2['y']))
        if ox > 0.5 and oy > 0.5:
            print(f"ROOM-ROOM OVERLAP: {r1['code']} [x={r1['x']}, y={r1['y']}, w={r1['w']}, h={r1['h']}] overlaps {r2['code']} [x={r2['x']}, y={r2['y']}, w={r2['w']}, h={r2['h']}] by {ox:.1f}x{oy:.1f}")

# Check rooms near S-004, S-004A, Acharya Hall
print('\n=== ROOMS IN SOUTHEAST / ACHARYA AREA ===')
for r in rooms:
    if r['x'] > 450 and r['y'] > 500:
        print(f"{r['code']} ({r['id']}): x={r['x']}..{r['x']+r['w']}, y={r['y']}..{r['y']+r['h']}, door={r['door']}")

# Check rooms in SW / Amritheswari Area
print('\n=== ROOMS IN SOUTHWEST / AMRITHESWARI AREA ===')
for r in rooms:
    if r['x'] < 300 and r['y'] > 500:
        print(f"{r['code']} ({r['id']}): x={r['x']}..{r['x']+r['w']}, y={r['y']}..{r['y']+r['h']}, door={r['door']}")
