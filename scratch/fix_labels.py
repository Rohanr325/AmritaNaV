for fname in ['script.js', 'app.js']:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()

    old_trunc = """    } else if (displayName.length > 14 && r.w < 55) {
      displayName = displayName.substring(0, 12) + '..';
    }"""

    new_trunc = """    } else if (displayName.length > 13 && r.w < 68) {
      displayName = displayName.substring(0, 11) + '..';
    }"""

    if old_trunc in content:
        content = content.replace(old_trunc, new_trunc)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)

rule = """
/* Compact text for narrow rooms to prevent label collision */
.room-group[data-id="N-008"] .room-code-text,
.room-group[data-id="N-009"] .room-code-text {
  font-size: 5.5px !important;
  letter-spacing: 0.01em;
}
"""

for css_name in ['style.css', 'styles.css']:
    with open(css_name, 'r', encoding='utf-8') as f:
        css = f.read()

    if '.room-group[data-id="N-008"]' not in css:
        css += rule

    with open(css_name, 'w', encoding='utf-8') as f:
        f.write(css)

print('Updated script.js, app.js, style.css, styles.css successfully!')
