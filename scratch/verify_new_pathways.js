const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('file:///d:/nav/index.html', { waitUntil: 'load' });

  // Hide sidebar
  await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    if (sb) sb.style.display = 'none';
    const tg = document.getElementById('sidebarToggleBtn');
    if (tg) tg.style.display = 'none';
  });

  // 1. Zoom into upper bridge (WC-N2 to WC-S2)
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '140 230 460 140');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_upper_bridge.png' });
  console.log('Saved scratch/verified_upper_bridge.png');

  // 2. Zoom into lower pathway & SW labs (WC-N1 across to S-MFG)
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '80 430 520 160');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_lower_pathway.png' });
  console.log('Saved scratch/verified_lower_pathway.png');

  // 3. Test Dijkstra Route 1: WC-N2 to WC-S2
  const route1 = await page.evaluate(() => {
    appState.startRoomId = 'TOILET-N-UPPER';
    appState.destRoomId = 'TOILET-S-UPPER';
    calculateAndRenderRoute();
    return appState.currentRoute ? appState.currentRoute.path : null;
  });
  console.log('Route 1 (WC-N2 to WC-S2):', route1);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_route_upper_bridge.png' });
  console.log('Saved scratch/verified_route_upper_bridge.png');

  // 4. Test Dijkstra Route 2: WC-N1 to S-MFG
  const route2 = await page.evaluate(() => {
    appState.startRoomId = 'TOILET-N-LOWER';
    appState.destRoomId = 'S-MFG';
    calculateAndRenderRoute();
    return appState.currentRoute ? appState.currentRoute.path : null;
  });
  console.log('Route 2 (WC-N1 to S-MFG):', route2);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_route_lower_pathway.png' });
  console.log('Saved scratch/verified_route_lower_pathway.png');

  // 5. Full overview with graph visible
  await page.evaluate(() => {
    clearRoute();
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'block';
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '0 0 723 1024');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_full_map_graph.png' });
  console.log('Saved scratch/verified_full_map_graph.png');

  await browser.close();
  console.log('Verification complete!');
})();
