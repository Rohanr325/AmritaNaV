from PIL import Image

# Let's crop around each cluster to see what's under each cluster!
img_path = r'C:\Users\rohan\.gemini\antigravity-ide\brain\8fc8c579-56c9-41cf-95a3-8488b53f2cab\.user_uploaded\media_1789546407077.png'
img = Image.open(img_path)

# Cluster 1: Top (346..461, 99..187)
c1 = img.crop((300, 80, 500, 210))
c1.save(r'd:\nav\scratch\user_box1_top.png')

# Cluster 2: Mid (347..420, 380..410)
c2 = img.crop((300, 350, 500, 440))
c2.save(r'd:\nav\scratch\user_box2_mid.png')

# Cluster 3 & 4: Bottom West & East
c34 = img.crop((280, 550, 520, 650))
c34.save(r'd:\nav\scratch\user_box34_bot.png')

print("Saved crop images.")
