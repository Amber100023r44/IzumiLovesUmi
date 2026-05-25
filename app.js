/* ══════════════════════════════════════════════
   app.js — Asmita Love Site
══════════════════════════════════════════════ */

/* ─── DATA ─────────────────────────────────── */
const NOTES = [
  { icon: '💌', msg: 'You are the first thought I have every morning and the last one every night.', sub: 'Every single day, without fail — that is you.' },
  { icon: '🌹', msg: 'Being loved by you is the greatest gift I have ever received.', sub: 'I never want to take a single second of it for granted.' },
  { icon: '🌙', msg: 'You make even the most ordinary moments feel magical.', sub: 'You turn regular days into my absolute favourite days.' },
  { icon: '✨', msg: 'I choose you. Again and again, every single day.', sub: 'A thousand times over, without a single hesitation.' },
  { icon: '🏠', msg: 'You are home. Wherever you are, that is where I want to be.', sub: "You are my favourite place in the entire world." },
  { icon: '🦋', msg: 'Your laugh is my favourite sound in the entire universe.', sub: 'I would travel the world just to hear it every day.' },
  { icon: '💍', msg: 'I am a better person because you are in my life.', sub: 'You inspire me just by being yourself — never stop.' },
  { icon: '💝', msg: 'Even on the hardest days, knowing you are mine makes everything okay.', sub: 'You are my calm in every single storm.' },
];

const CARD_DATA = [
  { icon: '🌷', text: '"You are the kind of person that stories are written about."' },
  { icon: '💞', text: '"My heart has never felt so full — that is because of you."' },
  { icon: '🌙', text: '"I fall a little more in love with you every single day, even when I cannot show it."' },
  { icon: '🍓', text: '"No matter what, you always got me — never ever forget that."' },
  { icon: '✨', text: '"You make my whole world soft, warm, and wonderfully good."' },
  { icon: '🌸', text: '"There is no one I would rather do life with than you."' },
];

const ENC_DATA = [
  {
    n: '01',
    text: 'Whatever hurdle you think you cannot cross — you are more ready than you think. You have worked hard. Believe in yourself the way I believe in you, and you will be unstoppable.',
    extra: 'You have done hard things before. This is just the next one.'
  },
  {
    n: '02',
    text: 'You are going to do great. Not just okay — truly great. I have watched you put in the effort, and I know exactly what you are capable of. The world does not stand a chance.',
    extra: 'I have a front-row seat to your brilliance, every single day.'
  },
  {
    n: '03',
    text: 'Even if it feels hard, you are not doing this alone. I am right here, in your corner, cheering you on every single step of the way — always, without question.',
    extra: 'Call me anytime. That is what I am here for.'
  },
  {
    n: '04',
    text: 'The world does not yet know what you are going to accomplish. I already do, and I cannot wait to be there watching you shine brighter than you even imagine.',
    extra: 'Mark my words. I will be the loudest one clapping.'
  },
];

const STAR_MSGS = [
  '',
  'Okay, I clearly need to step it up — more hugs incoming! 🤗',
  'Still not enough! I have so much more love for you. 💜',
  'Getting warmer! You deserve all five though. 🌸',
  'Almost! You deserve infinite stars. 💫',
  'Perfect — just like you. I love you so much. 💖',
];

const TICKER_ITEMS = [
  'you are loved', '✦', 'you are enough', '✦', 'you are incredible',
  '✦', 'you matter', '✦', 'i am proud of you', '✦',
  'you are seen', '✦', 'you are my favourite person', '✦',
  'you are doing amazing', '✦', 'keep going', '✦',
];

const KISS_EMOJIS = ['💋', '🌹', '💖', '✨', '🌸', '💝', '💕', '🌷', '💌', '💗'];

const PARTICLE_EMOJIS = ['🌸', '🌹', '✨', '💝', '🌷', '💫', '🦋'];

/* ─── STATE ─────────────────────────────────── */
let noteIdx = 0;
let kissCount = 0;
let savedCards = new Set();

/* ─── CURSOR ─────────────────────────────────── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  cursor.style.left      = e.clientX + 'px';
  cursor.style.top       = e.clientY + 'px';
});

// Smooth trail
(function animTrail() {
  requestAnimationFrame(animTrail);
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
})();
document.addEventListener('mousemove', e => {
  // Lerp handled via RAF below
  setTimeout(() => { trailX = e.clientX; trailY = e.clientY; }, 60);
});

// Cursor hover state on all interactive elements
function bindCursorHover() {
  document.querySelectorAll('button, a, .lcard, .enc-item, .star-btn, .mp-dot').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ─── CANVAS PARTICLES ─────────────────────── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const dots = Array.from({ length: 30 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: 1.5 + Math.random() * 3,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35,
  alpha: 0.1 + Math.random() * 0.25,
}));

function renderCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach(d => {
    d.x += d.vx; d.y += d.vy;
    if (d.x < 0) d.x = canvas.width;
    if (d.x > canvas.width) d.x = 0;
    if (d.y < 0) d.y = canvas.height;
    if (d.y > canvas.height) d.y = 0;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(244,143,177,${d.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(renderCanvas);
}
renderCanvas();

/* ─── SPLASH ─────────────────────────────────── */
function exitSplash() {
  const splash = document.getElementById('splash');
  const page   = document.getElementById('page');
  splash.classList.add('exit');
  page.classList.remove('hidden');
  setTimeout(() => page.classList.add('visible'), 50);
  setTimeout(() => { splash.style.display = 'none'; }, 900);
}
setTimeout(exitSplash, 2600);

/* ─── TICKER ─────────────────────────────────── */
function buildTicker() {
  const ticker = document.getElementById('ticker');
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  doubled.forEach(t => {
    const span = document.createElement('span');
    span.className = 'ticker-item';
    span.textContent = t;
    ticker.appendChild(span);
  });
}
buildTicker();

/* ─── LOVE CARDS ─────────────────────────────── */
function buildCards() {
  const grid = document.getElementById('cards-grid');
  CARD_DATA.forEach((c, i) => {
    const el = document.createElement('div');
    el.className = 'lcard reveal';
    el.innerHTML = `
      <span class="lcard-icon">${c.icon}</span>
      <p class="lcard-text">${c.text}</p>
      <button class="lcard-btn" data-i="${i}" aria-label="Save this note">
        <span class="lcard-heart">♡</span>
        <span class="lcard-btn-txt">feel loved</span>
      </button>
      <p class="lcard-saved-msg" id="saved-${i}"></p>
    `;
    // Button logic
    el.querySelector('.lcard-btn').addEventListener('click', e => {
      e.stopPropagation();
      const btn = e.currentTarget;
      const msg = document.getElementById(`saved-${i}`);
      const already = savedCards.has(i);

      if (!already) {
        savedCards.add(i);
        btn.classList.add('active');
        btn.querySelector('.lcard-heart').textContent = '♥';
        btn.querySelector('.lcard-btn-txt').textContent = 'saved ✓';
        msg.textContent = 'Kept in your heart 💕';
        msg.classList.add('show');
        spawnParticle('💕');
      } else {
        savedCards.delete(i);
        btn.classList.remove('active');
        btn.querySelector('.lcard-heart').textContent = '♡';
        btn.querySelector('.lcard-btn-txt').textContent = 'feel loved';
        msg.textContent = '';
        msg.classList.remove('show');
      }
    });

    // Card click flash
    el.addEventListener('click', () => {
      el.style.background = 'var(--rose-50)';
      el.style.transform = 'scale(1.02)';
      setTimeout(() => { el.style.background = ''; el.style.transform = ''; }, 400);
      spawnParticle(c.icon);
    });

    grid.appendChild(el);
  });
}
buildCards();

/* ─── ENCOURAGEMENTS ─────────────────────────── */
function buildEnc() {
  const grid = document.getElementById('enc-grid');
  ENC_DATA.forEach((e, i) => {
    const el = document.createElement('div');
    el.className = 'enc-item reveal';
    el.innerHTML = `
      <div class="enc-num">${e.n}</div>
      <p class="enc-text">${e.text}</p>
      <button class="enc-expand-btn" data-open="false">Read more ↓</button>
      <p class="enc-extra" id="enc-extra-${i}">${e.extra}</p>
    `;
    const btn   = el.querySelector('.enc-expand-btn');
    const extra = el.querySelector('.enc-extra');
    btn.addEventListener('click', () => {
      const open = btn.dataset.open === 'true';
      btn.dataset.open = !open;
      btn.textContent = open ? 'Read more ↓' : 'Show less ↑';
      extra.classList.toggle('open', !open);
    });
    grid.appendChild(el);
  });
}
buildEnc();

/* ─── STARS ─────────────────────────────────── */
function buildStars() {
  const row = document.getElementById('stars-row');
  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement('button');
    btn.className = 'star-btn reveal';
    btn.textContent = '💖';
    btn.setAttribute('aria-label', `${i} star${i > 1 ? 's' : ''}`);
    btn.dataset.val = i;
    btn.addEventListener('click', () => rateStars(i));
    btn.addEventListener('mouseenter', () => previewStars(i));
    btn.addEventListener('mouseleave', () => resetStarPreview());
    row.appendChild(btn);
  }
}

let currentStarRating = 0;
function rateStars(val) {
  currentStarRating = val;
  document.querySelectorAll('.star-btn').forEach((s, idx) => {
    s.classList.toggle('lit', idx < val);
  });
  const msg = document.getElementById('star-msg');
  msg.innerHTML = STAR_MSGS[val];
  msg.classList.add('show');
  if (val === 5) {
    setTimeout(() => { for (let j = 0; j < 8; j++) setTimeout(() => spawnParticle(PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)]), j * 120); }, 100);
  }
}
function previewStars(val) {
  document.querySelectorAll('.star-btn').forEach((s, idx) => {
    s.classList.toggle('lit', idx < val);
  });
}
function resetStarPreview() {
  document.querySelectorAll('.star-btn').forEach((s, idx) => {
    s.classList.toggle('lit', idx < currentStarRating);
  });
}
buildStars();

/* ─── NOTE MODAL ─────────────────────────────── */
function openModal() {
  updateModalNote();
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function updateModalNote() {
  const n = NOTES[noteIdx % NOTES.length];
  const icon    = document.getElementById('note-icon');
  const msg     = document.getElementById('note-msg');
  const sub     = document.getElementById('note-sub');
  const letter  = document.getElementById('env-letter');

  // quick fade
  letter.style.opacity = '0';
  letter.style.transform = 'translateY(8px)';
  setTimeout(() => {
    icon.textContent = n.icon;
    msg.textContent  = n.msg;
    sub.textContent  = n.sub;
    letter.style.transition = 'opacity 0.35s, transform 0.35s';
    letter.style.opacity = '1';
    letter.style.transform = 'none';
  }, 180);

  // progress dots
  document.querySelectorAll('.mp-dot').forEach((d, i) => {
    d.classList.toggle('active', i === noteIdx % NOTES.length);
  });
}

document.getElementById('open-note-btn').addEventListener('click', () => {
  noteIdx = 0;
  openModal();
});
document.getElementById('next-note-btn').addEventListener('click', () => {
  noteIdx++;
  updateModalNote();
  spawnParticle('💌');
});
document.getElementById('keep-note-btn').addEventListener('click', () => {
  closeModal();
  spawnParticle('💕');
  spawnParticle('🌸');
});
document.getElementById('modal-close-x').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// Progress dots clickable
document.querySelectorAll('.mp-dot').forEach(d => {
  d.addEventListener('click', () => {
    noteIdx = parseInt(d.dataset.i);
    updateModalNote();
  });
});

/* ─── HERO SCROLL BUTTON ─────────────────────── */
document.getElementById('scroll-down-btn').addEventListener('click', () => {
  document.getElementById('sec-cards').scrollIntoView({ behavior: 'smooth' });
});

/* ─── KISS BUTTON ─────────────────────────────── */
const orbCount  = document.getElementById('orb-count');
const kissNum   = document.getElementById('kiss-num');
const kissBurst = document.getElementById('kiss-burst');
let kissBurstTimeout;

document.getElementById('kiss-btn').addEventListener('click', () => {
  kissCount++;

  // Update counters
  kissNum.textContent = kissCount;
  orbCount.textContent = kissCount;

  // Pop animation
  kissNum.classList.remove('pop');
  orbCount.classList.remove('pop');
  void kissNum.offsetWidth;
  kissNum.classList.add('pop');
  orbCount.classList.add('pop');
  setTimeout(() => { kissNum.classList.remove('pop'); orbCount.classList.remove('pop'); }, 400);

  // Burst emojis
  clearTimeout(kissBurstTimeout);
  kissBurst.innerHTML = '';
  const count = Math.min(5 + Math.floor(kissCount / 5), 14);
  for (let i = 0; i < count; i++) {
    const em = document.createElement('span');
    em.className = 'k-em';
    em.textContent = KISS_EMOJIS[Math.floor(Math.random() * KISS_EMOJIS.length)];
    em.style.animationDelay = i * 45 + 'ms';
    kissBurst.appendChild(em);
  }
  kissBurstTimeout = setTimeout(() => { kissBurst.innerHTML = ''; }, 3500);

  // Floating particles
  for (let i = 0; i < 2; i++) {
    setTimeout(() => spawnParticle(KISS_EMOJIS[Math.floor(Math.random() * KISS_EMOJIS.length)]), i * 80);
  }
});

/* ─── RESTART ─────────────────────────────────── */
document.getElementById('restart-btn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => {
    noteIdx = 0;
    openModal();
  }, 800);
});

/* ─── PARTICLE SPAWN ─────────────────────────── */
function spawnParticle(emoji) {
  const el = document.createElement('div');
  el.className = 'particle';
  el.textContent = emoji;
  el.style.left = (10 + Math.random() * 80) + '%';
  el.style.fontSize = (14 + Math.random() * 14) + 'px';
  const dur = 3 + Math.random() * 3;
  el.style.animationDuration = dur + 's';
  el.style.animationTimingFunction = 'linear';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}

/* ─── SCROLL REVEAL ─────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
      // Stagger children
      entry.target.querySelectorAll('.reveal').forEach((child, i) => {
        setTimeout(() => child.classList.add('vis'), i * 80);
      });
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ─── INIT ─────────────────────────────────── */
bindCursorHover();

// Periodic ambient particles
setInterval(() => {
  spawnParticle(PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)]);
}, 4000);

// Keyboard: Escape closes modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
