(() => {
  'use strict';

  // URLはconfig.jsで一括管理。LINEが未設定の間はページ内の案内へ移動します。
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
  const lineStatus = document.getElementById('line-status');

  document.querySelectorAll('[data-line]').forEach((link) => {
    if (lineUrl) {
      link.href = lineUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'LINEで予約する（新しいタブで開きます）');
    } else {
      link.href = '#line-status';
      link.addEventListener('click', () => {
        // オーバーレイを閉じてから案内にフォーカスを渡します。
        requestAnimationFrame(() => lineStatus.focus({ preventScroll: true }));
      });
    }
  });

  if (lineUrl) {
    lineStatus.textContent = '公式LINEが新しいタブで開きます。';
  }

  const instagramUrl = safeUrl(config.instagramUrl);
  if (instagramUrl) {
    document.querySelectorAll('[data-instagram]').forEach((link) => {
      link.href = instagramUrl;
    });
  }

  const header = document.querySelector('.header');
  const toggle = document.querySelector('.nav-toggle');
  const toggleLabel = document.querySelector('.nav-toggle-label');
  const nav = document.getElementById('navigation');
  const main = document.getElementById('main');
  const footer = document.querySelector('footer');
  const floatingCta = document.querySelector('.mobile-reserve');
  const heroCta = document.querySelector('.hero [data-line]');
  const finalCta = document.querySelector('.reservation [data-line]');
  const compactViewport = window.matchMedia('(max-width: 900px)');
  const mobileViewport = window.matchMedia('(max-width: 600px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let menuOpen = false;

  // HEROの予約ボタンを通過してから表示。最後の予約ボタン以降は表示しません。
  // ページ先頭・短い画面・スクロールの戻り・直接アンカーアクセスにも対応します。
  const updateFloatingCta = () => {
    const headerBottom = header.getBoundingClientRect().bottom;
    const heroPassed = heroCta.getBoundingClientRect().bottom <= headerBottom;
    const finalReached = finalCta.getBoundingClientRect().top < window.innerHeight;
    const visible = mobileViewport.matches && heroPassed && !finalReached && !menuOpen;

    if (!visible && floatingCta.contains(document.activeElement) && finalReached) {
      finalCta.focus({ preventScroll: true });
    }
    floatingCta.classList.toggle('is-visible', visible);
    floatingCta.inert = !visible;
    floatingCta.setAttribute('aria-hidden', String(!visible));
  };

  // オーバーレイ中は本文へのフォーカスを止め、閉じたら通常の閲覧に戻します。
  const setMenu = (open, restoreFocus = false) => {
    menuOpen = open && compactViewport.matches;
    toggle.setAttribute('aria-expanded', String(menuOpen));
    toggle.setAttribute('aria-label', menuOpen ? 'メニューを閉じる' : 'メニューを開く');
    toggleLabel.textContent = menuOpen ? 'CLOSE' : 'MENU';
    nav.classList.toggle('is-open', menuOpen);
    document.body.classList.toggle('menu-open', menuOpen);
    main.inert = menuOpen;
    footer.inert = menuOpen;
    nav.inert = compactViewport.matches && !menuOpen;
    if (compactViewport.matches && !menuOpen) {
      nav.setAttribute('aria-hidden', 'true');
    } else {
      nav.removeAttribute('aria-hidden');
    }
    updateFloatingCta();
    if (restoreFocus) {
      toggle.focus({ preventScroll: true });
    }
  };

  document.documentElement.classList.add('nav-ready');
  toggle.addEventListener('click', () => setMenu(!menuOpen));
  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    setMenu(false);
    if (link.hash && link.origin === location.origin) {
      const target = document.querySelector(link.hash);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  });
  header.querySelector('.brand').addEventListener('click', () => setMenu(false));

  document.addEventListener('keydown', (event) => {
    if (!menuOpen) return;
    if (event.key === 'Escape') {
      setMenu(false, true);
    }
    if (event.key === 'Tab') {
      const focusable = [header.querySelector('.brand'), toggle, ...nav.querySelectorAll('a')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  compactViewport.addEventListener('change', () => {
    setMenu(false);
    updateScrollState();
  });
  mobileViewport.addEventListener('change', updateFloatingCta);

  // 縮小と復帰に別のしきい値を持たせ、ヘッダーの高さ変更でちらつくのを防ぎます。
  function updateScrollState() {
    if (!compactViewport.matches || window.scrollY <= 12) {
      header.classList.remove('is-compact');
    } else if (window.scrollY > 96) {
      header.classList.add('is-compact');
    }
    updateFloatingCta();
  }

  let scrollQueued = false;
  const scheduleScrollUpdate = () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      updateScrollState();
      scrollQueued = false;
    });
  };
  window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
  window.addEventListener('resize', scheduleScrollUpdate);
  window.addEventListener('pageshow', scheduleScrollUpdate);

  if ('IntersectionObserver' in window) {
    const ctaObserver = new IntersectionObserver(updateFloatingCta, { threshold: [0, 1] });
    ctaObserver.observe(heroCta);
    ctaObserver.observe(finalCta);
  }

  // OSの「動きを減らす」を尊重。通常表示もスクロール後に一度だけ表示します。
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => {
      element.classList.add('reveal-pending');
      observer.observe(element);
    });
  }

  setMenu(false);
  updateScrollState();
  document.getElementById('year').textContent = new Date().getFullYear();
})();
