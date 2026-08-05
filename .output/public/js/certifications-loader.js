// =====================================================================
// Rose Laboratories — certifications-loader.js (v2, resilient)
// -----------------------------------------------------------------------
// CERTIFICATE VISIBILITY BUG ROOT CAUSE (fixed here):
// The previous version was pure JS + API fetch with a "hide on failure"
// fallback. If the backend was down, slow, or the request failed, the
// entire certificate section silently disappeared — losing critical
// business trust assets.
//
// FIX STRATEGY (three-layer resilience):
//   1. EMBEDDED JSON  — data baked into this file at last build time.
//                       Zero network dependency. Renders immediately.
//   2. API UPDATE     — async fetch from /api/certificates updates the
//                       display if it returns fresher data.
//   3. VISIBLE DEFAULT — the section is ALWAYS shown. It is never
//                        hidden just because an API call failed.
//
// To update the embedded fallback data, re-run:
//   npm run build:cert-data   (future CI step)
// or manually edit EMBEDDED_CERTS below.
// =====================================================================
(function () {
  'use strict';

  // ── Layer 1: Embedded fallback data (always available, zero-network) ─
  // Last updated: 2026-07-03
  var EMBEDDED_CERTS = [
    {
      id: "efbcdbcb-0e4d-4f52-8185-79680bffadb6",
      name: "ISO 9001:2015 Quality Management System",
      type: "ISO",
      fileLink: "/uploads/certificates/iso-9001-2015-certificate.pdf",
      certNumber: "ACC/26/ISO/665",
      issuedBy: "Accord Conformity Certifications",
      issueDate: "2026-06-18",
      expiryDate: "2029-06-17",
      validity: "Valid until 17 June 2029 (1st Surveillance: 18 June 2027, 2nd Surveillance: 18 June 2028)"
    },
    {
      id: "3f522cb6-b73e-42cb-b42a-6e5922d2140e",
      name: "WHO-GMP Certificate of Compliance (Good Manufacturing Practices)",
      type: "WHO-GMP",
      fileLink: "/uploads/certificates/who-gmp-certificate.pdf",
      certNumber: "WGMP-26061913",
      issuedBy: "IPQ Management System (UKAF CERT LIMITED Accredited)",
      issueDate: "2026-06-19",
      expiryDate: "2029-06-18",
      validity: "Valid until 18 June 2029 (1st Surveillance: 18 June 2027, 2nd Surveillance: 18 June 2028)"
    }
  ];

  var TYPE_LABELS = {
    'ISO':     'ISO 9001:2015',
    'WHO-GMP': 'WHO-GMP',
    'UDYAM':   'UDYAM',
    'ZED':     'ZED Bronze',
    'Other':   'Certificate'
  };

  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatDate(dateStr) {
    if (!dateStr) return '\u2014';
    var d;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      d = new Date(dateStr + 'T00:00:00');
    } else {
      return escHtml(dateStr);
    }
    return isNaN(d.getTime()) ? escHtml(dateStr)
      : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function buildCard(cert) {
    var typeLabel = TYPE_LABELS[cert.type] || escHtml(cert.type);
    var viewBtn = cert.fileLink
      ? '<a href="' + escHtml(cert.fileLink) + '" class="btn btn-ghost btn-sm" target="_blank" rel="noopener">View PDF \u2197</a>'
      : '';
    var dlBtn = cert.fileLink
      ? '<a href="' + escHtml(cert.fileLink) + '" class="btn btn-primary btn-sm" download>Download PDF</a>'
      : '';

    return '<div class="cert-api-card reveal">' +
      '<div class="cert-api-badge">' + escHtml(typeLabel) + '</div>' +
      '<h3 class="cert-api-name">' + escHtml(cert.name) + '</h3>' +
      '<div class="fact-row"><span class="k">Issuing Authority</span><span class="v">' + escHtml(cert.issuedBy || '\u2014') + '</span></div>' +
      '<div class="fact-row"><span class="k">Certificate No.</span><span class="v">' + escHtml(cert.certNumber || '\u2014') + '</span></div>' +
      '<div class="fact-row"><span class="k">Issue Date</span><span class="v">' + formatDate(cert.issueDate) + '</span></div>' +
      '<div class="fact-row"><span class="k">Expiry Date</span><span class="v">' + formatDate(cert.expiryDate) + '</span></div>' +
      (cert.validity ? '<div class="fact-row"><span class="k">Validity</span><span class="v">' + escHtml(cert.validity) + '</span></div>' : '') +
      (viewBtn || dlBtn ? '<div class="cert-api-actions">' + viewBtn + ' ' + dlBtn + '</div>' : '') +
    '</div>';
  }

  function populate(certs, container) {
    if (!container || !certs || certs.length === 0) return;
    var relevant = certs.filter(function (c) {
      return c.type === 'ISO' || c.type === 'WHO-GMP';
    });
    if (relevant.length === 0) return;
    container.innerHTML = relevant.map(buildCard).join('');
    container.style.display = '';
  }

  // ── Render immediately from embedded data (Layer 1) ──────────────────
  var CONTAINERS = [
    document.getElementById('certCards'),       // certifications.html
    document.getElementById('homeCertCards'),   // home.html
    document.getElementById('aboutCertCards'),  // about.html
    document.getElementById('distCertCards'),   // b2b.html (distributor)
    document.getElementById('resCertCards'),    // resources.html
    document.getElementById('prodCertCards')    // products.html
  ].filter(Boolean);

  // CRITICAL: Never hide the section — always render from embedded data first
  CONTAINERS.forEach(function (c) { populate(EMBEDDED_CERTS, c); });

  // ── Async API update (Layer 2) ────────────────────────────────────────
  if (window.fetch) {
    fetch('/api/certificates')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (apiCerts) {
        if (Array.isArray(apiCerts) && apiCerts.length > 0) {
          CONTAINERS.forEach(function (c) { populate(apiCerts, c); });
        }
      })
      .catch(function () {
        // API failed — embedded data already on screen, nothing to do.
      });
  }
})();
