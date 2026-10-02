import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

const loaderFile = name => readFileSync(new URL(`src/loader/${name}`, import.meta.url), 'utf8');

// Inlines the intro loader into every HTML entry so it shows before the app bundle runs.
function siteLoader() {
  return {
    name: 'fns-site-loader',
    transformIndexHtml: () => [
      { tag: 'style', children: loaderFile('loader.css'), injectTo: 'head' },
      { tag: 'script', children: loaderFile('loader.js'), injectTo: 'head' },
      { tag: 'noscript', children: '<style>.fns-loader{display:none}</style>', injectTo: 'head' },
      { tag: 'div', attrs: { id: 'fns-loader', class: 'fns-loader', 'aria-hidden': 'true' }, children: '<div class="fns-loader-inner"><img src="/brand/fns-logo.webp" alt="" width="355" height="320" fetchpriority="high" /><span class="fns-loader-bar"></span></div>', injectTo: 'body-prepend' },
    ],
  };
}

export default defineConfig({
  plugins: [react(), siteLoader()],
  build: {
    rolldownOptions: {
      input: Object.fromEntries(['index.html', 'o-nama/index.html', 'cenovnik/index.html', 'kontakt/index.html'].map(path => [path, fileURLToPath(new URL(path, import.meta.url))])),
    },
  },
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
});
