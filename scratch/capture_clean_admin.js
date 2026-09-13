const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 950 });

  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  // Collapse sidebar
  const closeBtn = await page.$('#closeSidebarBtn');
  if (closeBtn) {
    await closeBtn.click();
    await new Promise(r => setTimeout(r, 400));
  }

  // 1. Clean view of Admin block without graph
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '130 580 500 320');
    }
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, 'admin_clean_view.png') });
  console.log('Saved admin_clean_view.png');

  // 2. View with graph enabled
  await page.click('#toggleGraphBtn');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, 'admin_with_graph.png') });
  console.log('Saved admin_with_graph.png');

  // 3. Route test: A-006 to A-001 (Auditorium to Auditorium)
  // Re-open sidebar
  const openBtn = await page.$('#sidebarToggleBtn');
  if (openBtn) {
    await openBtn.click();
    await new Promise(r => setTimeout(r, 400));
  }
  await page.click('#tabDirections');
  await new Promise(r => setTimeout(r, 400));

  await page.select('#startRoomSelect', 'A-006');
  await page.select('#destRoomSelect', 'A-001');
  await new Promise(r => setTimeout(r, 800));

  // Collapse sidebar to see route
  const closeBtn2 = await page.$('#closeSidebarBtn');
  if (closeBtn2) {
    await closeBtn2.click();
    await new Promise(r => setTimeout(r, 400));
  }

  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '130 580 500 320');
    }
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, 'route_clean_a006_to_a001.png') });
  console.log('Saved route_clean_a006_to_a001.png');

  await browser.close();
  console.log('Done!');
})();
