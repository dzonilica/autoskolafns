import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const url = process.env.TEST_URL || 'http://127.0.0.1:5173';
const results = [];
const check = (name, value) => { assert.ok(value, name); results.push(name); };
try {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('h1').waitFor();
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'artifacts/desktop.png' });
  check('Serbian document language', await page.locator('html').getAttribute('lang') === 'sr-Latn');
  check('Light theme', await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme) === 'light');
  check('Mobile menu toggle hidden on desktop', !await page.getByRole('button', { name: 'Otvori meni' }).isVisible());
  check('No horizontal overflow on desktop', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  const before = await page.locator('.hero-visual img').evaluate(img => getComputedStyle(img).transform);
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
  await page.waitForTimeout(180);
  const after = await page.locator('.hero-visual img').evaluate(img => getComputedStyle(img).transform);
  check('Parallax responds to scroll', before !== after);
  await page.getByRole('button', { name: 'Detalji A kategorije', exact: true }).click();
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  check('Category dialog opens', await page.getByRole('dialog').isVisible());
  await page.keyboard.press('Escape');
  check('Escape closes dialog', !await page.getByRole('dialog').isVisible());
  await page.getByRole('button', { name: 'Detalji A kategorije', exact: true }).click();
  await page.getByRole('button', { name: 'Zanima me A kategorija', exact: true }).click();
  check('Category selection reaches contact form', await page.locator('input[value="A"]').isChecked());
  check('Contact name receives focus', await page.locator('input[name="name"]').evaluate(el => el === document.activeElement));
  await page.locator('input[name="name"]').fill('Provera FNS sajta');
  await page.locator('input[name="email"]').fill('provera@example.com');
  await page.locator('textarea').fill('Provera pripreme upita, bez slanja.');
  await page.getByRole('button', { name: 'Pripremi upit' }).click();
  const mailto = await page.getByRole('link', { name: 'Otvori e-mail aplikaciju', exact: true }).getAttribute('href');
  check('Email draft uses correct recipient and category', mailto.startsWith('mailto:autoskolafns@gmail.com?') && decodeURIComponent(mailto).includes('A kategoriju'));
  await page.locator('input[name="name"]').fill('Provera izmenjenog upita');
  check('Editing invalidates the prepared draft', await page.getByRole('status').count() === 0);
  await page.getByText('Kako izgleda upis u auto školu?', { exact: true }).click();
  check('FAQ opens', await page.locator('details').first().getAttribute('open') !== null);
  for (const section of await page.locator('main section').all()) { await section.scrollIntoViewIfNeeded(); await page.waitForTimeout(150); }
  const broken = await page.locator('img').evaluateAll(imgs => imgs.filter(img => !img.complete || !img.naturalWidth).map(img => img.src));
  check('All photos load', broken.length === 0);
  await page.locator('form').evaluate(form => form.reset());
  await page.getByText('B kategorija', { exact: true }).click();
  await page.locator('details').evaluateAll(items => items.forEach(item => item.open = false));
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'artifacts/desktop-full.png', fullPage: true });
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
  await page.waitForFunction(() => matchMedia('(prefers-reduced-motion: reduce)').matches && getComputedStyle(document.querySelector('.hero-visual img')).transform === 'none');
  check('User-requested light theme remains in dark system mode', await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme) === 'light');
  check('Reduced motion disables parallax', await page.locator('.hero-visual img').evaluate(img => getComputedStyle(img).transform) === 'none');
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(200);
    check(`No horizontal overflow at ${width}px`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    if (width === 390) {
      await page.screenshot({ path: 'artifacts/mobile.png' });
      await page.getByRole('button', { name: 'Otvori meni' }).click();
      check('Mobile menu opens', await page.getByRole('navigation', { name: 'Mobilna navigacija' }).isVisible());
      await page.getByRole('navigation', { name: 'Mobilna navigacija' }).getByRole('link', { name: 'Obuka', exact: true }).click();
      // The menu animates out before it unmounts.
      await page.getByRole('navigation', { name: 'Mobilna navigacija' }).waitFor({ state: 'detached', timeout: 2000 });
      check('Mobile menu closes after navigation', await page.getByRole('navigation', { name: 'Mobilna navigacija' }).count() === 0);
      await page.screenshot({ path: 'artifacts/mobile-full.png', fullPage: true });
    }
  }
  check('No runtime errors', errors.length === 0);
  await writeFile('artifacts/check-results.json', JSON.stringify({ results, errors }, null, 2));
  console.log(JSON.stringify({ passed: results.length, results, errors }, null, 2));
} finally { await browser.close(); }
