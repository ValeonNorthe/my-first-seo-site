/* main.js — lightweight, no dependencies */
(function () {
  'use strict';

  /* ── Theme ── */
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored) root.setAttribute('data-theme', stored);

  function toggleTheme() {
    const current = root.getAttribute('data-theme');
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    let next;
    if (!current) {
      next = sys === 'dark' ? 'light' : 'dark';
    } else {
      next = current === 'dark' ? 'light' : 'dark';
    }
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  document.querySelectorAll('.theme-btn').forEach(function (btn) {
    btn.addEventListener('click', toggleTheme);
  });

  /* ── Reading progress bar ── */
  var bar = document.querySelector('.progress-bar');
  if (bar) {
    function updateProgress() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
      bar.style.width = Math.min(pct, 100) + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ── Scroll-to-top button ── */
  var scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, { passive: true });
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
