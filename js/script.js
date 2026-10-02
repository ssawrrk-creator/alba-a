(() => {
  'use strict';

  // 予約先とInstagramのURLはconfig.jsで変更します。
  const config = window.ALBA_CONFIG || {};
  const safeUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' ? url.href : null;
    } catch {
      return null;
    }
  };
  const lineUrl = safeUrl(config.lineUrl);
  document.querySelectorAll('[data-line]').forEach(link => {
    if (lineUrl) {
      link.href = lineUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'LINEで予約する（新しいタブで開きます）');
    } else {
      link.href = '#line-status';
      link.addEventListener('click', () => document.getElementById('line-status').focus({ preventScroll: true }));
    }
  });
  if (lineUrl) {
    document.getElementById('line-status').textContent = '公式LINEが新しいタブで開きます。';
  }

  const instagramUrl = safeUrl(config.instagramUrl);
  if (instagramUrl) {
    document.querySelectorAll('[data-instagram]').forEach(link => {
      link.href = instagramUrl;
    });
  }

  // モバイルメニューはEscapeキー・リンク選択・外側クリックで閉じます。
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('navigation');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.innerHTML = open
      ? '閉じる <span aria-hidden="true">−</span>'
      : 'メニュー <span aria-hidden="true">＋</span>';
    nav.classList.toggle('is-open', open);
  };
  document.documentElement.classList.add('nav-ready');
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) {
      setMenu(false);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) {
      setMenu(false);
    }
  });
  const desktop = window.matchMedia('(min-width: 901px)');
  desktop.addEventListener('change', () => setMenu(false));

  // OSの「動きを減らす」設定では本文を最初から表示します。
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('reveal-pending');
      observer.observe(el);
    });
  }
  document.getElementById('year').textContent = new Date().getFullYear();
})();
