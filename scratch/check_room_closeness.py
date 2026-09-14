import re

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

rooms_match = re.search(r'const ROOMS_DATA = \[(.*?)\];', text, re.DOTALL)
rooms = []
for m in re.finditer(r"id:\s*'([^']+)',\s*code:\s*'([^']+)',.*?x:\s*(\d+),\s*y:\s*(\d+),\s*w:\s*(\d+),\s*h:\s*(\d+)", rooms_match.group(1)):
    rid, code, x, y, w, h = m.groups()
    rooms.append({
        'id': rid, 'code': code,
        'x': int(x), 'y': int(y), 'w': int(w), 'h': int(h),
        'cx': int(x) + int(w)/2, 'cy': int(y) + int(h)/2
    })

print(f'Parsed {len(rooms)} rooms.')

for i in range(len(rooms)):
    for j in range(i+1, len(rooms)):
        r1 = rooms[i]
        r2 = rooms[j]
        if abs(r1['cy'] - r2['cy']) < 15:
            dist_x = abs(r1['cx'] - r2['cx'])
            if dist_x < 35:
                print(f"Close horizontally: {r1['code']} (cx={r1['cx']}, w={r1['w']}) and {r2['code']} (cx={r2['code']}, w={r2['w']}) -> dist={dist_x}")
