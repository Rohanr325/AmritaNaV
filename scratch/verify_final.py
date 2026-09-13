import re
import math
import heapq

for filename in ['app.js', 'script.js']:
    print(f"=== TESTING {filename} ===")
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    room_matches = re.findall(r"\{\s*id:\s*'([^']+)',\s*code:\s*'([^']+)',\s*name:\s*'([^']+)',.*?x:\s*([0-9.]+),\s*y:\s*([0-9.]+),\s*w:\s*([0-9.]+),\s*h:\s*([0-9.]+),\s*door:\s*\[([0-9., ]+)\]", text, re.S)
    rooms = [{'id': r[0], 'code': r[1], 'name': r[2], 'x': float(r[3]), 'y': float(r[4]), 'w': float(r[5]), 'h': float(r[6]), 'door': [float(v) for v in r[7].split(',')]} for r in room_matches]

    corridor_rects = re.findall(r'<rect class="corridor-floor"\s+x="([0-9.]+)"\s+y="([0-9.]+)"\s+width="([0-9.]+)"\s+height="([0-9.]+)"', text)
    corridors = [{'x': float(x), 'y': float(y), 'w': float(w), 'h': float(h)} for x, y, w, h in corridor_rects]

    print(f"Rooms count: {len(rooms)}, Corridor floor rects: {len(corridors)}")

    # Room vs corridor overlaps
    room_corridor_overlaps = 0
    for r in rooms:
        for i, c in enumerate(corridors):
            ox = max(0, min(r['x'] + r['w'], c['x'] + c['w']) - max(r['x'], c['x']))
            oy = max(0, min(r['y'] + r['h'], c['y'] + c['h']) - max(r['y'], c['y']))
            if ox > 0.1 and oy > 0.1:
                print(f"OVERLAP: Room {r['code']} ({r['id']}) overlaps corridor #{i} (x={c['x']}..{c['x']+c['w']}, y={c['y']}..{c['y']+c['h']}) by {ox:.1f} x {oy:.1f}")
                room_corridor_overlaps += 1

    print(f"Room-Corridor Overlaps: {room_corridor_overlaps}")

    # Room vs room overlaps
    room_room_overlaps = 0
    for i in range(len(rooms)):
        for j in range(i+1, len(rooms)):
            r1, r2 = rooms[i], rooms[j]
            ox = max(0, min(r1['x'] + r1['w'], r2['x'] + r2['w']) - max(r1['x'], r2['x']))
            oy = max(0, min(r1['y'] + r1['h'], r2['y'] + r2['h']) - max(r1['y'], r2['y']))
            if ox > 0.1 and oy > 0.1:
                print(f"ROOM OVERLAP: {r1['code']} overlaps {r2['code']} by {ox:.1f} x {oy:.1f}")
                room_room_overlaps += 1

    print(f"Room-Room Overlaps: {room_room_overlaps}")

    # Dijkstra graph
    wp_raw = re.findall(r"'(\w+)':\s*\{\s*id:\s*'\w+',\s*x:\s*([0-9.]+),\s*y:\s*([0-9.]+)", text)
    waypoints = {m[0]: {'x': float(m[1]), 'y': float(m[2])} for m in wp_raw}

    edges_raw = re.findall(r"\[\s*'(\w+)'\s*,\s*'(\w+)'\s*,\s*'(\w+)'\s*\]", text)

    adj = {u: [] for u in waypoints}
    for u, v, typ in edges_raw:
        if u in waypoints and v in waypoints:
            d = math.hypot(waypoints[u]['x'] - waypoints[v]['x'], waypoints[u]['y'] - waypoints[v]['y'])
            cost = d * (2.5 if typ == 'outdoor' else 1.0)
            adj[u].append((v, cost, typ))
            adj[v].append((u, cost, typ))

    def get_nearest_wp(door):
        best_n, best_d = None, 1e9
        for n, pt in waypoints.items():
            if n.startswith('wp_outdoor') and not n.startswith('wp_outdoor_west_breezeway') and not n.startswith('wp_outdoor_east_breezeway'):
                continue
            d = math.hypot(door[0] - pt['x'], door[1] - pt['y'])
            if d < best_d:
                best_d, best_n = d, n
        return best_n

    room_wps = {r['id']: get_nearest_wp(r['door']) for r in rooms}

    failed = 0
    outdoor_leaks = 0
    for i in range(len(rooms)):
        for j in range(i+1, len(rooms)):
            r1, r2 = rooms[i], rooms[j]
            start_wp = room_wps[r1['id']]
            end_wp = room_wps[r2['id']]

            dist = {n: 1e9 for n in waypoints}
            prev = {n: None for n in waypoints}
            prev_type = {n: None for n in waypoints}
            dist[start_wp] = 0
            pq = [(0, start_wp)]

            while pq:
                d, u = heapq.heappop(pq)
                if d > dist[u]: continue
                if u == end_wp: break
                for v, weight, typ in adj[u]:
                    if dist[u] + weight < dist[v]:
                        dist[v] = dist[u] + weight
                        prev[v] = u
                        prev_type[v] = typ
                        heapq.heappush(pq, (dist[v], v))

            if dist[end_wp] >= 1e8:
                failed += 1
            else:
                curr = end_wp
                used_outdoor = False
                while curr != start_wp and curr is not None:
                    if prev_type[curr] == 'outdoor':
                        used_outdoor = True
                        break
                    curr = prev[curr]
                if used_outdoor:
                    outdoor_leaks += 1

    total_pairs = len(rooms) * (len(rooms) - 1) // 2
    print(f"Dijkstra Pairs: {total_pairs}, Failed: {failed}, Outdoor Leaks: {outdoor_leaks}\n")
