with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r"'(\w+)':\s*\{\s*id:\s*'\w+',\s*x:\s*([0-9.]+),\s*y:\s*([0-9.]+)", text)
print(f'Total waypoints: {len(matches)}')
for m in matches:
    print(f'  {m[0]}: ({m[1]}, {m[2]})')

print('\n--- ROOMS ---')
rooms = re.findall(r"\{\s*id:\s*'([^']+)',\s*code:\s*'([^']+)',\s*name:\s*'([^']+)',.*?x:\s*([0-9.]+),\s*y:\s*([0-9.]+),\s*w:\s*([0-9.]+),\s*h:\s*([0-9.]+),\s*door:\s*\[([0-9., ]+)\]", text, re.S)
for r in rooms:
    print(f"{r[0]} ({r[1]}): x={r[3]}, y={r[4]}, w={r[5]}, h={r[6]}, door=[{r[7]}]")
