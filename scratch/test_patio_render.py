with open('scratch/script_test_mod.js', 'r', encoding='utf-8') as f:
    text = f.read()

old_patio = '<rect class="courtyard-patio" x="352" y="180" width="48" height="216" rx="3" />'
new_patio = '<rect class="courtyard-patio" x="352" y="156" width="48" height="240" rx="3" />'

assert old_patio in text
text2 = text.replace(old_patio, new_patio)
with open('scratch/script_test_patio_ext.js', 'w', encoding='utf-8') as f:
    f.write(text2)

print('Done writing script_test_patio_ext.js')
