with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

print("=== ALL CORRIDOR FLOORS ===")
for m in re.finditer(r'<rect class="corridor-floor"[^>]+>', text):
    print(m.group(0))

print("\n=== ALL CORRIDOR CENTERLINES ===")
for m in re.finditer(r'<line class="corridor-centerline"[^>]+>', text):
    print(m.group(0))

print("\n=== S-BLOCK ROOMS ===")
for m in re.finditer(r"\{\s*id:\s*'(S-[^']+)',\s*code:\s*'([^']+)',\s*name:\s*'([^']+)',.*?x:\s*([0-9.]+),\s*y:\s*([0-9.]+),\s*w:\s*([0-9.]+),\s*h:\s*([0-9.]+),\s*door:\s*\[([0-9., ]+)\]", text, re.S):
    print(f"{m.group(2)}: x={m.group(4)}, y={m.group(5)}, w={m.group(6)}, h={m.group(7)}, door=[{m.group(8)}]")
