with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

for layer in ['layerBuildingBase', 'layerCourtyards', 'layerCorridors']:
    pos = text.find(layer)
    if pos != -1:
        print(f"=== {layer} at {pos} ===")
        print(text[pos:pos+1200])
