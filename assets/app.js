/* ===========================================================
   Passwords4Free — shared JS
   - Secure password generator (crypto.getRandomValues + rejection sampling)
   - Nav toggle
   - Copy logic
   =========================================================== */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ===========================================================
     SECURE RNG — rejection sampling, no modulo bias
     =========================================================== */
  function randomInt(maxExclusive) {
    if (maxExclusive <= 0) return 0;
    var limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
    var buf = new Uint32Array(1);
    var x;
    do {
      crypto.getRandomValues(buf);
      x = buf[0];
    } while (x >= limit);
    return x % maxExclusive;
  }

  /* ---------- Generator ---------- */
  var gen = document.querySelector("[data-generator]");
  if (!gen) return;

  var SETS = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*-_=+?"
  };
  var LOOKALIKES = /[Il1O0]/g;

  var $ = function (sel) { return gen.querySelector(sel); };

  var output = $("[data-output]");
  var lengthInput = $("[data-length]");
  var lengthVal = $("[data-length-val]");
  var elLower = $("[data-lower]");
  var elUpper = $("[data-upper]");
  var elNumbers = $("[data-numbers]");
  var elSymbols = $("[data-symbols]");
  var elExclude = $("[data-exclude]");
  var btnGenerate = $("[data-generate]");
  var btnCopy = $("[data-copy]");
  var btnRegen = $("[data-regenerate]");

  var sWord = $("[data-strength-word]");
  var sBits = $("[data-strength-bits]");
  var sBar = $("[data-strength-bar]");

  function buildPool() {
    var pool = "";
    if (elLower && elLower.checked) pool += SETS.lower;
    if (elUpper && elUpper.checked) pool += SETS.upper;
    if (elNumbers && elNumbers.checked) pool += SETS.numbers;
    if (elSymbols && elSymbols.checked) pool += SETS.symbols;
    if (elExclude && elExclude.checked) pool = pool.replace(LOOKALIKES, "");
    return pool;
  }

  function setStrength(length, poolSize) {
    if (!sWord) return;
    var bits = poolSize > 0 ? Math.round(length * Math.log2(poolSize)) : 0;
    var word, cls, barCls, pct;
    if (bits < 40) { word = "Weak"; cls = "s-weak"; barCls = "bar-weak"; pct = 25; }
    else if (bits < 60) { word = "Fair"; cls = "s-fair"; barCls = "bar-fair"; pct = 50; }
    else if (bits < 80) { word = "Strong"; cls = "s-strong"; barCls = "bar-strong"; pct = 78; }
    else { word = "Very strong"; cls = "s-vstrong"; barCls = "bar-vstrong"; pct = 100; }

    sWord.textContent = word;
    sWord.className = "strength-word " + cls;
    if (sBits) sBits.textContent = bits + " bits of entropy";
    if (sBar) {
      var fill = sBar.firstElementChild;
      fill.className = barCls;
      fill.style.width = pct + "%";
    }
  }

  function clearStrength() {
    if (!sWord) return;
    sWord.textContent = "—";
    sWord.className = "strength-word soft";
    if (sBits) sBits.textContent = "0 bits";
    if (sBar) { sBar.firstElementChild.className = ""; sBar.firstElementChild.style.width = "0%"; }
  }

  function generate() {
    var pool = buildPool();
    var length = parseInt(lengthInput.value, 10);

    if (!pool) {
      output.textContent = "Select at least one character type to generate a password.";
      output.classList.add("is-empty");
      output.removeAttribute("data-has-pw");
      clearStrength();
      return;
    }

    output.classList.remove("is-empty");
    var pw = "";
    for (var i = 0; i < length; i++) {
      pw += pool.charAt(randomInt(pool.length));
    }
    output.textContent = pw;
    output.setAttribute("data-has-pw", "1");
    setStrength(length, pool.length);
  }

  /* ---------- Copy ---------- */
  function copyPassword() {
    if (!output.getAttribute("data-has-pw")) return;
    var text = output.textContent;
    var done = function () {
      var original = btnCopy.getAttribute("data-label") || "Copy";
      btnCopy.textContent = "Copied!";
      btnCopy.classList.add("is-copied");
      window.setTimeout(function () {
        btnCopy.textContent = original;
        btnCopy.classList.remove("is-copied");
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallbackCopy);
    } else {
      fallbackCopy();
    }
    function fallbackCopy() {
      try {
        var r = document.createRange();
        r.selectNodeContents(output);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        document.execCommand("copy");
        sel.removeAllRanges();
        done();
      } catch (e) { /* no-op */ }
    }
  }

  /* ---------- Length display ---------- */
  function syncLength() {
    if (lengthVal) lengthVal.textContent = lengthInput.value;
  }

  /* ---------- Presets ---------- */
  function applyPreset(name) {
    function set(el, v) { if (el) el.checked = v; }
    if (name === "max") {
      lengthInput.value = 32;
      set(elLower, true); set(elUpper, true); set(elNumbers, true);
      set(elSymbols, true); set(elExclude, false);
    } else if (name === "nosym") {
      lengthInput.value = 20;
      set(elLower, true); set(elUpper, true); set(elNumbers, true);
      set(elSymbols, false); set(elExclude, false);
    } else if (name === "easy") {
      lengthInput.value = 16;
      set(elLower, true); set(elUpper, true); set(elNumbers, true);
      set(elSymbols, false); set(elExclude, true);
    }
    syncLength();
    generate();
  }

  /* ---------- Wire up ---------- */
  if (lengthInput) {
    lengthInput.addEventListener("input", function () { syncLength(); generate(); });
  }
  [elLower, elUpper, elNumbers, elSymbols, elExclude].forEach(function (el) {
    if (el) el.addEventListener("change", generate);
  });
  if (btnGenerate) btnGenerate.addEventListener("click", generate);
  if (btnRegen) btnRegen.addEventListener("click", generate);
  if (btnCopy) {
    btnCopy.setAttribute("data-label", btnCopy.textContent.trim());
    btnCopy.addEventListener("click", copyPassword);
  }
  gen.querySelectorAll("[data-preset]").forEach(function (chip) {
    chip.addEventListener("click", function () {
      applyPreset(chip.getAttribute("data-preset"));
    });
  });

  /* ---------- Init ---------- */
  syncLength();
  generate();
})();

/* ===========================================================
   Passwords4Free — PASSWORD ANALYSER
   100% client-side: nothing typed here is sent or stored.
   =========================================================== */
(function () {
  "use strict";
  var box = document.querySelector("[data-analyser]");
  if (!box) return;
  var $ = function (s) { return box.querySelector(s); };
  var input = $("[data-an-input]");
  var toggle = $("[data-an-toggle]");
  var word = $("[data-an-word]");
  var bitsEl = $("[data-an-bits]");
  var bar = $("[data-an-bar]");
  var crackEl = $("[data-an-crack]");
  var checksEl = $("[data-an-checks]");
  var noteEl = $("[data-an-note]");

  var COMMON = ["password","123456","123456789","qwerty","111111","12345678","abc123",
    "password1","1234567","12345","iloveyou","admin","welcome","monkey","letmein","dragon",
    "football","login","princess","qwerty123","000000","passw0rd","superman","trustno1","sunshine"];
  var SEQ = ["0123456789","abcdefghijklmnopqrstuvwxyz","qwertyuiop","asdfghjkl","zxcvbnm"];

  function poolSize(pw) {
    var n = 0;
    if (/[a-z]/.test(pw)) n += 26;
    if (/[A-Z]/.test(pw)) n += 26;
    if (/[0-9]/.test(pw)) n += 10;
    if (/[^A-Za-z0-9]/.test(pw)) n += 33;
    return n;
  }
  function hasSequence(pw) {
    var l = pw.toLowerCase();
    for (var s = 0; s < SEQ.length; s++) {
      for (var i = 0; i + 4 <= SEQ[s].length; i++) {
        var frag = SEQ[s].substr(i, 4);
        if (l.indexOf(frag) > -1) return true;
      }
    }
    return false;
  }
  function isRepeated(pw) { return pw.length > 0 && /^(.)\1+$/.test(pw); }
  function fmtTime(sec) {
    if (!isFinite(sec)) return "longer than the age of the universe";
    if (sec < 1) return "less than a second";
    var u = [["second",1],["minute",60],["hour",3600],["day",86400],["year",31557600],
             ["century",3155760000],["millennium",31557600000]];
    for (var i = u.length - 1; i >= 0; i--) {
      if (sec >= u[i][1]) {
        var v = sec / u[i][1];
        if (v >= 1e6) return "millions of " + u[i][0] + "s";
        var r = Math.round(v);
        return r.toLocaleString() + " " + u[i][0] + (r === 1 ? "" : "s");
      }
    }
    return "less than a second";
  }
  function setBar(cls, pct) {
    word.className = "strength-word " + cls.w;
    word.textContent = cls.label;
    if (bar) { var f = bar.firstElementChild; f.className = cls.bar; f.style.width = pct + "%"; }
  }
  function render(checks, ok) {
    if (!checksEl) return;
    checksEl.innerHTML = "";
    checks.forEach(function (c) {
      var li = document.createElement("li");
      li.className = c.ok ? "chk chk-ok" : "chk chk-no";
      li.innerHTML = (c.ok ? "✓ " : "✗ ") + c.label;
      checksEl.appendChild(li);
    });
  }
  function analyse() {
    var pw = input.value || "";
    if (!pw) {
      setBar({ w: "soft", label: "—", bar: "" }, 0);
      bitsEl.textContent = "Type a password to analyse it";
      crackEl.textContent = "";
      if (noteEl) noteEl.textContent = "";
      render([], false);
      return;
    }
    var pool = poolSize(pw);
    var bits = Math.round(pw.length * Math.log2(pool || 1));
    // crack time: offline fast attack ~10 billion guesses/sec, average = half keyspace
    var seconds = Math.pow(2, bits) / 2 / 1e10;

    var lc = pw.toLowerCase();
    var common = COMMON.indexOf(lc) > -1;
    var seq = hasSequence(pw);
    var rep = isRepeated(pw);
    var weakPattern = common || rep || (seq && pw.length < 12);

    var label, cls, pct;
    if (weakPattern || bits < 40) { label = "Weak"; cls = { w: "s-weak", bar: "bar-weak", label: "Weak" }; pct = 25; }
    else if (bits < 60) { cls = { w: "s-fair", bar: "bar-fair", label: "Fair" }; pct = 50; }
    else if (bits < 80) { cls = { w: "s-strong", bar: "bar-strong", label: "Strong" }; pct = 78; }
    else { cls = { w: "s-vstrong", bar: "bar-vstrong", label: "Very strong" }; pct = 100; }
    setBar(cls, pct);

    bitsEl.textContent = "~" + bits + " bits of entropy";
    crackEl.textContent = "Estimated time to crack (offline attack): " + (weakPattern ? "instantly — it matches a known weak pattern" : fmtTime(seconds));

    render([
      { label: "At least 12 characters", ok: pw.length >= 12 },
      { label: "Lower-case letters", ok: /[a-z]/.test(pw) },
      { label: "Upper-case letters", ok: /[A-Z]/.test(pw) },
      { label: "Numbers", ok: /[0-9]/.test(pw) },
      { label: "Symbols", ok: /[^A-Za-z0-9]/.test(pw) },
      { label: "No common word, sequence or repeat", ok: !weakPattern }
    ]);

    if (noteEl) {
      var msg = "";
      if (common) msg = "This is one of the most common passwords in breach lists — change it everywhere it is used.";
      else if (rep) msg = "A single repeated character is trivial to guess.";
      else if (seq) msg = "Contains a keyboard or alphabetical sequence, which attackers try first.";
      noteEl.textContent = msg;
    }
  }
  input.addEventListener("input", analyse);
  if (toggle) {
    toggle.addEventListener("click", function () {
      var pwd = input.type === "password";
      input.type = pwd ? "text" : "password";
      toggle.textContent = pwd ? "Hide" : "Show";
      toggle.setAttribute("aria-pressed", pwd ? "true" : "false");
    });
  }
  analyse();
})();
