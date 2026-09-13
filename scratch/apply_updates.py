with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Rooms adjustments to eliminate any classroom overlapping with indoor corridors
# N-019: y=184, h=80 (clears corridor at y=266..276)
text = text.replace("{ id: 'N-019', code: 'N-019', name: 'Electrical Machines Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 304, y: 184, w: 42, h: 84, door: [346, 226],",
                    "{ id: 'N-019', code: 'N-019', name: 'Electrical Machines Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 304, y: 184, w: 42, h: 80, door: [346, 226],")

# N-018: y=278, h=48 (clears corridor at y=266..276)
text = text.replace("{ id: 'N-018', code: 'N-018', name: 'Dept of Mathematics (108)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 304, y: 274, w: 42, h: 52, door: [346, 300],",
                    "{ id: 'N-018', code: 'N-018', name: 'Dept of Mathematics (108)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 304, y: 278, w: 42, h: 48, door: [346, 300],")

# N-010: y=462, h=40 (clears corridor at y=503..513)
text = text.replace("{ id: 'N-010', code: 'N-010', name: 'Staff Room (Mech)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 462, w: 40, h: 44, door: [346, 484],",
                    "{ id: 'N-010', code: 'N-010', name: 'Staff Room (Mech)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 462, w: 40, h: 40, door: [346, 484],")

# S-010: y=350, h=18 (clears corridor at y=340..350)
text = text.replace("{ id: 'S-010', code: 'S-010', name: 'South Conference Room', wing: 'Southern Wing (S)', category: 'ROOM', x: 405, y: 346, w: 40, h: 22, door: [405, 357],",
                    "{ id: 'S-010', code: 'S-010', name: 'South Conference Room', wing: 'Southern Wing (S)', category: 'ROOM', x: 405, y: 350, w: 40, h: 18, door: [405, 357],")

# S-006: y=462, h=40 (clears corridor at y=503..513)
text = text.replace("{ id: 'S-006', code: 'S-006', name: 'Staff Room (ECE & EEE)', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 462, w: 40, h: 44, door: [405, 484],",
                    "{ id: 'S-006', code: 'S-006', name: 'Staff Room (ECE & EEE)', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 462, w: 40, h: 40, door: [405, 484],")

# 2. Corridors:
# Corridor 0: x="224" width="302" (clears A-006 and A-001)
text = text.replace('<rect class="corridor-floor" x="220" y="688" width="308" height="18" rx="1" />',
                    '<rect class="corridor-floor" x="224" y="688" width="302" height="18" rx="1" />')

# Corridor 3: x="396" width="9" (clears all S-block classrooms starting at x=405)
text = text.replace('<rect class="corridor-floor" x="400" y="162" width="8" height="534" />',
                    '<rect class="corridor-floor" x="396" y="162" width="9" height="534" />')

# Corridor 4: width="59" (clears S-014)
text = text.replace('<rect class="corridor-floor" x="346" y="162" width="62" height="16" rx="1" />',
                    '<rect class="corridor-floor" x="346" y="162" width="59" height="16" rx="1" />')

# Corridor 10: x="130" width="132" (clears WC-N1)
text = text.replace('<rect class="corridor-floor" x="120" y="504" width="142" height="8" rx="1" />',
                    '<rect class="corridor-floor" x="130" y="504" width="132" height="8" rx="1" />')

# Corridor 13: starts at y=846 (south entrance porch outside GAD-PR)
text = text.replace('<rect class="corridor-floor" x="368" y="806" width="12" height="55" rx="1" />',
                    '<rect class="corridor-floor" x="368" y="846" width="12" height="15" rx="1" />')

# 3. Add pathway on white line in front of Acharya Hall:
acharya_pathway_svg = """    <!-- Amritheswari East Breezeway Pathway (White line in user sketch) -->
    <rect class="corridor-floor" x="227" y="600" width="10" height="96" rx="1" />
    <line class="corridor-centerline" x1="232" y1="600" x2="232" y2="696" />

    <!-- Acharya West Breezeway Pathway (White line in user sketch) -->
    <rect class="corridor-floor" x="513" y="600" width="10" height="96" rx="1" />
    <line class="corridor-centerline" x1="518" y1="600" x2="518" y2="696" />"""

text = text.replace("""    <!-- Amritheswari East Breezeway Pathway (White line in user sketch) -->
    <rect class="corridor-floor" x="227" y="600" width="10" height="96" rx="1" />
    <line class="corridor-centerline" x1="232" y1="600" x2="232" y2="696" />""", acharya_pathway_svg)

# 4. Waypoints:
wp_target = "  'wp_admin_wc_girls':       { id: 'wp_admin_wc_girls',       x: 504, y: 696, label: 'Girls Restroom Walkway (Admin)' },"
wp_replacement = """  'wp_admin_wc_girls':       { id: 'wp_admin_wc_girls',       x: 504, y: 696, label: 'Girls Restroom Walkway (Admin)' },
  'wp_admin_acharya_junc':   { id: 'wp_admin_acharya_junc',   x: 518, y: 696, label: 'Admin East Corridor (Acharya North Path Junc)' },
  'wp_admin_acharya_path':   { id: 'wp_admin_acharya_path',   x: 518, y: 648, label: 'Admin East Elevated Walkway (Acharya West Path)' },
  'wp_outdoor_east_breezeway': { id: 'wp_outdoor_east_breezeway', x: 518, y: 600, label: 'East Breezeway Pathway North Entrance' },"""

text = text.replace(wp_target, wp_replacement)

# 5. Hallway edges:
edge_target = "  ['wp_admin_wc_girls', 'wp_admin_east_end', 'indoor'],"
edge_replacement = """  ['wp_admin_wc_girls', 'wp_admin_acharya_junc', 'indoor'],
  ['wp_admin_acharya_junc', 'wp_admin_east_end', 'indoor'],
  ['wp_admin_acharya_junc', 'wp_admin_acharya_path', 'indoor'],
  ['wp_admin_acharya_path', 'wp_outdoor_east_breezeway', 'indoor'],
  ['wp_outdoor_east_breezeway', 'wp_se_research_cell', 'indoor'],
  ['wp_outdoor_east_breezeway', 'wp_outdoor_breezeway_east', 'outdoor'],"""

text = text.replace(edge_target, edge_replacement)

# 6. Room label typography:
text = text.replace("const isSmall = r.w < 38 || r.h < 26;", "const isSmall = r.w < 42 || r.h < 26;")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(text)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated app.js and script.js successfully!")
