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

  // Switch to directions tab
  await page.evaluate(() => switchTab('directions'));
  await new Promise(r => setTimeout(r, 400));

  // Test 1: Acharya -> UNESCO preset button
  console.log('Testing Acharya -> UNESCO preset...');
  const achaBtn = await page.$('button[data-preset="ACHA_TO_UNESCO"]');
  if (achaBtn) {
    await achaBtn.click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'scratch/verify_preset_acharya_to_unesco_f0.png' });
    console.log('Saved scratch/verify_preset_acharya_to_unesco_f0.png');

    // Switch to leg 2 via evaluate click
    await page.evaluate(() => {
      const b = document.getElementById('journeyLeg2Btn');
      if (b) b.click();
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: 'scratch/verify_preset_acharya_to_unesco_f2.png' });
    console.log('Saved scratch/verify_preset_acharya_to_unesco_f2.png');
  }

  // Test 2: North Prayer N-020 -> S212B
  console.log('Testing North Prayer -> S212B...');
  await page.evaluate(() => {
    switchFloor(0);
    const startSel = document.getElementById('startRoomSelect');
    const destSel = document.getElementById('destRoomSelect');
    if (startSel) startSel.value = 'N-020';
    if (destSel) destSel.value = 'S212B';
    appState.startRoomId = 'N-020';
    appState.destRoomId = 'S212B';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'scratch/verify_north_stairs_route_f0.png' });
  console.log('Saved scratch/verify_north_stairs_route_f0.png');

  // Switch to Floor 2 leg
  await page.evaluate(() => {
    const b = document.getElementById('journeyLeg2Btn');
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/verify_north_stairs_route_f2.png' });
  console.log('Saved scratch/verify_north_stairs_route_f2.png');

  await browser.close();
  console.log('All preset and North tests finished successfully!');
})();
