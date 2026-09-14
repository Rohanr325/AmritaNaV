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

  // Switch to Floor 2
  await page.evaluate(() => {
    switchFloor(2);
  });
  await new Promise(r => setTimeout(r, 400));

  // Reset viewBox to full map
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '50 30 650 860');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/current_f2_full.png' });
  console.log('Saved scratch/current_f2_full.png');

  // Zoom into N204 block
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '80 430 300 160');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/current_f2_n204.png' });
  console.log('Saved scratch/current_f2_n204.png');

  // Zoom into Admin block
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '140 580 460 260');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/current_f2_admin.png' });
  console.log('Saved scratch/current_f2_admin.png');

  await browser.close();
})();
