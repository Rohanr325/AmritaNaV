from PIL import Image

# Let's inspect assets/floorplan.png and assets/floorplan-blueprint.png
img_cad = Image.open(r'd:\nav\assets\floorplan.png')
print("floorplan.png size:", img_cad.size)

# Let's also check cad_overlay_crop_mid.png, cad_overlay_crop_top.png, cad_bottom_trace.png
for name in ['cad_overlay_crop_top.png', 'cad_overlay_crop_mid.png', 'cad_bottom_trace.png', 'cad_atrium_check.png']:
    try:
        im = Image.open(rf'd:\nav\scratch\{name}')
        print(name, im.size)
    except Exception as e:
        print(name, e)
