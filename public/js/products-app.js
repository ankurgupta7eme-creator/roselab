// Rose Laboratories — products page filtering & search
// -----------------------------------------------------------------------
// v2 — CSS show/hide instead of DOM destroy+rebuild on every search.
//
// ROOT CAUSE OF PREVIOUS SEARCH BUG: render() called grid.innerHTML=''
// on every keystroke. This destroyed all <img> DOM nodes. With
// loading="lazy", the browser's Intersection Observer tracked each node
// individually; destroying the nodes cancelled pending image loads and
// invalidated already-loaded images that had been painted. Rebuilding
// the grid instantly didn't always re-trigger the observer in time,
// leaving images in a broken state.
//
// FIX: render all product cards once into the DOM (with loading="lazy"
// for initial page load performance). On search or tab filter, toggle
// a .card-hidden CSS class on each card instead of clearing innerHTML.
// Images load once, stay in the DOM, and are never unloaded by search.
(function () {
  var grid   = document.getElementById('productGrid');
  var meta   = document.getElementById('resultsMeta');
  var search = document.getElementById('productSearch');
  var tabs   = document.querySelectorAll('.tab');
  var empty  = document.getElementById('emptyState');
  if (!grid) return;

  var activeCat = 'all';
  var params = new URLSearchParams(window.location.search);
  if (params.get('cat')) activeCat = params.get('cat');

  function catMeta(id) {
    return CATEGORIES.find(function (c) { return c.id === id; });
  }

  // Branded fallback packshots by dosage form. When a product has no real
  // photo yet, we show a form-appropriate Rose Laboratories placeholder
  // (syrup bottle, capsule jar, oil bottle, etc.) instead of a bare letter.
  var PLACEHOLDER_BASE = 'assets/products/placeholders/';
  function placeholderFor(p) {
    var t = ((p.name || '') + ' ' + (p.packaging || '')).toLowerCase();
    // Order matters — most specific keywords first.
    if (/drop/.test(t))                                   return PLACEHOLDER_BASE + 'drops.jpg';
    if (/capsule|caps|vati|tablet|\bcap\b/.test(t))       return PLACEHOLDER_BASE + 'capsule.jpg';
    if (/ointment|balm|cream|malham/.test(t))             return PLACEHOLDER_BASE + 'ointment.jpg';
    if (/oil|lotion/.test(t))                             return PLACEHOLDER_BASE + 'oil.jpg';
    if (/churna|powder|manjan|bhasma|chyawanprash|prash/.test(t)) return PLACEHOLDER_BASE + 'churna.jpg';
    if (/arishta|asava|arisht|kwath/.test(t))             return PLACEHOLDER_BASE + 'tonic.jpg';
    if (/syrup|liquid|tonic|\bml\b/.test(t))              return PLACEHOLDER_BASE + 'syrup.jpg';
    return PLACEHOLDER_BASE + 'syrup.jpg';
  }
  function imageFor(p) {
    return p.image || placeholderFor(p);
  }

  // Build a card element for one product. Called ONCE per product.
  function buildCard(p) {
    var cm    = catMeta(p.cat) || { quadrant: '', letter: '?', subtitle: '' };
    var isOtc = (p.cat === 'c1' || p.cat === 'c3');
    var card  = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('data-id',  p.id);
    card.setAttribute('data-cat', p.cat);
    // Store lowercased searchable text on the element so filter() is just
    // a fast string.indexOf() with no object-lookup per keystroke.
    card.setAttribute('data-search',
      ((p.name || '') + ' ' + (p.description || '') + ' ' + (p.composition || '')).toLowerCase()
    );

    var photoHtml = '<div class="photo"><img src="' + imageFor(p) + '" alt="' + p.name + ' pack shot" loading="lazy"></div>';

    var stock = typeof p.stock === 'number' ? p.stock : null;
    var stockHtml = '';
    var outOfStock = false;
    if (stock !== null) {
      if (stock <= 0) { stockHtml = '<span class="stock-badge stock-out">Out of Stock</span>'; outOfStock = true; }
      else if (stock <= 10) { stockHtml = '<span class="stock-badge stock-low">Only ' + stock + ' left</span>'; }
    }

    card.innerHTML =
      photoHtml +
      '<div class="top"><h4>' + p.name + '</h4><span class="pack">' + p.packaging + '</span></div>' +
      (p.pricing ? '<p class="pricing">MRP: \u20b9' + p.pricing.replace(/\/-/g, '') + '</p>' : '') +
      stockHtml +
      '<p class="desc">' + p.description + '</p>' +
      '<div class="cat-tag"><span class="quad-letter ' + cm.quadrant + '" style="width:18px;height:18px;font-size:9px;border-radius:50%;">' + cm.letter + '</span>' + cm.subtitle + '</div>' +
      '<div class="actions">' +
        (isOtc
          ? (outOfStock
              ? '<button class="btn btn-primary btn-sm" disabled>Out of Stock</button>'
              : '<button class="btn btn-primary btn-sm add-to-cart-btn" data-id="' + p.id + '">Add to Cart</button>')
          : '<a class="btn btn-ghost btn-sm" href="b2b.html">Enquire (Institutional)</a>') +
      '</div>' +
      '<button class="quick-view-btn" data-id="' + p.id + '">Quick View</button>';

    // Cart button
    var addBtn = card.querySelector('.add-to-cart-btn');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        if (window.RoseCart) window.RoseCart.add(addBtn.getAttribute('data-id'), 1);
        var orig = addBtn.textContent;
        addBtn.textContent = 'Added \u2713';
        addBtn.classList.add('added-flash');
        setTimeout(function () { addBtn.textContent = orig; addBtn.classList.remove('added-flash'); }, 1200);
      });
    }

    // Quick view button
    var qvBtn = card.querySelector('.quick-view-btn');
    if (qvBtn) {
      qvBtn.addEventListener('click', function () { openQuickView(p.id); });
    }

    return card;
  }

  // --- Initial render: build every card once and insert into the DOM ---
  function buildAllCards() {
    // Clear existing cards (happens on rose:products-updated reload)
    grid.innerHTML = '';
    PRODUCTS.forEach(function (p) {
      grid.appendChild(buildCard(p));
    });
    applyFilter();
  }

  // --- Filter: show/hide cards via CSS class — images are NEVER destroyed ---
  function applyFilter() {
    var q       = (search.value || '').trim().toLowerCase();
    var qTerms  = q ? expandQuery(q).split(' ').filter(Boolean) : [];
    var cards   = grid.querySelectorAll('.product-card');
    var visible = 0;

    cards.forEach(function (card) {
      var inCat    = activeCat === 'all' || card.getAttribute('data-cat') === activeCat;
      var hay      = card.getAttribute('data-search');
      var inSearch = !q || qTerms.some(function (t) { return hay.indexOf(t) > -1; });
      var show     = inCat && inSearch;
      card.classList.toggle('card-hidden', !show);
      if (show) visible++;
    });

    if (visible === 0) {
      empty.style.display = 'block';
    } else {
      empty.style.display = 'none';
    }

    var catLabel = activeCat !== 'all'
      ? (function () { var cm = catMeta(activeCat); return cm ? ' in ' + cm.title : ''; })()
      : ' across all categories';
    meta.textContent = visible + (visible === 1 ? ' formulation' : ' formulations') + catLabel;
  }

  // --- Quick view (unchanged logic, extracted from render) ---
  function frequentlyBoughtWithHtml(p) {
    var others = PRODUCTS.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 3);
    if (others.length === 0) return '';
    var cards = others.map(function (o) {
      return '<div class="fbt-card" data-id="' + o.id + '" style="cursor:pointer; text-align:center; width:100px;">' +
        '<img src="' + imageFor(o) + '" alt="' + o.name + '" style="width:100%; aspect-ratio:1; object-fit:cover; border-radius:8px;">' +
        '<div style="font-size:12px; margin-top:6px; line-height:1.3;">' + o.name + '</div>' +
      '</div>';
    }).join('');
    return '<div style="margin-top:22px; padding-top:18px; border-top:1px solid var(--line,#e5e5e5);">' +
      '<b style="font-size:13px; text-transform:uppercase; letter-spacing:.04em;">Frequently Bought Together</b>' +
      '<div style="display:flex; gap:14px; margin-top:12px; flex-wrap:wrap;">' + cards + '</div>' +
    '</div>';
  }

  function openQuickView(id) {
    var p = PRODUCTS.find(function (x) { return x.id === id; });
    if (!p || !window.RoseModal) return;
    var cm    = catMeta(p.cat) || { quadrant: '', letter: '?', subtitle: '' };
    var isOtc = (p.cat === 'c1' || p.cat === 'c3');
    var stock = typeof p.stock === 'number' ? p.stock : null;
    var outOfStock = stock !== null && stock <= 0;
    var stockNote = stock !== null && stock > 0 && stock <= 10
      ? '<span class="stock-badge stock-low">Only ' + stock + ' left</span>'
      : (outOfStock ? '<span class="stock-badge stock-out">Out of Stock</span>' : '');
    var photoHtml = '<img src="' + imageFor(p) + '" alt="' + p.name + ' pack shot">';
    var actionHtml = isOtc
      ? (outOfStock
          ? '<button class="btn btn-primary" disabled>Out of Stock</button>'
          : '<button class="btn btn-primary modal-add-btn" data-id="' + p.id + '">Add to Cart</button>')
      : '<a class="btn btn-primary" href="b2b.html">Enquire (Institutional)</a>';

    function detailBlock(title, value) {
      if (!value) return '';
      var body = Array.isArray(value)
        ? '<ul style="margin:4px 0 0 18px; padding:0;">' + value.map(function (v) { return '<li>' + v + '</li>'; }).join('') + '</ul>'
        : '<p style="margin:4px 0 0; color:var(--text-soft); font-size:14px;">' + value + '</p>';
      return '<div style="margin-top:14px;"><b style="font-size:13px; text-transform:uppercase; letter-spacing:.04em; color:var(--rose);">' + title + '</b>' + body + '</div>';
    }
    var benefitsHtml    = detailBlock('Benefits', p.benefits);
    var ingredientsHtml = detailBlock('Key Ingredients', p.keyIngredients);
    var dosageHtml      = detailBlock('Dosage', p.dosage);
    var precautionsHtml = detailBlock('Precautions', p.precautions);
    var packSizeHtml    = detailBlock('Pack Size', p.packSize);
    window.RoseModal.open(
      '<div class="modal-photo">' + photoHtml + '</div>' +
      '<div class="modal-body">' +
        '<div class="cat-tag"><span class="quad-letter ' + cm.quadrant + '" style="width:18px;height:18px;font-size:9px;border-radius:50%;">' + cm.letter + '</span>' + cm.subtitle + '</div>' +
        '<h3>' + p.name + '</h3>' +
        '<span class="pack">' + p.packaging + '</span>' +
        (p.pricing ? '<p class="pricing" style="margin:6px 0;font-weight:600;color:#0B7A75;">MRP: \u20b9' + p.pricing.replace(/\/-/g, '') + '</p>' : '') +
        stockNote +
        '<p class="desc">' + p.description + '</p>' +
        benefitsHtml + ingredientsHtml + dosageHtml + precautionsHtml + packSizeHtml +
        '<div class="modal-actions">' + actionHtml +
          '<a class="btn btn-ghost" href="mailto:roselaboratories1983@gmail.com?subject=Enquiry%20-%20' + encodeURIComponent(p.name) + '">Enquire by Email</a>' +
        '</div>' +
      '</div>'
    );
    var fbtHtml = frequentlyBoughtWithHtml(p);
    if (fbtHtml) {
      var modalBody = document.querySelector('.modal-body');
      if (modalBody) {
        modalBody.insertAdjacentHTML('beforeend', fbtHtml);
        modalBody.querySelectorAll('.fbt-card').forEach(function (el) {
          el.addEventListener('click', function () { openQuickView(el.getAttribute('data-id')); });
        });
      }
    }
    var addBtn = document.querySelector('.modal-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        if (window.RoseCart) window.RoseCart.add(p.id, 1);
        addBtn.textContent = 'Added \u2713';
        addBtn.classList.add('added-flash');
      });
    }
  }

  // --- Tab clicks ---
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      activeCat = tab.getAttribute('data-cat');
      applyFilter();
    });
  });

  // Sync initial active tab with URL param
  tabs.forEach(function (t) {
    if (t.getAttribute('data-cat') === activeCat) {
      tabs.forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
    }
  });

  // Ayurvedic ↔ common-term synonyms. This is a general terminology
  // dictionary (standard Sanskrit/Ayurvedic-to-English translations), used
  // only to widen a text match against each product's own existing
  // name/description — it does NOT claim any specific product treats any
  // specific condition. Expand this list as needed.
  var SYNONYMS = {
    'madhumeha': 'diabetes', 'diabetes': 'madhumeha',
    'arsha': 'piles', 'piles': 'arsha', 'hemorrhoids': 'arsha',
    'kasa': 'cough', 'cough': 'kasa',
    'jwara': 'fever', 'fever': 'jwara',
    'shosha': 'weight loss', 'shotha': 'swelling', 'swelling': 'shotha',
    'amlapitta': 'acidity', 'acidity': 'amlapitta', 'hyperacidity': 'amlapitta',
    'kamala': 'jaundice', 'jaundice': 'kamala',
    'vatarakta': 'gout', 'gout': 'vatarakta',
    'twak roga': 'skin disease', 'skin': 'twak roga'
  };
  function expandQuery(q) {
    var extra = SYNONYMS[q];
    return extra ? (q + ' ' + extra) : q;
  }

  var suggestBox = document.getElementById('searchSuggestions');
  function renderSuggestions() {
    var q = (search.value || '').trim().toLowerCase();
    if (!q) { suggestBox.style.display = 'none'; return; }
    var qExpanded = expandQuery(q);
    var terms = qExpanded.split(' ').filter(Boolean);
    var matches = PRODUCTS.filter(function (p) {
      var hay = (p.name + ' ' + p.description).toLowerCase();
      return terms.some(function (t) { return hay.indexOf(t) > -1; });
    }).slice(0, 8);
    if (matches.length === 0) { suggestBox.style.display = 'none'; return; }
    suggestBox.innerHTML = matches.map(function (p) {
      return '<div class="suggestion-item" data-id="' + p.id + '" style="padding:10px 14px; cursor:pointer; font-size:14px; border-bottom:1px solid var(--line,#f0f0f0);">' + p.name + '</div>';
    }).join('');
    suggestBox.style.display = 'block';
    suggestBox.querySelectorAll('.suggestion-item').forEach(function (el) {
      el.addEventListener('mouseenter', function () { el.style.background = '#faf6f0'; });
      el.addEventListener('mouseleave', function () { el.style.background = ''; });
      el.addEventListener('click', function () {
        suggestBox.style.display = 'none';
        openQuickView(el.getAttribute('data-id'));
      });
    });
  }
  document.addEventListener('click', function (e) {
    if (!suggestBox.contains(e.target) && e.target !== search) suggestBox.style.display = 'none';
  });

  // Search input — only calls applyFilter(), never destroys the DOM
  search.addEventListener('input', function () {
    applyFilter();
    renderSuggestions();
  });

  // Initial build
  buildAllCards();

  // When the live catalogue loads from the API, rebuild cards with updated data
  // (e.g. new pricing, new images). Images already in viewport will already be
  // loaded by this point — the rebuild correctly gets the new image paths.
  window.addEventListener('rose:products-updated', buildAllCards);
})();
