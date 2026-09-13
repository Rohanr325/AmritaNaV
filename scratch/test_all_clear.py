with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
import math
import heapq

# 1. Rooms
text = text.replace("{ id: 'N-019', code: 'N-019', name: 'Electrical Machines Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 304, y: 184, w: 42, h: 84, door: [346, 226],",
                    "{ id: 'N-019', code: 'N-019', name: 'Electrical Machines Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 304, y: 184, w: 42, h: 80, door: [346, 226],")

text = text.replace("{ id: 'N-018', code: 'N-018', name: 'Dept of Mathematics (108)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 304, y: 274, w: 42, h: 52, door: [346, 300],",
                    "{ id: 'N-018', code: 'N-018', name: 'Dept of Mathematics (108)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 304, y: 278, w: 42, h: 48, door: [346, 300],")

text = text.replace("{ id: 'N-010', code: 'N-010', name: 'Staff Room (Mech)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 462, w: 40, h: 44, door: [346, 484],",
                    "{ id: 'N-010', code: 'N-010', name: 'Staff Room (Mech)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 462, w: 40, h: 40, door: [346, 484],")

text = text.replace("{ id: 'S-010', code: 'S-010', name: 'South Conference Room', wing: 'Southern Wing (S)', category: 'ROOM', x: 405, y: 346, w: 40, h: 22, door: [405, 357],",
                    "{ id: 'S-010', code: 'S-010', name: 'South Conference Room', wing: 'Southern Wing (S)', category: 'ROOM', x: 405, y: 350, w: 40, h: 18, door: [405, 357],")

text = text.replace("{ id: 'S-006', code: 'S-006', name: 'Staff Room (ECE & EEE)', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 462, w: 40, h: 44, door: [405, 484],",
                    "{ id: 'S-006', code: 'S-006', name: 'Staff Room (ECE & EEE)', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 462, w: 40, h: 40, door: [405, 484],")

# Corridor 0: x="224" width="302"
text = text.replace('<rect class="corridor-floor" x="220" y="688" width="308" height="18" rx="1" />',
                    '<rect class="corridor-floor" x="224" y="688" width="302" height="18" rx="1" />')

# Corridor 3: x="396" width="9"
text = text.replace('<rect class="corridor-floor" x="400" y="162" width="8" height="534" />',
                    '<rect class="corridor-floor" x="396" y="162" width="9" height="534" />')

# Corridor 4: width="59"
text = text.replace('<rect class="corridor-floor" x="346" y="162" width="62" height="16" rx="1" />',
                    '<rect class="corridor-floor" x="346" y="162" width="59" height="16" rx="1" />')

# Corridor 10: x="130" width="132"
text = text.replace('<rect class="corridor-floor" x="120" y="504" width="142" height="8" rx="1" />',
                    '<rect class="corridor-floor" x="130" y="504" width="132" height="8" rx="1" />')

# Corridor 13: starts at y=846
text = text.replace('<rect class="corridor-floor" x="368" y="806" width="12" height="55" rx="1" />',
                    '<rect class="corridor-floor" x="368" y="846" width="12" height="15" rx="1" />')

# Now add pathway on white line in front of Acharya Hall:
acharya_pathway_svg = """    <!-- Amritheswari East Breezeway Pathway (White line in user sketch) -->
    <rect class="corridor-floor" x="227" y="600" width="10" height="96" rx="1" />
    <line class="corridor-centerline" x1="232" y1="600" x2="232" y2="696" />

    <!-- Acharya West Breezeway Pathway (White line in user sketch) -->
    <rect class="corridor-floor" x="513" y="600" width="10" height="96" rx="1" />
    <line class="corridor-centerline" x1="518" y1="600" x2="518" y2="696" />"""

text = text.replace("""    <!-- Amritheswari East Breezeway Pathway (White line in user sketch) -->
    <rect class="corridor-floor" x="227" y="600" width="10" height="96" rx="1" />
    <line class="corridor-centerline" x1="232" y1="600" x2="232" y2="696" />""", acharya_pathway_svg)

# Waypoints:
wp_target = "  'wp_admin_wc_girls':       { id: 'wp_admin_wc_girls',       x: 504, y: 696, label: 'Girls Restroom Walkway (Admin)' },"
wp_replacement = """  'wp_admin_wc_girls':       { id: 'wp_admin_wc_girls',       x: 504, y: 696, label: 'Girls Restroom Walkway (Admin)' },
  'wp_admin_acharya_junc':   { id: 'wp_admin_acharya_junc',   x: 518, y: 696, label: 'Admin East Corridor (Acharya North Path Junc)' },
  'wp_admin_acharya_path':   { id: 'wp_admin_acharya_path',   x: 518, y: 648, label: 'Admin East Elevated Walkway (Acharya West Path)' },
  'wp_outdoor_east_breezeway': { id: 'wp_outdoor_east_breezeway', x: 518, y: 600, label: 'East Breezeway Pathway North Entrance' },"""

text = text.replace(wp_target, wp_replacement)

# Hallway edges:
edge_target = "  ['wp_admin_wc_girls', 'wp_admin_east_end', 'indoor'],"
edge_replacement = """  ['wp_admin_wc_girls', 'wp_admin_acharya_junc', 'indoor'],
  ['wp_admin_acharya_junc', 'wp_admin_east_end', 'indoor'],
  ['wp_admin_acharya_junc', 'wp_admin_acharya_path', 'indoor'],
  ['wp_admin_acharya_path', 'wp_outdoor_east_breezeway', 'indoor'],
  ['wp_outdoor_east_breezeway', 'wp_se_research_cell', 'indoor'],
  ['wp_outdoor_east_breezeway', 'wp_outdoor_breezeway_east', 'outdoor'],"""

text = text.replace(edge_target, edge_replacement)

# Now let's test overlaps on this modified text!
room_matches = re.findall(r"\{\s*id:\s*'([^']+)',\s*code:\s*'([^']+)',\s*name:\s*'([^']+)',.*?x:\s*([0-9.]+),\s*y:\s*([0-9.]+),\s*w:\s*([0-9.]+),\s*h:\s*([0-9.]+),\s*door:\s*\[([0-9., ]+)\]", text, re.S)
rooms = [{'id': r[0], 'code': r[1], 'name': r[2], 'x': float(r[3]), 'y': float(r[4]), 'w': float(r[5]), 'h': float(r[6]), 'door': [float(v) for v in r[7].split(',')]} for r in room_matches]

corridor_rects = re.findall(r'<rect class="corridor-floor"\s+x="([0-9.]+)"\s+y="([0-9.]+)"\s+width="([0-9.]+)"\s+height="([0-9.]+)"', text)
corridors = [{'x': float(x), 'y': float(y), 'w': float(w), 'h': float(h)} for x, y, w, h in corridor_rects]

print(f"Rooms: {len(rooms)}, Corridors: {len(corridors)}")

print("\n=== TESTING ROOM VS CORRIDOR OVERLAPS ===")
room_corridor_overlaps = 0
for r in rooms:
    for i, c in enumerate(corridors):
        ox = max(0, min(r['x'] + r['w'], c['x'] + c['w']) - max(r['x'], c['x']))
        oy = max(0, min(r['y'] + r['h'], c['y'] + c['h']) - max(r['y'], c['y']))
        if ox > 0.1 and oy > 0.1:
            print(f"OVERLAP: Room {r['code']} ({r['id']}) overlaps corridor #{i} (x={c['x']}..{c['x']+c['w']}, y={c['y']}..{c['y']+c['h']}) by {ox:.1f} x {oy:.1f}")
            room_corridor_overlaps += 1

print(f"Total room-corridor overlaps: {room_corridor_overlaps}")

print("\n=== TESTING ROOM VS ROOM OVERLAPS ===")
room_room_overlaps = 0
for i in range(len(rooms)):
    for j in range(i+1, len(rooms)):
        r1, r2 = rooms[i], rooms[j]
        ox = max(0, min(r1['x'] + r1['w'], r2['x'] + r2['w']) - max(r1['x'], r2['x']))
        oy = max(0, min(r1['y'] + r1['h'], r2['y'] + r2['h']) - max(r1['y'], r2['y']))
        if ox > 0.1 and oy > 0.1:
            print(f"ROOM-ROOM OVERLAP: {r1['code']} overlaps {r2['code']} by {ox:.1f} x {oy:.1f}")
            room_room_overlaps += 1

print(f"Total room-room overlaps: {room_room_overlaps}")

# Now test Dijkstra reachability
wp_raw = re.findall(r"'(\w+)':\s*\{\s*id:\s*'\w+',\s*x:\s*([0-9.]+),\s*y:\s*([0-9.]+)", text)
waypoints = {m[0]: {'x': float(m[1]), 'y': float(m[2])} for m in wp_raw}

edges_raw = re.findall(r"\[\s*'(\w+)'\s*,\s*'(\w+)'\s*,\s*'(\w+)'\s*\]", text)

adj = {}
for u in waypoints:
    adj[u] = []

for u, v, typ in edges_raw:
    if u in waypoints and v in waypoints:
        d = math.hypot(waypoints[u]['x'] - waypoints[v]['x'], waypoints[u]['y'] - waypoints[v]['y'])
        cost = d * (2.5 if typ == 'outdoor' else 1.0)
        adj[u].append((v, cost, typ))
        adj[v].append((u, cost, typ))

# Room to nearest waypoint
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

# Run all-pairs Dijkstra
failed = 0
outdoor_leaks = 0
for i in range(len(rooms)):
    for j in range(i+1, len(rooms)):
        r1, r2 = rooms[i], rooms[j]
        start_wp = room_wps[r1['id']]
        end_wp = room_wps[r2['id']]

        dist = {n: 1e9 for n in waypoints}
        edge_type_used = {n: None for n in waypoints}
        dist[start_wp] = 0
        pq = [(0, start_wp)]

        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]: continue
            if u == end_wp: break
            for v, weight, typ in adj[u]:
                if dist[u] + weight < dist[v]:
                    dist[v] = dist[u] + weight
                    edge_type_used[v] = typ
                    heapq.heappush(pq, (dist[v], v))

        if dist[end_wp] >= 1e8:
            failed += 1
            print(f"FAILED: {r1['code']} -> {r2['code']}")

total_pairs = len(rooms) * (len(rooms) - 1) // 2
print(f"\nDijkstra Results: Total pairs: {total_pairs}, Failed: {failed}")

# Check outdoor leaks for indoor-to-indoor pairs
outdoor_leaks = 0
for i in range(len(rooms)):
    for j in range(i+1, len(rooms)):
        r1, r2 = rooms[i], rooms[j]
        start_wp = room_wps[r1['id']]
        end_wp = room_wps[r2['id']]

        # Dijkstra
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

        # Backtrack path
        curr = end_wp
        used_outdoor = False
        while curr != start_wp and curr is not None:
            if prev_type[curr] == 'outdoor':
                used_outdoor = True
                break
            curr = prev[curr]

        if used_outdoor:
            outdoor_leaks += 1
            print(f"Outdoor leak: {r1['code']} -> {r2['code']}")

print(f"Total outdoor leaks among 1275 pairs: {outdoor_leaks}")
