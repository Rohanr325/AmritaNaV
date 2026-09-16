const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 800 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  await page.goto('file:///d:/nav/test_index.html', { waitUntil: 'load' });

  // Hide sidebar and switch to Floor 2
  await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    if (sb) sb.style.display = 'none';
    const tg = document.getElementById('sidebarToggleBtn');
    if (tg) tg.style.display = 'none';
    switchFloor(2);
    const svg = document.getElementById('campusMapSvg');
    if (svg) svg.setAttribute('viewBox', '280 135 180 230');
  });

  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/user_area_test_removed.png' });
  console.log('Saved scratch/user_area_test_removed.png');

  // Also toggle graph to see the graph nodes
  await page.evaluate(() => {
    toggleGraph();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'scratch/user_area_test_graph.png' });
  console.log('Saved scratch/user_area_test_graph.png');

  await browser.close();
})();
