const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
    
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 10000 });
    
    const content = await page.content();
    if (content.includes('id="root"></div>') && !content.includes('VoluTB')) {
      console.log('App is mounted but empty (white screen). Check BROWSER ERROR above.');
    } else {
      console.log('App rendered successfully.');
    }
    
    await browser.close();
  } catch (e) {
    console.error('SCRIPT ERROR:', e);
  }
})();
