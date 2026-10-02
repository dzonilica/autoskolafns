// Runs inline in <head>. The loader plays once per browser session; later page views skip it.
// Adding .fns-ready lifts the loader and fires fns:ready, which starts the Reveal animations.
(function () {
  var root = document.documentElement;
  try {
    if (sessionStorage.getItem('fns-intro')) { root.classList.add('fns-ready', 'fns-skip'); return; }
  } catch (e) {}
  var minimum = matchMedia('(prefers-reduced-motion: reduce)').matches ? 500 : 1300;
  function ready() {
    if (root.classList.contains('fns-ready')) return;
    root.classList.add('fns-ready');
    window.dispatchEvent(new Event('fns:ready'));
    try { sessionStorage.setItem('fns-intro', '1'); } catch (e) {}
    setTimeout(function () { var loader = document.getElementById('fns-loader'); if (loader) loader.remove(); }, 1200);
  }
  function loaded() { setTimeout(ready, Math.max(0, minimum - performance.now())); }
  if (document.readyState === 'complete') loaded(); else window.addEventListener('load', loaded);
  setTimeout(ready, 6000);
})();
