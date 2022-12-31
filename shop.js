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

function updateTotal(pricesList) {

    let totalPrice = 0;
    for (let i = 0; i < pricesList.length; i++) {
        const price = parseFloat(pricesList[i].innerHTML.replace('$', ''));
        totalPrice += price;
    }
    displayTotalPrice.textContent = `\$${totalPrice.toFixed(2)}`;
}

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
    const productImg = products[productId].parentElement.querySelector('img').src;

    btn.innerHTML = 'Added to cart';
    btn.disabled = true;
    btn.style.backgroundColor = 'var(--light-teal)';

    if (cartItem.innerHTML.includes('No items')) {
        cartItem.innerHTML = '';
    }
    
    itemsAdded.innerHTML += `
        <li class="cart-item">
            <div class="info">
                <img class="item-img" src="${productImg}">
                <p>${productName}</p>
            </div>
            <p class="item-price">$${price.toFixed(2)}</p>
            <div>
                <input type="number" name="quantity" class="quantity" min="1" value="1">
                <button class="remove" data-product-id="${productId}"><i class="fa-solid fa-xmark"></i></button>
            </div>
        </li>
        `
    const cartItems = document.querySelectorAll('.cart-item');
    const removeBtn = document.querySelectorAll('.remove');
    const itemPrices = document.querySelectorAll('.item-price');
    const quantity = document.querySelectorAll('.quantity');
    
    for (let i = 0; i < removeBtn.length; i++) {

        removeBtn[i].addEventListener('click', () => {

            const idRemoved = parseInt(removeBtn[i].dataset.productId);
            addToCartBtn[idRemoved].innerHTML = 'Add to cart';
            addToCartBtn[idRemoved].disabled = false;
            addToCartBtn[idRemoved].style.backgroundColor = 'var(--teal)';
            cartItems[i+1].remove();

            updateTotal(document.querySelectorAll('.item-price'));
        })
    }

    for (let i = 0; i < quantity.length; i++) {

        quantity[i].addEventListener('change', () => {

            const currentId = parseInt(removeBtn[i].dataset.productId);
            const originalPrice = parseFloat(addToCartBtn[currentId].parentElement.querySelector('.price').innerHTML.replace('$', ''));
            const currentQuantity = parseInt(quantity[i].value);
            const updatedPrice = originalPrice * currentQuantity;

            itemPrices[i].innerHTML = `\$${updatedPrice.toFixed(2)}`;
            quantity[i].setAttribute('value', currentQuantity);

            updateTotal(document.querySelectorAll('.item-price'));
        })
    }

    updateTotal(itemPrices);
}));