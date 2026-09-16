const fs = require('fs');
const puppeteer = require('puppeteer-core');

(async () => {
  // Read current script.js
  let js = fs.readFileSync('script.js', 'utf8');

  // Let's create a modified version script_test.js
  let modJs = js;

  // 1. Remove Top Bridge corridor
  const oldCorr = `    <!-- Top Bridge across Atrium -->
    <rect class="corridor-floor" x="346" y="166" width="62" height="9" rx="1" />
    <line class="corridor-centerline" x1="350" y1="170" x2="404" y2="170" />`;
  
  // 2. Remove building-wing bridge
  const oldWing = `    <rect class="building-wing" x="346" y="166" width="60" height="16" />\n`;

  // 3. Remove North Stairs
  const oldStairs = `      { x: 368, y: 172, w: 14, h: 16, steps: 5, dir: 'h' }, // North Stairs\n`;

  // 4. Remove SHARED_STAIRS stair_north
  const oldSharedStair = `  { id: 'stair_north', name: 'North Stairs', f0Node: 'wp_north_exit_hub', f2Node: 'wp_f2_north_stair' },\n`;
  const oldSharedStairEnd = `  { id: 'stair_north', name: 'North Stairs', f0Node: 'wp_north_exit_hub', f2Node: 'wp_f2_north_stair' }`;

  // 5. Remove waypoint wp_f2_north_stair
  const oldWp = `  // Top Bridge & Stairs\n  wp_f2_north_stair: { id: 'wp_f2_north_stair', x: 374, y: 170, label: 'North Stairs (2nd Fl)' },\n`;

  // 6. Remove edges
  const oldEdges = `  // Top Bridge\n  ['wp_f2_spine_w_top', 'wp_f2_north_stair'],\n  ['wp_f2_north_stair', 'wp_f2_spine_e_top'],\n`;

  console.log('oldCorr in text:', modJs.includes(oldCorr));
  console.log('oldWing in text:', modJs.includes(oldWing));
  console.log('oldStairs in text:', modJs.includes(oldStairs));
  console.log('oldSharedStair in text:', modJs.includes(oldSharedStair) || modJs.includes(oldSharedStairEnd));
  console.log('oldWp in text:', modJs.includes(oldWp));
  console.log('oldEdges in text:', modJs.includes(oldEdges));

  modJs = modJs.replace(oldCorr, '');
  modJs = modJs.replace(oldWing, '');
  modJs = modJs.replace(oldStairs, '');
  if (modJs.includes(oldSharedStair)) modJs = modJs.replace(oldSharedStair, '');
  else modJs = modJs.replace(oldSharedStairEnd, '');
  modJs = modJs.replace(oldWp, '');
  modJs = modJs.replace(oldEdges, '');

  fs.writeFileSync('scratch/script_test_remove_bridge.js', modJs, 'utf8');

  // Launch browser with index.html modified to use script_test_remove_bridge.js
  let html = fs.readFileSync('index.html', 'utf8');
  let testHtml = html.replace('src="script.js"', 'src="scratch/script_test_remove_bridge.js"');
  fs.writeFileSync('scratch/test_index.html', testHtml, 'utf8');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 800 });

  await page.goto('file:///d:/nav/scratch/test_index.html', { waitUntil: 'load' });

  // Hide sidebar and switch to Floor 2
  await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    if (sb) sb.style.display = 'none';
    const tg = document.getElementById('sidebarToggleBtn');
    if (tg) tg.style.display = 'none';
    switchFloor(2);
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '280 135 180 230');
  });

  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/user_area_test_removed.png' });
  console.log('Saved scratch/user_area_test_removed.png');

  // Also toggle graph to see the graph nodes
  await page.evaluate(() => {
    toggleGraph();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/user_area_test_graph.png' });
  console.log('Saved scratch/user_area_test_graph.png');

  await browser.close();
})();
