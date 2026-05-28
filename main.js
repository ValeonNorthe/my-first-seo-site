/* main.js — lightweight, no dependencies */

(function () {

  'use strict';

  /* ─────────────────────────
     Theme
  ───────────────────────── */

  const root = document.documentElement;

  const storedTheme = localStorage.getItem('theme');

  if (storedTheme) {
    root.setAttribute('data-theme', storedTheme);
  }

  function toggleTheme() {

    const currentTheme = root.getAttribute('data-theme');

    const systemTheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
      ? 'dark'
      : 'light';

    let nextTheme;

    if (!currentTheme) {

      nextTheme =
        systemTheme === 'dark'
          ? 'light'
          : 'dark';

    } else {

      nextTheme =
        currentTheme === 'dark'
          ? 'light'
          : 'dark';
    }

    root.setAttribute('data-theme', nextTheme);

    localStorage.setItem('theme', nextTheme);
  }

  document
    .querySelectorAll('.theme-btn')
    .forEach(function (button) {

      button.addEventListener(
        'click',
        toggleTheme
      );

    });

  /* ─────────────────────────
     Reading Progress Bar
  ───────────────────────── */

  const progressBar =
    document.querySelector('.progress-bar');

  if (progressBar) {

    function updateProgressBar() {

      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      progressBar.style.width =
        Math.min(progress, 100) + '%';
    }

    window.addEventListener(
      'scroll',
      updateProgressBar,
      { passive: true }
    );

    updateProgressBar();
  }

  /* ─────────────────────────
     Scroll To Top Button
  ───────────────────────── */

  const scrollTopButton =
    document.querySelector('.scroll-top');

  if (scrollTopButton) {

    function toggleScrollButton() {

      if (window.scrollY > 400) {

        scrollTopButton.classList.add('visible');

      } else {

        scrollTopButton.classList.remove('visible');
      }
    }

    window.addEventListener(
      'scroll',
      toggleScrollButton,
      { passive: true }
    );

    scrollTopButton.addEventListener(
      'click',
      function () {

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      }
    );
  }

})();