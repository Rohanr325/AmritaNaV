with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

for layer in ['layerBuildingBase', 'layerCourtyards', 'layerCorridors']:
    start = text.find(f'id="{layer}"')
    if start != -1:
        end = text.find('</g>', start)
        print(f'=== {layer} ===')
        print(text[start:end+4])
