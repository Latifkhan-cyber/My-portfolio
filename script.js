/* ============================================================
   script.js — Latif Khan Portfolio (Biohub Designer Style)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. PRELOADER ── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      preloader.classList.add('hidden');
    });
    // Fallback: hide after 3s even if assets are slow
    setTimeout(function () {
      preloader.classList.add('hidden');
    }, 3000);
  }

  /* ── 2. STICKY HEADER ── */
  const header = document.getElementById('header');
  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ── 3. ACTIVE NAV LINK ON SCROLL ── */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function setActiveNav() {
    let current = '';
    sections.forEach(function (sec) {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
    mobileLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* ── 4. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = header ? header.offsetHeight + 8 : 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  /* ── 5. MOBILE MENU ── */
  const hamburger     = document.getElementById('hamburger');
  const mobileMenu    = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose   = document.getElementById('mobileClose');

  function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger)     hamburger.addEventListener('click', openMobileMenu);
  if (mobileClose)   mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  /* ── 6. TYPED TEXT EFFECT ── */
  const typedEl = document.getElementById('typed-text');
  const roles = [
    'React Applications.',
    'MERN Stack Apps.',
    'Django Backends.',
    'Firebase Projects.',
    'Responsive UIs.',
    'REST APIs.',
  ];
  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let typingTimer;

  function typeLoop() {
    const current = roles[roleIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      speed = 1800;          // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
      speed = 400;           // pause before next word
    }

    typingTimer = setTimeout(typeLoop, speed);
  }

  if (typedEl) typeLoop();

  /* ── 7. INVONHOVER GLOW (mouse-tracked radial) ── */
  document.querySelectorAll('.invonhover').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--y', (e.clientY - rect.top)  + 'px');
    });
  });

  /* ── 8. SCROLL REVEAL (lightweight AOS replacement) ── */
  const revealEls = document.querySelectorAll('[data-aos]');
  const revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || 0, 10);
        setTimeout(function () {
          entry.target.classList.add('aos-animate');
        }, delay);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) { revealObs.observe(el); });

  /* ── 9. COUNTER ANIMATION ── */
  const counterEls = document.querySelectorAll('.funfact-num[data-count]');
  const counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const end   = parseInt(el.dataset.count, 10);
      const dur   = 1800;
      const step  = Math.ceil(dur / end);
      let current = 0;
      const timer = setInterval(function () {
        current += 1;
        el.textContent = current + (end === 100 ? '' : '+');
        if (current >= end) {
          el.textContent = end + (end < 100 ? '+' : '%');
          clearInterval(timer);
        }
      }, step);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counterEls.forEach(function (el) { counterObs.observe(el); });

  /* ── 10. EMAILJS CONTACT FORM ──
     Setup steps (free, takes 2 min):
     1. Go to https://www.emailjs.com and create a free account
     2. Add an Email Service (Gmail) → copy your SERVICE ID
     3. Create an Email Template → copy your TEMPLATE ID
     4. Go to Account → copy your PUBLIC KEY
     5. Paste all three below and you're done — emails land in your inbox
  ── */
  var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
  var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
  var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // e.g. 'abcDEF123456'

  // Initialise EmailJS with your public key
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText   = document.getElementById('btnText');
  const btnIcon   = document.getElementById('btnIcon');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name  = document.getElementById('cname').value.trim();
      const email = document.getElementById('cemail').value.trim();
      const msg   = document.getElementById('cmsg').value.trim();

      if (!name || !email || !msg) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Check if EmailJS keys have been configured
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
        // Keys not yet set — open WhatsApp as fallback with the message
        var waText = 'Hello Latif! My name is ' + name +
                     '. My email: ' + email +
                     '. Message: ' + msg;
        var waUrl  = 'https://wa.me/923140972728?text=' + encodeURIComponent(waText);
        window.open(waUrl, '_blank');
        showToast('WhatsApp opened! (Add EmailJS keys to send email instead)', 'success');
        form.reset();
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      btnIcon.className = 'spinner';

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then(function () {
          showToast('Message sent! I\'ll reply to ' + email + ' soon.', 'success');
          form.reset();

          // Also open WhatsApp so client can chat instantly
          var waText = 'Hi Latif, I just sent you an email from your portfolio. My name is ' + name + '.';
          window.open('https://wa.me/923140972728?text=' + encodeURIComponent(waText), '_blank');
        })
        .catch(function (err) {
          console.error('EmailJS error:', err);
          showToast('Email failed. Opening WhatsApp instead...', 'error');
          var waText = 'Hello Latif! My name is ' + name +
                       '. Email: ' + email +
                       '. Message: ' + msg;
          window.open('https://wa.me/923140972728?text=' + encodeURIComponent(waText), '_blank');
        })
        .finally(function () {
          submitBtn.disabled = false;
          btnText.textContent = 'Send Message';
          btnIcon.className = 'fas fa-paper-plane';
        });
    });
  }

  /* ── 11. TOAST NOTIFICATION ── */
  function showToast(message, type) {
    // Remove any existing toast
    const existing = document.getElementById('toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    toast.style.cssText = [
      'position:fixed',
      'bottom:90px',
      'right:30px',
      'z-index:9999',
      'padding:14px 24px',
      'border-radius:8px',
      'font-family:"Poppins",sans-serif',
      'font-size:14px',
      'font-weight:600',
      'color:' + (type === 'success' ? '#070824' : '#fff'),
      'background:' + (type === 'success' ? '#93F2FF' : '#ff4d6d'),
      'box-shadow:0 8px 24px rgba(0,0,0,.35)',
      'transform:translateY(20px)',
      'opacity:0',
      'transition:all .35s ease',
    ].join(';');

    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity   = '1';
    });
    setTimeout(function () {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity   = '0';
      setTimeout(function () { toast.remove(); }, 400);
    }, 4000);
  }

  /* ── 12. BACK TO TOP ── */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 13. FOOTER YEAR ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

}); // end DOMContentLoaded
