// Rose Laboratories — shared site behaviour
(function(){
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.mobile-panel');
  if(toggle && panel){
    toggle.addEventListener('click', function(){
      panel.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }

  // "Partners" nav dropdown
  var dropdown = document.querySelector('.nav-dropdown');
  if(dropdown){
    var trigger = dropdown.querySelector('.nav-dropdown-trigger');
    trigger.addEventListener('click', function(e){
      e.stopPropagation();
      var willOpen = !dropdown.classList.contains('open');
      dropdown.classList.toggle('open', willOpen);
      trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function(e){
      if(!dropdown.contains(e.target)){
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){ dropdown.classList.remove('open'); trigger.setAttribute('aria-expanded','false'); }
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  // Stat counters — animate numbers up when they scroll into view
  var statNums = document.querySelectorAll('.stat .num');
  if(statNums.length){
    var animateCount = function(el){
      var raw = el.textContent.trim();
      var target = parseInt(raw.replace(/[^0-9]/g, ''), 10);
      if(isNaN(target)){ return; }
      var suffix = raw.replace(/[0-9]/g, '');
      var duration = 1100;
      var start = null;
      function step(ts){
        if(start === null){ start = ts; }
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if(p < 1){ requestAnimationFrame(step); }
        else { el.textContent = target + suffix; }
      }
      requestAnimationFrame(step);
    };
    if('IntersectionObserver' in window){
      var statIo = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            animateCount(entry.target);
            statIo.unobserve(entry.target);
          }
        });
      }, { threshold: .4 });
      statNums.forEach(function(el){ statIo.observe(el); });
    }
  }

  // Footer year
  var yearEl = document.querySelector('[data-year]');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }
})();
