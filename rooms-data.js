/**
 * Amrita Vishwa Vidyapeetham - Ground Floor Plan Data
 * Coordinate projection:
 * Image Dimensions: 723 x 1024
 * Coordinate Bounds:
 * Top-Left:     [0, 10.24]
 * Top-Right:    [7.23, 10.24]
 * Bottom-Right: [7.23, 0]
 * Bottom-Left:  [0, 0]
 *
 * Pixel to Coordinate formulas:
 * lng = px / 100
 * lat = (1024 - py) / 100
 */

const MAP_CONFIG = {
  imgWidth: 723,
  imgHeight: 1024,
  bounds: [
    [0, 10.24],    // Top-left
    [7.23, 10.24], // Top-right
    [7.23, 0],     // Bottom-right
    [0, 0]         // Bottom-left
  ],
  center: [3.615, 5.12],
  zoom: 6.2,
  minZoom: 4.5,
  maxZoom: 10.5,
  maxBounds: [[-2.0, -2.0], [9.23, 12.24]],
  scaleMetersPerUnit: 40 // Calibrated to 10782mm dimension marker on CAD drawing
};

function pxToCoord(px, py) {
  return [
    +(px / 100).toFixed(4),
    +((1024 - py) / 100).toFixed(4)
  ];
}

function boxToPolygon(x1, y1, x2, y2) {
  const p1 = pxToCoord(x1, y1); // top-left
  const p2 = pxToCoord(x2, y1); // top-right
  const p3 = pxToCoord(x2, y2); // bottom-right
  const p4 = pxToCoord(x1, y2); // bottom-left
  return [p1, p2, p3, p4, p1];
}

const ROOM_CATEGORIES = {
  AUDITORIUM: { name: 'Auditorium / Hall', color: '#f59e0b', icon: 'theater-masks' },
  LAB: { name: 'Laboratory / Research', color: '#06b6d4', icon: 'flask' },
  OFFICE: { name: 'Administrative / Office', color: '#8b5cf6', icon: 'briefcase' },
  FACULTY: { name: 'Faculty / Staff', color: '#3b82f6', icon: 'user' },
  CLASSROOM: { name: 'Seminar / Academic', color: '#10b981', icon: 'graduation-cap' },
  RESTROOM: { name: 'Restroom / Services', color: '#ec4899', icon: 'restroom' },
  FACILITY: { name: 'Campus Facility', color: '#6366f1', icon: 'building' }
};

const ROOMS_DATA = [
  // ================= ADMIN BLOCK (A) =================
  {
    id: 'RECEPTION',
    code: 'REC-01',
    name: 'Reception & Telephone Exchange',
    wing: 'Admin Block (A)',
    category: 'FACILITY',
    box: [340, 722, 395, 765],
    door: pxToCoord(368, 720),
    description: 'Main campus welcome desk, visitor passes, security check-in and telephone operator services.'
  },
  {
    id: 'GAD-PR',
    code: 'GAD-01',
    name: 'GAD - Public Relations Office',
    wing: 'Admin Block (A)',
    category: 'OFFICE',
    box: [335, 770, 405, 805],
    door: pxToCoord(368, 768),
    description: 'General Administration Department & Public Relations Liaison.'
  },
  {
    id: 'ADMIN-A',
    code: 'ADM-01',
    name: 'Central Admin Block Office',
    wing: 'Admin Block (A)',
    category: 'OFFICE',
    box: [340, 680, 398, 718],
    door: pxToCoord(368, 680),
    description: 'Ground Floor Administrative Registry and University Central Enquiries.'
  },
  {
    id: 'A-001',
    code: 'A-001',
    name: 'Acharya Hall',
    wing: 'Admin Block (A)',
    category: 'AUDITORIUM',
    box: [465, 580, 514, 678],
    door: pxToCoord(463, 628),
    description: 'Premier University Auditorium with stage and seating capacity of over 500 people for convocations and symposiums.'
  },
  {
    id: 'A-002',
    code: 'A-002',
    name: 'ENGM Conference Hall',
    wing: 'Admin Block (A)',
    category: 'AUDITORIUM',
    box: [426, 660, 458, 712],
    door: pxToCoord(424, 678),
    description: 'High-tech corporate boardroom and executive seminar suite.'
  },
  {
    id: 'A-003',
    code: 'A-003',
    name: 'Admin Executive Suite A-003',
    wing: 'Admin Block (A)',
    category: 'OFFICE',
    box: [400, 660, 426, 712],
    door: pxToCoord(400, 678),
    description: 'Administrative advisory and conference support chamber.'
  },
  {
    id: 'A-004',
    code: 'A-004',
    name: 'Executive Office A-004',
    wing: 'Admin Block (A)',
    category: 'OFFICE',
    box: [315, 660, 340, 712],
    door: pxToCoord(342, 678),
    description: 'Administrative liaison and records archive.'
  },
  {
    id: 'A-005',
    code: 'A-005',
    name: 'Special Programs / Meditation Hall',
    wing: 'Admin Block (A)',
    category: 'AUDITORIUM',
    box: [280, 660, 315, 712],
    door: pxToCoord(316, 678),
    description: 'Dedicated serene hall for IAM Meditation, yoga sessions, and special university discourses.'
  },
  {
    id: 'A-006',
    code: 'A-006',
    name: 'Amritheswari Hall',
    wing: 'Admin Block (A)',
    category: 'AUDITORIUM',
    box: [228, 580, 276, 678],
    door: pxToCoord(278, 628),
    description: 'Grand University Cultural Auditorium with acoustics, stage lighting and seating capacity for 600+ guests.'
  },
  {
    id: 'PRAYER-HALL-A',
    code: 'ADM-PRY',
    name: 'Central Prayer Hall',
    wing: 'Admin Block (A)',
    category: 'FACILITY',
    box: [340, 646, 398, 678],
    door: pxToCoord(368, 645),
    description: 'Sacred central prayer and reflection space at the heart of the ground floor.'
  },
  {
    id: 'MINI-CONF',
    code: 'CONF-01',
    name: 'Mini Conference Room',
    wing: 'Admin Block (A)',
    category: 'OFFICE',
    box: [430, 712, 472, 742],
    door: pxToCoord(430, 718),
    description: 'Small group briefing and video-conference facility.'
  },

  // ================= NORTHERN WING (N) - CENTRAL SPINE =================
  {
    id: 'N-001',
    code: 'N-001',
    name: 'Admission Office',
    wing: 'Northern Wing (N)',
    category: 'OFFICE',
    box: [308, 574, 350, 612],
    door: pxToCoord(352, 593),
    description: 'University Admissions, application processing, counseling, and prospective student enrollment services.'
  },
  {
    id: 'N-002',
    code: 'N-002',
    name: 'Mech. Professors Room',
    wing: 'Northern Wing (N)',
    category: 'FACULTY',
    box: [308, 544, 350, 574],
    door: pxToCoord(352, 559),
    description: 'Senior Faculty Cabins for Department of Mechanical Engineering.'
  },
  {
    id: 'N-003',
    code: 'N-003',
    name: 'CIR Seminar Room',
    wing: 'Northern Wing (N)',
    category: 'CLASSROOM',
    box: [308, 514, 350, 544],
    door: pxToCoord(352, 529),
    description: 'Corporate and Industry Relations (CIR) training & placement interview room.'
  },
  {
    id: 'N-010',
    code: 'N-010',
    name: 'Staff Room (Mech. Engg)',
    wing: 'Northern Wing (N)',
    category: 'FACULTY',
    box: [308, 448, 350, 496],
    door: pxToCoord(352, 472),
    description: 'Mechanical Engineering Department Faculty and Academic Staff room.'
  },
  {
    id: 'N-011',
    code: 'N-011',
    name: 'Student Affairs Office',
    wing: 'Northern Wing (N)',
    category: 'OFFICE',
    box: [308, 410, 350, 446],
    door: pxToCoord(352, 428),
    description: 'Office of Student Welfare, student club activities, sports and campus life coordination.'
  },
  {
    id: 'N-012',
    code: 'N-012',
    name: 'Human Resources (HR) Dept',
    wing: 'Northern Wing (N)',
    category: 'OFFICE',
    box: [308, 374, 350, 408],
    door: pxToCoord(352, 391),
    description: 'University Human Resources & Personnel Administration.'
  },
  {
    id: 'N-013',
    code: 'N-013',
    name: 'Office of the Principal (Engineering)',
    wing: 'Northern Wing (N)',
    category: 'OFFICE',
    box: [308, 338, 350, 374],
    door: pxToCoord(352, 356),
    description: 'Executive Office of the Principal, School of Engineering.'
  },
  {
    id: 'N-018',
    code: 'N-018',
    name: 'Department of Mathematics (Room 108)',
    wing: 'Northern Wing (N)',
    category: 'FACULTY',
    box: [308, 276, 350, 326],
    door: pxToCoord(352, 301),
    description: 'Mathematics Faculty department, research cubicles, and faculty consultation chambers.'
  },
  {
    id: 'N-019',
    code: 'N-019',
    name: 'Electrical Machines Lab',
    wing: 'Northern Wing (N)',
    category: 'LAB',
    box: [306, 184, 352, 274],
    door: pxToCoord(352, 229),
    description: 'High-voltage electric motors, generators, transformers, and power dynamics research station.'
  },
  {
    id: 'N-020',
    code: 'N-020',
    name: 'Northern Prayer Hall',
    wing: 'Northern Wing (N)',
    category: 'FACILITY',
    box: [306, 148, 352, 184],
    door: pxToCoord(352, 166),
    description: 'Quiet contemplation and prayer space in the north academic wing.'
  },

  // ================= NORTHERN WING (N) - OUTER LABS =================
  {
    id: 'N-005-006',
    code: 'N-005',
    name: 'Amrita Center for Nano Sciences (Solar Lab)',
    wing: 'Northern Wing (N)',
    category: 'LAB',
    box: [168, 515, 238, 562],
    door: pxToCoord(238, 538),
    description: 'Storage Integrated Solar Module Research Laboratory & Clean Energy Systems.'
  },
  {
    id: 'N-004',
    code: 'N-004',
    name: 'Amrita Center for Nano Sciences',
    wing: 'Northern Wing (N)',
    category: 'LAB',
    box: [240, 515, 276, 562],
    door: pxToCoord(276, 538),
    description: 'Advanced Nanotechnology materials synthesis, characterization and molecular engineering.'
  },
  {
    id: 'N-007',
    code: 'N-007',
    name: 'Thermal Engineering Lab',
    wing: 'Northern Wing (N)',
    category: 'LAB',
    box: [168, 448, 220, 492],
    door: pxToCoord(220, 470),
    description: 'Thermodynamics test benches, heat exchangers, refrigeration cycles, and internal combustion rigs.'
  },
  {
    id: 'N-008',
    code: 'N-008',
    name: 'M.Tech Fluid Lab',
    wing: 'Northern Wing (N)',
    category: 'LAB',
    box: [222, 448, 252, 492],
    door: pxToCoord(252, 470),
    description: 'Advanced postgraduate fluid mechanics and CFD boundary flow testing facility.'
  },
  {
    id: 'N-009',
    code: 'N-009',
    name: 'Amrita Center for Nano (Lab 009)',
    wing: 'Northern Wing (N)',
    category: 'LAB',
    box: [254, 448, 280, 492],
    door: pxToCoord(280, 470),
    description: 'Nanomaterial device fabrication and clean room testing.'
  },
  {
    id: 'N-014',
    code: 'N-014',
    name: 'Metallurgy Lab',
    wing: 'Northern Wing (N)',
    category: 'LAB',
    box: [228, 374, 274, 408],
    door: pxToCoord(274, 391),
    description: 'Specimen polishing, metallographic microscope analysis, and heat treatment furnace equipment.'
  },
  {
    id: 'N-015',
    code: 'N-015',
    name: 'Fluid Mechanics Lab',
    wing: 'Northern Wing (N)',
    category: 'LAB',
    box: [228, 338, 274, 374],
    door: pxToCoord(274, 356),
    description: 'Hydraulic flumes, flow meters, Bernoulli apparatus, and pipe friction rigs.'
  },
  {
    id: 'N-016',
    code: 'N-016',
    name: 'CAE Cell',
    wing: 'Northern Wing (N)',
    category: 'LAB',
    box: [228, 308, 274, 338],
    door: pxToCoord(274, 323),
    description: 'Computer-Aided Engineering simulation workstations (Ansys, SolidWorks, FEA).'
  },
  {
    id: 'N-017',
    code: 'N-017',
    name: 'Machine Dynamics Lab',
    wing: 'Northern Wing (N)',
    category: 'LAB',
    box: [228, 274, 274, 308],
    door: pxToCoord(274, 291),
    description: 'Kinematics, vibration analysis, whirling of shafts, and balancing equipment.'
  },
  {
    id: 'TOILET-N-LOWER',
    code: 'WC-N1',
    name: 'Gents Restroom (North-West Lower)',
    wing: 'Northern Wing (N)',
    category: 'RESTROOM',
    box: [120, 484, 160, 516],
    door: pxToCoord(162, 500),
    description: 'Gents washrooms and drinking water point near Thermal Lab.'
  },
  {
    id: 'TOILET-N-UPPER',
    code: 'WC-N2',
    name: 'Gents Restroom (North-West Upper)',
    wing: 'Northern Wing (N)',
    category: 'RESTROOM',
    box: [140, 236, 185, 275],
    door: pxToCoord(186, 255),
    description: 'Gents washrooms near Dynamics & Machines Lab.'
  },

  // ================= SOUTHERN WING (S) - CENTRAL SPINE =================
  {
    id: 'S-001',
    code: 'S-001',
    name: 'University Guest Room S-001',
    wing: 'Southern Wing (S)',
    category: 'FACILITY',
    box: [382, 574, 425, 612],
    door: pxToCoord(380, 593),
    description: 'Visiting dignitary and VIP accommodation room.'
  },
  {
    id: 'S-002',
    code: 'S-002',
    name: 'Amrita Serve & Humanities Dept',
    wing: 'Southern Wing (S)',
    category: 'OFFICE',
    box: [382, 544, 425, 574],
    door: pxToCoord(380, 559),
    description: 'Amrita SeRVe (Village Development Initiative) & Humanities Faculty.'
  },
  {
    id: 'S-003',
    code: 'S-003',
    name: 'Guest Room Kitchen & Pantry',
    wing: 'Southern Wing (S)',
    category: 'FACILITY',
    box: [382, 514, 425, 544],
    door: pxToCoord(380, 529),
    description: 'Executive pantry and dining hospitality kitchen for university visitors.'
  },
  {
    id: 'S-006',
    code: 'S-006',
    name: 'Staff Room (ECE & EEE)',
    wing: 'Southern Wing (S)',
    category: 'FACULTY',
    box: [382, 448, 425, 496],
    door: pxToCoord(380, 472),
    description: 'Faculty Cabins for Department of Electrical and Electronics / Electronics and Communication.'
  },
  {
    id: 'S-007',
    code: 'S-007',
    name: 'Office of Director & Associate Dean',
    wing: 'Southern Wing (S)',
    category: 'OFFICE',
    box: [382, 410, 425, 446],
    door: pxToCoord(380, 428),
    description: 'Executive Suite of Campus Director and Associate Dean of Academic Affairs.'
  },
  {
    id: 'S-008',
    code: 'S-008',
    name: 'Office of Principal (Arts & Sciences)',
    wing: 'Southern Wing (S)',
    category: 'OFFICE',
    box: [382, 374, 425, 408],
    door: pxToCoord(380, 391),
    description: 'Executive Office of Principal, School of Arts & Sciences.'
  },
  {
    id: 'S-010',
    code: 'S-010',
    name: 'South Wing Conference Room',
    wing: 'Southern Wing (S)',
    category: 'CLASSROOM',
    box: [382, 338, 425, 374],
    door: pxToCoord(380, 356),
    description: 'Departmental meeting and presentation conference hall.'
  },
  {
    id: 'S-012',
    code: 'S-012',
    name: 'College Administration Office',
    wing: 'Southern Wing (S)',
    category: 'OFFICE',
    box: [382, 276, 425, 326],
    door: pxToCoord(380, 301),
    description: 'Academic registrar, fee payments, certificate issuance, and administrative helpdesk.'
  },
  {
    id: 'S-013',
    code: 'S-013',
    name: 'Central Computer Lab',
    wing: 'Southern Wing (S)',
    category: 'LAB',
    box: [382, 184, 428, 274],
    door: pxToCoord(380, 229),
    description: 'Flagship high-performance computing laboratory, gigabit ethernet, programming and AI workstations.'
  },
  {
    id: 'S-014',
    code: 'S-014',
    name: 'Nanotechnology Research Lab',
    wing: 'Southern Wing (S)',
    category: 'LAB',
    box: [382, 148, 428, 184],
    door: pxToCoord(380, 166),
    description: 'Advanced nanotech characterization and microfluidics research facility.'
  },

  // ================= SOUTHERN WING (S) - OUTER LABS =================
  {
    id: 'S-004A',
    code: 'S-004A',
    name: 'Research Cell S-004A',
    wing: 'Southern Wing (S)',
    category: 'LAB',
    box: [462, 548, 508, 566],
    door: pxToCoord(460, 557),
    description: 'Special projects research cell and technical incubation hub.'
  },
  {
    id: 'S-004',
    code: 'S-004',
    name: 'Faculty Room S-004',
    wing: 'Southern Wing (S)',
    category: 'FACULTY',
    box: [462, 530, 508, 548],
    door: pxToCoord(460, 539),
    description: 'Engineering faculty discussion and consultation office.'
  },
  {
    id: 'S-MFG',
    code: 'S-MFG',
    name: 'Manufacturing Technology Lab',
    wing: 'Southern Wing (S)',
    category: 'LAB',
    box: [462, 474, 508, 530],
    door: pxToCoord(460, 502),
    description: 'Lathes, milling machines, shaper machines, welding, and advanced tooling stations.'
  },
  {
    id: 'S-005',
    code: 'S-005',
    name: 'Materials Lab Testing Bay S-005',
    wing: 'Southern Wing (S)',
    category: 'LAB',
    box: [462, 448, 508, 474],
    door: pxToCoord(460, 461),
    description: 'Specimen preparation and hardness testing station.'
  },
  {
    id: 'S-MAT',
    code: 'S-MAT',
    name: 'Material Testing Lab',
    wing: 'Southern Wing (S)',
    category: 'LAB',
    box: [512, 448, 568, 485],
    door: pxToCoord(510, 466),
    description: 'Universal Testing Machine (UTM), tensile strength, impact, and torsion tests.'
  },
  {
    id: 'S-STAT',
    code: 'S-STAT',
    name: 'Stationery & Courier Center',
    wing: 'Southern Wing (S)',
    category: 'FACILITY',
    box: [512, 505, 568, 545],
    door: pxToCoord(510, 525),
    description: 'Campus stationery store, reprographics, printing, parcel dispatch, and courier desk.'
  },
  {
    id: 'S-011A',
    code: 'S-011A',
    name: 'Mechanical Workshop S-011A',
    wing: 'Southern Wing (S)',
    category: 'LAB',
    box: [462, 362, 508, 396],
    door: pxToCoord(460, 379),
    description: 'Fitting, carpentry, sheet metal and foundry training workshop.'
  },
  {
    id: 'S-011',
    code: 'S-011',
    name: 'CNC Robotics & Automation Lab',
    wing: 'Southern Wing (S)',
    category: 'LAB',
    box: [462, 328, 508, 362],
    door: pxToCoord(460, 345),
    description: 'Industrial robotic arms, automated 3-axis & 5-axis CNC machining center, and programmable automation rigs.'
  },
  {
    id: 'S-011B',
    code: 'S-011B',
    name: 'Wind Tunnel Facility S-011B',
    wing: 'Southern Wing (S)',
    category: 'LAB',
    box: [462, 290, 508, 328],
    door: pxToCoord(460, 309),
    description: 'Subsonic aerodynamic wind tunnel, airfoil lift/drag sensors, and boundary layer wind testing.'
  },
  {
    id: 'S-SHOP',
    code: 'S-SHOP',
    name: 'Shop Superintendent Office',
    wing: 'Southern Wing (S)',
    category: 'OFFICE',
    box: [512, 362, 568, 396],
    door: pxToCoord(510, 379),
    description: 'Workshop Superintendent, tooling inventory, and safety compliance.'
  },
  {
    id: 'TOILET-S-STAFF',
    code: 'WC-S1',
    name: 'Staff & Ladies Restroom (Mid)',
    wing: 'Southern Wing (S)',
    category: 'RESTROOM',
    box: [512, 396, 568, 428],
    door: pxToCoord(510, 412),
    description: 'Staff restrooms and sanitary facilities.'
  },
  {
    id: 'TOILET-S-UPPER',
    code: 'WC-S2',
    name: 'Ladies Restroom (North-East)',
    wing: 'Southern Wing (S)',
    category: 'RESTROOM',
    box: [520, 240, 568, 275],
    door: pxToCoord(518, 258),
    description: 'Ladies washrooms and rest chambers.'
  },
  {
    id: 'INFIRMARY',
    code: 'MED-01',
    name: 'Ladies Infirmary & Medical Post',
    wing: 'Southern Wing (S)',
    category: 'FACILITY',
    box: [520, 275, 574, 310],
    door: pxToCoord(518, 292),
    description: 'First aid, nursing care, doctor consultation, and emergency rest recovery ward.'
  }
];

// Enrich rooms with center coordinate and polygon
ROOMS_DATA.forEach(r => {
  const [x1, y1, x2, y2] = r.box;
  r.center = pxToCoord((x1 + x2) / 2, (y1 + y2) / 2);
  r.polygon = boxToPolygon(x1, y1, x2, y2);
  r.color = ROOM_CATEGORIES[r.category]?.color || '#3b82f6';
});

/**
 * Returns GeoJSON FeatureCollection for MapLibre GL
 */
function getRoomsGeoJSON() {
  return {
    type: 'FeatureCollection',
    features: ROOMS_DATA.map(r => ({
      type: 'Feature',
      id: r.id,
      properties: {
        id: r.id,
        code: r.code,
        name: r.name,
        wing: r.wing,
        category: r.category,
        categoryName: ROOM_CATEGORIES[r.category]?.name || r.category,
        description: r.description,
        color: r.color,
        doorLng: r.door[0],
        doorLat: r.door[1],
        centerLng: r.center[0],
        centerLat: r.center[1]
      },
      geometry: {
        type: 'Polygon',
        coordinates: [r.polygon]
      }
    }))
  };
}

/**
 * Returns GeoJSON Point Features for Room Centers/Labels
 */
function getRoomPointsGeoJSON() {
  return {
    type: 'FeatureCollection',
    features: ROOMS_DATA.map(r => ({
      type: 'Feature',
      properties: {
        id: r.id,
        code: r.code,
        name: r.name,
        category: r.category,
        color: r.color
      },
      geometry: {
        type: 'Point',
        coordinates: r.center
      }
    }))
  };
}
