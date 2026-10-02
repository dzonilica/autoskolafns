import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.TEST_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const results = [];
const errors = [];
const failures = [];
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
const check = (name, value) => { assert.ok(value, name); results.push(name); };
const routes = [['o-nama', 'O nama'], ['cenovnik', 'Cenovnik'], ['kontakt', 'Kontakt']];
await mkdir('artifacts', { recursive: true });
try {
  for (const [slug, title] of routes) {
    await page.goto(`${base}/${slug}/`, { waitUntil: 'networkidle' });
    check(`${title}: direct route and unique heading`, await page.locator('h1').count() === 1);
    check(`${title}: static page title`, (await page.title()).startsWith(title));
    check(`${title}: active desktop link`, await page.locator('.desktop-nav [aria-current="page"]').innerText() === title);
    check(`${title}: correct breadcrumb`, await page.locator('.breadcrumb [aria-current="page"]').innerText() === title);
    check(`${title}: no desktop overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    for (const section of await page.locator('main section').all()) await section.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `artifacts/${slug}-desktop.png` });
    await page.screenshot({ path: `artifacts/${slug}-desktop-full.png`, fullPage: true });
    await page.reload({ waitUntil: 'networkidle' });
    check(`${title}: reload preserves page`, (await page.title()).startsWith(title));
    for (const width of [320, 390, 768, 1024]) {
      await page.setViewportSize({ width, height: 844 });
      // Wait for the resized viewport's layout and Motion measurements to settle.
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      check(`${title}: no overflow at ${width}px`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      if (width === 390) {
        for (const section of await page.locator('main section').all()) await section.scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: `artifacts/${slug}-mobile.png`, fullPage: true });
        await page.getByRole('button', { name: 'Otvori meni' }).click();
        check(`${title}: active mobile link`, await page.locator('.mobile-nav [aria-current="page"]').innerText() === title);
        await page.keyboard.press('Escape');
        check(`${title}: Escape restores menu focus`, await page.getByRole('button', { name: 'Otvori meni' }).evaluate(el => el === document.activeElement));
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  await page.goto(`${base}/cenovnik/`, { waitUntil: 'networkidle' });
  const totals = async () => (await page.locator('.package-total dd').allInnerTexts()).join('|');
  check('Pricing defaults to B', await page.getByRole('radio', { name: 'B kategorija', exact: true }).isChecked());
  check('Unit prices are listed', (await page.locator('.unit-grid dd strong').allInnerTexts()).join('|') === '500|2.000|6.000');
  check('B package totals are calculated', await totals() === '106.000 din|79.500 din|69.500 din|66.000 din|98.500 din|56.000 din');
  await page.locator('.category-tabs label').filter({ hasText: /^A$/ }).click();
  check('A tab updates packages and details', await totals() === '106.000 din|46.000 din|34.000 din|20.000 din|89.500 din' && await page.locator('#category-detail-title').innerText() === 'Svi motocikli — bez ograničenja');
  await page.getByRole('link', { name: 'Upiši se: A kategorija, Poseduje B' }).click();
  await page.waitForURL('**/kontakt/?kategorija=A&paket=4#upit');
  check('Pricing selection reaches contact', await page.locator('input[name="category"][value="A"]').isChecked());
  check('Chosen package is prefilled', (await page.locator('textarea').inputValue()).includes('Poseduje B (ukupno 89.500 din)'));
  check('Inquiry focuses name field', await page.locator('input[name="name"]').evaluate(el => el === document.activeElement));
  await page.getByRole('button', { name: 'Pripremi upit' }).click();
  check('Empty form is rejected', await page.getByRole('status').count() === 0 && !await page.locator('form').evaluate(el => el.checkValidity()));
  await page.getByLabel('Ime i prezime', { exact: true }).fill('Test upita');
  await page.getByLabel('E-mail', { exact: true }).fill('test@example.com');
  await page.getByRole('button', { name: 'Pripremi upit' }).click();
  let mailto = decodeURIComponent(await page.getByRole('link', { name: 'Otvori e-mail aplikaciju' }).getAttribute('href'));
  check('Prepared inquiry has recipient, category and package', mailto.startsWith('mailto:autoskolafns@gmail.com?') && mailto.includes('A kategoriju') && mailto.includes('89.500 din'));
  await page.getByText('B kategorija', { exact: true }).click();
  check('Category change clears old draft', await page.getByRole('status').count() === 0);
  await page.getByRole('button', { name: 'Pripremi upit' }).click();
  mailto = decodeURIComponent(await page.getByRole('link', { name: 'Otvori e-mail aplikaciju' }).getAttribute('href'));
  check('Changed category is used in draft', mailto.includes('B kategoriju'));
  check('Map waits for user activation', await page.locator('iframe').count() === 0);
  await page.route('https://www.google.com/maps?**', route => route.fulfill({ body: '<html lang="sr"><title>Test mape</title></html>', contentType: 'text/html' }));
  await page.getByRole('button', { name: 'Prikaži mapu' }).click();
  check('Map activation mounts correct location', (await page.locator('iframe').getAttribute('src')).includes('Kosovska+30+Novi+Sad'));
  await page.goto(`${base}/cenovnik/?kategorija=A`, { waitUntil: 'networkidle' });
  check('Pricing deep link preserves A', await page.locator('#category-detail-title').innerText() === 'Svi motocikli — bez ograničenja');
  await page.locator('.category-tabs input[value="A"]').focus();
  await page.keyboard.press('ArrowLeft');
  check('Category selector works with keyboard', await page.locator('#category-detail-title').innerText() === 'Srednji motocikli' && await page.locator('.package-card').count() === 4);
  await page.getByText('Da li mogu da platim na rate?', { exact: true }).click();
  check('Pricing FAQ expands', await page.locator('details[open]').count() === 1);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Otvori meni' }).click();
  await page.locator('.mobile-nav').getByRole('link', { name: 'O nama', exact: true }).click();
  await page.waitForURL('**/o-nama/');
  check('Mobile page navigation works', await page.locator('.mobile-nav').count() === 0 && (await page.title()).startsWith('O nama'));
  await page.goBack({ waitUntil: 'networkidle' });
  check('Browser back returns to pricing', (await page.title()).startsWith('Cenovnik'));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator('.desktop-nav').getByRole('link', { name: 'Obuka', exact: true }).click();
  await page.waitForURL(`${base}/#obuka`);
  check('Cross-page home anchor works', await page.locator('#obuka').isVisible());
  check('No runtime errors on new pages', errors.length === 0);
  check('No local resource failures', failures.length === 0);
  await writeFile('artifacts/pages-check-results.json', JSON.stringify({ results, errors, failures }, null, 2));
  console.log(JSON.stringify({ passed: results.length, results, errors, failures }, null, 2));
} finally { await browser.close(); }
