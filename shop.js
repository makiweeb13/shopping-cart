const navToggleBtn = document.querySelector('.toggle-nav');
const navLinks = document.querySelector('.nav-links');
const cartToggleBtn = document.querySelector('.toggle-cart');
const cart = document.querySelector('.cart');

navToggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-show');
})

cartToggleBtn.addEventListener('click', () => {
    cart.classList.toggle('show');
})