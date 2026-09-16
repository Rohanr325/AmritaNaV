from PIL import Image

img_path = r'C:\Users\rohan\.gemini\antigravity-ide\brain\8fc8c579-56c9-41cf-95a3-8488b53f2cab\.user_uploaded\media_1789546407077.png'
img = Image.open(img_path).convert('RGB')
w, h = img.size

orange_pixels = []
for y in range(h):
    for x in range(w):
        r, g, b = img.getpixel((x, y))
        # Orange drawn by user
        if r > 180 and 60 < g < 150 and b < 50:
            orange_pixels.append((x, y))

# Simple grid or distance clustering
clusters = []
for px, py in orange_pixels:
    assigned = False
    for c in clusters:
        if abs(px - c['cx']) < 40 and abs(py - c['cy']) < 40:
            c['pts'].append((px, py))
            c['cx'] = sum(p[0] for p in c['pts']) / len(c['pts'])
            c['cy'] = sum(p[1] for p in c['pts']) / len(c['pts'])
            assigned = True
            break
    if not assigned:
        clusters.append({'pts': [(px, py)], 'cx': px, 'cy': py})

merged = True
while merged:
    merged = False
    for i in range(len(clusters)):
        for j in range(i + 1, len(clusters)):
            c1 = clusters[i]
            c2 = clusters[j]
            if abs(c1['cx'] - c2['cx']) < 60 and abs(c1['cy'] - c2['cy']) < 60:
                c1['pts'].extend(c2['pts'])
                c1['cx'] = sum(p[0] for p in c1['pts']) / len(c1['pts'])
                c1['cy'] = sum(p[1] for p in c1['pts']) / len(c1['pts'])
                clusters.pop(j)
                merged = True
                break
        if merged: break

clusters = [c for c in clusters if len(c['pts']) > 30]
clusters.sort(key=lambda c: c['cy'])

print(f'Found {len(clusters)} clusters:')
for idx, c in enumerate(clusters):
    xs = [p[0] for p in c['pts']]
    ys = [p[1] for p in c['pts']]
    print(f"Cluster {idx+1}: {len(c['pts'])} pts, center=({c['cx']:.1f}, {c['cy']:.1f}), bbox=X[{min(xs)}..{max(xs)}], Y[{min(ys)}..{max(ys)}]")
