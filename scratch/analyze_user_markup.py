from PIL import Image

im = Image.open(r'C:\Users\rohan\.gemini\antigravity-ide\brain\a450b43e-c4b5-4a37-a3dd-9360d67ed47e\.user_uploaded\media_1789397111643.png').convert('RGB')
w, h = im.size
print('Size:', w, h)

# Find green pixels (green lines)
green_pixels = []
blue_pixels = []

for y in range(h):
    for x in range(w):
        r, g, b = im.getpixel((x, y))
        # Green: g is high, r and b are lower (e.g. bright yellow-green)
        if g > 160 and r < 190 and b < 100:
            green_pixels.append((x, y, (r, g, b)))
        # Blue: b is high, r is low (bright cyan/blue)
        elif b > 180 and r < 60 and g > 100 and g < 180:
            blue_pixels.append((x, y, (r, g, b)))

print('Green pixels count:', len(green_pixels))
if green_pixels:
    xs = [p[0] for p in green_pixels]
    ys = [p[1] for p in green_pixels]
    print(f'Green x range: {min(xs)}..{max(xs)}, y range: {min(ys)}..{max(ys)}')
    # Separate into left green line and right green line
    mid_x = (min(xs) + max(xs)) / 2
    left_g = [p for p in green_pixels if p[0] < mid_x]
    right_g = [p for p in green_pixels if p[0] >= mid_x]
    print(f'Left green line x: {min(p[0] for p in left_g)}..{max(p[0] for p in left_g)}, y: {min(p[1] for p in left_g)}..{max(p[1] for p in left_g)}')
    print(f'Right green line x: {min(p[0] for p in right_g)}..{max(p[0] for p in right_g)}, y: {min(p[1] for p in right_g)}..{max(p[1] for p in right_g)}')

print('\nBlue pixels count:', len(blue_pixels))
if blue_pixels:
    xs = [p[0] for p in blue_pixels]
    ys = [p[1] for p in blue_pixels]
    print(f'Blue x range: {min(xs)}..{max(xs)}, y range: {min(ys)}..{max(ys)}')
