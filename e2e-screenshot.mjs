import { chromium } from '@playwright/test';

const BASE = 'http://localhost:5173';
const DIR = '/tmp/now-screenshots';

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 }, // iPhone 14 Pro Max
    deviceScaleFactor: 2,
    // Grant geolocation (Paris)
    geolocation: { latitude: 48.8566, longitude: 2.3522 },
    permissions: ['geolocation'],
  });
  const page = await context.newPage();

  // Clear localStorage to start fresh
  await page.goto(BASE);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForTimeout(800);

  // 1. Landing screen
  console.log('1. Landing screen');
  await page.screenshot({ path: `${DIR}/1-landing.png` });

  // 2. Click "Entrer" -> Countdown
  console.log('2. Countdown screen');
  await page.click('text=Entrer');
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${DIR}/2-countdown.png` });

  // 3. Press "3" to jump to Action screen (debug panel)
  console.log('3. Action screen');
  await page.keyboard.press('3');
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${DIR}/3-action.png` });

  // 4. Click "Je le fais" -> Participating (timer)
  console.log('4. Participating screen');
  await page.click('text=Je le fais');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${DIR}/4-participating.png` });

  // 5. Wait for timer to finish (5s debug) -> Result
  console.log('5. Result screen (waiting for timer...)');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: `${DIR}/5-result.png` });

  console.log(`\nScreenshots saved to ${DIR}/`);
  await browser.close();
}

run().catch(console.error);
