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

  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  // Hide sidebar for clean architectural map view
  await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    if (sb) sb.style.display = 'none';
    const tg = document.getElementById('sidebarToggleBtn');
    if (tg) tg.style.display = 'none';
  });

  // 1. Clean view of Admin block
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '140 570 460 290');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'admin_toilets_perfect_clean.png') });
  console.log('Saved admin_toilets_perfect_clean.png');

  // 2. View with routing graph overlay enabled (orthogonal T-junction)
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'block';
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, 'admin_toilets_perfect_graph.png') });
  console.log('Saved admin_toilets_perfect_graph.png');

  // 3. Route test: Boys Restroom to Girls Restroom
  await page.evaluate(() => {
    appState.startRoomId = 'TOILET-BOYS-ADMIN';
    appState.destRoomId = 'TOILET-GIRLS-ADMIN';
    calculateAndRenderRoute();
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '140 570 460 290');
    }
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(__dirname, 'route_boys_to_girls_animated.png') });
  console.log('Saved route_boys_to_girls_animated.png');

  // 4. Route test: N-001 to A-006 via the white line pathway
  await page.evaluate(() => {
    appState.startRoomId = 'N-001';
    appState.destRoomId = 'A-006';
    calculateAndRenderRoute();
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '140 570 460 290');
    }
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(__dirname, 'route_white_pathway_animated.png') });
  console.log('Saved route_white_pathway_animated.png');

  // 5. Full overview with graph
  await page.evaluate(() => {
    clearRoute();
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'block';
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '0 0 723 1024');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, 'full_building_overview_perfect.png') });
  console.log('Saved full_building_overview_perfect.png');

  await browser.close();

  // Copy all to brain
  const brainDir = 'C:/Users/rohan/.gemini/antigravity-ide/brain/e5cf4884-bf5e-4421-b14e-7fc139fcbfff';
  for (const f of ['admin_toilets_perfect_clean.png', 'admin_toilets_perfect_graph.png', 'route_boys_to_girls_animated.png', 'route_white_pathway_animated.png', 'full_building_overview_perfect.png']) {
    fs.copyFileSync(path.join(__dirname, f), path.join(brainDir, f));
    console.log('Copied to brain:', f);
  }
  console.log('Done!');
})();
