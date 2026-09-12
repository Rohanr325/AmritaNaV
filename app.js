/**
 * Amritanav Campus Navigation - Production Vector Floor Plan Engine
 * 100% Scalable Vector Graphics (SVG) with Pan/Zoom, Instant Search,
 * Dijkstra Pathfinding, Smooth Camera Focus, and Theme Control.
 */

// ==========================================================================
// 1. MASTER ROOMS DATABASE (Exact Ground Floor Coordinates)
// ==========================================================================
const ROOMS_DATA = [
  // ---------- ADMIN BLOCK (A) - BOTTOM SECTION ----------
  { id: 'RECEPTION', code: 'REC', name: 'Reception & Telephone', wing: 'Admin Block (A)', category: 'FACILITY', x: 348, y: 728, w: 58, h: 42, door: [377, 728], desc: 'Main reception desk, visitor badges, security check-in and telephone operator services.' },
  { id: 'GAD-PR', code: 'GAD', name: 'GAD - PR Office', wing: 'Admin Block (A)', category: 'OFFICE', x: 340, y: 770, w: 74, h: 42, door: [377, 770], desc: 'General Administration Department & Public Relations Liaison Office at the main entrance porch.' },
  { id: 'ADMIN-A', code: 'ADM-01', name: 'Admin Block Central Office', wing: 'Admin Block (A)', category: 'OFFICE', x: 348, y: 682, w: 58, h: 40, door: [377, 682], desc: 'Ground Floor Administrative Registry and University Central Enquiries.' },
  { id: 'PRAYER-HALL-A', code: 'PRY-A', name: 'Central Prayer Hall', wing: 'Admin Block (A)', category: 'ROOM', x: 343, y: 642, w: 68, h: 36, door: [377, 672], desc: 'Central prayer, contemplation and reflection sanctuary at the heart of the ground floor.' },
  { id: 'A-004', code: 'A-004', name: 'Executive Office A-004', wing: 'Admin Block (A)', category: 'OFFICE', x: 315, y: 676, w: 25, h: 52, door: [327, 676], desc: 'Administrative Liaison and records archive.' },
  { id: 'A-005', code: 'A-005', name: 'Special Programs / Meditation', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 280, y: 676, w: 35, h: 52, door: [297, 676], desc: 'Dedicated serene hall for IAM Meditation, yoga sessions, and discourses.' },
  { id: 'A-006', code: 'A-006', name: 'Amritheswari Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 230, y: 574, w: 44, h: 104, door: [252, 672], desc: 'Grand University Cultural Auditorium with stage lighting and 600+ seating capacity.' },
  { id: 'A-003', code: 'A-003', name: 'Admin Suite A-003', wing: 'Admin Block (A)', category: 'OFFICE', x: 413, y: 676, w: 25, h: 52, door: [425, 676], desc: 'Administrative advisory and conference chamber.' },
  { id: 'A-002', code: 'A-002', name: 'ENGM Conference Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 438, y: 676, w: 30, h: 52, door: [453, 676], desc: 'Corporate boardroom and executive seminar conference suite.' },
  { id: 'MINI-CONF', code: 'CONF-01', name: 'Mini Conference Room', wing: 'Admin Block (A)', category: 'ROOM', x: 418, y: 728, w: 46, h: 28, door: [418, 742], desc: 'Small group briefing and video-conference facility.' },
  { id: 'A-001', code: 'A-001', name: 'Acharya Hall', wing: 'Admin Block (A)', category: 'AUDITORIUM', x: 468, y: 574, w: 48, h: 104, door: [492, 672], desc: 'Premier University Auditorium with 500+ seating capacity for convocations and symposiums.' },

  // ---------- NORTHERN WING (N) - CENTRAL SPINE ----------
  { id: 'N-001', code: 'N-001', name: 'Admission Office', wing: 'Northern Wing (N)', category: 'OFFICE', x: 312, y: 574, w: 31, h: 38, door: [343, 593], desc: 'University Admissions, application processing, counseling, and enrollment helpdesk.' },
  { id: 'N-002', code: 'N-002', name: 'Mech. Professors Room', wing: 'Northern Wing (N)', category: 'OFFICE', x: 312, y: 544, w: 31, h: 30, door: [343, 559], desc: 'Senior Faculty Cabins for Department of Mechanical Engineering.' },
  { id: 'N-003', code: 'N-003', name: 'CIR Seminar Room', wing: 'Northern Wing (N)', category: 'ROOM', x: 312, y: 514, w: 31, h: 30, door: [343, 529], desc: 'Corporate and Industry Relations (CIR) training & interview suite.' },
  { id: 'N-010', code: 'N-010', name: 'Staff Room (Mech)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 312, y: 448, w: 31, h: 48, door: [343, 472], desc: 'Mechanical Engineering Department Faculty and Academic Staff room.' },
  { id: 'N-011', code: 'N-011', name: 'Student Affairs Office', wing: 'Northern Wing (N)', category: 'OFFICE', x: 312, y: 410, w: 31, h: 36, door: [343, 428], desc: 'Office of Student Welfare, student club activities and campus life coordination.' },
  { id: 'N-012', code: 'N-012', name: 'Human Resources (HR) Dept', wing: 'Northern Wing (N)', category: 'OFFICE', x: 312, y: 374, w: 31, h: 34, door: [343, 391], desc: 'University Human Resources & Staff Administration.' },
  { id: 'N-013', code: 'N-013', name: 'Principal (Engineering)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 312, y: 338, w: 31, h: 36, door: [343, 356], desc: 'Executive Office of the Principal, School of Engineering.' },
  { id: 'N-018', code: 'N-018', name: 'Dept of Mathematics (108)', wing: 'Northern Wing (N)', category: 'OFFICE', x: 312, y: 274, w: 31, h: 52, door: [343, 300], desc: 'Mathematics Faculty department, research cubicles and consultation rooms.' },
  { id: 'N-019', code: 'N-019', name: 'Electrical Machines Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 304, y: 184, w: 39, h: 90, door: [343, 229], desc: 'High-voltage electric motors, generators, transformers, and power dynamics research station.' },
  { id: 'N-020', code: 'N-020', name: 'Northern Prayer Hall', wing: 'Northern Wing (N)', category: 'ROOM', x: 304, y: 156, w: 39, h: 28, door: [343, 170], desc: 'North Wing prayer hall and quiet space.' },

  // ---------- NORTHERN WING (N) - OUTER LABS ----------
  { id: 'N-005-006', code: 'N-005', name: 'Nano Sciences (Solar Lab)', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 512, w: 70, h: 48, door: [238, 536], desc: 'Storage Integrated Solar Module Research Laboratory & Clean Energy Systems.' },
  { id: 'N-004', code: 'N-004', name: 'Amrita Center for Nano Sciences', wing: 'Northern Wing (N)', category: 'LAB', x: 238, y: 512, w: 36, h: 48, door: [274, 536], desc: 'Advanced Nanotechnology materials synthesis and molecular characterization.' },
  { id: 'N-007', code: 'N-007', name: 'Thermal Engineering Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 168, y: 448, w: 54, h: 44, door: [222, 470], desc: 'Thermodynamics test benches, heat exchangers, refrigeration cycles and engines.' },
  { id: 'N-008', code: 'N-008', name: 'M.Tech Fluid Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 222, y: 448, w: 32, h: 44, door: [254, 470], desc: 'Advanced postgraduate fluid mechanics and CFD boundary flow testing facility.' },
  { id: 'N-009', code: 'N-009', name: 'Nano Center (Lab 009)', wing: 'Northern Wing (N)', category: 'LAB', x: 254, y: 448, w: 26, h: 44, door: [274, 470], desc: 'Nanomaterial device fabrication and clean room testing.' },
  { id: 'N-014', code: 'N-014', name: 'Metallurgy Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 235, y: 374, w: 39, h: 34, door: [274, 391], desc: 'Specimen polishing, metallographic microscope analysis, and heat treatment furnace.' },
  { id: 'N-015', code: 'N-015', name: 'Fluid Mechanics Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 235, y: 338, w: 39, h: 36, door: [274, 356], desc: 'Hydraulic flumes, flow meters, Bernoulli apparatus, and pipe friction rigs.' },
  { id: 'N-016', code: 'N-016', name: 'CAE Simulation Cell', wing: 'Northern Wing (N)', category: 'LAB', x: 235, y: 308, w: 39, h: 30, door: [274, 323], desc: 'Computer-Aided Engineering simulation workstations (Ansys, SolidWorks, FEA).' },
  { id: 'N-017', code: 'N-017', name: 'Machine Dynamics Lab', wing: 'Northern Wing (N)', category: 'LAB', x: 235, y: 274, w: 39, h: 34, door: [274, 291], desc: 'Kinematics, vibration analysis, whirling of shafts, and balancing equipment.' },
  { id: 'TOILET-N-LOWER', code: 'WC-N1', name: 'Gents Restroom (NW-Lower)', wing: 'Northern Wing (N)', category: 'TOILET', x: 115, y: 484, w: 45, h: 32, door: [160, 500], desc: 'Gents washrooms and drinking water point near Thermal Lab.' },
  { id: 'TOILET-N-UPPER', code: 'WC-N2', name: 'Gents Restroom (NW-Upper)', wing: 'Northern Wing (N)', category: 'TOILET', x: 135, y: 236, w: 48, h: 38, door: [183, 255], desc: 'Gents washrooms near Dynamics & Machines Lab.' },

  // ---------- SOUTHERN WING (S) - CENTRAL SPINE ----------
  { id: 'S-001', code: 'S-001', name: 'University Guest Room', wing: 'Southern Wing (S)', category: 'ROOM', x: 411, y: 574, w: 31, h: 38, door: [411, 593], desc: 'Visiting dignitary and VIP accommodation room.' },
  { id: 'S-002', code: 'S-002', name: 'Amrita SeRVe & Humanities', wing: 'Southern Wing (S)', category: 'OFFICE', x: 411, y: 544, w: 31, h: 30, door: [411, 559], desc: 'Amrita SeRVe (Village Development) & Humanities Faculty.' },
  { id: 'S-003', code: 'S-003', name: 'Guest Room Kitchen', wing: 'Southern Wing (S)', category: 'FACILITY', x: 411, y: 514, w: 31, h: 30, door: [411, 529], desc: 'Executive hospitality pantry and dining kitchen for university guests.' },
  { id: 'S-006', code: 'S-006', name: 'Staff Room (ECE & EEE)', wing: 'Southern Wing (S)', category: 'OFFICE', x: 411, y: 448, w: 31, h: 48, door: [411, 472], desc: 'Faculty Cabins for Department of Electrical & Electronics Engineering.' },
  { id: 'S-007', code: 'S-007', name: 'Director & Assoc. Dean', wing: 'Southern Wing (S)', category: 'OFFICE', x: 411, y: 410, w: 31, h: 36, door: [411, 428], desc: 'Executive Suite of Campus Director and Associate Dean of Academic Affairs.' },
  { id: 'S-008', code: 'S-008', name: 'Principal (Arts & Sciences)', wing: 'Southern Wing (S)', category: 'OFFICE', x: 411, y: 374, w: 31, h: 34, door: [411, 391], desc: 'Executive Office of Principal, School of Arts & Sciences.' },
  { id: 'S-009', code: 'S-009', name: 'Faculty Room S-009', wing: 'Southern Wing (S)', category: 'OFFICE', x: 411, y: 358, w: 31, h: 16, door: [411, 366], desc: 'Academic faculty rooms and consultation cabins.' },
  { id: 'S-010', code: 'S-010', name: 'South Conference Room', wing: 'Southern Wing (S)', category: 'ROOM', x: 411, y: 338, w: 31, h: 20, door: [411, 348], desc: 'Departmental meeting and presentation conference hall.' },
  { id: 'S-012', code: 'S-012', name: 'College Administration Office', wing: 'Southern Wing (S)', category: 'OFFICE', x: 411, y: 284, w: 31, h: 50, door: [411, 309], desc: 'Academic registrar, fee payments, certificate issuance, and helpdesk.' },
  { id: 'S-013', code: 'S-013', name: 'Central Computer Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 411, y: 194, w: 39, h: 90, door: [411, 239], desc: 'Flagship high-performance computing laboratory, gigabit network and AI workstations.' },
  { id: 'S-014', code: 'S-014', name: 'Nanotechnology Research Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 411, y: 156, w: 39, h: 38, door: [411, 175], desc: 'Advanced nanotech characterization and microfluidics research facility.' },

  // ---------- SOUTHERN WING (S) - OUTER LABS & SERVICES ----------
  { id: 'S-004A', code: 'S-004A', name: 'Research Cell S-004A', wing: 'Southern Wing (S)', category: 'LAB', x: 472, y: 548, w: 46, h: 18, door: [472, 557], desc: 'Special projects research cell and technical incubation hub.' },
  { id: 'S-004', code: 'S-004', name: 'Faculty Room S-004', wing: 'Southern Wing (S)', category: 'OFFICE', x: 472, y: 530, w: 46, h: 18, door: [472, 539], desc: 'Engineering faculty discussion and consultation office.' },
  { id: 'S-MFG', code: 'S-MFG', name: 'Manufacturing Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 472, y: 474, w: 46, h: 56, door: [472, 502], desc: 'Lathes, milling machines, shaper machines, welding, and advanced tooling stations.' },
  { id: 'S-005', code: 'S-005', name: 'Materials Lab Testing Bay', wing: 'Southern Wing (S)', category: 'LAB', x: 472, y: 448, w: 46, h: 26, door: [472, 461], desc: 'Specimen preparation and hardness testing station.' },
  { id: 'S-MAT', code: 'S-MAT', name: 'Material Testing Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 518, y: 448, w: 58, h: 37, door: [518, 466], desc: 'Universal Testing Machine (UTM), tensile strength, impact, and torsion tests.' },
  { id: 'S-STAT', code: 'S-STAT', name: 'Stationery & Courier', wing: 'Southern Wing (S)', category: 'FACILITY', x: 518, y: 505, w: 58, h: 42, door: [518, 526], desc: 'Campus stationery store, reprographics, printing, parcel dispatch, and courier desk.' },
  { id: 'S-011A', code: 'S-011A', name: 'Mechanical Workshop', wing: 'Southern Wing (S)', category: 'LAB', x: 472, y: 362, w: 46, h: 36, door: [472, 380], desc: 'Fitting, carpentry, sheet metal and foundry training workshop.' },
  { id: 'S-011', code: 'S-011', name: 'CNC Robotics Lab', wing: 'Southern Wing (S)', category: 'LAB', x: 472, y: 328, w: 46, h: 34, door: [472, 345], desc: 'Industrial robotic arms, automated 3-axis CNC machining, and automation rigs.' },
  { id: 'S-011B', code: 'S-011B', name: 'Wind Tunnel Facility', wing: 'Southern Wing (S)', category: 'LAB', x: 472, y: 290, w: 46, h: 38, door: [472, 309], desc: 'Subsonic aerodynamic wind tunnel, airfoil lift/drag sensors, and wind testing.' },
  { id: 'S-SHOP', code: 'S-SHOP', name: 'Shop Superintendent Office', wing: 'Southern Wing (S)', category: 'OFFICE', x: 519, y: 362, w: 56, h: 36, door: [519, 380], desc: 'Workshop Superintendent, tooling inventory, and safety compliance.' },
  { id: 'TOILET-S-STAFF', code: 'WC-S1', name: 'Staff & Ladies Restroom', wing: 'Southern Wing (S)', category: 'TOILET', x: 519, y: 398, w: 56, h: 32, door: [519, 414], desc: 'Staff restrooms and sanitary facilities.' },
  { id: 'TOILET-S-UPPER', code: 'WC-S2', name: 'Ladies Restroom (NE)', wing: 'Southern Wing (S)', category: 'TOILET', x: 519, y: 240, w: 56, h: 35, door: [519, 257], desc: 'Ladies washrooms and rest chambers.' },
  { id: 'INFIRMARY', code: 'MED-01', name: 'Ladies Infirmary & Medical Post', wing: 'Southern Wing (S)', category: 'FACILITY', x: 519, y: 275, w: 56, h: 35, door: [519, 292], desc: 'First aid, nursing care, doctor consultation, and emergency rest recovery ward.' }
];

// Enrich rooms with calculated centers
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
// 2. HALLWAY WAYPOINTS & NAVIGATION GRAPH
// ==========================================================================
const WAYPOINTS = {
  // Admin Block & Entrance
  'wp_entrance':        { id: 'wp_entrance',        x: 377, y: 805, label: 'Main Entrance Porch' },
  'wp_reception':       { id: 'wp_reception',       x: 377, y: 742, label: 'Reception Foyer' },
  'wp_admin_cross':     { id: 'wp_admin_cross',     x: 377, y: 672, label: 'Admin Central Hallway' },
  'wp_admin_west_1':    { id: 'wp_admin_west_1',    x: 327, y: 672, label: 'Admin West Walkway' },
  'wp_admin_west_end':  { id: 'wp_admin_west_end',  x: 252, y: 672, label: 'Amritheswari Hall Foyer' },
  'wp_admin_east_1':    { id: 'wp_admin_east_1',    x: 435, y: 672, label: 'Admin East Walkway' },
  'wp_admin_east_end':  { id: 'wp_admin_east_end',  x: 492, y: 672, label: 'Acharya Hall Foyer' },
  'wp_prayer_junction': { id: 'wp_prayer_junction', x: 377, y: 650, label: 'Central Prayer Hall Foyer' },

  // Central Courtyard & Cross Bridges
  'wp_atrium_south':    { id: 'wp_atrium_south',    x: 377, y: 620, label: 'Central Quadrangle - South' },
  'wp_atrium_mid':      { id: 'wp_atrium_mid',      x: 377, y: 550, label: 'Central Quadrangle Center' },
  'wp_mid_bridge_cntr': { id: 'wp_mid_bridge_cntr', x: 377, y: 499, label: 'Mid-Bridge Central Stairs' },
  'wp_atrium_upper':    { id: 'wp_atrium_upper',    x: 377, y: 440, label: 'Upper Atrium Garden' },
  'wp_top_bridge_cntr': { id: 'wp_top_bridge_cntr', x: 377, y: 150, label: 'Top-Bridge Center' },

  // North Spine Veranda Corridor (X = 347)
  'wp_n_spine_junc':    { id: 'wp_n_spine_junc',    x: 347, y: 672, label: 'North-Admin Junction' },
  'wp_n_spine_1':       { id: 'wp_n_spine_1',       x: 347, y: 593, label: 'North Corridor (Admission N-001)' },
  'wp_n_spine_2':       { id: 'wp_n_spine_2',       x: 347, y: 559, label: 'North Corridor (Mech Prof N-002)' },
  'wp_n_spine_3':       { id: 'wp_n_spine_3',       x: 347, y: 529, label: 'North Corridor (CIR Seminar N-003)' },
  'wp_n_bridge_mid':    { id: 'wp_n_bridge_mid',    x: 347, y: 499, label: 'North Mid-Bridge Hub' },
  'wp_n_spine_4':       { id: 'wp_n_spine_4',       x: 347, y: 472, label: 'North Corridor (Staff Mech N-010)' },
  'wp_n_spine_5':       { id: 'wp_n_spine_5',       x: 347, y: 428, label: 'North Corridor (Student Affairs N-011)' },
  'wp_n_spine_6':       { id: 'wp_n_spine_6',       x: 347, y: 391, label: 'North Corridor (HR Dept N-012)' },
  'wp_n_spine_7':       { id: 'wp_n_spine_7',       x: 347, y: 356, label: 'North Corridor (Principal N-013)' },
  'wp_n_cross_hub':     { id: 'wp_n_cross_hub',     x: 347, y: 345, label: 'North Light-Well Cross Hub' },
  'wp_n_spine_8':       { id: 'wp_n_spine_8',       x: 347, y: 300, label: 'North Corridor (Math Dept N-018)' },
  'wp_n_spine_9':       { id: 'wp_n_spine_9',       x: 347, y: 229, label: 'North Corridor (Machines Lab N-019)' },
  'wp_n_spine_top':     { id: 'wp_n_spine_top',     x: 347, y: 150, label: 'North Top Bridge Hub (N-020)' },

  // North Outer Lab Corridor (X = 279)
  'wp_n_lab_south':     { id: 'wp_n_lab_south',     x: 279, y: 536, label: 'Nano Sciences Walkway' },
  'wp_n_lab_mid':       { id: 'wp_n_lab_mid',       x: 279, y: 470, label: 'Thermal Lab Walkway' },
  'wp_n_toilet_lower':  { id: 'wp_n_toilet_lower',  x: 160, y: 500, label: 'Gents Restroom Vestibule' },
  'wp_n_lab_junction':  { id: 'wp_n_lab_junction',  x: 279, y: 345, label: 'North Outer Labs Hub' },
  'wp_n_lab_upper_1':   { id: 'wp_n_lab_upper_1',   x: 279, y: 391, label: 'Metallurgy Lab Corridor' },
  'wp_n_lab_upper_2':   { id: 'wp_n_lab_upper_2',   x: 279, y: 356, label: 'Fluid Mech Corridor' },
  'wp_n_lab_upper_3':   { id: 'wp_n_lab_upper_3',   x: 279, y: 323, label: 'CAE Cell Corridor' },
  'wp_n_lab_upper_4':   { id: 'wp_n_lab_upper_4',   x: 279, y: 291, label: 'Dynamics Lab Corridor' },
  'wp_n_toilet_upper':  { id: 'wp_n_toilet_upper',  x: 183, y: 255, label: 'Gents Upper Restroom' },

  // South Spine Veranda Corridor (X = 407)
  'wp_s_spine_junc':    { id: 'wp_s_spine_junc',    x: 407, y: 672, label: 'South-Admin Junction' },
  'wp_s_spine_1':       { id: 'wp_s_spine_1',       x: 407, y: 593, label: 'South Corridor (Guest Room S-001)' },
  'wp_s_spine_2':       { id: 'wp_s_spine_2',       x: 407, y: 559, label: 'South Corridor (Amrita SeRVe S-002)' },
  'wp_s_spine_3':       { id: 'wp_s_spine_3',       x: 407, y: 529, label: 'South Corridor (Guest Kitchen S-003)' },
  'wp_s_bridge_mid':    { id: 'wp_s_bridge_mid',    x: 407, y: 499, label: 'South Mid-Bridge Hub' },
  'wp_s_spine_4':       { id: 'wp_s_spine_4',       x: 407, y: 472, label: 'South Corridor (Staff ECE S-006)' },
  'wp_s_spine_5':       { id: 'wp_s_spine_5',       x: 407, y: 428, label: 'South Corridor (Director S-007)' },
  'wp_s_spine_6':       { id: 'wp_s_spine_6',       x: 407, y: 391, label: 'South Corridor (Arts Principal S-008)' },
  'wp_s_spine_7':       { id: 'wp_s_spine_7',       x: 407, y: 358, label: 'South Corridor (Conference S-010)' },
  'wp_s_cross_hub':     { id: 'wp_s_cross_hub',     x: 407, y: 345, label: 'South Light-Well Cross Hub' },
  'wp_s_spine_8':       { id: 'wp_s_spine_8',       x: 407, y: 309, label: 'South Corridor (Admin S-012)' },
  'wp_s_spine_9':       { id: 'wp_s_spine_9',       x: 407, y: 239, label: 'South Corridor (Computer Lab S-013)' },
  'wp_s_spine_top':     { id: 'wp_s_spine_top',     x: 407, y: 150, label: 'South Top Bridge Hub (S-014)' },

  // South Outer Lab Corridor (X = 468)
  'wp_s_lab_south':     { id: 'wp_s_lab_south',     x: 468, y: 548, label: 'Research Corridor (S-004)' },
  'wp_s_lab_mfg':       { id: 'wp_s_lab_mfg',       x: 468, y: 502, label: 'Manufacturing Lab Corridor' },
  'wp_s_lab_testing':   { id: 'wp_s_lab_testing',   x: 468, y: 461, label: 'Materials Testing Corridor' },
  'wp_s_stat':          { id: 'wp_s_stat',          x: 518, y: 526, label: 'Stationery & Courier Desk' },
  'wp_s_lab_junction':  { id: 'wp_s_lab_junction',  x: 468, y: 345, label: 'South Outer Labs Hub' },
  'wp_s_workshop':      { id: 'wp_s_workshop',      x: 468, y: 380, label: 'Mechanical Workshop Corridor' },
  'wp_s_robotics':      { id: 'wp_s_robotics',      x: 468, y: 345, label: 'CNC Robotics Lab Corridor' },
  'wp_s_windtunnel':    { id: 'wp_s_windtunnel',    x: 468, y: 309, label: 'Wind Tunnel Corridor' },
  'wp_s_toilet_staff':  { id: 'wp_s_toilet_staff',  x: 519, y: 414, label: 'Staff & Ladies Restroom' },
  'wp_s_infirmary':     { id: 'wp_s_infirmary',     x: 519, y: 292, label: 'Ladies Infirmary' },
  'wp_s_toilet_upper':  { id: 'wp_s_toilet_upper',  x: 519, y: 257, label: 'Ladies Restroom NE' }
};

// Edges connecting waypoints in corridors [nodeA, nodeB]
const HALLWAY_EDGES = [
  // Entrance & Reception to Admin Hallway
  ['wp_entrance', 'wp_reception'],
  ['wp_reception', 'wp_admin_cross'],

  // Admin Cross Corridor (Transverse continuous passage)
  ['wp_admin_west_end', 'wp_admin_west_1'],
  ['wp_admin_west_1', 'wp_n_spine_junc'],
  ['wp_n_spine_junc', 'wp_admin_cross'],
  ['wp_admin_cross', 'wp_prayer_junction'],
  ['wp_admin_cross', 'wp_s_spine_junc'],
  ['wp_s_spine_junc', 'wp_admin_east_1'],
  ['wp_admin_east_1', 'wp_admin_east_end'],

  // North Spine Corridor (Continuous north along Grand Courtyard)
  ['wp_n_spine_junc', 'wp_n_spine_1'],
  ['wp_n_spine_1', 'wp_n_spine_2'],
  ['wp_n_spine_2', 'wp_n_spine_3'],
  ['wp_n_spine_3', 'wp_n_bridge_mid'],
  ['wp_n_bridge_mid', 'wp_n_spine_4'],
  ['wp_n_spine_4', 'wp_n_spine_5'],
  ['wp_n_spine_5', 'wp_n_spine_6'],
  ['wp_n_spine_6', 'wp_n_spine_7'],
  ['wp_n_spine_7', 'wp_n_cross_hub'],
  ['wp_n_cross_hub', 'wp_n_spine_8'],
  ['wp_n_spine_8', 'wp_n_spine_9'],
  ['wp_n_spine_9', 'wp_n_spine_top'],

  // South Spine Corridor (Continuous north along Grand Courtyard)
  ['wp_s_spine_junc', 'wp_s_spine_1'],
  ['wp_s_spine_1', 'wp_s_spine_2'],
  ['wp_s_spine_2', 'wp_s_spine_3'],
  ['wp_s_spine_3', 'wp_s_bridge_mid'],
  ['wp_s_bridge_mid', 'wp_s_spine_4'],
  ['wp_s_spine_4', 'wp_s_spine_5'],
  ['wp_s_spine_5', 'wp_s_spine_6'],
  ['wp_s_spine_6', 'wp_s_spine_7'],
  ['wp_s_spine_7', 'wp_s_cross_hub'],
  ['wp_s_cross_hub', 'wp_s_spine_8'],
  ['wp_s_spine_8', 'wp_s_spine_9'],
  ['wp_s_spine_9', 'wp_s_spine_top'],

  // Mid Cross-Bridge (Connects North and South spines with central stairs)
  ['wp_n_bridge_mid', 'wp_mid_bridge_cntr'],
  ['wp_mid_bridge_cntr', 'wp_s_bridge_mid'],

  // Top Cross-Bridge (Connects North and South wings)
  ['wp_n_spine_top', 'wp_top_bridge_cntr'],
  ['wp_top_bridge_cntr', 'wp_s_spine_top'],

  // Cross-Connectors across Light-Wells
  ['wp_n_cross_hub', 'wp_n_lab_junction'],
  ['wp_s_cross_hub', 'wp_s_lab_junction'],

  // North Outer Lab Corridor
  ['wp_n_lab_junction', 'wp_n_lab_upper_2'],
  ['wp_n_lab_upper_2', 'wp_n_lab_upper_1'],
  ['wp_n_lab_junction', 'wp_n_lab_upper_3'],
  ['wp_n_lab_upper_3', 'wp_n_lab_upper_4'],
  ['wp_n_lab_upper_4', 'wp_n_toilet_upper'],
  ['wp_n_lab_junction', 'wp_n_lab_mid'],
  ['wp_n_lab_mid', 'wp_n_toilet_lower'],
  ['wp_n_lab_mid', 'wp_n_lab_south'],
  ['wp_n_lab_south', 'wp_admin_west_end'],

  // South Outer Lab Corridor
  ['wp_s_lab_junction', 'wp_s_workshop'],
  ['wp_s_workshop', 'wp_s_toilet_staff'],
  ['wp_s_lab_junction', 'wp_s_robotics'],
  ['wp_s_robotics', 'wp_s_windtunnel'],
  ['wp_s_windtunnel', 'wp_s_infirmary'],
  ['wp_s_infirmary', 'wp_s_toilet_upper'],
  ['wp_s_lab_junction', 'wp_s_lab_testing'],
  ['wp_s_lab_testing', 'wp_s_lab_mfg'],
  ['wp_s_lab_mfg', 'wp_s_stat'],
  ['wp_s_lab_mfg', 'wp_s_lab_south'],
  ['wp_s_lab_south', 'wp_admin_east_end']
];

// Build adjacency graph
const GRAPH = {};

function initNavigationGraph() {
  Object.keys(WAYPOINTS).forEach(id => {
    GRAPH[id] = [];
  });

  HALLWAY_EDGES.forEach(([u, v]) => {
    if (!WAYPOINTS[u] || !WAYPOINTS[v]) return;
    const p1 = WAYPOINTS[u];
    const p2 = WAYPOINTS[v];
    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y) * 0.4; // 1px ≈ 0.4m
    GRAPH[u].push({ to: v, dist });
    GRAPH[v].push({ to: u, dist });
  });

  // Link each room's door to the closest waypoint
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
      if (id.startsWith('door_')) return;
      const d = Math.hypot(room.door[0] - wp.x, room.door[1] - wp.y);
      if (d < minDist) {
        minDist = d;
        nearest = id;
      }
    });

    if (nearest) {
      const dist = minDist * 0.4;
      GRAPH[doorId].push({ to: nearest, dist });
      GRAPH[nearest].push({ to: doorId, dist });
    }
  });
}

initNavigationGraph();

// ==========================================================================
// 3. DIJKSTRA PATHFINDING ALGORITHM
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

  // Build point coordinates
  const points = [
    [startRoom.cx, startRoom.cy],
    ...path.map(id => [WAYPOINTS[id].x, WAYPOINTS[id].y]),
    [destRoom.cx, destRoom.cy]
  ];

  const distanceMeters = Math.round(distances[endNode]);
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
    const b2 = Math.atan2(pNext.x - pCurr.x, pNext.y - pCurr.y) * 180 / Math.PI;
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

    if (action !== 'Straight' || i === 1 || i === path.length - 2) {
      steps.push({
        action,
        instruction: `${text} ${pCurr.label.replace(/^Door of /, '')}`,
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
    distanceMeters,
    walkingTimeSeconds,
    durationText,
    steps
  };
}

// ==========================================================================
// 4. SVG MAP VECTOR BUILDER
// ==========================================================================
// 4. SVG MAP VECTOR BUILDER
// ==========================================================================
function renderSvgMap() {
  const svg = document.getElementById('campusMapSvg');
  if (!svg) return;

  // 1. Building Base Footprint - Distinct Architectural Wings
  const baseGroup = document.getElementById('layerBuildingBase');
  baseGroup.innerHTML = `
    <!-- Admin Block Footprint -->
    <path class="building-wing" d="
      M 224 640 L 526 640 L 526 718 L 476 718 L 476 764 L 418 764 L 418 818 L 336 818 L 336 764 L 274 764 L 274 718 L 224 718 Z
    " />

    <!-- North Spine Wing -->
    <rect class="building-wing" x="300" y="152" width="53" height="488" rx="2" />

    <!-- South Spine Wing -->
    <rect class="building-wing" x="401" y="152" width="47" height="488" rx="2" />

    <!-- North Outer Labs (Upper - Dynamics to Metallurgy) -->
    <rect class="building-wing" x="230" y="270" width="56" height="144" rx="2" />

    <!-- North Outer Labs (Lower - Thermal to Nano) -->
    <path class="building-wing" d="
      M 112 444 L 286 444 L 286 564 L 164 564 L 164 520 L 112 520 Z
    " />

    <!-- Amritheswari Hall Wing (Detached Auditorium) -->
    <rect class="building-wing" x="226" y="570" width="50" height="110" rx="2" />

    <!-- South Outer Workshops (Upper - Wind Tunnel to Mechanical) -->
    <rect class="building-wing" x="466" y="235" width="119" height="201" rx="2" />

    <!-- South Outer Labs (Lower - Manufacturing to Courier) -->
    <rect class="building-wing" x="466" y="444" width="119" height="126" rx="2" />

    <!-- Acharya Hall Wing (Detached Auditorium) -->
    <rect class="building-wing" x="464" y="570" width="60" height="110" rx="2" />

    <!-- Connecting Bridges between Wings -->
    <rect class="building-wing" x="343" y="488" width="68" height="22" />
    <rect class="building-wing" x="343" y="138" width="68" height="24" />
    <rect class="building-wing" x="274" y="338" width="38" height="14" />
    <rect class="building-wing" x="442" y="338" width="30" height="14" />
  `;

  // 2. Open Courtyards, Light Wells & Breezeway Gaps
  const courtGroup = document.getElementById('layerCourtyards');
  courtGroup.innerHTML = `
    <!-- 1) Grand Central Courtyard - Upper Atrium -->
    <rect class="courtyard-patio" x="351" y="160" width="52" height="328" rx="3" />
    <line x1="377" y1="170" x2="377" y2="480" stroke="rgba(16, 185, 129, 0.2)" stroke-dasharray="4 4" />
    <text x="377" y="324" text-anchor="middle" font-size="6.5" fill="rgba(16, 185, 129, 0.65)" transform="rotate(-90 377 324)" font-weight="600" letter-spacing="1.5">OPEN ATRIUM</text>

    <!-- 2) Grand Central Courtyard - Lower Quadrangle (with CAD 10782mm Dimension Indicator) -->
    <rect class="courtyard-patio" x="351" y="510" width="52" height="132" rx="3" />
    <line x1="377" y1="518" x2="377" y2="634" stroke="rgba(16, 185, 129, 0.2)" stroke-dasharray="4 4" />
    <text x="377" y="546" text-anchor="middle" font-size="6.5" fill="rgba(16, 185, 129, 0.65)" transform="rotate(-90 377 546)" font-weight="600" letter-spacing="1.5">CENTRAL COURTYARD</text>

    <!-- CAD Architectural Dimension Line: 10782 mm -->
    <g class="courtyard-dimension-group">
      <line class="dimension-line" x1="353" y1="596" x2="401" y2="596" />
      <line class="dimension-tick" x1="353" y1="591" x2="353" y2="601" />
      <line class="dimension-tick" x1="401" y1="591" x2="401" y2="601" />
      <polygon points="353,596 357.5,594 357.5,598" fill="rgba(56, 189, 248, 0.75)" />
      <polygon points="401,596 396.5,594 396.5,598" fill="rgba(56, 189, 248, 0.75)" />
      <text class="dimension-text" x="377" y="591" text-anchor="middle" transform="rotate(-90 377 591)">10782 mm</text>
    </g>

    <!-- 3) North Light-Well Gap (Separates Outer Labs from North Spine) -->
    <rect class="lightwell-gap" x="285" y="274" width="27" height="170" rx="3" />
    <text x="298" y="360" text-anchor="middle" font-size="5.5" fill="rgba(56, 189, 248, 0.55)" transform="rotate(-90 298 360)" font-weight="600" letter-spacing="1">OPEN LIGHT WELL</text>

    <!-- 4) North Breezeway Gap (Separates Amritheswari Hall from North Spine) -->
    <rect class="breezeway-gap" x="274" y="570" width="38" height="98" rx="3" />
    <text x="293" y="619" text-anchor="middle" font-size="5.5" fill="rgba(148, 163, 184, 0.55)" transform="rotate(-90 293 619)" font-weight="600" letter-spacing="1">BREEZEWAY</text>

    <!-- 5) South Light-Well Gap (Separates Workshops from South Spine) -->
    <rect class="lightwell-gap" x="442" y="274" width="28" height="170" rx="3" />
    <text x="456" y="360" text-anchor="middle" font-size="5.5" fill="rgba(56, 189, 248, 0.55)" transform="rotate(-90 456 360)" font-weight="600" letter-spacing="1">OPEN LIGHT WELL</text>

    <!-- 6) South Breezeway Gap (Separates Acharya Hall from South Spine) -->
    <rect class="breezeway-gap" x="442" y="570" width="26" height="98" rx="3" />
    <text x="455" y="619" text-anchor="middle" font-size="5.5" fill="rgba(148, 163, 184, 0.55)" transform="rotate(-90 455 619)" font-weight="600" letter-spacing="1">BREEZEWAY</text>

    <!-- 7) Patios Flanking Central Prayer Hall -->
    <rect class="courtyard-patio" x="310" y="642" width="28" height="28" rx="2" />
    <rect class="courtyard-patio" x="413" y="642" width="25" height="28" rx="2" />
  `;

  // 3. Hallways, Walkways & Passages
  const corrGroup = document.getElementById('layerCorridors');
  let pillarsHtml = '';
  // Generate colonnade pillars along the open verandas facing Grand Courtyard
  for (let y = 168; y <= 476; y += 22) {
    pillarsHtml += `<rect class="colonnade-pillar" x="350.5" y="${y}" width="2.5" height="2.5" rx="0.5" />`;
    pillarsHtml += `<rect class="colonnade-pillar" x="401.5" y="${y}" width="2.5" height="2.5" rx="0.5" />`;
  }
  for (let y = 520; y <= 630; y += 22) {
    pillarsHtml += `<rect class="colonnade-pillar" x="350.5" y="${y}" width="2.5" height="2.5" rx="0.5" />`;
    pillarsHtml += `<rect class="colonnade-pillar" x="401.5" y="${y}" width="2.5" height="2.5" rx="0.5" />`;
  }

  corrGroup.innerHTML = `
    <!-- Admin Transverse Grand Cross Corridor -->
    <rect class="corridor-floor" x="226" y="664" width="298" height="16" rx="1" />
    <line class="corridor-centerline" x1="230" y1="672" x2="518" y2="672" />

    <!-- North Spine Veranda Corridor (Bordering Grand Courtyard) -->
    <rect class="corridor-floor" x="343" y="152" width="8" height="512" />
    <line class="corridor-centerline" x1="347" y1="152" x2="347" y2="664" />
    <line class="veranda-edge" x1="351" y1="160" x2="351" y2="488" />
    <line class="veranda-edge" x1="351" y1="510" x2="351" y2="642" />

    <!-- South Spine Veranda Corridor (Bordering Grand Courtyard) -->
    <rect class="corridor-floor" x="403" y="152" width="8" height="512" />
    <line class="corridor-centerline" x1="407" y1="152" x2="407" y2="664" />
    <line class="veranda-edge" x1="403" y1="160" x2="403" y2="488" />
    <line class="veranda-edge" x1="403" y1="510" x2="403" y2="642" />

    <!-- Colonnade Pillars -->
    ${pillarsHtml}

    <!-- Mid Cross Bridge (Connects North & South Spines) -->
    <rect class="corridor-floor" x="343" y="490" width="68" height="18" rx="1" />
    <line class="corridor-centerline" x1="347" y1="499" x2="407" y2="499" />

    <!-- Top Bridge (Connects North & South Wings) -->
    <rect class="corridor-floor" x="343" y="140" width="68" height="20" rx="1" />
    <line class="corridor-centerline" x1="347" y1="150" x2="407" y2="150" />

    <!-- North Outer Lab Corridor -->
    <rect class="corridor-floor" x="274" y="274" width="10" height="288" rx="1" />
    <line class="corridor-centerline" x1="279" y1="274" x2="279" y2="560" />

    <!-- North Light-Well Connector Bridge -->
    <rect class="corridor-floor" x="274" y="340" width="38" height="10" rx="1" />
    <line class="corridor-centerline" x1="279" y1="345" x2="347" y2="345" />

    <!-- South Outer Lab Corridor -->
    <rect class="corridor-floor" x="462" y="280" width="10" height="280" rx="1" />
    <line class="corridor-centerline" x1="468" y1="280" x2="468" y2="558" />

    <!-- South Light-Well Connector Bridge -->
    <rect class="corridor-floor" x="442" y="340" width="30" height="10" rx="1" />
    <line class="corridor-centerline" x1="407" y1="345" x2="468" y2="345" />

    <!-- Main Entrance & Reception Foyer -->
    <rect class="corridor-floor" x="368" y="672" width="18" height="138" rx="1" />
    <line class="corridor-centerline" x1="377" y1="672" x2="377" y2="805" />

    <!-- Covered Walkways to Restrooms -->
    <rect class="corridor-floor" x="120" y="496" width="48" height="8" rx="1" />
    <rect class="corridor-floor" x="140" y="251" width="95" height="8" rx="1" />
    <rect class="corridor-floor" x="512" y="253" width="68" height="8" rx="1" />
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

  // 5. Staircases with Step Lines
  const stairGroup = document.getElementById('layerStairs');
  const stairs = [
    { x: 370, y: 490, w: 14, h: 18, steps: 5, dir: 'h' }, // Central Mid-Bridge
    { x: 275, y: 666, w: 14, h: 16, steps: 5, dir: 'v' }, // Admin West
    { x: 445, y: 666, w: 14, h: 16, steps: 5, dir: 'v' }, // Admin East
    { x: 345, y: 142, w: 12, h: 16, steps: 5, dir: 'h' }, // North Top
    { x: 395, y: 142, w: 12, h: 16, steps: 5, dir: 'h' }, // South Top
    { x: 183, y: 247, w: 14, h: 14, steps: 5, dir: 'h' }  // Gents Upper
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

  // 6. Rooms & Labels
  const roomsGroup = document.getElementById('layerRooms');
  let roomsHtml = '';

  ROOMS_DATA.forEach(r => {
    const showName = r.h >= 24 && r.w >= 36;
    const isSmall = r.w < 38 || r.h < 26;
    const codeY = showName ? (r.cy - 3) : r.cy + 3;
    const nameY = r.cy + 9;
    const fontSize = isSmall ? '7px' : '8.5px';

    let displayName = r.name;
    if (displayName.length > 14 && r.w < 55) {
      displayName = displayName.substring(0, 12) + '..';
    }

    roomsHtml += `
      <g class="room-group" id="room-${r.id}" data-id="${r.id}" data-category="${r.category}" tabindex="0" role="button" aria-label="${r.code} - ${r.name}">
        <rect class="room-rect" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="2.5" />
        <text class="room-code-text" x="${r.cx}" y="${codeY}" text-anchor="middle" font-size="${fontSize}">${r.code}</text>
        ${showName ? `<text class="room-name-text" x="${r.cx}" y="${nameY}" text-anchor="middle">${displayName}</text>` : ''}
      </g>
    `;
  });

  roomsGroup.innerHTML = roomsHtml;

  // 7. Architectural Structural Walls
  const wallsGroup = document.getElementById('layerWalls');
  wallsGroup.innerHTML = `
    <!-- Exterior Boundary Walls -->
    <path class="outer-wall" d="
      M 224 640 L 526 640 L 526 718 L 476 718 L 476 764 L 418 764 L 418 818 L 336 818 L 336 764 L 274 764 L 274 718 L 224 718 Z
    " />
    <rect class="outer-wall" x="226" y="570" width="50" height="110" rx="2" />
    <rect class="outer-wall" x="464" y="570" width="60" height="110" rx="2" />

    <!-- Main Entrance Porch Steps & Portal -->
    <line class="inner-wall" x1="340" y1="818" x2="414" y2="818" stroke-width="2.5" />
    <line class="inner-wall" x1="340" y1="823" x2="414" y2="823" stroke-width="1.5" />
    <line class="inner-wall" x1="345" y1="828" x2="409" y2="828" stroke-width="1" />
  `;

  // 8. Hallway Graph Lines (Toggleable)
  const graphGroup = document.getElementById('layerRoutingGraph');
  let graphHtml = '';
  HALLWAY_EDGES.forEach(([u, v]) => {
    const p1 = WAYPOINTS[u];
    const p2 = WAYPOINTS[v];
    if (p1 && p2) {
      graphHtml += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#8b5cf6" stroke-width="1.8" stroke-dasharray="3 3" opacity="0.8" />`;
    }
  });
  Object.values(WAYPOINTS).forEach(wp => {
    graphHtml += `<circle cx="${wp.x}" cy="${wp.y}" r="2.5" fill="#a78bfa" />`;
  });
  graphGroup.innerHTML = graphHtml;

  // Bind Room Click and Hover Events
  document.querySelectorAll('.room-group').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const roomId = el.dataset.id;
      const room = ROOMS_DATA.find(r => r.id === roomId);
      if (room) {
        selectRoom(room, true);
      }
    });
  });
}

// ==========================================================================
// 5. VECTOR PAN, ZOOM & TOUCH ENGINE
// ==========================================================================
class SvgViewport {
  constructor(viewportEl, svgEl) {
    this.viewport = viewportEl;
    this.svg = svgEl;

    // Default ViewBox for full Ground Floor
    this.base = { x: 0, y: 0, w: 723, h: 1024 };
    this.current = { ...this.base };

    this.isPanning = false;
    this.startPoint = { x: 0, y: 0 };
    this.startViewBox = { ...this.current };

    // Pinch-to-zoom touch state
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

    // Mouse Wheel Zoom Event
    this.viewport.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });

    // Touch Events for Mobile / Tablet
    this.viewport.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
    this.viewport.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
    this.viewport.addEventListener('touchend', () => this.onTouchEnd());

    // Window Resize
    window.addEventListener('resize', () => this.onResize());
  }

  updateViewBox() {
    this.svg.setAttribute('viewBox', `${this.current.x} ${this.current.y} ${this.current.w} ${this.current.h}`);
  }

  onMouseDown(e) {
    // Only left button
    if (e.button !== 0) return;
    this.isPanning = true;
    this.viewport.classList.add('panning');
    this.startPoint = { x: e.clientX, y: e.clientY };
    this.startViewBox = { ...this.current };
  }

  onMouseMove(e) {
    if (!this.isPanning) return;
    const rect = this.viewport.getBoundingClientRect();
    const dx = (e.clientX - this.startPoint.x) * (this.current.w / rect.width);
    const dy = (e.clientY - this.startPoint.y) * (this.current.h / rect.height);

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
    const rect = this.viewport.getBoundingClientRect();

    // Cursor position in SVG coordinates
    const mouseSvgX = this.current.x + ((e.clientX - rect.left) / rect.width) * this.current.w;
    const mouseSvgY = this.current.y + ((e.clientY - rect.top) / rect.height) * this.current.h;

    const zoomFactor = e.deltaY > 0 ? 1.14 : 0.88;
    this.zoomAroundPoint(mouseSvgX, mouseSvgY, zoomFactor);
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
      const rect = this.viewport.getBoundingClientRect();
      const midX = (t1.clientX + t2.clientX) / 2 - rect.left;
      const midY = (t1.clientY + t2.clientY) / 2 - rect.top;
      this.startTouchCenter = {
        x: this.current.x + (midX / rect.width) * this.current.w,
        y: this.current.y + (midY / rect.height) * this.current.h
      };
      this.startViewBox = { ...this.current };
    }
  }

  onTouchMove(e) {
    if (e.touches.length === 1 && this.isPanning) {
      const rect = this.viewport.getBoundingClientRect();
      const dx = (e.touches[0].clientX - this.startPoint.x) * (this.current.w / rect.width);
      const dy = (e.touches[0].clientY - this.startPoint.y) * (this.current.h / rect.height);
      this.current.x = this.startViewBox.x - dx;
      this.current.y = this.startViewBox.y - dy;
      this.updateViewBox();
    } else if (e.touches.length === 2) {
      e.preventDefault();
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      if (this.startTouchDist > 0) {
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

    // Shift target center slightly right if sidebar is open
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
    const leftPad = isCollapsed ? padding : padding + 60;

    let targetW = (maxX - minX) + padding * 2;
    let targetH = (maxY - minY) + padding * 2;

    targetW = Math.max(targetW, 260);
    targetH = Math.max(targetH, 320);

    const targetX = (minX + maxX) / 2 - targetW / 2 - (isCollapsed ? 0 : 30);
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
let viewport = null;
const appState = {
  activeTheme: 'dark',
  activeCategory: 'ALL',
  selectedRoom: null,
  startRoomId: '',
  destRoomId: '',
  currentRoute: null,
  isSimulating: false,
  simFrameId: null,
  showGraph: false,
  showLegend: false
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Pure Vector SVG Map
  renderSvgMap();

  // 2. Initialize Pan-Zoom Engine
  const viewportEl = document.getElementById('mapViewport');
  const svgEl = document.getElementById('campusMapSvg');
  viewport = new SvgViewport(viewportEl, svgEl);

  // 3. Setup UI, Search, and Dropdowns
  initUI();
  populateDropdowns();
  renderDirectoryList();
});

/**
 * Room Selection & Highlighting
 */
function selectRoom(room, zoomTo = true) {
  // Remove previous selection highlight
  if (appState.selectedRoom) {
    const prevEl = document.getElementById(`room-${appState.selectedRoom.id}`);
    if (prevEl) prevEl.classList.remove('selected');
  }

  appState.selectedRoom = room;

  if (room) {
    const el = document.getElementById(`room-${room.id}`);
    if (el) {
      el.classList.add('selected');
    }

    if (zoomTo && viewport) {
      viewport.focusRoom(room);
    }

    displayRoomDetail(room);

    // Sync highlight in directory listing
    document.querySelectorAll('.room-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.id === room.id);
    });
  }
}

/**
 * Display Room Details Card in Sidebar
 */
function displayRoomDetail(room) {
  const card = document.getElementById('roomDetailCard');
  if (!card || !room) return;

  document.getElementById('detailRoomCode').textContent = room.code || room.id;
  document.getElementById('detailRoomName').textContent = room.name;
  document.getElementById('detailWingBadge').textContent = room.wing;

  const catBadge = document.getElementById('detailCategoryBadge');
  catBadge.textContent = CATEGORIES[room.category]?.name || room.category;
  catBadge.style.color = CATEGORIES[room.category]?.color || '#06b6d4';
  catBadge.style.borderColor = `${catBadge.style.color}55`;
  catBadge.style.backgroundColor = `${catBadge.style.color}15`;

  document.getElementById('detailRoomDesc').textContent = room.desc;
  card.style.display = 'flex';

  // Wire Action Buttons
  document.getElementById('btnNavigateTo').onclick = () => {
    switchTab('directions');
    document.getElementById('destRoomSelect').value = room.id;
    appState.destRoomId = room.id;
    if (!appState.startRoomId) {
      appState.startRoomId = 'RECEPTION';
      document.getElementById('startRoomSelect').value = 'RECEPTION';
    }
    calculateAndRenderRoute();
  };

  document.getElementById('btnNavigateFrom').onclick = () => {
    switchTab('directions');
    document.getElementById('startRoomSelect').value = room.id;
    appState.startRoomId = room.id;
    calculateAndRenderRoute();
  };
}

/**
 * Populate Start & Destination Selectors
 */
function populateDropdowns() {
  const startSel = document.getElementById('startRoomSelect');
  const destSel = document.getElementById('destRoomSelect');
  if (!startSel || !destSel) return;

  const wings = ['Admin Block (A)', 'Northern Wing (N)', 'Southern Wing (S)'];

  wings.forEach(wing => {
    const g1 = document.createElement('optgroup');
    g1.label = wing;
    const g2 = document.createElement('optgroup');
    g2.label = wing;

    ROOMS_DATA.filter(r => r.wing === wing).forEach(r => {
      const o1 = document.createElement('option');
      o1.value = r.id;
      o1.textContent = `${r.code} - ${r.name}`;
      g1.appendChild(o1);

      const o2 = document.createElement('option');
      o2.value = r.id;
      o2.textContent = `${r.code} - ${r.name}`;
      g2.appendChild(o2);
    });

    startSel.appendChild(g1);
    destSel.appendChild(g2);
  });
}

/**
 * Filter & Render Directory Listing
 */
function renderDirectoryList(query = '', category = appState.activeCategory) {
  const listEl = document.getElementById('resultsList');
  const countEl = document.getElementById('resultsCount');
  if (!listEl) return;

  listEl.innerHTML = '';
  const q = query.trim().toLowerCase();

  const filtered = ROOMS_DATA.filter(r => {
    const matchCat = category === 'ALL' || r.category === category;
    const matchQ = !q ||
      r.name.toLowerCase().includes(q) ||
      r.code.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.desc.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  if (countEl) countEl.textContent = filtered.length;

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 24px 10px; color: var(--text-muted); font-size: 0.82rem;">
        No rooms found matching "${query}".
      </div>
    `;
    return;
  }

  filtered.forEach(r => {
    const card = document.createElement('div');
    card.className = 'room-card';
    card.dataset.id = r.id;
    if (appState.selectedRoom && appState.selectedRoom.id === r.id) {
      card.classList.add('selected');
    }

    const color = CATEGORIES[r.category]?.color || '#06b6d4';

    card.innerHTML = `
      <div class="room-card-info">
        <div class="room-card-code">
          <span style="color: ${color};">${r.code}</span>
          <span class="wing-tag">&bull; ${r.wing.split(' ')[0]}</span>
        </div>
        <div class="room-card-name">${r.name}</div>
      </div>
      <div class="room-card-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    `;

    card.addEventListener('click', () => {
      selectRoom(r, true);
    });

    listEl.appendChild(card);
  });
}

/**
 * Route Calculation & SVG Vector Path Drawing
 */
function calculateAndRenderRoute() {
  const startId = appState.startRoomId;
  const destId = appState.destRoomId;

  if (!startId || !destId || startId === destId) {
    clearRoute();
    return;
  }

  const route = findRoute(startId, destId);
  if (!route) {
    alert('No feasible indoor route found between these locations.');
    return;
  }

  appState.currentRoute = route;

  // Build SVG Path 'd' attribute
  const dPath = route.points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`).join(' ');

  document.getElementById('svgRouteGlow').setAttribute('d', dPath);
  document.getElementById('svgRouteCore').setAttribute('d', dPath);

  // Position Start & Destination Pins
  const startPt = route.points[0];
  const destPt = route.points[route.points.length - 1];

  const startPin = document.getElementById('svgStartPin');
  const destPin = document.getElementById('svgDestPin');

  startPin.setAttribute('transform', `translate(${startPt[0]}, ${startPt[1]})`);
  destPin.setAttribute('transform', `translate(${destPt[0]}, ${destPt[1]})`);
  startPin.style.display = 'block';
  destPin.style.display = 'block';

  // Update Route Metrics Card
  document.getElementById('routeMetricsCard').style.display = 'flex';
  document.getElementById('routeDistVal').textContent = `${route.distanceMeters} m`;
  document.getElementById('routeTimeVal').textContent = route.durationText;

  // Render Guidance Steps
  renderTurnGuidance(route.steps);

  // Zoom to fit entire route in viewport
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  route.points.forEach(([x, y]) => {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });

  if (viewport) {
    viewport.focusBounds(minX, minY, maxX, maxY);
  }
}

/**
 * Render Turn-by-Turn Guidance in Sidebar
 */
function renderTurnGuidance(steps) {
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

/**
 * Animated Walking Avatar along Vector Route
 */
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

/**
 * Clear Active Navigation Route
 */
function clearRoute() {
  appState.currentRoute = null;
  if (appState.isSimulating) {
    cancelAnimationFrame(appState.simFrameId);
    appState.isSimulating = false;
  }

  document.getElementById('svgRouteGlow').setAttribute('d', '');
  document.getElementById('svgRouteCore').setAttribute('d', '');
  document.getElementById('svgStartPin').style.display = 'none';
  document.getElementById('svgDestPin').style.display = 'none';
  document.getElementById('svgWalkerAvatar').style.display = 'none';

  document.getElementById('routeMetricsCard').style.display = 'none';
  document.getElementById('turnDirectionsCard').style.display = 'none';
}

/**
 * Tab Switcher (Explore vs Directions)
 */
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

/**
 * Theme Switcher
 */
function applyTheme(theme) {
  appState.activeTheme = theme;
  document.body.className = `theme-${theme}`;

  document.getElementById('themeDarkBtn').classList.toggle('active', theme === 'dark');
  document.getElementById('themeBlueprintBtn').classList.toggle('active', theme === 'blueprint');
  document.getElementById('themeLightBtn').classList.toggle('active', theme === 'light');
}

/**
 * Setup All UI Listeners
 */
function initUI() {
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
    renderDirectoryList(val);
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    renderDirectoryList('');
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
  // Default legend closed
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

  // Zoom Controls
  document.getElementById('zoomInBtn').addEventListener('click', () => {
    if (viewport) viewport.zoomIn();
  });

  document.getElementById('zoomOutBtn').addEventListener('click', () => {
    if (viewport) viewport.zoomOut();
  });
}
