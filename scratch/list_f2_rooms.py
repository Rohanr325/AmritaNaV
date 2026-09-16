with open('script.js', encoding='utf-8') as f:
    text = f.read()

import re
# Find rooms on floor 2
idx2 = text.find("  2: {")
f2_text = text[idx2:idx2+25000]
rooms2 = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", f2_text)
print("Floor 2 rooms:", rooms2[:20])
