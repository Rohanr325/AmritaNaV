# Append outdoor leak test
with open('scratch/test_all_clear.py', 'r') as f:
    code = f.read()

leak_check = """
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
"""

with open('scratch/test_all_clear.py', 'w') as f:
    f.write(code + leak_check)
