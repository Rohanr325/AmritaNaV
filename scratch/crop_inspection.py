from PIL import Image

im = Image.open(r'C:\Users\rohan\.gemini\antigravity-ide\brain\a450b43e-c4b5-4a37-a3dd-9360d67ed47e\.user_uploaded\media_1789394062277.png')

# Let's crop various sections and save to scratch
crops = {
    'top_header': (0, 0, 1024, 60),
    'north_rooms': (350, 60, 650, 300),
    'mid_rooms': (350, 250, 650, 500),
    'south_spine': (350, 450, 650, 640),
    'west_outer_nw': (50, 100, 350, 350),
    'east_outer_ne': (700, 100, 950, 450),
    'east_outer_se': (700, 400, 950, 640),
}

for name, box in crops.items():
    c = im.crop(box)
    c.save(f'scratch/inspect_{name}.png')

print('Saved all inspection crops!')
