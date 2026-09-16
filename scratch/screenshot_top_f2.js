const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 800 });

  await page.goto('file:///d:/nav/index.html', { waitUntil: 'load' });

  // Hide sidebar
  await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    if (sb) sb.style.display = 'none';
    const tg = document.getElementById('sidebarToggleBtn');
    if (tg) tg.style.display = 'none';
    switchFloor(2);
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '280 135 180 230');
  });

  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/user_area_before.png' });
  console.log('Saved scratch/user_area_before.png');

  await browser.close();
})();
