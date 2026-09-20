/* Cookie / GDPR consent banner — ZAHA Lab house standard.
   Self-contained: injects its own styles and markup. Stores the choice in
   localStorage under passwords-4-free-ck. No third-party requests. */
(function () {
  var KEY = 'passwords-4-free-ck';
  var existing = ['cookie-consent', 'cookie-banner', 'cookiebanner', 'cookie-notice',
                  'ck-banner', 'cc-window', 'cookieyes', 'CybotCookiebotDialog'];
  try {
    for (var i = 0; i < existing.length; i++) {
      if (document.getElementById(existing[i]) ||
          document.querySelector('.' + existing[i]) ||
          document.querySelector('[class*="' + existing[i] + '"]')) { return; }
    }
    var saved = localStorage.getItem(KEY);
    if (saved) { window.__consent = JSON.parse(saved); return; }
  } catch (e) { /* storage unavailable: still show the banner, no persistence */ }

  var css = [
    '.lgc-wrap{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;',
    'background:#111827;color:#f9fafb;font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",',
    'Roboto,Helvetica,Arial,sans-serif;box-shadow:0 -6px 24px rgba(0,0,0,.28);padding:16px 18px;',
    'display:flex;gap:16px;align-items:center;flex-wrap:wrap;transform:translateY(110%);',
    'transition:transform .28s ease}',
    '.lgc-wrap.lgc-in{transform:translateY(0)}',
    '.lgc-txt{flex:1 1 420px;min-width:240px}',
    '.lgc-txt strong{display:block;font-size:15.5px;margin-bottom:3px}',
    '.lgc-txt span{color:#cbd5e1}',
    '.lgc-txt a{color:#93c5fd;text-decoration:underline}',
    '.lgc-btns{display:flex;gap:10px;flex-wrap:wrap}',
    '.lgc-btns button{cursor:pointer;border:1px solid transparent;border-radius:6px;',
    'padding:10px 16px;font-size:14.5px;font-weight:600}',
    '.lgc-acc{background:#2563eb;color:#fff}',
    '.lgc-rej{background:transparent;color:#e5e7eb;border-color:#4b5563}',
    '.lgc-set{background:transparent;color:#cbd5e1;text-decoration:underline;padding:10px 4px}',
    '@media(max-width:640px){.lgc-wrap{padding:14px}.lgc-btns{width:100%}',
    '.lgc-btns button{flex:1 1 auto}}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var el = document.createElement('div');
  el.className = 'lgc-wrap';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-live', 'polite');
  el.setAttribute('aria-label', 'Cookie consent');
  el.innerHTML =
    '<div class="lgc-txt"><strong>We use cookies</strong><span>Essential cookies keep this site ' +
    'running. Analytics and affiliate cookies are only used if you accept them. ' +
    'Read our <a href="/cookie-policy.html">cookie policy</a>.</span></div>' +
    '<div class="lgc-btns">' +
    '<button class="lgc-acc" data-c="all">Accept all</button>' +
    '<button class="lgc-rej" data-c="essential">Essential only</button>' +
    '<button class="lgc-set" data-c="settings">Cookie settings</button>' +
    '</div>';
  document.body.appendChild(el);
  setTimeout(function () { el.classList.add('lgc-in'); }, 350);

  function save(choice) {
    var payload = { necessary: true, analytics: choice === 'all',
                    marketing: choice === 'all', choice: choice,
                    ts: new Date().toISOString(), v: 1 };
    try { localStorage.setItem(KEY, JSON.stringify(payload)); } catch (e) {}
    window.__consent = payload;
    el.classList.remove('lgc-in');
    setTimeout(function () { el.remove(); }, 300);
    document.dispatchEvent(new CustomEvent('consent:change', { detail: payload }));
  }

  el.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-c]');
    if (!b) { return; }
    var c = b.getAttribute('data-c');
    if (c === 'settings') { window.location.href = '/cookie-policy.html'; return; }
    save(c);
  });
  window.lgcConsent = { key: KEY, get: function () { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } },
                        reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); } };
})();
