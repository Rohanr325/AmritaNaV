with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Extract corridor floors
# <rect class="corridor-floor" x="..." y="..." width="..." height="..." ... />
corridor_rects = re.findall(r'<rect class="corridor-floor"\s+x="([0-9.]+)"\s+y="([0-9.]+)"\s+width="([0-9.]+)"\s+height="([0-9.]+)"', text)
corridors = [{'x': float(x), 'y': float(y), 'w': float(w), 'h': float(h)} for x, y, w, h in corridor_rects]
print(f'Found {len(corridors)} corridor floor rects.')

# Extract corridor centerlines
lines = re.findall(r'<line class="corridor-centerline"\s+x1="([0-9.]+)"\s+y1="([0-9.]+)"\s+x2="([0-9.]+)"\s+y2="([0-9.]+)"', text)
centerlines = [{'x1': float(x1), 'y1': float(y1), 'x2': float(x2), 'y2': float(y2)} for x1, y1, x2, y2 in lines]
print(f'Found {len(centerlines)} corridor centerlines.')

# Extract rooms
room_matches = re.findall(r"\{\s*id:\s*'([^']+)',\s*code:\s*'([^']+)',\s*name:\s*'([^']+)',.*?x:\s*([0-9.]+),\s*y:\s*([0-9.]+),\s*w:\s*([0-9.]+),\s*h:\s*([0-9.]+),\s*door:\s*\[([0-9., ]+)\]", text, re.S)
rooms = [{'id': r[0], 'code': r[1], 'name': r[2], 'x': float(r[3]), 'y': float(r[4]), 'w': float(r[5]), 'h': float(r[6]), 'door': [float(v) for v in r[7].split(',')]} for r in room_matches]
print(f'Found {len(rooms)} rooms.')

def rects_overlap(r1, r2, tol=0.5):
    # Overlap if intersection has positive area > tol
    ox = max(0, min(r1['x'] + r1['w'], r2['x'] + r2['w']) - max(r1['x'], r2['x']))
    oy = max(0, min(r1['y'] + r1['h'], r2['y'] + r2['h']) - max(r1['y'], r2['y']))
    return ox > tol and oy > tol, ox, oy

print('\n=== CHECKING ROOMS VS CORRIDOR RECTS ===')
overlaps = []
for r in rooms:
    for i, c in enumerate(corridors):
        overlap, ox, oy = rects_overlap(r, c)
        if overlap:
            overlaps.append((r, c, ox, oy))
            print(f"OVERLAP: Room {r['code']} ({r['id']}) [x={r['x']}, y={r['y']}, w={r['w']}, h={r['h']}] overlaps Corridor #{i} [x={c['x']}, y={c['y']}, w={c['w']}, h={c['h']}] by dx={ox:.1f}, dy={oy:.1f}")

def line_intersects_rect(line, r, tol=0.5):
    # Check if centerline penetrates interior of room
    # Interior: x in (r.x + tol, r.x + r.w - tol), y in (r.y + tol, r.y + r.h - tol)
    x1, y1, x2, y2 = line['x1'], line['y1'], line['x2'], line['y2']
    rx1, rx2 = r['x'] + tol, r['x'] + r['w'] - tol
    ry1, ry2 = r['y'] + tol, r['y'] + r['h'] - tol
    
    # If vertical line
    if abs(x1 - x2) < 0.1:
        x = x1
        if rx1 < x < rx2:
            min_ly, max_ly = min(y1, y2), max(y1, y2)
            if max(min_ly, ry1) < min(max_ly, ry2):
                return True
    # If horizontal line
    elif abs(y1 - y2) < 0.1:
        y = y1
        if ry1 < y < ry2:
            min_lx, max_lx = min(x1, x2), max(x1, x2)
            if max(min_lx, rx1) < min(max_lx, rx2):
                return True
    return False

print('\n=== CHECKING ROOMS VS CORRIDOR CENTERLINES ===')
for r in rooms:
    for i, l in enumerate(centerlines):
        if line_intersects_rect(l, r):
            print(f"PENETRATION: Room {r['code']} ({r['id']}) is penetrated by Centerline #{i} [({l['x1']},{l['y1']}) -> ({l['x2']},{l['y2']})]")
