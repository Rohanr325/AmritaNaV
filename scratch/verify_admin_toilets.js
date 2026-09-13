const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 950 });

  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  // Hide sidebar for clean map view
  await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    if (sb) sb.style.display = 'none';
    const tg = document.getElementById('sidebarToggleBtn');
    if (tg) tg.style.display = 'none';
  });

  // 1. Clean view of Admin block (x: 130 to 620, y: 560 to 860)
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '140 570 460 290');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const p1 = path.join(__dirname, 'admin_toilets_clean.png');
  await page.screenshot({ path: p1 });
  console.log('Saved admin_toilets_clean.png');

  // 2. View with routing graph overlay enabled
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'block';
  });
  await new Promise(r => setTimeout(r, 400));
  const p2 = path.join(__dirname, 'admin_toilets_graph.png');
  await page.screenshot({ path: p2 });
  console.log('Saved admin_toilets_graph.png');

  // 3. Route test: Boys Restroom to Girls Restroom
  await page.evaluate(() => {
    calculateAndRenderRoute('TOILET-BOYS-ADMIN', 'TOILET-GIRLS-ADMIN');
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '140 570 460 290');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const p3 = path.join(__dirname, 'route_boys_to_girls_admin.png');
  await page.screenshot({ path: p3 });
  console.log('Saved route_boys_to_girls_admin.png');

  // 4. Route test: N-001 to A-006 via white line pathway
  await page.evaluate(() => {
    calculateAndRenderRoute('N-001', 'A-006');
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '140 570 460 290');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const p4 = path.join(__dirname, 'route_n001_to_a006.png');
  await page.screenshot({ path: p4 });
  console.log('Saved route_n001_to_a006.png');

  // 5. Full overview with graph
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '0 0 723 1024');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const p5 = path.join(__dirname, 'full_building_overview_toilets.png');
  await page.screenshot({ path: p5 });
  console.log('Saved full_building_overview_toilets.png');

  await browser.close();

  // Copy all to brain
  const brainDir = 'C:/Users/rohan/.gemini/antigravity-ide/brain/e5cf4884-bf5e-4421-b14e-7fc139fcbfff';
  for (const f of ['admin_toilets_clean.png', 'admin_toilets_graph.png', 'route_boys_to_girls_admin.png', 'route_n001_to_a006.png', 'full_building_overview_toilets.png']) {
    fs.copyFileSync(path.join(__dirname, f), path.join(brainDir, f));
    console.log('Copied to brain:', f);
  }
  console.log('Finished capturing all views!');
})();
