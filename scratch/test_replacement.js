const fs = require('fs');

let code = fs.readFileSync('script.js', 'utf-8');

// Replace WAYPOINTS
const old_wp_str = `  // Outdoor Roadway Loop
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
  'wp_outdoor_mid_west_bend2':  { id: 'wp_outdoor_mid_west_bend2',  x: 121, y: 398, label: 'Metallurgy Lab South Outer Access' }`;

const new_wp_str = `  // Outdoor Roadway Loop (Matching user orange line)
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
  'wp_outdoor_sw_north_junc':   { id: 'wp_outdoor_sw_north_junc',   x: 290, y: 440, label: 'West Labs North Breezeway Junction' }`;

console.log('old_wp_str in code:', code.includes(old_wp_str));

// Replace EDGES
const old_edges_str = `  // Outdoor Roadway Loop
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
  ['wp_outdoor_mid_west_bend2', 'wp_nw_lab_metallurgy', 'outdoor']`;

const new_edges_str = `  // Outdoor Roadway Loop (Matching user orange line)
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
  ['wp_outdoor_amri_north_door', 'wp_admin_white_path', 'indoor'],
  ['wp_outdoor_amri_north_door', 'wp_outdoor_sw_breezeway_corner', 'outdoor'],
  ['wp_outdoor_sw_breezeway_corner', 'wp_sw_cross', 'outdoor'],
  ['wp_sw_cross', 'wp_outdoor_sw_north_junc', 'outdoor'],
  ['wp_outdoor_sw_north_junc', 'wp_nw_lab_metallurgy', 'outdoor']`;

console.log('old_edges_str in code:', code.includes(old_edges_str));
