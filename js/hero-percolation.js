/* Interactive hero: a site-percolation lattice that responds to the cursor.
   Each site has a fixed random number u. It is occupied when u < p(x, y), where p is a
   base probability below the square-lattice site threshold (pc ~ 0.593) plus a Gaussian
   bump centred on the cursor. Near the cursor p exceeds pc and a large connected cluster
   (teal) appears; elsewhere only small clusters (grey) survive. Decorative, not research data. */
(function () {
  "use strict";
  var band = document.getElementById("top");
  var canvas = document.getElementById("hero-canvas");
  var readout = document.getElementById("hero-readout");
  if (!band || !canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  var CELL = 24, P0 = 0.46, BOOST = 0.34, SIGMA = 150, PC = 0.593;
  var cols, rows, w, h, dpr, u, occ, label, stack;
  var cur = { x: 0, y: 0, s: 0.7 }, tgt = { x: 0, y: 0, s: 0.7 };
  var raf = 0, hasPointer = false;

  function rand(seed) { // small deterministic generator so the pattern is stable
    return function () { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  }
  function resize() {
    var r = band.getBoundingClientRect();
    w = r.width; h = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    cols = Math.ceil(w / CELL); rows = Math.ceil(h / CELL);
    var n = cols * rows, g = rand(20250501);
    u = new Float32Array(n);
    for (var i = 0; i < n; i++) u[i] = g();
    occ = new Uint8Array(n); label = new Int32Array(n); stack = new Int32Array(n);
    if (!hasPointer) { tgt.x = cur.x = w * 0.72; tgt.y = cur.y = h * 0.45; }
    draw();
  }

  function colors() {
    var cs = getComputedStyle(document.documentElement);
    return { accent: cs.getPropertyValue("--accent").trim(), muted: cs.getPropertyValue("--muted").trim() };
  }

  function draw() {
    var n = cols * rows, i, x, y;
    var inv2s2 = 1 / (2 * SIGMA * SIGMA);
    for (i = 0; i < n; i++) {
      x = (i % cols + 0.5) * CELL - cur.x; y = ((i / cols | 0) + 0.5) * CELL - cur.y;
      occ[i] = u[i] < P0 + BOOST * cur.s * Math.exp(-(x * x + y * y) * inv2s2) ? 1 : 0;
    }
    // label connected clusters (4-neighbour), track the largest
    label.fill(0);
    var next = 0, best = 0, bestId = 0;
    for (i = 0; i < n; i++) {
      if (!occ[i] || label[i]) continue;
      var sp = 0, size = 0; next++; label[i] = next; stack[sp++] = i;
      while (sp) {
        var k = stack[--sp], kx = k % cols; size++;
        if (kx > 0 && occ[k - 1] && !label[k - 1]) { label[k - 1] = next; stack[sp++] = k - 1; }
        if (kx < cols - 1 && occ[k + 1] && !label[k + 1]) { label[k + 1] = next; stack[sp++] = k + 1; }
        if (k >= cols && occ[k - cols] && !label[k - cols]) { label[k - cols] = next; stack[sp++] = k - cols; }
        if (k < n - cols && occ[k + cols] && !label[k + cols]) { label[k + cols] = next; stack[sp++] = k + cols; }
      }
      if (size > best) { best = size; bestId = next; }
    }

    var c = colors(), pad = 3, s = CELL - pad * 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    for (i = 0; i < n; i++) {
      if (!occ[i]) continue;
      var big = label[i] === bestId;
      ctx.globalAlpha = big ? 0.26 : 0.1;
      ctx.fillStyle = big ? c.accent : c.muted;
      ctx.fillRect((i % cols) * CELL + pad, ((i / cols) | 0) * CELL + pad, s, s);
    }
    ctx.globalAlpha = 1;
    var pPeak = P0 + BOOST * cur.s;
    readout.textContent = "Site percolation · local p at cursor = " + pPeak.toFixed(2) +
      " (pᶜ ≈ " + PC + ") · largest cluster: " + best + " sites · " + (window.matchMedia("(pointer: coarse)").matches ? "touch the background" : "move your cursor");
  }

  function tick() {
    var dx = tgt.x - cur.x, dy = tgt.y - cur.y, ds = tgt.s - cur.s;
    var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cur.x += dx * (still ? 1 : 0.18); cur.y += dy * (still ? 1 : 0.18); cur.s += ds * (still ? 1 : 0.1);
    draw();
    raf = (Math.abs(dx) + Math.abs(dy) > 0.5 || Math.abs(ds) > 0.005) ? requestAnimationFrame(tick) : 0;
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }

  band.addEventListener("pointermove", function (e) {
    var r = band.getBoundingClientRect();
    hasPointer = true; tgt.x = e.clientX - r.left; tgt.y = e.clientY - r.top; tgt.s = 1;
    kick();
  });
  band.addEventListener("pointerleave", function () { tgt.s = 0.7; kick(); }); // settle at a gentle resting state

  var rt, lastW = 0, lastH = 0;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      var r = band.getBoundingClientRect();
      if (Math.abs(r.width - lastW) < 1 && Math.abs(r.height - lastH) < 120) return; // ignore mobile address-bar resizes
      lastW = r.width; lastH = r.height; resize();
    }, 120);
  });
  // redraw when the theme changes so colours follow
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", draw);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize);

  lastW = band.getBoundingClientRect().width; lastH = band.getBoundingClientRect().height;
  resize();
})();
