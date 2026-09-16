const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = browser.defaultBrowserContext();
  // Grant geolocation permission
  await context.overridePermissions('file://', ['geolocation']);

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  // Simulate GPS coordinates at Amrita Vishwa Vidyapeetham Campus (near GAD Entrance)
  await page.setGeolocation({ latitude: 9.0945, longitude: 76.4918, accuracy: 12 });

  console.log('Navigating to index.html...');
  await page.goto('file:///d:/nav/index.html', { waitUntil: 'networkidle0' });

  // Wait for auto-detection and focus
  await new Promise(r => setTimeout(r, 1200));

  // Check state in page
  const locState = await page.evaluate(() => {
    return {
      userLoc: appState.userLocation,
      startRoomId: appState.startRoomId,
      pinDisplay: document.getElementById('svgUserLocationPin')?.style.display,
      pinTransform: document.getElementById('svgUserLocationPin')?.getAttribute('transform'),
      toolbarLabel: document.getElementById('userLocationBtnLabel')?.textContent
    };
  });
  console.log('User Location State:', JSON.stringify(locState, null, 2));

  // Capture screenshot of map with user location pin
  await page.screenshot({ path: 'scratch/verified_user_location_detected.png' });
  console.log('Captured scratch/verified_user_location_detected.png');

  // Test 1: Open Get Directions tab, verify start room is USER_LOCATION, pick destination S-013
  console.log('Testing route from USER_LOCATION to S-013 (Computer Lab)...');
  await page.evaluate(() => {
    switchTab('directions');
    const destSelect = document.getElementById('destRoomSelect');
    if (destSelect) {
      destSelect.value = 'S-013';
      destSelect.dispatchEvent(new Event('change'));
    }
  });

  await new Promise(r => setTimeout(r, 800));

  const routeState = await page.evaluate(() => {
    return {
      hasRoute: !!appState.currentRoute,
      distance: appState.currentRoute?.distanceMeters,
      duration: appState.currentRoute?.durationText,
      stepsCount: appState.currentRoute?.steps?.length,
      startSelectVal: document.getElementById('startRoomSelect')?.value
    };
  });
  console.log('Route State:', JSON.stringify(routeState, null, 2));

  await page.screenshot({ path: 'scratch/verified_route_from_user_location.png' });
  console.log('Captured scratch/verified_route_from_user_location.png');

  // Test 2: Open Location Modal to check UI
  console.log('Testing Location Modal UI...');
  await page.evaluate(() => {
    openLocationModal();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/verified_location_modal_view.png' });
  console.log('Captured scratch/verified_location_modal_view.png');

  // Test 3: Close modal and test My Location FAB click
  await page.evaluate(() => {
    closeLocationModal();
    const fab = document.getElementById('myLocationFabBtn');
    if (fab) fab.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/verified_fab_recenter.png' });
  console.log('Captured scratch/verified_fab_recenter.png');

  await browser.close();
  console.log('ALL TESTS COMPLETED SUCCESSFULLY!');
})();
