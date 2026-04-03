const App = {
  init() {
    this.initProgressBar();
    this.initNavbar();
    this.initSmoothScroll();
    this.initEmailObfuscation();
    this.initAnimations();
  },

  initProgressBar() {
    const prog = document.getElementById('prog');
    if (!prog) return;

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      prog.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
  },

  initNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  },

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const navHeight = 68;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  },

  initEmailObfuscation() {
    const user = 'emmanuelmaende';
    const domain = 'gmail.com';
    const fullEmail = `${user}@${domain}`;

    const emailElements = document.querySelectorAll('#em1, #em2');
    emailElements.forEach(el => {
      if (el) {
        el.textContent = fullEmail;

        if (el.tagName.toLowerCase() === 'a' || el.closest('a')) {
          const link = el.tagName.toLowerCase() === 'a' ? el : el.closest('a');
          link.href = `mailto:${fullEmail}`;
        }
      }
    });
  },

  initAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.hiw-step, .wyg-card, .tc, .cs-row');
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
