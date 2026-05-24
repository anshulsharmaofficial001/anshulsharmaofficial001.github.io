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
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (!isTouchDevice) {

// Hide default cursor
document.body.style.cursor = 'none';

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

// ===== THEME TOGGLE: HACKER VS EXECUTIVE MODE =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const themeText = themeToggle.querySelector('.theme-text');

// State flags
let isMatrixActive = true;

function setHackerMode() {
  document.body.classList.remove('executive-mode');
  themeIcon.className = 'fas fa-user-tie';
  themeText.textContent = 'Executive Mode';
  themeToggle.title = 'Switch to Executive Mode';
  localStorage.setItem('portfolio-theme', 'hacker');
  isMatrixActive = true;
}

function setExecutiveMode() {
  document.body.classList.add('executive-mode');
  themeIcon.className = 'fas fa-terminal';
  themeText.textContent = 'Hacker Mode';
  themeToggle.title = 'Switch to Hacker Mode';
  localStorage.setItem('portfolio-theme', 'executive');
  isMatrixActive = false;
  
  // Clear matrix canvas for performance in executive mode
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Load saved theme
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'executive') {
  setExecutiveMode();
} else {
  setHackerMode();
}

themeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('executive-mode')) {
    setHackerMode();
  } else {
    setExecutiveMode();
  }
});

// Update the Matrix Rain draw loop to respect isMatrixActive
const originalDrawMatrix = drawMatrix;
drawMatrix = function() {
  if (isMatrixActive) {
    originalDrawMatrix();
  }
};


// ===== INTERACTIVE 3D THREAT GLOBE =====
const globeCanvas = document.getElementById('threat-globe');
if (globeCanvas) {
  const gctx = globeCanvas.getContext('2d');
  
  let width = globeCanvas.width = 360;
  let height = globeCanvas.height = 360;
  let radius = 130;
  
  // High-density dot coordinate points (Latitude and Longitude rings)
  let points = [];
  const numLat = 16;
  const numLon = 24;
  
  for (let i = 0; i < numLat; i++) {
    let lat = (i / (numLat - 1)) * Math.PI - Math.PI / 2;
    for (let j = 0; j < numLon; j++) {
      let lon = (j / numLon) * 2 * Math.PI;
      points.push({
        x: radius * Math.cos(lat) * Math.cos(lon),
        y: radius * Math.sin(lat),
        z: radius * Math.cos(lat) * Math.sin(lon)
      });
    }
  }
  
  // Threat connections list
  let threatLines = [];
  
  // Interactive dragging variables
  let rotationX = 0.5;
  let rotationY = 0.5;
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  
  // Mouse and Touch listeners
  const startDrag = (clientX, clientY) => {
    isDragging = true;
    prevMouseX = clientX;
    prevMouseY = clientY;
  };
  
  const moveDrag = (clientX, clientY) => {
    if (!isDragging) return;
    let deltaX = clientX - prevMouseX;
    let deltaY = clientY - prevMouseY;
    
    rotationY += deltaX * 0.007;
    rotationX -= deltaY * 0.007;
    
    prevMouseX = clientX;
    prevMouseY = clientY;
  };
  
  const endDrag = () => {
    isDragging = false;
  };
  
  globeCanvas.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
  window.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
  window.addEventListener('mouseup', endDrag);
  
  globeCanvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY);
  });
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) moveDrag(e.touches[0].clientX, e.touches[0].clientY);
  });
  window.addEventListener('touchend', endDrag);
  
  // Generate random threat paths
  function spawnThreat() {
    if (threatLines.length > 5) return;
    
    let p1_idx = Math.floor(Math.random() * points.length);
    let p2_idx = Math.floor(Math.random() * points.length);
    while (p1_idx === p2_idx) {
      p2_idx = Math.floor(Math.random() * points.length);
    }
    
    threatLines.push({
      start: points[p1_idx],
      end: points[p2_idx],
      progress: 0,
      speed: 0.01 + Math.random() * 0.015,
      color: Math.random() > 0.4 ? 'rgba(0, 245, 255, 0.8)' : 'rgba(0, 255, 136, 0.8)'
    });
  }
  
  setInterval(spawnThreat, 2500);
  
  // Projection function (Perspective projection onto 2D viewport)
  function project(p, rx, ry) {
    let cosY = Math.cos(ry);
    let sinY = Math.sin(ry);
    let x1 = p.x * cosY - p.z * sinY;
    let z1 = p.x * sinY + p.z * cosY;
    
    let cosX = Math.cos(rx);
    let sinX = Math.sin(rx);
    let y2 = p.y * cosX - z1 * sinX;
    let z2 = p.y * sinX + z1 * cosX;
    
    let fov = 350;
    let distance = 260;
    let scale = fov / (distance + z2);
    
    return {
      x: width / 2 + x1 * scale,
      y: height / 2 + y2 * scale,
      z: z2,
      visible: z2 < radius * 0.8
    };
  }
  
  // Core globe rendering loop
  function drawGlobe() {
    gctx.clearRect(0, 0, width, height);
    
    const isExecutive = document.body.classList.contains('executive-mode');
    const baseColor = isExecutive ? '59, 130, 246' : '0, 245, 255';
    const gridColor = isExecutive ? 'rgba(59, 130, 246, 0.12)' : 'rgba(0, 245, 255, 0.12)';
    
    if (!isDragging) {
      rotationY += 0.002;
    }
    
    let projected = points.map(p => ({
      orig: p,
      proj: project(p, rotationX, rotationY)
    }));
    
    gctx.strokeStyle = gridColor;
    gctx.lineWidth = 0.5;
    
    for (let i = 0; i < numLat; i++) {
      gctx.beginPath();
      for (let j = 0; j < numLon; j++) {
        let p = projected[i * numLon + j];
        if (p.proj.visible) {
          if (j === 0) gctx.moveTo(p.proj.x, p.proj.y);
          else gctx.lineTo(p.proj.x, p.proj.y);
        }
      }
      gctx.stroke();
    }
    
    for (let j = 0; j < numLon; j++) {
      gctx.beginPath();
      for (let i = 0; i < numLat; i++) {
        let p = projected[i * numLon + j];
        if (p.proj.visible) {
          if (i === 0) gctx.moveTo(p.proj.x, p.proj.y);
          else gctx.lineTo(p.proj.x, p.proj.y);
        }
      }
      gctx.stroke();
    }
    
    projected.forEach(p => {
      if (p.proj.visible) {
        let depthAlpha = 0.35 + (radius - p.proj.z) / (2 * radius) * 0.65;
        gctx.fillStyle = `rgba(${baseColor}, ${depthAlpha * 0.7})`;
        gctx.beginPath();
        gctx.arc(p.proj.x, p.proj.y, depthAlpha * 1.5, 0, 2 * Math.PI);
        gctx.fill();
      }
    });
    
    threatLines.forEach((line, idx) => {
      let p1 = project(line.start, rotationX, rotationY);
      let p2 = project(line.end, rotationX, rotationY);
      
      if (p1.visible && p2.visible) {
        gctx.strokeStyle = isExecutive ? 'rgba(59, 130, 246, 0.4)' : line.color;
        gctx.lineWidth = 1.5;
        
        gctx.beginPath();
        gctx.moveTo(p1.x, p1.y);
        
        let midX = (p1.x + p2.x) / 2;
        let midY = (p1.y + p2.y) / 2;
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        let cx = midX - dy * (dist * 0.18 / dist);
        let cy = midY + dx * (dist * 0.18 / dist);
        
        gctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
        gctx.stroke();
        
        let t = line.progress;
        let signalX = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * cx + t * t * p2.x;
        let signalY = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * cy + t * t * p2.y;
        
        gctx.fillStyle = isExecutive ? '#10b981' : '#00ff88';
        gctx.beginPath();
        gctx.arc(signalX, signalY, 3.5, 0, 2 * Math.PI);
        gctx.fill();
        gctx.shadowBlur = 10;
        gctx.shadowColor = isExecutive ? '#10b981' : '#00ff88';
        gctx.fill();
        gctx.shadowBlur = 0;
      }
      
      line.progress += line.speed;
      if (line.progress >= 1) {
        threatLines.splice(idx, 1);
      }
    });
    
    requestAnimationFrame(drawGlobe);
  }
  
  drawGlobe();
}


// ===== REAL-TIME SOC LOG INTELLIGENCE CONSOLE =====
const threatConsole = document.getElementById('threat-console');
if (threatConsole) {
  
  const logEvents = [
    { type: 'info', msg: 'Intrusion Detection System (IDS) initialized.' },
    { type: 'info', msg: 'Security honeypot listener listening on Ports [21, 22, 80, 443].' },
    { type: 'warn', msg: 'Brute-force connection attempt blocked: root login attempt on SSH.' },
    { type: 'alert', msg: 'Port scan detected! 18 packets logged from IP 193.109.112.5.' },
    { type: 'success', msg: 'Malicious payload analysis complete: Trojan threat quarantined.' },
    { type: 'warn', msg: 'Suspicious HTTP GET request blocked: Directory Traversal vulnerability check (../etc/passwd).' },
    { type: 'info', msg: 'Encrypted tunnel verified: secure SHA-256 handshake complete.' },
    { type: 'alert', msg: 'API DDOS threat detected: rate limit exceeded on /api/auth.' },
    { type: 'success', msg: 'Automatic block updated: firewall blacklisted host IP 89.248.167.142.' },
    { type: 'warn', msg: 'Tor exit node connection identified from IP 185.220.101.44.' },
    { type: 'info', msg: 'Nmap recon sweep detected and passive logs generated.' },
    { type: 'success', msg: 'SOC scanner threat report compiled and dispatched.' }
  ];
  
  function getTimestamp() {
    const d = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    return `[${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}]`;
  }
  
  function addLogLine() {
    const isExecutive = document.body.classList.contains('executive-mode');
    
    let event = logEvents[Math.floor(Math.random() * logEvents.length)];
    
    const line = document.createElement('div');
    line.className = 'log-line';
    
    let typeClass = `log-${event.type}`;
    let typeText = event.type.toUpperCase();
    
    if (isExecutive && event.type === 'info') typeClass = 'log-info';
    if (isExecutive && event.type === 'warn') typeClass = 'log-warn';
    
    line.innerHTML = `<span class="log-time">${getTimestamp()}</span><span class="${typeClass}">[${typeText}]</span> ${event.msg}`;
    
    threatConsole.appendChild(line);
    
    threatConsole.scrollTop = threatConsole.scrollHeight;
    
    if (threatConsole.children.length > 50) {
      threatConsole.removeChild(threatConsole.firstChild);
    }
  }
  
  for (let i = 0; i < 4; i++) {
    setTimeout(addLogLine, i * 400);
  }
  
  function runConsoleTick() {
    addLogLine();
    let nextTick = 2000 + Math.random() * 2500;
    setTimeout(runConsoleTick, nextTick);
  }
  
  setTimeout(runConsoleTick, 3500);
}
