// Rose Laboratories — live catalogue loader
// -----------------------------------------------------------------------
// products-data.js (loaded just before this file) defines PRODUCTS and
// CATEGORIES as a static, built-in seed/fallback catalogue, so the page
// always has something to show immediately and still works if the admin
// backend is offline.
//
// This script then asks the admin backend's API for the live catalogue
// (whatever is currently in the admin panel) and — if that succeeds —
// replaces the contents of PRODUCTS/CATEGORIES in place (they're `const`
// arrays, so we mutate them rather than reassign) and fires a
// "rose:products-updated" event so products-app.js can re-render with
// the live data. If the API call fails for any reason (backend not
// running, offline, etc.) the page silently keeps showing the built-in
// seed catalogue — nothing breaks.
(function () {
  if (typeof PRODUCTS === 'undefined' || typeof CATEGORIES === 'undefined') return;

  function replaceArrayContents(arr, next) {
    arr.length = 0;
    next.forEach(function (item) { arr.push(item); });
  }

  Promise.all([
    fetch('/api/categories').then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('categories ' + r.status)); }),
    fetch('/api/products').then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('products ' + r.status)); })
  ])
    .then(function (results) {
      var liveCategories = results[0];
      var liveProducts = results[1];
      if (!Array.isArray(liveCategories) || !Array.isArray(liveProducts) || liveCategories.length === 0 || liveProducts.length === 0) {
        return; // keep the static fallback rather than show an empty catalogue
      }
      replaceArrayContents(CATEGORIES, liveCategories);
      replaceArrayContents(PRODUCTS, liveProducts);
      window.dispatchEvent(new Event('rose:products-updated'));
    })
    .catch(function () {
      // Admin backend not reachable from here — the static seed catalogue
      // from products-data.js is already on screen, so there's nothing
      // more to do.
    });
})();
