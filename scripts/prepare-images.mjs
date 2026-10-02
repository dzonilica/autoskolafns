import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

await mkdir('public/images', { recursive: true });
await mkdir('assets/generated', { recursive: true });
const sources = {
  hero: 'assets/generated/fns-hero.png',
  'cas-voznje': 'autoskola-slike/02-cas-voznje.png',
  ucionica: 'autoskola-slike/03-teorijska-nastava.png',
  prostor: 'assets/img/ucionica-racunari.jpg',
  poligon: 'autoskola-slike/04-poligon.png',
  motocikl: 'autoskola-slike/05-obuka-motocikl.png',
};
for (const [name, source] of Object.entries(sources)) {
  for (const width of [800, 1600]) {
    const dest = path.join('public/images', `${name}-${width}.webp`);
    await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 84 }).toFile(dest);
    console.log(dest);
  }
}
