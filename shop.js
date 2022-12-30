const navToggleBtn = document.querySelector('.toggle-nav');
const navLinks = document.querySelector('.nav-links');
const cartToggleBtn = document.querySelector('.toggle-cart');
const cart = document.querySelector('.cart');
const prices = document.querySelectorAll('.price');
const products = document.querySelectorAll('.product-name');
const addToCartBtn = document.querySelectorAll('.add-to-cart-btn');
const cartItem = document.querySelector('.cart-item');
const itemsAdded = document.querySelector('.items-added');
const displayTotalPrice = document.querySelector('.total-price');

let totalPrice = 0;

navToggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-show');
    navToggleBtn.classList.toggle('rotate');
})

cartToggleBtn.addEventListener('click', () => {
    cart.classList.toggle('show');
})

addToCartBtn.forEach(btn => btn.addEventListener('click', () => {
    const productId = parseInt(btn.dataset.productId);
    const price = parseFloat(prices[productId].innerHTML.replace('$', ''));
    const productName = products[productId].innerHTML;

    totalPrice = (totalPrice*100 + price*100)/100;
    displayTotalPrice.textContent = totalPrice;

    btn.innerHTML = 'Added to cart';
    btn.disabled = true;
    btn.style.backgroundColor = 'var(--light-teal)';

    if (cartItem.innerHTML.includes('No items')) {
        cartItem.innerHTML = '';
    }
    
    itemsAdded.innerHTML += `<li class="cart-item">
                                <p>${productName}</p>
                                <p class="item-price">$${price}</p>
                                <div>
                                    <input type="number" name="quantity" class="quantity" min="1" value="1">
                                    <button class="remove" data-product-id="${productId}"><i class="fa-solid fa-xmark"></i></button>
                                </div>
                            </li>`

    const cartItems = document.querySelectorAll('.cart-item');
    const removeBtn = document.querySelectorAll('.remove');
    const itemPrices = document.querySelectorAll('.item-price');
    const quantity = document.querySelectorAll('.quantity');

    for (let i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener('click', () => {
            const idRemoved = parseInt(removeBtn[i].dataset.productId);
            const priceRemoved = parseFloat(itemPrices[i].innerHTML.replace('$', ''));
            addToCartBtn[idRemoved].innerHTML = 'Add to cart';
            addToCartBtn[idRemoved].disabled = false;
            addToCartBtn[idRemoved].style.backgroundColor = 'var(--teal)';
            totalPrice = (totalPrice*100 - priceRemoved*100)/100;
            displayTotalPrice.textContent = totalPrice;
            cartItems[i+1].remove();
        })
    }

    for (let i = 0; i < quantity.length; i++) {
        quantity[i].addEventListener('change', () => {
            let currentQuantity = parseInt(quantity[i].value);
            let currentPrice = parseFloat(itemPrices[i].innerHTML.replace('$', ''));
            let originalPrice = updatedPrice / currentQuantity;
            let updatedPrice = currentPrice * currentQuantity;
            itemPrices[i].innerHTML = '$' + updatedPrice;
            console.log(originalPrice);
        })
    }
}));


