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
  await page.screenshot({ path: path.join(__dirname, 'admin_redgreen_overview_graph.png') });
  console.log('Saved admin_redgreen_overview_graph.png');

  // 2. Zoom into Admin block specifically
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '140 580 480 320');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'admin_redgreen_zoomed.png') });
  console.log('Saved admin_redgreen_zoomed.png');

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

  // Switch to directions tab
  await page.click('#tabDirections');
  await new Promise(r => setTimeout(r, 400));

  const routesToTest = [
    { start: 'A-006', dest: 'A-001', name: 'route_newpathway_a006_to_a001.png' },
    { start: 'PRAYER-HALL-A', dest: 'S-013', name: 'route_prayer_to_s013.png' },
    { start: 'A-004', dest: 'A-003', name: 'route_a004_to_a003.png' }
  ];

  for (const r of routesToTest) {
    await page.select('#startRoomSelect', r.start);
    await page.select('#destRoomSelect', r.dest);
    await new Promise(r => setTimeout(r, 800));

    // Zoom into admin area for route visibility
    await page.evaluate(() => {
      const svg = document.getElementById('campusMapSvg');
      if (svg) {
        svg.setAttribute('viewBox', '140 580 480 320');
      }
    });
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({ path: path.join(__dirname, r.name) });
    console.log('Saved', r.name);
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
})();
