/* Renders the page from window.SITE (js/content.js) and wires up interactivity. */
(function () {
  "use strict";
  var S = window.SITE;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- tiny DOM helper ---------- */
  function h(tag, attrs) {
    var el = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.indexOf("on") === 0) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null) continue;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return el;
  }
  function list(items, cls) {
    return h.apply(null, ["ul", { class: cls || "list" }].concat(items.map(function (t) { return h("li", { text: t }); })));
  }
  function chips(items) {
    return h.apply(null, ["ul", { class: "chips" }].concat(items.map(function (t) { return h("li", { text: t }); })));
  }

  /* ---------- lightbox ---------- */
  var lbItems = [];
  var lbIndex = 0;
  var lbReturn = null;
  var lb = $("#lightbox");

  function mediaFor(item, large) {
    if (item.src) return h("img", { src: item.src, alt: item.alt || item.label || "", loading: "lazy", decoding: "async", style: item.pos ? "object-position:" + item.pos : null });
    return placeholder(item.label || "Image", large);
  }
  function placeholder(label, large) {
    var d = h("div", { class: "ph" + (large ? " ph--large" : ""), role: "img", "aria-label": "Placeholder image: " + label });
    d.innerHTML =
      '<svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true"><rect x="5" y="9" width="38" height="30" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="16" cy="20" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M5 34l12-10 9 8 6-5 11 9" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
    d.appendChild(h("span", { class: "ph__tag", text: "Placeholder" }));
    d.appendChild(h("span", { class: "ph__label", text: label }));
    return d;
  }
  // Registers an item for the lightbox and returns a keyboard-accessible button
  function lightboxThumb(item, caption) {
    var idx = lbItems.push({ item: item, caption: caption || item.caption || item.label || "" }) - 1;
    var btn = h("button", { class: "thumb", type: "button", "aria-label": "Enlarge image: " + (item.label || item.title || "figure"),
      onclick: function () { openLightbox(idx); } }, mediaFor(item, false));
    return btn;
  }
  function renderLightbox() {
    var cur = lbItems[lbIndex];
    var m = $("#lb-media");
    m.textContent = "";
    m.appendChild(mediaFor(cur.item, true));
    $("#lb-caption").textContent = cur.caption + " (" + (lbIndex + 1) + " of " + lbItems.length + ")";
  }
  function openLightbox(i) {
    lbIndex = i;
    lbReturn = document.activeElement;
    renderLightbox();
    lb.hidden = false;
    document.body.classList.add("no-scroll");
    $("#lb-close").focus();
  }
  function closeLightbox() {
    lb.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lbReturn) lbReturn.focus();
  }
  function stepLightbox(d) {
    lbIndex = (lbIndex + d + lbItems.length) % lbItems.length;
    renderLightbox();
  }
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", function () { stepLightbox(-1); });
  $("#lb-next").addEventListener("click", function () { stepLightbox(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") stepLightbox(-1);
    else if (e.key === "ArrowRight") stepLightbox(1);
    else if (e.key === "Tab") { // keep focus inside the dialog
      var f = lb.querySelectorAll("button");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- expandable component (used by research + project cards) ---------- */
  var uid = 0;
  function expandable(summaryEls, detailEl, label) {
    var id = "exp-" + (++uid);
    detailEl.id = id;
    detailEl.hidden = true;
    var btn = h("button", { class: "more", type: "button", "aria-expanded": "false", "aria-controls": id }, label + " ");
    btn.appendChild(h("span", { class: "more__icon", "aria-hidden": "true", text: "+" }));
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      detailEl.hidden = open;
      btn.lastChild.textContent = open ? "+" : "−";
    });
    return [btn, detailEl];
  }

  /* ---------- header / hero ---------- */
  var P = S.person, L = S.links;
  var NAV = [["about", "About"], ["research", "Research"], ["projects", "Projects"], ["education", "Education"], ["fellowship", "Fellowship"],
             ["teaching", "Teaching"], ["skills", "Skills"], ["interests", "Beyond research"], ["contact", "Contact"]];
  var nav = $("#site-nav");
  NAV.forEach(function (n) { nav.appendChild(h("a", { href: "#" + n[0], "data-sec": n[0], text: n[1] })); });

  $("#hero-role").textContent = P.role + " | " + P.affiliation.replace(", Bangladesh", "") + ", Bangladesh";
  $("#hero-title").textContent = P.name;
  $("#hero-headline").textContent = P.headline;
  $("#hero-intro").textContent = P.intro;
  document.title = P.name + " | Physics Researcher, University of Dhaka";

  var hb = $("#hero-buttons");
  hb.appendChild(h("a", { class: "btn btn--primary", href: "#research", text: "Explore My Research" }));
  if (L.cv) hb.appendChild(h("a", { class: "btn", href: L.cv, target: "_blank", rel: "noopener", text: "View CV" }));
  if (L.github) hb.appendChild(h("a", { class: "btn", href: L.github, target: "_blank", rel: "noopener", text: "GitHub" }));
  hb.appendChild(h("a", { class: "btn", href: "#contact", text: "Get in Touch" }));

  var pt = $("#portrait");
  if (P.portrait) pt.appendChild(h("img", { src: P.portrait, alt: "Portrait of " + P.name, width: 480, height: 600, decoding: "async" }));
  else pt.appendChild(placeholder("Portrait: replace via person.portrait in content.js", true));


  /* ---------- about ---------- */
  S.about.forEach(function (t) { $("#about-text").appendChild(h("p", { text: t })); });

  /* ---------- research cards + filters ---------- */
  var rGrid = $("#research-grid");
  S.research.forEach(function (r) {
    var detail = h("div", { class: "detail" },
      h("h4", { text: "Scientific questions" }), list(r.questions),
      h("h4", { text: "Methods" }), chips(r.methods));
    var parts = expandable(null, detail, "Questions & methods");
    var card = h("article", { class: "card reveal", "data-status": r.status },
      h("span", { class: "badge badge--" + r.status.toLowerCase(), text: r.status === "Ongoing" ? "Ongoing research" : "Interest" }),
      h("h3", { text: r.title }), h("p", { text: r.summary }), parts[0], parts[1]);
    rGrid.appendChild(card);
  });
  var filters = $("#research-filters");
  [["all", "All"], ["Ongoing", "Ongoing research"], ["Interest", "Interests"]].forEach(function (f, i) {
    filters.appendChild(h("button", { class: "filter", type: "button", "aria-pressed": String(i === 0), "data-f": f[0], text: f[1],
      onclick: function () {
        filters.querySelectorAll(".filter").forEach(function (b) { b.setAttribute("aria-pressed", String(b === this)); }, this);
        rGrid.querySelectorAll(".card").forEach(function (c) {
          c.hidden = !(f[0] === "all" || c.getAttribute("data-status") === f[0]);
        });
      } }));
  });

  /* ---------- featured project ---------- */
  var F = S.featured;
  $("#featured-h").textContent = F.title;
  var fb = $("#featured-body");
  var figs = h("div", { class: "figs" });
  F.figures.forEach(function (f) {
    figs.appendChild(h("figure", { class: "fig" }, lightboxThumb(f, f.caption), h("figcaption", { text: f.caption })));
  });
  fb.appendChild(h("div", { class: "featured__meta" },
    h("span", { class: "badge badge--ongoing", text: F.status }),
    h("p", null, h("strong", { text: "Supervisor: " }), F.supervisor),
    h("p", null, h("strong", { text: "Period: " }), F.period),
    h("p", { text: F.description }),
    L.github ? h("a", { class: "btn btn--primary", href: L.github, target: "_blank", rel: "noopener", text: "View GitHub repository" }) : null));
  fb.appendChild(h("div", { class: "featured__main" },
    F.objectives ? h("h3", { text: F.objectivesTitle || "Objectives" }) : null, F.objectives ? list(F.objectives, "list list--ticks") : null,
    h("h3", { text: "Methods and observables" }), list(F.methods, "list list--ticks")));
  fb.appendChild(h("div", { class: "featured__figs" },
    h("h3", { text: "Figures" }), figs));

  /* ---------- projects ---------- */
  if (L.github) $("#projects-gh").href = L.github;
  // One or several cover images for a project card (p.figure or p.figures)
  function cover(p) {
    var figs = p.figures || [p.figure];
    var box = h("div", { class: "covers covers--" + figs.length });
    figs.forEach(function (f) { box.appendChild(lightboxThumb(f, f.label)); });
    return box;
  }
  var pGrid = $("#projects-grid");
  S.projects.forEach(function (p) {
    var detail = h("div", { class: "detail" },
      h("h4", { text: "Methods" }), chips(p.methods),
      p.link ? h("a", { class: "textlink", href: p.link, target: "_blank", rel: "noopener", text: "Code / report ↗" })
             : h("p", { class: "muted", text: "Code or report link: not yet added." }));
    var parts = expandable(null, detail, "Methods & links");
    pGrid.appendChild(h("article", { class: "card reveal" },
      cover(p), h("h3", { text: p.title }), (("meta" in p ? p.meta : S.projectsMeta) ? h("p", { class: "muted", style: "font-size:.82rem", text: "meta" in p ? p.meta : S.projectsMeta }) : null), h("p", { text: p.description }), parts[0], parts[1]));
  });

  /* ---------- timelines ---------- */
  function timeline(root, items) {
    items.forEach(function (t) {
      var body = h("div", { class: "tl__body" },
        t.kind ? h("span", { class: "badge badge--" + t.kind.toLowerCase(), text: t.kind }) : null,
        h("h3", { text: t.title }), h("p", { class: "tl__org", text: t.org }), h("p", { text: t.detail }));
      if (t.courses) {
        var detail = h("div", { class: "detail" }, h("p", { class: "coursework__credits", text: t.courses.credits }));
        t.courses.groups.forEach(function (g) {
          detail.appendChild(h("h4", { text: g.label }));
          detail.appendChild(chips(g.items));
        });
        var parts = expandable(null, detail, "Coursework");
        body.appendChild(parts[0]); body.appendChild(parts[1]);
      }
      root.appendChild(h("li", { class: "tl reveal" }, h("p", { class: "tl__date", text: t.date }), body));
    });
  }
  timeline($("#timeline"), S.timeline);
  timeline($("#teaching-list"), S.teaching);
  timeline($("#fellowship-list"), S.fellowships);

  /* ---------- skills ---------- */
  S.skills.forEach(function (g) {
    $("#skills-grid").appendChild(h("div", { class: "card card--flat reveal" }, h("h3", { text: g.group }), chips(g.items)));
  });

  /* ---------- gallery ---------- */
  $("#interests-blurb").textContent = S.interestsBlurb;
  S.interests.forEach(function (g) {
    $("#gallery").appendChild(h("figure", { class: "gal reveal" },
      lightboxThumb({ src: g.src, label: g.title, alt: g.alt || g.caption, pos: g.pos }, g.title + ": " + g.caption),
      h("figcaption", null, h("strong", { text: g.title }), " " + g.caption)));
  });

  var R = S.recognition;
  if (R) {
    var rimgs = h("div", { class: "recog__imgs" });
    R.images.forEach(function (im) {
      rimgs.appendChild(h("figure", { class: "fig" }, lightboxThumb(im, im.label + ": " + im.caption), h("figcaption", { text: im.label })));
    });
    var rlinks = h("div", { class: "btns" });
    R.links.forEach(function (l) { rlinks.appendChild(h("a", { class: "btn", href: l.href, target: "_blank", rel: "noopener", text: l.label + " \u2197" })); });
    if (L.instagram) rlinks.appendChild(h("a", { class: "btn", href: L.instagram, target: "_blank", rel: "noopener", text: "Art on Instagram \u2197" }));
    $("#interests").appendChild(h("div", { class: "recog reveal" },
      h("div", null, h("span", { class: "badge", text: "Creative recognition" }), h("h3", { text: R.title }), h("p", { text: R.text }), rlinks), rimgs));
  }

  /* ---------- contact + footer ---------- */
  var cl = $("#contact-list");
  function contactRow(label, value, href, ext) {
    var body = href ? h("a", { href: href, target: ext ? "_blank" : null, rel: ext ? "noopener" : null, text: value })
                    : h("span", { class: "muted", text: value });
    cl.appendChild(h("li", null, h("span", { class: "contact__k", text: label }), body));
  }
  contactRow("Email", L.email || "Placeholder: add email in js/content.js", L.email ? "mailto:" + L.email : null);
  contactRow("GitHub", "github.com/Skrishna36", L.github, true);
  if (L.instagram) contactRow("Instagram", "instagram.com/krishnart0_0", L.instagram, true);
  contactRow("LinkedIn", L.linkedin ? L.linkedin.replace(/^https?:\/\/(www\.)?/, "") : "Placeholder: add LinkedIn URL in js/content.js", L.linkedin, true);
  if (L.scholar) contactRow("Google Scholar", "Profile", L.scholar, true);
  if (L.cv) cl.appendChild(h("li", null, h("span", { class: "contact__k", text: "CV" }),
    h("a", { class: "btn btn--primary", href: L.cv, download: "", text: "Download CV (PDF)" })));

  $("#footer-name").textContent = P.name + " · " + P.role + ", " + P.affiliation;
  var lu = $("#last-updated");
  lu.textContent = new Date(S.lastUpdated + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  lu.setAttribute("datetime", S.lastUpdated);

  /* ---------- theme ---------- */
  var root = document.documentElement, tbtn = $("#theme-toggle");
  function currentTheme() {
    return root.dataset.theme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function syncThemeBtn() {
    var dark = currentTheme() === "dark";
    tbtn.setAttribute("aria-pressed", String(dark));
    tbtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }
  tbtn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncThemeBtn();
  });
  syncThemeBtn();

  /* ---------- mobile menu ---------- */
  var menuBtn = $("#menu-toggle"), navEl = $("#nav");
  function setMenu(open) {
    navEl.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () { setMenu(!navEl.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navEl.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); }
  });

  /* ---------- sticky nav state + active link + reveals ---------- */
  window.addEventListener("scroll", function () { navEl.classList.toggle("is-stuck", window.scrollY > 8); }, { passive: true });
  if ("IntersectionObserver" in window) {
    var links = {};
    nav.querySelectorAll("a").forEach(function (a) { links[a.getAttribute("data-sec")] = a; });
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id === "featured" ? "research" : en.target.id;
        Object.keys(links).forEach(function (k) {
          if (k === id) links[k].setAttribute("aria-current", "true"); else links[k].removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { spy.observe(s); });

    var rv = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); rv.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) {
      if (reduceMotion) el.classList.add("in"); else rv.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();
