with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

room_matches = re.findall(r"\{\s*id:\s*'([^']+)',\s*code:\s*'([^']+)',\s*name:\s*'([^']+)',.*?x:\s*([0-9.]+),\s*y:\s*([0-9.]+),\s*w:\s*([0-9.]+),\s*h:\s*([0-9.]+),\s*door:\s*\[([0-9., ]+)\]", text, re.S)
rooms = [{'id': r[0], 'code': r[1], 'name': r[2], 'x': float(r[3]), 'y': float(r[4]), 'w': float(r[5]), 'h': float(r[6]), 'door': [float(v) for v in r[7].split(',')]} for r in room_matches]

corridor_rects = re.findall(r'<rect class="corridor-floor"\s+x="([0-9.]+)"\s+y="([0-9.]+)"\s+width="([0-9.]+)"\s+height="([0-9.]+)"', text)
corridors = [{'x': float(x), 'y': float(y), 'w': float(w), 'h': float(h)} for x, y, w, h in corridor_rects]

lines = re.findall(r'<line class="corridor-centerline"\s+x1="([0-9.]+)"\s+y1="([0-9.]+)"\s+x2="([0-9.]+)"\s+y2="([0-9.]+)"', text)
centerlines = [{'x1': float(x1), 'y1': float(y1), 'x2': float(x2), 'y2': float(y2)} for x1, y1, x2, y2 in lines]

print("=== DETAILED OVERLAP ANALYSIS ===")
for r in rooms:
    for i, c in enumerate(corridors):
        ox = max(0, min(r['x'] + r['w'], c['x'] + c['w']) - max(r['x'], c['x']))
        oy = max(0, min(r['y'] + r['h'], c['y'] + c['h']) - max(r['y'], c['y']))
        if ox > 0.1 and oy > 0.1:
            print(f"Room {r['code']} ({r['id']}): overlaps corridor #{i} (x={c['x']}..{c['x']+c['w']}, y={c['y']}..{c['y']+c['h']}) by {ox:.1f} x {oy:.1f}")
