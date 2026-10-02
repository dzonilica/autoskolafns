import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 320, height: 844 }, reducedMotion: 'reduce' });
await page.goto(process.env.INSPECT_URL || 'http://127.0.0.1:4173', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'artifacts/mobile-320.png', fullPage: true });
console.log(JSON.stringify(await page.evaluate(() => ({ width:innerWidth, scroll:document.documentElement.scrollWidth, outside:[...document.querySelectorAll('body *')].filter(el => {const b=el.getBoundingClientRect();return b.right > innerWidth + 1 && b.width>0}).map(el=>({tag:el.tagName,class:el.className, text:el.textContent.slice(0,60),right:el.getBoundingClientRect().right,width:el.getBoundingClientRect().width})).slice(0,30) })),null,2));
await browser.close();
