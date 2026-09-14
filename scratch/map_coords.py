from PIL import Image

im = Image.open(r'C:\Users\rohan\.gemini\antigravity-ide\brain\a450b43e-c4b5-4a37-a3dd-9360d67ed47e\.user_uploaded\media_1789398055396.png').convert('RGB')
w, h = im.size

# Find key landmarks in image to compute affine transform (img_x, img_y) -> (svg_x, svg_y)
# Let's find WC-N2, WC-S2, GAD, N-020
# In script.js:
# WC-N2: x=168, y=260, w=48, h=26 -> center (192, 273)
# WC-S2: x=532, y=270, w=48, h=24 -> center (556, 282)
# GAD: x=334, y=810, w=78, h=36 -> center (373, 828)
# N-020: x=304, y=156, w=42, h=28 -> center (325, 170)

# Let's search for the magenta border of WC-N2 and WC-S2 in the image
# Magenta in dark mode: high R, low G, high B (e.g. r > 100, g < 50, b > 100)
wc_pixels = []
for y in range(h):
    for x in range(w):
        r, g, b = im.getpixel((x, y))
        if r > 120 and g < 60 and b > 120:
            wc_pixels.append((x, y))

print('Magenta pixels:', len(wc_pixels))

# Let's find bounding box of WC-N2 and WC-S2
# WC-N2 is on the left, WC-S2 is on the right
left_wc = [p for p in wc_pixels if p[0] < w/2 and p[1] < h/2]
right_wc = [p for p in wc_pixels if p[0] >= w/2 and p[1] < h/2]

if left_wc and right_wc:
    wc_n2_img = (sum(p[0] for p in left_wc)/len(left_wc), sum(p[1] for p in left_wc)/len(left_wc))
    wc_s2_img = (sum(p[0] for p in right_wc)/len(right_wc), sum(p[1] for p in right_wc)/len(right_wc))
    print('WC-N2 center in img:', wc_n2_img)
    print('WC-S2 center in img:', wc_s2_img)

    # Scale in X:
    # SVG distance: 556 - 192 = 364
    img_dist_x = wc_s2_img[0] - wc_n2_img[0]
    scale = img_dist_x / 364.0
    print('Scale factor (img_px / svg_px):', scale)
    svg_origin_x = wc_n2_img[0] - 192 * scale
    svg_origin_y = wc_n2_img[1] - 273 * scale
    print(f'SVG (0,0) in img coords: ({svg_origin_x}, {svg_origin_y})')

    # Convert a few key points of the orange line to SVG coords
    # 1. Top start (near N-020 / S-014 exit):
    # Let's find top-most orange pixels
    orange_pixels = []
    for y in range(h):
        for x in range(w):
            r, g, b = im.getpixel((x, y))
            if r > 200 and 70 < g < 160 and b < 50:
                orange_pixels.append((x, y))

    def to_svg(pt):
        return ((pt[0] - svg_origin_x) / scale, (pt[1] - svg_origin_y) / scale)

    # Let's sample key vertices along the orange path
    # Top-most
    top_y = min(p[1] for p in orange_pixels)
    top_pts = [p for p in orange_pixels if abs(p[1] - top_y) < 5]
    print('Top horizontal line img Y:', top_y, 'SVG Y:', (top_y - svg_origin_y)/scale)
    print('Top horizontal line X range in SVG:', to_svg((min(p[0] for p in top_pts), top_y))[0], '..', to_svg((max(p[0] for p in top_pts), top_y))[0])

    # Far-right vertical line
    right_x = max(p[0] for p in orange_pixels)
    print('East vertical line SVG X:', (right_x - svg_origin_x)/scale)

    # Bottom-most
    bot_y = max(p[1] for p in orange_pixels)
    print('South horizontal line SVG Y:', (bot_y - svg_origin_y)/scale)

    # Far-left vertical line (outside A-006)
    left_x = min(p[0] for p in orange_pixels)
    print('West vertical line (outside A-006) SVG X:', (left_x - svg_origin_x)/scale)
