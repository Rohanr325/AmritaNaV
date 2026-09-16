const fs = require('fs');
const puppeteer = require('puppeteer-core');

(async () => {
  let html = fs.readFileSync('index.html', 'utf8');
  let testHtml = html.replace('src="script.js"', 'src="scratch/script_test_patio_ext.js"');
  fs.writeFileSync('test_index_ext.html', testHtml, 'utf8');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 800 });
  await page.goto('file:///d:/nav/test_index_ext.html', { waitUntil: 'load' });

  await page.evaluate(() => {
    document.getElementById('navSidebar').style.display = 'none';
    document.getElementById('sidebarToggleBtn').style.display = 'none';
    switchFloor(2);
    document.getElementById('campusMapSvg').setAttribute('viewBox', '280 135 180 230');
  });

  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/user_area_test_patio_ext.png' });
  console.log('Saved scratch/user_area_test_patio_ext.png');
  await browser.close();
})();
