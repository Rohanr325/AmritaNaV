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

  // 1. Full map overview with graph enabled
  await page.click('#toggleGraphBtn');
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'admin_shifted_overview_graph.png') });
  console.log('Saved admin_shifted_overview_graph.png');

  // 2. Zoom into Admin block specifically
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '140 570 480 290');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'admin_block_zoomed_shifted.png') });
  console.log('Saved admin_block_zoomed_shifted.png');

  // 3. Reset view and test routes
  await page.click('#resetViewBtn');
  await new Promise(r => setTimeout(r, 400));

  // Open sidebar if collapsed
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

  const testRoutes = [
    { start: 'A-006', dest: 'A-001', name: 'A-006 -> A-001 (Admin Cross Corridor)' },
    { start: 'RECEPTION', dest: 'N-001', name: 'Reception -> N-001' },
    { start: 'ADMIN-A', dest: 'S-013', name: 'Admin Office -> S-013' },
    { start: 'TOILET-N-LOWER', dest: 'GAD-PR', name: 'WC-N1 -> GAD-PR' }
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
    const safeName = tr.start + '_to_' + tr.dest;
    await page.screenshot({ path: path.join(__dirname, `route_shifted_${safeName}.png`) });
    console.log(`Saved route_shifted_${safeName}.png`);
  }

  await browser.close();
  console.log('Verification finished successfully!');
})();
