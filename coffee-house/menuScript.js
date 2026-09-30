import data from './products.json' with { type: 'json' };

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

// Modal Elements
const modalBackdrop = document.getElementById('modalBackdrop');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalSizes = document.getElementById('modalSizes');
const modalAdditives = document.getElementById('modalAdditives');
const modalTotal = document.getElementById('modalTotal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

let activeProduct = null;
let selectedSizeExtra = 0;
let selectedAdditivesExtra = 0;

// Dynamic Price Calculation
const updateTotal = () => {
  if (!activeProduct) return;
  const base = parseFloat(activeProduct.price);
  const total = base + selectedSizeExtra + selectedAdditivesExtra;
  modalTotal.textContent = `$${total.toFixed(2)}`;
};

// Open Modal
const openModal = (product) => {
  activeProduct = product;
  selectedSizeExtra = 0;
  selectedAdditivesExtra = 0;

  modalImg.src = `../images/${product.src}`;
  modalImg.alt = product.name;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;

  // Render Sizes
  modalSizes.innerHTML = '';
  const sizeKeys = Object.keys(product.sizes);
  sizeKeys.forEach((key, index) => {
    const sizeObj = product.sizes[key];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `modal-option-btn ${index === 0 ? 'active' : ''}`;
    btn.innerHTML = `<span class="icon">${key.toUpperCase()}</span> ${sizeObj.size}`;
    
    btn.addEventListener('click', () => {
      modalSizes.querySelectorAll('.modal-option-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSizeExtra = parseFloat(sizeObj['add-price']);
      updateTotal();
    });

    modalSizes.appendChild(btn);
  });

  // Render Additives
  modalAdditives.innerHTML = '';
  product.additives.forEach((additive, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'modal-option-btn';
    btn.innerHTML = `<span class="icon">${index + 1}</span> ${additive.name}`;

    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const addPrice = parseFloat(additive['add-price']);
      if (btn.classList.contains('active')) {
        selectedAdditivesExtra += addPrice;
      } else {
        selectedAdditivesExtra -= addPrice;
      }
      updateTotal();
    });

    modalAdditives.appendChild(btn);
  });

  updateTotal();
  modalBackdrop.classList.add('open');
  body.classList.add('overflow');
};

// Close Modal
const closeModal = () => {
  modalBackdrop.classList.remove('open');
  body.classList.remove('overflow');
};

modalCloseBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
    closeModal();
  }
});

const loadData = (category) => {
  const filteredProducts = data.filter((item) => item.category === category);

  const cardsHtml = filteredProducts.map((item, index) => {
    const imgSrc = `../images/${item.src}`;
    return `
      <div class="menu-columns-item" data-index="${index}">
        <div class="img-box"><img src="${imgSrc}" alt="${item.name}"></div>
        <div class="menu-columns-item-text">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <h3 class="price">$${item.price}</h3>
        </div>
      </div>
    `;
  }).join('');

  const refreshHtml = `
    <button class="refresh" type="button">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#665F55" />
        <path d="M39.8883 31.5C39.1645 36.3113 35.013 40 30 40C24.4772 40 20 35.5228 20 30C20 24.4772 24.4772 20 30 20C34.1006 20 37.6248 22.4682 39.1679 26" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M35 26H39.4C39.7314 26 40 25.7314 40 25.4V21" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  `;

  items.innerHTML = cardsHtml + refreshHtml;

  const productCards = items.querySelectorAll('.menu-columns-item');
  productCards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = card.getAttribute('data-index');
      openModal(filteredProducts[idx]);
    });
  });

  const refresh = items.querySelector('.refresh');
  refresh?.addEventListener('click', () => items.classList.add('show'));
};

switchers.forEach((sw) => {
  sw.addEventListener('click', () => {
    switchers.forEach((el) => {
      const child = el.querySelector('a, button') || el.children[0];
      if (child) child.classList.remove('active');
    });
    
    const category = sw.className.trim() || sw.dataset.category;
    loadData(category);

    const activeChild = sw.querySelector('a, button') || sw.children[0];
    if (activeChild) activeChild.classList.add('active');
  });
});

window.addEventListener('resize', () => items.classList.remove('show'));

loadData('coffee');

const themeToggleBtn = document.getElementById('themeToggle');
const headerLogo = document.getElementById('headerLogo');

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (headerLogo) {
    headerLogo.src = theme === 'dark' ? '../images/logoDark.svg' : '../images/logo.svg';
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