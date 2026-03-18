// ── Mobile Navigation Toggle ──
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ── Active Nav Link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Theme Toggle ──
const themeBtn = document.querySelector('.theme-toggle');
if (themeBtn) {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light-theme');

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeBtn.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  if (document.body.classList.contains('light-theme')) {
    themeBtn.textContent = '🌙';
  }
}

// ── Contact Form Validation ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Reset
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

    if (!name.value.trim()) {
      name.closest('.form-group').classList.add('error');
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
      email.closest('.form-group').classList.add('error');
      valid = false;
    }

    if (!message.value.trim()) {
      message.closest('.form-group').classList.add('error');
      valid = false;
    }

    if (valid) {
      showToast('Message sent successfully!');
      contactForm.reset();
    }
  });
}

// ── Toast Notification ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Skill Bar Animation ──
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const target = bar.getAttribute('data-width');
    bar.style.width = target;
  });
}

// ── Fade-in on Scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('skills-grid')) {
        animateSkillBars();
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Run skill bars if already visible
if (document.querySelector('.skills-grid')) {
  setTimeout(animateSkillBars, 500);
}
