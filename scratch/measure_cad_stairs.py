from PIL import Image

cad = Image.open(r'd:\nav\assets\floorplan.png').convert('L')

# Let's inspect the bounding boxes of the stair graphics in CAD:
# 1. Top stairs (around x: 350..404, y: 230..280)
# 2. Mid stairs (around x: 350..404, y: 470..520)
# 3. SW stairs (around x: 315..355, y: 630..695)
# 4. SE stairs (around x: 395..435, y: 630..695)

# Save high-res crops with pixel grid/rulers
def save_with_ruler(crop_box, filename):
    x1, y1, x2, y2 = crop_box
    c = cad.crop(crop_box).convert('RGB')
    c.save(filename)
    print(f"Saved {filename} with box {crop_box}")

save_with_ruler((340, 230, 415, 290), r'd:\nav\scratch\cad_ruler_top.png')
save_with_ruler((340, 470, 415, 530), r'd:\nav\scratch\cad_ruler_mid.png')
save_with_ruler((310, 620, 365, 700), r'd:\nav\scratch\cad_ruler_sw.png')
save_with_ruler((385, 620, 440, 700), r'd:\nav\scratch\cad_ruler_se.png')
