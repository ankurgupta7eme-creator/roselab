// =====================================================================
// Rose Laboratories — Cart module (DEMO)
// -----------------------------------------------------------------------
// Cart state lives in the browser's localStorage. There is no server, so
// nothing here is shared between devices and nothing is "ordered" for
// real. Wire this to a real backend (and real pricing) before launch —
// see /backend-starter/README.md for a starting point.
// =====================================================================
(function (global) {
  var CART_KEY = 'rl_cart_v1';

  function readCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function writeCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    renderCartBadge();
  }
  function findProduct(id) {
    return (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(function (p) { return p.id === id; }) : null;
  }

  function addToCart(productId, qty) {
    qty = qty || 1;
    var items = readCart();
    var existing = items.find(function (i) { return i.id === productId; });
    if (existing) { existing.qty += qty; } else { items.push({ id: productId, qty: qty }); }
    writeCart(items);
  }
  function removeFromCart(productId) {
    writeCart(readCart().filter(function (i) { return i.id !== productId; }));
  }
  function setQty(productId, qty) {
    var items = readCart();
    var existing = items.find(function (i) { return i.id === productId; });
    if (!existing) return;
    existing.qty = Math.max(1, qty);
    writeCart(items);
  }
  function clearCart() { writeCart([]); }
  function getCartCount() {
    return readCart().reduce(function (sum, i) { return sum + i.qty; }, 0);
  }
  function getCartDetailed() {
    return readCart().map(function (i) {
      var p = findProduct(i.id);
      return p ? Object.assign({}, p, { qty: i.qty }) : null;
    }).filter(Boolean);
  }
  function renderCartBadge() {
    var count = getCartCount();
    document.querySelectorAll('#cartBadge').forEach(function (el) {
      el.textContent = count;
      el.setAttribute('data-empty', count === 0 ? 'true' : 'false');
    });
  }

  document.addEventListener('DOMContentLoaded', renderCartBadge);

  global.RoseCart = {
    add: addToCart,
    remove: removeFromCart,
    setQty: setQty,
    clear: clearCart,
    count: getCartCount,
    items: getCartDetailed,
    renderBadge: renderCartBadge
  };
})(window);
