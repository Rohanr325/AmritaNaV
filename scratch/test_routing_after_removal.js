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

  await page.goto('file:///d:/nav/test_index_ext.html', { waitUntil: 'load' });

  // Test 1: Route N211C to S212B on Floor 2
  const routeResult = await page.evaluate(() => {
    switchFloor(2);
    // Find path from N211C to S212B
    const res = findRoute('N211C', 'S212B');
    return {
      success: !!res,
      totalDist: res ? res.totalDist : null,
      steps: res ? res.steps.map(s => s.instruction) : []
    };
  });

  console.log('Test 1 (N211C -> S212B):', JSON.stringify(routeResult, null, 2));

  // Render this route and take screenshot
  await page.evaluate(() => {
    appState.startRoomId = 'N211C';
    appState.destRoomId = 'S212B';
    calculateAndRenderRoute();
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '280 135 180 230');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/verified_route_n211c_to_s212b.png' });
  console.log('Saved scratch/verified_route_n211c_to_s212b.png');

  // Test 2: Multi-floor route from Ground Floor (N-018) to Floor 2 (N211C)
  const multiFloorResult = await page.evaluate(() => {
    const res = findRoute('N-018', 'N211C');
    return {
      success: !!res,
      totalDist: res ? res.totalDist : null,
      staircase: res && res.staircase ? res.staircase.name : null,
      steps: res ? res.steps.map(s => s.instruction) : []
    };
  });

  console.log('Test 2 (N-018 -> N211C):', JSON.stringify(multiFloorResult, null, 2));

  await browser.close();
})();
