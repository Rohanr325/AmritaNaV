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

  // Ensure Floor 0 is active
  await page.evaluate(() => {
    switchFloor(0);
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '50 30 650 860');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_ground_floor_intact.png' });
  console.log('Saved scratch/verified_ground_floor_intact.png');

  // Verify multi-floor routing: N-001 (Ground Floor) to A207 (2nd Floor)
  await page.evaluate(() => {
    appState.startRoomId = 'N-001';
    appState.destRoomId = 'A207';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_multifloor_route_g_to_f2.png' });
  console.log('Saved scratch/verified_multifloor_route_g_to_f2.png');

  // Switch to Floor 2 to see the 2nd leg of the multi-floor route
  await page.evaluate(() => {
    switchFloor(2);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/verified_multifloor_route_f2_leg.png' });
  console.log('Saved scratch/verified_multifloor_route_f2_leg.png');

  await browser.close();
  console.log('Verification finished successfully!');
})();
