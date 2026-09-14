for fname in ['script.js', 'app.js']:
    with open(fname, 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Update layerBuildingBase: split Y=340 bridge and add Y=393 cross bridge
    old_base = '<rect class="building-wing" x="216" y="340" width="310" height="10" />'
    new_base = """<rect class="building-wing" x="216" y="340" width="134" height="10" />
    <rect class="building-wing" x="404" y="340" width="122" height="10" />
    <rect class="building-wing" x="350" y="393" width="54" height="10" />"""
    assert old_base in text, f"old_base not found in {fname}"
    text = text.replace(old_base, new_base)

    # 2. Update layerCourtyards: adjust OPEN ATRIUM text positioning if needed
    old_atrium_text = """    <text x="376" y="260" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 260)" font-weight="600" letter-spacing="1.5">OPEN ATRIUM</text>
    <text x="376" y="420" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 420)" font-weight="600" letter-spacing="1.5">OPEN ATRIUM</text>"""

    new_atrium_text = """    <text x="376" y="260" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 260)" font-weight="600" letter-spacing="1.5">OPEN ATRIUM</text>
    <text x="376" y="440" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 440)" font-weight="600" letter-spacing="1.5">OPEN ATRIUM</text>"""
    if old_atrium_text in text:
        text = text.replace(old_atrium_text, new_atrium_text)

    # 3. Update layerCorridors: remove atrium section at Y=345, add atrium bridge at Y=398
    old_mid_corr = """    <!-- Transverse Mid Cross Passage (Full straight across) -->
    <rect class="corridor-floor" x="216" y="340" width="310" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="345" x2="523" y2="345" />"""

    new_mid_corr = """    <!-- West Mid Cross Passage (NW Labs to West Spine) -->
    <rect class="corridor-floor" x="216" y="340" width="134" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="345" x2="350" y2="345" />

    <!-- East Mid Cross Passage (East Spine to NE Workshops) -->
    <rect class="corridor-floor" x="404" y="340" width="122" height="10" rx="1" />
    <line class="corridor-centerline" x1="404" y1="345" x2="523" y2="345" />

    <!-- Cross Bridge over Open Atrium (Blue line: N-012 HR to S-008 Principal Arts) -->
    <rect class="corridor-floor" x="350" y="393" width="54" height="10" rx="1" />
    <line class="corridor-centerline" x1="350" y1="398" x2="404" y2="398" />"""
    assert old_mid_corr in text, f"old_mid_corr not found in {fname}"
    text = text.replace(old_mid_corr, new_mid_corr)

    # 4. Update HALLWAY_EDGES: remove mid bridge atrium edge, add blue line bridge edge
    old_edges = """  ['wp_west_upper_branch', 'wp_east_upper_branch', 'indoor'],
  ['wp_west_mid_bridge', 'wp_east_mid_bridge', 'indoor'],
  ['wp_west_lower_bridge', 'wp_east_lower_bridge', 'indoor'],"""

    new_edges = """  ['wp_west_upper_branch', 'wp_east_upper_branch', 'indoor'],
  ['wp_west_hr', 'wp_east_arts_prin', 'indoor'],
  ['wp_west_lower_bridge', 'wp_east_lower_bridge', 'indoor'],"""
    assert old_edges in text, f"old_edges not found in {fname}"
    text = text.replace(old_edges, new_edges)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(text)

print("Successfully applied bridge relocation in script.js and app.js!")
