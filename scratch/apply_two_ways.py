for fname in ['script.js', 'app.js']:
    with open(fname, 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Remove orange middle pathway edge from HALLWAY_EDGES
    old_edge = "  ['wp_sw_toilet_vest', 'wp_sw_toilet_lower', 'indoor'],\n  ['wp_sw_toilet_vest', 'wp_sw_corridor_hub', 'indoor'],"
    new_edge = "  ['wp_sw_toilet_vest', 'wp_sw_toilet_lower', 'indoor'],"
    assert old_edge in text, f"old_edge not found in {fname}"
    text = text.replace(old_edge, new_edge)

    # 2. Update layerCourtyards to include SW Labs inner courtyard
    old_court = """    <!-- 7) Patios Flanking Lower Wings -->
    <rect class="courtyard-patio" x="168" y="744" width="92" height="42" rx="2" />
    <rect class="courtyard-patio" x="484" y="744" width="98" height="42" rx="2" />"""

    new_court = """    <!-- 7) Patios Flanking Lower Wings -->
    <rect class="courtyard-patio" x="168" y="744" width="92" height="42" rx="2" />
    <rect class="courtyard-patio" x="484" y="744" width="98" height="42" rx="2" />

    <!-- 8) SW Labs Inner Courtyard / Open Patio -->
    <rect class="courtyard-patio" x="148" y="496" width="110" height="26" rx="2" />
    <text x="203" y="511" text-anchor="middle" font-size="5" fill="rgba(16, 185, 129, 0.6)" font-weight="600" letter-spacing="1">COURTYARD</text>"""

    assert old_court in text, f"old_court not found in {fname}"
    text = text.replace(old_court, new_court)

    # 3. Update layerCorridors to remove middle pathway and add the 2-way yellow lines pathway
    old_corr = """    <!-- Lower West Labs Corridor (White box in user image) -->
    <rect class="corridor-floor" x="130" y="502" width="132" height="12" rx="1" />
    <line class="corridor-centerline" x1="130" y1="508" x2="262" y2="508" />

    <!-- Transverse Lower Cross Passage (White line 2 in user image - full straight across SW Labs to S-MFG) -->
    <rect class="corridor-floor" x="256" y="503" width="270" height="10" rx="1" />
    <line class="corridor-centerline" x1="262" y1="508" x2="523" y2="508" />"""

    new_corr = """    <!-- SW Labs 2-Way Loop Corridor (North & South walkways along yellow lines) -->
    <!-- North Walkway along N-007, N-008, N-009 -->
    <rect class="corridor-floor" x="140" y="488" width="126" height="8" rx="1" />
    <line class="corridor-centerline" x1="144" y1="492" x2="262" y2="492" />

    <!-- South Walkway along N-005, N-004 -->
    <rect class="corridor-floor" x="140" y="522" width="126" height="8" rx="1" />
    <line class="corridor-centerline" x1="144" y1="526" x2="262" y2="526" />

    <!-- West Walkway & Restroom Vestibule -->
    <rect class="corridor-floor" x="140" y="488" width="8" height="42" rx="1" />
    <line class="corridor-centerline" x1="144" y1="492" x2="144" y2="526" />
    <rect class="corridor-floor" x="130" y="504" width="14" height="8" rx="1" />
    <line class="corridor-centerline" x1="130" y1="508" x2="144" y2="508" />

    <!-- East Walkway to Cross Passage -->
    <rect class="corridor-floor" x="258" y="488" width="8" height="42" rx="1" />
    <line class="corridor-centerline" x1="262" y1="492" x2="262" y2="526" />

    <!-- Transverse Lower Cross Passage (Across courtyard to S-MFG) -->
    <rect class="corridor-floor" x="262" y="503" width="264" height="10" rx="1" />
    <line class="corridor-centerline" x1="262" y1="508" x2="523" y2="508" />"""

    assert old_corr in text, f"old_corr not found in {fname}"
    text = text.replace(old_corr, new_corr)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(text)

print("Successfully updated script.js and app.js with 2-way pathways and removed middle pathway!")
