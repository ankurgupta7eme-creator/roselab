// Rose Laboratories — shared site extras (Phase 5)
// Injects a floating WhatsApp enquiry button and a social-media row into
// every page footer, so we maintain them in ONE place instead of editing
// 15 HTML files. Safe to include on every page (loads after main.js).
(function () {
  // ---------------------------------------------------------------------
  // CONFIG — update these with the brand's real profile URLs.
  // Leave a value as '' (empty string) to hide that icon.
  // ---------------------------------------------------------------------
  var SOCIAL = {
    whatsapp:  '919472277067',                 // digits only, country code first
    instagram: '',                             // e.g. 'https://instagram.com/roselaboratories'
    facebook:  '',                             // e.g. 'https://facebook.com/roselaboratories'
    linkedin:  '',                             // e.g. 'https://linkedin.com/company/roselaboratories'
    youtube:   ''                              // e.g. 'https://youtube.com/@roselaboratories'
  };

  var ICONS = {
    whatsapp: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1s-.7 1-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.5A10 10 0 1012 2z"/></svg>',
    instagram: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    facebook:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h2.5l.5-3H14V9c0-.6.4-1 1-1z"/></svg>',
    linkedin:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8A1.5 1.5 0 106.5 5a1.5 1.5 0 000 3zM5 9.5h3V19H5V9.5zM10 9.5h2.9v1.3h.04c.4-.75 1.4-1.55 2.86-1.55 3 0 3.6 2 3.6 4.6V19h-3v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-3V9.5z"/></svg>',
    youtube:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C18.4 5.2 12 5.2 12 5.2s-6.4 0-7.9.4c-.8.2-1.5.9-1.7 1.7C2 8.8 2 12 2 12s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.5.4 7.9.4 7.9.4s6.4 0 7.9-.4c.8-.2 1.5-.9 1.7-1.7C22 15.2 22 12 22 12zM10 15V9l5 3-5 3z"/></svg>'
  };

  // ---------- Floating WhatsApp button ----------
  if (SOCIAL.whatsapp) {
    var wa = document.createElement('a');
    wa.className = 'wa-float';
    wa.href = 'https://wa.me/' + SOCIAL.whatsapp +
      '?text=' + encodeURIComponent('Hello Rose Laboratories, I have an enquiry about your products.');
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Chat with us on WhatsApp');
    wa.innerHTML = ICONS.whatsapp + '<span class="wa-float-label">WhatsApp Us</span>';
    document.body.appendChild(wa);
  }

  // ---------- Footer social row ----------
  var brand = document.querySelector('.footer-brand');
  if (brand && !brand.querySelector('.footer-social')) {
    var order = ['whatsapp', 'instagram', 'facebook', 'linkedin', 'youtube'];
    var links = order
      .filter(function (k) { return SOCIAL[k]; })
      .map(function (k) {
        var href = k === 'whatsapp' ? 'https://wa.me/' + SOCIAL.whatsapp : SOCIAL[k];
        return '<a href="' + href + '" target="_blank" rel="noopener" aria-label="' +
          k.charAt(0).toUpperCase() + k.slice(1) + '">' + ICONS[k] + '</a>';
      })
      .join('');
    if (links) {
      var row = document.createElement('div');
      row.className = 'footer-social';
      row.innerHTML = links;
      brand.appendChild(row);
    }
  }
})();
