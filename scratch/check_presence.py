with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

target = "  ['wp_admin_wc_girls', 'wp_admin_east_end', 'indoor'],"
print("Target in text:", target in text)
target_wp = "  'wp_admin_east_end':"
print("Target_wp in text:", target_wp in text)
