const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  // Open sidebar if collapsed
  const isCollapsed = await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    return sb && sb.classList.contains('collapsed');
  });
  if (isCollapsed) {
    await page.click('#sidebarToggleBtn');
    await new Promise(r => setTimeout(r, 400));
  }

  // Switch to Directions tab
  await page.click('#tabDirections');
  await new Promise(r => setTimeout(r, 400));

  const testRoutes = [
    { start: 'N-020', dest: 'S-013', name: 'verified_route_N020_to_S013.png' },
    { start: 'S-011A', dest: 'S-005', name: 'verified_route_S011A_to_S005.png' },
    { start: 'N-007', dest: 'N-005-006', name: 'verified_route_N007_to_N005.png' },
    { start: 'S-001', dest: 'N-014', name: 'verified_route_S001_to_N014.png' },
    { start: 'S-004A', dest: 'A-001', name: 'verified_route_S004A_to_A001.png' },
  ];

  for (const r of testRoutes) {
    console.log('Testing route: ' + r.start + ' -> ' + r.dest);
    await page.select('#startRoomSelect', r.start);
    await page.select('#destRoomSelect', r.dest);
    await new Promise(res => setTimeout(res, 800));

    const info = await page.evaluate(() => {
      const indoorD = document.getElementById('svgRouteCore').getAttribute('d') || '';
      const outdoorD = document.getElementById('svgRouteOutdoorCore') ? (document.getElementById('svgRouteOutdoorCore').getAttribute('d') || '') : '';
      const dist = document.getElementById('routeDistVal').innerText;
      const time = document.getElementById('routeTimeVal').innerText;
      return { indoorD, outdoorD, dist, time };
    });

    console.log('  Indoor path: ' + (info.indoorD ? info.indoorD.substring(0, 60) + '...' : '(none)'));
    console.log('  Outdoor path: ' + (info.outdoorD ? info.outdoorD.substring(0, 60) + '...' : '(none)'));
    console.log('  Distance: ' + info.dist + ', Time: ' + info.time);

    await page.screenshot({ path: path.join('scratch', r.name) });
  }

  // Also test toggling Graph Lines
  await page.click('#toggleGraphBtn');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join('scratch', 'verified_graph_overlay.png') });
  console.log('Saved verified_graph_overlay.png');

  await browser.close();
  console.log('All tests finished successfully!');
})();
