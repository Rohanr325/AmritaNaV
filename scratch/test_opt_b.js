/**
 * Amritanav Campus Navigation - Multi-Floor Vector CAD Engine
 * Ground Floor & Second Floor (2nd Floor) with Dijkstra Corridor Routing,
 * Multi-Floor Staircase Transition, Pan/Zoom, Instant Search, and Theme Control.
 */

// ==========================================================================
// 1. MASTER MULTI-FLOOR ARCHITECTURAL DATABASE
// ==========================================================================

const CATEGORIES = {
  ALL: { name: 'All Places' },
  LAB: { name: 'Laboratory', color: '#06b6d4' },
  AUDITORIUM: { name: 'Auditorium', color: '#f59e0b' },
  OFFICE: { name: 'Office / Admin', color: '#8b5cf6' },
  ROOM: { name: 'Class / Hall', color: '#3b82f6' },
  CLASSROOM: { name: 'Classroom', color: '#3b82f6' },
  FACULTY: { name: 'Faculty Cabin', color: '#10b981' },
  TOILET: { name: 'Restroom', color: '#ec4899' },
  FACILITY: { name: 'Campus Facility', color: '#10b981' }
};

const FLOORS_DATA = {
  0: {
    id: 0,
    name: 'Ground Floor',
    shortName: 'GROUND',
    badge: 'Amritapuri Campus • Ground Floor',
    rooms: [
// ---------- ADMIN BLOCK (A) - BOTTOM SECTION ----------
  { id: 'GAD-PR', code: 'GAD', name: 'GAD - PR Office', wing: 'Admin Block (A)', category: 'OFFICE', x: 334, y: 810, w: 78, h: 36, door: [374, 810], desc: 'General Administration Department & Public Relations Liaison Office at the main entrance porch.' },
  { id: 'PRAYER-HALL-A', code: 'PRY-A', name: 'Central Prayer & Admin Hall', wing: 'Admin Block (A)', category: 'ROOM', x: 326, y: 708, w: 96, h: 102, door: [374, 708], desc: 'Unified central sanctuary, administrative registry (ADM-01), reception desk (REC), and student services hub.' },
  { id: 'A-004', code: 'A-004', name: 'Executive Office A-004', wing: 'Admin Block (A)', category: 'OFFICE', x: 300, y: 708, w: 26, h: 44, door: [313, 708], desc: 'Administrative Liaison and records archive.' },
  { id: 'A-005', code: 'A-005', name: 'Special Programs / Meditation', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 262, y: 708, w: 38, h: 76, door: [281, 708], desc: 'Dedicated serene hall for IAM Meditation, yoga sessions, and discourses.' },
  { id: 'TOILET-BOYS-ADMIN', code: 'WC-BOYS', name: 'Boys Restroom', wing: 'Admin Block (A)', category: 'TOILET', x: 224, y: 708, w: 38, h: 42, door: [243, 708], desc: 'Gents washroom and sanitary facility adjacent to Amritheswari Hall.' },
  { id: 'A-006', code: 'A-006', name: 'Amritheswari Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 168, y: 600, w: 56, h: 108, door: [224, 696], desc: 'Grand University Cultural Auditorium with stage lighting and 600+ seating capacity.' },
  { id: 'A-003', code: 'A-003', name: 'Admin Suite A-003', wing: 'Admin Block (A)', category: 'OFFICE', x: 422, y: 708, w: 26, h: 76, door: [435, 708], desc: 'Administrative advisory and conference chamber.' },
  { id: 'A-002', code: 'A-002', name: 'ENGM Conf Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 448, y: 708, w: 36, h: 44, door: [466, 708], desc: 'Corporate boardroom and executive seminar conference suite.' },
  { id: 'TOILET-GIRLS-ADMIN', code: 'WC-GIRLS', name: 'Girls Restroom', wing: 'Admin Block (A)', category: 'TOILET', x: 484, y: 708, w: 40, h: 42, door: [504, 708], desc: 'Ladies washroom and sanitary facility adjacent to Acharya Hall.' },
  { id: 'A-001', code: 'A-001', name: 'Acharya Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 526, y: 600, w: 56, h: 108, door: [526, 696], desc: 'Premier University Auditorium with 500+ seating capacity for convocations and symposiums.' },

  // ---------- NORTHERN WING (N) - CENTRAL SPINE ----------
  { id: 'N-001', code: 'N-001', name: 'Admission Office', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 590, w: 40, h: 36, door: [346, 608], desc: 'University Admissions, application processing, counseling, and enrollment helpdesk.' },
  { id: 'N-002', code: 'N-002', name: 'Mech. Professors Room', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 560, w: 40, h: 28, door: [346, 574], desc: 'Senior Faculty Cabins for Department of Mechanical Engineering.' },
  { id: 'N-003', code: 'N-003', name: 'CIR Seminar Room', wing: 'Northern Wing (N)', category: 'ROOM', x: 306, y: 530, w: 40, h: 28, door: [346, 544], desc: 'Corporate and Industry Relations (CIR) training & interview suite.' },
  { id: 'N-010', code: 'N-010', name: 'Staff Room (Mech)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 462, w: 40, h: 40, door: [346, 484], desc: 'Mechanical Engineering Department Faculty and Academic Staff room.' },
  { id: 'N-011', code: 'N-011', name: 'Student Affairs Office', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 414, w: 40, h: 38, door: [346, 433], desc: 'Office of Student Welfare, student club activities and campus life coordination.' },
  { id: 'N-012', code: 'N-012', name: 'Human Resources (HR) Dept', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 382, w: 40, h: 32, door: [346, 398], desc: 'University Human Resources & Staff Administration.' },
  { id: 'N-013', code: 'N-013', name: 'Principal (Engineering)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 306, y: 350, w: 40, h: 32, door: [346, 366], desc: 'Executive Office of the Principal, School of Engineering.' },
  { id: 'N-018', code: 'N-018', name: 'Dept of Mathematics (108)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 304, y: 278, w: 42, h: 48, door: [346, 300], desc: 'Mathematics Faculty department, research cubicles and consultation rooms.' },
  { id: 'N-019', code: 'N-019', name: 'Electrical Machines Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 304, y: 184, w: 42, h: 80, door: [346, 226], desc: 'High-voltage electric motors, generators, transformers, and power dynamics research station.' },
  { id: 'N-020', code: 'N-020', name: 'Northern Prayer Hall', wing: 'Northern Wing (N)', category: 'ROOM', x: 304, y: 156, w: 42, h: 28, door: [346, 170], desc: 'North Wing prayer hall and quiet contemplation space.' },

  // ---------- NORTHERN WING (N) - OUTER LABS & TOILETS (Aligned to left margin x=168) ----------
  { id: 'TOILET-N-UPPER', code: 'WC-N2', name: 'Gents Restroom (NW-Upper)', wing: 'Northern Wing (N)', category: 'TOILET', x: 168, y: 260, w: 48, h: 26, door: [216, 271], desc: 'Upper Gents washroom with cubicles and washbasins.' },
  { id: 'N-017', code: 'N-017', name: 'Machine Dynamics Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 286, w: 48, h: 32, door: [216, 302], desc: 'Kinematics, vibration analysis, whirling of shafts, and balancing equipment.' },
  { id: 'N-016', code: 'N-016', name: 'CAE Simulation Cell', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 318, w: 48, h: 24, door: [216, 330], desc: 'Computer-Aided Engineering simulation workstations (Ansys, SolidWorks, FEA).' },
  { id: 'N-015', code: 'N-015', name: 'Fluid Mechanics Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 342, w: 48, h: 44, door: [216, 364], desc: 'Hydraulic flumes, flow meters, Bernoulli apparatus, and pipe friction rigs.' },
  { id: 'N-014', code: 'N-014', name: 'Metallurgy Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 386, w: 48, h: 24, door: [216, 398], desc: 'Specimen polishing, metallographic microscope analysis, and heat treatment furnace.' },
  { id: 'N-007', code: 'N-007', name: 'Thermal Engineering Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 144, y: 448, w: 70, h: 44, door: [176, 492], desc: 'Thermodynamics test benches, heat exchangers, refrigeration cycles and engines.' },
  { id: 'N-008', code: 'N-008', name: 'M.Tech Fluid Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 214, y: 448, w: 28, h: 44, door: [228, 492], desc: 'Advanced postgraduate fluid mechanics and CFD boundary flow testing facility.' },
  { id: 'N-009', code: 'N-009', name: 'Nano Center (Lab 009)', wing: 'Northern Wing (N)', category: 'LAB', x: 242, y: 448, w: 20, h: 44, door: [252, 492], desc: 'Nanomaterial device fabrication and clean room testing.' },
  { id: 'TOILET-N-LOWER', code: 'WC-N1', name: 'Gents Restroom (NW-Lower)', wing: 'Northern Wing (N)', category: 'TOILET', x: 92, y: 488, w: 38, h: 34, door: [130, 508], desc: 'Gents washrooms and drinking water point near Thermal Lab.' },
  { id: 'N-005-006', code: 'N-005', name: 'Nano Sciences (Solar Lab)', wing: 'Northern Wing (N)', category: 'LAB', x: 144, y: 526, w: 80, h: 46, door: [176, 526], desc: 'Storage Integrated Solar Module Research Laboratory & Clean Energy Systems.' },
  { id: 'N-004', code: 'N-004', name: 'Amrita Center for Nano Sciences', wing: 'Northern Wing (N)', category: 'LAB', x: 224, y: 526, w: 38, h: 46, door: [236, 526], desc: 'Advanced Nanotechnology materials synthesis and molecular characterization.' },

  // ---------- SOUTHERN WING (S) - CENTRAL SPINE ----------
  { id: 'S-014', code: 'S-014', name: 'Nanotechnology Research Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 405, y: 156, w: 45, h: 36, door: [405, 174], desc: 'Advanced nanotech characterization and microfluidics research facility.' },
  { id: 'S-013', code: 'S-013', name: 'Central Computer Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 405, y: 192, w: 45, h: 76, door: [405, 230], desc: 'Flagship high-performance computing laboratory, gigabit network and AI workstations.' },
  { id: 'S-012', code: 'S-012', name: 'College Administration Office', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 274, w: 40, h: 52, door: [405, 300], desc: 'Academic registrar, fee payments, certificate issuance, and helpdesk.' },
  { id: 'S-010', code: 'S-010', name: 'South Conference Room', wing: 'Southern Wing (S)', category: 'ROOM', x: 405, y: 350, w: 40, h: 18, door: [405, 357], desc: 'Departmental meeting and presentation conference hall.' },
  { id: 'S-009', code: 'S-009', name: 'Faculty Room S-009', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 368, w: 40, h: 14, door: [405, 375], desc: 'Academic faculty rooms and consultation cabins.' },
  { id: 'S-008', code: 'S-008', name: 'Principal (Arts & Sciences)', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 382, w: 40, h: 32, door: [405, 398], desc: 'Executive Office of Principal, School of Arts & Sciences.' },
  { id: 'S-007', code: 'S-007', name: 'Director & Assoc. Dean', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 414, w: 40, h: 38, door: [405, 433], desc: 'Executive Suite of Campus Director and Associate Dean of Academic Affairs.' },
  { id: 'S-006', code: 'S-006', name: 'Staff Room (ECE & EEE)', wing: 'Southern Wing (S)', category: 'OFFICE', x: 405, y: 462, w: 40, h: 40, door: [405, 484], desc: 'Faculty Cabins for Department of Electrical & Electronics Engineering.' },
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
    ].map(r => ({ ...r, floor: 0 })),
    waypoints: {
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
  'wp_west_south_junc':    { id: 'wp_west_south_junc',    x: 350, y: 696, label: 'West Veranda South Junction (PRY-A West / A-004)' },

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
  'wp_east_south_junc':    { id: 'wp_east_south_junc',    x: 404, y: 696, label: 'East Veranda South Junction (PRY-A East / A-003)' },

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

  // 5. Lower-West Wing Branch (WC-N1, N-004 to N-009) - Rectangular Perimeter Courtyard Loop
  'wp_sw_cross':             { id: 'wp_sw_cross',             x: 290, y: 508, label: 'SW Cross Passage (N-010 / N-003)' },
  'wp_sw_corridor_hub':      { id: 'wp_sw_corridor_hub',      x: 262, y: 508, label: 'SW Labs Courtyard East Entry' },
  'wp_sw_north_east':        { id: 'wp_sw_north_east',        x: 262, y: 492, label: 'SW Labs North Corridor Corner' },
  'wp_sw_nano9':             { id: 'wp_sw_nano9',             x: 252, y: 492, label: 'Nano Center Lab Walkway (N-009)' },
  'wp_sw_mtech8':            { id: 'wp_sw_mtech8',            x: 228, y: 492, label: 'M.Tech Fluid Lab Walkway (N-008)' },
  'wp_sw_thermal7':          { id: 'wp_sw_thermal7',          x: 176, y: 492, label: 'Thermal Engg Lab Walkway (N-007)' },
  'wp_sw_north_west':        { id: 'wp_sw_north_west',        x: 144, y: 492, label: 'SW Labs North-West Corner' },
  'wp_sw_south_east':        { id: 'wp_sw_south_east',        x: 262, y: 526, label: 'SW Labs South Corridor Corner' },
  'wp_sw_nano4':             { id: 'wp_sw_nano4',             x: 236, y: 526, label: 'Nano Sciences Lab Walkway (N-004)' },
  'wp_sw_solar5':            { id: 'wp_sw_solar5',            x: 176, y: 526, label: 'Solar Research Lab Walkway (N-005)' },
  'wp_sw_south_west':        { id: 'wp_sw_south_west',        x: 144, y: 526, label: 'SW Labs South-West Corner' },
  'wp_sw_toilet_vest':       { id: 'wp_sw_toilet_vest',       x: 144, y: 508, label: 'SW Restroom Vestibule' },
  'wp_sw_toilet_lower':      { id: 'wp_sw_toilet_lower',      x: 130, y: 508, label: 'WC-N1 Gents Restroom Door' },

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

  // 8. South Lobby & Admin Axial Corridor (Transverse corridor at Y = 696)
  'wp_admin_west_end':       { id: 'wp_admin_west_end',       x: 224, y: 696, label: 'Amritheswari Hall Foyer (A-006)' },
  'wp_admin_white_junc':     { id: 'wp_admin_white_junc',     x: 232, y: 696, label: 'Amritheswari Corridor T-Junction' },
  'wp_admin_white_path':     { id: 'wp_admin_white_path',     x: 232, y: 648, label: 'Amritheswari East Breezeway Pathway' },
  'wp_admin_wc_boys':        { id: 'wp_admin_wc_boys',        x: 243, y: 696, label: 'Boys Restroom Walkway (Admin)' },
  'wp_admin_west_st':        { id: 'wp_admin_west_st',        x: 262, y: 696, label: 'Admin West Stairs' },
  'wp_admin_a005':           { id: 'wp_admin_a005',           x: 281, y: 696, label: 'A-005 Meditation Hall Walkway' },
  'wp_admin_a004':           { id: 'wp_admin_a004',           x: 313, y: 696, label: 'A-004 Executive Office Walkway' },
  'wp_admin_cross':          { id: 'wp_admin_cross',          x: 374, y: 696, label: 'Admin Grand Cross Hallway / Central Hall' },
  'wp_admin_a003':           { id: 'wp_admin_a003',           x: 435, y: 696, label: 'A-003 Admin Suite Walkway' },
  'wp_admin_a002':           { id: 'wp_admin_a002',           x: 466, y: 696, label: 'A-002 ENGM Conference Walkway' },
  'wp_admin_east_st':        { id: 'wp_admin_east_st',        x: 486, y: 696, label: 'Admin East Stairs' },
  'wp_admin_wc_girls':       { id: 'wp_admin_wc_girls',       x: 504, y: 696, label: 'Girls Restroom Walkway (Admin)' },
  'wp_admin_acharya_junc':   { id: 'wp_admin_acharya_junc',   x: 518, y: 696, label: 'Admin East Corridor (Acharya North Path Junc)' },
  'wp_admin_acharya_path':   { id: 'wp_admin_acharya_path',   x: 518, y: 648, label: 'Admin East Elevated Walkway (Acharya West Path)' },
  'wp_outdoor_east_breezeway': { id: 'wp_outdoor_east_breezeway', x: 518, y: 600, label: 'East Breezeway Pathway North Entrance' },
  'wp_admin_east_end':       { id: 'wp_admin_east_end',       x: 526, y: 696, label: 'Acharya Hall Foyer (A-001)' },
  'wp_gad_pr':               { id: 'wp_gad_pr',               x: 374, y: 810, label: 'GAD - PR Office Walkway' },
  'wp_entrance':             { id: 'wp_entrance',             x: 374, y: 861, label: 'Main Entrance Porch' },

    // Outdoor Roadway Loop (Matching user orange line)
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
  'wp_outdoor_sw_north_junc':   { id: 'wp_outdoor_sw_north_junc',   x: 290, y: 440, label: 'West Labs North Breezeway Junction' }
    },
    edges: [
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
  ['wp_west_upper_branch', 'wp_east_upper_branch', 'indoor'],
  ['wp_west_hr', 'wp_east_arts_prin', 'indoor'],
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
  ['wp_sw_thermal7', 'wp_sw_north_west', 'indoor'],
  ['wp_sw_north_west', 'wp_sw_toilet_vest', 'indoor'],
  ['wp_sw_corridor_hub', 'wp_sw_south_east', 'indoor'],
  ['wp_sw_south_east', 'wp_sw_nano4', 'indoor'],
  ['wp_sw_nano4', 'wp_sw_solar5', 'indoor'],
  ['wp_sw_solar5', 'wp_sw_south_west', 'indoor'],
  ['wp_sw_south_west', 'wp_sw_toilet_vest', 'indoor'],
  ['wp_sw_toilet_vest', 'wp_sw_toilet_lower', 'indoor'],

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

  // South Lobby & Admin Axial Corridor (Transverse corridor along Y = 696)
  ['wp_admin_west_end', 'wp_admin_white_junc', 'indoor'],
  ['wp_admin_white_junc', 'wp_admin_wc_boys', 'indoor'],
  ['wp_admin_white_junc', 'wp_admin_white_path', 'indoor'],
  ['wp_admin_wc_boys', 'wp_admin_west_st', 'indoor'],
  ['wp_admin_west_st', 'wp_admin_a005', 'indoor'],
  ['wp_admin_a005', 'wp_admin_a004', 'indoor'],
  ['wp_admin_a004', 'wp_west_south_junc', 'indoor'],
  ['wp_west_south_junc', 'wp_admin_cross', 'indoor'],
  ['wp_admin_cross', 'wp_east_south_junc', 'indoor'],
  ['wp_east_south_junc', 'wp_admin_a003', 'indoor'],
  ['wp_admin_a003', 'wp_admin_a002', 'indoor'],
  ['wp_admin_a002', 'wp_admin_east_st', 'indoor'],
  ['wp_admin_east_st', 'wp_admin_wc_girls', 'indoor'],
  ['wp_admin_wc_girls', 'wp_admin_acharya_junc', 'indoor'],
  ['wp_admin_acharya_junc', 'wp_admin_east_end', 'indoor'],
  ['wp_admin_acharya_junc', 'wp_admin_acharya_path', 'indoor'],
  ['wp_admin_acharya_path', 'wp_outdoor_east_breezeway', 'indoor'],
  ['wp_outdoor_east_breezeway', 'wp_se_research_cell', 'indoor'],
  ['wp_outdoor_east_breezeway', 'wp_outdoor_breezeway_east', 'outdoor'],
  ['wp_admin_cross', 'wp_gad_pr', 'indoor'],
  ['wp_gad_pr', 'wp_entrance', 'indoor'],

    // White line pathway along East side of Amritheswari Hall:
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
  ['wp_outdoor_sw_north_junc', 'wp_nw_lab_metallurgy', 'outdoor']
    ],
    stairs: [
      { x: 368, y: 491, w: 14, h: 16, steps: 5, dir: 'h' }, // Central Mid-Bridge
      { x: 262, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }, // Admin West
      { x: 486, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }  // Admin East
    ],
    buildingBaseHtml: `
<!-- Admin Block Footprint (Spans corridor at y=688 to room bottom y=786/848) -->
    <path class="building-wing" d="
      M 220 688 L 526 688 L 526 786 L 424 786 L 424 848 L 324 848 L 324 786 L 220 786 Z
    " />

    <!-- North Spine Wing -->
    <rect class="building-wing" x="300" y="152" width="50" height="490" rx="2" />

    <!-- South Spine Wing -->
    <rect class="building-wing" x="402" y="152" width="50" height="490" rx="2" />

    <!-- North Outer Wing (Upper - WC-N2, N-017 to N-014, aligned to x=168) -->
    <rect class="building-wing" x="168" y="256" width="58" height="158" rx="2" />

    <!-- North Outer Wing (Lower - Thermal to Nano) -->
    <path class="building-wing" d="
      M 144 446 L 264 446 L 264 576 L 144 576 L 144 526 L 88 526 L 88 486 L 144 486 Z
    " />

    <!-- Amritheswari Hall Wing (Resized to fit orange box: x=168, y=596..710) -->
    <rect class="building-wing" x="168" y="596" width="58" height="114" rx="2" />

    <!-- South Outer Workshops (Upper - WC-S2, S-011B to Workshop, WC-S1, aligned to x=580) -->
    <rect class="building-wing" x="522" y="266" width="60" height="172" rx="2" />

    <!-- South Outer Labs (Lower - Materials to Manufacturing to Faculty, aligned to x=580) -->
    <rect class="building-wing" x="522" y="444" width="60" height="134" rx="2" />

    <!-- Acharya Hall Wing (Resized & aligned to fit orange box: x=524, y=596..710) -->
    <rect class="building-wing" x="524" y="596" width="60" height="114" rx="2" />

    <!-- Connecting Bridges between Wings -->
    <rect class="building-wing" x="346" y="156" width="60" height="26" />
    <rect class="building-wing" x="216" y="266" width="310" height="10" />
    <rect class="building-wing" x="216" y="340" width="134" height="10" />
    <rect class="building-wing" x="404" y="340" width="122" height="10" />
    <rect class="building-wing" x="346" y="393" width="58" height="10" />
    <rect class="building-wing" x="256" y="503" width="270" height="10" />
    `,
    courtyardsHtml: `
<!-- 1) Grand Central Courtyard - Upper Atrium -->
    <rect class="courtyard-patio" x="352" y="180" width="48" height="308" rx="3" />
    <text x="376" y="260" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 260)" font-weight="600" letter-spacing="1.5">OPEN ATRIUM</text>
    <text x="376" y="420" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 420)" font-weight="600" letter-spacing="1.5">OPEN ATRIUM</text>

    <!-- 2) Grand Central Courtyard - Lower Quadrangle (Reaches corridor at y=688) -->
    <rect class="courtyard-patio" x="352" y="518" width="48" height="170" rx="3" />
    <text x="376" y="594" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 594)" font-weight="600" letter-spacing="1.5">CENTRAL COURTYARD</text>

    <!-- CAD Architectural Dimension Line: 10782 mm -->
    <g class="courtyard-dimension-group">
      <line class="dimension-line" x1="353" y1="624" x2="399" y2="624" />
      <line class="dimension-tick" x1="353" y1="619" x2="353" y2="629" />
      <line class="dimension-tick" x1="399" y1="619" x2="399" y2="629" />
      <polygon points="353,624 357.5,622 357.5,626" fill="rgba(56, 189, 248, 0.75)" />
      <polygon points="399,624 394.5,622 394.5,626" fill="rgba(56, 189, 248, 0.75)" />
      <text class="dimension-text" x="376" y="619" text-anchor="middle" transform="rotate(-90 376 619)">10782 mm</text>
    </g>

    <!-- 3) North Light-Well Gap -->
    <rect class="lightwell-gap" x="228" y="278" width="72" height="132" rx="3" />
    <text x="264" y="344" text-anchor="middle" font-size="5" fill="rgba(56, 189, 248, 0.55)" transform="rotate(-90 264 344)" font-weight="600" letter-spacing="1">LIGHT WELL</text>

    <!-- 4) North Breezeway Gap -->
    <rect class="breezeway-gap" x="228" y="574" width="74" height="114" rx="3" />
    <text x="265" y="631" text-anchor="middle" font-size="5" fill="rgba(148, 163, 184, 0.55)" transform="rotate(-90 265 631)" font-weight="600" letter-spacing="1">BREEZEWAY</text>

    <!-- 5) South Light-Well Gap -->
    <rect class="lightwell-gap" x="448" y="280" width="70" height="158" rx="3" />
    <text x="483" y="360" text-anchor="middle" font-size="5" fill="rgba(56, 189, 248, 0.55)" transform="rotate(-90 483 360)" font-weight="600" letter-spacing="1">LIGHT WELL</text>

    <!-- 6) South Breezeway Gap -->
    <rect class="breezeway-gap" x="448" y="574" width="70" height="114" rx="3" />
    <text x="483" y="631" text-anchor="middle" font-size="5" fill="rgba(148, 163, 184, 0.55)" transform="rotate(-90 483 631)" font-weight="600" letter-spacing="1">BREEZEWAY</text>

    <!-- 7) Patios Flanking Lower Wings -->
    <rect class="courtyard-patio" x="168" y="744" width="92" height="42" rx="2" />
    <rect class="courtyard-patio" x="484" y="744" width="98" height="42" rx="2" />

    <!-- 8) SW Labs Inner Courtyard / Open Patio -->
    <rect class="courtyard-patio" x="148" y="496" width="110" height="26" rx="2" />
    <text x="203" y="511" text-anchor="middle" font-size="5" fill="rgba(16, 185, 129, 0.6)" font-weight="600" letter-spacing="1">COURTYARD</text>
    `,
    corridorsHtml: `
<!-- Admin Transverse Grand Cross Corridor (Single clean pathway above green line at y=696) -->
    <rect class="corridor-floor" x="224" y="688" width="302" height="18" rx="1" />
    <line class="corridor-centerline" x1="222" y1="696" x2="526" y2="696" />

    <!-- Amritheswari East Breezeway Pathway (White line in user sketch) -->
    <rect class="corridor-floor" x="227" y="600" width="10" height="96" rx="1" />
    <line class="corridor-centerline" x1="232" y1="600" x2="232" y2="696" />

    <!-- Acharya West Breezeway Pathway (White line in user sketch) -->
    <rect class="corridor-floor" x="513" y="600" width="10" height="96" rx="1" />
    <line class="corridor-centerline" x1="518" y1="600" x2="518" y2="696" />

    <!-- North Spine Veranda Corridor (Single clean pathway along N-block rooms) -->
    <rect class="corridor-floor" x="346" y="162" width="8" height="534" />
    <line class="corridor-centerline" x1="350" y1="162" x2="350" y2="696" />

    <!-- South Spine Veranda Corridor (Single clean pathway along S-block rooms) -->
    <rect class="corridor-floor" x="396" y="162" width="9" height="534" />
    <line class="corridor-centerline" x1="404" y1="162" x2="404" y2="696" />

    <!-- Top Bridge across Atrium -->
    <rect class="corridor-floor" x="346" y="162" width="59" height="16" rx="1" />
    <line class="corridor-centerline" x1="350" y1="170" x2="404" y2="170" />

    <!-- Transverse Upper Cross Passage (WC-N2 across Atrium to WC-S2 - Top orange line) -->
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
    <line class="corridor-centerline" x1="350" y1="398" x2="404" y2="398" />



    <!-- North Outer Lab Corridor -->
    <rect class="corridor-floor" x="216" y="266" width="10" height="146" rx="1" />
    <line class="corridor-centerline" x1="221" y1="266" x2="221" y2="406" />

    <!-- South Outer Workshops Corridor -->
    <rect class="corridor-floor" x="518" y="266" width="10" height="168" rx="1" />
    <line class="corridor-centerline" x1="523" y1="266" x2="523" y2="430" />

    <!-- South Outer Labs Corridor -->
    <rect class="corridor-floor" x="518" y="444" width="10" height="130" rx="1" />
    <line class="corridor-centerline" x1="523" y1="444" x2="523" y2="574" />

    <!-- SW Labs 2-Way Loop Corridor (North & South walkways along yellow lines) -->
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

    <!-- Transverse Lower Cross Passage (Bottom orange line - SW Labs across courtyard to S-MFG) -->
    <rect class="corridor-floor" x="258" y="503" width="268" height="10" rx="1" />
    <line class="corridor-centerline" x1="262" y1="508" x2="523" y2="508" />

    <!-- Main Entrance & Reception Foyer -->
    <rect class="corridor-floor" x="368" y="846" width="12" height="15" rx="1" />
    <line class="corridor-centerline" x1="374" y1="808" x2="374" y2="861" />
    `,
    graph: {}
  },

  2: {
    id: 2,
    name: 'Second Floor',
    shortName: '2ND',
    badge: 'Amritapuri Campus • Second Floor',
    rooms: [

  // ---------- ADMIN BLOCK (A) - 2ND FLOOR ----------
  { id: 'A207', code: 'A207', name: 'Central Hall A207', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 326, y: 708, w: 96, h: 102, door: [374, 708], desc: 'Unified central 2nd floor auditorium, assembly hall, and conference venue.' },
  { id: 'A203-2', code: 'A203', name: 'Office A203', wing: 'Admin Block (A)', category: 'OFFICE', x: 422, y: 708, w: 26, h: 44, door: [435, 708], desc: 'Administrative staff and faculty advisory office suite.' },
  { id: 'LANG-LAB', code: 'LANG', name: 'Language Lab', wing: 'Admin Block (A)', category: 'LAB', x: 448, y: 708, w: 38, h: 76, door: [467, 708], desc: 'Audio-visual digital language learning, communication skills, and phonetics lab.' },
  { id: 'WC-LADIES-ADMIN-2', code: 'WC-L1', name: 'Ladies Restroom', wing: 'Admin Block (A)', category: 'TOILET', x: 486, y: 708, w: 38, h: 42, door: [505, 708], desc: 'Ladies washroom facility adjacent to Language Lab.' },
  { id: 'A201A', code: 'A201A', name: 'Lecture Hall A201A', wing: 'Admin Block (A)', category: 'CLASSROOM', x: 526, y: 600, w: 56, h: 36, door: [526, 618], desc: 'Academic classroom & lecture hall A201A.' },
  { id: 'A201B', code: 'A201B', name: 'Lecture Hall A201B', wing: 'Admin Block (A)', category: 'CLASSROOM', x: 526, y: 636, w: 56, h: 36, door: [526, 654], desc: 'Academic classroom & lecture hall A201B.' },
  { id: 'A201C', code: 'A201C', name: 'Lecture Hall A201C', wing: 'Admin Block (A)', category: 'CLASSROOM', x: 526, y: 672, w: 56, h: 36, door: [526, 690], desc: 'Academic classroom & lecture hall A201C.' },
  { id: 'A206', code: 'A206', name: 'Hall A206', wing: 'Admin Block (A)', category: 'CLASSROOM', x: 262, y: 708, w: 38, h: 76, door: [281, 708], desc: 'Multi-purpose academic lecture hall A206.' },
  { id: 'ETH-HACK', code: 'ETH-HACK', name: 'Ethical Hacking Club', wing: 'Admin Block (A)', category: 'ROOM', x: 300, y: 708, w: 26, h: 44, door: [313, 708], desc: 'Cybersecurity research and Ethical Hacking Club laboratory.' },
  { id: 'WC-GENS-ADMIN-2', code: 'WC-G1', name: 'Gents Restroom', wing: 'Admin Block (A)', category: 'TOILET', x: 224, y: 708, w: 38, h: 42, door: [243, 708], desc: 'Gents washroom facility adjacent to Hall A206.' },
  { id: 'A207A', code: 'A207A', name: 'Lecture Hall A207A', wing: 'Admin Block (A)', category: 'CLASSROOM', x: 168, y: 600, w: 56, h: 36, door: [224, 618], desc: 'Academic classroom & lecture hall A207A.' },
  { id: 'A207B', code: 'A207B', name: 'Lecture Hall A207B', wing: 'Admin Block (A)', category: 'CLASSROOM', x: 168, y: 636, w: 56, h: 36, door: [224, 654], desc: 'Academic classroom & lecture hall A207B.' },
  { id: 'A207C', code: 'A207C', name: 'Lecture Hall A207C', wing: 'Admin Block (A)', category: 'CLASSROOM', x: 168, y: 672, w: 56, h: 36, door: [224, 690], desc: 'Academic classroom & lecture hall A207C.' },

  // ---------- NORTHERN WING (N) - CENTRAL SPINE (2ND FL) ----------
  { id: 'N201', code: 'N201', name: 'Classroom N201', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 306, y: 590, w: 40, h: 36, door: [346, 608], desc: 'Undergraduate engineering classroom.' },
  { id: 'N202', code: 'N202', name: 'Classroom N202', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 306, y: 560, w: 40, h: 28, door: [346, 574], desc: 'Undergraduate engineering classroom.' },
  { id: 'N203', code: 'N203', name: 'Classroom N203', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 306, y: 530, w: 40, h: 28, door: [346, 544], desc: 'Undergraduate engineering classroom.' },
  { id: '205A', code: '205A', name: 'Faculty Cabin 205A', wing: 'Northern Wing (N)', category: 'FACULTY', x: 306, y: 489, w: 40, h: 13, door: [346, 495], desc: 'Faculty research and consultation room.' },
  { id: '205B', code: '205B', name: 'Faculty Cabin 205B', wing: 'Northern Wing (N)', category: 'FACULTY', x: 306, y: 476, w: 40, h: 13, door: [346, 482], desc: 'Faculty research and consultation room.' },
  { id: '205C', code: '205C', name: 'Faculty Cabin 205C', wing: 'Northern Wing (N)', category: 'FACULTY', x: 306, y: 462, w: 40, h: 14, door: [346, 469], desc: 'Faculty research and consultation room.' },
  { id: 'N206', code: 'N206', name: 'Classroom N206', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 306, y: 414, w: 40, h: 38, door: [346, 433], desc: 'Departmental seminar and lecture classroom.' },
  { id: 'N207', code: 'N207', name: 'Classroom N207', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 306, y: 382, w: 40, h: 32, door: [346, 398], desc: 'Departmental seminar and lecture classroom.' },
  { id: 'N208', code: 'N208', name: 'Classroom N208', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 306, y: 350, w: 40, h: 32, door: [346, 366], desc: 'Departmental seminar and lecture classroom.' },
  { id: 'N210', code: 'N210', name: 'Academic Office N210', wing: 'Northern Wing (N)', category: 'OFFICE', x: 304, y: 278, w: 42, h: 48, door: [346, 300], desc: 'Department of Computer Science & Academic Offices.' },
  { id: 'N211A', code: 'N211A', name: 'Classroom N211A', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 304, y: 228, w: 42, h: 36, door: [346, 246], desc: 'Advanced lecture classroom N211A.' },
  { id: 'N211B', code: 'N211B', name: 'Classroom N211B', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 304, y: 192, w: 42, h: 36, door: [346, 210], desc: 'Advanced lecture classroom N211B.' },
  { id: 'N211C', code: 'N211C', name: 'Classroom N211C', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 304, y: 156, w: 42, h: 36, door: [346, 174], desc: 'Advanced lecture classroom N211C.' },

  // ---------- SOUTHERN WING (S) - CENTRAL SPINE (2ND FL) ----------
  { id: 'S201', code: 'S201', name: 'Classroom S201', wing: 'Southern Wing (S)', category: 'CLASSROOM', x: 405, y: 590, w: 40, h: 36, door: [405, 608], desc: 'Undergraduate engineering classroom.' },
  { id: 'S202', code: 'S202', name: 'Classroom S202', wing: 'Southern Wing (S)', category: 'CLASSROOM', x: 405, y: 560, w: 40, h: 28, door: [405, 574], desc: 'Undergraduate engineering classroom.' },
  { id: 'S203', code: 'S203', name: 'Classroom S203', wing: 'Southern Wing (S)', category: 'CLASSROOM', x: 405, y: 530, w: 40, h: 28, door: [405, 544], desc: 'Undergraduate engineering classroom.' },
  { id: 'STAFF-205', code: 'STAFF', name: 'Staff Room', wing: 'Southern Wing (S)', category: 'FACULTY', x: 405, y: 489, w: 40, h: 13, door: [405, 495], desc: 'Faculty and departmental staff room.' },
  { id: 'S205B', code: 'S205B', name: 'Faculty Cabin S205B', wing: 'Southern Wing (S)', category: 'FACULTY', x: 405, y: 476, w: 40, h: 13, door: [405, 482], desc: 'Faculty research and consultation room.' },
  { id: 'S205C', code: 'S205C', name: 'Faculty Cabin S205C', wing: 'Southern Wing (S)', category: 'FACULTY', x: 405, y: 462, w: 40, h: 14, door: [405, 469], desc: 'Faculty research and consultation room.' },
  { id: 'S206', code: 'S206', name: 'Classroom S206', wing: 'Southern Wing (S)', category: 'CLASSROOM', x: 405, y: 414, w: 40, h: 38, door: [405, 433], desc: 'Departmental seminar and lecture classroom.' },
  { id: 'S207', code: 'S207', name: 'Classroom S207', wing: 'Southern Wing (S)', category: 'CLASSROOM', x: 405, y: 350, w: 40, h: 64, door: [405, 382], desc: 'Large lecture auditorium S207.' },
  { id: 'S210A', code: 'S210A', name: 'Faculty Cabin S210A', wing: 'Southern Wing (S)', category: 'FACULTY', x: 405, y: 300, w: 40, h: 26, door: [405, 313], desc: 'Faculty research and consultation room.' },
  { id: 'S210B', code: 'S210B', name: 'Faculty Cabin S210B', wing: 'Southern Wing (S)', category: 'FACULTY', x: 405, y: 274, w: 40, h: 26, door: [405, 287], desc: 'Faculty research and consultation room.' },
  { id: 'S211A', code: 'S211A', name: 'Classroom S211A', wing: 'Southern Wing (S)', category: 'CLASSROOM', x: 405, y: 240, w: 45, h: 28, door: [405, 254], desc: 'Advanced lecture classroom S211A.' },
  { id: 'S211B', code: 'S211B', name: 'Classroom S211B', wing: 'Southern Wing (S)', category: 'CLASSROOM', x: 405, y: 212, w: 45, h: 28, door: [405, 226], desc: 'Advanced lecture classroom S211B.' },
  { id: 'S212A', code: 'S212A', name: 'Classroom S212A', wing: 'Southern Wing (S)', category: 'CLASSROOM', x: 405, y: 184, w: 45, h: 28, door: [405, 198], desc: 'Advanced lecture classroom S212A.' },
  { id: 'S212B', code: 'S212B', name: 'Classroom S212B', wing: 'Southern Wing (S)', category: 'CLASSROOM', x: 405, y: 156, w: 45, h: 28, door: [405, 170], desc: 'Advanced lecture classroom S212B.' },

  // ---------- MID-WEST N204 BLOCK (2ND FL) ----------
  { id: 'N204G', code: 'N204G', name: 'Classroom N204G', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 144, y: 448, w: 26, h: 40, door: [157, 488], desc: 'Academic classroom N204G.' },
  { id: 'N204H', code: 'N204H', name: 'Classroom N204H', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 170, y: 448, w: 22, h: 40, door: [181, 488], desc: 'Academic classroom N204H.' },
  { id: 'N204I', code: 'N204I', name: 'Classroom N204I', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 192, y: 448, w: 22, h: 40, door: [203, 488], desc: 'Academic classroom N204I.' },
  { id: 'N204J', code: 'N204J', name: 'Classroom N204J', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 214, y: 448, w: 22, h: 40, door: [225, 488], desc: 'Academic classroom N204J.' },
  { id: 'N204K', code: 'N204K', name: 'Classroom N204K', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 236, y: 448, w: 28, h: 40, door: [250, 488], desc: 'Academic classroom N204K.' },
  { id: 'N204F', code: 'N204F', name: 'Classroom N204F', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 144, y: 526, w: 20, h: 40, door: [154, 526], desc: 'Academic classroom N204F.' },
  { id: 'N204E', code: 'N204E', name: 'Classroom N204E', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 164, y: 526, w: 20, h: 40, door: [174, 526], desc: 'Academic classroom N204E.' },
  { id: 'N204D', code: 'N204D', name: 'Classroom N204D', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 184, y: 526, w: 20, h: 40, door: [194, 526], desc: 'Academic classroom N204D.' },
  { id: 'N204C', code: 'N204C', name: 'Classroom N204C', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 204, y: 526, w: 20, h: 40, door: [214, 526], desc: 'Academic classroom N204C.' },
  { id: 'N204B', code: 'N204B', name: 'Classroom N204B', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 224, y: 526, w: 20, h: 40, door: [234, 526], desc: 'Academic classroom N204B.' },
  { id: 'N204A', code: 'N204A', name: 'Classroom N204A', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 244, y: 526, w: 20, h: 40, door: [254, 526], desc: 'Academic classroom N204A.' },
  { id: 'WC-GENS-MID-2', code: 'WC-G2', name: 'Gents Toilet (Mid-West)', wing: 'Northern Wing (N)', category: 'TOILET', x: 96, y: 488, w: 38, h: 36, door: [134, 506], desc: 'Gents washroom and sanitary facility.' },

  // ---------- MID-EAST S204 BLOCK (2ND FL) ----------
  { id: 'S204G', code: 'S204G', name: 'Lab / Classroom S204G', wing: 'Southern Wing (S)', category: 'CLASSROOM', x: 526, y: 448, w: 56, h: 38, door: [526, 467], desc: 'Advanced engineering laboratory and seminar hall.' },
  { id: 'S204-AF', code: 'S204', name: 'S204 A to F Hall', wing: 'Southern Wing (S)', category: 'LAB', x: 526, y: 486, w: 56, h: 86, door: [526, 520], desc: 'Computing complex and combined multi-sectional academic hall.' },
  { id: 'WC-LADIES-MID-2', code: 'WC-L2', name: 'Ladies Restroom (Mid-East)', wing: 'Southern Wing (S)', category: 'TOILET', x: 526, y: 396, w: 56, h: 26, door: [526, 409], desc: 'Ladies washroom facility.' },

  // ---------- UPPER-WEST N209 BLOCK (2ND FL) ----------
  { id: 'WC-GENS-UPPER-2', code: 'WC-G3', name: 'Gents Restroom (Upper-West)', wing: 'Northern Wing (N)', category: 'TOILET', x: 168, y: 260, w: 48, h: 26, door: [216, 271], desc: 'Upper Gents washroom with sanitary facilities.' },
  { id: 'N209E', code: 'N209E', name: 'Classroom N209E', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 168, y: 286, w: 48, h: 25, door: [216, 298], desc: 'Academic classroom N209E.' },
  { id: 'N209D', code: 'N209D', name: 'Classroom N209D', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 168, y: 311, w: 48, h: 25, door: [216, 323], desc: 'Academic classroom N209D.' },
  { id: 'N209C', code: 'N209C', name: 'Classroom N209C', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 168, y: 336, w: 48, h: 25, door: [216, 348], desc: 'Academic classroom N209C.' },
  { id: 'N209B', code: 'N209B', name: 'Classroom N209B', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 168, y: 361, w: 48, h: 25, door: [216, 373], desc: 'Academic classroom N209B.' },
  { id: 'N209A', code: 'N209A', name: 'Classroom N209A', wing: 'Northern Wing (N)', category: 'CLASSROOM', x: 168, y: 386, w: 48, h: 24, door: [216, 398], desc: 'Academic classroom N209A.' },

  // ---------- UPPER-EAST UNESCO BLOCK (2ND FL) ----------
  { id: 'WC-LADIES-UPPER-2', code: 'WC-L3', name: 'Ladies Restroom (Upper-East)', wing: 'Southern Wing (S)', category: 'TOILET', x: 526, y: 240, w: 56, h: 32, door: [526, 256], desc: 'Upper Ladies washroom facility.' },
  { id: 'UNESCO-CHAIR', code: 'UNESCO', name: 'UNESCO Assistive Tech Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 526, y: 274, w: 56, h: 96, door: [526, 322], desc: 'UNESCO Chair on Assistive Technology & Education Room research lab.' }

    ].map(r => ({ ...r, floor: 2 })),
    waypoints: {
// Admin Base
  wp_f2_admin_w_wing: { id: 'wp_f2_admin_w_wing', x: 224, y: 696, label: 'Admin West Wing Base' },
  wp_f2_admin_w_junc: { id: 'wp_f2_admin_w_junc', x: 262, y: 696, label: 'Admin West Junction' },
  wp_f2_stair_admin_w: { id: 'wp_f2_stair_admin_w', x: 268, y: 696, label: 'Admin West Stairs (2nd Fl)' },
  wp_f2_spine_w_bottom: { id: 'wp_f2_spine_w_bottom', x: 350, y: 696, label: 'West Spine Base' },
  wp_f2_admin_center: { id: 'wp_f2_admin_center', x: 374, y: 696, label: 'Admin Center Lobby' },
  wp_f2_spine_e_bottom: { id: 'wp_f2_spine_e_bottom', x: 404, y: 696, label: 'East Spine Base' },
  wp_f2_stair_admin_e: { id: 'wp_f2_stair_admin_e', x: 486, y: 696, label: 'Admin East Stairs (2nd Fl)' },
  wp_f2_admin_e_junc: { id: 'wp_f2_admin_e_junc', x: 492, y: 696, label: 'Admin East Junction' },
  wp_f2_admin_e_wing: { id: 'wp_f2_admin_e_wing', x: 526, y: 696, label: 'Admin East Wing Base' },

  // Admin Wings (Vertical)
  wp_f2_a207a: { id: 'wp_f2_a207a', x: 224, y: 618, label: 'Outside A207A' },
  wp_f2_a207b: { id: 'wp_f2_a207b', x: 224, y: 654, label: 'Outside A207B' },
  wp_f2_a207c: { id: 'wp_f2_a207c', x: 224, y: 690, label: 'Outside A207C' },

  wp_f2_a201a: { id: 'wp_f2_a201a', x: 526, y: 618, label: 'Outside A201A' },
  wp_f2_a201b: { id: 'wp_f2_a201b', x: 526, y: 654, label: 'Outside A201B' },
  wp_f2_a201c: { id: 'wp_f2_a201c', x: 526, y: 690, label: 'Outside A201C' },

  // West Spine
  wp_f2_n201: { id: 'wp_f2_n201', x: 350, y: 608, label: 'Outside N201' },
  wp_f2_n202: { id: 'wp_f2_n202', x: 350, y: 574, label: 'Outside N202' },
  wp_f2_n203: { id: 'wp_f2_n203', x: 350, y: 544, label: 'Outside N203' },
  wp_f2_spine_w_cross_lower: { id: 'wp_f2_spine_w_cross_lower', x: 350, y: 508, label: 'West Spine Lower Cross' },
  wp_f2_205: { id: 'wp_f2_205', x: 350, y: 482, label: 'Outside 205 Cabins' },
  wp_f2_n206: { id: 'wp_f2_n206', x: 350, y: 433, label: 'Outside N206' },
  wp_f2_spine_w_mid_bridge: { id: 'wp_f2_spine_w_mid_bridge', x: 350, y: 405, label: 'West Spine Mid Bridge' },
  wp_f2_n207: { id: 'wp_f2_n207', x: 350, y: 398, label: 'Outside N207' },
  wp_f2_n208: { id: 'wp_f2_n208', x: 350, y: 366, label: 'Outside N208' },
  wp_f2_spine_w_mid_west: { id: 'wp_f2_spine_w_mid_west', x: 350, y: 345, label: 'West Spine Mid West Passage' },
  wp_f2_n210: { id: 'wp_f2_n210', x: 350, y: 300, label: 'Outside N210' },
  wp_f2_spine_w_cross_upper: { id: 'wp_f2_spine_w_cross_upper', x: 350, y: 271, label: 'West Spine Upper Cross' },
  wp_f2_n211a: { id: 'wp_f2_n211a', x: 350, y: 246, label: 'Outside N211A' },
  wp_f2_n211b: { id: 'wp_f2_n211b', x: 350, y: 210, label: 'Outside N211B' },
  wp_f2_n211c: { id: 'wp_f2_n211c', x: 350, y: 174, label: 'Outside N211C' },
  wp_f2_spine_w_top: { id: 'wp_f2_spine_w_top', x: 350, y: 170, label: 'West Spine Top' },

  // East Spine
  wp_f2_s201: { id: 'wp_f2_s201', x: 404, y: 608, label: 'Outside S201' },
  wp_f2_s202: { id: 'wp_f2_s202', x: 404, y: 574, label: 'Outside S202' },
  wp_f2_s203: { id: 'wp_f2_s203', x: 404, y: 544, label: 'Outside S203' },
  wp_f2_spine_e_cross_lower: { id: 'wp_f2_spine_e_cross_lower', x: 404, y: 508, label: 'East Spine Lower Cross' },
  wp_f2_s205: { id: 'wp_f2_s205', x: 404, y: 482, label: 'Outside S205 / Staff' },
  wp_f2_s206: { id: 'wp_f2_s206', x: 404, y: 433, label: 'Outside S206' },
  wp_f2_spine_e_mid_bridge: { id: 'wp_f2_spine_e_mid_bridge', x: 404, y: 405, label: 'East Spine Mid Bridge' },
  wp_f2_s207: { id: 'wp_f2_s207', x: 404, y: 382, label: 'Outside S207' },
  wp_f2_spine_e_mid_east: { id: 'wp_f2_spine_e_mid_east', x: 404, y: 345, label: 'East Spine Mid East' },
  wp_f2_s210: { id: 'wp_f2_s210', x: 404, y: 300, label: 'Outside S210' },
  wp_f2_spine_e_cross_upper: { id: 'wp_f2_spine_e_cross_upper', x: 404, y: 271, label: 'East Spine Upper Cross' },
  wp_f2_s211a: { id: 'wp_f2_s211a', x: 404, y: 240, label: 'Outside S211A' },
  wp_f2_s211b: { id: 'wp_f2_s211b', x: 404, y: 212, label: 'Outside S211B' },
  wp_f2_s212a: { id: 'wp_f2_s212a', x: 404, y: 184, label: 'Outside S212A' },
  wp_f2_spine_e_top: { id: 'wp_f2_spine_e_top', x: 404, y: 170, label: 'East Spine Top' },

  // Top Bridge & Stairs
  wp_f2_north_stair: { id: 'wp_f2_north_stair', x: 374, y: 170, label: 'North Stairs (2nd Fl)' },

  // Mid Cross Bridge
  wp_f2_mid_bridge_center: { id: 'wp_f2_mid_bridge_center', x: 374, y: 405, label: 'Mid Bridge Center' },

  // Lower Cross & Mid Stairs
  wp_f2_mid_stair: { id: 'wp_f2_mid_stair', x: 374, y: 508, label: 'Central Mid Stairs (2nd Fl)' },

  // N204 Courtyard Loop (Mid-West)
  wp_f2_n204_exit: { id: 'wp_f2_n204_exit', x: 262, y: 508, label: 'N204 East Exit' },
  wp_f2_n204_ne: { id: 'wp_f2_n204_ne', x: 262, y: 492, label: 'N204 North-East Corner' },
  wp_f2_n204_se: { id: 'wp_f2_n204_se', x: 262, y: 526, label: 'N204 South-East Corner' },
  wp_f2_n204_nw: { id: 'wp_f2_n204_nw', x: 144, y: 492, label: 'N204 North-West Corner' },
  wp_f2_n204_sw: { id: 'wp_f2_n204_sw', x: 144, y: 526, label: 'N204 South-West Corner' },
  wp_f2_n204_w_mid: { id: 'wp_f2_n204_w_mid', x: 144, y: 506, label: 'N204 West Vestibule' },
  wp_f2_n204_toilet: { id: 'wp_f2_n204_toilet', x: 134, y: 506, label: 'Outside WC-G2 (Mid)' },

  // N204 Corridor Waypoints along top and bottom
  wp_f2_n204_top_mid: { id: 'wp_f2_n204_top_mid', x: 203, y: 492, label: 'N204 Top Hallway' },
  wp_f2_n204_bot_mid: { id: 'wp_f2_n204_bot_mid', x: 203, y: 526, label: 'N204 Bottom Hallway' },

  // S204 Block (Mid-East)
  wp_f2_s204_exit: { id: 'wp_f2_s204_exit', x: 523, y: 508, label: 'S204 Hallway Junction' },
  wp_f2_s204_g: { id: 'wp_f2_s204_g', x: 523, y: 467, label: 'Outside S204G' },
  wp_f2_s204_wc: { id: 'wp_f2_s204_wc', x: 523, y: 409, label: 'Outside WC-L2 (Mid)' },
  wp_f2_s204_af: { id: 'wp_f2_s204_af', x: 523, y: 530, label: 'Outside S204 A to F' },

  // Upper West N209 Block
  wp_f2_n209_wc: { id: 'wp_f2_n209_wc', x: 221, y: 271, label: 'Outside WC-G3 (Upper)' },
  wp_f2_n209_e: { id: 'wp_f2_n209_e', x: 221, y: 298, label: 'Outside N209E' },
  wp_f2_n209_d: { id: 'wp_f2_n209_d', x: 221, y: 323, label: 'Outside N209D' },
  wp_f2_n209_mid: { id: 'wp_f2_n209_mid', x: 221, y: 345, label: 'N209 Mid Junction' },
  wp_f2_n209_c: { id: 'wp_f2_n209_c', x: 221, y: 348, label: 'Outside N209C' },
  wp_f2_n209_b: { id: 'wp_f2_n209_b', x: 221, y: 373, label: 'Outside N209B' },
  wp_f2_n209_a: { id: 'wp_f2_n209_a', x: 221, y: 398, label: 'Outside N209A' },

  // Upper East UNESCO Block
  wp_f2_unesco_wc: { id: 'wp_f2_unesco_wc', x: 523, y: 256, label: 'Outside WC-L3 (Upper)' },
  wp_f2_unesco_junc: { id: 'wp_f2_unesco_junc', x: 523, y: 271, label: 'UNESCO Upper Cross Junction' },
  wp_f2_unesco_door: { id: 'wp_f2_unesco_door', x: 523, y: 322, label: 'Outside UNESCO Lab' },
  wp_f2_unesco_mid: { id: 'wp_f2_unesco_mid', x: 523, y: 345, label: 'UNESCO Mid Cross Junction' }
    },
    edges: [
// Admin Bottom Corridor
  ['wp_f2_admin_w_wing', 'wp_f2_admin_w_junc'],
  ['wp_f2_admin_w_junc', 'wp_f2_stair_admin_w'],
  ['wp_f2_stair_admin_w', 'wp_f2_spine_w_bottom'],
  ['wp_f2_spine_w_bottom', 'wp_f2_admin_center'],
  ['wp_f2_admin_center', 'wp_f2_spine_e_bottom'],
  ['wp_f2_spine_e_bottom', 'wp_f2_stair_admin_e'],
  ['wp_f2_stair_admin_e', 'wp_f2_admin_e_junc'],
  ['wp_f2_admin_e_junc', 'wp_f2_admin_e_wing'],

  // Admin Wings (Vertical)
  ['wp_f2_admin_w_wing', 'wp_f2_a207c'],
  ['wp_f2_a207c', 'wp_f2_a207b'],
  ['wp_f2_a207b', 'wp_f2_a207a'],

  ['wp_f2_admin_e_wing', 'wp_f2_a201c'],
  ['wp_f2_a201c', 'wp_f2_a201b'],
  ['wp_f2_a201b', 'wp_f2_a201a'],

  // West Spine
  ['wp_f2_spine_w_bottom', 'wp_f2_n201'],
  ['wp_f2_n201', 'wp_f2_n202'],
  ['wp_f2_n202', 'wp_f2_n203'],
  ['wp_f2_n203', 'wp_f2_spine_w_cross_lower'],
  ['wp_f2_spine_w_cross_lower', 'wp_f2_205'],
  ['wp_f2_205', 'wp_f2_n206'],
  ['wp_f2_n206', 'wp_f2_spine_w_mid_bridge'],
  ['wp_f2_spine_w_mid_bridge', 'wp_f2_n207'],
  ['wp_f2_n207', 'wp_f2_n208'],
  ['wp_f2_n208', 'wp_f2_spine_w_mid_west'],
  ['wp_f2_spine_w_mid_west', 'wp_f2_n210'],
  ['wp_f2_n210', 'wp_f2_spine_w_cross_upper'],
  ['wp_f2_spine_w_cross_upper', 'wp_f2_n211a'],
  ['wp_f2_n211a', 'wp_f2_n211b'],
  ['wp_f2_n211b', 'wp_f2_n211c'],
  ['wp_f2_n211c', 'wp_f2_spine_w_top'],

  // East Spine
  ['wp_f2_spine_e_bottom', 'wp_f2_s201'],
  ['wp_f2_s201', 'wp_f2_s202'],
  ['wp_f2_s202', 'wp_f2_s203'],
  ['wp_f2_s203', 'wp_f2_spine_e_cross_lower'],
  ['wp_f2_spine_e_cross_lower', 'wp_f2_s205'],
  ['wp_f2_s205', 'wp_f2_s206'],
  ['wp_f2_s206', 'wp_f2_spine_e_mid_bridge'],
  ['wp_f2_spine_e_mid_bridge', 'wp_f2_s207'],
  ['wp_f2_s207', 'wp_f2_spine_e_mid_east'],
  ['wp_f2_spine_e_mid_east', 'wp_f2_s210'],
  ['wp_f2_s210', 'wp_f2_spine_e_cross_upper'],
  ['wp_f2_spine_e_cross_upper', 'wp_f2_s211a'],
  ['wp_f2_s211a', 'wp_f2_s211b'],
  ['wp_f2_s211b', 'wp_f2_s212a'],
  ['wp_f2_s212a', 'wp_f2_spine_e_top'],

  // Top Bridge
  ['wp_f2_spine_w_top', 'wp_f2_north_stair'],
  ['wp_f2_north_stair', 'wp_f2_spine_e_top'],

  // Mid Cross Bridge
  ['wp_f2_spine_w_mid_bridge', 'wp_f2_mid_bridge_center'],
  ['wp_f2_mid_bridge_center', 'wp_f2_spine_e_mid_bridge'],

  // Lower Cross Passage & Mid Stairs
  ['wp_f2_n204_exit', 'wp_f2_spine_w_cross_lower'],
  ['wp_f2_spine_w_cross_lower', 'wp_f2_mid_stair'],
  ['wp_f2_mid_stair', 'wp_f2_spine_e_cross_lower'],
  ['wp_f2_spine_e_cross_lower', 'wp_f2_s204_exit'],

  // N204 Courtyard Loop
  ['wp_f2_n204_exit', 'wp_f2_n204_ne'],
  ['wp_f2_n204_exit', 'wp_f2_n204_se'],
  ['wp_f2_n204_ne', 'wp_f2_n204_top_mid'],
  ['wp_f2_n204_top_mid', 'wp_f2_n204_nw'],
  ['wp_f2_n204_nw', 'wp_f2_n204_w_mid'],
  ['wp_f2_n204_w_mid', 'wp_f2_n204_toilet'],
  ['wp_f2_n204_w_mid', 'wp_f2_n204_sw'],
  ['wp_f2_n204_sw', 'wp_f2_n204_bot_mid'],
  ['wp_f2_n204_bot_mid', 'wp_f2_n204_se'],

  // S204 Block
  ['wp_f2_s204_wc', 'wp_f2_s204_g'],
  ['wp_f2_s204_g', 'wp_f2_s204_exit'],
  ['wp_f2_s204_exit', 'wp_f2_s204_af'],

  // Upper Cross Passage
  ['wp_f2_n209_wc', 'wp_f2_spine_w_cross_upper'],
  ['wp_f2_spine_w_cross_upper', 'wp_f2_spine_e_cross_upper'],
  ['wp_f2_spine_e_cross_upper', 'wp_f2_unesco_junc'],

  // Upper West N209 Corridor
  ['wp_f2_n209_wc', 'wp_f2_n209_e'],
  ['wp_f2_n209_e', 'wp_f2_n209_d'],
  ['wp_f2_n209_d', 'wp_f2_n209_mid'],
  ['wp_f2_n209_mid', 'wp_f2_n209_c'],
  ['wp_f2_n209_c', 'wp_f2_n209_b'],
  ['wp_f2_n209_b', 'wp_f2_n209_a'],
  ['wp_f2_n209_mid', 'wp_f2_spine_w_mid_west'],

  // Upper East UNESCO Corridor
  ['wp_f2_unesco_wc', 'wp_f2_unesco_junc'],
  ['wp_f2_unesco_junc', 'wp_f2_unesco_door'],
  ['wp_f2_unesco_door', 'wp_f2_unesco_mid'],
  ['wp_f2_unesco_mid', 'wp_f2_spine_e_mid_east']
    ],
    stairs: [
      { x: 368, y: 491, w: 14, h: 16, steps: 5, dir: 'h' }, // Central Mid-Bridge
      { x: 368, y: 172, w: 14, h: 16, steps: 5, dir: 'h' }, // North Stairs
      { x: 262, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }, // Admin West
      { x: 486, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }  // Admin East
    ],
    buildingBaseHtml: `

    <!-- Central Main Quadrangle / Spine Core -->
    <rect class="building-wing" x="300" y="152" width="152" height="490" rx="3" />

    <!-- Admin Block Base (PRY-A, A206, A203, Language Lab, Restrooms) -->
    <rect class="building-wing" x="220" y="688" width="310" height="126" rx="3" />
    <rect class="building-wing" x="326" y="810" width="96" height="34" rx="2" />

    <!-- North Spine Wing -->
    <rect class="building-wing" x="300" y="152" width="50" height="490" rx="2" />

    <!-- South Spine Wing -->
    <rect class="building-wing" x="402" y="152" width="50" height="490" rx="2" />

    <!-- North Outer Wing (Upper - WC-G3, N209A-E, aligned to x=168) -->
    <rect class="building-wing" x="168" y="256" width="58" height="158" rx="2" />

    <!-- North Outer Wing (Lower - N204 Block) -->
    <path class="building-wing" d="
      M 144 446 L 264 446 L 264 576 L 144 576 L 144 526 L 88 526 L 88 486 L 144 486 Z
    " />

    <!-- A207 Wing (West Admin Wing: x=168, y=596..710) -->
    <rect class="building-wing" x="168" y="596" width="58" height="114" rx="2" />

    <!-- South Outer Wing (Upper - UNESCO, WC-L3, aligned to x=580) -->
    <rect class="building-wing" x="522" y="236" width="60" height="142" rx="2" />

    <!-- South Outer Wing (Lower - S204 Block, aligned to x=580) -->
    <rect class="building-wing" x="522" y="392" width="60" height="186" rx="2" />

    <!-- A201 Wing (East Admin Wing: x=524, y=596..710) -->
    <rect class="building-wing" x="524" y="596" width="60" height="114" rx="2" />

    <!-- Connecting Bridges between Wings -->
    <rect class="building-wing" x="346" y="166" width="60" height="16" />
    <rect class="building-wing" x="216" y="266" width="310" height="10" />
    <rect class="building-wing" x="216" y="340" width="134" height="10" />
    <rect class="building-wing" x="404" y="340" width="122" height="10" />
    <rect class="building-wing" x="346" y="400" width="62" height="10" />
    <rect class="building-wing" x="256" y="503" width="270" height="10" />

    `,
    courtyardsHtml: `

    <!-- 1) Grand Central Courtyard - Upper Atrium -->
    <rect class="courtyard-patio" x="352" y="156" width="48" height="240" rx="3" />
    <text x="376" y="260" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 260)" font-weight="600" letter-spacing="1.5">OPEN ATRIUM</text>

    <!-- 2) Grand Central Courtyard - Lower Atrium -->
    <rect class="courtyard-patio" x="352" y="414" width="48" height="274" rx="3" />
    <text x="376" y="550" text-anchor="middle" font-size="6" fill="rgba(16, 185, 129, 0.6)" transform="rotate(-90 376 550)" font-weight="600" letter-spacing="1.5">OPEN ATRIUM</text>

    <!-- 3) North Light-Well Gap -->
    <rect class="lightwell-gap" x="228" y="278" width="72" height="132" rx="3" />
    <text x="264" y="344" text-anchor="middle" font-size="5" fill="rgba(56, 189, 248, 0.55)" transform="rotate(-90 264 344)" font-weight="600" letter-spacing="1">LIGHT WELL</text>

    <!-- 4) North Breezeway Gap -->
    <rect class="breezeway-gap" x="228" y="574" width="74" height="114" rx="3" />
    <text x="265" y="631" text-anchor="middle" font-size="5" fill="rgba(148, 163, 184, 0.55)" transform="rotate(-90 265 631)" font-weight="600" letter-spacing="1">BREEZEWAY</text>

    <!-- 5) South Light-Well Gap -->
    <rect class="lightwell-gap" x="448" y="280" width="70" height="158" rx="3" />
    <text x="483" y="360" text-anchor="middle" font-size="5" fill="rgba(56, 189, 248, 0.55)" transform="rotate(-90 483 360)" font-weight="600" letter-spacing="1">LIGHT WELL</text>

    <!-- 6) South Breezeway Gap -->
    <rect class="breezeway-gap" x="448" y="574" width="70" height="114" rx="3" />
    <text x="483" y="631" text-anchor="middle" font-size="5" fill="rgba(148, 163, 184, 0.55)" transform="rotate(-90 483 631)" font-weight="600" letter-spacing="1">BREEZEWAY</text>

    <!-- 7) N204 Inner Courtyard -->
    <rect class="courtyard-patio" x="148" y="496" width="110" height="26" rx="2" />
    <text x="203" y="511" text-anchor="middle" font-size="5" fill="rgba(16, 185, 129, 0.6)" font-weight="600" letter-spacing="1">COURTYARD</text>

    <!-- 8) Admin Block 2nd Fl Light Wells (Flanking A207 as in blueprint) -->
    <rect class="lightwell-gap" x="300" y="752" width="26" height="32" rx="1" />
    <rect class="lightwell-gap" x="422" y="752" width="26" height="32" rx="1" />

    <!-- 9) Front Entrance Terrace Roof (X-Box below A207 as in blueprint) -->
    <rect class="lightwell-gap" x="334" y="810" width="80" height="34" rx="2" />
    <line x1="334" y1="810" x2="414" y2="844" stroke="rgba(56, 189, 248, 0.35)" stroke-width="0.8" />
    <line x1="334" y1="844" x2="414" y2="810" stroke="rgba(56, 189, 248, 0.35)" stroke-width="0.8" />
    <text x="374" y="855" text-anchor="middle" font-size="5" fill="rgba(148, 163, 184, 0.6)" font-weight="600" letter-spacing="1">TERRACE</text>
    `,
    corridorsHtml: `

    <!-- Admin Transverse Grand Cross Corridor -->
    <rect class="corridor-floor" x="220" y="692" width="310" height="9" rx="1" />
    <line class="corridor-centerline" x1="224" y1="696" x2="526" y2="696" />

    <!-- Admin West Wing Corridor (A207A-C) -->
    <rect class="corridor-floor" x="220" y="614" width="8" height="84" rx="1" />
    <line class="corridor-centerline" x1="224" y1="618" x2="224" y2="696" />

    <!-- Admin East Wing Corridor (A201A-C) -->
    <rect class="corridor-floor" x="522" y="614" width="8" height="84" rx="1" />
    <line class="corridor-centerline" x1="526" y1="618" x2="526" y2="696" />

    <!-- North Spine Veranda Corridor (along N-block rooms) -->
    <rect class="corridor-floor" x="346" y="166" width="8" height="530" />
    <line class="corridor-centerline" x1="350" y1="170" x2="350" y2="696" />

    <!-- South Spine Veranda Corridor (along S-block rooms) -->
    <rect class="corridor-floor" x="400" y="166" width="8" height="530" />
    <line class="corridor-centerline" x1="404" y1="170" x2="404" y2="696" />

    <!-- Top Bridge across Atrium -->
    <rect class="corridor-floor" x="346" y="166" width="62" height="9" rx="1" />
    <line class="corridor-centerline" x1="350" y1="170" x2="404" y2="170" />

    <!-- Transverse Upper Cross Passage (WC-G3 to UNESCO) -->
    <rect class="corridor-floor" x="216" y="266" width="312" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="271" x2="523" y2="271" />

    <!-- Upper West N209 Corridor -->
    <rect class="corridor-floor" x="216" y="266" width="10" height="138" rx="1" />
    <line class="corridor-centerline" x1="221" y1="271" x2="221" y2="400" />

    <!-- Upper West Mid Passage (N209 to West Spine) -->
    <rect class="corridor-floor" x="216" y="340" width="134" height="10" rx="1" />
    <line class="corridor-centerline" x1="221" y1="345" x2="350" y2="345" />

    <!-- Upper East UNESCO Corridor -->
    <rect class="corridor-floor" x="518" y="240" width="10" height="134" rx="1" />
    <line class="corridor-centerline" x1="523" y1="240" x2="523" y2="370" />

    <!-- Upper East Mid Passage (UNESCO to East Spine) -->
    <rect class="corridor-floor" x="404" y="340" width="124" height="10" rx="1" />
    <line class="corridor-centerline" x1="404" y1="345" x2="523" y2="345" />

    <!-- Mid Cross Bridge across Atrium -->
    <rect class="corridor-floor" x="346" y="400" width="62" height="10" rx="1" />
    <line class="corridor-centerline" x1="350" y1="405" x2="404" y2="405" />

    <!-- Transverse Lower Cross Passage (N204 to S204) -->
    <rect class="corridor-floor" x="258" y="503" width="270" height="10" rx="1" />
    <line class="corridor-centerline" x1="262" y1="508" x2="523" y2="508" />

    <!-- N204 Courtyard Loop Corridor -->
    <rect class="corridor-floor" x="140" y="488" width="126" height="8" rx="1" />
    <line class="corridor-centerline" x1="144" y1="492" x2="262" y2="492" />
    <rect class="corridor-floor" x="140" y="522" width="126" height="8" rx="1" />
    <line class="corridor-centerline" x1="144" y1="526" x2="262" y2="526" />
    <rect class="corridor-floor" x="140" y="488" width="8" height="42" rx="1" />
    <line class="corridor-centerline" x1="144" y1="492" x2="144" y2="526" />
    <rect class="corridor-floor" x="130" y="502" width="14" height="8" rx="1" />
    <line class="corridor-centerline" x1="134" y1="506" x2="144" y2="506" />
    <rect class="corridor-floor" x="258" y="488" width="8" height="42" rx="1" />
    <line class="corridor-centerline" x1="262" y1="492" x2="262" y2="526" />

    <!-- S204 Block Corridor -->
    <rect class="corridor-floor" x="518" y="396" width="10" height="178" rx="1" />
    <line class="corridor-centerline" x1="523" y1="396" x2="523" y2="570" />

    `,
    graph: {}
  }
};

// Master flat room list across all floors for global search and directory
let ALL_ROOMS = [
  ...FLOORS_DATA[0].rooms,
  ...FLOORS_DATA[2].rooms
];

// Convenient pointer to active floor's rooms
let ROOMS_DATA = FLOORS_DATA[0].rooms;
let WAYPOINTS = FLOORS_DATA[0].waypoints;
let HALLWAY_EDGES = FLOORS_DATA[0].edges;
let GRAPH = FLOORS_DATA[0].graph;

// Shared vertical staircases linking Ground Floor (0) and Second Floor (2)
const SHARED_STAIRS = [
  { id: 'stair_admin_w', name: 'Admin West Staircase', f0Node: 'wp_admin_west_st', f2Node: 'wp_f2_stair_admin_w' },
  { id: 'stair_admin_e', name: 'Admin East Staircase', f0Node: 'wp_admin_east_st', f2Node: 'wp_f2_stair_admin_e' },
  { id: 'stair_mid', name: 'Central Mid-Bridge Stairs', f0Node: 'wp_west_lower_bridge', f2Node: 'wp_f2_mid_stair' },
  { id: 'stair_north', name: 'North Stairs', f0Node: 'wp_north_exit_hub', f2Node: 'wp_f2_north_stair' }
];

// Application State
const appState = {
  currentFloor: 0,
  selectedRoomId: null,
  activeCategory: 'ALL',
  startRoomId: null,
  destRoomId: null,
  currentRoute: null,
  isSimulating: false,
  showGraph: false,
  theme: 'theme-dark'
};

// ==========================================================================
// 2. MULTI-FLOOR GRAPH & CENTROID INITIALIZATION
// ==========================================================================
function initAllNavigationGraphs() {
  [0, 2].forEach(floorId => {
    const fData = FLOORS_DATA[floorId];
    fData.graph = {};

    // 1. Calculate Room Centroids
    fData.rooms.forEach(r => {
      r.cx = Math.round(r.x + r.w / 2);
      r.cy = Math.round(r.y + r.h / 2);
    });

    // 2. Initialize Graph Adjacency Lists
    Object.keys(fData.waypoints).forEach(id => {
      fData.graph[id] = [];
    });

    // 3. Populate Hallway Edges
    fData.edges.forEach(([u, v, typ = 'indoor']) => {
      if (!fData.waypoints[u] || !fData.waypoints[v]) return;
      const p1 = fData.waypoints[u];
      const p2 = fData.waypoints[v];
      const geomDist = Math.hypot(p1.x - p2.x, p1.y - p2.y) * 0.4; // 1 SVG unit ≈ 0.4 m
      const cost = (typ === 'outdoor') ? geomDist * 2.5 : geomDist;
      fData.graph[u].push({ to: v, dist: cost, geomDist, type: typ });
      fData.graph[v].push({ to: u, dist: cost, geomDist, type: typ });
    });

    // 4. Link each room's door to nearest walkable corridor waypoint
    fData.rooms.forEach(room => {
      const doorId = 'door_' + room.id;
      fData.waypoints[doorId] = {
        id: doorId,
        x: room.door[0],
        y: room.door[1],
        label: `Door of ${room.name}`
      };
      fData.graph[doorId] = [];

      let nearest = null;
      let minDist = Infinity;
      Object.entries(fData.waypoints).forEach(([id, wp]) => {
        if (id.startsWith('door_') || id === doorId || id.startsWith('wp_outdoor')) return;
        const d = Math.hypot(room.door[0] - wp.x, room.door[1] - wp.y);
        if (d < minDist) {
          minDist = d;
          nearest = id;
        }
      });

      if (nearest) {
        const geomDist = minDist * 0.4;
        fData.graph[doorId].push({ to: nearest, dist: geomDist, geomDist, type: 'indoor' });
        fData.graph[nearest].push({ to: doorId, dist: geomDist, geomDist, type: 'indoor' });
      }
    });
  });

  // Sync active pointers
  syncActiveFloorPointers(appState.currentFloor);
}

function syncActiveFloorPointers(floorId) {
  const f = FLOORS_DATA[floorId] || FLOORS_DATA[0];
  ROOMS_DATA = f.rooms;
  WAYPOINTS = f.waypoints;
  HALLWAY_EDGES = f.edges;
  GRAPH = f.graph;
}

// ==========================================================================
// 3. DIJKSTRA INDOOR PATHFINDING (SINGLE & MULTI-FLOOR)
// ==========================================================================
function dijkstraSingleFloor(floorId, startNode, endNode) {
  const fData = FLOORS_DATA[floorId];
  if (!fData || !fData.waypoints[startNode] || !fData.waypoints[endNode]) return null;

  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(fData.waypoints));

  Object.keys(fData.waypoints).forEach(id => {
    distances[id] = Infinity;
  });
  distances[startNode] = 0;

  while (unvisited.size > 0) {
    let current = null;
    let shortest = Infinity;
    for (const node of unvisited) {
      if (distances[node] < shortest) {
        shortest = distances[node];
        current = node;
      }
    }

    if (!current || distances[current] === Infinity) break;
    if (current === endNode) break;

    unvisited.delete(current);

    const neighbors = fData.graph[current] || [];
    for (const edge of neighbors) {
      if (!unvisited.has(edge.to)) continue;
      const alt = distances[current] + edge.dist;
      if (alt < distances[edge.to]) {
        distances[edge.to] = alt;
        previous[edge.to] = current;
      }
    }
  }

  if (distances[endNode] === Infinity) return null;

  const path = [];
  let curr = endNode;
  while (curr) {
    path.unshift(curr);
    curr = previous[curr];
  }

  return {
    path,
    cost: distances[endNode]
  };
}

function buildRouteLeg(floorId, startRoom, destRoom, path, isStartRoomReal = true, isDestRoomReal = true) {
  const fData = FLOORS_DATA[floorId];
  const points = [];

  if (isStartRoomReal) {
    points.push([startRoom.cx, startRoom.cy]);
  }
  path.forEach(id => {
    points.push([fData.waypoints[id].x, fData.waypoints[id].y]);
  });
  if (isDestRoomReal) {
    points.push([destRoom.cx, destRoom.cy]);
  }

  const segments = [];
  if (isStartRoomReal && path.length > 0) {
    segments.push({
      p1: [startRoom.cx, startRoom.cy],
      p2: [fData.waypoints[path[0]].x, fData.waypoints[path[0]].y],
      type: 'indoor'
    });
  }

  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];
    const p1 = [fData.waypoints[u].x, fData.waypoints[u].y];
    const p2 = [fData.waypoints[v].x, fData.waypoints[v].y];
    let edgeType = 'indoor';
    const edge = (fData.graph[u] || []).find(e => e.to === v);
    if (edge && edge.type) {
      edgeType = edge.type;
    }
    segments.push({ p1, p2, type: edgeType });
  }

  if (isDestRoomReal && path.length > 0) {
    segments.push({
      p1: [fData.waypoints[path[path.length - 1]].x, fData.waypoints[path[path.length - 1]].y],
      p2: [destRoom.cx, destRoom.cy],
      type: 'indoor'
    });
  }

  function buildPathD(targetType) {
    let d = '';
    let inContig = false;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (seg.type === targetType) {
        if (!inContig) {
          d += `M ${seg.p1[0]} ${seg.p1[1]} L ${seg.p2[0]} ${seg.p2[1]} `;
          inContig = true;
        } else {
          d += `L ${seg.p2[0]} ${seg.p2[1]} `;
        }
      } else {
        inContig = false;
      }
    }
    return d.trim();
  }

  let distMeters = 0;
  for (let i = 0; i < points.length - 1; i++) {
    distMeters += Math.hypot(points[i+1][0] - points[i][0], points[i+1][1] - points[i][1]) * 0.4;
  }

  return {
    floor: floorId,
    points,
    segments,
    indoorD: buildPathD('indoor'),
    outdoorD: buildPathD('outdoor'),
    hasOutdoor: segments.some(s => s.type === 'outdoor'),
    distanceMeters: Math.round(distMeters)
  };
}

function findRoute(startRoomId, destRoomId) {
  const startRoom = ALL_ROOMS.find(r => r.id === startRoomId);
  const destRoom = ALL_ROOMS.find(r => r.id === destRoomId);

  if (!startRoom || !destRoom || startRoomId === destRoomId) return null;

  // Case 1: Same Floor Navigation
  if (startRoom.floor === destRoom.floor) {
    const fId = startRoom.floor;
    const res = dijkstraSingleFloor(fId, 'door_' + startRoomId, 'door_' + destRoomId);
    if (!res) return null;

    const leg = buildRouteLeg(fId, startRoom, destRoom, res.path, true, true);
    const steps = generateSteps(fId, startRoom, destRoom, res.path);

    const walkingTimeSeconds = Math.round(leg.distanceMeters / 1.2);
    const minutes = Math.floor(walkingTimeSeconds / 60);
    const seconds = walkingTimeSeconds % 60;
    const durationText = minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;

    return {
      isMultiFloor: false,
      floor: fId,
      startRoom,
      destRoom,
      points: leg.points,
      indoorD: leg.indoorD,
      outdoorD: leg.outdoorD,
      hasOutdoor: leg.hasOutdoor,
      distanceMeters: leg.distanceMeters,
      durationText,
      steps
    };
  }

  // Case 2: Multi-Floor Navigation via Shared Staircase
  let bestStair = null;
  let bestTotalCost = Infinity;
  let bestRes1 = null;
  let bestRes2 = null;

  const fStart = startRoom.floor;
  const fDest = destRoom.floor;

  SHARED_STAIRS.forEach(st => {
    const nodeStart = (fStart === 0) ? st.f0Node : st.f2Node;
    const nodeDest = (fDest === 0) ? st.f0Node : st.f2Node;

    const res1 = dijkstraSingleFloor(fStart, 'door_' + startRoomId, nodeStart);
    const res2 = dijkstraSingleFloor(fDest, nodeDest, 'door_' + destRoomId);

    if (res1 && res2) {
      // 15m penalty for vertical stair climb
      const totalCost = res1.cost + res2.cost + 15;
      if (totalCost < bestTotalCost) {
        bestTotalCost = totalCost;
        bestStair = st;
        bestRes1 = res1;
        bestRes2 = res2;
      }
    }
  });

  if (!bestStair) return null;

  const nodeStartStair = (fStart === 0) ? bestStair.f0Node : bestStair.f2Node;
  const nodeDestStair = (fDest === 0) ? bestStair.f0Node : bestStair.f2Node;

  const stairPtStart = FLOORS_DATA[fStart].waypoints[nodeStartStair];
  const fakeStairRoomStart = { cx: stairPtStart.x, cy: stairPtStart.y, name: bestStair.name };

  const stairPtDest = FLOORS_DATA[fDest].waypoints[nodeDestStair];
  const fakeStairRoomDest = { cx: stairPtDest.x, cy: stairPtDest.y, name: bestStair.name };

  const leg1 = buildRouteLeg(fStart, startRoom, fakeStairRoomStart, bestRes1.path, true, false);
  const leg2 = buildRouteLeg(fDest, fakeStairRoomDest, destRoom, bestRes2.path, false, true);

  const steps1 = generateSteps(fStart, startRoom, fakeStairRoomStart, bestRes1.path);
  const targetFloorName = FLOORS_DATA[fDest].name;
  steps1.push({
    action: 'Take Stairs',
    instruction: `Take ${bestStair.name} to ${targetFloorName}`,
    distance: 15,
    isFloorTransition: true,
    targetFloor: fDest
  });

  const steps2 = generateSteps(fDest, fakeStairRoomDest, destRoom, bestRes2.path);
  const combinedSteps = [...steps1, ...steps2.slice(1)];

  const totalDist = leg1.distanceMeters + leg2.distanceMeters + 15;
  const walkingTimeSeconds = Math.round(totalDist / 1.1);
  const minutes = Math.floor(walkingTimeSeconds / 60);
  const seconds = walkingTimeSeconds % 60;
  const durationText = minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;

  return {
    isMultiFloor: true,
    startRoom,
    destRoom,
    staircase: bestStair,
    leg1,
    leg2,
    fStart,
    fDest,
    distanceMeters: totalDist,
    durationText,
    steps: combinedSteps
  };
}

function generateSteps(floorId, startRoom, destRoom, path) {
  const fData = FLOORS_DATA[floorId];
  const steps = [];
  steps.push({
    action: 'Depart',
    instruction: `Depart from ${startRoom.name} into hallway`,
    distance: 0
  });

  for (let i = 1; i < path.length - 1; i++) {
    const pPrev = fData.waypoints[path[i - 1]];
    const pCurr = fData.waypoints[path[i]];
    const pNext = fData.waypoints[path[i + 1]];

    const b1 = Math.atan2(pCurr.x - pPrev.x, pCurr.y - pPrev.y) * 180 / Math.PI;
    const b2 = Math.atan2(pNext.x - pPrev.x, pNext.y - pPrev.y) * 180 / Math.PI;
    let diff = (b2 - b1 + 360) % 360;
    if (diff > 180) diff -= 360;

    let action = 'Straight';
    let text = 'Continue past';
    if (diff > 35 && diff <= 135) {
      action = 'Turn Right';
      text = 'Turn right at';
    } else if (diff < -35 && diff >= -135) {
      action = 'Turn Left';
      text = 'Turn left at';
    } else if (Math.abs(diff) > 135) {
      action = 'U-Turn';
      text = 'Make a U-turn near';
    }

    const isOutdoorNode = pCurr.id.startsWith('wp_outdoor');
    const locationName = pCurr.label.replace(/^Door of /, '') + (isOutdoorNode ? ' (Outdoor Roadway)' : '');

    if (action !== 'Straight' || i === 1 || i === path.length - 2) {
      steps.push({
        action,
        instruction: `${text} ${locationName}`,
        distance: Math.round(Math.hypot(pCurr.x - pNext.x, pCurr.y - pNext.y) * 0.4)
      });
    }
  }

  steps.push({
    action: 'Arrive',
    instruction: `Arrive at destination: ${destRoom.name}`,
    distance: 0
  });

  return steps;
}

// ==========================================================================
// 4. SVG RENDERING & FLOOR SWITCHING ENGINE
// ==========================================================================
function renderFloor(floorId) {
  const fData = FLOORS_DATA[floorId] || FLOORS_DATA[0];
  syncActiveFloorPointers(floorId);

  // 1. Building Footprint
  const baseGroup = document.getElementById('layerBuildingBase');
  if (baseGroup) baseGroup.innerHTML = fData.buildingBaseHtml;

  // 2. Courtyards & Light-wells
  const courtGroup = document.getElementById('layerCourtyards');
  if (courtGroup) courtGroup.innerHTML = fData.courtyardsHtml;

  // 3. Hallways & Corridors
  const corrGroup = document.getElementById('layerCorridors');
  if (corrGroup) corrGroup.innerHTML = fData.corridorsHtml;

  // 4. Staircases
  const stairGroup = document.getElementById('layerStairs');
  if (stairGroup) {
    let stairHtml = '';
    fData.stairs.forEach(st => {
      stairHtml += `<rect class="stair-box" x="${st.x}" y="${st.y}" width="${st.w}" height="${st.h}" />`;
      for (let i = 1; i < st.steps; i++) {
        if (st.dir === 'v') {
          const yLine = st.y + (st.h / st.steps) * i;
          stairHtml += `<line class="stair-step" x1="${st.x}" y1="${yLine}" x2="${st.x + st.w}" y2="${yLine}" />`;
        } else {
          const xLine = st.x + (st.w / st.steps) * i;
          stairHtml += `<line class="stair-step" x1="${xLine}" y1="${st.y}" x2="${xLine}" y2="${st.y + st.h}" />`;
        }
      }
    });
    stairGroup.innerHTML = stairHtml;
  }

  // 5. Doors & Openings
  const doorGroup = document.getElementById('layerDoors');
  if (doorGroup) {
    let doorsHtml = '';
    fData.rooms.forEach(r => {
      const [dx, dy] = r.door;
      doorsHtml += `
        <g class="door-marker" data-room="${r.id}">
          <circle cx="${dx}" cy="${dy}" r="1.6" fill="var(--svg-door)" opacity="0.85" />
        </g>
      `;
    });
    doorGroup.innerHTML = doorsHtml;
  }

  // 6. Rooms & Vector Text Labels
  const roomsGroup = document.getElementById('layerRooms');
  if (roomsGroup) {
    let roomsHtml = '';
    fData.rooms.forEach(r => {
      const isNarrowVertical = r.w < 26 && r.h >= 36;
      const showName = r.h >= 24 && r.w >= 36 && !isNarrowVertical;
      const isSmall = r.w < 42 || r.h < 26;
      let codeY = showName ? (r.cy - 3) : r.cy + 3;
      const nameY = r.cy + 9;
      let fontSize = (r.w < 30) ? '5.5px' : (isSmall ? '7px' : '8.5px');
      let transformAttr = '';

      if (isNarrowVertical) {
        transformAttr = `transform="rotate(-90 ${r.cx} ${r.cy})"`;
        codeY = r.cy + 2;
        fontSize = '5px';
      }

      let displayName = r.name;
      if (r.w < 42 && displayName.length > 10) {
        displayName = displayName.substring(0, 9) + '..';
      } else if (displayName.length > 13 && r.w < 68) {
        displayName = displayName.substring(0, 11) + '..';
      }

      roomsHtml += `
        <g class="room-group" id="room-${r.id}" data-id="${r.id}" data-category="${r.category}" tabindex="0" role="button" aria-label="${r.code} - ${r.name}">
          <rect class="room-rect" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="2" />
          <text class="room-code-text" x="${r.cx}" y="${codeY}" text-anchor="middle" font-size="${fontSize}" ${transformAttr}>${r.code}</text>
          ${showName ? `<text class="room-name-text" x="${r.cx}" y="${nameY}" text-anchor="middle">${displayName}</text>` : ''}
        </g>
      `;
    });
    roomsGroup.innerHTML = roomsHtml;
  }

  // 7. Walkable Routing Graph (Toggleable)
  const graphGroup = document.getElementById('layerRoutingGraph');
  if (graphGroup) {
    let graphHtml = '';
    fData.edges.forEach(([u, v, typ = 'indoor']) => {
      const p1 = fData.waypoints[u];
      const p2 = fData.waypoints[v];
      if (p1 && p2) {
        const cls = (typ === 'outdoor') ? 'graph-edge outdoor' : 'graph-edge indoor';
        graphHtml += `<line class="${cls}" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" />`;
      }
    });

    Object.values(fData.waypoints).forEach(wp => {
      if (!wp.id.startsWith('door_')) {
        const isOutdoor = wp.id.startsWith('wp_outdoor');
        const cls = isOutdoor ? 'graph-node outdoor' : 'graph-node';
        graphHtml += `<circle class="${cls}" cx="${wp.x}" cy="${wp.y}" r="2" data-label="${wp.label}" />`;
      }
    });

    graphGroup.innerHTML = graphHtml;
  }

  // Re-attach room events
  setupRoomEvents();

  // Re-highlight selected room if present on this floor
  if (appState.selectedRoomId) {
    const selEl = document.getElementById('room-' + appState.selectedRoomId);
    if (selEl) selEl.classList.add('selected');
  }

  // Render navigation route for this floor if route active
  if (appState.currentRoute) {
    renderActiveRouteGraphics();
  }
}

function switchFloor(floorNumber, preserveView = true) {
  if (appState.currentFloor === floorNumber) return;
  appState.currentFloor = floorNumber;

  // Update Segmented Button States
  document.querySelectorAll('.floor-seg-btn').forEach(btn => {
    const bFloor = parseInt(btn.getAttribute('data-floor'), 10);
    const isActive = bFloor === floorNumber;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
  });

  // Update Badge
  const badgeEl = document.querySelector('.campus-info-badge');
  if (badgeEl) {
    badgeEl.textContent = FLOORS_DATA[floorNumber].badge;
  }

  // Render SVG Layers for new floor
  renderFloor(floorNumber);

  // If a route exists, refresh its rendering on the new floor
  if (appState.currentRoute) {
    renderActiveRouteGraphics();
  }
}

// ==========================================================================
// 5. SVG PAN, ZOOM & VIEWPORT ENGINE
// ==========================================================================
class SvgViewport {
  constructor(viewportEl, svgEl) {
    this.viewport = viewportEl;
    this.svg = svgEl;
    this.base = { x: 0, y: 0, w: 723, h: 1024 };
    this.current = { ...this.base };
    this.isPanning = false;
    this.startPoint = { x: 0, y: 0 };
    this.startViewBox = { ...this.current };
    this.init();
  }

  init() {
    this.updateViewBox();
    this.viewport.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mouseup', () => this.onMouseUp());
    this.viewport.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
    window.addEventListener('resize', () => this.onResize());
  }

  updateViewBox() {
    this.svg.setAttribute('viewBox', `${this.current.x.toFixed(2)} ${this.current.y.toFixed(2)} ${this.current.w.toFixed(2)} ${this.current.h.toFixed(2)}`);
  }

  getSvgPoint(clientX, clientY) {
    const pt = this.svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = this.svg.getScreenCTM();
    if (ctm) {
      return pt.matrixTransform(ctm.inverse());
    }
    const rect = this.viewport.getBoundingClientRect();
    return {
      x: this.current.x + ((clientX - rect.left) / rect.width) * this.current.w,
      y: this.current.y + ((clientY - rect.top) / rect.height) * this.current.h
    };
  }

  onMouseDown(e) {
    if (e.button !== 0) return;
    this.isPanning = true;
    this.viewport.classList.add('panning');
    this.startPoint = { x: e.clientX, y: e.clientY };
    this.startViewBox = { ...this.current };
  }

  onMouseMove(e) {
    if (!this.isPanning) return;
    const ctm = this.svg.getScreenCTM();
    const scale = ctm ? ctm.a : (this.viewport.clientWidth / this.current.w);
    const dx = (e.clientX - this.startPoint.x) / scale;
    const dy = (e.clientY - this.startPoint.y) / scale;
    this.current.x = this.startViewBox.x - dx;
    this.current.y = this.startViewBox.y - dy;
    this.updateViewBox();
  }

  onMouseUp() {
    this.isPanning = false;
    this.viewport.classList.remove('panning');
  }

  onWheel(e) {
    e.preventDefault();
    const svgP = this.getSvgPoint(e.clientX, e.clientY);
    const factor = e.deltaY > 0 ? 1.14 : 0.88;
    this.zoomAroundPoint(svgP.x, svgP.y, factor);
  }

  zoomAroundPoint(px, py, factor) {
    const newW = Math.min(Math.max(this.current.w * factor, 120), 1200);
    const newH = newW * (this.base.h / this.base.w);
    const rx = (px - this.current.x) / this.current.w;
    const ry = (py - this.current.y) / this.current.h;
    this.current.x = px - rx * newW;
    this.current.y = py - ry * newH;
    this.current.w = newW;
    this.current.h = newH;
    this.updateViewBox();
  }

  zoomBy(factor) {
    const cx = this.current.x + this.current.w / 2;
    const cy = this.current.y + this.current.h / 2;
    this.zoomAroundPoint(cx, cy, factor);
  }

  reset() {
    this.current = { ...this.base };
    this.updateViewBox();
  }

  onResize() {
    this.updateViewBox();
  }

  focusRoom(room) {
    const targetW = Math.max(room.w * 3.5, 240);
    const targetH = targetW * (this.base.h / this.base.w);
    this.current = {
      x: room.cx - targetW / 2,
      y: room.cy - targetH / 2,
      w: targetW,
      h: targetH
    };
    this.updateViewBox();
  }

  focusBounds(minX, minY, maxX, maxY) {
    const pad = 60;
    const bw = (maxX - minX) + pad * 2;
    const bh = (maxY - minY) + pad * 2;
    const targetW = Math.max(bw, bh * (this.base.w / this.base.h));
    const targetH = targetW * (this.base.h / this.base.w);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    this.current = {
      x: cx - targetW / 2,
      y: cy - targetH / 2,
      w: targetW,
      h: targetH
    };
    this.updateViewBox();
  }
}

// Global Viewport Instance
let viewport = null;

// ==========================================================================
// 6. UI INTERACTION & DIRECTORY
// ==========================================================================
function selectRoom(roomId, shouldFocus = true) {
  const room = ALL_ROOMS.find(r => r.id === roomId);
  if (!room) return;

  // If room is on another floor, switch floor first!
  if (room.floor !== appState.currentFloor) {
    switchFloor(room.floor);
  }

  document.querySelectorAll('.room-group.selected').forEach(el => el.classList.remove('selected'));
  const el = document.getElementById('room-' + roomId);
  if (el) el.classList.add('selected');

  appState.selectedRoomId = roomId;
  showRoomDetailCard(room);

  if (shouldFocus && viewport) {
    viewport.focusRoom(room);
  }
}

function showRoomDetailCard(room) {
  const card = document.getElementById('roomDetailCard');
  if (!card) return;

  document.getElementById('detailRoomCode').textContent = room.code;
  document.getElementById('detailRoomName').textContent = room.name;
  
  const floorName = room.floor === 0 ? 'Ground Floor' : 'Second Floor';
  document.getElementById('detailWingBadge').textContent = `${room.wing} • ${floorName}`;

  const catMeta = CATEGORIES[room.category] || CATEGORIES.ALL;
  const catBadge = document.getElementById('detailCategoryBadge');
  catBadge.textContent = catMeta.name;
  catBadge.style.color = catMeta.color || '#38bdf8';
  catBadge.style.borderColor = catMeta.color || 'rgba(56, 189, 248, 0.3)';

  document.getElementById('detailRoomDesc').textContent = room.desc;

  document.getElementById('btnNavigateTo').onclick = () => {
    switchTab('directions');
    document.getElementById('destRoomSelect').value = room.id;
    appState.destRoomId = room.id;
    calculateAndRenderRoute();
  };

  document.getElementById('btnNavigateFrom').onclick = () => {
    switchTab('directions');
    document.getElementById('startRoomSelect').value = room.id;
    appState.startRoomId = room.id;
    calculateAndRenderRoute();
  };

  card.style.display = 'block';
}

function renderDirectoryList(query = '', category = 'ALL') {
  const listEl = document.getElementById('resultsList');
  const countEl = document.getElementById('resultsCount');
  if (!listEl) return;

  const q = query.trim().toLowerCase();
  const filtered = ALL_ROOMS.filter(r => {
    const matchesCategory = (category === 'ALL' || r.category === category);
    const matchesSearch = !q || (
      r.code.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.wing.toLowerCase().includes(q) ||
      r.desc.toLowerCase().includes(q)
    );
    return matchesCategory && matchesSearch;
  });

  if (countEl) countEl.textContent = filtered.length;
  listEl.innerHTML = '';

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div style="padding: 24px 12px; text-align: center; color: var(--text-muted); font-size: 0.82rem;">
        No locations found matching "${query}".
      </div>
    `;
    return;
  }

  filtered.forEach(room => {
    const item = document.createElement('div');
    item.className = 'room-list-item';
    item.tabIndex = 0;
    item.role = 'button';

    const catMeta = CATEGORIES[room.category] || CATEGORIES.ROOM;
    const tagColor = catMeta.color || '#3b82f6';
    const floorLabel = room.floor === 0 ? 'GROUND' : '2ND FL';
    const floorBadgeCls = room.floor === 0 ? 'search-floor-badge' : 'search-floor-badge floor-2';

    item.innerHTML = `
      <div class="item-code" style="color: ${tagColor};">${room.code}</div>
      <div class="item-info">
        <div class="item-name">
          ${room.name}
          <span class="${floorBadgeCls}">${floorLabel}</span>
        </div>
        <div class="item-sub">${room.wing}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted); flex-shrink: 0;">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;

    item.addEventListener('click', () => {
      selectRoom(room.id, true);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectRoom(room.id, true);
      }
    });

    listEl.appendChild(item);
  });
}

function populateDropdowns() {
  const startSelect = document.getElementById('startRoomSelect');
  const destSelect = document.getElementById('destRoomSelect');
  if (!startSelect || !destSelect) return;

  const f0Rooms = FLOORS_DATA[0].rooms.slice().sort((a, b) => a.code.localeCompare(b.code));
  const f2Rooms = FLOORS_DATA[2].rooms.slice().sort((a, b) => a.code.localeCompare(b.code));

  let optionsHtml = '<option value="">Select location...</option>';
  optionsHtml += '<optgroup label="Ground Floor">';
  f0Rooms.forEach(r => {
    optionsHtml += `<option value="${r.id}">${r.code} - ${r.name}</option>`;
  });
  optionsHtml += '</optgroup>';

  optionsHtml += '<optgroup label="Second Floor (2nd FL)">';
  f2Rooms.forEach(r => {
    optionsHtml += `<option value="${r.id}">${r.code} - ${r.name}</option>`;
  });
  optionsHtml += '</optgroup>';

  startSelect.innerHTML = optionsHtml;
  destSelect.innerHTML = optionsHtml;
}

// ==========================================================================
// 7. ROUTE RENDERING & GUIDANCE
// ==========================================================================
function calculateAndRenderRoute() {
  if (!appState.startRoomId || !appState.destRoomId) {
    clearRoute();
    return;
  }

  const route = findRoute(appState.startRoomId, appState.destRoomId);
  if (!route) {
    clearRoute();
    return;
  }

  appState.currentRoute = route;

  // If start room is on another floor and we are not on it, switch to start room's floor
  if (route.startRoom.floor !== appState.currentFloor) {
    switchFloor(route.startRoom.floor);
  } else {
    renderActiveRouteGraphics();
  }

  // Update Metrics Card
  const metricsCard = document.getElementById('routeMetricsCard');
  metricsCard.style.display = 'flex';

  const typeBadge = route.hasOutdoor
    ? '<span class="route-type-badge outdoor">Outdoor Route</span>'
    : (route.isMultiFloor ? '<span class="route-type-badge multi-floor">Multi-Floor</span>' : '<span class="route-type-badge indoor">Indoor</span>');

  document.getElementById('routeDistVal').innerHTML = `${route.distanceMeters} m ${typeBadge}`;
  document.getElementById('routeTimeVal').textContent = route.durationText;

  // Turn directions
  renderTurnDirections(route.steps);
}

function renderActiveRouteGraphics() {
  const route = appState.currentRoute;
  if (!route) return;

  const glowPath = document.getElementById('svgRouteGlow');
  const corePath = document.getElementById('svgRouteCore');
  const outdoorGlow = document.getElementById('svgRouteOutdoorGlow');
  const outdoorCore = document.getElementById('svgRouteOutdoorCore');
  const startPin = document.getElementById('svgStartPin');
  const destPin = document.getElementById('svgDestPin');

  let activeLeg = null;
  let pStart = null;
  let pDest = null;

  if (!route.isMultiFloor) {
    if (route.floor === appState.currentFloor) {
      activeLeg = route;
      pStart = route.points[0];
      pDest = route.points[route.points.length - 1];
    }
  } else {
    if (appState.currentFloor === route.fStart) {
      activeLeg = route.leg1;
      pStart = activeLeg.points[0];
      pDest = activeLeg.points[activeLeg.points.length - 1];
    } else if (appState.currentFloor === route.fDest) {
      activeLeg = route.leg2;
      pStart = activeLeg.points[0];
      pDest = activeLeg.points[activeLeg.points.length - 1];
    }
  }

  if (activeLeg) {
    if (glowPath && corePath) {
      glowPath.setAttribute('d', activeLeg.indoorD || '');
      corePath.setAttribute('d', activeLeg.indoorD || '');
    }
    if (outdoorGlow && outdoorCore) {
      outdoorGlow.setAttribute('d', activeLeg.outdoorD || '');
      outdoorCore.setAttribute('d', activeLeg.outdoorD || '');
    }
    if (pStart && pDest && startPin && destPin) {
      startPin.setAttribute('transform', `translate(${pStart[0]}, ${pStart[1]})`);
      destPin.setAttribute('transform', `translate(${pDest[0]}, ${pDest[1]})`);
      startPin.style.display = 'block';
      destPin.style.display = 'block';
    }
    if (viewport && activeLeg.points.length > 0) {
      const xs = activeLeg.points.map(p => p[0]);
      const ys = activeLeg.points.map(p => p[1]);
      viewport.focusBounds(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys));
    }
  } else {
    // Current floor does not have a route segment
    if (glowPath) glowPath.setAttribute('d', '');
    if (corePath) corePath.setAttribute('d', '');
    if (outdoorGlow) outdoorGlow.setAttribute('d', '');
    if (outdoorCore) outdoorCore.setAttribute('d', '');
    if (startPin) startPin.style.display = 'none';
    if (destPin) destPin.style.display = 'none';
  }
}

function renderTurnDirections(steps) {
  const container = document.getElementById('turnDirectionsList');
  const card = document.getElementById('turnDirectionsCard');
  if (!container || !card) return;

  container.innerHTML = '';
  card.style.display = 'block';

  steps.forEach(step => {
    const stepEl = document.createElement('div');
    stepEl.className = 'turn-step';

    let iconSvg = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    `;

    if (step.action === 'Turn Right') {
      iconSvg = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `;
    } else if (step.action === 'Turn Left') {
      iconSvg = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      `;
    } else if (step.action === 'Take Stairs') {
      iconSvg = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;
      stepEl.style.borderLeftColor = 'var(--accent-amber)';
      stepEl.style.background = 'rgba(245, 158, 11, 0.08)';
    } else if (step.action === 'Arrive') {
      iconSvg = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      `;
    }

    let floorBtnHtml = '';
    if (step.isFloorTransition) {
      floorBtnHtml = `
        <button class="floor-transition-link" style="margin-top: 6px; padding: 4px 10px; font-size: 0.72rem; font-weight: 700; background: var(--accent-cyan); color: #03131e; border: none; border-radius: 4px; cursor: pointer;">
          Switch to ${step.targetFloor === 0 ? 'Ground Floor' : '2nd Floor'}
        </button>
      `;
    }

    stepEl.innerHTML = `
      <div class="turn-icon-box">${iconSvg}</div>
      <div class="turn-details">
        <div class="turn-instruction">${step.instruction}</div>
        ${step.distance > 0 ? `<div class="turn-distance">${step.distance} m</div>` : ''}
        ${floorBtnHtml}
      </div>
    `;

    if (step.isFloorTransition) {
      const btn = stepEl.querySelector('.floor-transition-link');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          switchFloor(step.targetFloor);
        });
      }
    }

    container.appendChild(stepEl);
  });
}

function clearRoute() {
  appState.currentRoute = null;
  const glowPath = document.getElementById('svgRouteGlow');
  const corePath = document.getElementById('svgRouteCore');
  const outdoorGlow = document.getElementById('svgRouteOutdoorGlow');
  const outdoorCore = document.getElementById('svgRouteOutdoorCore');
  const startPin = document.getElementById('svgStartPin');
  const destPin = document.getElementById('svgDestPin');
  const walker = document.getElementById('svgWalkerAvatar');

  if (glowPath) glowPath.setAttribute('d', '');
  if (corePath) corePath.setAttribute('d', '');
  if (outdoorGlow) outdoorGlow.setAttribute('d', '');
  if (outdoorCore) outdoorCore.setAttribute('d', '');
  if (startPin) startPin.style.display = 'none';
  if (destPin) destPin.style.display = 'none';
  if (walker) walker.style.display = 'none';

  const metricsCard = document.getElementById('routeMetricsCard');
  if (metricsCard) metricsCard.style.display = 'none';

  const turnCard = document.getElementById('turnDirectionsCard');
  if (turnCard) turnCard.style.display = 'none';
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });
  const dirPanel = document.getElementById('directionsPanel');
  const dirTab = document.getElementById('directoryTab');
  if (dirPanel) dirPanel.style.display = (tabName === 'directions') ? 'flex' : 'none';
  if (dirTab) dirTab.style.display = (tabName === 'directory') ? 'flex' : 'none';
}

function setupRoomEvents() {
  document.querySelectorAll('.room-group').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const roomId = el.getAttribute('data-id');
      selectRoom(roomId, false);
    });
  });
}

function setupFloorSwitcher() {
  document.querySelectorAll('.floor-seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      const floorId = parseInt(btn.getAttribute('data-floor'), 10);
      switchFloor(floorId);
    });
  });
}

// ==========================================================================
// 8. LIFECYCLE & DOM EVENT BINDINGS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const mapSvg = document.getElementById('campusMapSvg');
  const mapViewport = document.getElementById('mapViewport');
  if (mapSvg && mapViewport) {
    viewport = new SvgViewport(mapViewport, mapSvg);
  }

  // Initialize all floor graphs
  initAllNavigationGraphs();

  // Render initial floor (Ground Floor 0)
  renderFloor(0);

  // Setup Floor Switcher Buttons
  setupFloorSwitcher();

  // Populate Dropdowns
  populateDropdowns();

  // Initial Directory
  renderDirectoryList('', 'ALL');

  // Search Input Events
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value;
      if (clearSearchBtn) clearSearchBtn.style.display = q ? 'block' : 'none';
      renderDirectoryList(q, appState.activeCategory);
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearSearchBtn.style.display = 'none';
      renderDirectoryList('', appState.activeCategory);
    });
  }

  // Category Filter Chips
  document.querySelectorAll('.chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip-btn').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      appState.activeCategory = chip.getAttribute('data-category');
      renderDirectoryList(searchInput ? searchInput.value : '', appState.activeCategory);
    });
  });

  // Tab Switchers
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  // Directions Dropdown Events
  const startSelect = document.getElementById('startRoomSelect');
  const destSelect = document.getElementById('destRoomSelect');
  const swapBtn = document.getElementById('swapRouteBtn');

  if (startSelect) {
    startSelect.addEventListener('change', (e) => {
      appState.startRoomId = e.target.value;
      calculateAndRenderRoute();
    });
  }

  if (destSelect) {
    destSelect.addEventListener('change', (e) => {
      appState.destRoomId = e.target.value;
      calculateAndRenderRoute();
    });
  }

  if (swapBtn && startSelect && destSelect) {
    swapBtn.addEventListener('click', () => {
      const temp = appState.startRoomId;
      appState.startRoomId = appState.destRoomId;
      appState.destRoomId = temp;
      startSelect.value = appState.startRoomId || '';
      destSelect.value = appState.destRoomId || '';
      calculateAndRenderRoute();
    });
  }

  // Theme Controls
  const themeDarkBtn = document.getElementById('themeDarkBtn');
  const themeBlueprintBtn = document.getElementById('themeBlueprintBtn');
  if (themeDarkBtn) {
    themeDarkBtn.addEventListener('click', () => {
      document.body.className = 'theme-dark';
      themeDarkBtn.classList.add('active');
      if (themeBlueprintBtn) themeBlueprintBtn.classList.remove('active');
    });
  }
  if (themeBlueprintBtn) {
    themeBlueprintBtn.addEventListener('click', () => {
      document.body.className = 'theme-blueprint';
      themeBlueprintBtn.classList.add('active');
      if (themeDarkBtn) themeDarkBtn.classList.remove('active');
    });
  }

  // Zoom Controls
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const resetViewBtn = document.getElementById('resetViewBtn');

  if (zoomInBtn && viewport) zoomInBtn.addEventListener('click', () => viewport.zoomBy(0.8));
  if (zoomOutBtn && viewport) zoomOutBtn.addEventListener('click', () => viewport.zoomBy(1.25));
  if (resetViewBtn && viewport) resetViewBtn.addEventListener('click', () => viewport.reset());

  // Graph Toggle
  const toggleGraphBtn = document.getElementById('toggleGraphBtn');
  if (toggleGraphBtn) {
    toggleGraphBtn.addEventListener('click', () => {
      appState.showGraph = !appState.showGraph;
      const grEl = document.getElementById('layerRoutingGraph');
      if (grEl) grEl.style.display = appState.showGraph ? 'block' : 'none';
      toggleGraphBtn.classList.toggle('active', appState.showGraph);
    });
  }

  // Sidebar Toggle for Mobile
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const navSidebar = document.getElementById('navSidebar');
  if (sidebarToggleBtn && navSidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      navSidebar.classList.toggle('collapsed');
    });
  }
});
