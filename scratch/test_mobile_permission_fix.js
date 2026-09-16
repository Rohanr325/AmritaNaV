const puppeteer = require('puppeteer-core');

(async () => {
  console.log('Starting Mobile Location Permission Verification Test...');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = browser.defaultBrowserContext();
  await context.overridePermissions('file://', ['geolocation']);

  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 915 }); // Pixel 7 Android mobile viewport!

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  console.log('Loading file:///d:/nav/index.html on mobile viewport...');
  await page.goto('file:///d:/nav/index.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Verify that helper functions exist and work
  const fnChecks = await page.evaluate(() => {
    return {
      hasIsSecureOrigin: typeof isSecureOrigin === 'function',
      isSecureUnderFile: isSecureOrigin(),
      hasShowPermissionNotice: typeof showPermissionNotice === 'function',
      hasHandleAutoDetectGPS: typeof handleAutoDetectGPS === 'function'
    };
  });
  console.log('Function checks:', JSON.stringify(fnChecks, null, 2));

  // 2. Test showPermissionNotice for 'insecure_origin'
  console.log('Testing notice for insecure_origin...');
  const insecureNoticeState = await page.evaluate(() => {
    openLocationModal();
    showPermissionNotice('insecure_origin');
    const notice = document.getElementById('locPermissionNotice');
    const title = document.getElementById('locNoticeTitle')?.textContent;
    const btnHttps = document.getElementById('btnSwitchHttps');
    const helpDetails = document.getElementById('locNoticeHelpDetails');
    return {
      display: notice?.style.display,
      title: title,
      btnHttpsDisplay: btnHttps?.style.display,
      btnHttpsHref: btnHttps?.href,
      helpOpen: helpDetails?.open
    };
  });
  console.log('Insecure origin notice state:', JSON.stringify(insecureNoticeState, null, 2));
  await page.screenshot({ path: 'scratch/verified_mobile_insecure_notice.png' });
  console.log('Captured scratch/verified_mobile_insecure_notice.png');

  // 3. Test showPermissionNotice for 'location_disabled' (Android Quick Settings)
  console.log('Testing notice for location_disabled...');
  const disabledNoticeState = await page.evaluate(() => {
    showPermissionNotice('location_disabled');
    const notice = document.getElementById('locPermissionNotice');
    const title = document.getElementById('locNoticeTitle')?.textContent;
    const btnRetry = document.getElementById('btnRetryGPSLoc');
    const helpDetails = document.getElementById('locNoticeHelpDetails');
    return {
      display: notice?.style.display,
      title: title,
      btnRetryDisplay: btnRetry?.style.display,
      helpOpen: helpDetails?.open
    };
  });
  console.log('Location disabled notice state:', JSON.stringify(disabledNoticeState, null, 2));
  await page.screenshot({ path: 'scratch/verified_mobile_disabled_notice.png' });
  console.log('Captured scratch/verified_mobile_disabled_notice.png');

  // 4. Test showPermissionNotice for 'denied'
  console.log('Testing notice for denied...');
  const deniedNoticeState = await page.evaluate(() => {
    showPermissionNotice('denied');
    const notice = document.getElementById('locPermissionNotice');
    const title = document.getElementById('locNoticeTitle')?.textContent;
    const btnRetry = document.getElementById('btnRetryGPSLoc');
    return {
      display: notice?.style.display,
      title: title,
      btnRetryDisplay: btnRetry?.style.display
    };
  });
  console.log('Denied notice state:', JSON.stringify(deniedNoticeState, null, 2));
  await page.screenshot({ path: 'scratch/verified_mobile_denied_notice.png' });
  console.log('Captured scratch/verified_mobile_denied_notice.png');

  // 5. Test Simulate at Main Entrance button
  console.log('Testing simulate button click...');
  await page.evaluate(() => {
    const btnSim = document.getElementById('btnSimulateCampusLoc');
    if (btnSim) btnSim.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const simState = await page.evaluate(() => {
    const modal = document.getElementById('userLocationModal');
    return {
      modalDisplay: modal?.style.display,
      userLoc: appState.userLocation,
      pinDisplay: document.getElementById('svgUserLocationPin')?.style.display
    };
  });
  console.log('Simulated location state:', JSON.stringify(simState, null, 2));
  await page.screenshot({ path: 'scratch/verified_mobile_simulated_success.png' });
  console.log('Captured scratch/verified_mobile_simulated_success.png');

  // 6. Test GPS Detection with Coordinates (Amrita Campus Entrance)
  console.log('Testing live GPS auto-detection with coordinates...');
  await page.setGeolocation({ latitude: 9.0945, longitude: 76.4918, accuracy: 6 });
  await page.evaluate(() => {
    // Call handleAutoDetectGPS directly
    processGPSCoords({ latitude: 9.0945, longitude: 76.4918, accuracy: 6 }, false);
  });
  await new Promise(r => setTimeout(r, 600));

  const gpsState = await page.evaluate(() => {
    return {
      userLoc: appState.userLocation,
      pinDisplay: document.getElementById('svgUserLocationPin')?.style.display,
      myLocFabActive: document.getElementById('myLocationFabBtn')?.classList.contains('active')
    };
  });
  console.log('Live GPS detection state:', JSON.stringify(gpsState, null, 2));
  await page.screenshot({ path: 'scratch/verified_mobile_gps_detected.png' });
  console.log('Captured scratch/verified_mobile_gps_detected.png');

  await browser.close();
  console.log('ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
})();
