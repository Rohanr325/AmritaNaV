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

  // 1. Zoom into the bridges area (Clean view, no graph)
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '130 220 480 340');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_bridges_clean.png' });
  console.log('Saved scratch/verified_bridges_clean.png');

  // 2. Zoom with Graph overlay visible
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'block';
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_bridges_graph.png' });
  console.log('Saved scratch/verified_bridges_graph.png');

  // 3. Route across Top Orange Line: WC-N2 to WC-S2
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'none';
    appState.startRoomId = 'TOILET-N-UPPER';
    appState.destRoomId = 'TOILET-S-UPPER';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_route_top_orange_bridge.png' });
  console.log('Saved scratch/verified_route_top_orange_bridge.png');

  // 4. Route across Middle Orange Line: N-012 (HR) to S-008 (Principal Arts)
  await page.evaluate(() => {
    appState.startRoomId = 'N-012';
    appState.destRoomId = 'S-008';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_route_mid_orange_bridge.png' });
  console.log('Saved scratch/verified_route_mid_orange_bridge.png');

  // 5. Route across Bottom Orange Line: SW Labs N-007 to S-MFG
  await page.evaluate(() => {
    appState.startRoomId = 'N-007';
    appState.destRoomId = 'S-MFG';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_route_bottom_orange_bridge.png' });
  console.log('Saved scratch/verified_route_bottom_orange_bridge.png');

  await browser.close();
  console.log('Bridge verification completed successfully!');
})();
