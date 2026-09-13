with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('renderRooms')
if pos == -1:
    pos = text.find('layerRooms')
print(text[pos:pos+1500])
