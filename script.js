// =========================================
// THEME TOGGLE
// =========================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  try { localStorage.setItem('mwa1im-theme', theme); } catch (e) {}
}

let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('mwa1im-theme') || 'dark'; } catch (e) {}
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  setTheme(current);
});

// =========================================
// MOBILE NAV
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  });
});

// =========================================
// TYPEWRITER EFFECT
// =========================================
const roles = ['Data Analyst', 'BI Analyst', 'Python Developer', 'Web Developer'];
const typedEl = document.getElementById('typedText');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();

// =========================================
// SCROLL REVEAL + STAT COUNTERS + SKILL BARS
// =========================================
const statNums = document.querySelectorAll('.stat-num');
const skillFills = document.querySelectorAll('.skill-fill');

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current + '+';
  }, 35);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statNums.forEach(animateCount);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillFills.forEach(fill => {
        fill.style.width = fill.getAttribute('data-width') + '%';
      });
      skillsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// =========================================
// ACTIVE NAV LINK ON SCROLL
// =========================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});
// =========================================
// CONTACT FORM — sends straight to WhatsApp
// =========================================
const contactForm = document.getElementById('contactForm');
const WHATSAPP_NUMBER = '254111494599'; // no + or leading zeros

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    const text =
      `Hi Mwalim, my name is ${name}.\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Subject: ${subject}\n\n` +
      `${message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = 'Opening WhatsApp… <i class="fa-brands fa-whatsapp"></i>';
    setTimeout(() => { btn.innerHTML = originalHTML; }, 2500);

    contactForm.reset();
  });
}

// =========================================
// FOOTER YEAR
// =========================================
document.getElementById('year').textContent = new Date().getFullYear();
