const navToggleBtn = document.querySelector('.toggle-nav');
const navLinks = document.querySelector('.nav-links');
const cartToggleBtn = document.querySelector('.toggle-cart');
const cart = document.querySelector('.cart');
const prices = document.querySelectorAll('.price');
const products = document.querySelectorAll('.product-name');

const addToCart = () => {
    const price = prices[0].innerHTML.replace('$', '');
    const productName = products[0].innerHTML;
    console.log();
}

navToggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-show');
})

cartToggleBtn.addEventListener('click', () => {
    cart.classList.toggle('show');
})



addToCart()