document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <p>${item.title}</p>
                <p>${item.price}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += parseInt(item.price.replace('₹', ''));
        });
        cartTotalElement.textContent = total;
    }

    const clearCartButton = document.getElementById('clear-cart');

    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        cart = [];
        displayCartItems();
    });

    const checkoutButton = document.getElementById('checkout');
    checkoutButton.addEventListener('click', () => {
        if (!cart || cart.length === 0) {
            alert('Your cart is empty. Add items before checkout.');
            return;
        }
        // Redirect to a dedicated payment page to complete payment
        window.location.href = 'payment.html';
    });
    displayCartItems();
});