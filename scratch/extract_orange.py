from PIL import Image

im = Image.open(r'C:\Users\rohan\.gemini\antigravity-ide\brain\a450b43e-c4b5-4a37-a3dd-9360d67ed47e\.user_uploaded\media_1789398055396.png').convert('RGB')
w, h = im.size
print('Image size:', w, h)

# The user drew vivid orange lines!
# Let's detect orange pixels: high R, medium G, low B (e.g. r > 200, 70 < g < 160, b < 50)
orange_pixels = []
for y in range(h):
    for x in range(w):
        r, g, b = im.getpixel((x, y))
        if r > 200 and 70 < g < 160 and b < 50:
            orange_pixels.append((x, y))

print('Total orange pixels:', len(orange_pixels))
if orange_pixels:
    xs = [p[0] for p in orange_pixels]
    ys = [p[1] for p in orange_pixels]
    print(f'Orange bounding box: x={min(xs)}..{max(xs)}, y={min(ys)}..{max(ys)}')

# Let's create an image highlighting the orange pixels to inspect
overlay = Image.new('RGBA', (w, h), (0, 0, 0, 255))
for x, y in orange_pixels:
    overlay.putpixel((x, y), (255, 140, 0, 255))
overlay.save('scratch/user_orange_pathway_extracted.png')
print('Saved scratch/user_orange_pathway_extracted.png')
