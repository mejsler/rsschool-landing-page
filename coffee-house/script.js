const menu = document.querySelector('.burger-menu');
const burgerLink = document.querySelectorAll('.burger-link');
const burger = document.querySelector('.burger');
const body = document.querySelector('.body');

const favoriteBlock = document.querySelector('.favorite');
const favoriteWrapper = document.querySelector('.favorite-wrapper');
const slider = document.querySelector('.favorite-overflow');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const controls = document.querySelectorAll('.favorite-control');
let step = 0;
let width = slider.offsetWidth;

// Slider

window.addEventListener('resize', function () {
  width = slider.offsetWidth;
});

const removeWidth = () => {
  controls.forEach((control) => {
    control.style.width = '0%';
  });
};

const nextSlide = () => {
  step === 2 ? (step = 0) : ++step;
  slider.style.transform = `translateX(-${width * step}px)`;
  removeWidth();
  controls[step].style.width = '100%';
};

const prevSlide = () => {
  step === 0 ? (step = 2) : --step;
  slider.style.transform = `translateX(-${width * step}px)`;
  removeWidth();
  controls[step].style.width = '100%';
};

next.addEventListener('click', nextSlide);

prev.addEventListener('click', prevSlide);

let autoplay;

const startAutoPlay = () => {
  autoplay = setInterval(nextSlide, 5000);
};

const stopAutoPlay = () => {
  clearInterval(autoplay);
};

startAutoPlay();

favoriteWrapper.addEventListener('mouseleave', startAutoPlay);
favoriteWrapper.addEventListener('touchend', startAutoPlay);
next.addEventListener('mouseenter', stopAutoPlay);
prev.addEventListener('mouseenter', stopAutoPlay);
next.addEventListener('mouseleave', startAutoPlay);
prev.addEventListener('mouseleave', startAutoPlay);
favoriteWrapper.addEventListener('mouseenter', stopAutoPlay);
favoriteWrapper.addEventListener('touchstart', stopAutoPlay);
favoriteWrapper.addEventListener('touchmove', stopAutoPlay);

let touchstartX = 0;
let touchendX = 0;

const handleSwipe = () => {
  if (touchendX > touchstartX) {
    prevSlide();
  } else if (touchendX < touchstartX) {
    nextSlide();
  }
};

favoriteBlock.addEventListener(
  'touchstart',
  (event) => {
    touchstartX = event.changedTouches[0].screenX;
  },
  false
);

favoriteBlock.addEventListener(
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
