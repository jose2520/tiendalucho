/* Canvas Animations - Senior-grade, performance-aware
   - Hero wave / light animation
   - Particles background for product grid
   Features: High-DPI support, resize handling, pause on hidden tab, reduced-motion respect
*/
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rafLoop(fn) {
    let frame = null;
    let running = false;
    function loop(t) { if (!running) return; frame = requestAnimationFrame(loop); fn(t); }
    return {
      start() { if (!running) { running = true; frame = requestAnimationFrame(loop); } },
      stop() { running = false; if (frame) cancelAnimationFrame(frame); frame = null; }
    };
  }

  function resizeCanvasToDisplaySize(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(0, Math.floor(rect.width * dpr));
    const height = Math.max(0, Math.floor(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    }
    return false;
  }
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return null;
    if (prefersReducedMotion) return null;
    const ctx = canvas.getContext('2d');

    let width = 0, height = 0;
    const self = { config: {} };
    const waves = [
      { amplitude: 18, wavelength: 0.006, speed: 0.0009, y: 0.6 },
      { amplitude: 28, wavelength: 0.004, speed: 0.0006, y: 0.7 },
    ];

    function onResize() {
      const changed = resizeCanvasToDisplaySize(canvas);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      return changed;
    }

    let last = performance.now();
    function draw(t) {
      const now = t || performance.now();
      const dt = now - last; last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cfg = self.config || {};
      const waveColorA = cfg.waveColorA || 'rgba(255,255,255,0.06)';
      const waveColorB = cfg.waveColorB || 'rgba(255,200,200,0.03)';
      const lightBase = cfg.lightColor || '200,20,46';

      // subtle moving radial light
      const grd = ctx.createRadialGradient(width * 0.8, height * 0.2, 10, width * 0.5, height * 0.4, Math.max(width, height));
      const lx = (Math.sin(now * 0.0003) + 1) / 2; // 0..1
      grd.addColorStop(0, `rgba(${lightBase},${0.08 * (0.6 + 0.4 * lx)})`);
      grd.addColorStop(0.6, `rgba(${lightBase},0.02)`);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      // layered sine waves (soft highlight)
      ctx.lineWidth = 1.2;
      waves.forEach((w, idx) => {
        ctx.beginPath();
        const amp = w.amplitude * (1 + 0.08 * Math.sin(now * 0.0012 + idx));
        const freq = w.wavelength;
        const speed = (cfg.waveSpeedMultiplier || 1) * w.speed;
        for (let x = 0; x <= width; x += 8) {
          const y = height * w.y + Math.sin((x * freq * width) + now * speed) * amp * (cfg.waveAmplitudeMultiplier || 1);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = idx === 0 ? (cfg.waveColorA || waveColorA) : (cfg.waveColorB || waveColorB);
        ctx.stroke();
      });

      // gentle vignette
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, height - 120, width, 120);
    }

    const loop = rafLoop(draw);

    function start() { if (!document.hidden) loop.start(); }
    function stop() { loop.stop(); }

    // lifecycle
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });
    start();

    return Object.assign(self, { start, stop, onResize });
  }
  /* ------- PARTICLES BACKGROUND ------- */
  function initParticlesCanvas() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return null;
    if (prefersReducedMotion) return null;
    const ctx = canvas.getContext('2d');

    let width = 0, height = 0;
    let particles = [];
    let maxParticles = 80;

    function Particle(x, y, vx, vy, r) {
      this.x = x; this.y = y; this.vx = vx; this.vy = vy; this.r = r;
    }
    Particle.prototype.update = function (dt) {
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    };

    function createParticles() {
      particles = [];
      const area = width * height;
      // Base count scaled to area, but can be overridden by userDensity if provided
      let computed = Math.min(140, Math.max(20, Math.floor(area / 6000)));
      if (typeof self.userDensity === 'number') {
        // userDensity is a desired particle count (approx)
        computed = Math.min(200, Math.max(8, Math.floor(self.userDensity)));
      }
      maxParticles = computed;
      for (let i = 0; i < maxParticles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const speed = 0.02 + Math.random() * 0.08;
        const angle = Math.random() * Math.PI * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const r = 1 + Math.random() * 2.2;
        particles.push(new Particle(x, y, vx, vy, r));
      }
    }

    function onResize() {
      const changed = resizeCanvasToDisplaySize(canvas);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      createParticles();
      return changed;
    }

    let last = performance.now();
    function draw(t) {
      const now = t || performance.now();
      const dt = Math.min(40, now - last); // clamp dt for frameskip safety
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background subtle overlay
      // ctx.fillStyle = 'rgba(18,18,18,0.02)';
      // ctx.fillRect(0,0,width,height);

      // update and draw particles
      const cfg = self.config || {};
      const particleColor = cfg.particleColor || '255,255,255';
      const particleAlpha = typeof cfg.particleAlpha === 'number' ? cfg.particleAlpha : 0.55;
      ctx.fillStyle = `rgba(${particleColor},${particleAlpha})`;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(dt);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // draw connections
      const threshold = Math.min(120, Math.max(60, Math.hypot(width, height) * 0.04));
      const thresholdSq = threshold * threshold;
      const lineColor = cfg.lineColor || '255,255,255';
      const lineAlphaMultiplier = cfg.lineAlphaMultiplier || 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < thresholdSq) {
            const dist = Math.sqrt(distSq);
            const alpha = 0.12 * (1 - dist / threshold) * lineAlphaMultiplier;
            ctx.strokeStyle = `rgba(${lineColor},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    const loop = rafLoop(draw);

    function start() { if (!document.hidden) loop.start(); }
    function stop() { loop.stop(); }

    // lifecycle
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });
    start();

    return Object.assign(self, { start, stop, onResize });
  }

  // Expose control API and initialize both (DOM-ready)
  function initAll() {
    try {
      const heroInstance = initHeroCanvas();
      const particlesInstance = initParticlesCanvas();

      // Settings persistence
      const KEY = 'luchoDIAZCanvasSettings_v1';
      const defaultSettings = { hero: true, particles: true, particlesDensity: 80 };
      function loadSettings() {
        try { return Object.assign({}, defaultSettings, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch { return defaultSettings; }
      }
      function saveSettings(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

      let settings = loadSettings();

      // UI hookup (create controls if present in DOM)
      const btn = document.getElementById('canvas-settings-btn');
      const panel = document.getElementById('canvas-settings-panel');
      const chkHero = document.getElementById('toggle-hero');
      const chkParticles = document.getElementById('toggle-particles');
      const rangeParticles = document.getElementById('particles-density');
      const resetBtn = document.getElementById('reset-canvas-settings');

      function applySettings() {
        settings.hero ? heroInstance && heroInstance.start && heroInstance.start() : heroInstance && heroInstance.stop && heroInstance.stop();
        settings.particles ? particlesInstance && particlesInstance.start && particlesInstance.start() : particlesInstance && particlesInstance.stop && particlesInstance.stop();
        // adjust particle density via localStorage value; to apply, trigger a resize-like recalculation
        if (particlesInstance && particlesInstance.onResize) {
          // store desired maxParticles in a data attribute so onResize can use it
          particlesInstance.userDensity = settings.particlesDensity;
          particlesInstance.onResize();
        }
        saveSettings(settings);
        if (chkHero) chkHero.checked = !!settings.hero;
        if (chkParticles) chkParticles.checked = !!settings.particles;
        if (rangeParticles) rangeParticles.value = settings.particlesDensity;
      }

      if (btn && panel) {
        btn.addEventListener('click', () => {
          const open = panel.classList.toggle('open');
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        });
      }

      if (chkHero) chkHero.addEventListener('change', (e) => { settings.hero = e.target.checked; applySettings(); });
      if (chkParticles) chkParticles.addEventListener('change', (e) => { settings.particles = e.target.checked; applySettings(); });
      if (rangeParticles) rangeParticles.addEventListener('input', (e) => { settings.particlesDensity = parseInt(e.target.value, 10); applySettings(); });
      if (resetBtn) resetBtn.addEventListener('click', () => { settings = Object.assign({}, defaultSettings); applySettings(); });

      // Apply initially
      applySettings();
      // Return instances for debugging if needed
      window._luchoDIAZCanvas = { heroInstance, particlesInstance, settings };
    } catch (err) {
      // fail silently - don't break main app
      console.error('Canvas animations failed to initialize:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
