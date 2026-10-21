// Theme toggle: cycles light -> dark -> system
const themeToggle = document.getElementById('themeToggle');
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const themeOrder = ['light', 'dark', 'system'];
const themeLabels = { light: 'Light', dark: 'Dark', system: 'System' };
const stored = localStorage.getItem('theme');
let themePref = stored === 'light' || stored === 'dark' ? stored : 'system';

function nextThemePref(pref) {
  return themeOrder[(themeOrder.indexOf(pref) + 1) % themeOrder.length];
}

function applyTheme(pref) {
  const resolved = pref === 'system' ? (darkQuery.matches ? 'dark' : 'light') : pref;
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.setAttribute('data-theme-pref', pref);
  const label = `Theme: ${themeLabels[pref]} (click for ${themeLabels[nextThemePref(pref)]})`;
  themeToggle.setAttribute('aria-label', label);
  themeToggle.setAttribute('title', label);
}

applyTheme(themePref);

themeToggle.addEventListener('click', () => {
  themePref = nextThemePref(themePref);
  if (themePref === 'system') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', themePref);
  }
  applyTheme(themePref);
});

darkQuery.addEventListener('change', () => {
  if (themePref === 'system') applyTheme(themePref);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Scroll-based fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in class to animatable elements
document.querySelectorAll('.section-title, .about-lead, .about-text p, .stat-card, .timeline-item, .skill-category, .contact-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Highlight the contact cards after "Get in Touch" scrolls to them
const getInTouch = document.querySelector('#hero a[href="#contact"]');
const contactCards = document.querySelectorAll('.contact-card');

// Calls callback when scrollY has not changed for a few frames
function onScrollSettled(callback) {
  let lastY = window.scrollY;
  let stableFrames = 0;
  function check() {
    if (window.scrollY === lastY) {
      stableFrames++;
    } else {
      stableFrames = 0;
      lastY = window.scrollY;
    }
    if (stableFrames >= 6) {
      callback();
    } else {
      requestAnimationFrame(check);
    }
  }
  requestAnimationFrame(check);
}

function highlightContactCards() {
  contactCards.forEach(card => {
    card.classList.remove('highlight');
    void card.offsetWidth; // restart the animation on repeat clicks
    card.classList.add('highlight');
  });
}

contactCards.forEach(card => {
  card.addEventListener('animationend', (e) => {
    if (e.animationName === 'contact-ring') card.classList.remove('highlight');
  });
});

if (getInTouch) {
  getInTouch.addEventListener('click', () => onScrollSettled(highlightContactCards));
}
