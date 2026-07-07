// Reveal on scroll — purely visual, has nothing to do with nav active state
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Animate skill bars (about page) when visible
  const fills = document.querySelectorAll('.fill[data-w]');
  const fio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        fio.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  fills.forEach(f => fio.observe(f));

  // Hero code-window progress bars
  document.querySelectorAll('.bar i[data-w]').forEach(b => {
    requestAnimationFrame(() => { b.style.width = b.dataset.w + '%'; });
  });

  // ---------- Mobile sidebar (burger) ----------
  // Nav links are static per-page (the "active" class is hardcoded in each
  // page's HTML) — there is no scroll listener that changes it.
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  function openSidebar() {
    navLinks.classList.add('open');
    overlay.classList.add('open');
    burger.classList.add('open');
    document.body.classList.add('locked');
  }
  function closeSidebar() {
    navLinks.classList.remove('open');
    overlay.classList.remove('open');
    burger.classList.remove('open');
    document.body.classList.remove('locked');
  }

  if (burger && navLinks && overlay) {
    burger.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    overlay.addEventListener('click', closeSidebar);
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeSidebar);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });
  }
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Animated stats counter
const statEls = document.querySelectorAll('.stat-value[data-target]');
const statIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = Math.floor(eased * target);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
      statIO.unobserve(el);
    }
  });
}, { threshold: 0.4 });
statEls.forEach(el => statIO.observe(el));

