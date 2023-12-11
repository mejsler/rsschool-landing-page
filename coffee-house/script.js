const menu = document.querySelector('.burger-menu');
const burgerLink = document.querySelectorAll('.burger-link');
const burger = document.querySelector('.burger');
const body = document.querySelector('.body');
const favoriteBlock = document.querySelector('.favorite');
const slider = document.querySelector('.favorite-overflow');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let width = slider.offsetWidth;
let step = 0;

// Slider

window.addEventListener('resize', function () {
  width = slider.offsetWidth;
});

const nextSlide = () => {
  step === 2 ? (step = 0) : ++step;
  slider.style.transform = `translateX(-${width * step}px)`;
};

const prevSlide = () => {
  step === 0 ? (step = 2) : --step;
  slider.style.transform = `translateX(-${width * step}px)`;
};

next.addEventListener('click', nextSlide);

prev.addEventListener('click', prevSlide);

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
