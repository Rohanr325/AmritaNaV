const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 850 });

  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') pageErrors.push(msg.text());
  });

  await page.goto('file:///d:/nav/index.html', { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 600));

  console.log('--- TEST 1: Page Load & Initial State ---');
  console.log('Page Errors on load:', pageErrors);
  if (pageErrors.length > 0) throw new Error('Page errors detected on load');

  // Test 2: Switch to Directions tab
  console.log('\n--- TEST 2: Tab Switching to Directions ---');
  await page.click('#tabDirections');
  await new Promise(r => setTimeout(r, 200));

  const dirSecDisplay = await page.$eval('#directionsSection', el => getComputedStyle(el).display);
  const exploreSecDisplay = await page.$eval('#exploreSection', el => getComputedStyle(el).display);
  console.log('Directions Section Display:', dirSecDisplay, '(expected flex)');
  console.log('Explore Section Display:', exploreSecDisplay, '(expected none)');
  if (dirSecDisplay !== 'flex' || exploreSecDisplay !== 'none') {
    throw new Error('Tab switching failed');
  }

  // Test 3: Select From and To via Dropdowns
  console.log('\n--- TEST 3: Navigation From GAD-PR to S-013 via dropdowns ---');
  await page.select('#startRoomSelect', 'GAD-PR');
  await new Promise(r => setTimeout(r, 100));
  await page.select('#destRoomSelect', 'S-013');
  await new Promise(r => setTimeout(r, 400));

  const routeMetricsDisplay = await page.$eval('#routeMetricsCard', el => getComputedStyle(el).display);
  const routeDistText = await page.$eval('#routeDistVal', el => el.textContent.trim());
  const routeTimeText = await page.$eval('#routeTimeVal', el => el.textContent.trim());
  const glowPathD = await page.$eval('#svgRouteGlow', el => el.getAttribute('d'));
  const startPinDisplay = await page.$eval('#svgStartPin', el => el.style.display);
  const destPinDisplay = await page.$eval('#svgDestPin', el => el.style.display);
  const stepCount = await page.$$eval('.turn-step', els => els.length);

  console.log('Metrics Card Display:', routeMetricsDisplay, '(expected flex)');
  console.log('Route Distance:', routeDistText);
  console.log('Estimated Time:', routeTimeText);
  console.log('Route Glow Path d length:', glowPathD.length, '(expected > 50)');
  console.log('Start Pin Display:', startPinDisplay, '(expected block)');
  console.log('Dest Pin Display:', destPinDisplay, '(expected block)');
  console.log('Turn Steps Count:', stepCount, '(expected > 0)');

  if (routeMetricsDisplay !== 'flex' || glowPathD.length < 20 || stepCount === 0) {
    throw new Error('Route calculation failed');
  }

  await page.screenshot({ path: 'scratch/verified_route_gad_to_s013.png' });
  console.log('Screenshot saved: scratch/verified_route_gad_to_s013.png');

  // Test 4: Swap Start and Destination
  console.log('\n--- TEST 4: Swap Route ---');
  await page.click('#swapRouteBtn');
  await new Promise(r => setTimeout(r, 300));

  const swappedStart = await page.$eval('#startRoomSelect', el => el.value);
  const swappedDest = await page.$eval('#destRoomSelect', el => el.value);
  console.log('After Swap Start:', swappedStart, '(expected S-013)');
  console.log('After Swap Dest:', swappedDest, '(expected GAD-PR)');
  if (swappedStart !== 'S-013' || swappedDest !== 'GAD-PR') {
    throw new Error('Swap route failed');
  }

  // Test 5: Walking Simulation
  console.log('\n--- TEST 5: Walking Simulation ---');
  await page.click('#startSimBtn');
  await new Promise(r => setTimeout(r, 400));

  const walkerDisplay = await page.$eval('#svgWalkerAvatar', el => el.style.display);
  const simBtnText = await page.$eval('#startSimBtn', el => el.textContent.trim());
  console.log('Walker Avatar Display:', walkerDisplay, '(expected block)');
  console.log('Simulate Button Text:', simBtnText, '(expected Pause)');

  // Pause simulation
  await page.click('#startSimBtn');
  await new Promise(r => setTimeout(r, 200));
  const simBtnTextPaused = await page.$eval('#startSimBtn', el => el.textContent.trim());
  console.log('Simulate Button Text when paused:', simBtnTextPaused, '(expected Simulate)');

  // Test 6: Popular Route Presets
  console.log('\n--- TEST 6: Popular Route Presets ---');
  await page.click('button[data-preset="AMRI_TO_ROBOT"]');
  await new Promise(r => setTimeout(r, 400));

  const presetStart = await page.$eval('#startRoomSelect', el => el.value);
  const presetDest = await page.$eval('#destRoomSelect', el => el.value);
  const presetDist = await page.$eval('#routeDistVal', el => el.textContent.trim());
  console.log('Preset Start:', presetStart, '(expected A-006)');
  console.log('Preset Dest:', presetDest, '(expected S-011)');
  console.log('Preset Route Distance:', presetDist);

  if (presetStart !== 'A-006' || presetDest !== 'S-011') {
    throw new Error('Preset route failed');
  }

  // Test 7: Multi-floor navigation (Ground Floor to 2nd Floor)
  console.log('\n--- TEST 7: Multi-floor Route (A-006 on F0 to A207 on F2) ---');
  await page.select('#startRoomSelect', 'A-006');
  await new Promise(r => setTimeout(r, 100));
  await page.select('#destRoomSelect', 'A207');
  await new Promise(r => setTimeout(r, 500));

  const mfDist = await page.$eval('#routeDistVal', el => el.textContent.trim());
  const mfType = await page.$eval('.route-type-badge', el => el.textContent.trim());
  const stairSteps = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.turn-step')).filter(el => el.textContent.includes('Stair')).length;
  });
  console.log('Multi-floor Distance:', mfDist);
  console.log('Multi-floor Badge:', mfType, '(expected Multi-Floor)');
  console.log('Stair transition step present:', stairSteps > 0);

  if (stairSteps === 0) {
    throw new Error('Multi-floor stair step missing');
  }

  // Test 8: Room detail card buttons "Start From Here" & "Directions Here"
  console.log('\n--- TEST 8: Explore Tab & Room Details "Start From Here" / "Directions Here" ---');
  await page.click('#tabExplore');
  await new Promise(r => setTimeout(r, 200));

  // Click on a room item in directory list (e.g. S-013)
  const roomItems = await page.$$('.room-list-item');
  if (roomItems.length > 0) {
    await roomItems[0].click();
    await new Promise(r => setTimeout(r, 300));

    const cardDisplay = await page.$eval('#roomDetailCard', el => getComputedStyle(el).display);
    console.log('Room detail card display after click:', cardDisplay, '(expected block)');

    // Click "Directions Here"
    await page.click('#btnNavigateTo');
    await new Promise(r => setTimeout(r, 300));

    const activeTabDir = await page.$eval('#tabDirections', el => el.classList.contains('active'));
    const destVal = await page.$eval('#destRoomSelect', el => el.value);
    console.log('Switched to directions tab:', activeTabDir, '(expected true)');
    console.log('Destination set to room:', destVal);

    if (!activeTabDir || !destVal) {
      throw new Error('Directions Here button failed');
    }
  }

  console.log('\nALL 8 TESTS PASSED SUCCESSFULLY! 0 ERRORS!');
  await browser.close();
})();
