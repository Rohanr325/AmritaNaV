with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

for code in ['N-019', 'N-018', 'N-010', 'S-010', 'S-006']:
    m = re.search(rf"\{{ id: '[^']+', code: '{code}',.*?\}}", text)
    if m:
        print(m.group(0))
