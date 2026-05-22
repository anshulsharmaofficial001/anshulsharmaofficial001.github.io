// ===== MATRIX RAIN =====
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]|/\\';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(5, 10, 14, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00f5ff';
  ctx.font = fontSize + 'px Share Tech Mono';

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillStyle = Math.random() > 0.95 ? '#00ff88' : '#00f5ff';
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops.length = columns;
  drops.fill(1);
});

// ===== TYPEWRITER =====
const roles = [
  'Penetration Tester',
  'Cyber Security Researcher',
  'SOC Analyst',
  'Ethical Hacker',
  'OSINT Specialist',
  'CTF Player'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeWriter, speed);
}
typeWriter();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .timeline-item, .cert-card, .ctf-card, .stat-box, .contact-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--cyan)';
    }
  });
});

// ===== FUTURISTIC CURSOR (Desktop Only) =====

// Mobile/touch device pe cursor effect nahi chalega
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
if (isTouchDevice) {
  // Mobile pe kuch nahi karna, skip
} else {

// Hide default cursor
document.body.style.cursor = 'none';

// Main cursor dot
const cursorDot = document.createElement('div');
cursorDot.id = 'cursor-dot';
cursorDot.style.cssText = `
  position: fixed;
  width: 8px;
  height: 8px;
  background: #00f5ff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #00f5ff, 0 0 20px #00f5ff;
  transition: width 0.2s, height 0.2s, background 0.2s;
`;
document.body.appendChild(cursorDot);

// Outer ring
const cursorRing = document.createElement('div');
cursorRing.id = 'cursor-ring';
cursorRing.style.cssText = `
  position: fixed;
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(0,245,255,0.7);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99998;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, border-color 0.3s;
`;
document.body.appendChild(cursorRing);

// Crosshair lines
const crossH = document.createElement('div');
crossH.style.cssText = `
  position: fixed;
  width: 20px;
  height: 1px;
  background: rgba(0,245,255,0.5);
  pointer-events: none;
  z-index: 99997;
  transform: translate(-50%, -50%);
`;
document.body.appendChild(crossH);

const crossV = document.createElement('div');
crossV.style.cssText = `
  position: fixed;
  width: 1px;
  height: 20px;
  background: rgba(0,245,255,0.5);
  pointer-events: none;
  z-index: 99997;
  transform: translate(-50%, -50%);
`;
document.body.appendChild(crossV);

// Large ambient glow
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 99996;
  transform: translate(-50%, -50%);
`;
document.body.appendChild(glow);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Dot & crosshair follow instantly
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
  crossH.style.left = mouseX + 'px';
  crossH.style.top = mouseY + 'px';
  crossV.style.left = mouseX + 'px';
  crossV.style.top = mouseY + 'px';
  glow.style.left = mouseX + 'px';
  glow.style.top = mouseY + 'px';

  // Spawn trail particle
  spawnParticle(mouseX, mouseY);
});

// Ring follows with lag (smooth)
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .cert-card, .ctf-card').forEach(el => {
  el.style.cursor = 'none';
  el.addEventListener('mouseenter', () => {
    cursorDot.style.width = '12px';
    cursorDot.style.height = '12px';
    cursorDot.style.background = '#00ff88';
    cursorDot.style.boxShadow = '0 0 15px #00ff88, 0 0 30px #00ff88';
    cursorRing.style.width = '55px';
    cursorRing.style.height = '55px';
    cursorRing.style.borderColor = 'rgba(0,255,136,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
    cursorDot.style.background = '#00f5ff';
    cursorDot.style.boxShadow = '0 0 10px #00f5ff, 0 0 20px #00f5ff';
    cursorRing.style.width = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'rgba(0,245,255,0.7)';
  });
});

// Special cursor for scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('mouseenter', () => {
    cursorDot.style.width = '6px';
    cursorDot.style.height = '16px';
    cursorDot.style.borderRadius = '3px';
    cursorDot.style.background = '#00f5ff';
    cursorDot.style.boxShadow = '0 0 15px #00f5ff, 0 0 30px #00f5ff';
    cursorRing.style.width = '45px';
    cursorRing.style.height = '45px';
    cursorRing.style.borderColor = 'rgba(0,245,255,1)';
    cursorRing.style.borderStyle = 'dashed';
    cursorRing.style.animation = 'spin 1s linear infinite';
  });
  scrollIndicator.addEventListener('mouseleave', () => {
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.background = '#00f5ff';
    cursorDot.style.boxShadow = '0 0 10px #00f5ff, 0 0 20px #00f5ff';
    cursorRing.style.width = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'rgba(0,245,255,0.7)';
    cursorRing.style.borderStyle = 'solid';
    cursorRing.style.animation = '';
  });
}

// Click ripple effect
document.addEventListener('click', (e) => {
  // Ripple
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    width: 6px;
    height: 6px;
    border: 2px solid #00f5ff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 99995;
    transform: translate(-50%, -50%);
    animation: rippleOut 0.6s ease-out forwards;
  `;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);

  // Dot pulse
  cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
  setTimeout(() => { cursorDot.style.transform = 'translate(-50%, -50%) scale(1)'; }, 150);
});

// Trail particles
let lastParticleTime = 0;
function spawnParticle(x, y) {
  const now = Date.now();
  if (now - lastParticleTime < 40) return;
  lastParticleTime = now;

  const p = document.createElement('div');
  const size = Math.random() * 4 + 2;
  const angle = Math.random() * Math.PI * 2;
  const dist = Math.random() * 15 + 5;
  p.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    background: ${Math.random() > 0.5 ? '#00f5ff' : '#00ff88'};
    border-radius: 50%;
    pointer-events: none;
    z-index: 99994;
    transform: translate(-50%, -50%);
    opacity: 0.8;
    transition: all 0.5s ease-out;
  `;
  document.body.appendChild(p);

  requestAnimationFrame(() => {
    p.style.left = (x + Math.cos(angle) * dist) + 'px';
    p.style.top = (y + Math.sin(angle) * dist) + 'px';
    p.style.opacity = '0';
    p.style.transform = 'translate(-50%, -50%) scale(0)';
  });

  setTimeout(() => p.remove(), 500);
}

} // end desktop-only cursor block

// ===== STAGGERED CARD ANIMATIONS =====
function staggerCards(selector, delay = 100) {
  const cards = document.querySelectorAll(selector);
  cards.forEach((card, i) => {
    card.style.transitionDelay = (i * delay) + 'ms';
  });
}
staggerCards('.skill-card', 80);
staggerCards('.project-card', 80);
