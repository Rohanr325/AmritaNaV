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

  // 1. Toggle Graph Lines so we can see the exact network
  await page.click('#toggleGraphBtn');
  await new Promise(r => setTimeout(r, 600));

  // Take screenshot of map with graph lines enabled
  await page.screenshot({ path: path.join(__dirname, 'new_network_graph_overview.png') });
  console.log('Saved scratch/new_network_graph_overview.png');

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

  const testCases = [
    { start: 'N-020', dest: 'S-013', file: 'route_new_n020_to_s013.png' },
    { start: 'N-018', dest: 'S-012', file: 'route_new_n018_to_s012.png' },
    { start: 'N-001', dest: 'S-001', file: 'route_new_n001_to_s001.png' },
    { start: 'S-003', dest: 'N-010', file: 'route_new_s003_to_n010.png' }
  ];

  for (const tc of testCases) {
    await page.select('#startRoomSelect', tc.start);
    await page.select('#destRoomSelect', tc.dest);
    await new Promise(r => setTimeout(r, 600));

    const metrics = await page.evaluate(() => {
      return {
        dist: document.getElementById('routeDistVal').innerText,
        time: document.getElementById('routeTimeVal').innerText,
        indoorD: document.getElementById('svgRouteCore').getAttribute('d')
      };
    });
    console.log('Route ' + tc.start + ' -> ' + tc.dest + ': dist=' + metrics.dist + ', time=' + metrics.time);
    await page.screenshot({ path: path.join(__dirname, tc.file) });
  }

  await browser.close();
  console.log('Finished testing all routes!');
})();
