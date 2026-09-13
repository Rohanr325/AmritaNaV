rule = """
/* Compact text for small restroom boxes */
.room-group[data-id="TOILET-BOYS-ADMIN"] .room-code-text,
.room-group[data-id="TOILET-GIRLS-ADMIN"] .room-code-text {
  font-size: 7px !important;
  letter-spacing: 0.02em;
}
.room-group[data-id="TOILET-BOYS-ADMIN"] .room-name-text,
.room-group[data-id="TOILET-GIRLS-ADMIN"] .room-name-text {
  font-size: 5.5px !important;
}
"""

for fname in ['style.css', 'styles.css']:
    with open(fname, 'r', encoding='utf-8') as f:
        css = f.read()
    if 'TOILET-BOYS-ADMIN' not in css:
        css += rule
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(css)
        print(f"Updated {fname}!")
    else:
        print(f"{fname} already has rule.")
