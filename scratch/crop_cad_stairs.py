from PIL import Image

cad = Image.open(r'd:\nav\assets\floorplan.png')

# 1. Top stairs in CAD
top_crop = cad.crop((280, 140, 470, 300))
top_crop.save(r'd:\nav\scratch\cad_stairs_top.png')

# 2. Mid stairs in CAD
mid_crop = cad.crop((280, 440, 470, 530))
mid_crop.save(r'd:\nav\scratch\cad_stairs_mid.png')

# 3. Bottom stairs in CAD (around south courtyard / breezeways / admin corridor)
bot_crop = cad.crop((200, 580, 550, 720))
bot_crop.save(r'd:\nav\scratch\cad_stairs_bot.png')

print("Saved CAD stair crops!")
