const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 900 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  await page.goto('file:///d:/nav/index.html', { waitUntil: 'load' });

  // Switch to Floor 2
  await page.evaluate(() => {
    switchFloor(2);
    document.getElementById('navSidebar').style.display = 'none';
    document.getElementById('sidebarToggleBtn').style.display = 'none';
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '280 135 180 230');
  });
  await new Promise(r => setTimeout(r, 600));

  // Capture user view on Floor 2 (exact crop corresponding to user's uploaded image)
  await page.screenshot({ path: 'scratch/final_verified_user_view.png' });
  console.log('Saved scratch/final_verified_user_view.png');

  // Route N211C -> S212B
  const routeF2 = await page.evaluate(() => {
    appState.startRoomId = 'N211C';
    appState.destRoomId = 'S212B';
    calculateAndRenderRoute();
    const res = findRoute('N211C', 'S212B');
    return {
      success: !!res,
      totalDist: res ? res.totalDist : null,
      steps: res ? res.steps.map(s => s.instruction) : []
    };
  });
  console.log('Floor 2 Route (N211C -> S212B):', JSON.stringify(routeF2, null, 2));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/final_verified_route_f2.png' });
  console.log('Saved scratch/final_verified_route_f2.png');

  // Verify Floor 0 still works
  await page.evaluate(() => {
    clearRoute();
    switchFloor(0);
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '50 30 650 860');
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/final_verified_floor0.png' });
  console.log('Saved scratch/final_verified_floor0.png');

  // Verify multi-floor route from Ground to Floor 2
  const multiFloorRoute = await page.evaluate(() => {
    const res = findRoute('N-005', 'S212B');
    return {
      success: !!res,
      totalDist: res ? res.totalDist : null,
      staircase: res && res.staircase ? res.staircase.name : null
    };
  });
  console.log('Multi-floor Route (N-005 -> S212B):', JSON.stringify(multiFloorRoute, null, 2));

  await browser.close();
  console.log('ALL VERIFICATIONS COMPLETE!');
})();
