const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 950 });

  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  // 1. Capture Full Map View with graph enabled
  await page.click('#toggleGraphBtn');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'final_full_map_graph.png') });
  console.log('Saved final_full_map_graph.png');

  // 2. Open sidebar if collapsed
  const isCollapsed = await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    return sb && sb.classList.contains('collapsed');
  });
  if (isCollapsed) {
    await page.click('#sidebarToggleBtn');
    await new Promise(r => setTimeout(r, 400));
  }
  await page.click('#tabDirections');
  await new Promise(r => setTimeout(r, 400));

  // Test routes
  const testRoutes = [
    { start: 'TOILET-N-UPPER', dest: 'S-013', name: 'WC-N2 (White Line 1) -> S-013' },
    { start: 'N-016', dest: 'S-011', name: 'N-016 (White Line 2 Full Cross) -> S-011' },
    { start: 'A-006', dest: 'A-001', name: 'A-006 -> A-001 (Admin Cross Corridor)' },
    { start: 'N-004', dest: 'S-MFG', name: 'N-004 -> S-MFG (Lower Cross Passage)' }
  ];

  for (const tr of testRoutes) {
    await page.select('#startRoomSelect', tr.start);
    await page.select('#destRoomSelect', tr.dest);
    await new Promise(r => setTimeout(r, 600));

    const metrics = await page.evaluate(() => {
      const core = document.getElementById('svgRouteCore');
      const out = document.getElementById('svgRouteOutdoorCore');
      return {
        dist: document.getElementById('routeDistVal').innerText,
        time: document.getElementById('routeTimeVal').innerText,
        hasIndoor: !!(core && core.getAttribute('d')),
        hasOutdoor: !!(out && out.getAttribute('d'))
      };
    });
    console.log(`Route [${tr.name}]: dist=${metrics.dist}, time=${metrics.time}, indoor=${metrics.hasIndoor}, outdoor=${metrics.hasOutdoor}`);
    const fname = 'route_' + tr.start + '_to_' + tr.dest + '.png';
    await page.screenshot({ path: path.join(__dirname, fname) });
  }

  // 3. Zoomed in view showing the clean single corridors, new margins, and white line passages
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    svg.setAttribute('viewBox', '140 220 460 480');
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, 'zoomed_clean_margins_and_pathways.png') });
  console.log('Saved zoomed_clean_margins_and_pathways.png');

  await browser.close();
  console.log('ALL TESTS COMPLETED SUCCESSFULLY!');
})();
