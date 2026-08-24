/* ============================================================
   Social Share Widget — ZAHA Labs portfolio-wide
   Floating share button + popover. Share any page to:
   X, Facebook, Reddit, LinkedIn, WhatsApp, Telegram, Pinterest,
   Email, Copy link, plus native OS share when available.
   ============================================================ */
(function () {
  "use strict";
  if (window.__ssLoaded) return;
  window.__ssLoaded = true;

  var ICONS = {
    x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    reddit: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614 3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    pinterest: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>'
  };

  var NETWORKS = [
    { id: "x",         name: "X",            color: "#000000", build: function (u, t) { return "https://twitter.com/intent/tweet?url=" + u + "&text=" + t; } },
    { id: "facebook",  name: "Facebook",     color: "#1877F2", build: function (u) { return "https://www.facebook.com/sharer/sharer.php?u=" + u; } },
    { id: "reddit",    name: "Reddit",       color: "#FF4500", build: function (u, t) { return "https://www.reddit.com/submit?url=" + u + "&title=" + t; } },
    { id: "linkedin",  name: "LinkedIn",     color: "#0A66C2", build: function (u) { return "https://www.linkedin.com/sharing/share-offsite/?url=" + u; } },
    { id: "whatsapp",  name: "WhatsApp",     color: "#25D366", build: function (u, t, rawT) { return "https://wa.me/?text=" + encodeURIComponent(rawT + " " + decodeURIComponent(u)); } },
    { id: "telegram",  name: "Telegram",     color: "#229ED9", build: function (u, t) { return "https://t.me/share/url?url=" + u + "&text=" + t; } },
    { id: "pinterest", name: "Pinterest",    color: "#E60023", build: function (u, t) { return "https://pinterest.com/pin/create/button/?url=" + u + "&description=" + t; } },
    { id: "email",     name: "Email",        color: "#6b7280", build: function (u, t, rawT) { return "mailto:?subject=" + t + "&body=" + encodeURIComponent(decodeURIComponent(u)); } },
    { id: "copy",      name: "Copy link",    color: "#374151", build: null }
  ];

  function pageUrl() {
    var c = document.querySelector('link[rel="canonical"]');
    return (c && c.href) ? c.href : window.location.href;
  }
  function pageTitle() {
    var og = document.querySelector('meta[property="og:title"]');
    return (og && og.content) ? og.content : document.title;
  }

  /* ---- DOM ---- */
  var fab = document.createElement("button");
  fab.id = "ss-fab";
  fab.type = "button";
  fab.setAttribute("aria-label", "Share this page");
  fab.setAttribute("aria-expanded", "false");
  fab.innerHTML =
    '<span class="ss-fab-open">' + ICONS.share + '</span>' +
    '<span class="ss-fab-close">' + ICONS.link + '</span>' +
    '<span class="ss-label">Share</span>';
  document.body.appendChild(fab);

  var panel = document.createElement("div");
  panel.id = "ss-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Share this page");
  var title = document.createElement("p");
  title.id = "ss-panel-title";
  title.textContent = "Share this page";
  panel.appendChild(title);

  var grid = document.createElement("div");
  grid.id = "ss-grid";
  NETWORKS.forEach(function (n) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "ss-net";
    b.dataset.net = n.id;
    b.setAttribute("aria-label", "Share on " + n.name);
    b.innerHTML = ICONS[n.id] + "<span>" + n.name + "</span>";
    b.addEventListener("click", function (ev) {
      ev.preventDefault();
      var url = encodeURIComponent(pageUrl());
      var titleTxt = encodeURIComponent(pageTitle());
      if (n.build) {
        var href = n.build(url, titleTxt, pageTitle());
        if (n.id === "email") {
          window.location.href = href;
        } else {
          window.open(href, "_blank", "noopener,noreferrer,width=640,height=580");
        }
      } else {
        copyLink();
      }
      closePanel();
    });
    grid.appendChild(b);
  });

  if (navigator.share) {
    var ns = document.createElement("button");
    ns.type = "button";
    ns.className = "ss-net";
    ns.dataset.net = "native";
    ns.setAttribute("aria-label", "More share options");
    ns.innerHTML = ICONS.share + "<span>More…</span>";
    ns.addEventListener("click", function () {
      navigator.share({ title: pageTitle(), url: pageUrl() }).catch(function () {});
      closePanel();
    });
    grid.appendChild(ns);
  }

  panel.appendChild(grid);
  document.body.appendChild(panel);

  var toast = document.createElement("div");
  toast.id = "ss-toast";
  toast.setAttribute("role", "status");
  document.body.appendChild(toast);

  /* ---- behaviour ---- */
  function openPanel() {
    panel.classList.add("ss-open");
    fab.setAttribute("aria-expanded", "true");
  }
  function closePanel() {
    panel.classList.remove("ss-open");
    fab.setAttribute("aria-expanded", "false");
  }
  fab.addEventListener("click", function () {
    if (panel.classList.contains("ss-open")) { closePanel(); } else { openPanel(); }
  });
  document.addEventListener("click", function (ev) {
    if (panel.classList.contains("ss-open") &&
        !panel.contains(ev.target) && !fab.contains(ev.target)) {
      closePanel();
    }
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") closePanel();
  });

  var toastTimer = null;
  function copyLink() {
    var done = function () {
      toast.textContent = "Link copied to clipboard";
      toast.classList.add("ss-show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove("ss-show"); }, 2000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pageUrl()).then(done, function () { fallbackCopy(done); });
    } else {
      fallbackCopy(done);
    }
  }
  function fallbackCopy(done) {
    var ta = document.createElement("textarea");
    ta.value = pageUrl();
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    done(); // always confirm — the URL was selected even if execCommand failed
  }
})();
