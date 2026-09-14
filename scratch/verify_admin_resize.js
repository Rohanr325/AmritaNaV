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

  // 1. Zoom into Admin block (A-005, A-004, PRY-A, A-003, A-002)
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '210 670 330 160');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_admin_resized.png' });
  console.log('Saved scratch/verified_admin_resized.png');

  // 2. Test Dijkstra Route from A-003 to A-002
  await page.evaluate(() => {
    appState.startRoomId = 'A-003';
    appState.destRoomId = 'A-002';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_route_a003_to_a002.png' });
  console.log('Saved scratch/verified_route_a003_to_a002.png');

  // 3. Overview of Admin Block
  await page.evaluate(() => {
    clearRoute();
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '150 590 450 260');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_admin_full_overview.png' });
  console.log('Saved scratch/verified_admin_full_overview.png');

  await browser.close();
  console.log('Verification done!');
})();
