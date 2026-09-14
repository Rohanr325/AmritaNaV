for fname in ['script.js', 'app.js']:
    with open(fname, 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Update buildingBaseHtml on Floor 0
    old_base = """    <!-- Connecting Bridges between Wings -->
    <rect class="building-wing" x="346" y="156" width="60" height="26" />
    <rect class="building-wing" x="216" y="266" width="134" height="10" />
    <rect class="building-wing" x="216" y="340" width="310" height="10" />
    <rect class="building-wing" x="256" y="503" width="94" height="10" />
    <rect class="building-wing" x="404" y="503" width="62" height="10" />"""

    new_base = """    <!-- Connecting Bridges between Wings -->
    <rect class="building-wing" x="346" y="156" width="60" height="26" />
    <rect class="building-wing" x="216" y="266" width="310" height="10" />
    <rect class="building-wing" x="216" y="340" width="134" height="10" />
    <rect class="building-wing" x="404" y="340" width="122" height="10" />
    <rect class="building-wing" x="346" y="393" width="58" height="10" />
    <rect class="building-wing" x="256" y="503" width="270" height="10" />"""

    assert old_base in text, f"old_base not found in {fname}"
    text = text.replace(old_base, new_base, 1)

    # 2. Update corridorsHtml on Floor 0 (Upper & Mid bridges)
    old_mid_corr = """    <!-- Upper NW Connector Bridge (White line 1 in user image) -->
    <rect class="corridor-floor" x="216" y="266" width="134" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="271" x2="350" y2="271" />

    <!-- Transverse Mid Cross Passage (White line 2 in user image - full straight across) -->
    <rect class="corridor-floor" x="216" y="340" width="310" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="345" x2="523" y2="345" />"""

    new_mid_corr = """    <!-- Transverse Upper Cross Passage (WC-N2 across Atrium to WC-S2 - Top orange line) -->
    <rect class="corridor-floor" x="216" y="266" width="310" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="271" x2="523" y2="271" />

    <!-- West Mid Cross Passage (NW Labs to West Spine) -->
    <rect class="corridor-floor" x="216" y="340" width="134" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="345" x2="350" y2="345" />

    <!-- East Mid Cross Passage (East Spine to NE Workshops) -->
    <rect class="corridor-floor" x="404" y="340" width="122" height="10" rx="1" />
    <line class="corridor-centerline" x1="404" y1="345" x2="523" y2="345" />

    <!-- Mid Cross Bridge across Open Atrium (Middle orange line: N-012 HR to S-008 Principal Arts) -->
    <rect class="corridor-floor" x="350" y="393" width="54" height="10" rx="1" />
    <line class="corridor-centerline" x1="350" y1="398" x2="404" y2="398" />"""

    assert old_mid_corr in text, f"old_mid_corr not found in {fname}"
    text = text.replace(old_mid_corr, new_mid_corr, 1)

    # 3. Update corridorsHtml on Floor 0 (Lower bridge across courtyard)
    old_lower_corr = """    <!-- Lower West Indoor Connector Bridge (Blue line) -->
    <rect class="corridor-floor" x="258" y="503" width="92" height="10" rx="1" />
    <line class="corridor-centerline" x1="262" y1="508" x2="350" y2="508" />

    <!-- Lower East Indoor Connector Bridge (Blue line) -->
    <rect class="corridor-floor" x="404" y="503" width="62" height="10" rx="1" />
    <line class="corridor-centerline" x1="404" y1="508" x2="523" y2="508" />"""

    new_lower_corr = """    <!-- Transverse Lower Cross Passage (Bottom orange line - SW Labs across courtyard to S-MFG) -->
    <rect class="corridor-floor" x="258" y="503" width="268" height="10" rx="1" />
    <line class="corridor-centerline" x1="262" y1="508" x2="523" y2="508" />"""

    assert old_lower_corr in text, f"old_lower_corr not found in {fname}"
    text = text.replace(old_lower_corr, new_lower_corr, 1)

    # 4. Update Floor 0 HALLWAY_EDGES: Connectors across Atrium
    old_edges = """  // Connectors across Atrium
  ['wp_west_spine_top', 'wp_east_spine_top', 'indoor'],
  ['wp_north_exit_hub', 'wp_west_spine_top', 'indoor'],
  ['wp_north_exit_hub', 'wp_east_spine_top', 'indoor'],
  ['wp_west_mid_bridge', 'wp_east_mid_bridge', 'indoor'],
  ['wp_west_lower_bridge', 'wp_east_lower_bridge', 'indoor'],"""

    new_edges = """  // Connectors across Atrium
  ['wp_west_spine_top', 'wp_east_spine_top', 'indoor'],
  ['wp_north_exit_hub', 'wp_west_spine_top', 'indoor'],
  ['wp_north_exit_hub', 'wp_east_spine_top', 'indoor'],
  ['wp_west_upper_branch', 'wp_east_upper_branch', 'indoor'],
  ['wp_west_hr', 'wp_east_arts_prin', 'indoor'],
  ['wp_west_lower_bridge', 'wp_east_lower_bridge', 'indoor'],"""

    assert old_edges in text, f"old_edges not found in {fname}"
    text = text.replace(old_edges, new_edges, 1)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(text)

print("Successfully applied bridge updates to script.js and app.js!")
