import data from './products.json' assert { type: 'json' };

const menu = document.querySelector('.burger-menu');
const burgerLink = document.querySelectorAll('.burger-link');
const burger = document.querySelector('.burger');
const body = document.querySelector('.body');

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

const switchers = document.querySelectorAll('.menu-switcher li');
const items = document.querySelector('.menu-columns');


const loadData = (category) => {
  items.innerHTML = '';
  
  for (let i = 0; i < data.length; i++) {
    if (data[i]['category'] === category) {
      items.innerHTML += `
      <div class="menu-columns-item">
      <div class="img-box"><img src="../images/${data[i]['src']}" alt="${data[i]['name']}"></div>
      <div class="menu-columns-item-text">
          <h3>${data[i]['name']}</h3>
          <p>${data[i]['description']}</p>
          <h3 class="price">${data[i]['price']}</h3>
      </div>
  </div>
      `;
    }
  }
items.innerHTML += ` <button class="refresh"><svg width="60" height="60" viewBox="0 0 60 60" fill="none"
xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#665F55" />
<path
    d="M39.8883 31.5C39.1645 36.3113 35.013 40 30 40C24.4772 40 20 35.5228 20 30C20 24.4772 24.4772 20 30 20C34.1006 20 37.6248 22.4682 39.1679 26"
    stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
<path d="M35 26H39.4C39.7314 26 40 25.7314 40 25.4V21" stroke="#403F3D"
    stroke-linecap="round" stroke-linejoin="round" />
</svg>
</button>`;
const refresh = document.querySelector('.refresh');
refresh.addEventListener('click', () => {
  items.classList.add('show');
});
window.addEventListener('resize', () => items.classList.remove('show'));
};


switchers.forEach((sw) => {
  sw.addEventListener('click', () => {
    switchers.forEach(el => el.childNodes[0].classList.remove('active'));
    loadData(`${sw.className}`);
    sw.childNodes[0].classList.add('active')
  })
});



loadData('coffee');