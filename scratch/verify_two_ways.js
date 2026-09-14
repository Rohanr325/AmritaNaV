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

  // 1. Zoom into SW labs 2-way pathways (Clean view, no graph)
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '80 430 300 160');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_two_ways_clean.png' });
  console.log('Saved scratch/verified_two_ways_clean.png');

  // 2. Zoom into SW labs with Graph overlay visible
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'block';
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_two_ways_graph.png' });
  console.log('Saved scratch/verified_two_ways_graph.png');

  // 3. Test Route from WC-N1 to S-MFG
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'none';
    appState.startRoomId = 'TOILET-N-LOWER';
    appState.destRoomId = 'S-MFG';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_route_wc_to_smfg_twoways.png' });
  console.log('Saved scratch/verified_route_wc_to_smfg_twoways.png');

  // 4. Test Route from N-005 to N-007 (traverses both ways around courtyard)
  await page.evaluate(() => {
    appState.startRoomId = 'N-005-006';
    appState.destRoomId = 'N-007';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_route_n005_to_n007.png' });
  console.log('Saved scratch/verified_route_n005_to_n007.png');

  await browser.close();
  console.log('Verification finished successfully!');
})();
