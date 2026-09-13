import re

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Restore SW rooms in ROOMS_DATA
old_sw_rooms = '''  { id: 'TOILET-N-LOWER', code: 'WC-N1', name: 'Gents Restroom (NW-Lower)', wing: 'Northern Wing (N)', category: 'TOILET', x: 168, y: 448, w: 38, h: 44, door: [206, 492], desc: 'Gents washrooms and drinking water point.' },
  { id: 'N-007', code: 'N-007', name: 'Thermal Engineering Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 208, y: 448, w: 44, h: 44, door: [230, 492], desc: 'Thermodynamics test benches, heat exchangers, refrigeration cycles and engines.' },
  { id: 'N-008', code: 'N-008', name: 'M.Tech Fluid Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 254, y: 448, w: 26, h: 44, door: [267, 492], desc: 'Advanced postgraduate fluid mechanics and CFD boundary flow testing facility.' },
  { id: 'N-009', code: 'N-009', name: 'Nano Center (Lab 009)', wing: 'Northern Wing (N)', category: 'LAB', x: 282, y: 448, w: 24, h: 44, door: [294, 492], desc: 'Nanomaterial device fabrication and clean room testing.' },
  { id: 'N-005-006', code: 'N-005', name: 'Nano Sciences (Solar Lab)', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 524, w: 76, h: 46, door: [206, 524], desc: 'Storage Integrated Solar Module Research Laboratory & Clean Energy Systems.' },
  { id: 'N-004', code: 'N-004', name: 'Amrita Center for Nano Sciences', wing: 'Northern Wing (N)', category: 'LAB', x: 246, y: 524, w: 60, h: 46, door: [276, 524], desc: 'Advanced Nanotechnology materials synthesis and molecular characterization.' }'''

restored_sw_rooms = '''  { id: 'N-007', code: 'N-007', name: 'Thermal Engineering Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 448, w: 70, h: 44, door: [200, 492], desc: 'Thermodynamics test benches, heat exchangers, refrigeration cycles and engines.' },
  { id: 'N-008', code: 'N-008', name: 'M.Tech Fluid Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 238, y: 448, w: 28, h: 44, door: [252, 492], desc: 'Advanced postgraduate fluid mechanics and CFD boundary flow testing facility.' },
  { id: 'N-009', code: 'N-009', name: 'Nano Center (Lab 009)', wing: 'Northern Wing (N)', category: 'LAB', x: 266, y: 448, w: 20, h: 44, door: [276, 492], desc: 'Nanomaterial device fabrication and clean room testing.' },
  { id: 'TOILET-N-LOWER', code: 'WC-N1', name: 'Gents Restroom (NW-Lower)', wing: 'Northern Wing (N)', category: 'TOILET', x: 116, y: 488, w: 38, h: 34, door: [154, 508], desc: 'Gents washrooms and drinking water point near Thermal Lab.' },
  { id: 'N-005-006', code: 'N-005', name: 'Nano Sciences (Solar Lab)', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 526, w: 80, h: 46, door: [200, 526], desc: 'Storage Integrated Solar Module Research Laboratory & Clean Energy Systems.' },
  { id: 'N-004', code: 'N-004', name: 'Amrita Center for Nano Sciences', wing: 'Northern Wing (N)', category: 'LAB', x: 248, y: 526, w: 38, h: 46, door: [260, 526], desc: 'Advanced Nanotechnology materials synthesis and molecular characterization.' }'''

assert old_sw_rooms in code, "old_sw_rooms not found"
code = code.replace(old_sw_rooms, restored_sw_rooms)

# 2. Restore SW waypoints in WAYPOINTS
old_sw_wp = '''  // 5. Lower-West Wing Branch (WC-N1, N-004..N-009)
  'wp_sw_cross':             { id: 'wp_sw_cross',             x: 325, y: 508, label: 'SW Cross Passage Bridge' },
  'wp_sw_corridor_hub':      { id: 'wp_sw_corridor_hub',      x: 300, y: 508, label: 'SW Labs Courtyard East Entry' },
  'wp_sw_north_east':        { id: 'wp_sw_north_east',        x: 294, y: 492, label: 'SW Labs North Corridor Entry' },
  'wp_sw_nano9':             { id: 'wp_sw_nano9',             x: 294, y: 492, label: 'Nano Center Lab Walkway (N-009)' },
  'wp_sw_mtech8':            { id: 'wp_sw_mtech8',            x: 267, y: 492, label: 'M.Tech Fluid Lab Walkway (N-008)' },
  'wp_sw_thermal7':          { id: 'wp_sw_thermal7',          x: 230, y: 492, label: 'Thermal Engg Lab Walkway (N-007)' },
  'wp_sw_toilet_lower':      { id: 'wp_sw_toilet_lower',      x: 206, y: 492, label: 'WC-N1 Gents Restroom Door' },
  'wp_sw_south_east':        { id: 'wp_sw_south_east',        x: 276, y: 524, label: 'SW Labs South Corridor Entry' },
  'wp_sw_nano4':             { id: 'wp_sw_nano4',             x: 276, y: 524, label: 'Nano Sciences Lab Walkway (N-004)' },
  'wp_sw_solar5':            { id: 'wp_sw_solar5',            x: 206, y: 524, label: 'Solar Research Lab Walkway (N-005)' },'''

restored_sw_wp = '''  // 5. Lower-West Wing Branch (WC-N1, N-004 to N-009) - Rectangular Perimeter Courtyard Loop
  'wp_sw_cross':             { id: 'wp_sw_cross',             x: 306, y: 508, label: 'SW Cross Passage (N-010 / N-003)' },
  'wp_sw_corridor_hub':      { id: 'wp_sw_corridor_hub',      x: 280, y: 508, label: 'SW Labs Courtyard East Entry' },
  'wp_sw_north_east':        { id: 'wp_sw_north_east',        x: 280, y: 492, label: 'SW Labs North Corridor Corner' },
  'wp_sw_nano9':             { id: 'wp_sw_nano9',             x: 276, y: 492, label: 'Nano Center Lab Walkway (N-009)' },
  'wp_sw_mtech8':            { id: 'wp_sw_mtech8',            x: 252, y: 492, label: 'M.Tech Fluid Lab Walkway (N-008)' },
  'wp_sw_thermal7':          { id: 'wp_sw_thermal7',          x: 200, y: 492, label: 'Thermal Engg Lab Walkway (N-007)' },
  'wp_sw_north_west':        { id: 'wp_sw_north_west',        x: 168, y: 492, label: 'SW Labs North-West Corner' },
  'wp_sw_south_east':        { id: 'wp_sw_south_east',        x: 280, y: 526, label: 'SW Labs South Corridor Corner' },
  'wp_sw_nano4':             { id: 'wp_sw_nano4',             x: 260, y: 526, label: 'Nano Sciences Lab Walkway (N-004)' },
  'wp_sw_solar5':            { id: 'wp_sw_solar5',            x: 200, y: 526, label: 'Solar Research Lab Walkway (N-005)' },
  'wp_sw_south_west':        { id: 'wp_sw_south_west',        x: 168, y: 526, label: 'SW Labs South-West Corner' },
  'wp_sw_toilet_vest':       { id: 'wp_sw_toilet_vest',       x: 168, y: 508, label: 'SW Restroom Vestibule' },
  'wp_sw_toilet_lower':      { id: 'wp_sw_toilet_lower',      x: 154, y: 508, label: 'WC-N1 Gents Restroom Door' },'''

assert old_sw_wp in code, "old_sw_wp not found"
code = code.replace(old_sw_wp, restored_sw_wp)

# Also update outdoor roadway coordinates around WC-N1
old_out_wp = '''  'wp_outdoor_sw_corner':       { id: 'wp_outdoor_sw_corner',       x: 145, y: 805, label: 'Southwest Campus Roadway Corner' },
  'wp_outdoor_west_amri':       { id: 'wp_outdoor_west_amri',       x: 145, y: 620, label: 'West Roadway (outside Amritheswari)' },
  'wp_outdoor_west_breezeway':  { id: 'wp_outdoor_west_breezeway',  x: 220, y: 620, label: 'West Courtyard Breezeway Entry' },
  'wp_outdoor_amri_top':        { id: 'wp_outdoor_amri_top',        x: 220, y: 580, label: 'Amritheswari North Lightwell' },
  'wp_outdoor_sw_cross_junc':   { id: 'wp_outdoor_sw_cross_junc',   x: 145, y: 508, label: 'West Courtyard & Cross Walkway Crossing' },
  'wp_outdoor_mid_west_bend1':  { id: 'wp_outdoor_mid_west_bend1',  x: 145, y: 440, label: 'West Courtyard Walkway Mid' },
  'wp_outdoor_mid_west_bend2':  { id: 'wp_outdoor_mid_west_bend2',  x: 145, y: 398, label: 'Metallurgy Lab South Outer Access' }'''

restored_out_wp = '''  'wp_outdoor_sw_corner':       { id: 'wp_outdoor_sw_corner',       x: 100, y: 805, label: 'Southwest Campus Roadway Corner' },
  'wp_outdoor_west_amri':       { id: 'wp_outdoor_west_amri',       x: 100, y: 620, label: 'West Roadway (outside Amritheswari)' },
  'wp_outdoor_west_breezeway':  { id: 'wp_outdoor_west_breezeway',  x: 220, y: 620, label: 'West Courtyard Breezeway Entry' },
  'wp_outdoor_amri_top':        { id: 'wp_outdoor_amri_top',        x: 220, y: 580, label: 'Amritheswari North Lightwell' },
  'wp_outdoor_sw_cross_junc':   { id: 'wp_outdoor_sw_cross_junc',   x: 100, y: 508, label: 'West Courtyard & Cross Walkway Crossing' },
  'wp_outdoor_mid_west_bend1':  { id: 'wp_outdoor_mid_west_bend1',  x: 100, y: 440, label: 'West Courtyard Walkway Mid' },
  'wp_outdoor_mid_west_bend2':  { id: 'wp_outdoor_mid_west_bend2',  x: 145, y: 398, label: 'Metallurgy Lab South Outer Access' }'''

assert old_out_wp in code, "old_out_wp not found"
code = code.replace(old_out_wp, restored_out_wp)

# 3. Restore SW edges in HALLWAY_EDGES
old_sw_edges = '''  // Lower West Wing Branch (WC-N1, N-004..N-009)
  ['wp_west_lower_bridge', 'wp_sw_cross', 'indoor'],
  ['wp_sw_cross', 'wp_sw_corridor_hub', 'indoor'],
  ['wp_sw_corridor_hub', 'wp_sw_north_east', 'indoor'],
  ['wp_sw_north_east', 'wp_sw_nano9', 'indoor'],
  ['wp_sw_nano9', 'wp_sw_mtech8', 'indoor'],
  ['wp_sw_mtech8', 'wp_sw_thermal7', 'indoor'],
  ['wp_sw_thermal7', 'wp_sw_toilet_lower', 'indoor'],
  ['wp_sw_corridor_hub', 'wp_sw_south_east', 'indoor'],
  ['wp_sw_south_east', 'wp_sw_nano4', 'indoor'],
  ['wp_sw_nano4', 'wp_sw_solar5', 'indoor'],
  ['wp_sw_solar5', 'wp_sw_toilet_lower', 'indoor'],'''

restored_sw_edges = '''  // Lower West Wing Branch (WC-N1, N-004..N-009)
  ['wp_west_lower_bridge', 'wp_sw_cross', 'indoor'],
  ['wp_sw_cross', 'wp_sw_corridor_hub', 'indoor'],
  ['wp_sw_corridor_hub', 'wp_sw_north_east', 'indoor'],
  ['wp_sw_north_east', 'wp_sw_nano9', 'indoor'],
  ['wp_sw_nano9', 'wp_sw_mtech8', 'indoor'],
  ['wp_sw_mtech8', 'wp_sw_thermal7', 'indoor'],
  ['wp_sw_thermal7', 'wp_sw_north_west', 'indoor'],
  ['wp_sw_north_west', 'wp_sw_toilet_vest', 'indoor'],
  ['wp_sw_corridor_hub', 'wp_sw_south_east', 'indoor'],
  ['wp_sw_south_east', 'wp_sw_nano4', 'indoor'],
  ['wp_sw_nano4', 'wp_sw_solar5', 'indoor'],
  ['wp_sw_solar5', 'wp_sw_south_west', 'indoor'],
  ['wp_sw_south_west', 'wp_sw_toilet_vest', 'indoor'],
  ['wp_sw_toilet_vest', 'wp_sw_toilet_lower', 'indoor'],'''

assert old_sw_edges in code, "old_sw_edges not found"
code = code.replace(old_sw_edges, restored_sw_edges)

# 4. Restore building footprint in renderSvgMap
old_footprint = '''    <!-- North Outer Wing (Lower - Thermal to Nano, inside x>=168) -->
    <rect class="building-wing" x="168" y="444" width="140" height="130" rx="2" />'''

restored_footprint = '''    <!-- North Outer Wing (Lower - Thermal to Nano) -->
    <path class="building-wing" d="
      M 112 446 L 288 446 L 288 576 L 138 576 L 138 526 L 112 526 Z
    " />'''

assert old_footprint in code, "old_footprint not found"
code = code.replace(old_footprint, restored_footprint)

# Connecting bridge lower:
old_bridge = '<rect class="building-wing" x="296" y="503" width="230" height="10" />'
restored_bridge = '''<rect class="building-wing" x="274" y="503" width="76" height="10" />
    <rect class="building-wing" x="404" y="503" width="62" height="10" />'''
assert old_bridge in code, "old_bridge not found"
code = code.replace(old_bridge, restored_bridge)

# Corridor floors:
old_corr = '''    <!-- Lower West Labs Corridor System -->
    <rect class="corridor-floor" x="200" y="503" width="100" height="10" rx="1" />
    <line class="corridor-centerline" x1="206" y1="508" x2="300" y2="508" />
    <rect class="corridor-floor" x="200" y="488" width="100" height="8" rx="1" />
    <line class="corridor-centerline" x1="206" y1="492" x2="294" y2="492" />
    <rect class="corridor-floor" x="200" y="520" width="100" height="8" rx="1" />
    <line class="corridor-centerline" x1="206" y1="524" x2="276" y2="524" />'''

restored_corr = '''    <!-- Lower West Labs Corridor -->
    <rect class="corridor-floor" x="144" y="504" width="138" height="8" rx="1" />
    <line class="corridor-centerline" x1="154" y1="508" x2="280" y2="508" />

    <!-- Lower West Indoor Connector Bridge (Blue line) -->
    <rect class="corridor-floor" x="274" y="503" width="76" height="10" rx="1" />
    <line class="corridor-centerline" x1="280" y1="508" x2="350" y2="508" />

    <!-- Lower East Indoor Connector Bridge (Blue line) -->
    <rect class="corridor-floor" x="404" y="503" width="62" height="10" rx="1" />
    <line class="corridor-centerline" x1="404" y1="508" x2="523" y2="508" />'''

# And transverse lower cross bridge:
old_lower_bridge = '''    <!-- Transverse Lower Cross Bridge (Full across courtyard from SW labs to S-MFG) -->
    <rect class="corridor-floor" x="296" y="503" width="230" height="10" rx="1" />
    <line class="corridor-centerline" x1="300" y1="508" x2="523" y2="508" />'''

assert old_lower_bridge in code, "old_lower_bridge not found"
code = code.replace(old_lower_bridge, '')
assert old_corr in code, "old_corr not found"
code = code.replace(old_corr, restored_corr)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('SW block successfully restored to original position in app.js!')
