from PIL import Image

im = Image.open(r'C:\Users\rohan\.gemini\antigravity-ide\brain\a450b43e-c4b5-4a37-a3dd-9360d67ed47e\.user_uploaded\media_1789398055396.png')
w, h = im.size

crops = {
    'crop_top_exit': (300, 20, 650, 150),
    'crop_west_diagonal': (200, 250, 350, 480),
    'crop_west_amri': (100, 440, 300, 750),
    'crop_east_branch': (400, 440, 650, 550),
    'crop_south_bottom': (120, 650, 650, 760),
}

for name, box in crops.items():
    im.crop(box).save(f'scratch/{name}.png')

print('Saved all detail crops!')
