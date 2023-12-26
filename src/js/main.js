let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide() {
  for (let slide of slides) {
    slide.classList.remove('active');
  }

  slides[currentSlide].classList.add('active');
  currentSlide = (currentSlide + 1) % totalSlides;
}

setInterval(showSlide, 5000); // 5초마다 슬라이드 변경

document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = false; // 로그인 상태 시뮬레이션, 실제 구현에서는 서버로부터 상태를 가져오거나 쿠키/로컬 스토리지를 확인합니다.

  const loginLogoutButtons = document.querySelector('.login-logout-buttons');

  if (isLoggedIn) {
    loginLogoutButtons.innerHTML =
      '<a href="./logout.html" class="rounded bg-blue-400 px-4 py-2 text-center font-bold text-white hover:bg-blue-600">로그아웃</a>';
  } else {
    loginLogoutButtons.innerHTML =
      '<a href="./login.html" class="rounded bg-blue-400 px-4 py-2 text-center font-bold text-white hover:bg-blue-600">로그인</a>';
  }
});
