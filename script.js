/**
 * Amritanav Campus Navigation - Production Vector Floor Plan Engine
 * 100% Scalable Vector Graphics (SVG) with Pan/Zoom, Instant Search,
 * Dijkstra Corridor Pathfinding, Smooth Camera Focus, and Theme Control.
 */

// ==========================================================================
// 1. MASTER ROOMS DATABASE (Exact CAD Ground Floor Coordinates: 723 x 1024)
// ==========================================================================
const ROOMS_DATA = [
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
];

// Enrich rooms with center coordinates
ROOMS_DATA.forEach(r => {
  r.cx = +(r.x + r.w / 2).toFixed(1);
  r.cy = +(r.y + r.h / 2).toFixed(1);
});

// Category Definitions
const CATEGORIES = {
  ALL: { name: 'All Places' },
  LAB: { name: 'Laboratory', color: '#06b6d4' },
  AUDITORIUM: { name: 'Auditorium', color: '#f59e0b' },
  OFFICE: { name: 'Office / Admin', color: '#8b5cf6' },
  ROOM: { name: 'Class / Hall', color: '#3b82f6' },
  TOILET: { name: 'Restroom', color: '#ec4899' },
  FACILITY: { name: 'Campus Facility', color: '#10b981' }
};

// ==========================================================================
// 2. HALLWAY WAYPOINTS & WALKABLE GRAPH
// ==========================================================================
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

  // Outdoor Roadway Loop
  'wp_outdoor_north_drive':     { id: 'wp_outdoor_north_drive',     x: 376, y: 50,  label: 'North Outer Driveway' },
  'wp_outdoor_north_corner':    { id: 'wp_outdoor_north_corner',    x: 570, y: 50,  label: 'North Driveway East Corner' },
  'wp_outdoor_ne_bend1':        { id: 'wp_outdoor_ne_bend1',        x: 615, y: 90,  label: 'Northeast Outer Roadway Bend 1' },
  'wp_outdoor_ne_bend2':        { id: 'wp_outdoor_ne_bend2',        x: 645, y: 120, label: 'Northeast Outer Roadway Bend 2' },
  'wp_outdoor_east_edge_upper': { id: 'wp_outdoor_east_edge_upper', x: 645, y: 230, label: 'East Perimeter Roadway (North)' },
  'wp_outdoor_east_mid':        { id: 'wp_outdoor_east_mid',        x: 645, y: 380, label: 'East Perimeter Roadway (Mid)' },
  'wp_outdoor_east_lower':      { id: 'wp_outdoor_east_lower',      x: 645, y: 508, label: 'East Perimeter Roadway (Lower)' },
  'wp_outdoor_east_se_junc':    { id: 'wp_outdoor_east_se_junc',    x: 645, y: 636, label: 'East Roadway & Mfg Breezeway Junction' },
  'wp_outdoor_se_corner':       { id: 'wp_outdoor_se_corner',       x: 645, y: 861, label: 'Southeast Campus Roadway Corner' },
  'wp_outdoor_s004a_east':      { id: 'wp_outdoor_s004a_east',      x: 530, y: 636, label: 'South Breezeway East (outside S-004A)' },
  'wp_outdoor_breezeway_east':  { id: 'wp_outdoor_breezeway_east',  x: 464, y: 636, label: 'Mfg South Breezeway Junction' },
  'wp_outdoor_south_east':      { id: 'wp_outdoor_south_east',      x: 460, y: 861, label: 'South Perimeter Roadway East' },
  'wp_outdoor_south_west':      { id: 'wp_outdoor_south_west',      x: 250, y: 861, label: 'South Perimeter Roadway West' },
  'wp_outdoor_sw_corner':       { id: 'wp_outdoor_sw_corner',       x: 76,  y: 861, label: 'Southwest Campus Roadway Corner' },
  'wp_outdoor_west_amri':       { id: 'wp_outdoor_west_amri',       x: 76,  y: 676, label: 'West Roadway (outside Amritheswari)' },
  'wp_outdoor_west_breezeway':  { id: 'wp_outdoor_west_breezeway',  x: 232, y: 600, label: 'West Courtyard Breezeway Entry' },
  'wp_outdoor_amri_top':        { id: 'wp_outdoor_amri_top',        x: 220, y: 636, label: 'Amritheswari North Lightwell' },
  'wp_outdoor_sw_cross_junc':   { id: 'wp_outdoor_sw_cross_junc',   x: 76,  y: 508, label: 'West Courtyard & Cross Walkway Crossing' },
  'wp_outdoor_mid_west_bend1':  { id: 'wp_outdoor_mid_west_bend1',  x: 76,  y: 440, label: 'West Courtyard Walkway Mid' },
  'wp_outdoor_mid_west_bend2':  { id: 'wp_outdoor_mid_west_bend2',  x: 121, y: 398, label: 'Metallurgy Lab South Outer Access' }
};

// Edges connecting waypoints strictly through walkable corridors
// [node1, node2, type: 'indoor' | 'outdoor']
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
  ['wp_admin_white_path', 'wp_outdoor_west_breezeway', 'indoor'],

  // Outdoor Roadway Loop
  ['wp_north_exit_hub', 'wp_outdoor_north_drive', 'outdoor'],
  ['wp_outdoor_north_drive', 'wp_outdoor_north_corner', 'outdoor'],
  ['wp_outdoor_north_corner', 'wp_outdoor_ne_bend1', 'outdoor'],
  ['wp_outdoor_ne_bend1', 'wp_outdoor_ne_bend2', 'outdoor'],
  ['wp_outdoor_ne_bend2', 'wp_outdoor_east_edge_upper', 'outdoor'],
  ['wp_outdoor_east_edge_upper', 'wp_outdoor_east_mid', 'outdoor'],
  ['wp_outdoor_east_mid', 'wp_outdoor_east_lower', 'outdoor'],
  ['wp_outdoor_east_lower', 'wp_outdoor_east_se_junc', 'outdoor'],
  ['wp_outdoor_se_corner', 'wp_outdoor_south_east', 'outdoor'],
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
  ['wp_outdoor_west_amri', 'wp_outdoor_sw_cross_junc', 'outdoor'],
  ['wp_outdoor_sw_cross_junc', 'wp_outdoor_mid_west_bend1', 'outdoor'],
  ['wp_outdoor_mid_west_bend1', 'wp_outdoor_mid_west_bend2', 'outdoor'],
  ['wp_outdoor_mid_west_bend2', 'wp_nw_lab_metallurgy', 'outdoor']
];

// Graph Adjacency representation
const GRAPH = {};

function initNavigationGraph() {
  Object.keys(WAYPOINTS).forEach(id => {
    GRAPH[id] = [];
  });

  HALLWAY_EDGES.forEach(([u, v, typ = 'indoor']) => {
    if (!WAYPOINTS[u] || !WAYPOINTS[v]) return;
    const p1 = WAYPOINTS[u];
    const p2 = WAYPOINTS[v];
    const geomDist = Math.hypot(p1.x - p2.x, p1.y - p2.y) * 0.4; // 1 SVG unit ≈ 0.4 m
    // Outdoor impedance multiplier (2.5x) ensures Dijkstra routes strictly along
    // indoor yellow hallways whenever an indoor path exists (Rule 1 & Rule 2).
    const cost = (typ === 'outdoor') ? geomDist * 2.5 : geomDist;
    GRAPH[u].push({ to: v, dist: cost, geomDist, type: typ });
    GRAPH[v].push({ to: u, dist: cost, geomDist, type: typ });
  });

  // Link each room's door to the nearest walkable corridor waypoint
  ROOMS_DATA.forEach(room => {
    const doorId = 'door_' + room.id;
    WAYPOINTS[doorId] = {
      id: doorId,
      x: room.door[0],
      y: room.door[1],
      label: `Door of ${room.name}`
    };
    GRAPH[doorId] = [];

    let nearest = null;
    let minDist = Infinity;
    Object.entries(WAYPOINTS).forEach(([id, wp]) => {
      if (id.startsWith('door_') || id === doorId || id.startsWith('wp_outdoor')) return;
      const d = Math.hypot(room.door[0] - wp.x, room.door[1] - wp.y);
      if (d < minDist) {
        minDist = d;
        nearest = id;
      }
    });

    if (nearest) {
      const geomDist = minDist * 0.4;
      GRAPH[doorId].push({ to: nearest, dist: geomDist, geomDist, type: 'indoor' });
      GRAPH[nearest].push({ to: doorId, dist: geomDist, geomDist, type: 'indoor' });
    }
  });
}

initNavigationGraph();

// ==========================================================================
// 3. DIJKSTRA INDOOR PATHFINDING
// ==========================================================================
function findRoute(startRoomId, destRoomId) {
  const startRoom = ROOMS_DATA.find(r => r.id === startRoomId);
  const destRoom = ROOMS_DATA.find(r => r.id === destRoomId);

  if (!startRoom || !destRoom || startRoomId === destRoomId) return null;

  const startNode = 'door_' + startRoomId;
  const endNode = 'door_' + destRoomId;

  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(WAYPOINTS));

  Object.keys(WAYPOINTS).forEach(id => {
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

    const neighbors = GRAPH[current] || [];
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

  // Exact point coordinates along door and corridors
  const points = [
    [startRoom.cx, startRoom.cy],
    ...path.map(id => [WAYPOINTS[id].x, WAYPOINTS[id].y]),
    [destRoom.cx, destRoom.cy]
  ];

  // Decompose path into indoor vs outdoor line segments
  const segments = [];
  segments.push({
    p1: [startRoom.cx, startRoom.cy],
    p2: [WAYPOINTS[startNode].x, WAYPOINTS[startNode].y],
    type: 'indoor'
  });

  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];
    const p1 = [WAYPOINTS[u].x, WAYPOINTS[u].y];
    const p2 = [WAYPOINTS[v].x, WAYPOINTS[v].y];
    let edgeType = 'indoor';
    const edge = (GRAPH[u] || []).find(e => e.to === v);
    if (edge && edge.type) {
      edgeType = edge.type;
    }
    segments.push({ p1, p2, type: edgeType });
  }

  segments.push({
    p1: [WAYPOINTS[endNode].x, WAYPOINTS[endNode].y],
    p2: [destRoom.cx, destRoom.cy],
    type: 'indoor'
  });

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

  const indoorD = buildPathD('indoor');
  const outdoorD = buildPathD('outdoor');
  const hasOutdoor = segments.some(s => s.type === 'outdoor');

  // Compute accurate true physical walking distance (0.4m per SVG unit)
  let distanceMeters = 0;
  for (let i = 0; i < points.length - 1; i++) {
    distanceMeters += Math.hypot(points[i+1][0] - points[i][0], points[i+1][1] - points[i][1]) * 0.4;
  }
  distanceMeters = Math.round(distanceMeters);

  const walkingTimeSeconds = Math.round(distanceMeters / 1.2);
  const minutes = Math.floor(walkingTimeSeconds / 60);
  const seconds = walkingTimeSeconds % 60;
  const durationText = minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;

  // Turn-by-turn steps
  const steps = [];
  steps.push({
    action: 'Depart',
    instruction: `Depart from ${startRoom.name} into hallway`,
    distance: 0
  });

  for (let i = 1; i < path.length - 1; i++) {
    const pPrev = WAYPOINTS[path[i - 1]];
    const pCurr = WAYPOINTS[path[i]];
    const pNext = WAYPOINTS[path[i + 1]];

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

  return {
    startRoom,
    destRoom,
    points,
    indoorD,
    outdoorD,
    hasOutdoor,
    distanceMeters,
    walkingTimeSeconds,
    durationText,
    steps
  };
}

// ==========================================================================
// 4. SVG MAP VECTOR BUILDER (100% Vector Geometry Calibrated to CAD 723x1024)
// ==========================================================================
function renderSvgMap() {
  const svg = document.getElementById('campusMapSvg');
  if (!svg) return;

  // 1. Building Footprints (Outer boundaries aligned to margins: x=168 and x=580)
  const baseGroup = document.getElementById('layerBuildingBase');
  baseGroup.innerHTML = `
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
    <rect class="building-wing" x="216" y="266" width="134" height="10" />
    <rect class="building-wing" x="216" y="340" width="310" height="10" />
    <rect class="building-wing" x="256" y="503" width="94" height="10" />
    <rect class="building-wing" x="404" y="503" width="62" height="10" />
  `;

  // 2. Open Courtyards, Light Wells & Breezeways
  const courtGroup = document.getElementById('layerCourtyards');
  courtGroup.innerHTML = `
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
  `;

  // 3. Hallways, Walkways & Passages (Single clean pathway appearance)
  const corrGroup = document.getElementById('layerCorridors');
  corrGroup.innerHTML = `
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

    <!-- Upper NW Connector Bridge (White line 1 in user image) -->
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
    <line class="corridor-centerline" x1="404" y1="508" x2="523" y2="508" />

    <!-- Main Entrance & Reception Foyer -->
    <rect class="corridor-floor" x="368" y="846" width="12" height="15" rx="1" />
    <line class="corridor-centerline" x1="374" y1="808" x2="374" y2="861" />
  `;

  // 4. Doors & Openings
  const doorGroup = document.getElementById('layerDoors');
  let doorsHtml = '';
  ROOMS_DATA.forEach(r => {
    const [dx, dy] = r.door;
    doorsHtml += `
      <g class="door-marker" data-room="${r.id}">
        <circle cx="${dx}" cy="${dy}" r="1.6" fill="var(--svg-door)" opacity="0.85" />
      </g>
    `;
  });
  doorGroup.innerHTML = doorsHtml;

  // 5. Staircases with Step Lines (NW & NE stairs removed per user image)
  const stairGroup = document.getElementById('layerStairs');
  const stairs = [
    { x: 368, y: 491, w: 14, h: 16, steps: 5, dir: 'h' }, // Central Mid-Bridge
    { x: 262, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }, // Admin West
    { x: 486, y: 689, w: 12, h: 16, steps: 5, dir: 'v' }  // Admin East
  ];

  let stairHtml = '';
  stairs.forEach(st => {
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

  // 6. Rooms & Vector Text Labels
  const roomsGroup = document.getElementById('layerRooms');
  let roomsHtml = '';

  ROOMS_DATA.forEach(r => {
    const showName = r.h >= 24 && r.w >= 36;
    const isSmall = r.w < 42 || r.h < 26;
    const codeY = showName ? (r.cy - 3) : r.cy + 3;
    const nameY = r.cy + 9;
    const fontSize = isSmall ? '7px' : '8.5px';

    let displayName = r.name;
    if (r.w < 42 && displayName.length > 10) {
      displayName = displayName.substring(0, 9) + '..';
    } else if (displayName.length > 14 && r.w < 55) {
      displayName = displayName.substring(0, 12) + '..';
    }

    roomsHtml += `
      <g class="room-group" id="room-${r.id}" data-id="${r.id}" data-category="${r.category}" tabindex="0" role="button" aria-label="${r.code} - ${r.name}">
        <rect class="room-rect" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="2" />
        <text class="room-code-text" x="${r.cx}" y="${codeY}" text-anchor="middle" font-size="${fontSize}">${r.code}</text>
        ${showName ? `<text class="room-name-text" x="${r.cx}" y="${nameY}" text-anchor="middle">${displayName}</text>` : ''}
      </g>
    `;
  });

  roomsGroup.innerHTML = roomsHtml;

  // 7. Walkable Routing Graph (Toggleable)
  const graphGroup = document.getElementById('layerRoutingGraph');
  let graphHtml = '';

  HALLWAY_EDGES.forEach(([u, v, typ = 'indoor']) => {
    const p1 = WAYPOINTS[u];
    const p2 = WAYPOINTS[v];
    if (p1 && p2) {
      const cls = (typ === 'outdoor') ? 'graph-edge outdoor' : 'graph-edge indoor';
      graphHtml += `<line class="${cls}" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" />`;
    }
  });

  Object.values(WAYPOINTS).forEach(wp => {
    if (!wp.id.startsWith('door_')) {
      const isOutdoor = wp.id.startsWith('wp_outdoor');
      const cls = isOutdoor ? 'graph-node outdoor' : 'graph-node';
      graphHtml += `<circle class="${cls}" cx="${wp.x}" cy="${wp.y}" r="2" data-label="${wp.label}" />`;
    }
  });

  graphGroup.innerHTML = graphHtml;

  // Re-attach room click listeners
  setupRoomEvents();
}

// ==========================================================================
// 5. SVG PAN, ZOOM & VIEWPORT ENGINE (Mathematically Exact Screen-to-SVG CTM)
// ==========================================================================
class SvgViewport {
  constructor(viewportEl, svgEl) {
    this.viewport = viewportEl;
    this.svg = svgEl;

    // Base ViewBox matching CAD floor plan
    this.base = { x: 0, y: 0, w: 723, h: 1024 };
    this.current = { ...this.base };

    this.isPanning = false;
    this.startPoint = { x: 0, y: 0 };
    this.startViewBox = { ...this.current };

    this.startTouchDist = 0;
    this.startTouchCenter = { x: 0, y: 0 };
    this.animId = null;

    this.init();
  }

  init() {
    this.updateViewBox();

    // Mouse Pan Events
    this.viewport.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mouseup', () => this.onMouseUp());

    // Mouse Wheel Zoom
    this.viewport.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });

    // Touch Events for Mobile / Tablet
    this.viewport.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
    this.viewport.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    this.viewport.addEventListener('touchend', () => this.onTouchEnd());

    // Window Resize
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
    const newH = Math.min(Math.max(this.current.h * factor, 170), 1700);

    const ratioX = (px - this.current.x) / this.current.w;
    const ratioY = (py - this.current.y) / this.current.h;

    this.current.x = px - ratioX * newW;
    this.current.y = py - ratioY * newH;
    this.current.w = newW;
    this.current.h = newH;

    this.updateViewBox();
  }

  zoomIn() {
    const cx = this.current.x + this.current.w / 2;
    const cy = this.current.y + this.current.h / 2;
    this.zoomAroundPoint(cx, cy, 0.82);
  }

  zoomOut() {
    const cx = this.current.x + this.current.w / 2;
    const cy = this.current.y + this.current.h / 2;
    this.zoomAroundPoint(cx, cy, 1.22);
  }

  onTouchStart(e) {
    if (e.touches.length === 1) {
      this.isPanning = true;
      this.startPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      this.startViewBox = { ...this.current };
    } else if (e.touches.length === 2) {
      e.preventDefault();
      this.isPanning = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      this.startTouchDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const midClientX = (t1.clientX + t2.clientX) / 2;
      const midClientY = (t1.clientY + t2.clientY) / 2;
      const svgP = this.getSvgPoint(midClientX, midClientY);
      this.startTouchCenter = { x: svgP.x, y: svgP.y };
      this.startViewBox = { ...this.current };
    }
  }

  onTouchMove(e) {
    if (e.touches.length === 1 && this.isPanning) {
      const ctm = this.svg.getScreenCTM();
      const scale = ctm ? ctm.a : (this.viewport.clientWidth / this.current.w);
      const dx = (e.touches[0].clientX - this.startPoint.x) / scale;
      const dy = (e.touches[0].clientY - this.startPoint.y) / scale;
      this.current.x = this.startViewBox.x - dx;
      this.current.y = this.startViewBox.y - dy;
      this.updateViewBox();
    } else if (e.touches.length === 2) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      if (this.startTouchDist > 0 && dist > 0) {
        const factor = this.startTouchDist / dist;
        this.zoomAroundPoint(this.startTouchCenter.x, this.startTouchCenter.y, factor);
      }
    }
  }

  onTouchEnd() {
    this.isPanning = false;
    this.startTouchDist = 0;
  }

  onResize() {
    this.updateViewBox();
  }

  resetView(duration = 500) {
    this.animateTo(this.base.x, this.base.y, this.base.w, this.base.h, duration);
  }

  focusRoom(room, duration = 600) {
    if (!room) return;
    const targetW = 240;
    const targetH = 340;

    const sidebar = document.getElementById('navSidebar');
    const isCollapsed = sidebar && sidebar.classList.contains('collapsed');
    const xOffset = isCollapsed ? 0 : 35;

    const targetX = room.cx - targetW / 2 - xOffset;
    const targetY = room.cy - targetH / 2;

    this.animateTo(targetX, targetY, targetW, targetH, duration);
  }

  focusBounds(minX, minY, maxX, maxY, duration = 600) {
    const padding = 60;
    const sidebar = document.getElementById('navSidebar');
    const isCollapsed = sidebar && sidebar.classList.contains('collapsed');
    const leftPad = isCollapsed ? padding : padding + 50;

    let targetW = (maxX - minX) + leftPad + padding;
    let targetH = (maxY - minY) + padding * 2;

    targetW = Math.max(targetW, 260);
    targetH = Math.max(targetH, 320);

    const targetX = (minX + maxX) / 2 - targetW / 2 - (isCollapsed ? 0 : 25);
    const targetY = (minY + maxY) / 2 - targetH / 2;

    this.animateTo(targetX, targetY, targetW, targetH, duration);
  }

  animateTo(tx, ty, tw, th, duration = 500) {
    if (this.animId) cancelAnimationFrame(this.animId);

    const startX = this.current.x;
    const startY = this.current.y;
    const startW = this.current.w;
    const startH = this.current.h;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      const eased = easeOutCubic(progress);

      this.current.x = startX + (tx - startX) * eased;
      this.current.y = startY + (ty - startY) * eased;
      this.current.w = startW + (tw - startW) * eased;
      this.current.h = startH + (th - startH) * eased;

      this.updateViewBox();

      if (progress < 1.0) {
        this.animId = requestAnimationFrame(step);
      } else {
        this.animId = null;
      }
    };

    this.animId = requestAnimationFrame(step);
  }
}

// ==========================================================================
// 6. APPLICATION CONTROLLER & STATE
// ==========================================================================
const appState = {
  currentFloor: 0,
  activeTheme: 'dark',
  activeCategory: 'ALL',
  selectedRoom: null,
  startRoomId: '',
  destRoomId: '',
  currentRoute: null,
  showLegend: false,
  showGraph: false,
  isSimulating: false,
  simFrameId: null
};

let viewport = null;

document.addEventListener('DOMContentLoaded', () => {
  const viewportEl = document.getElementById('mapViewport');
  const svgEl = document.getElementById('campusMapSvg');

  // Render vector SVG floor plan
  renderSvgMap();

  // Initialize SvgViewport
  viewport = new SvgViewport(viewportEl, svgEl);

  // Populate UI dropdowns and room directory
  populateDropdowns();
  renderDirectoryList();

  // Attach UI listeners
  initUI();
});

function setupRoomEvents() {
  const roomGroups = document.querySelectorAll('.room-group');
  roomGroups.forEach(grp => {
    grp.addEventListener('click', (e) => {
      e.stopPropagation();
      const roomId = grp.dataset.id;
      selectRoom(roomId, true);
    });

    grp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectRoom(grp.dataset.id, true);
      }
    });
  });
}

function selectRoom(roomId, shouldFocus = false) {
  const room = ROOMS_DATA.find(r => r.id === roomId);
  if (!room) return;

  // Unhighlight previous
  if (appState.selectedRoom) {
    const prevEl = document.getElementById(`room-${appState.selectedRoom.id}`);
    if (prevEl) prevEl.classList.remove('selected');
  }

  appState.selectedRoom = room;

  // Highlight new
  const curEl = document.getElementById(`room-${room.id}`);
  if (curEl) curEl.classList.add('selected');

  // Open Room Detail Card
  showRoomDetailCard(room);

  // Focus and Zoom onto room
  if (shouldFocus && viewport) {
    viewport.focusRoom(room);
  }
}

function showRoomDetailCard(room) {
  const card = document.getElementById('roomDetailCard');
  if (!card) return;

  document.getElementById('detailRoomCode').textContent = room.code;
  document.getElementById('detailRoomName').textContent = room.name;
  document.getElementById('detailWingBadge').textContent = room.wing;

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
  const filtered = ROOMS_DATA.filter(r => {
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

    item.innerHTML = `
      <div class="item-code" style="color: ${tagColor};">${room.code}</div>
      <div class="item-info">
        <div class="item-name">${room.name}</div>
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

  const optionsHtml = '<option value="">Select location...</option>' +
    ROOMS_DATA.slice().sort((a, b) => a.code.localeCompare(b.code)).map(r => `
      <option value="${r.id}">${r.code} - ${r.name}</option>
    `).join('');

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

  // Build SVG path string
  const d = route.points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`).join(' ');

  const glowPath = document.getElementById('svgRouteGlow');
  const corePath = document.getElementById('svgRouteCore');
  const outdoorGlow = document.getElementById('svgRouteOutdoorGlow');
  const outdoorCore = document.getElementById('svgRouteOutdoorCore');
  const startPin = document.getElementById('svgStartPin');
  const destPin = document.getElementById('svgDestPin');

  if (glowPath && corePath) {
    glowPath.setAttribute('d', route.indoorD || '');
    corePath.setAttribute('d', route.indoorD || '');
  }

  if (outdoorGlow && outdoorCore) {
    outdoorGlow.setAttribute('d', route.outdoorD || '');
    outdoorCore.setAttribute('d', route.outdoorD || '');
  }

  // Position Start & Destination pins
  const pStart = route.points[0];
  const pDest = route.points[route.points.length - 1];

  startPin.setAttribute('transform', `translate(${pStart[0]}, ${pStart[1]})`);
  destPin.setAttribute('transform', `translate(${pDest[0]}, ${pDest[1]})`);
  startPin.style.display = 'block';
  destPin.style.display = 'block';

  // Metrics Card
  const metricsCard = document.getElementById('routeMetricsCard');
  metricsCard.style.display = 'flex';
  
  const typeBadge = route.hasOutdoor
    ? '<span class="route-type-badge outdoor">Outdoor Route</span>'
    : '<span class="route-type-badge indoor">Indoor Only</span>';

  document.getElementById('routeDistVal').innerHTML = `${route.distanceMeters} m ${typeBadge}`;
  document.getElementById('routeTimeVal').textContent = route.durationText;

  // Turn directions
  renderTurnDirections(route.steps);

  // Focus camera bounds
  const xs = route.points.map(p => p[0]);
  const ys = route.points.map(p => p[1]);
  if (viewport) {
    viewport.focusBounds(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys));
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
          <polyline points="15 14 20 9 15 4"></polyline>
          <path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
        </svg>
      `;
    } else if (step.action === 'Turn Left') {
      iconSvg = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 14 4 9 9 4"></polyline>
          <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
        </svg>
      `;
    } else if (step.action === 'Arrive') {
      iconSvg = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      `;
    }

    stepEl.innerHTML = `
      <div class="turn-icon-box">${iconSvg}</div>
      <div class="turn-details">
        <div class="turn-instruction">${step.instruction}</div>
        ${step.distance > 0 ? `<div class="turn-distance">${step.distance} meters</div>` : ''}
      </div>
    `;

    container.appendChild(stepEl);
  });
}

function startWalkingSimulation() {
  if (!appState.currentRoute) return;

  const walker = document.getElementById('svgWalkerAvatar');
  const btn = document.getElementById('startSimBtn');

  if (appState.isSimulating) {
    cancelAnimationFrame(appState.simFrameId);
    appState.isSimulating = false;
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
      Simulate
    `;
    return;
  }

  const points = appState.currentRoute.points;
  if (points.length < 2) return;

  walker.style.display = 'block';
  appState.isSimulating = true;
  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
    Pause
  `;

  let seg = 0;
  let t = 0;
  const speed = 0.025;

  function step() {
    if (!appState.isSimulating) return;

    const p1 = points[seg];
    const p2 = points[seg + 1];

    if (!p2) {
      appState.isSimulating = false;
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        Replay
      `;
      return;
    }

    t += speed;
    if (t >= 1.0) {
      t = 0;
      seg++;
    }

    const curX = p1[0] + (p2[0] - p1[0]) * Math.min(t, 1.0);
    const curY = p1[1] + (p2[1] - p1[1]) * Math.min(t, 1.0);

    walker.setAttribute('transform', `translate(${curX}, ${curY})`);
    appState.simFrameId = requestAnimationFrame(step);
  }

  appState.simFrameId = requestAnimationFrame(step);
}

function clearRoute() {
  appState.currentRoute = null;
  if (appState.isSimulating) {
    cancelAnimationFrame(appState.simFrameId);
    appState.isSimulating = false;
  }

  document.getElementById('svgRouteGlow').setAttribute('d', '');
  document.getElementById('svgRouteCore').setAttribute('d', '');
  const outdoorGlow = document.getElementById('svgRouteOutdoorGlow');
  const outdoorCore = document.getElementById('svgRouteOutdoorCore');
  if (outdoorGlow) outdoorGlow.setAttribute('d', '');
  if (outdoorCore) outdoorCore.setAttribute('d', '');
  document.getElementById('svgStartPin').style.display = 'none';
  document.getElementById('svgDestPin').style.display = 'none';
  document.getElementById('svgWalkerAvatar').style.display = 'none';

  document.getElementById('routeMetricsCard').style.display = 'none';
  document.getElementById('turnDirectionsCard').style.display = 'none';
}

function switchTab(tabName) {
  const exploreTab = document.getElementById('tabExplore');
  const dirTab = document.getElementById('tabDirections');
  const exploreSec = document.getElementById('exploreSection');
  const dirSec = document.getElementById('directionsSection');

  if (tabName === 'explore') {
    exploreTab.classList.add('active');
    dirTab.classList.remove('active');
    exploreSec.style.display = 'block';
    dirSec.style.display = 'none';
  } else {
    exploreTab.classList.remove('active');
    dirTab.classList.add('active');
    exploreSec.style.display = 'none';
    dirSec.style.display = 'block';
  }
}

function applyTheme(theme) {
  appState.activeTheme = theme;
  document.body.className = `theme-${theme}`;

  document.getElementById('themeDarkBtn').classList.toggle('active', theme === 'dark');
  document.getElementById('themeBlueprintBtn').classList.toggle('active', theme === 'blueprint');
  document.getElementById('themeLightBtn').classList.toggle('active', theme === 'light');
}

function switchFloor(floorNum) {
  const floorButtons = document.querySelectorAll('.floor-seg-btn');
  floorButtons.forEach(btn => {
    const f = parseInt(btn.dataset.floor, 10);
    const isActive = (f === floorNum);
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
  });

  if (floorNum !== 0) {
    showNotification(`Floor ${floorNum} (Classrooms & Labs) is coming soon. Showing Ground Floor vector map.`);
    setTimeout(() => {
      switchFloor(0);
    }, 2200);
    return;
  }

  appState.currentFloor = 0;
  clearRoute();
  if (viewport) viewport.resetView();
}

function showNotification(msg) {
  let toast = document.getElementById('mapToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'mapToast';
    toast.className = 'map-toast-notification';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2500);
}

// ==========================================================================
// 8. SETUP UI LISTENERS
// ==========================================================================
function initUI() {
  // Floor switcher
  document.querySelectorAll('.floor-seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = parseInt(btn.dataset.floor, 10);
      switchFloor(f);
    });
  });

  // Tabs
  document.getElementById('tabExplore').addEventListener('click', () => switchTab('explore'));
  document.getElementById('tabDirections').addEventListener('click', () => switchTab('directions'));

  // Sidebar collapse/expand
  const sidebar = document.getElementById('navSidebar');
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const collapseBtn = document.getElementById('collapseSidebarBtn');

  collapseBtn.addEventListener('click', () => {
    sidebar.classList.add('collapsed');
    toggleBtn.classList.add('visible');
  });

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.remove('collapsed');
    toggleBtn.classList.remove('visible');
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');

  searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    clearBtn.style.display = val ? 'block' : 'none';
    renderDirectoryList(val, appState.activeCategory);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    renderDirectoryList('', appState.activeCategory);
    searchInput.focus();
  });

  // Category filter chips
  document.querySelectorAll('#categoryChips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#categoryChips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      appState.activeCategory = chip.dataset.category;
      renderDirectoryList(searchInput.value, appState.activeCategory);
    });
  });

  // Close Detail Card
  document.getElementById('closeDetailCardBtn').addEventListener('click', () => {
    document.getElementById('roomDetailCard').style.display = 'none';
    if (appState.selectedRoom) {
      const prevEl = document.getElementById(`room-${appState.selectedRoom.id}`);
      if (prevEl) prevEl.classList.remove('selected');
      appState.selectedRoom = null;
    }
  });

  // Directions dropdowns
  document.getElementById('startRoomSelect').addEventListener('change', (e) => {
    appState.startRoomId = e.target.value;
    calculateAndRenderRoute();
  });

  document.getElementById('destRoomSelect').addEventListener('change', (e) => {
    appState.destRoomId = e.target.value;
    calculateAndRenderRoute();
  });

  // Swap Route Button
  document.getElementById('swapRouteBtn').addEventListener('click', () => {
    const startSelect = document.getElementById('startRoomSelect');
    const destSelect = document.getElementById('destRoomSelect');
    const temp = startSelect.value;
    startSelect.value = destSelect.value;
    destSelect.value = temp;
    appState.startRoomId = startSelect.value;
    appState.destRoomId = destSelect.value;
    calculateAndRenderRoute();
  });

  // Route presets
  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.dataset.preset;
      let start = '', dest = '';
      if (preset === 'REC_TO_COMP') { start = 'RECEPTION'; dest = 'S-013'; }
      else if (preset === 'AMRI_TO_ROBOT') { start = 'A-006'; dest = 'S-011'; }
      else if (preset === 'ADMIN_TO_PRIN') { start = 'RECEPTION'; dest = 'N-013'; }
      else if (preset === 'ACHA_TO_NANO') { start = 'A-001'; dest = 'N-005-006'; }

      document.getElementById('startRoomSelect').value = start;
      document.getElementById('destRoomSelect').value = dest;
      appState.startRoomId = start;
      appState.destRoomId = dest;
      calculateAndRenderRoute();
    });
  });

  // Walking simulation button
  document.getElementById('startSimBtn').addEventListener('click', startWalkingSimulation);

  // Themes
  document.getElementById('themeDarkBtn').addEventListener('click', () => applyTheme('dark'));
  document.getElementById('themeBlueprintBtn').addEventListener('click', () => applyTheme('blueprint'));
  document.getElementById('themeLightBtn').addEventListener('click', () => applyTheme('light'));

  // Legend Toggle
  const legendBtn = document.getElementById('toggleLegendBtn');
  const legendEl = document.getElementById('mapLegend');
  legendBtn.addEventListener('click', () => {
    appState.showLegend = !appState.showLegend;
    legendBtn.classList.toggle('active', appState.showLegend);
    legendEl.classList.toggle('hidden', !appState.showLegend);
  });
  legendEl.classList.add('hidden');

  // Graph Lines Toggle
  const graphBtn = document.getElementById('toggleGraphBtn');
  const graphGroup = document.getElementById('layerRoutingGraph');
  graphBtn.addEventListener('click', () => {
    appState.showGraph = !appState.showGraph;
    graphBtn.classList.toggle('active', appState.showGraph);
    graphGroup.style.display = appState.showGraph ? 'block' : 'none';
  });

  // Reset View & Recenter
  document.getElementById('resetViewBtn').addEventListener('click', () => {
    if (viewport) viewport.resetView();
  });

  // Floating Zoom Controls
  document.getElementById('zoomInBtn').addEventListener('click', () => {
    if (viewport) viewport.zoomIn();
  });

  document.getElementById('zoomOutBtn').addEventListener('click', () => {
    if (viewport) viewport.zoomOut();
  });
}
