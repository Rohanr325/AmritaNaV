const fs = require('fs');

// 1. Updated ROOMS_DATA with 51 rooms (5 removed, margins aligned to x=168 and x=580)
const ROOMS_DATA = [
  // ---------- ADMIN BLOCK (A) - BOTTOM SECTION ----------
  { id: 'RECEPTION', code: 'REC', name: 'Reception & Telephone', wing: 'Admin Block (A)', category: 'FACILITY', x: 340, y: 728, w: 66, h: 26, door: [375, 728], desc: 'Main reception desk, visitor badges, security check-in and telephone operator services.' },
  { id: 'GAD-PR', code: 'GAD', name: 'GAD - PR Office', wing: 'Admin Block (A)', category: 'OFFICE', x: 334, y: 754, w: 78, h: 36, door: [375, 754], desc: 'General Administration Department & Public Relations Liaison Office at the main entrance porch.' },
  { id: 'ADMIN-A', code: 'ADM-01', name: 'Admin Block Central Office', wing: 'Admin Block (A)', category: 'OFFICE', x: 340, y: 694, w: 66, h: 34, door: [375, 694], desc: 'Ground Floor Administrative Registry and University Central Enquiries.' },
  { id: 'PRAYER-HALL-A', code: 'PRY-A', name: 'Central Prayer Hall', wing: 'Admin Block (A)', category: 'ROOM', x: 340, y: 654, w: 66, h: 40, door: [375, 674], desc: 'Central prayer, contemplation and reflection sanctuary at the heart of the ground floor.' },
  { id: 'A-004', code: 'A-004', name: 'Executive Office A-004', wing: 'Admin Block (A)', category: 'OFFICE', x: 314, y: 684, w: 26, h: 44, door: [327, 684], desc: 'Administrative Liaison and records archive.' },
  { id: 'A-005', code: 'A-005', name: 'Special Programs / Meditation', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 276, y: 684, w: 38, h: 44, door: [295, 684], desc: 'Dedicated serene hall for IAM Meditation, yoga sessions, and discourses.' },
  { id: 'A-006', code: 'A-006', name: 'Amritheswari Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 168, y: 588, w: 54, h: 96, door: [222, 674], desc: 'Grand University Cultural Auditorium with stage lighting and 600+ seating capacity.' },
  { id: 'A-003', code: 'A-003', name: 'Admin Suite A-003', wing: 'Admin Block (A)', category: 'OFFICE', x: 406, y: 684, w: 26, h: 44, door: [419, 684], desc: 'Administrative advisory and conference chamber.' },
  { id: 'A-002', code: 'A-002', name: 'ENGM Conference Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 432, y: 684, w: 36, h: 44, door: [450, 684], desc: 'Corporate boardroom and executive seminar conference suite.' },
  { id: 'A-001', code: 'A-001', name: 'Acharya Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 526, y: 588, w: 54, h: 96, door: [526, 674], desc: 'Premier University Auditorium with 500+ seating capacity for convocations and symposiums.' },

  // ---------- NORTHERN WING (N) - CENTRAL SPINE ----------
  { id: 'N-001', code: 'N-001', name: 'Admission Office', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 590, w: 40, h: 36, door: [346, 608], desc: 'University Admissions, application processing, counseling, and enrollment helpdesk.' },
  { id: 'N-002', code: 'N-002', name: 'Mech. Professors Room', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 560, w: 40, h: 28, door: [346, 574], desc: 'Senior Faculty Cabins for Department of Mechanical Engineering.' },
  { id: 'N-003', code: 'N-003', name: 'CIR Seminar Room', wing: 'Northern Wing (N)', category: 'ROOM', x: 306, y: 530, w: 40, h: 28, door: [346, 544], desc: 'Corporate and Industry Relations (CIR) training & interview suite.' },
  { id: 'N-010', code: 'N-010', name: 'Staff Room (Mech)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 462, w: 40, h: 44, door: [346, 484], desc: 'Mechanical Engineering Department Faculty and Academic Staff room.' },
  { id: 'N-011', code: 'N-011', name: 'Student Affairs Office', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 414, w: 40, h: 38, door: [346, 433], desc: 'Office of Student Welfare, student club activities and campus life coordination.' },
  { id: 'N-012', code: 'N-012', name: 'Human Resources (HR) Dept', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 382, w: 40, h: 32, door: [346, 398], desc: 'University Human Resources & Staff Administration.' },
  { id: 'N-013', code: 'N-013', name: 'Principal (Engineering)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 350, w: 40, h: 32, door: [346, 366], desc: 'Executive Office of the Principal, School of Engineering.' },
  { id: 'N-018', code: 'N-018', name: 'Dept of Mathematics (108)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 304, y: 274, w: 42, h: 52, door: [346, 300], desc: 'Mathematics Faculty department, research cubicles and consultation rooms.' },
  { id: 'N-019', code: 'N-019', name: 'Electrical Machines Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 304, y: 184, w: 42, h: 84, door: [346, 226], desc: 'High-voltage electric motors, generators, transformers, and power dynamics research station.' },
  { id: 'N-020', code: 'N-020', name: 'Northern Prayer Hall', wing: 'Northern Wing (N)', category: 'ROOM', x: 304, y: 156, w: 42, h: 28, door: [346, 170], desc: 'North Wing prayer hall and quiet contemplation space.' },

  // ---------- NORTHERN WING (N) - OUTER LABS & TOILETS (Aligned to left margin x=168) ----------
  { id: 'TOILET-N-UPPER', code: 'WC-N2', name: 'Gents Restroom (NW-Upper)', wing: 'Northern Wing (N)', category: 'TOILET', x: 168, y: 260, w: 48, h: 26, door: [216, 271], desc: 'Upper Gents washroom with cubicles and washbasins.' },
  { id: 'N-017', code: 'N-017', name: 'Machine Dynamics Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 286, w: 48, h: 32, door: [216, 302], desc: 'Kinematics, vibration analysis, whirling of shafts, and balancing equipment.' },
  { id: 'N-016', code: 'N-016', name: 'CAE Simulation Cell', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 318, w: 48, h: 24, door: [216, 330], desc: 'Computer-Aided Engineering simulation workstations (Ansys, SolidWorks, FEA).' },
  { id: 'N-015', code: 'N-015', name: 'Fluid Mechanics Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 342, w: 48, h: 44, door: [216, 364], desc: 'Hydraulic flumes, flow meters, Bernoulli apparatus, and pipe friction rigs.' },
  { id: 'N-014', code: 'N-014', name: 'Metallurgy Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 386, w: 48, h: 24, door: [216, 398], desc: 'Specimen polishing, metallographic microscope analysis, and heat treatment furnace.' },
  { id: 'TOILET-N-LOWER', code: 'WC-N1', name: 'Gents Restroom (NW-Lower)', wing: 'Northern Wing (N)', category: 'TOILET', x: 168, y: 448, w: 38, h: 44, door: [206, 492], desc: 'Gents washrooms and drinking water point.' },
  { id: 'N-007', code: 'N-007', name: 'Thermal Engineering Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 208, y: 448, w: 44, h: 44, door: [230, 492], desc: 'Thermodynamics test benches, heat exchangers, refrigeration cycles and engines.' },
  { id: 'N-008', code: 'N-008', name: 'M.Tech Fluid Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 254, y: 448, w: 26, h: 44, door: [267, 492], desc: 'Advanced postgraduate fluid mechanics and CFD boundary flow testing facility.' },
  { id: 'N-009', code: 'N-009', name: 'Nano Center (Lab 009)', wing: 'Northern Wing (N)', category: 'LAB', x: 282, y: 448, w: 24, h: 44, door: [294, 492], desc: 'Nanomaterial device fabrication and clean room testing.' },
  { id: 'N-005-006', code: 'N-005', name: 'Nano Sciences (Solar Lab)', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 524, w: 76, h: 46, door: [206, 524], desc: 'Storage Integrated Solar Module Research Laboratory & Clean Energy Systems.' },
  { id: 'N-004', code: 'N-004', name: 'Amrita Center for Nano Sciences', wing: 'Northern Wing (N)', category: 'LAB', x: 246, y: 524, w: 60, h: 46, door: [276, 524], desc: 'Advanced Nanotechnology materials synthesis and molecular characterization.' },

  // ---------- SOUTHERN WING (S) - CENTRAL SPINE ----------
  { id: 'S-014', code: 'S-014', name: 'Nanotechnology Research Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 405, y: 156, w: 45, h: 36, door: [405, 174], desc: 'Advanced nanotech characterization and microfluidics research facility.' },
  { id: 'S-013', code: 'S-013', name: 'Central Computer Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 405, y: 192, w: 45, h: 76, door: [405, 230], desc: 'Flagship high-performance computing laboratory, gigabit network and AI workstations.' },
  { id: 'S-012', code: 'S-012', name: 'College Administration Office', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 274, w: 40, h: 52, door: [405, 300], desc: 'Academic registrar, fee payments, certificate issuance, and helpdesk.' },
  { id: 'S-010', code: 'S-010', name: 'South Conference Room', wing: 'Southern Wing (S)', category: 'ROOM', x: 405, y: 346, w: 40, h: 22, door: [405, 357], desc: 'Departmental meeting and presentation conference hall.' },
  { id: 'S-009', code: 'S-009', name: 'Faculty Room S-009', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 368, w: 40, h: 14, door: [405, 375], desc: 'Academic faculty rooms and consultation cabins.' },
  { id: 'S-008', code: 'S-008', name: 'Principal (Arts & Sciences)', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 382, w: 40, h: 32, door: [405, 398], desc: 'Executive Office of Principal, School of Arts & Sciences.' },
  { id: 'S-007', code: 'S-007', name: 'Director & Assoc. Dean', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 414, w: 40, h: 38, door: [405, 433], desc: 'Executive Suite of Campus Director and Associate Dean of Academic Affairs.' },
  { id: 'S-006', code: 'S-006', name: 'Staff Room (ECE & EEE)', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 462, w: 40, h: 44, door: [405, 484], desc: 'Faculty Cabins for Department of Electrical & Electronics Engineering.' },
  { id: 'S-003', code: 'S-003', name: 'Guest Room Kitchen', wing: 'Southern Wing (S)', category: 'FACILITY', x: 405, y: 530, w: 40, h: 28, door: [405, 544], desc: 'Executive hospitality pantry and dining kitchen for university guests.' },
  { id: 'S-002', code: 'S-002', name: 'Amrita SeRVe & Humanities', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 560, w: 40, h: 28, door: [405, 574], desc: 'Amrita SeRVe (Village Development) & Humanities Faculty.' },
  { id: 'S-001', code: 'S-001', name: 'University Guest Room', wing: 'Southern Wing (S)', category: 'ROOM', x: 405, y: 590, w: 40, h: 36, door: [405, 608], desc: 'Visiting dignitary and VIP accommodation room.' },

  // ---------- SOUTHERN WING (S) - OUTER LABS & WORKSHOPS (Aligned to right margin x=580) ----------
  { id: 'TOILET-S-UPPER', code: 'WC-S2', name: 'Ladies Restroom (NE)', wing: 'Southern Wing (S)', category: 'TOILET', x: 532, y: 270, w: 48, h: 24, door: [532, 282], desc: 'Ladies washrooms and rest chambers in the northeast wing.' },
  { id: 'S-011B', code: 'S-011B', name: 'Wind Tunnel Facility', wing: 'Southern Wing (S)', category: 'LAB', x: 528, y: 296, w: 52, h: 46, door: [528, 320], desc: 'Subsonic aerodynamic wind tunnel, airfoil lift/drag sensors, and wind testing.' },
  { id: 'S-011', code: 'S-011', name: 'CNC Robotics Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 528, y: 344, w: 52, h: 24, door: [528, 356], desc: 'Industrial robotic arms, automated 3-axis CNC machining, and automation rigs.' },
  { id: 'S-011A', code: 'S-011A', name: 'Mechanical Workshop', wing: 'Southern Wing (S)', category: 'LAB', x: 528, y: 370, w: 52, h: 36, door: [528, 386], desc: 'Fitting, carpentry, sheet metal and foundry training workshop.' },
  { id: 'TOILET-S-STAFF', code: 'WC-S1', name: 'Staff & Ladies Restroom', wing: 'Southern Wing (S)', category: 'TOILET', x: 528, y: 408, w: 52, h: 26, door: [528, 420], desc: 'Staff restrooms and sanitary facilities.' },
  { id: 'S-005', code: 'S-005', name: 'Materials Lab Testing Bay', wing: 'Southern Wing (S)', category: 'LAB', x: 528, y: 448, w: 52, h: 24, door: [528, 460], desc: 'Specimen preparation and hardness testing station.' },
  { id: 'S-MFG', code: 'S-MFG', name: 'Manufacturing Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 528, y: 474, w: 52, h: 62, door: [528, 506], desc: 'Lathes, milling machines, shaper machines, welding, and advanced tooling stations.' },
  { id: 'S-004', code: 'S-004', name: 'Faculty Room S-004', wing: 'Southern Wing (S)', category: 'OFFICE', x: 528, y: 538, w: 52, h: 18, door: [528, 547], desc: 'Engineering faculty discussion and consultation office.' },
  { id: 'S-004A', code: 'S-004A', name: 'Research Cell S-004A', wing: 'Southern Wing (S)', category: 'LAB', x: 528, y: 558, w: 52, h: 18, door: [528, 567], desc: 'Special projects research cell and technical incubation hub.' }
];

console.log('Total rooms:', ROOMS_DATA.length);
if (ROOMS_DATA.length !== 51) throw new Error('Expected 51 rooms');

// 2. Updated WAYPOINTS
const WAYPOINTS = {
  // 1. North Building Exit
  'wp_north_exit_hub':      { id: 'wp_north_exit_hub',      x: 376, y: 147, label: 'North Building Exit / Stair Landing' },

  // 2. West Circulation Veranda Corridor (along N-Block rooms, X = 350)
  'wp_west_spine_top':     { id: 'wp_west_spine_top',     x: 350, y: 170, label: 'North West Corridor Hub (N-020)' },
  'wp_west_machines':      { id: 'wp_west_machines',      x: 350, y: 226, label: 'West Corridor (N-019 Machines Lab)' },
  'wp_west_upper_branch':  { id: 'wp_west_upper_branch',  x: 350, y: 271, label: 'West Corridor (NW Toilet Branch)' },
  'wp_west_math':          { id: 'wp_west_math',          x: 350, y: 300, label: 'West Corridor (N-018 Math Dept)' },
  'wp_west_mid_bridge':    { id: 'wp_west_mid_bridge',    x: 350, y: 345, label: 'West Corridor Mid Cross-Bridge Hub' },
  'wp_west_prin':          { id: 'wp_west_prin',          x: 350, y: 366, label: 'West Corridor (N-013 Principal Engg)' },
  'wp_west_hr':            { id: 'wp_west_hr',            x: 350, y: 398, label: 'West Corridor (N-012 HR Dept)' },
  'wp_west_affairs':       { id: 'wp_west_affairs',       x: 350, y: 433, label: 'West Corridor (N-011 Student Affairs)' },
  'wp_west_staff':         { id: 'wp_west_staff',         x: 350, y: 484, label: 'West Corridor (N-010 Staff Mech)' },
  'wp_west_lower_bridge':  { id: 'wp_west_lower_bridge',  x: 350, y: 508, label: 'West Corridor Lower Cross-Bridge Hub' },
  'wp_west_cir':           { id: 'wp_west_cir',           x: 350, y: 544, label: 'West Corridor (N-003 CIR Seminar)' },
  'wp_west_mech':          { id: 'wp_west_mech',          x: 350, y: 574, label: 'West Corridor (N-002 Mech Prof)' },
  'wp_west_admis':         { id: 'wp_west_admis',         x: 350, y: 608, label: 'West Corridor (N-001 Admission Office)' },
  'wp_west_south_junc':    { id: 'wp_west_south_junc',    x: 350, y: 674, label: 'West Veranda South Junction (PRY-A West / A-004)' },

  // 3. East Circulation Veranda Corridor (along S-Block rooms, X = 404)
  'wp_east_spine_top':     { id: 'wp_east_spine_top',     x: 404, y: 170, label: 'North East Corridor Hub (S-014)' },
  'wp_east_computer':      { id: 'wp_east_computer',      x: 404, y: 226, label: 'East Corridor (S-013 Computer Lab)' },
  'wp_east_upper_branch':  { id: 'wp_east_upper_branch',  x: 404, y: 271, label: 'East Corridor (NE Toilet Branch)' },
  'wp_east_admin':         { id: 'wp_east_admin',         x: 404, y: 300, label: 'East Corridor (S-012 College Admin)' },
  'wp_east_mid_bridge':    { id: 'wp_east_mid_bridge',    x: 404, y: 345, label: 'East Corridor Mid Cross-Bridge Hub' },
  'wp_east_conf':          { id: 'wp_east_conf',          x: 404, y: 357, label: 'East Corridor (S-010 Conference Room)' },
  'wp_east_s009':          { id: 'wp_east_s009',          x: 404, y: 375, label: 'East Corridor (S-009 Faculty Room)' },
  'wp_east_arts_prin':     { id: 'wp_east_arts_prin',     x: 404, y: 398, label: 'East Corridor (S-008 Principal Arts)' },
  'wp_east_director':      { id: 'wp_east_director',      x: 404, y: 433, label: 'East Corridor (S-007 Director Office)' },
  'wp_east_staff':         { id: 'wp_east_staff',         x: 404, y: 484, label: 'East Corridor (S-006 Staff ECE)' },
  'wp_east_lower_bridge':  { id: 'wp_east_lower_bridge',  x: 404, y: 508, label: 'East Corridor Lower Cross-Bridge Hub' },
  'wp_east_kitchen':       { id: 'wp_east_kitchen',       x: 404, y: 544, label: 'East Corridor (S-003 Guest Kitchen)' },
  'wp_east_serve':         { id: 'wp_east_serve',         x: 404, y: 574, label: 'East Corridor (S-002 Amrita SeRVe)' },
  'wp_east_guest':         { id: 'wp_east_guest',         x: 404, y: 608, label: 'East Corridor (S-001 Guest Room)' },
  'wp_east_south_junc':    { id: 'wp_east_south_junc',    x: 404, y: 674, label: 'East Veranda South Junction (PRY-A East / A-003)' },

  // 4. Upper-West Wing Branch (WC-N2, N-014..N-017) - Hallway along X = 221
  'wp_nw_corridor_top':      { id: 'wp_nw_corridor_top',      x: 221, y: 271, label: 'NW Labs Hallway North End' },
  'wp_nw_toilet_door':       { id: 'wp_nw_toilet_door',       x: 216, y: 271, label: 'WC-N2 Gents Restroom Door' },
  'wp_nw_cross_upper':       { id: 'wp_nw_cross_upper',       x: 285, y: 271, label: 'NW Upper Passage Bridge' },
  'wp_nw_lab_dynamics':      { id: 'wp_nw_lab_dynamics',      x: 221, y: 302, label: 'Machine Dynamics Lab Walkway (N-017)' },
  'wp_nw_lab_cae':           { id: 'wp_nw_lab_cae',           x: 221, y: 330, label: 'CAE Cell Walkway (N-016)' },
  'wp_nw_lab_corridor_mid':  { id: 'wp_nw_lab_corridor_mid',  x: 221, y: 345, label: 'NW Labs Hallway Connector' },
  'wp_nw_cross_mid':         { id: 'wp_nw_cross_mid',         x: 285, y: 345, label: 'NW Mid Passage Bridge' },
  'wp_nw_lab_fluid':         { id: 'wp_nw_lab_fluid',         x: 221, y: 364, label: 'Fluid Mech Lab Walkway (N-015)' },
  'wp_nw_lab_metallurgy':    { id: 'wp_nw_lab_metallurgy',    x: 221, y: 398, label: 'Metallurgy Lab Walkway (N-014)' },

  // 5. Lower-West Wing Branch (WC-N1, N-004..N-009)
  'wp_sw_cross':             { id: 'wp_sw_cross',             x: 325, y: 508, label: 'SW Cross Passage Bridge' },
  'wp_sw_corridor_hub':      { id: 'wp_sw_corridor_hub',      x: 300, y: 508, label: 'SW Labs Courtyard East Entry' },
  'wp_sw_north_east':        { id: 'wp_sw_north_east',        x: 294, y: 492, label: 'SW Labs North Corridor Entry' },
  'wp_sw_nano9':             { id: 'wp_sw_nano9',             x: 294, y: 492, label: 'Nano Center Lab Walkway (N-009)' },
  'wp_sw_mtech8':            { id: 'wp_sw_mtech8',            x: 267, y: 492, label: 'M.Tech Fluid Lab Walkway (N-008)' },
  'wp_sw_thermal7':          { id: 'wp_sw_thermal7',          x: 230, y: 492, label: 'Thermal Engg Lab Walkway (N-007)' },
  'wp_sw_toilet_lower':      { id: 'wp_sw_toilet_lower',      x: 206, y: 492, label: 'WC-N1 Gents Restroom Door' },
  'wp_sw_south_east':        { id: 'wp_sw_south_east',        x: 276, y: 524, label: 'SW Labs South Corridor Entry' },
  'wp_sw_nano4':             { id: 'wp_sw_nano4',             x: 276, y: 524, label: 'Nano Sciences Lab Walkway (N-004)' },
  'wp_sw_solar5':            { id: 'wp_sw_solar5',            x: 206, y: 524, label: 'Solar Research Lab Walkway (N-005)' },

  // 6. Upper-East Wing Branch (WC-S2, S-011B..S-011A, WC-S1) - Hallway along X = 523
  'wp_ne_cross_upper':       { id: 'wp_ne_cross_upper',       x: 464, y: 271, label: 'NE Upper Passage Bridge' },
  'wp_ne_corridor_top':      { id: 'wp_ne_corridor_top',      x: 523, y: 271, label: 'NE Workshops Hallway North Corner' },
  'wp_ne_toilet_door':       { id: 'wp_ne_toilet_door',       x: 532, y: 282, label: 'WC-S2 Ladies Restroom Door' },
  'wp_ne_windtunnel':        { id: 'wp_ne_windtunnel',        x: 523, y: 320, label: 'Wind Tunnel Walkway (S-011B)' },
  'wp_ne_cross_mid':         { id: 'wp_ne_cross_mid',         x: 464, y: 345, label: 'NE Mid Passage Bridge' },
  'wp_ne_corridor_hub':      { id: 'wp_ne_corridor_hub',      x: 523, y: 345, label: 'NE Workshops Hallway Connector' },
  'wp_ne_robotics':          { id: 'wp_ne_robotics',          x: 523, y: 356, label: 'CNC Robotics Walkway (S-011)' },
  'wp_ne_workshop':          { id: 'wp_ne_workshop',          x: 523, y: 386, label: 'Mechanical Workshop Walkway (S-011A)' },
  'wp_se_toilet_mid':        { id: 'wp_se_toilet_mid',        x: 523, y: 420, label: 'WC-S1 Staff & Ladies Restroom Door' },

  // 7. Lower-East Wing Branch (S-005, S-MFG, S-004, S-004A) - Hallway along X = 523
  'wp_se_materials':         { id: 'wp_se_materials',         x: 523, y: 460, label: 'Materials Testing Walkway (S-005)' },
  'wp_se_cross':             { id: 'wp_se_cross',             x: 464, y: 508, label: 'SE Cross Passage Bridge' },
  'wp_se_corridor_hub':      { id: 'wp_se_corridor_hub',      x: 523, y: 508, label: 'SE Labs Hallway Entry' },
  'wp_se_mfg':               { id: 'wp_se_mfg',               x: 523, y: 506, label: 'Manufacturing Lab Walkway (S-MFG)' },
  'wp_se_faculty_s004':      { id: 'wp_se_faculty_s004',      x: 523, y: 547, label: 'Faculty Room Walkway (S-004)' },
  'wp_se_research_cell':     { id: 'wp_se_research_cell',     x: 523, y: 567, label: 'Research Cell Walkway (S-004A)' },

  // 8. South Lobby & Admin Axial Corridor
  'wp_admin_west_end':       { id: 'wp_admin_west_end',       x: 222, y: 674, label: 'Amritheswari Hall Foyer (A-006)' },
  'wp_admin_west_st':        { id: 'wp_admin_west_st',        x: 272, y: 674, label: 'Admin West Stairs' },
  'wp_admin_a005':           { id: 'wp_admin_a005',           x: 295, y: 674, label: 'A-005 Meditation Hall Walkway' },
  'wp_admin_a004':           { id: 'wp_admin_a004',           x: 327, y: 674, label: 'A-004 Executive Office Walkway' },
  'wp_admin_cross':          { id: 'wp_admin_cross',          x: 375, y: 674, label: 'Admin Grand Cross Hallway / Prayer Hall' },
  'wp_admin_a003':           { id: 'wp_admin_a003',           x: 419, y: 674, label: 'A-003 Admin Suite Walkway' },
  'wp_admin_a002':           { id: 'wp_admin_a002',           x: 450, y: 674, label: 'A-002 ENGM Conference Walkway' },
  'wp_admin_east_st':        { id: 'wp_admin_east_st',        x: 460, y: 674, label: 'Admin East Stairs' },
  'wp_admin_east_end':       { id: 'wp_admin_east_end',       x: 526, y: 674, label: 'Acharya Hall Foyer (A-001)' },
  'wp_admin_office':         { id: 'wp_admin_office',         x: 375, y: 694, label: 'Admin Central Office (ADM-01)' },
  'wp_reception':            { id: 'wp_reception',            x: 375, y: 728, label: 'Reception Foyer (REC)' },
  'wp_gad_pr':               { id: 'wp_gad_pr',               x: 375, y: 754, label: 'GAD - PR Office Walkway' },
  'wp_entrance':             { id: 'wp_entrance',             x: 375, y: 805, label: 'Main Entrance Porch' },

  // Outdoor Roadway Loop
  'wp_outdoor_north_drive':     { id: 'wp_outdoor_north_drive',     x: 376, y: 50,  label: 'North Outer Driveway' },
  'wp_outdoor_north_corner':    { id: 'wp_outdoor_north_corner',    x: 570, y: 50,  label: 'North Driveway East Corner' },
  'wp_outdoor_ne_bend1':        { id: 'wp_outdoor_ne_bend1',        x: 615, y: 90,  label: 'Northeast Outer Roadway Bend 1' },
  'wp_outdoor_ne_bend2':        { id: 'wp_outdoor_ne_bend2',        x: 645, y: 120, label: 'Northeast Outer Roadway Bend 2' },
  'wp_outdoor_east_edge_upper': { id: 'wp_outdoor_east_edge_upper', x: 645, y: 230, label: 'East Perimeter Roadway (North)' },
  'wp_outdoor_east_mid':        { id: 'wp_outdoor_east_mid',        x: 645, y: 380, label: 'East Perimeter Roadway (Mid)' },
  'wp_outdoor_east_lower':      { id: 'wp_outdoor_east_lower',      x: 645, y: 508, label: 'East Perimeter Roadway (Lower)' },
  'wp_outdoor_east_se_junc':    { id: 'wp_outdoor_east_se_junc',    x: 645, y: 580, label: 'East Roadway & Mfg Breezeway Junction' },
  'wp_outdoor_se_corner':       { id: 'wp_outdoor_se_corner',       x: 645, y: 805, label: 'Southeast Campus Roadway Corner' },
  'wp_outdoor_s004a_east':      { id: 'wp_outdoor_s004a_east',      x: 530, y: 580, label: 'South Breezeway East (outside S-004A)' },
  'wp_outdoor_breezeway_east':  { id: 'wp_outdoor_breezeway_east',  x: 464, y: 580, label: 'Mfg South Breezeway Junction' },
  'wp_outdoor_south_east':      { id: 'wp_outdoor_south_east',      x: 460, y: 805, label: 'South Perimeter Roadway East' },
  'wp_outdoor_south_west':      { id: 'wp_outdoor_south_west',      x: 250, y: 805, label: 'South Perimeter Roadway West' },
  'wp_outdoor_sw_corner':       { id: 'wp_outdoor_sw_corner',       x: 145, y: 805, label: 'Southwest Campus Roadway Corner' },
  'wp_outdoor_west_amri':       { id: 'wp_outdoor_west_amri',       x: 145, y: 620, label: 'West Roadway (outside Amritheswari)' },
  'wp_outdoor_west_breezeway':  { id: 'wp_outdoor_west_breezeway',  x: 220, y: 620, label: 'West Courtyard Breezeway Entry' },
  'wp_outdoor_amri_top':        { id: 'wp_outdoor_amri_top',        x: 220, y: 580, label: 'Amritheswari North Lightwell' },
  'wp_outdoor_sw_cross_junc':   { id: 'wp_outdoor_sw_cross_junc',   x: 145, y: 508, label: 'West Courtyard & Cross Walkway Crossing' },
  'wp_outdoor_mid_west_bend1':  { id: 'wp_outdoor_mid_west_bend1',  x: 145, y: 440, label: 'West Courtyard Walkway Mid' },
  'wp_outdoor_mid_west_bend2':  { id: 'wp_outdoor_mid_west_bend2',  x: 145, y: 398, label: 'Metallurgy Lab South Outer Access' }
};

// 3. Updated HALLWAY_EDGES
const HALLWAY_EDGES = [
  // West Spine Veranda Corridor (along N-Block rooms)
  ['wp_west_spine_top', 'wp_west_machines', 'indoor'],
  ['wp_west_machines', 'wp_west_upper_branch', 'indoor'],
  ['wp_west_upper_branch', 'wp_west_math', 'indoor'],
  ['wp_west_math', 'wp_west_mid_bridge', 'indoor'],
  ['wp_west_mid_bridge', 'wp_west_prin', 'indoor'],
  ['wp_west_prin', 'wp_west_hr', 'indoor'],
  ['wp_west_hr', 'wp_west_affairs', 'indoor'],
  ['wp_west_affairs', 'wp_west_staff', 'indoor'],
  ['wp_west_staff', 'wp_west_lower_bridge', 'indoor'],
  ['wp_west_lower_bridge', 'wp_west_cir', 'indoor'],
  ['wp_west_cir', 'wp_west_mech', 'indoor'],
  ['wp_west_mech', 'wp_west_admis', 'indoor'],
  ['wp_west_admis', 'wp_west_south_junc', 'indoor'],

  // East Spine Veranda Corridor (along S-Block rooms)
  ['wp_east_spine_top', 'wp_east_computer', 'indoor'],
  ['wp_east_computer', 'wp_east_upper_branch', 'indoor'],
  ['wp_east_upper_branch', 'wp_east_admin', 'indoor'],
  ['wp_east_admin', 'wp_east_mid_bridge', 'indoor'],
  ['wp_east_mid_bridge', 'wp_east_conf', 'indoor'],
  ['wp_east_conf', 'wp_east_s009', 'indoor'],
  ['wp_east_s009', 'wp_east_arts_prin', 'indoor'],
  ['wp_east_arts_prin', 'wp_east_director', 'indoor'],
  ['wp_east_director', 'wp_east_staff', 'indoor'],
  ['wp_east_staff', 'wp_east_lower_bridge', 'indoor'],
  ['wp_east_lower_bridge', 'wp_east_kitchen', 'indoor'],
  ['wp_east_kitchen', 'wp_east_serve', 'indoor'],
  ['wp_east_serve', 'wp_east_guest', 'indoor'],
  ['wp_east_guest', 'wp_east_south_junc', 'indoor'],

  // Connectors across Atrium
  ['wp_west_spine_top', 'wp_east_spine_top', 'indoor'],
  ['wp_north_exit_hub', 'wp_west_spine_top', 'indoor'],
  ['wp_north_exit_hub', 'wp_east_spine_top', 'indoor'],
  ['wp_west_mid_bridge', 'wp_east_mid_bridge', 'indoor'],
  ['wp_west_lower_bridge', 'wp_east_lower_bridge', 'indoor'],

  // Upper West Wing Branch (WC-N2 and N-014..N-017)
  ['wp_west_upper_branch', 'wp_nw_cross_upper', 'indoor'],
  ['wp_nw_cross_upper', 'wp_nw_corridor_top', 'indoor'],
  ['wp_nw_corridor_top', 'wp_nw_toilet_door', 'indoor'],
  ['wp_nw_corridor_top', 'wp_nw_lab_dynamics', 'indoor'],
  ['wp_nw_lab_dynamics', 'wp_nw_lab_cae', 'indoor'],
  ['wp_nw_lab_cae', 'wp_nw_lab_corridor_mid', 'indoor'],
  ['wp_west_mid_bridge', 'wp_nw_cross_mid', 'indoor'],
  ['wp_nw_cross_mid', 'wp_nw_lab_corridor_mid', 'indoor'],
  ['wp_nw_lab_corridor_mid', 'wp_nw_lab_fluid', 'indoor'],
  ['wp_nw_lab_fluid', 'wp_nw_lab_metallurgy', 'indoor'],

  // Lower West Wing Branch (WC-N1, N-004..N-009)
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
  ['wp_sw_solar5', 'wp_sw_toilet_lower', 'indoor'],

  // Upper East Wing Branch (WC-S2, S-011B..S-011A, WC-S1)
  ['wp_east_upper_branch', 'wp_ne_cross_upper', 'indoor'],
  ['wp_ne_cross_upper', 'wp_ne_corridor_top', 'indoor'],
  ['wp_ne_corridor_top', 'wp_ne_toilet_door', 'indoor'],
  ['wp_ne_corridor_top', 'wp_ne_windtunnel', 'indoor'],
  ['wp_ne_windtunnel', 'wp_ne_corridor_hub', 'indoor'],
  ['wp_east_mid_bridge', 'wp_ne_cross_mid', 'indoor'],
  ['wp_ne_cross_mid', 'wp_ne_corridor_hub', 'indoor'],
  ['wp_ne_corridor_hub', 'wp_ne_robotics', 'indoor'],
  ['wp_ne_robotics', 'wp_ne_workshop', 'indoor'],
  ['wp_ne_workshop', 'wp_se_toilet_mid', 'indoor'],
  ['wp_se_toilet_mid', 'wp_se_materials', 'indoor'],

  // Lower East Wing Branch (S-005, S-MFG, S-004, S-004A)
  ['wp_east_lower_bridge', 'wp_se_cross', 'indoor'],
  ['wp_se_cross', 'wp_se_corridor_hub', 'indoor'],
  ['wp_se_corridor_hub', 'wp_se_materials', 'indoor'],
  ['wp_se_corridor_hub', 'wp_se_mfg', 'indoor'],
  ['wp_se_mfg', 'wp_se_faculty_s004', 'indoor'],
  ['wp_se_faculty_s004', 'wp_se_research_cell', 'indoor'],

  // South Lobby & Admin Axial Corridor
  ['wp_admin_cross', 'wp_west_south_junc', 'indoor'],
  ['wp_west_south_junc', 'wp_admin_a004', 'indoor'],
  ['wp_admin_a004', 'wp_admin_a005', 'indoor'],
  ['wp_admin_a005', 'wp_admin_west_st', 'indoor'],
  ['wp_admin_west_st', 'wp_admin_west_end', 'indoor'],
  ['wp_admin_cross', 'wp_east_south_junc', 'indoor'],
  ['wp_east_south_junc', 'wp_admin_a003', 'indoor'],
  ['wp_admin_a003', 'wp_admin_a002', 'indoor'],
  ['wp_admin_a002', 'wp_admin_east_st', 'indoor'],
  ['wp_admin_east_st', 'wp_admin_east_end', 'indoor'],
  ['wp_admin_cross', 'wp_admin_office', 'indoor'],
  ['wp_admin_office', 'wp_reception', 'indoor'],
  ['wp_reception', 'wp_gad_pr', 'indoor'],
  ['wp_gad_pr', 'wp_entrance', 'indoor'],

  // Outdoor Roadway Loop
  ['wp_north_exit_hub', 'wp_outdoor_north_drive', 'outdoor'],
  ['wp_outdoor_north_drive', 'wp_outdoor_north_corner', 'outdoor'],
  ['wp_outdoor_north_corner', 'wp_outdoor_ne_bend1', 'outdoor'],
  ['wp_outdoor_ne_bend1', 'wp_outdoor_ne_bend2', 'outdoor'],
  ['wp_outdoor_ne_bend2', 'wp_outdoor_east_edge_upper', 'outdoor'],
  ['wp_outdoor_east_edge_upper', 'wp_outdoor_east_mid', 'outdoor'],
  ['wp_outdoor_east_mid', 'wp_outdoor_east_lower', 'outdoor'],
  ['wp_outdoor_east_lower', 'wp_outdoor_east_se_junc', 'outdoor'],
  ['wp_outdoor_east_se_junc', 'wp_outdoor_se_corner', 'outdoor'],
  ['wp_outdoor_east_se_junc', 'wp_outdoor_s004a_east', 'outdoor'],
  ['wp_outdoor_s004a_east', 'wp_outdoor_breezeway_east', 'outdoor'],
  ['wp_outdoor_breezeway_east', 'wp_se_research_cell', 'outdoor'],
  ['wp_outdoor_breezeway_east', 'wp_admin_east_st', 'outdoor'],
  ['wp_outdoor_se_corner', 'wp_outdoor_south_east', 'outdoor'],
  ['wp_outdoor_south_east', 'wp_entrance', 'outdoor'],
  ['wp_entrance', 'wp_outdoor_south_west', 'outdoor'],
  ['wp_outdoor_south_west', 'wp_outdoor_sw_corner', 'outdoor'],
  ['wp_outdoor_sw_corner', 'wp_outdoor_west_amri', 'outdoor'],
  ['wp_outdoor_west_amri', 'wp_outdoor_west_breezeway', 'outdoor'],
  ['wp_outdoor_west_breezeway', 'wp_outdoor_amri_top', 'outdoor'],
  ['wp_outdoor_amri_top', 'wp_outdoor_sw_cross_junc', 'outdoor'],
  ['wp_outdoor_sw_cross_junc', 'wp_outdoor_mid_west_bend1', 'outdoor'],
  ['wp_outdoor_mid_west_bend1', 'wp_outdoor_mid_west_bend2', 'outdoor'],
  ['wp_outdoor_mid_west_bend2', 'wp_nw_lab_metallurgy', 'outdoor']
];

// Test Graph Connectivity using Dijkstra
const GRAPH = {};
Object.keys(WAYPOINTS).forEach(id => { GRAPH[id] = []; });
HALLWAY_EDGES.forEach(([u, v, typ = 'indoor']) => {
  if (!WAYPOINTS[u] || !WAYPOINTS[v]) return;
  const p1 = WAYPOINTS[u], p2 = WAYPOINTS[v];
  const geomDist = Math.hypot(p1.x - p2.x, p1.y - p2.y) * 0.4;
  const cost = (typ === 'outdoor') ? geomDist * 2.5 : geomDist;
  GRAPH[u].push({ to: v, dist: cost, geomDist, type: typ });
  GRAPH[v].push({ to: u, dist: cost, geomDist, type: typ });
});

// Link rooms to nearest waypoint
ROOMS_DATA.forEach(room => {
  const doorId = 'door_' + room.id;
  GRAPH[doorId] = [];
  const [dx, dy] = room.door;
  let bestWp = null, bestDist = Infinity;
  Object.values(WAYPOINTS).forEach(wp => {
    if (wp.id.startsWith('wp_outdoor')) return;
    const d = Math.hypot(dx - wp.x, dy - wp.y);
    if (d < bestDist) { bestDist = d; bestWp = wp; }
  });
  if (bestWp) {
    const geomDist = bestDist * 0.4;
    GRAPH[doorId].push({ to: bestWp.id, dist: geomDist, geomDist, type: 'indoor' });
    GRAPH[bestWp.id].push({ to: doorId, dist: geomDist, geomDist, type: 'indoor' });
  }
});

function dijkstra(startId, endId) {
  const dist = {}, prev = {}, pq = new Set(Object.keys(GRAPH));
  Object.keys(GRAPH).forEach(node => dist[node] = Infinity);
  dist[startId] = 0;
  while (pq.size > 0) {
    let u = null, minD = Infinity;
    for (const node of pq) {
      if (dist[node] < minD) { minD = dist[node]; u = node; }
    }
    if (!u || minD === Infinity || u === endId) break;
    pq.delete(u);
    for (const edge of GRAPH[u]) {
      if (pq.has(edge.to)) {
        const alt = dist[u] + edge.dist;
        if (alt < dist[edge.to]) {
          dist[edge.to] = alt;
          prev[edge.to] = u;
        }
      }
    }
  }
  if (dist[endId] === Infinity) return null;
  const path = [];
  let curr = endId;
  while (curr) { path.unshift(curr); curr = prev[curr]; }
  return { path, dist: dist[endId] };
}

// Test connectivity across all pairs
let failures = 0;
for (let i = 0; i < ROOMS_DATA.length; i++) {
  for (let j = i + 1; j < ROOMS_DATA.length; j++) {
    const r1 = ROOMS_DATA[i], r2 = ROOMS_DATA[j];
    const res = dijkstra('door_' + r1.id, 'door_' + r2.id);
    if (!res) {
      console.error('FAIL: No path between ' + r1.id + ' and ' + r2.id);
      failures++;
    }
  }
}

if (failures === 0) {
  console.log('SUCCESS: All ' + (ROOMS_DATA.length * (ROOMS_DATA.length - 1) / 2) + ' pairs of rooms are fully reachable!');
} else {
  console.error('Total failures: ' + failures);
  process.exit(1);
}
