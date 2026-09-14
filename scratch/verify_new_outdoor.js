const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 950 });

  await page.goto('file:///d:/nav/index.html', { waitUntil: 'load' });

  // Hide sidebar
  await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    if (sb) sb.style.display = 'none';
    const tg = document.getElementById('sidebarToggleBtn');
    if (tg) tg.style.display = 'none';
  });

  // 1. Full campus view with Graph overlay visible
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'block';
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '0 0 723 1024');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_new_outdoor_full_graph.png' });
  console.log('Saved scratch/verified_new_outdoor_full_graph.png');

  // 2. Zoom into West connector (A-006, N-005, N-004, N-014)
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '90 360 250 360');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_west_outdoor_graph.png' });
  console.log('Saved scratch/verified_west_outdoor_graph.png');

  // 3. Zoom into East connector (S-004A, Acharya, S-001)
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '380 540 300 360');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_east_outdoor_graph.png' });
  console.log('Saved scratch/verified_east_outdoor_graph.png');

  // 4. Test Route that uses outdoor pathway: A-006 to N-014
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'none';
    appState.startRoomId = 'A-006';
    appState.destRoomId = 'N-014';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_route_a006_to_n014.png' });
  console.log('Saved scratch/verified_route_a006_to_n014.png');

  await browser.close();
  console.log('Outdoor verification finished!');
})();
