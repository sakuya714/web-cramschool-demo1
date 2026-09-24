/* ===================================================
   明進学院 - メインJS
   =================================================== */

// --- ヘッダースクロール ---
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 40);
});

// --- ハンバーガーメニュー ---
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav?.classList.toggle('open');
});
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
  });
});
document.addEventListener('click', e => {
  if (!hamburger?.contains(e.target) && !mobileNav?.contains(e.target)) {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
  }
});

// --- フェードインアニメーション ---
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// --- カウンターアニメーション ---
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// --- バーグラフアニメーション ---
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width || '0%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.bar-fill').forEach(el => {
  el.style.width = '0%';
  barObserver.observe(el);
});

// --- アクティブナビ ---
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a, .mobile-nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// --- フォーム送信 (contact.html) ---
const form = document.querySelector('.contact-form');
form?.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const success = form.querySelector('.form-success');
  btn.disabled = true;
  btn.textContent = '送信中...';
  try {
    await new Promise(r => setTimeout(r, 600));
    form.querySelector('.form-fields').style.display = 'none';
    if (success) { success.style.display = 'block'; }
  } catch {
    btn.disabled = false;
    btn.textContent = '送信する';
  }
});

// --- スムーズスクロール ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
