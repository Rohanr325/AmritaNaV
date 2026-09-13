with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

room_matches = re.findall(r"\{\s*id:\s*'([^']+)',\s*code:\s*'([^']+)',\s*name:\s*'([^']+)',.*?x:\s*([0-9.]+),\s*y:\s*([0-9.]+),\s*w:\s*([0-9.]+),\s*h:\s*([0-9.]+),\s*door:\s*\[([0-9., ]+)\]", text, re.S)
rooms = {r[0]: {'id': r[0], 'code': r[1], 'name': r[2], 'x': float(r[3]), 'y': float(r[4]), 'w': float(r[5]), 'h': float(r[6]), 'door': [float(v) for v in r[7].split(',')]} for r in room_matches}

# Let's inspect N-block column (x=304..346)
print("=== N-BLOCK VERTICAL STACK (x=304..346) ===")
n_rooms = [r for r in rooms.values() if 300 <= r['x'] <= 310]
n_rooms.sort(key=lambda r: r['y'])
for r in n_rooms:
    print(f"{r['code']}: y={r['y']}..{r['y']+r['h']} (h={r['h']}), door={r['door']}")

# Let's inspect S-block column (x=404..450)
print("\n=== S-BLOCK VERTICAL STACK (x=404..450) ===")
s_rooms = [r for r in rooms.values() if 400 <= r['x'] <= 410]
s_rooms.sort(key=lambda r: r['y'])
for r in s_rooms:
    print(f"{r['code']}: y={r['y']}..{r['y']+r['h']} (h={r['h']}), door={r['door']}")

# Let's inspect East Wing column (x=528..580)
print("\n=== EAST WING VERTICAL STACK (x=526..580) ===")
e_rooms = [r for r in rooms.values() if 520 <= r['x'] <= 535]
e_rooms.sort(key=lambda r: r['y'])
for r in e_rooms:
    print(f"{r['code']}: y={r['y']}..{r['y']+r['h']} (h={r['h']}), door={r['door']}")

# Let's inspect West Wing column (x=144..262)
print("\n=== WEST WING VERTICAL STACK (x=144..262) ===")
w_rooms = [r for r in rooms.values() if r['x'] < 270 and r['y'] > 440]
w_rooms.sort(key=lambda r: r['y'])
for r in w_rooms:
    print(f"{r['code']}: x={r['x']}..{r['x']+r['w']}, y={r['y']}..{r['y']+r['h']} (h={r['h']}), door={r['door']}")
