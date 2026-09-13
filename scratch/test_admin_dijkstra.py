import math

WAYPOINTS = {
  # 1. North Building Exit
  'wp_north_exit_hub':      { 'id': 'wp_north_exit_hub',      'x': 376, 'y': 147 },
  'wp_north_exit_steps':    { 'id': 'wp_north_exit_steps',    'x': 376, 'y': 100 },

  # 2. West Circulation Veranda Corridor (along N-Block rooms, X = 350)
  'wp_west_spine_top':     { 'id': 'wp_west_spine_top',     'x': 350, 'y': 170 },
  'wp_west_machines':      { 'id': 'wp_west_machines',      'x': 350, 'y': 226 },
  'wp_west_upper_branch':  { 'id': 'wp_west_upper_branch',  'x': 350, 'y': 271 },
  'wp_west_math':          { 'id': 'wp_west_math',          'x': 350, 'y': 300 },
  'wp_west_mid_bridge':    { 'id': 'wp_west_mid_bridge',    'x': 350, 'y': 345 },
  'wp_west_prin':          { 'id': 'wp_west_prin',          'x': 350, 'y': 366 },
  'wp_west_hr':            { 'id': 'wp_west_hr',            'x': 350, 'y': 398 },
  'wp_west_affairs':       { 'id': 'wp_west_affairs',       'x': 350, 'y': 433 },
  'wp_west_staff':         { 'id': 'wp_west_staff',         'x': 350, 'y': 484 },
  'wp_west_lower_bridge':  { 'id': 'wp_west_lower_bridge',  'x': 350, 'y': 508 },
  'wp_west_cir':           { 'id': 'wp_west_cir',           'x': 350, 'y': 544 },
  'wp_west_mech':          { 'id': 'wp_west_mech',          'x': 350, 'y': 574 },
  'wp_west_admis':         { 'id': 'wp_west_admis',         'x': 350, 'y': 608 },
  'wp_west_south_junc':    { 'id': 'wp_west_south_junc',    'x': 350, 'y': 696 },

  # 3. East Circulation Veranda Corridor (along S-Block rooms, X = 404)
  'wp_east_spine_top':     { 'id': 'wp_east_spine_top',     'x': 404, 'y': 170 },
  'wp_east_computer':      { 'id': 'wp_east_computer',      'x': 404, 'y': 226 },
  'wp_east_upper_branch':  { 'id': 'wp_east_upper_branch',  'x': 404, 'y': 271 },
  'wp_east_admin':         { 'id': 'wp_east_admin',         'x': 404, 'y': 300 },
  'wp_east_mid_bridge':    { 'id': 'wp_east_mid_bridge',    'x': 404, 'y': 345 },
  'wp_east_conf':          { 'id': 'wp_east_conf',          'x': 404, 'y': 357 },
  'wp_east_s009':          { 'id': 'wp_east_s009',          'x': 404, 'y': 375 },
  'wp_east_arts_prin':     { 'id': 'wp_east_arts_prin',     'x': 404, 'y': 398 },
  'wp_east_director':      { 'id': 'wp_east_director',      'x': 404, 'y': 433 },
  'wp_east_staff':         { 'id': 'wp_east_staff',         'x': 404, 'y': 484 },
  'wp_east_lower_bridge':  { 'id': 'wp_east_lower_bridge',  'x': 404, 'y': 508 },
  'wp_east_kitchen':       { 'id': 'wp_east_kitchen',       'x': 404, 'y': 544 },
  'wp_east_serve':         { 'id': 'wp_east_serve',         'x': 404, 'y': 574 },
  'wp_east_guest':         { 'id': 'wp_east_guest',         'x': 404, 'y': 608 },
  'wp_east_south_junc':    { 'id': 'wp_east_south_junc',    'x': 404, 'y': 696 },

  # 4. Upper-West Wing Branch
  'wp_nw_corridor_top':      { 'id': 'wp_nw_corridor_top',      'x': 221, 'y': 271 },
  'wp_nw_toilet_door':       { 'id': 'wp_nw_toilet_door',       'x': 216, 'y': 271 },
  'wp_nw_cross_upper':       { 'id': 'wp_nw_cross_upper',       'x': 285, 'y': 271 },
  'wp_nw_lab_dynamics':      { 'id': 'wp_nw_lab_dynamics',      'x': 221, 'y': 302 },
  'wp_nw_lab_cae':           { 'id': 'wp_nw_lab_cae',           'x': 221, 'y': 330 },
  'wp_nw_lab_corridor_mid':  { 'id': 'wp_nw_lab_corridor_mid',  'x': 221, 'y': 345 },
  'wp_nw_cross_mid':         { 'id': 'wp_nw_cross_mid',         'x': 285, 'y': 345 },
  'wp_nw_lab_fluid':         { 'id': 'wp_nw_lab_fluid',         'x': 221, 'y': 364 },
  'wp_nw_lab_metallurgy':    { 'id': 'wp_nw_lab_metallurgy',    'x': 221, 'y': 398 },

  # 5. Lower-West Wing Branch
  'wp_sw_cross':             { 'id': 'wp_sw_cross',             'x': 290, 'y': 508 },
  'wp_sw_corridor_hub':      { 'id': 'wp_sw_corridor_hub',      'x': 262, 'y': 508 },
  'wp_sw_north_east':        { 'id': 'wp_sw_north_east',        'x': 262, 'y': 492 },
  'wp_sw_nano9':             { 'id': 'wp_sw_nano9',             'x': 252, 'y': 492 },
  'wp_sw_mtech8':            { 'id': 'wp_sw_mtech8',            'x': 228, 'y': 492 },
  'wp_sw_thermal7':          { 'id': 'wp_sw_thermal7',          'x': 176, 'y': 492 },
  'wp_sw_north_west':        { 'id': 'wp_sw_north_west',        'x': 144, 'y': 492 },
  'wp_sw_south_east':        { 'id': 'wp_sw_south_east',        'x': 262, 'y': 526 },
  'wp_sw_nano4':             { 'id': 'wp_sw_nano4',             'x': 236, 'y': 526 },
  'wp_sw_solar5':            { 'id': 'wp_sw_solar5',            'x': 176, 'y': 526 },
  'wp_sw_south_west':        { 'id': 'wp_sw_south_west',        'x': 144, 'y': 526 },
  'wp_sw_toilet_vest':       { 'id': 'wp_sw_toilet_vest',       'x': 144, 'y': 508 },
  'wp_sw_toilet_lower':      { 'id': 'wp_sw_toilet_lower',      'x': 130, 'y': 508 },

  # 6. Upper-East Wing Branch
  'wp_ne_cross_upper':       { 'id': 'wp_ne_cross_upper',       'x': 464, 'y': 271 },
  'wp_ne_corridor_top':      { 'id': 'wp_ne_corridor_top',      'x': 523, 'y': 271 },
  'wp_ne_toilet_door':       { 'id': 'wp_ne_toilet_door',       'x': 532, 'y': 282 },
  'wp_ne_windtunnel':        { 'id': 'wp_ne_windtunnel',        'x': 523, 'y': 320 },
  'wp_ne_cross_mid':         { 'id': 'wp_ne_cross_mid',         'x': 464, 'y': 345 },
  'wp_ne_corridor_hub':      { 'id': 'wp_ne_corridor_hub',      'x': 523, 'y': 345 },
  'wp_ne_robotics':          { 'id': 'wp_ne_robotics',          'x': 523, 'y': 356 },
  'wp_ne_workshop':          { 'id': 'wp_ne_workshop',          'x': 523, 'y': 386 },
  'wp_se_toilet_mid':        { 'id': 'wp_se_toilet_mid',        'x': 523, 'y': 420 },

  # 7. Lower-East Wing Branch
  'wp_se_materials':         { 'id': 'wp_se_materials',         'x': 523, 'y': 460 },
  'wp_se_cross':             { 'id': 'wp_se_cross',             'x': 464, 'y': 508 },
  'wp_se_corridor_hub':      { 'id': 'wp_se_corridor_hub',      'x': 523, 'y': 508 },
  'wp_se_mfg':               { 'id': 'wp_se_mfg',               'x': 523, 'y': 506 },
  'wp_se_faculty_s004':      { 'id': 'wp_se_faculty_s004',      'x': 523, 'y': 547 },
  'wp_se_research_cell':     { 'id': 'wp_se_research_cell',     'x': 523, 'y': 567 },

  # 8. South Lobby & Admin Axial Corridor
  'wp_admin_west_end':       { 'id': 'wp_admin_west_end',       'x': 224, 'y': 696 },
  'wp_admin_white_path':     { 'id': 'wp_admin_white_path',     'x': 232, 'y': 648 },
  'wp_admin_wc_boys':        { 'id': 'wp_admin_wc_boys',        'x': 243, 'y': 696 },
  'wp_admin_west_st':        { 'id': 'wp_admin_west_st',        'x': 262, 'y': 696 },
  'wp_admin_a005':           { 'id': 'wp_admin_a005',           'x': 281, 'y': 696 },
  'wp_admin_a004':           { 'id': 'wp_admin_a004',           'x': 313, 'y': 696 },
  'wp_admin_cross':          { 'id': 'wp_admin_cross',          'x': 374, 'y': 696 },
  'wp_admin_a003':           { 'id': 'wp_admin_a003',           'x': 435, 'y': 696 },
  'wp_admin_a002':           { 'id': 'wp_admin_a002',           'x': 466, 'y': 696 },
  'wp_admin_east_st':        { 'id': 'wp_admin_east_st',        'x': 486, 'y': 696 },
  'wp_admin_wc_girls':       { 'id': 'wp_admin_wc_girls',       'x': 504, 'y': 696 },
  'wp_admin_east_end':       { 'id': 'wp_admin_east_end',       'x': 526, 'y': 696 },
  'wp_gad_pr':               { 'id': 'wp_gad_pr',               'x': 374, 'y': 810 },
  'wp_entrance':             { 'id': 'wp_entrance',             'x': 374, 'y': 861 },

  # Outdoor Roadway Loop
  'wp_outdoor_north_drive':     { 'id': 'wp_outdoor_north_drive',     'x': 376, 'y': 50 },
  'wp_outdoor_north_corner':    { 'id': 'wp_outdoor_north_corner',    'x': 570, 'y': 50 },
  'wp_outdoor_ne_bend1':        { 'id': 'wp_outdoor_ne_bend1',        'x': 615, 'y': 90 },
  'wp_outdoor_ne_bend2':        { 'id': 'wp_outdoor_ne_bend2',        'x': 645, 'y': 120 },
  'wp_outdoor_east_edge_upper': { 'id': 'wp_outdoor_east_edge_upper', 'x': 645, 'y': 230 },
  'wp_outdoor_east_mid':        { 'id': 'wp_outdoor_east_mid',        'x': 645, 'y': 380 },
  'wp_outdoor_east_lower':      { 'id': 'wp_outdoor_east_lower',      'x': 645, 'y': 508 },
  'wp_outdoor_east_se_junc':    { 'id': 'wp_outdoor_east_se_junc',    'x': 645, 'y': 636 },
  'wp_outdoor_se_corner':       { 'id': 'wp_outdoor_se_corner',       'x': 645, 'y': 861 },
  'wp_outdoor_s004a_east':      { 'id': 'wp_outdoor_s004a_east',      'x': 530, 'y': 636 },
  'wp_outdoor_breezeway_east':  { 'id': 'wp_outdoor_breezeway_east',  'x': 464, 'y': 636 },
  'wp_outdoor_south_east':      { 'id': 'wp_outdoor_south_east',      'x': 460, 'y': 861 },
  'wp_outdoor_south_west':      { 'id': 'wp_outdoor_south_west',      'x': 250, 'y': 861 },
  'wp_outdoor_sw_corner':       { 'id': 'wp_outdoor_sw_corner',       'x': 76,  'y': 861 },
  'wp_outdoor_west_amri':       { 'id': 'wp_outdoor_west_amri',       'x': 76,  'y': 676 },
  'wp_outdoor_west_breezeway':  { 'id': 'wp_outdoor_west_breezeway',  'x': 232, 'y': 600 },
  'wp_outdoor_amri_top':        { 'id': 'wp_outdoor_amri_top',        'x': 220, 'y': 574 },
  'wp_outdoor_sw_cross_junc':   { 'id': 'wp_outdoor_sw_cross_junc',   'x': 76,  'y': 508 },
  'wp_outdoor_mid_west_bend1':  { 'id': 'wp_outdoor_mid_west_bend1',  'x': 76,  'y': 440 },
  'wp_outdoor_mid_west_bend2':  { 'id': 'wp_outdoor_mid_west_bend2',  'x': 121, 'y': 398 }
}

HALLWAY_EDGES = [
  # West Spine Veranda Corridor (along N-Block rooms)
  ('wp_west_spine_top', 'wp_west_machines', 'indoor'),
  ('wp_west_machines', 'wp_west_upper_branch', 'indoor'),
  ('wp_west_upper_branch', 'wp_west_math', 'indoor'),
  ('wp_west_math', 'wp_west_mid_bridge', 'indoor'),
  ('wp_west_mid_bridge', 'wp_west_prin', 'indoor'),
  ('wp_west_prin', 'wp_west_hr', 'indoor'),
  ('wp_west_hr', 'wp_west_affairs', 'indoor'),
  ('wp_west_affairs', 'wp_west_staff', 'indoor'),
  ('wp_west_staff', 'wp_west_lower_bridge', 'indoor'),
  ('wp_west_lower_bridge', 'wp_west_cir', 'indoor'),
  ('wp_west_cir', 'wp_west_mech', 'indoor'),
  ('wp_west_mech', 'wp_west_admis', 'indoor'),
  ('wp_west_admis', 'wp_west_south_junc', 'indoor'),

  # East Spine Veranda Corridor (along S-Block rooms)
  ('wp_east_spine_top', 'wp_east_computer', 'indoor'),
  ('wp_east_computer', 'wp_east_upper_branch', 'indoor'),
  ('wp_east_upper_branch', 'wp_east_admin', 'indoor'),
  ('wp_east_admin', 'wp_east_mid_bridge', 'indoor'),
  ('wp_east_mid_bridge', 'wp_east_conf', 'indoor'),
  ('wp_east_conf', 'wp_east_s009', 'indoor'),
  ('wp_east_s009', 'wp_east_arts_prin', 'indoor'),
  ('wp_east_arts_prin', 'wp_east_director', 'indoor'),
  ('wp_east_director', 'wp_east_staff', 'indoor'),
  ('wp_east_staff', 'wp_east_lower_bridge', 'indoor'),
  ('wp_east_lower_bridge', 'wp_east_kitchen', 'indoor'),
  ('wp_east_kitchen', 'wp_east_serve', 'indoor'),
  ('wp_east_serve', 'wp_east_guest', 'indoor'),
  ('wp_east_guest', 'wp_east_south_junc', 'indoor'),

  # Cross Bridges Across Courtyard
  ('wp_west_spine_top', 'wp_east_spine_top', 'indoor'),
  ('wp_north_exit_hub', 'wp_west_spine_top', 'indoor'),
  ('wp_north_exit_hub', 'wp_east_spine_top', 'indoor'),
  ('wp_north_exit_hub', 'wp_north_exit_steps', 'outdoor'),
  ('wp_west_mid_bridge', 'wp_east_mid_bridge', 'indoor'),

  # Upper West Wing Branch
  ('wp_west_upper_branch', 'wp_nw_cross_upper', 'indoor'),
  ('wp_nw_cross_upper', 'wp_nw_corridor_top', 'indoor'),
  ('wp_nw_corridor_top', 'wp_nw_toilet_door', 'indoor'),
  ('wp_nw_corridor_top', 'wp_nw_lab_dynamics', 'indoor'),
  ('wp_nw_lab_dynamics', 'wp_nw_lab_cae', 'indoor'),
  ('wp_nw_lab_cae', 'wp_nw_lab_corridor_mid', 'indoor'),
  ('wp_west_mid_bridge', 'wp_nw_cross_mid', 'indoor'),
  ('wp_nw_cross_mid', 'wp_nw_lab_corridor_mid', 'indoor'),
  ('wp_nw_lab_corridor_mid', 'wp_nw_lab_fluid', 'indoor'),
  ('wp_nw_lab_fluid', 'wp_nw_lab_metallurgy', 'indoor'),

  # Lower West Wing Branch
  ('wp_west_lower_bridge', 'wp_sw_cross', 'indoor'),
  ('wp_sw_cross', 'wp_sw_corridor_hub', 'indoor'),
  ('wp_sw_corridor_hub', 'wp_sw_north_east', 'indoor'),
  ('wp_sw_north_east', 'wp_sw_nano9', 'indoor'),
  ('wp_sw_nano9', 'wp_sw_mtech8', 'indoor'),
  ('wp_sw_mtech8', 'wp_sw_thermal7', 'indoor'),
  ('wp_sw_thermal7', 'wp_sw_north_west', 'indoor'),
  ('wp_sw_north_west', 'wp_sw_toilet_vest', 'indoor'),
  ('wp_sw_corridor_hub', 'wp_sw_south_east', 'indoor'),
  ('wp_sw_south_east', 'wp_sw_nano4', 'indoor'),
  ('wp_sw_nano4', 'wp_sw_solar5', 'indoor'),
  ('wp_sw_solar5', 'wp_sw_south_west', 'indoor'),
  ('wp_sw_south_west', 'wp_sw_toilet_vest', 'indoor'),
  ('wp_sw_toilet_vest', 'wp_sw_toilet_lower', 'indoor'),

  # Upper East Wing Branch
  ('wp_east_upper_branch', 'wp_ne_cross_upper', 'indoor'),
  ('wp_ne_cross_upper', 'wp_ne_corridor_top', 'indoor'),
  ('wp_ne_corridor_top', 'wp_ne_toilet_door', 'indoor'),
  ('wp_ne_corridor_top', 'wp_ne_windtunnel', 'indoor'),
  ('wp_ne_windtunnel', 'wp_ne_corridor_hub', 'indoor'),
  ('wp_east_mid_bridge', 'wp_ne_cross_mid', 'indoor'),
  ('wp_ne_cross_mid', 'wp_ne_corridor_hub', 'indoor'),
  ('wp_ne_corridor_hub', 'wp_ne_robotics', 'indoor'),
  ('wp_ne_robotics', 'wp_ne_workshop', 'indoor'),
  ('wp_ne_workshop', 'wp_se_toilet_mid', 'indoor'),
  ('wp_se_toilet_mid', 'wp_se_materials', 'indoor'),

  # Lower East Wing Branch
  ('wp_east_lower_bridge', 'wp_se_cross', 'indoor'),
  ('wp_se_cross', 'wp_se_corridor_hub', 'indoor'),
  ('wp_se_corridor_hub', 'wp_se_materials', 'indoor'),
  ('wp_se_corridor_hub', 'wp_se_mfg', 'indoor'),
  ('wp_se_mfg', 'wp_se_faculty_s004', 'indoor'),
  ('wp_se_faculty_s004', 'wp_se_research_cell', 'indoor'),

  # South Lobby & Admin Transverse Corridor (Y = 696)
  ('wp_admin_west_end', 'wp_admin_white_path', 'indoor'),
  ('wp_admin_white_path', 'wp_admin_wc_boys', 'indoor'),
  ('wp_admin_west_end', 'wp_admin_wc_boys', 'indoor'),
  ('wp_admin_wc_boys', 'wp_admin_west_st', 'indoor'),
  ('wp_admin_west_st', 'wp_admin_a005', 'indoor'),
  ('wp_admin_a005', 'wp_admin_a004', 'indoor'),
  ('wp_admin_a004', 'wp_west_south_junc', 'indoor'),
  ('wp_west_south_junc', 'wp_admin_cross', 'indoor'),
  ('wp_admin_cross', 'wp_east_south_junc', 'indoor'),
  ('wp_east_south_junc', 'wp_admin_a003', 'indoor'),
  ('wp_admin_a003', 'wp_admin_a002', 'indoor'),
  ('wp_admin_a002', 'wp_admin_east_st', 'indoor'),
  ('wp_admin_east_st', 'wp_admin_wc_girls', 'indoor'),
  ('wp_admin_wc_girls', 'wp_admin_east_end', 'indoor'),
  ('wp_admin_cross', 'wp_gad_pr', 'indoor'),
  ('wp_gad_pr', 'wp_entrance', 'indoor'),

  # White line pathway connection:
  ('wp_admin_white_path', 'wp_outdoor_west_breezeway', 'indoor'),

  # Outdoor Roadway Loop
  ('wp_north_exit_hub', 'wp_outdoor_north_drive', 'outdoor'),
  ('wp_outdoor_north_drive', 'wp_outdoor_north_corner', 'outdoor'),
  ('wp_outdoor_north_corner', 'wp_outdoor_ne_bend1', 'outdoor'),
  ('wp_outdoor_ne_bend1', 'wp_outdoor_ne_bend2', 'outdoor'),
  ('wp_outdoor_ne_bend2', 'wp_outdoor_east_edge_upper', 'outdoor'),
  ('wp_outdoor_east_edge_upper', 'wp_outdoor_east_mid', 'outdoor'),
  ('wp_outdoor_east_mid', 'wp_outdoor_east_lower', 'outdoor'),
  ('wp_outdoor_east_lower', 'wp_outdoor_east_se_junc', 'outdoor'),
  ('wp_outdoor_east_se_junc', 'wp_outdoor_s004a_east', 'outdoor'),
  ('wp_outdoor_s004a_east', 'wp_outdoor_breezeway_east', 'outdoor'),
  ('wp_outdoor_breezeway_east', 'wp_east_south_junc', 'outdoor'),
  ('wp_outdoor_east_se_junc', 'wp_outdoor_se_corner', 'outdoor'),
  ('wp_outdoor_se_corner', 'wp_outdoor_south_east', 'outdoor'),
  ('wp_outdoor_south_east', 'wp_entrance', 'outdoor'),
  ('wp_entrance', 'wp_outdoor_south_west', 'outdoor'),
  ('wp_outdoor_south_west', 'wp_outdoor_sw_corner', 'outdoor'),
  ('wp_outdoor_sw_corner', 'wp_outdoor_west_amri', 'outdoor'),
  ('wp_outdoor_west_amri', 'wp_outdoor_west_breezeway', 'outdoor'),
  ('wp_outdoor_west_breezeway', 'wp_outdoor_amri_top', 'outdoor'),
  ('wp_outdoor_amri_top', 'wp_west_south_junc', 'outdoor'),
  ('wp_outdoor_west_amri', 'wp_outdoor_sw_cross_junc', 'outdoor'),
  ('wp_outdoor_sw_cross_junc', 'wp_outdoor_mid_west_bend1', 'outdoor'),
  ('wp_outdoor_mid_west_bend1', 'wp_outdoor_mid_west_bend2', 'outdoor'),
  ('wp_outdoor_mid_west_bend2', 'wp_nw_lab_metallurgy', 'outdoor'),
  ('wp_outdoor_sw_cross_junc', 'wp_sw_toilet_lower', 'outdoor')
]

# 51 Ground Floor Rooms
ROOMS_DATA = [
  # Admin Block (10 rooms)
  { 'id': 'GAD-PR', 'code': 'GAD', 'name': 'GAD - PR Office', 'door': [374, 810] },
  { 'id': 'PRAYER-HALL-A', 'code': 'PRY-A', 'name': 'Central Prayer & Admin Hall', 'door': [374, 708] },
  { 'id': 'A-004', 'code': 'A-004', 'name': 'Executive Office A-004', 'door': [313, 708] },
  { 'id': 'A-005', 'code': 'A-005', 'name': 'Special Programs / Meditation', 'door': [281, 708] },
  { 'id': 'A-006', 'code': 'A-006', 'name': 'Amritheswari Hall', 'door': [224, 696] },
  { 'id': 'TOILET-BOYS-ADMIN', 'code': 'WC-ADM1', 'name': 'Boys Restroom (Admin / A-006)', 'door': [243, 708] },
  { 'id': 'A-003', 'code': 'A-003', 'name': 'Admin Suite A-003', 'door': [435, 708] },
  { 'id': 'A-002', 'code': 'A-002', 'name': 'ENGM Conference Hall', 'door': [466, 708] },
  { 'id': 'TOILET-GIRLS-ADMIN', 'code': 'WC-ADM2', 'name': 'Girls Restroom (Admin / A-001)', 'door': [504, 708] },
  { 'id': 'A-001', 'code': 'A-001', 'name': 'Acharya Hall', 'door': [526, 696] },

  # Northern Wing Spine (10 rooms)
  { 'id': 'N-001', 'code': 'N-001', 'name': 'Admission Office', 'door': [346, 608] },
  { 'id': 'N-002', 'code': 'N-002', 'name': 'Mech. Professors Room', 'door': [346, 574] },
  { 'id': 'N-003', 'code': 'N-003', 'name': 'CIR Seminar Room', 'door': [346, 544] },
  { 'id': 'N-010', 'code': 'N-010', 'name': 'Staff Room (Mech)', 'door': [346, 484] },
  { 'id': 'N-011', 'code': 'N-011', 'name': 'Student Affairs Office', 'door': [346, 433] },
  { 'id': 'N-012', 'code': 'N-012', 'name': 'Human Resources (HR) Dept', 'door': [346, 398] },
  { 'id': 'N-013', 'code': 'N-013', 'name': 'Principal (Engineering)', 'door': [346, 366] },
  { 'id': 'N-018', 'code': 'N-018', 'name': 'Dept of Mathematics (108)', 'door': [346, 300] },
  { 'id': 'N-019', 'code': 'N-019', 'name': 'Electrical Machines Lab', 'door': [346, 226] },
  { 'id': 'N-020', 'code': 'N-020', 'name': 'Northern Prayer Hall', 'door': [346, 170] },

  # Northern Wing Outer (11 rooms)
  { 'id': 'TOILET-N-UPPER', 'code': 'WC-N2', 'name': 'Gents Restroom (NW-Upper)', 'door': [216, 271] },
  { 'id': 'N-017', 'code': 'N-017', 'name': 'Machine Dynamics Lab', 'door': [216, 302] },
  { 'id': 'N-016', 'code': 'N-016', 'name': 'CAE Simulation Cell', 'door': [216, 330] },
  { 'id': 'N-015', 'code': 'N-015', 'name': 'Fluid Mechanics Lab', 'door': [216, 364] },
  { 'id': 'N-014', 'code': 'N-014', 'name': 'Metallurgy Lab', 'door': [216, 398] },
  { 'id': 'N-007', 'code': 'N-007', 'name': 'Thermal Engineering Lab', 'door': [176, 492] },
  { 'id': 'N-008', 'code': 'N-008', 'name': 'M.Tech Fluid Lab', 'door': [228, 492] },
  { 'id': 'N-009', 'code': 'N-009', 'name': 'Nano Center (Lab 009)', 'door': [252, 492] },
  { 'id': 'TOILET-N-LOWER', 'code': 'WC-N1', 'name': 'Gents Restroom (NW-Lower)', 'door': [130, 508] },
  { 'id': 'N-005-006', 'code': 'N-005', 'name': 'Nano Sciences (Solar Lab)', 'door': [176, 526] },
  { 'id': 'N-004', 'code': 'N-004', 'name': 'Nano Center Research Lab', 'door': [236, 526] },

  # Southern Wing Spine (11 rooms)
  { 'id': 'S-014', 'code': 'S-014', 'name': 'Dept of Chemistry (101)', 'door': [405, 170] },
  { 'id': 'S-013', 'code': 'S-013', 'name': 'Central Computer Lab', 'door': [405, 230] },
  { 'id': 'S-012', 'code': 'S-012', 'name': 'College Administration Office', 'door': [405, 300] },
  { 'id': 'S-010', 'code': 'S-010', 'name': 'South Conference Room', 'door': [405, 357] },
  { 'id': 'S-009', 'code': 'S-009', 'name': 'Faculty Room S-009', 'door': [405, 375] },
  { 'id': 'S-008', 'code': 'S-008', 'name': 'Principal (Arts & Sciences)', 'door': [405, 398] },
  { 'id': 'S-007', 'code': 'S-007', 'name': 'Director & Assoc. Dean', 'door': [405, 433] },
  { 'id': 'S-006', 'code': 'S-006', 'name': 'Staff Room (ECE & EEE)', 'door': [405, 484] },
  { 'id': 'S-003', 'code': 'S-003', 'name': 'Guest Room Kitchen', 'door': [405, 544] },
  { 'id': 'S-002', 'code': 'S-002', 'name': 'Amrita SeRVe & Humanities', 'door': [405, 574] },
  { 'id': 'S-001', 'code': 'S-001', 'name': 'University Guest Room', 'door': [405, 608] },

  # Southern Wing Outer (9 rooms)
  { 'id': 'TOILET-S-UPPER', 'code': 'WC-S2', 'name': 'Ladies Restroom (NE)', 'door': [532, 282] },
  { 'id': 'S-011B', 'code': 'S-011B', 'name': 'Wind Tunnel Facility', 'door': [528, 320] },
  { 'id': 'S-011', 'code': 'S-011', 'name': 'CNC Robotics Lab', 'door': [528, 356] },
  { 'id': 'S-011A', 'code': 'S-011A', 'name': 'Mechanical Workshop', 'door': [528, 386] },
  { 'id': 'TOILET-S-STAFF', 'code': 'WC-S1', 'name': 'Staff & Ladies Restroom', 'door': [528, 420] },
  { 'id': 'S-005', 'code': 'S-005', 'name': 'Materials Lab Testing Bay', 'door': [528, 460] },
  { 'id': 'S-MFG', 'code': 'S-MFG', 'name': 'Manufacturing Lab', 'door': [528, 506] },
  { 'id': 'S-004', 'code': 'S-004', 'name': 'Faculty Room S-004', 'door': [528, 547] },
  { 'id': 'S-004A', 'code': 'S-004A', 'name': 'Research Cell S-004A', 'door': [528, 567] }
]

def build_graph():
    graph = {k: [] for k in WAYPOINTS}
    for u, v, typ in HALLWAY_EDGES:
        p1 = WAYPOINTS[u]
        p2 = WAYPOINTS[v]
        d = math.hypot(p1['x'] - p2['x'], p1['y'] - p2['y']) * 0.4
        cost = d * 2.5 if typ == 'outdoor' else d
        graph[u].append((v, cost, typ))
        graph[v].append((u, cost, typ))

    # Link doors
    for room in ROOMS_DATA:
        did = 'door_' + room['id']
        dx, dy = room['door']
        graph[did] = []
        best_wp = None
        min_d = float('inf')
        for wid, wp in WAYPOINTS.items():
            if wid.startswith('wp_outdoor') or wid.startswith('door_'):
                continue
            dist = math.hypot(dx - wp['x'], dy - wp['y'])
            if dist < min_d:
                min_d = dist
                best_wp = wid
        cost = min_d * 0.4
        graph[did].append((best_wp, cost, 'indoor'))
        graph[best_wp].append((did, cost, 'indoor'))
    return graph

def dijkstra(graph, start_id, end_id):
    import heapq
    q = [(0, start_id, [])]
    visited = set()
    while q:
        cost, cur, path = heapq.heappop(q)
        if cur in visited:
            continue
        visited.add(cur)
        path = path + [cur]
        if cur == end_id:
            return cost, path
        for nxt, weight, typ in graph.get(cur, []):
            if nxt not in visited:
                heapq.heappush(q, (cost + weight, nxt, path))
    return None, None

g = build_graph()
print(f'Total rooms: {len(ROOMS_DATA)}')

total_pairs = 0
failed_pairs = 0
outdoor_leaks = 0

for i in range(len(ROOMS_DATA)):
    for j in range(i + 1, len(ROOMS_DATA)):
        r1 = ROOMS_DATA[i]
        r2 = ROOMS_DATA[j]
        total_pairs += 1
        cost, path = dijkstra(g, 'door_' + r1['id'], 'door_' + r2['id'])
        if path is None:
            failed_pairs += 1
            print(f'FAILED: {r1["code"]} -> {r2["code"]}')
        else:
            has_outdoor = any('outdoor' in node for node in path)
            if has_outdoor:
                outdoor_leaks += 1
                print(f'OUTDOOR LEAK: {r1["code"]} -> {r2["code"]} uses outdoor!')

print(f'Tested {total_pairs} pairs.')
print(f'Failed pairs: {failed_pairs}')
print(f'Outdoor leaks: {outdoor_leaks}')
if failed_pairs == 0 and outdoor_leaks == 0:
    print('SUCCESS! 100% reachable with STRICTLY INDOOR paths for all 1,275 pairs!')
