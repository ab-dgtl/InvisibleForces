/* Лёгкое звёздное поле на фоне — исчезает при reduce-motion */
(function () {
  var canvas = document.getElementById('starfield');
  if (!canvas) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx = canvas.getContext('2d');
  var stars = [];
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function build() {
    var count = Math.round(Math.min(170, (w * h) / 11000));
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.25 + 0.35,
        a: Math.random() * 0.6 + 0.18,
        s: Math.random() * 0.012 + 0.003,
        p: Math.random() * Math.PI * 2,
        gold: Math.random() > 0.72
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < stars.length; i++) {
      var st = stars[i];
      st.p += st.s;
      var alpha = st.a + Math.sin(st.p) * 0.22;
      if (alpha < 0.05) alpha = 0.05;
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = st.gold
        ? 'rgba(217, 188, 99, ' + alpha.toFixed(3) + ')'
        : 'rgba(226, 216, 255, ' + alpha.toFixed(3) + ')';
      ctx.fill();
    }
    if (!reduce) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  if (reduce) {
    draw();
  } else {
    requestAnimationFrame(draw);
  }
})();
