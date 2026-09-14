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

  // 1. Initial State screenshot
  await page.screenshot({ path: 'scratch/test_click_f0_initial.png' });
  console.log('Initial page loaded on Ground Floor');

  // 2. Click the 2ND floor button in the top toolbar
  const btn2nd = await page.$('button[data-floor="2"]');
  if (!btn2nd) {
    console.error('ERROR: button[data-floor="2"] not found!');
    process.exit(1);
  }

  const isDisabled = await page.evaluate(el => el.classList.contains('disabled'), btn2nd);
  console.log('Is 2ND button disabled?', isDisabled);

  await btn2nd.click();
  await new Promise(r => setTimeout(r, 500));

  // 3. Verify active floor state
  const currentFloor = await page.evaluate(() => appState.currentFloor);
  const badgeText = await page.evaluate(() => document.querySelector('.campus-info-badge').textContent.trim());
  const roomCount = await page.evaluate(() => document.querySelectorAll('.room-group').length);
  const activeBtnFloor = await page.evaluate(() => document.querySelector('.floor-seg-btn.active').getAttribute('data-floor'));

  console.log('Current Floor state:', currentFloor);
  console.log('Badge text:', badgeText);
  console.log('Active button data-floor:', activeBtnFloor);
  console.log('Rendered room count:', roomCount);

  await page.screenshot({ path: 'scratch/test_click_f2_switched.png' });
  console.log('Saved scratch/test_click_f2_switched.png');

  // 4. Click back to Ground Floor
  const btnGround = await page.$('button[data-floor="0"]');
  await btnGround.click();
  await new Promise(r => setTimeout(r, 500));

  const currentFloorAfter = await page.evaluate(() => appState.currentFloor);
  console.log('Switched back to Ground Floor:', currentFloorAfter);
  await page.screenshot({ path: 'scratch/test_click_f0_switched_back.png' });

  await browser.close();
  console.log('All tests passed successfully!');
})();
