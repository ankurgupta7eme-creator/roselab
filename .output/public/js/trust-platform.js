// =====================================================================
// Rose Laboratories — Global Trust Platform (Phase 4)
// -----------------------------------------------------------------------
// Replaces 30+ hardcoded trust-strip instances across all pages with a
// single JavaScript-driven component. Data lives here (and will later
// be API-driven from the CMS trust_badges table). This is the single
// source of truth for all trust signals across the platform.
//
// Usage: include this script on any page. It will find the first
// .trust-strip element on the page and populate it, preserving the
// existing HTML structure so CSS stays unchanged.
//
// API-driven update: if /api/trust-badges ever exists, this script will
// silently update from it without breaking the static fallback.
// =====================================================================
(function () {
  'use strict';

  // ── Embedded trust data (static fallback — zero network dependency) ─
  // Matches the trust_badges table seed from the commerce migration.
  // Update here when admin changes trust badges, until the CMS API
  // endpoint /api/trust-badges is built.
  var TRUST_BADGES = [
    { icon: 'shield-check', label: 'WHO-GMP Compliant',                 value: null },
    { icon: 'award',        label: 'ISO 9001:2015',                     value: 'ACC/26/ISO/665' },
    { icon: 'shield-check', label: 'ZED Bronze Certified',              value: null },
    { icon: 'calendar',     label: 'Manufacturing Since',               value: '1983' },
    { icon: 'package',      label: 'Ayurvedic Formulations',            value: '93' },
    { icon: 'award',        label: 'UDYAM Registered',                  value: 'BR-26-0000468' }
  ];

  // Inline SVG icons keyed by slug — lightweight, no icon-font dependency
  var ICONS = {
    'shield-check': '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>',
    'award':        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>',
    'calendar':     '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    'package':      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    'map-pin':      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    'flask':        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 3h6m-3 0v6l4 8H8l4-8V3zm-5 17h10"/></svg>',
    'star':         '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>',
    'heart':        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>'
  };

  function buildItem(badge) {
    var icon = ICONS[badge.icon] || ICONS['star'];
    var text = badge.value
      ? badge.label + ' &mdash; <b>' + badge.value + '</b>'
      : badge.label;
    return '<div class="trust-item"><span class="dot"></span>' + icon + '<span>' + text + '</span></div>';
  }

  function render(badges, container) {
    var inner = container.querySelector('.trust-row');
    if (!inner) return;
    inner.innerHTML = badges.map(buildItem).join('');
  }

  // Populate all trust strips on this page
  var strips = document.querySelectorAll('.trust-strip');
  if (strips.length === 0) return;

  // Render immediately from embedded data
  strips.forEach(function (strip) { render(TRUST_BADGES, strip); });

  // Future: fetch from /api/trust-badges and silently update
  // (commented until the CMS API endpoint is built)
  /*
  if (window.fetch) {
    fetch('/api/trust-badges')
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (badges) {
        if (Array.isArray(badges) && badges.length > 0) {
          strips.forEach(function (strip) { render(badges, strip); });
        }
      })
      .catch(function () {}); // embedded fallback stays on screen
  }
  */
})();
