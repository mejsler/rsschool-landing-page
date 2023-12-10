const menu = document.querySelector('.burger-menu');
const burgerLink = document.querySelectorAll('.burger-link');
const burger = document.querySelector('.burger');
const body = document.querySelector('.body');
const slider = document.querySelector('.favorite-overflow');
const width = slider.offsetWidth;
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let step = 0;

next.addEventListener('click', () => {
  step === 2 ? step = 0 : ++step;
  slider.style.transform = `translateX(-${width * step}px)`;
  
});

prev.addEventListener('click', () => {
  step === 0 ? step = 2 : --step;
  slider.style.transform = `translateX(-${width * step}px)`;
});

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
