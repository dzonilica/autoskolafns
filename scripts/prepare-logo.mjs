import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// logo.png is black and white on transparency, so its white parts disappear on the light site.
// The site version keeps black as ink and turns white into the orange accent from style.css.
const ink = [28, 26, 24];
const orange = [232, 93, 16];
const paper = '#fbfaf8';

await mkdir('public/brand', { recursive: true });
const { data, info } = await sharp('logo.png').trim().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const light = (data[i] + data[i + 1] + data[i + 2]) / 765;
  for (let c = 0; c < 3; c++) data[i + c] = Math.round(ink[c] + (orange[c] - ink[c]) * light);
}
const mark = () => sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });

const logo = await mark().resize({ height: 320 }).webp({ nearLossless: true, quality: 70, effort: 6 }).toFile('public/brand/fns-logo.webp');
console.log('public/brand/fns-logo.webp', `${logo.width}x${logo.height}`, `${logo.size} B`);
await mark().resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('public/favicon.png');
const touchMark = await mark().resize(136, 136, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: paper } }).composite([{ input: touchMark }]).png().toFile('public/apple-touch-icon.png');
console.log('public/favicon.png', 'public/apple-touch-icon.png');
