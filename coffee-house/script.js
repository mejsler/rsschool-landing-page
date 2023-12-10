const menu = document.querySelector(".burger-menu");
const burgerLink = document.querySelectorAll(".burger-link");
const burger = document.querySelector(".burger");
const body = document.querySelector(".body");


function toggleMenu() {
  if (menu.classList.contains("burger-show")) {
    menu.classList.remove("burger-show");
    body.classList.remove("overflow");
  } else {
    menu.classList.add("burger-show");
    body.classList.add("overflow");
  }
}

burger.addEventListener("click", toggleMenu);

burgerLink.forEach( 
    function(burgerLink) { 
        burgerLink.addEventListener("click", toggleMenu);
    }
  )