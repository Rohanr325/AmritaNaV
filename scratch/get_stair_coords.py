from PIL import Image

cad = Image.open(r'd:\nav\assets\floorplan.png').convert('L')

# 1. Top Stairs
# In cad_ruler_top ((340, 230, 415, 290)), let's find the black pixels (< 128) of the stair box and treads
print("--- TOP STAIRS ---")
top_box = (360, 240, 400, 275)
for y in range(235, 275):
    row = [cad.getpixel((x, y)) for x in range(355, 405)]
    # if there are black lines:
    blacks = [x for x in range(355, 405) if cad.getpixel((x, y)) < 80]
    if blacks:
        # print first and last black
        pass

# Let's inspect the exact bounding box of the stair boundary
# In Top:
# The staircase sits in the atrium.
# Let's find the extents:
blacks = []
for y in range(240, 275):
    for x in range(355, 400):
        if cad.getpixel((x, y)) < 80:
            blacks.append((x, y))
print("Top blacks: x in", min(p[0] for p in blacks), max(p[0] for p in blacks), "y in", min(p[1] for p in blacks), max(p[1] for p in blacks))

# Mid blacks:
blacks_mid = []
for y in range(480, 515):
    for x in range(355, 400):
        if cad.getpixel((x, y)) < 80:
            blacks_mid.append((x, y))
print("Mid blacks: x in", min(p[0] for p in blacks_mid), max(p[0] for p in blacks_mid), "y in", min(p[1] for p in blacks_mid), max(p[1] for p in blacks_mid))

# SW blacks:
# Looking at the staircase in cad_ruler_sw:
# x range approx 315..355, y range approx 635..685
blacks_sw = []
for y in range(630, 690):
    for x in range(315, 355):
        if cad.getpixel((x, y)) < 80:
            blacks_sw.append((x, y))
print("SW blacks: x in", min(p[0] for p in blacks_sw), max(p[0] for p in blacks_sw), "y in", min(p[1] for p in blacks_sw), max(p[1] for p in blacks_sw))

# SE blacks:
blacks_se = []
for y in range(630, 690):
    for x in range(398, 440):
        if cad.getpixel((x, y)) < 80:
            blacks_se.append((x, y))
print("SE blacks: x in", min(p[0] for p in blacks_se), max(p[0] for p in blacks_se), "y in", min(p[1] for p in blacks_se), max(p[1] for p in blacks_se))
