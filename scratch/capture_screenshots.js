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

  // Hide sidebar for clean view
  await page.evaluate(() => {
    const sb = document.getElementById('navSidebar');
    if (sb) sb.style.display = 'none';
    const tg = document.getElementById('sidebarToggleBtn');
    if (tg) tg.style.display = 'none';
  });

  const brainDir = 'C:/Users/rohan/.gemini/antigravity-ide/brain/e5cf4884-bf5e-4421-b14e-7fc139fcbfff';

  // 1. Zoomed into Acharya Hall and the new pathway on the white line
  await page.evaluate(() => {
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '420 560 220 250');
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(brainDir, 'acharya_white_pathway_clean.png') });
  console.log('Saved acharya_white_pathway_clean.png');

  // 2. View with routing graph overlay
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'block';
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(brainDir, 'acharya_white_pathway_graph.png') });
  console.log('Saved acharya_white_pathway_graph.png');

  // 3. Route test: S-004A through new Acharya pathway to WC-GIRLS
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'none';

    appState.startRoomId = 'S-004A';
    appState.destRoomId = 'TOILET-GIRLS-ADMIN';
    calculateAndRenderRoute();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(brainDir, 'route_acharya_pathway_animated.png') });
  console.log('Saved route_acharya_pathway_animated.png');

  // 4. Admin Block full view (both Amritheswari & Acharya pathways visible, clean layout)
  await page.evaluate(() => {
    clearRoute();
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '140 560 480 320');
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(brainDir, 'admin_both_pathways_clean.png') });
  console.log('Saved admin_both_pathways_clean.png');

  // 5. Full building view with graph
  await page.evaluate(() => {
    const g = document.getElementById('layerRoutingGraph');
    if (g) g.style.display = 'block';
    const svg = document.getElementById('campusMapSvg');
    if (svg) {
      svg.setAttribute('viewBox', '0 0 723 1024');
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(brainDir, 'full_building_overview_all_clear.png') });
  console.log('Saved full_building_overview_all_clear.png');

  await browser.close();
  console.log('All screenshots captured successfully!');
})();
