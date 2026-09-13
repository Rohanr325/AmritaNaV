with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('HALLWAY_EDGES')
pos2 = text.find('wp_admin_wc_girls', pos)
print(text[pos2-100:pos2+200])
