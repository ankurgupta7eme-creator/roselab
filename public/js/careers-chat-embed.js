// =====================================================================
// Rose Careers & Partner Connect — embedded inline chat
// Renders directly into #careersChatMount on careers.html. Unlike
// chat-widget.js, there's no floating launcher — this assistant only
// lives on the careers/partnerships page.
// =====================================================================
(function () {
  var CFG = window.ROSE_CAREERS_CONFIG || {};
  var HISTORY_KEY = 'rc_chat_history_v1';

  function loadHistory() {
    try { return JSON.parse(sessionStorage.getItem(HISTORY_KEY)) || null; } catch (e) { return null; }
  }
  function saveHistory(msgs) { sessionStorage.setItem(HISTORY_KEY, JSON.stringify(msgs)); }

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

  function init() {
    var mount = document.getElementById('careersChatMount');
    if (!mount || !CFG.avatar) return;

    mount.innerHTML =
      '<div class="rp-embed">' +
        '<div class="rp-head">' +
          '<img src="' + CFG.avatar + '" alt="">' +
          '<div><div class="rp-title">' + CFG.name + '</div><div class="rp-sub">' + CFG.subtitle + '</div></div>' +
          '<button class="rp-close" id="rcReset" aria-label="Restart conversation" title="Restart conversation"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg></button>' +
        '</div>' +
        '<div class="rp-body" id="rcBody"></div>' +
        '<div class="rp-chips" id="rcChips"></div>' +
        '<div class="rp-input-row">' +
          '<input type="text" id="rcInput" placeholder="Tell us about your application or enquiry…" autocomplete="off">' +
          '<button class="rp-send" id="rcSend" aria-label="Send">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="rp-disclaimer">Submitting information here does not guarantee employment, distributorship, franchise rights, or business partnership approval. All applications are subject to verification and approval by Rose Laboratories.</div>' +
      '</div>';

    var body = document.getElementById('rcBody');
    var chips = document.getElementById('rcChips');
    var input = document.getElementById('rcInput');
    var sendBtn = document.getElementById('rcSend');
    var resetBtn = document.getElementById('rcReset');

    var history = loadHistory();
    if (!history) {
      history = [{ role: 'assistant', content: CFG.greeting }];
      saveHistory(history);
    }

    function renderAll() {
      body.innerHTML = '';
      history.forEach(function (m) { appendMessage(m.role, m.content); });
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
    function appendMessage(role, content) {
      var row = document.createElement('div');
      row.className = 'rp-msg ' + (role === 'user' ? 'user' : 'assistant');
      var avatarHtml = role === 'user' ? '' : '<img class="rp-avatar" src="' + CFG.avatar + '" alt="">';
      row.innerHTML = avatarHtml + '<div class="rp-bubble">' + renderText(content) + '</div>';
      body.appendChild(row);
      body.scrollTop = body.scrollHeight;
    }
    function showTyping() {
      var row = document.createElement('div');
      row.className = 'rp-msg assistant';
      row.id = 'rcTypingRow';
      row.innerHTML = '<img class="rp-avatar" src="' + CFG.avatar + '" alt=""><div class="rp-bubble rp-typing"><span></span><span></span><span></span></div>';
      body.appendChild(row);
      body.scrollTop = body.scrollHeight;
    }
    function hideTyping() {
      var row = document.getElementById('rcTypingRow');
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
        .then(function (res) { if (!res.ok) throw new Error('Backend not available'); return res.json(); })
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
    resetBtn.addEventListener('click', function () {
      history = [{ role: 'assistant', content: CFG.greeting }];
      saveHistory(history);
      renderAll();
    });

    renderAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
