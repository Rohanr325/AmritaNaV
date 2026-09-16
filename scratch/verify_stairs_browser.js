const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 960 });

  await page.goto('file:///d:/nav/index.html', { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 600));

  // 1. Capture Ground Floor overview
  await page.screenshot({ path: 'scratch/verify_stairs_ground.png' });
  console.log('Saved scratch/verify_stairs_ground.png');

  // Verify that all 4 stairs exist in the DOM on Floor 0
  const stairIds0 = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.stair-group')).map(el => el.id);
  });
  console.log('Floor 0 stair IDs:', stairIds0);

  // 2. Test clicking on South-West Courtyard Stairs to switch to 2nd Floor
  const swStair = await page.$('#stair-stair_sw');
  if (swStair) {
    console.log('Clicking on South-West Courtyard Stairs...');
    await swStair.click();
    await new Promise(r => setTimeout(r, 600));
  } else {
    console.error('Could not find #stair-stair_sw');
  }

  const floorAfterClick = await page.evaluate(() => appState.currentFloor);
  console.log('Current floor after clicking SW stair:', floorAfterClick);
  await page.screenshot({ path: 'scratch/verify_stairs_f2_after_click.png' });
  console.log('Saved scratch/verify_stairs_f2_after_click.png');

  // Verify Floor 2 stairs exist
  const stairIds2 = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.stair-group')).map(el => el.id);
  });
  console.log('Floor 2 stair IDs:', stairIds2);

  // 3. Switch back to Ground Floor and test multi-floor route (e.g. Reception -> N204B)
  await page.evaluate(() => switchFloor(0));
  await new Promise(r => setTimeout(r, 400));

  console.log('Testing Multi-Floor Route: GAD-PR -> N204B...');
  await page.evaluate(() => {
    const startSel = document.getElementById('startRoomSelect');
    const destSel = document.getElementById('destRoomSelect');
    if (startSel) startSel.value = 'GAD-PR';
    if (destSel) destSel.value = 'N204B';
    appState.startRoomId = 'GAD-PR';
    appState.destRoomId = 'N204B';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 600));

  const journeyBarVisible = await page.evaluate(() => {
    const bar = document.getElementById('multiFloorJourneyBar');
    return bar && bar.style.display !== 'none';
  });
  const journeyText = await page.evaluate(() => {
    const el = document.getElementById('journeySummaryText');
    return el ? el.textContent : '';
  });
  const stairName = await page.evaluate(() => {
    const el = document.getElementById('journeyStairName');
    return el ? el.textContent : '';
  });
  console.log('Journey bar visible:', journeyBarVisible);
  console.log('Journey summary:', journeyText);
  console.log('Journey stair chosen:', stairName);

  await page.screenshot({ path: 'scratch/verify_multifloor_route_leg1.png' });
  console.log('Saved scratch/verify_multifloor_route_leg1.png');

  // 4. Click Leg 2 button on Journey bar
  const leg2Btn = await page.$('#journeyLeg2Btn');
  if (leg2Btn) {
    await leg2Btn.click();
    await new Promise(r => setTimeout(r, 600));
  }
  const floorAtLeg2 = await page.evaluate(() => appState.currentFloor);
  console.log('Floor after clicking Leg 2 in Journey bar:', floorAtLeg2);
  await page.screenshot({ path: 'scratch/verify_multifloor_route_leg2.png' });
  console.log('Saved scratch/verify_multifloor_route_leg2.png');

  await browser.close();
  console.log('All browser verification tests completed!');
})();
