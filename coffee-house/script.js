const menu = document.querySelector('.burger-menu');
const burgerLink = document.querySelectorAll('.burger-link');
const burger = document.querySelector('.burger');
const body = document.querySelector('.body');

const favoriteWrapper = document.querySelector('.favorite-wrapper');
const slider = document.querySelector('.favorite-overflow');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const controls = document.querySelectorAll('.favorite-control');
let step = 0;
let width = slider.offsetWidth;

// Slider
let remainingTime;
let timerInterval;
let initialTime;
let currentWidth = 0;

function startCountdown() {
  if (remainingTime >= 0) {
    initialTime = remainingTime;
  } else {
    initialTime = 4;
  }
  
  let countdownTime = initialTime;

  timerInterval = setInterval(function () {
    remainingTime = countdownTime--;

    if (remainingTime >= 0) {
      if (currentWidth < 100) {
        controls[step].style.width = `${(currentWidth += 20)}%`;
      }
    } else {
      nextSlide();
      remainingTime = 4;
      currentWidth = 0;
      clearInterval(timerInterval);
      startCountdown();
    }
  }, 1000);

  return timerInterval;
}

function pauseCountdown() {
  clearInterval(timerInterval);
}

function resumeCountdown() {
  timerInterval = startCountdown();
}

const nextSlide = () => {
  pauseCountdown();
  removeWidth();
  remainingTime = 4;
  currentWidth = 0;
  resumeCountdown();
  step === 2 ? (step = 0) : ++step;
  slider.style.transform = `translateX(-${width * step}px)`;
};

const prevSlide = () => {
  pauseCountdown();
  removeWidth();
  remainingTime = 4;
  currentWidth = 0;
  resumeCountdown();
  step === 0 ? (step = 2) : --step;
  slider.style.transform = `translateX(-${width * step}px)`;
};

const removeWidth = () => {
  controls.forEach((control) => {
    control.style.width = '0%';
  });
};

let touchstartX = 0;
let touchendX = 0;

const handleSwipe = () => {
  if (touchendX > touchstartX) {
    prevSlide();
  } else if (touchendX < touchstartX) {
    nextSlide();
  }
};

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

favoriteWrapper.addEventListener('mouseover', pauseCountdown);
favoriteWrapper.addEventListener('touchstart', pauseCountdown);

favoriteWrapper.addEventListener('mouseout', resumeCountdown);
favoriteWrapper.addEventListener('touchend', resumeCountdown);

window.addEventListener('resize', () => width = slider.offsetWidth);

favoriteWrapper.addEventListener(
  'touchstart',
  (event) => {
    touchstartX = event.changedTouches[0].screenX;
  },
  false
);

favoriteWrapper.addEventListener(
  'touchend',
  (event) => {
    touchendX = event.changedTouches[0].screenX;
    handleSwipe();
  },
  false
);

// Burger

const toggleMenu = () => {
  if (menu.classList.contains('burger-show')) {
    menu.classList.remove('burger-show');
    body.classList.remove('overflow');
  } else {
    menu.classList.add('burger-show');
    body.classList.add('overflow');
  }
};

burgerLink.forEach((burgerLink) =>
  burgerLink.addEventListener('click', toggleMenu)
);

burger.addEventListener('click', toggleMenu);

startCountdown();

const themeToggleBtn = document.getElementById('themeToggle');
const headerLogo = document.getElementById('headerLogo');

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (headerLogo) {
    headerLogo.src = theme === 'dark' ? 'images/logoDark.svg' : 'images/logo.svg';
  }
};

// Toggle handler
themeToggleBtn?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

// Init theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';

setTheme(savedTheme);