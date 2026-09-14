const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto('file:///d:/nav/index.html', { waitUntil: 'load' });

  // Hide sidebar
  await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    if (sb) sb.style.display = 'none';
    const tg = document.getElementById('sidebarToggleBtn');
    if (tg) tg.style.display = 'none';
  });

  // 1. Zoom into the exact region shown in user's screenshot
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '260 320 230 150');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_atrium_bridge_clean.png' });
  console.log('Saved scratch/verified_atrium_bridge_clean.png');

  // 2. View with routing graph overlay
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'block';
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_atrium_bridge_graph.png' });
  console.log('Saved scratch/verified_atrium_bridge_graph.png');

  // 3. Test Dijkstra Route across the new blue line bridge: N-012 to S-008
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'none';
    appState.startRoomId = 'N-012';
    appState.destRoomId = 'S-008';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_route_n012_to_s008.png' });
  console.log('Saved scratch/verified_route_n012_to_s008.png');

  // 4. Test Dijkstra Route: N-016 (CAE Cell in NW) to S-011 (CNC in NE)
  await page.evaluate(() => {
    appState.startRoomId = 'N-016';
    appState.destRoomId = 'S-011';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_route_n016_to_s011.png' });
  console.log('Saved scratch/verified_route_n016_to_s011.png');

  await browser.close();
  console.log('Verification finished successfully!');
})();
