// Rose Laboratories — shared UI micro-interactions (Phase 4)
// Back-to-top button, FAQ accordions, image fade-in, and a small modal helper.
// No external libraries. Safe to include on every page.
(function(){

  // ---------- Back to top ----------
  var btt = document.createElement('button');
  btt.className = 'back-to-top';
  btt.setAttribute('aria-label', 'Back to top');
  btt.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(btt);

  var scrollTimer = null;
  function onScroll(){
    if(scrollTimer) return;
    scrollTimer = requestAnimationFrame(function(){
      btt.classList.toggle('show', window.scrollY > 480);
      scrollTimer = null;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btt.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- FAQ accordions ----------
  // Markup: .faq-item > .faq-q (button) + .faq-a > .faq-a-inner
  document.querySelectorAll('.faq-item').forEach(function(item, i){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if(!q || !a) return;
    var id = a.id || ('faq-panel-' + i + '-' + Math.random().toString(36).slice(2,7));
    a.id = id;
    q.setAttribute('aria-expanded', 'false');
    q.setAttribute('aria-controls', id);
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      // Close siblings within the same list for a cleaner single-open accordion
      var list = item.closest('.faq-list');
      if(list){
        list.querySelectorAll('.faq-item.open').forEach(function(other){
          if(other !== item){
            other.classList.remove('open');
            var otherQ = other.querySelector('.faq-q');
            if(otherQ) otherQ.setAttribute('aria-expanded', 'false');
          }
        });
      }
      item.classList.toggle('open', !isOpen);
      q.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // ---------- Image fade-in on load ----------
  document.querySelectorAll('img[loading="lazy"]').forEach(function(img){
    if(img.complete && img.naturalWidth){ img.classList.add('img-loaded'); return; }
    img.addEventListener('load', function(){ img.classList.add('img-loaded'); });
    img.addEventListener('error', function(){ img.classList.add('img-loaded'); });
  });

  // ---------- Generic modal helper ----------
  // Usage: window.RoseModal.open(htmlString) / window.RoseModal.close()
  var overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = '<div class="modal-card" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Close">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
    '</button><div class="modal-slot"></div></div>';
  document.body.appendChild(overlay);
  var modalCard = overlay.querySelector('.modal-card');
  var modalSlot = overlay.querySelector('.modal-slot');
  var lastFocused = null;

  function closeModal(){
    overlay.classList.remove('open');
    document.body.classList.remove('modal-locked');
    if(lastFocused){ lastFocused.focus(); }
  }
  function openModal(html){
    modalSlot.innerHTML = html;
    overlay.classList.add('open');
    document.body.classList.add('modal-locked');
    lastFocused = document.activeElement;
    // Double rAF: the first frame applies the visibility/opacity transition,
    // the second confirms the element is actually focusable before we move focus.
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        overlay.querySelector('.modal-close').focus();
      });
    });
  }
  overlay.addEventListener('click', function(e){ if(e.target === overlay) closeModal(); });
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

  window.RoseModal = { open: openModal, close: closeModal };

})();
