// =====================================================================
// Rose Prakriti Consultant — floating chat widget
// Injects itself into every page that includes this script (after
// chat-config.js). Conversation is kept in sessionStorage so it
// persists as the visitor moves between pages, but resets per tab.
// =====================================================================
(function () {
  var CFG = window.ROSE_PRAKRITI_CONFIG || {};
  var HISTORY_KEY = 'rp_chat_history_v1';

  function loadHistory() {
    try { return JSON.parse(sessionStorage.getItem(HISTORY_KEY)) || null; } catch (e) { return null; }
  }
  function saveHistory(msgs) {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(msgs));
  }

  function renderText(text) {
    var lines = text.split('\n');
    var html = '', inList = false;
    lines.forEach(function (line) {
      var trimmed = line.trim();
      if (/^[-*]\s+/.test(trimmed)) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += '<li>' + inlineFmt(trimmed.replace(/^[-*]\s+/, '')) + '</li>';
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        if (trimmed) html += '<p>' + inlineFmt(trimmed) + '</p>';
      }
    });
    if (inList) html += '</ul>';
    return html || '<p>' + inlineFmt(text) + '</p>';
  }
  function inlineFmt(s) {
    s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return s;
  }

  function build() {
    var launcher = document.createElement('button');
    launcher.className = 'rp-launcher';
    launcher.setAttribute('aria-label', 'Open ' + (CFG.name || 'wellness chat'));
    launcher.innerHTML = '<span class="rp-ping"></span><img src="' + CFG.avatar + '" alt="">';

    var panel = document.createElement('div');
    panel.className = 'rp-panel';
    panel.innerHTML =
      '<div class="rp-head">' +
        '<img src="' + CFG.avatar + '" alt="">' +
        '<div><div class="rp-title">' + CFG.name + '</div><div class="rp-sub">' + CFG.subtitle + '</div></div>' +
        '<button class="rp-close" aria-label="Close chat"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' +
      '</div>' +
      '<div class="rp-body" id="rpBody"></div>' +
      '<div class="rp-chips" id="rpChips"></div>' +
      '<div class="rp-input-row">' +
        '<input type="text" id="rpInput" placeholder="Ask about Ayurveda, diet, yoga…" autocomplete="off">' +
        '<button class="rp-send" id="rpSend" aria-label="Send">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="rp-disclaimer">Rose Prakriti Consultant provides educational wellness information based on Ayurvedic principles and is not a substitute for professional medical advice, diagnosis, or treatment.</div>';

    document.body.appendChild(launcher);
    document.body.appendChild(panel);
    return { launcher: launcher, panel: panel };
  }

  function init() {
    if (!CFG.avatar) return;
    var els = build();
    var body = els.panel.querySelector('#rpBody');
    var chips = els.panel.querySelector('#rpChips');
    var input = els.panel.querySelector('#rpInput');
    var sendBtn = els.panel.querySelector('#rpSend');
    var closeBtn = els.panel.querySelector('.rp-close');

    var history = loadHistory();
    var isFirstOpen = !history;
    if (!history) {
      history = [{ role: 'assistant', content: CFG.greeting }];
      saveHistory(history);
    }

    function renderAll() {
      body.innerHTML = '';
      history.forEach(function (m) { appendMessage(m.role, m.content, false); });
      body.scrollTop = body.scrollHeight;
      renderChips();
    }

    function renderChips() {
      chips.innerHTML = '';
      if (history.length > 1) return;
      (CFG.quickPrompts || []).forEach(function (q) {
        var chip = document.createElement('button');
        chip.className = 'rp-chip';
        chip.textContent = q;
        chip.addEventListener('click', function () { sendMessage(q); });
        chips.appendChild(chip);
      });
    }

    function appendMessage(role, content, scroll) {
      var row = document.createElement('div');
      row.className = 'rp-msg ' + (role === 'user' ? 'user' : 'assistant');
      var avatarHtml = role === 'user' ? '' : '<img class="rp-avatar" src="' + CFG.avatar + '" alt="">';
      row.innerHTML = avatarHtml + '<div class="rp-bubble">' + renderText(content) + '</div>';
      body.appendChild(row);
      if (scroll !== false) body.scrollTop = body.scrollHeight;
    }

    function showTyping() {
      var row = document.createElement('div');
      row.className = 'rp-msg assistant';
      row.id = 'rpTypingRow';
      row.innerHTML = '<img class="rp-avatar" src="' + CFG.avatar + '" alt=""><div class="rp-bubble rp-typing"><span></span><span></span><span></span></div>';
      body.appendChild(row);
      body.scrollTop = body.scrollHeight;
    }
    function hideTyping() {
      var row = document.getElementById('rpTypingRow');
      if (row) row.remove();
    }

    function sendMessage(text) {
      text = (text || input.value).trim();
      if (!text) return;
      input.value = '';
      history.push({ role: 'user', content: text });
      appendMessage('user', text);
      renderChips();
      saveHistory(history);
      showTyping();
      sendBtn.disabled = true;

      fetch(CFG.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map(function (m) { return { role: m.role, content: m.content }; }) })
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Backend not available');
          return res.json();
        })
        .then(function (data) {
          hideTyping();
          var reply = data.reply || data.content || CFG.demoModeMessage;
          history.push({ role: 'assistant', content: reply });
          appendMessage('assistant', reply);
          saveHistory(history);
        })
        .catch(function () {
          hideTyping();
          appendMessage('assistant', CFG.demoModeMessage);
        })
        .finally(function () { sendBtn.disabled = false; });
    }

    sendBtn.addEventListener('click', function () { sendMessage(); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') sendMessage(); });

    els.launcher.addEventListener('click', function () {
      var willOpen = !els.panel.classList.contains('rp-visible');
      els.panel.classList.toggle('rp-visible');
      els.launcher.classList.toggle('rp-open');
      if (willOpen) { renderAll(); setTimeout(function () { input.focus(); }, 250); }
    });
    closeBtn.addEventListener('click', function () {
      els.panel.classList.remove('rp-visible');
      els.launcher.classList.remove('rp-open');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
