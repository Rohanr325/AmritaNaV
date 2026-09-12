/**
 * Indoor Navigation Graph & Pathfinding Engine for Amrita Vishwa Vidyapeetham
 * Implements Dijkstra / A* routing across building corridors, hallways, and bridges.
 */

// Waypoints along hallways, corridors, doors, and intersections
const WAYPOINTS = {
  // Admin Block & Entrance
  'node_entrance':           { id: 'node_entrance',           coord: pxToCoord(368, 775), label: 'Main Building Entrance' },
  'node_reception':          { id: 'node_reception',          coord: pxToCoord(368, 725), label: 'Reception Foyer' },
  'node_admin_junction':     { id: 'node_admin_junction',     coord: pxToCoord(368, 678), label: 'Central Admin Crossroad' },
  'node_admin_west_1':       { id: 'node_admin_west_1',       coord: pxToCoord(325, 678), label: 'West Admin Walkway (A-004 / A-005)' },
  'node_admin_west_end':     { id: 'node_admin_west_end',     coord: pxToCoord(278, 628), label: 'Amritheswari Hall Foyer (A-006)' },
  'node_admin_east_1':       { id: 'node_admin_east_1',       coord: pxToCoord(415, 678), label: 'East Admin Walkway (A-002 / A-003)' },
  'node_admin_east_end':     { id: 'node_admin_east_end',     coord: pxToCoord(463, 628), label: 'Acharya Hall Foyer (A-001)' },
  'node_prayer_junction':    { id: 'node_prayer_junction',    coord: pxToCoord(368, 645), label: 'Central Prayer Hall Vestibule' },

  // Central Spine & Courtyard
  'node_spine_south':        { id: 'node_spine_south',        coord: pxToCoord(368, 620), label: 'Central Atrium - South Gate' },
  'node_spine_mid':          { id: 'node_spine_mid',          coord: pxToCoord(368, 550), label: 'Central Courtyard Walkway' },
  'node_spine_north':        { id: 'node_spine_north',        coord: pxToCoord(368, 485), label: 'Central Courtyard - North Hub' },

  // Northern Wing Central Spine Corridor
  'node_n_spine_1':          { id: 'node_n_spine_1',          coord: pxToCoord(356, 593), label: 'North Corridor (Admission N-001)' },
  'node_n_spine_2':          { id: 'node_n_spine_2',          coord: pxToCoord(356, 559), label: 'North Corridor (Mech Prof N-002)' },
  'node_n_spine_3':          { id: 'node_n_spine_3',          coord: pxToCoord(356, 529), label: 'North Corridor (CIR Seminar N-003)' },
  'node_n_cross_bridge':     { id: 'node_n_cross_bridge',     coord: pxToCoord(356, 485), label: 'North Wing Mid-Bridge Hub' },
  'node_n_spine_4':          { id: 'node_n_spine_4',          coord: pxToCoord(356, 472), label: 'North Corridor (Staff Room N-010)' },
  'node_n_spine_5':          { id: 'node_n_spine_5',          coord: pxToCoord(356, 428), label: 'North Corridor (Student Affairs N-011)' },
  'node_n_spine_6':          { id: 'node_n_spine_6',          coord: pxToCoord(356, 391), label: 'North Corridor (HR Dept N-012)' },
  'node_n_spine_7':          { id: 'node_n_spine_7',          coord: pxToCoord(356, 356), label: 'North Corridor (Principal Office N-013)' },
  'node_n_spine_mid':        { id: 'node_n_spine_mid',        coord: pxToCoord(356, 330), label: 'North Mid-Junction Hub' },
  'node_n_spine_8':          { id: 'node_n_spine_8',          coord: pxToCoord(356, 301), label: 'North Corridor (Math Dept N-018)' },
  'node_n_spine_9':          { id: 'node_n_spine_9',          coord: pxToCoord(356, 229), label: 'North Corridor (Machines Lab N-019)' },
  'node_n_spine_top':        { id: 'node_n_spine_top',        coord: pxToCoord(356, 166), label: 'North Prayer & Upper Bridge Hub (N-020)' },

  // Northern Wing Outer Lab Corridor
  'node_n_lab_south':        { id: 'node_n_lab_south',        coord: pxToCoord(282, 538), label: 'Nano Sciences Lab Corridor (N-004 / N-005)' },
  'node_n_lab_mid':          { id: 'node_n_lab_mid',          coord: pxToCoord(282, 470), label: 'Thermal & Fluid Labs Corridor (N-007..009)' },
  'node_n_toilet_lower':     { id: 'node_n_toilet_lower',     coord: pxToCoord(165, 500), label: 'Gents Restroom Vestibule (North-West)' },
  'node_n_lab_junction':     { id: 'node_n_lab_junction',     coord: pxToCoord(282, 330), label: 'North Outer Labs Connector' },
  'node_n_lab_upper_1':      { id: 'node_n_lab_upper_1',      coord: pxToCoord(280, 391), label: 'Metallurgy Lab Corridor (N-014)' },
  'node_n_lab_upper_2':      { id: 'node_n_lab_upper_2',      coord: pxToCoord(280, 356), label: 'Fluid Mechanics Corridor (N-015)' },
  'node_n_lab_upper_3':      { id: 'node_n_lab_upper_3',      coord: pxToCoord(280, 323), label: 'CAE Simulation Corridor (N-016)' },
  'node_n_lab_upper_4':      { id: 'node_n_lab_upper_4',      coord: pxToCoord(280, 291), label: 'Dynamics Lab Corridor (N-017)' },
  'node_n_toilet_upper':     { id: 'node_n_toilet_upper',     coord: pxToCoord(190, 255), label: 'Gents Upper Restroom (North-West)' },

  // Southern Wing Central Spine Corridor
  'node_s_spine_1':          { id: 'node_s_spine_1',          coord: pxToCoord(378, 593), label: 'South Corridor (Guest Room S-001)' },
  'node_s_spine_2':          { id: 'node_s_spine_2',          coord: pxToCoord(378, 559), label: 'South Corridor (Amrita SeRVe S-002)' },
  'node_s_spine_3':          { id: 'node_s_spine_3',          coord: pxToCoord(378, 529), label: 'South Corridor (Guest Kitchen S-003)' },
  'node_s_cross_bridge':     { id: 'node_s_cross_bridge',     coord: pxToCoord(378, 485), label: 'South Wing Mid-Bridge Hub' },
  'node_s_spine_4':          { id: 'node_s_spine_4',          coord: pxToCoord(378, 472), label: 'South Corridor (ECE/EEE Staff S-006)' },
  'node_s_spine_5':          { id: 'node_s_spine_5',          coord: pxToCoord(378, 428), label: 'South Corridor (Director Office S-007)' },
  'node_s_spine_6':          { id: 'node_s_spine_6',          coord: pxToCoord(378, 391), label: 'South Corridor (Arts Principal S-008)' },
  'node_s_spine_7':          { id: 'node_s_spine_7',          coord: pxToCoord(378, 356), label: 'South Corridor (Conference Room S-010)' },
  'node_s_spine_mid':        { id: 'node_s_spine_mid',        coord: pxToCoord(378, 330), label: 'South Mid-Junction Hub' },
  'node_s_spine_8':          { id: 'node_s_spine_8',          coord: pxToCoord(378, 301), label: 'South Corridor (College Admin S-012)' },
  'node_s_spine_9':          { id: 'node_s_spine_9',          coord: pxToCoord(378, 229), label: 'South Corridor (Computer Lab S-013)' },
  'node_s_spine_top':        { id: 'node_s_spine_top',        coord: pxToCoord(378, 166), label: 'South Nanotech & Upper Bridge Hub (S-014)' },

  // Southern Wing Outer Lab Corridor
  'node_s_lab_south':        { id: 'node_s_lab_south',        coord: pxToCoord(455, 550), label: 'Faculty & Research Corridor (S-004)' },
  'node_s_lab_mfg':          { id: 'node_s_lab_mfg',          coord: pxToCoord(455, 502), label: 'Manufacturing Lab Corridor (S-MFG)' },
  'node_s_lab_testing':      { id: 'node_s_lab_testing',      coord: pxToCoord(455, 461), label: 'Materials Testing Corridor (S-005)' },
  'node_s_stat':             { id: 'node_s_stat',             coord: pxToCoord(505, 525), label: 'Stationery & Reprographics Desk' },
  'node_s_lab_junction':     { id: 'node_s_lab_junction',     coord: pxToCoord(455, 330), label: 'South Outer Labs Connector' },
  'node_s_workshop':         { id: 'node_s_workshop',         coord: pxToCoord(455, 379), label: 'Mechanical Workshop Corridor (S-011A)' },
  'node_s_robotics':         { id: 'node_s_robotics',         coord: pxToCoord(455, 345), label: 'CNC Robotics & Automation (S-011)' },
  'node_s_windtunnel':       { id: 'node_s_windtunnel',       coord: pxToCoord(455, 309), label: 'Wind Tunnel Facility (S-011B)' },
  'node_s_toilet_staff':     { id: 'node_s_toilet_staff',     coord: pxToCoord(508, 412), label: 'Staff & Ladies Restroom (Mid-East)' },
  'node_s_infirmary':        { id: 'node_s_infirmary',        coord: pxToCoord(515, 292), label: 'Ladies Infirmary & Medical Post' }
};

// Edges in hallway network [nodeA, nodeB, bidirectional=true]
const HALLWAY_EDGES = [
  // Entrance & Reception
  ['node_entrance', 'node_reception'],
  ['node_reception', 'node_admin_junction'],

  // Admin corridor
  ['node_admin_junction', 'node_admin_west_1'],
  ['node_admin_west_1', 'node_admin_west_end'],
  ['node_admin_junction', 'node_admin_east_1'],
  ['node_admin_east_1', 'node_admin_east_end'],
  ['node_admin_junction', 'node_prayer_junction'],
  ['node_prayer_junction', 'node_spine_south'],

  // Central Spine through Courtyard
  ['node_spine_south', 'node_spine_mid'],
  ['node_spine_mid', 'node_spine_north'],

  // Mid Cross-Bridge connects central spine with both wings
  ['node_n_cross_bridge', 'node_spine_north'],
  ['node_spine_north', 'node_s_cross_bridge'],

  // North Spine Chain
  ['node_spine_south', 'node_n_spine_1'],
  ['node_n_spine_1', 'node_n_spine_2'],
  ['node_n_spine_2', 'node_n_spine_3'],
  ['node_n_spine_3', 'node_n_cross_bridge'],
  ['node_n_cross_bridge', 'node_n_spine_4'],
  ['node_n_spine_4', 'node_n_spine_5'],
  ['node_n_spine_5', 'node_n_spine_6'],
  ['node_n_spine_6', 'node_n_spine_7'],
  ['node_n_spine_7', 'node_n_spine_mid'],
  ['node_n_spine_mid', 'node_n_spine_8'],
  ['node_n_spine_8', 'node_n_spine_9'],
  ['node_n_spine_9', 'node_n_spine_top'],

  // North Outer Lab Connectors & Chain
  ['node_n_cross_bridge', 'node_n_lab_mid'],
  ['node_n_lab_mid', 'node_n_lab_south'],
  ['node_n_lab_south', 'node_admin_west_end'],
  ['node_n_lab_mid', 'node_n_toilet_lower'],
  ['node_n_spine_mid', 'node_n_lab_junction'],
  ['node_n_lab_junction', 'node_n_lab_mid'],
  ['node_n_lab_junction', 'node_n_lab_upper_1'],
  ['node_n_lab_upper_1', 'node_n_lab_upper_2'],
  ['node_n_lab_upper_2', 'node_n_lab_upper_3'],
  ['node_n_lab_upper_3', 'node_n_lab_upper_4'],
  ['node_n_lab_upper_4', 'node_n_toilet_upper'],
  ['node_n_lab_upper_4', 'node_n_spine_top'],

  // South Spine Chain
  ['node_spine_south', 'node_s_spine_1'],
  ['node_s_spine_1', 'node_s_spine_2'],
  ['node_s_spine_2', 'node_s_spine_3'],
  ['node_s_spine_3', 'node_s_cross_bridge'],
  ['node_s_cross_bridge', 'node_s_spine_4'],
  ['node_s_spine_4', 'node_s_spine_5'],
  ['node_s_spine_5', 'node_s_spine_6'],
  ['node_s_spine_6', 'node_s_spine_7'],
  ['node_s_spine_7', 'node_s_spine_mid'],
  ['node_s_spine_mid', 'node_s_spine_8'],
  ['node_s_spine_8', 'node_s_spine_9'],
  ['node_s_spine_9', 'node_s_spine_top'],

  // South Outer Lab Connectors & Chain
  ['node_s_cross_bridge', 'node_s_lab_mfg'],
  ['node_s_lab_mfg', 'node_s_lab_testing'],
  ['node_s_lab_mfg', 'node_s_lab_south'],
  ['node_s_lab_south', 'node_admin_east_end'],
  ['node_s_lab_mfg', 'node_s_stat'],
  ['node_s_spine_mid', 'node_s_lab_junction'],
  ['node_s_lab_junction', 'node_s_lab_testing'],
  ['node_s_lab_junction', 'node_s_robotics'],
  ['node_s_robotics', 'node_s_workshop'],
  ['node_s_workshop', 'node_s_toilet_staff'],
  ['node_s_robotics', 'node_s_windtunnel'],
  ['node_s_windtunnel', 'node_s_infirmary'],
  ['node_s_windtunnel', 'node_s_spine_top'],

  // Cross Bridges between North and South Wings
  ['node_n_spine_mid', 'node_s_spine_mid'], // Mid cross walkway
  ['node_n_spine_top', 'node_s_spine_top']  // Top cross walkway bridge
];

// Build adjacency graph with euclidean weights
const ADJACENCY_GRAPH = {};

function initGraph() {
  Object.keys(WAYPOINTS).forEach(id => {
    ADJACENCY_GRAPH[id] = [];
  });

  HALLWAY_EDGES.forEach(([u, v]) => {
    if (!WAYPOINTS[u] || !WAYPOINTS[v]) return;
    const c1 = WAYPOINTS[u].coord;
    const c2 = WAYPOINTS[v].coord;
    const dist = Math.hypot(c1[0] - c2[0], c1[1] - c2[1]) * MAP_CONFIG.scaleMetersPerUnit;
    ADJACENCY_GRAPH[u].push({ to: v, dist });
    ADJACENCY_GRAPH[v].push({ to: u, dist });
  });

  // Link each room's door to the nearest waypoint
  ROOMS_DATA.forEach(room => {
    const doorNodeId = 'door_' + room.id;
    WAYPOINTS[doorNodeId] = {
      id: doorNodeId,
      coord: room.door,
      label: `Door of ${room.name}`
    };
    ADJACENCY_GRAPH[doorNodeId] = [];

    // Find nearest hallway node
    let nearestNode = null;
    let minDist = Infinity;
    Object.entries(WAYPOINTS).forEach(([id, wp]) => {
      if (id.startsWith('door_')) return;
      const d = Math.hypot(room.door[0] - wp.coord[0], room.door[1] - wp.coord[1]);
      if (d < minDist) {
        minDist = d;
        nearestNode = id;
      }
    });

    if (nearestNode) {
      const distMeters = minDist * MAP_CONFIG.scaleMetersPerUnit;
      ADJACENCY_GRAPH[doorNodeId].push({ to: nearestNode, dist: distMeters });
      ADJACENCY_GRAPH[nearestNode].push({ to: doorNodeId, dist: distMeters });
    }
  });
}

initGraph();

/**
 * Returns GeoJSON LineString collection of all corridor hallways
 */
function getCorridorsGeoJSON() {
  const lines = HALLWAY_EDGES.map(([u, v]) => {
    const p1 = WAYPOINTS[u]?.coord;
    const p2 = WAYPOINTS[v]?.coord;
    if (!p1 || !p2) return null;
    return {
      type: 'Feature',
      properties: { u, v },
      geometry: {
        type: 'LineString',
        coordinates: [p1, p2]
      }
    };
  }).filter(Boolean);

  return {
    type: 'FeatureCollection',
    features: lines
  };
}

/**
 * Dijkstra's shortest path algorithm
 */
function dijkstra(startId, endId) {
  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(WAYPOINTS));

  Object.keys(WAYPOINTS).forEach(id => {
    distances[id] = Infinity;
  });
  distances[startId] = 0;

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
    if (current === endId) break;

    unvisited.delete(current);

    const neighbors = ADJACENCY_GRAPH[current] || [];
    for (const edge of neighbors) {
      if (!unvisited.has(edge.to)) continue;
      const alt = distances[current] + edge.dist;
      if (alt < distances[edge.to]) {
        distances[edge.to] = alt;
        previous[edge.to] = current;
      }
    }
  }

  if (distances[endId] === Infinity) return null;

  const path = [];
  let curr = endId;
  while (curr) {
    path.unshift(curr);
    curr = previous[curr];
  }

  return {
    path,
    distanceMeters: Math.round(distances[endId])
  };
}

/**
 * Calculate bearing between two coordinates in degrees
 */
function calculateBearing(p1, p2) {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  let angle = Math.atan2(dx, dy) * (180 / Math.PI);
  return (angle + 360) % 360;
}

/**
 * Generate turn-by-turn guidance text from path nodes
 */
function generateDirections(pathNodes, startRoom, endRoom) {
  if (!pathNodes || pathNodes.length < 2) return [];

  const directions = [];
  directions.push({
    icon: 'start',
    action: 'Depart',
    instruction: `Depart from ${startRoom ? startRoom.name : 'start point'} into hallway`,
    distance: 0
  });

  for (let i = 1; i < pathNodes.length - 1; i++) {
    const prevNode = WAYPOINTS[pathNodes[i - 1]];
    const currNode = WAYPOINTS[pathNodes[i]];
    const nextNode = WAYPOINTS[pathNodes[i + 1]];

    if (!prevNode || !currNode || !nextNode) continue;

    const b1 = calculateBearing(prevNode.coord, currNode.coord);
    const b2 = calculateBearing(currNode.coord, nextNode.coord);
    let diff = (b2 - b1 + 360) % 360;
    if (diff > 180) diff -= 360;

    const segDist = Math.round(
      Math.hypot(currNode.coord[0] - nextNode.coord[0], currNode.coord[1] - nextNode.coord[1]) *
      MAP_CONFIG.scaleMetersPerUnit
    );

    let action = 'Straight';
    let icon = 'arrow-up';
    let turnText = 'Continue along';

    if (diff > 35 && diff <= 135) {
      action = 'Turn Right';
      icon = 'corner-up-right';
      turnText = 'Turn right at';
    } else if (diff < -35 && diff >= -135) {
      action = 'Turn Left';
      icon = 'corner-up-left';
      turnText = 'Turn left at';
    } else if (Math.abs(diff) > 135) {
      action = 'U-Turn';
      icon = 'refresh-cw';
      turnText = 'Make a U-turn near';
    }

    if (action !== 'Straight' || i === 1 || i === pathNodes.length - 2) {
      directions.push({
        icon,
        action,
        instruction: `${turnText} ${currNode.label.replace(/^Door of /, '')}`,
        distance: segDist
      });
    }
  }

  directions.push({
    icon: 'arrive',
    action: 'Arrive',
    instruction: `Arrive at destination: ${endRoom ? endRoom.name : 'Destination'}`,
    distance: 0
  });

  return directions;
}

/**
 * Main Pathfinding Entry Point
 * @param {string} startRoomId
 * @param {string} endRoomId
 */
function findIndoorRoute(startRoomId, endRoomId) {
  const startRoom = ROOMS_DATA.find(r => r.id === startRoomId);
  const endRoom = ROOMS_DATA.find(r => r.id === endRoomId);

  if (!startRoom || !endRoom) return null;
  if (startRoomId === endRoomId) return null;

  const startNode = 'door_' + startRoomId;
  const endNode = 'door_' + endRoomId;

  const result = dijkstra(startNode, endNode);
  if (!result) return null;

  // Build full coordinate trajectory
  const coordinates = [
    startRoom.center,
    ...result.path.map(id => WAYPOINTS[id].coord),
    endRoom.center
  ];

  // Estimated walking time: average walking speed 1.2 m/s (72 m/min)
  const walkingTimeSeconds = Math.round(result.distanceMeters / 1.2);
  const minutes = Math.floor(walkingTimeSeconds / 60);
  const seconds = walkingTimeSeconds % 60;
  const durationText = minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;

  const steps = generateDirections(result.path, startRoom, endRoom);

  return {
    startRoom,
    endRoom,
    distanceMeters: result.distanceMeters,
    walkingTimeSeconds,
    durationText,
    steps,
    pathNodeIds: result.path,
    coordinates,
    geoJSON: {
      type: 'Feature',
      properties: {
        distance: result.distanceMeters,
        duration: durationText
      },
      geometry: {
        type: 'LineString',
        coordinates
      }
    }
  };
}
