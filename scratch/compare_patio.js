const fs = require('fs');
const puppeteer = require('puppeteer-core');

(async () => {
  let js = fs.readFileSync('script.js', 'utf8');

  function makeModified(patioY, patioH) {
    let m = js;
    // 1. Remove Top Bridge corridor
    m = m.replace(`    <!-- Top Bridge across Atrium -->
    <rect class="corridor-floor" x="346" y="166" width="62" height="9" rx="1" />
    <line class="corridor-centerline" x1="350" y1="170" x2="404" y2="170" />
`, '');
    // 2. Remove building wing bridge
    m = m.replace(`    <rect class="building-wing" x="346" y="166" width="60" height="16" />\n`, '');
    // 3. Remove stairs
    m = m.replace(`      { x: 368, y: 172, w: 14, h: 16, steps: 5, dir: 'h' }, // North Stairs\n`, '');
    // 4. Remove waypoint
    m = m.replace(`  // Top Bridge & Stairs
  wp_f2_north_stair: { id: 'wp_f2_north_stair', x: 374, y: 170, label: 'North Stairs (2nd Fl)' },
`, '');
    // 5. Remove edges
    m = m.replace(`  // Top Bridge
  ['wp_f2_spine_w_top', 'wp_f2_north_stair'],
  ['wp_f2_north_stair', 'wp_f2_spine_e_top'],
`, '');
    // 6. Remove shared stair
    m = m.replace(`,\n  { id: 'stair_north', name: 'North Stairs', f0Node: 'wp_north_exit_hub', f2Node: 'wp_f2_north_stair' }`, '');

    if (patioY && patioH) {
      m = m.replace(
        `<rect class="courtyard-patio" x="352" y="180" width="48" height="216" rx="3" />`,
        `<rect class="courtyard-patio" x="352" y="${patioY}" width="48" height="${patioH}" rx="3" />`
      );
    }
    return m;
  }

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // Test Option A: keep patio at y=180
  fs.writeFileSync('scratch/test_opt_a.js', makeModified(), 'utf8');
  let htmlA = fs.readFileSync('index.html', 'utf8').replace('src="script.js"', 'src="scratch/test_opt_a.js"');
  fs.writeFileSync('test_index_a.html', htmlA, 'utf8');

  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 800 });
  await page.goto('file:///d:/nav/test_index_a.html', { waitUntil: 'load' });
  await page.evaluate(() => {
    document.getElementById('navSidebar').style.display = 'none';
    document.getElementById('sidebarToggleBtn').style.display = 'none';
    switchFloor(2);
    document.getElementById('campusMapSvg').setAttribute('viewBox', '280 135 180 230');
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/test_opt_a.png' });

  // Test Option B: extend patio to y=156 (h = 240)
  fs.writeFileSync('scratch/test_opt_b.js', makeModified(156, 240), 'utf8');
  let htmlB = fs.readFileSync('index.html', 'utf8').replace('src="script.js"', 'src="scratch/test_opt_b.js"');
  fs.writeFileSync('test_index_b.html', htmlB, 'utf8');

  await page.goto('file:///d:/nav/test_index_b.html', { waitUntil: 'load' });
  await page.evaluate(() => {
    document.getElementById('navSidebar').style.display = 'none';
    document.getElementById('sidebarToggleBtn').style.display = 'none';
    switchFloor(2);
    document.getElementById('campusMapSvg').setAttribute('viewBox', '280 135 180 230');
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/test_opt_b.png' });

  await browser.close();
  console.log('Saved test_opt_a.png and test_opt_b.png');
})();
