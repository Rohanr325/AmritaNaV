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

  // Hide sidebar completely for pristine architectural map screenshot
  await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    if (sb) sb.style.display = 'none';
    const tg = document.getElementById('sidebarToggleBtn');
    if (tg) tg.style.display = 'none';
  });

  // 1. Zoom into full Admin block (x: 100 to 620, y: 620 to 900)
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '140 620 450 260');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const p1 = path.join(__dirname, 'admin_block_clean_full.png');
  await page.screenshot({ path: p1 });
  console.log('Saved admin_block_clean_full.png');

  // 2. With routing graph overlay enabled
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'block';
  });
  await new Promise(r => setTimeout(r, 400));
  const p2 = path.join(__dirname, 'admin_block_graph_full.png');
  await page.screenshot({ path: p2 });
  console.log('Saved admin_block_graph_full.png');

  // 3. Route from A-006 to A-001 across the new pathway
  await page.evaluate(() => {
    calculateAndRenderRoute('A-006', 'A-001');
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '140 620 450 260');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const p3 = path.join(__dirname, 'route_new_pathway_a006_to_a001.png');
  await page.screenshot({ path: p3 });
  console.log('Saved route_new_pathway_a006_to_a001.png');

  // 4. Full building overview with graph
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '0 0 723 1024');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  const p4 = path.join(__dirname, 'full_building_overview_graph.png');
  await page.screenshot({ path: p4 });
  console.log('Saved full_building_overview_graph.png');

  await browser.close();

  // Copy all to brain
  const brainDir = 'C:/Users/rohan/.gemini/antigravity-ide/brain/e5cf4884-bf5e-4421-b14e-7fc139fcbfff';
  for (const f of ['admin_block_clean_full.png', 'admin_block_graph_full.png', 'route_new_pathway_a006_to_a001.png', 'full_building_overview_graph.png']) {
    fs.copyFileSync(path.join(__dirname, f), path.join(brainDir, f));
    console.log('Copied to brain:', f);
  }
  console.log('Finished capturing all views!');
})();
