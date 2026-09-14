import re

new_waypoints_code = """  // Outdoor Roadway Loop (Matching user orange line)
  'wp_outdoor_north_drive':     { id: 'wp_outdoor_north_drive',     x: 376, y: 50,  label: 'North Outer Driveway' },
  'wp_outdoor_north_corner':    { id: 'wp_outdoor_north_corner',    x: 645, y: 50,  label: 'North Driveway East Corner' },
  'wp_outdoor_east_edge_upper': { id: 'wp_outdoor_east_edge_upper', x: 645, y: 230, label: 'East Perimeter Roadway (North)' },
  'wp_outdoor_east_mid':        { id: 'wp_outdoor_east_mid',        x: 645, y: 380, label: 'East Perimeter Roadway (Mid)' },
  'wp_outdoor_east_lower':      { id: 'wp_outdoor_east_lower',      x: 645, y: 508, label: 'East Perimeter Roadway (Lower)' },
  'wp_outdoor_east_se_junc':    { id: 'wp_outdoor_east_se_junc',    x: 645, y: 596, label: 'East Roadway & Acharya North Junction' },
  'wp_outdoor_east_acharya':    { id: 'wp_outdoor_east_acharya',    x: 645, y: 710, label: 'East Perimeter Roadway (Acharya)' },
  'wp_outdoor_se_corner':       { id: 'wp_outdoor_se_corner',       x: 645, y: 861, label: 'Southeast Campus Roadway Corner' },
  'wp_outdoor_s004a_east':      { id: 'wp_outdoor_s004a_east',      x: 518, y: 596, label: 'South Breezeway East (outside S-004A)' },
  'wp_outdoor_breezeway_east':  { id: 'wp_outdoor_breezeway_east',  x: 464, y: 650, label: 'Acharya North Breezeway Diagonal Hub' },
  'wp_outdoor_s001_west':       { id: 'wp_outdoor_s001_west',       x: 404, y: 650, label: 'South Spine Corridor Connector (S-001)' },
  'wp_outdoor_south_east':      { id: 'wp_outdoor_south_east',      x: 460, y: 861, label: 'South Perimeter Roadway East' },
  'wp_outdoor_south_west':      { id: 'wp_outdoor_south_west',      x: 250, y: 861, label: 'South Perimeter Roadway West' },
  'wp_outdoor_sw_corner':       { id: 'wp_outdoor_sw_corner',       x: 140, y: 861, label: 'Southwest Campus Roadway Corner' },
  'wp_outdoor_west_amri':       { id: 'wp_outdoor_west_amri',       x: 140, y: 676, label: 'West Roadway (outside Amritheswari)' },
  'wp_outdoor_amri_top_corner': { id: 'wp_outdoor_amri_top_corner', x: 140, y: 588, label: 'Amritheswari Northwest Roadway Corner' },
  'wp_outdoor_amri_north_door': { id: 'wp_outdoor_amri_north_door', x: 232, y: 588, label: 'Amritheswari North Lightwell Connector' },
  'wp_outdoor_sw_breezeway_corner': { id: 'wp_outdoor_sw_breezeway_corner', x: 290, y: 588, label: 'West Courtyard Breezeway Corner' },
  'wp_outdoor_sw_north_junc':   { id: 'wp_outdoor_sw_north_junc',   x: 290, y: 440, label: 'West Labs North Breezeway Junction' }"""

new_edges_code = """  // White line pathway along East side of Amritheswari Hall:
  ['wp_admin_white_path', 'wp_outdoor_amri_north_door', 'indoor'],

  // Outdoor Roadway Loop (Matching user orange line)
  ['wp_north_exit_hub', 'wp_outdoor_north_drive', 'outdoor'],
  ['wp_outdoor_north_drive', 'wp_outdoor_north_corner', 'outdoor'],
  ['wp_outdoor_north_corner', 'wp_outdoor_east_edge_upper', 'outdoor'],
  ['wp_outdoor_east_edge_upper', 'wp_outdoor_east_mid', 'outdoor'],
  ['wp_outdoor_east_mid', 'wp_outdoor_east_lower', 'outdoor'],
  ['wp_outdoor_east_lower', 'wp_outdoor_east_se_junc', 'outdoor'],
  ['wp_outdoor_east_se_junc', 'wp_outdoor_east_acharya', 'outdoor'],
  ['wp_outdoor_east_acharya', 'wp_outdoor_se_corner', 'outdoor'],

  // East breezeway diagonal branch into building (S-004A / Acharya to S-001)
  ['wp_outdoor_east_se_junc', 'wp_outdoor_s004a_east', 'outdoor'],
  ['wp_outdoor_s004a_east', 'wp_se_research_cell', 'indoor'],
  ['wp_outdoor_s004a_east', 'wp_admin_acharya_path', 'indoor'],
  ['wp_outdoor_s004a_east', 'wp_outdoor_breezeway_east', 'outdoor'],
  ['wp_outdoor_breezeway_east', 'wp_outdoor_s001_west', 'outdoor'],
  ['wp_outdoor_s001_west', 'wp_east_guest', 'indoor'],
  ['wp_outdoor_s001_west', 'wp_east_south_junc', 'indoor'],

  // South perimeter roadway
  ['wp_outdoor_se_corner', 'wp_outdoor_south_east', 'outdoor'],
  ['wp_outdoor_south_east', 'wp_entrance', 'outdoor'],
  ['wp_entrance', 'wp_outdoor_south_west', 'outdoor'],
  ['wp_outdoor_south_west', 'wp_outdoor_sw_corner', 'outdoor'],

  // West perimeter roadway (outside Amritheswari Hall)
  ['wp_outdoor_sw_corner', 'wp_outdoor_west_amri', 'outdoor'],
  ['wp_outdoor_west_amri', 'wp_outdoor_amri_top_corner', 'outdoor'],

  // West inner connector (between A-006 & N-005, then north to Metallurgy Lab N-014)
  ['wp_outdoor_amri_top_corner', 'wp_outdoor_amri_north_door', 'outdoor'],
  ['wp_outdoor_amri_north_door', 'wp_outdoor_sw_breezeway_corner', 'outdoor'],
  ['wp_outdoor_sw_breezeway_corner', 'wp_sw_cross', 'outdoor'],
  ['wp_sw_cross', 'wp_outdoor_sw_north_junc', 'outdoor'],
  ['wp_outdoor_sw_north_junc', 'wp_nw_lab_metallurgy', 'outdoor']"""

for fname in ['script.js', 'app.js']:
    with open(fname, 'r', encoding='utf-8') as f:
        text = f.read()

    # Replace waypoints section
    wp_pattern = r'  // Outdoor Roadway Loop\s+[\'"]wp_outdoor_north_drive[\'"].*?wp_outdoor_mid_west_bend2[\'"][^\n]+'
    match_wp = re.search(wp_pattern, text, re.DOTALL)
    assert match_wp, f"wp_pattern not found in {fname}"
    text = text[:match_wp.start()] + new_waypoints_code + text[match_wp.end():]

    # Replace edges section
    edge_pattern = r'  // White line pathway along East side of Amritheswari Hall:.*?\[[\'"]wp_outdoor_mid_west_bend2[\'"],\s*[\'"]wp_nw_lab_metallurgy[\'"],\s*[\'"]outdoor[\'"]\]'
    match_edge = re.search(edge_pattern, text, re.DOTALL)
    assert match_edge, f"edge_pattern not found in {fname}"
    text = text[:match_edge.start()] + new_edges_code + text[match_edge.end():]

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(text)

print("Successfully replaced outdoor roadway with user orange path in script.js and app.js!")
