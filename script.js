const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const typingText = document.querySelector('.typing-text');
const year = document.querySelector('#year');
const backToTop = document.querySelector('#backToTop');
const contactForm = document.querySelector('#contactForm');
const formStatus = document.querySelector('.form-status');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
} else {
  body.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  const nextTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
  themeToggle.textContent = nextTheme === 'light' ? '🌙' : '☀️';
});

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const words = ['Java Developer', 'Software Developer', 'Full Stack Developer'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    charIndex += 1;
    typingText.textContent = currentWord.slice(0, charIndex);

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeWriter, 1200);
      return;
    }
  } else {
    charIndex -= 1;
    typingText.textContent = currentWord.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const speed = deleting ? 70 : 110;
  setTimeout(typeWriter, speed);
}

typeWriter();

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => revealObserver.observe(element));

if (year) {
  year.textContent = new Date().getFullYear();
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = (formData.get('name') || '').toString().trim();
  const email = (formData.get('email') || '').toString().trim();
  const subject = (formData.get('subject') || '').toString().trim();
  const message = (formData.get('message') || '').toString().trim();

  if (!name || !email || !subject || !message) {
    formStatus.textContent = 'Please fill in all fields before submitting.';
    formStatus.className = 'form-status error';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formStatus.textContent = 'Please enter a valid email address.';
    formStatus.className = 'form-status error';
    return;
  }

  formStatus.textContent = 'Thank you! Your message has been sent successfully.';
  formStatus.className = 'form-status success';
  contactForm.reset();
});
