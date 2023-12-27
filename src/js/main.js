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

document.addEventListener('DOMContentLoaded', function () {
  // 즉시 첫 번째 슬라이드를 표시
  showSlide();

  // 이후 5초마다 슬라이드 변경
  setInterval(showSlide, 5000);

  // 로그인/로그아웃 버튼 로직
  const isLoggedIn = true;
  const loginLogoutButtons = document.querySelector('.login-logout-buttons');

  if (isLoggedIn) {
    loginLogoutButtons.innerHTML =
      '<a href="./logout.html" class="rounded bg-blue-400 px-4 py-2 text-center font-bold text-white hover:bg-blue-600">로그아웃</a>';
  } else {
    loginLogoutButtons.innerHTML =
      '<a href="./login.html" class="rounded bg-blue-400 px-4 py-2 text-center font-bold text-white hover:bg-blue-600">로그인</a>';
  }
});
