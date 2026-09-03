/* ============================================
   hyeong™ 포트폴리오 — 공통 자바스크립트
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initImageLoadAnimations();
});

/* --- 헤더 스크롤 동작 --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleHeaderScroll(header);
        ticking = false;
      });
      ticking = true;
    }
  });
}

function handleHeaderScroll(header) {
  const currentScrollY = window.scrollY;

  // 스크롤 시 그림자 추가
  if (currentScrollY > 10) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

/* --- 모바일 메뉴 토글 --- */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('is-active');
    nav.classList.toggle('is-open');
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  });

  // 메뉴 링크 클릭 시 닫기
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('is-active');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

/* --- 스크롤 애니메이션 (Intersection Observer) --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .project-images img');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* --- 이미지 로드 애니메이션 --- */
function initImageLoadAnimations() {
  const images = document.querySelectorAll('.project-card__image-wrap img');
  images.forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });
}
