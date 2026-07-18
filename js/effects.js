/* ========================================
   AI Quest — Effects (Confetti & Particles)
   ======================================== */

const Effects = {
  // --- Floating Background Particles ---
  initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = 20;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (15 + Math.random() * 25) + 's';
      p.style.animationDelay = (Math.random() * 20) + 's';
      p.style.width = (2 + Math.random() * 3) + 'px';
      p.style.height = p.style.width;
      p.style.opacity = 0.1 + Math.random() * 0.3;
      const colors = ['rgba(139,92,246,0.4)', 'rgba(59,130,246,0.4)', 'rgba(6,182,212,0.4)'];
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      container.appendChild(p);
    }
  },

  // --- Confetti ---
  confetti(duration = 3000) {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
    const shapes = ['square', 'circle', 'strip'];

    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        w: 6 + Math.random() * 8,
        h: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
      });
    }

    const start = performance.now();

    function draw(now) {
      const elapsed = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (elapsed > duration) {
        // Fade out
        const fadeElapsed = elapsed - duration;
        const fadeDuration = 1000;
        if (fadeElapsed > fadeDuration) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
        pieces.forEach(p => p.opacity = 1 - fadeElapsed / fadeDuration);
      }

      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        ctx.fillStyle = p.color;
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'strip') {
          ctx.fillRect(-p.w / 2, -1, p.w, 2);
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      });

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  },

  // --- Star animation in result modal ---
  animateStars(count) {
    const container = document.getElementById('result-stars');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < 3; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      star.textContent = '⭐';
      if (i < count) {
        setTimeout(() => star.classList.add('animate'), 200 + i * 300);
      } else {
        star.classList.add('empty');
        setTimeout(() => star.classList.add('animate'), 200 + i * 300);
      }
      container.appendChild(star);
    }
  },

  // --- Screen shake (for wrong answers) ---
  shake(element) {
    element.classList.add('wrong');
    setTimeout(() => element.classList.remove('wrong'), 500);
  },

  // --- Smooth number counter ---
  countUp(element, from, to, duration = 800) {
    const start = performance.now();
    const diff = to - from;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + diff * eased);
      element.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }
};
