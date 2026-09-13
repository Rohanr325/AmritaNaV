with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
edges = re.findall(r"\[\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'\s*\]", text)
for e in edges:
    if 'entrance' in e[0] or 'entrance' in e[1] or 'gad' in e[0] or 'gad' in e[1]:
        print(e)
