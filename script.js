// NotDory Website - Interactive Behavior

(function () {
  'use strict';

  var html = document.documentElement;

  // --- Mobile Navigation Toggle ---
  var toggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Dark Mode Toggle (dark is the default) ---
  var themeToggle = document.getElementById('theme-toggle');

  function getPreferredTheme() {
    try {
      var saved = localStorage.getItem('notdory-theme');
      if (saved) return saved;
    } catch (e) { /* storage unavailable */ }
    return 'dark';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem('notdory-theme', theme); } catch (e) { /* storage unavailable */ }
  }

  // Apply on load (inline script in <head> already set the attribute; this keeps state in sync)
  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = html.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // --- Sticky Nav Scroll Effect ---
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY || window.pageYOffset;
    if (nav) {
      if (scrollY > 40) { nav.classList.add('scrolled'); }
      else { nav.classList.remove('scrolled'); }
    }
  }, { passive: true });

  // --- Harness Tab Switching (scoped per tab group) ---
  document.querySelectorAll('.sdk-tabs').forEach(function (tabGroup) {
    var panelsWrap = tabGroup.nextElementSibling;
    var groupTabs = tabGroup.querySelectorAll('.sdk-tab');

    groupTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var key = this.getAttribute('data-tab');

        groupTabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        if (panelsWrap) {
          panelsWrap.querySelectorAll('.sdk-panel').forEach(function (p) { p.classList.remove('active'); });
        }

        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        var target = document.getElementById('panel-' + key);
        if (target) { target.classList.add('active'); }
      });
    });
  });

  // --- Copy-to-clipboard for code blocks ---
  document.querySelectorAll('[data-copy]').forEach(function (block) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var code = block.querySelector('code');
      if (!code) return;
      // Strip the "$ " prompts so the copied text runs as-is
      var text = code.innerText.split('\n').map(function (line) {
        return line.replace(/^\$ /, '');
      }).join('\n');
      var done = function () {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      }
    });
    block.appendChild(btn);
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 68;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll-triggered Fade-in Animation ---
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.compare').forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.problem-card, .feature-card, .usecase-card, .benefit-item, .step, .arch-box, .arch-detail'
  ).forEach(function (el, i) {
    el.classList.add('fade-in');
    el.style.transitionDelay = (Math.min(i % 6, 5) * 0.06) + 's';
    observer.observe(el);
  });

  // Benchmark bars grow when they scroll into view
  document.querySelectorAll('.compare').forEach(function (el) { observer.observe(el); });

})();
