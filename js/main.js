/* ============================================
   hyeong™ 포트폴리오 — 공통 자바스크립트
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initImageLoadAnimations();
});

/* --- 헤더 스크롤 동작 (스크롤 다운 시 점차 사라지고 스크롤 업 시 다시 나타남) --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  const scrollThreshold = 15; // 미세 스크롤 무시 임계값

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY;

        // 최상단 근처일 때는 항상 표시
        if (currentScrollY <= 40) {
          header.classList.remove('is-hidden');
        } else if (Math.abs(diff) > scrollThreshold) {
          if (diff > 0) {
            // 아래로 스크롤 시 점차 위로 사라짐
            header.classList.add('is-hidden');
          } else {
            // 위로 스크롤 시 다시 나타남
            header.classList.remove('is-hidden');
          }
          lastScrollY = currentScrollY;
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
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
