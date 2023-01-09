const navToggleBtn = document.querySelector('.toggle-nav');
const navLinks = document.querySelector('.nav-links');
const cartToggleBtn = document.querySelector('.toggle-cart');
const cart = document.querySelector('.cart');
const noItem = document.querySelector('.no-item');
const categories = document.querySelectorAll('.category-style');
const items = document.querySelector('.items');
const purchaseBtn = document.querySelector('.purchase');
const displayTotalPrice = document.querySelector('.total-price');

let productsList, itemsOnCart, purchases = [];

function fetchProducts() {
    return new Promise((resolve, reject) => {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                productsList = data.products;
                resolve();
            })
    })
}

fetchProducts()
    .then(() => {
        render(productsList);
        handleAddToCart();
    })

function render(list) {
    list.forEach(product => {
        items.innerHTML += `
        <li class="product">
            <img src=${product.img} alt="Product">
            <p class="product-name">${product.name}</p>
            <div class="price-wrap">
                <p class="price">${product.price}</p>
                <button class="add-to-cart-btn" data-product-id="${product.productId}">Add to Cart</button>
            </div>
        </li>
        `
    })
}

function updateTotal(pricesList, totalAmount) {
    let totalPrice = 0;
    for (let i = 0; i < pricesList.length; i++) {
        const price = parseFloat(pricesList[i].innerHTML.replace('$', ''));
        totalPrice += price;
    }
    totalAmount.textContent = `\$${totalPrice.toFixed(2)}`;
}

function handleAddToCart() {
    const addToCartBtn = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtn.forEach(btn => btn.addEventListener('click', function() {
        const productId = parseInt(btn.dataset.productId);
        const price = parseFloat(btn.parentElement.querySelector('.price').innerHTML.replace('$', ''));
        const productName = btn.parentElement.parentElement.querySelector('.product-name').innerHTML;
        const productImg = btn.parentElement.parentElement.querySelector('img').src;
        const cartItem = document.querySelector('.cart-item');
        itemsOnCart = document.querySelector('.items-added');
        
        btn.innerHTML = 'Added to cart';
        btn.disabled = true;
        btn.style.backgroundColor = 'var(--light-teal)';
        purchases.push(productId);

        if (cartItem.innerHTML.includes('No items')) {
            noItem.classList.add('hide');
        }
        
        itemsOnCart.innerHTML += `
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
            removeBtn[i].addEventListener('click', function() {
                const idRemoved = parseInt(removeBtn[i].dataset.productId);
                for (let j = 0; j < addToCartBtn.length; j++) {
                    const findId1 = parseInt(addToCartBtn[j].dataset.productId);
                    if (findId1 === idRemoved) {
                        addToCartBtn[j].innerHTML = 'Add to cart';
                        addToCartBtn[j].disabled = false;
                        addToCartBtn[j].style.backgroundColor = 'var(--teal)';
                    } 
                }
                cartItems[i+1].remove();
                purchases = purchases.filter(id => id !== idRemoved);
                updateTotal(document.querySelectorAll('.item-price'), displayTotalPrice);
            })
        }

        for (let i = 0; i < quantity.length; i++) {
            quantity[i].addEventListener('change', function() {
                const currentId = parseInt(removeBtn[i].dataset.productId);
                let originalPrice;
                for (let j = 0; j < addToCartBtn.length; j++) {
                    const findId2 = parseInt(addToCartBtn[j].dataset.productId);
                    if (findId2 === currentId) {
                        originalPrice = parseFloat(addToCartBtn[j].parentElement.querySelector('.price').innerHTML.replace('$', ''));
                    } 
                }
                const currentQuantity = parseInt(quantity[i].value);
                const updatedPrice = originalPrice * currentQuantity;
                itemPrices[i].innerHTML = `\$${updatedPrice.toFixed(2)}`;
                quantity[i].setAttribute('value', currentQuantity);
            
                updateTotal(document.querySelectorAll('.item-price'), displayTotalPrice);
            })
        }

        updateTotal(itemPrices, displayTotalPrice)
    }));
}

categories.forEach(category => category.addEventListener('click', function() {
    const currentCategory = category.classList[1];
    const filtered = productsList.filter(product => product.category === currentCategory);
    items.innerHTML = '';
    render(filtered);
    handleAddToCart();
    const addToCartBtn = document.querySelectorAll('.add-to-cart-btn');
    for (let i = 0; i < purchases.length; i++) {
        for (let j = 0; j < addToCartBtn.length; j++) {
            const findId = parseInt(addToCartBtn[j].dataset.productId);
            if (findId === purchases[i]) {
                addToCartBtn[j].innerHTML = 'Added to cart';
                addToCartBtn[j].disabled = true;
                addToCartBtn[j].style.backgroundColor = 'var(--light-teal)';
            }
        }
    }
}))

navToggleBtn.addEventListener('click', function() {
    navLinks.classList.toggle('nav-show');
    navToggleBtn.classList.toggle('rotate');
})

cartToggleBtn.addEventListener('click', function() {
    cart.classList.toggle('show');
})

purchaseBtn.addEventListener('click', function() {
    alert('Thank you for purchasing!');
    const addToCartBtn = document.querySelectorAll('.add-to-cart-btn');
    while (itemsOnCart.children.length > 1) {
        itemsOnCart.removeChild(itemsOnCart.children[1]);
    }
    updateTotal(document.querySelectorAll('.item-price'), displayTotalPrice);
    purchases = [];
    for (let i = 0; i < addToCartBtn.length; i++) {
        addToCartBtn[i].innerHTML = 'Add to cart';
        addToCartBtn[i].disabled = false;
        addToCartBtn[i].style.backgroundColor = 'var(--teal)';
    }
})