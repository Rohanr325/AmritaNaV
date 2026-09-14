with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update N-007, N-008, N-009 coordinates in ROOMS_DATA
old_rooms = """  { id: 'N-007', code: 'N-007', name: 'Thermal Engineering Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 144, y: 448, w: 70, h: 44, door: [176, 492], desc: 'Thermodynamics test benches, heat exchangers, refrigeration cycles and engines.' },
  { id: 'N-008', code: 'N-008', name: 'M.Tech Fluid Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 214, y: 448, w: 28, h: 44, door: [228, 492], desc: 'Advanced postgraduate fluid mechanics and CFD boundary flow testing facility.' },
  { id: 'N-009', code: 'N-009', name: 'Nano Center (Lab 009)', wing: 'Northern Wing (N)', category: 'LAB', x: 242, y: 448, w: 20, h: 44, door: [252, 492], desc: 'Nanomaterial device fabrication and clean room testing.' },"""

new_rooms = """  { id: 'N-007', code: 'N-007', name: 'Thermal Engineering Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 144, y: 448, w: 62, h: 44, door: [175, 492], desc: 'Thermodynamics test benches, heat exchangers, refrigeration cycles and engines.' },
  { id: 'N-008', code: 'N-008', name: 'M.Tech Fluid Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 208, y: 448, w: 28, h: 44, door: [222, 492], desc: 'Advanced postgraduate fluid mechanics and CFD boundary flow testing facility.' },
  { id: 'N-009', code: 'N-009', name: 'Nano Center (Lab 009)', wing: 'Northern Wing (N)', category: 'LAB', x: 238, y: 448, w: 26, h: 44, door: [251, 492], desc: 'Nanomaterial device fabrication and clean room testing.' },"""

assert old_rooms in text, "old_rooms not found"
text = text.replace(old_rooms, new_rooms)

# 2. Update WAYPOINTS for N-008 and N-009
old_wp = """  'wp_sw_nano9':             { id: 'wp_sw_nano9',             x: 252, y: 492, label: 'Nano Center Lab Walkway (N-009)' },
  'wp_sw_mtech8':            { id: 'wp_sw_mtech8',            x: 228, y: 492, label: 'M.Tech Fluid Lab Walkway (N-008)' },"""

new_wp = """  'wp_sw_nano9':             { id: 'wp_sw_nano9',             x: 251, y: 492, label: 'Nano Center Lab Walkway (N-009)' },
  'wp_sw_mtech8':            { id: 'wp_sw_mtech8',            x: 222, y: 492, label: 'M.Tech Fluid Lab Walkway (N-008)' },"""

assert old_wp in text, "old_wp not found"
text = text.replace(old_wp, new_wp)

# 3. Add upper bridge edge to HALLWAY_EDGES: ['wp_west_upper_branch', 'wp_east_upper_branch', 'indoor'],
old_edges1 = """  ['wp_west_mid_bridge', 'wp_east_mid_bridge', 'indoor'],
  ['wp_west_lower_bridge', 'wp_east_lower_bridge', 'indoor'],"""

new_edges1 = """  ['wp_west_upper_branch', 'wp_east_upper_branch', 'indoor'],
  ['wp_west_mid_bridge', 'wp_east_mid_bridge', 'indoor'],
  ['wp_west_lower_bridge', 'wp_east_lower_bridge', 'indoor'],"""

assert old_edges1 in text, "old_edges1 not found"
text = text.replace(old_edges1, new_edges1)

# 4. Add direct central hallway edge in SW block: ['wp_sw_toilet_vest', 'wp_sw_corridor_hub', 'indoor']
old_edges2 = """  ['wp_sw_south_west', 'wp_sw_toilet_vest', 'indoor'],
  ['wp_sw_toilet_vest', 'wp_sw_toilet_lower', 'indoor'],"""

new_edges2 = """  ['wp_sw_south_west', 'wp_sw_toilet_vest', 'indoor'],
  ['wp_sw_toilet_vest', 'wp_sw_toilet_lower', 'indoor'],
  ['wp_sw_toilet_vest', 'wp_sw_corridor_hub', 'indoor'],"""

assert old_edges2 in text, "old_edges2 not found"
text = text.replace(old_edges2, new_edges2)

# 5. Update Building Base slabs
old_base_bridges = """    <!-- Connecting Bridges between Wings -->
    <rect class="building-wing" x="346" y="156" width="60" height="26" />
    <rect class="building-wing" x="216" y="266" width="134" height="10" />
    <rect class="building-wing" x="216" y="340" width="310" height="10" />
    <rect class="building-wing" x="256" y="503" width="94" height="10" />
    <rect class="building-wing" x="404" y="503" width="62" height="10" />"""

new_base_bridges = """    <!-- Connecting Bridges between Wings -->
    <rect class="building-wing" x="346" y="156" width="60" height="26" />
    <rect class="building-wing" x="216" y="266" width="310" height="10" />
    <rect class="building-wing" x="216" y="340" width="310" height="10" />
    <rect class="building-wing" x="256" y="503" width="270" height="10" />"""

assert old_base_bridges in text, "old_base_bridges not found"
text = text.replace(old_base_bridges, new_base_bridges)

# 6. Update Corridors SVG
old_corrs = """    <!-- Upper NW Connector Bridge (White line 1 in user image) -->
    <rect class="corridor-floor" x="216" y="266" width="134" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="271" x2="350" y2="271" />

    <!-- Transverse Mid Cross Passage (White line 2 in user image - full straight across) -->
    <rect class="corridor-floor" x="216" y="340" width="310" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="345" x2="523" y2="345" />



    <!-- North Outer Lab Corridor -->
    <rect class="corridor-floor" x="216" y="266" width="10" height="146" rx="1" />
    <line class="corridor-centerline" x1="221" y1="266" x2="221" y2="406" />

    <!-- South Outer Workshops Corridor -->
    <rect class="corridor-floor" x="518" y="266" width="10" height="168" rx="1" />
    <line class="corridor-centerline" x1="523" y1="266" x2="523" y2="430" />

    <!-- South Outer Labs Corridor -->
    <rect class="corridor-floor" x="518" y="444" width="10" height="130" rx="1" />
    <line class="corridor-centerline" x1="523" y1="444" x2="523" y2="574" />

    <!-- Lower West Labs Corridor -->
    <rect class="corridor-floor" x="130" y="504" width="132" height="8" rx="1" />
    <line class="corridor-centerline" x1="130" y1="508" x2="262" y2="508" />

    <!-- Lower West Indoor Connector Bridge (Blue line) -->
    <rect class="corridor-floor" x="256" y="503" width="94" height="10" rx="1" />
    <line class="corridor-centerline" x1="262" y1="508" x2="350" y2="508" />

    <!-- Lower East Indoor Connector Bridge (Blue line) -->
    <rect class="corridor-floor" x="404" y="503" width="62" height="10" rx="1" />
    <line class="corridor-centerline" x1="404" y1="508" x2="523" y2="508" />"""

new_corrs = """    <!-- Transverse Upper Cross Passage (White line 1 in user image - full straight across WC-N2 to WC-S2) -->
    <rect class="corridor-floor" x="216" y="266" width="310" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="271" x2="523" y2="271" />

    <!-- Transverse Mid Cross Passage (Full straight across) -->
    <rect class="corridor-floor" x="216" y="340" width="310" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="345" x2="523" y2="345" />



    <!-- North Outer Lab Corridor -->
    <rect class="corridor-floor" x="216" y="266" width="10" height="146" rx="1" />
    <line class="corridor-centerline" x1="221" y1="266" x2="221" y2="406" />

    <!-- South Outer Workshops Corridor -->
    <rect class="corridor-floor" x="518" y="266" width="10" height="168" rx="1" />
    <line class="corridor-centerline" x1="523" y1="266" x2="523" y2="430" />

    <!-- South Outer Labs Corridor -->
    <rect class="corridor-floor" x="518" y="444" width="10" height="130" rx="1" />
    <line class="corridor-centerline" x1="523" y1="444" x2="523" y2="574" />

    <!-- Lower West Labs Corridor (White box in user image) -->
    <rect class="corridor-floor" x="130" y="502" width="132" height="12" rx="1" />
    <line class="corridor-centerline" x1="130" y1="508" x2="262" y2="508" />

    <!-- Transverse Lower Cross Passage (White line 2 in user image - full straight across SW Labs to S-MFG) -->
    <rect class="corridor-floor" x="256" y="503" width="270" height="10" rx="1" />
    <line class="corridor-centerline" x1="262" y1="508" x2="523" y2="508" />"""

assert old_corrs in text, "old_corrs not found"
text = text.replace(old_corrs, new_corrs)

# 7. Update Room label font size to avoid overlap on narrow rooms
old_font = "const fontSize = isSmall ? '7px' : '8.5px';"
new_font = "const fontSize = (r.w < 30) ? '6px' : (isSmall ? '7px' : '8.5px');"

assert old_font in text, "old_font not found"
text = text.replace(old_font, new_font)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(text)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Applied all changes to script.js and app.js!")
