/**
 * MODULES/CART.JS - CART MANAGEMENT
 * Handles all shopping cart operations.
 * Includes: add, remove, update quantity, save, load.
 */

let cart = [];

const Cart = {
    /**
     * Adds a product to the cart or increases quantity
     * @param {string} name - Product name
     * @param {number} price - Product price
     * @param {string} size - Selected size
     * @param {number} quantity - Quantity to add
     */
    add: function(name, price, size = "Única", quantity = 1) {
        const parsedPrice = parseFloat(price);
        
        if (Number.isNaN(parsedPrice) || !Number.isInteger(qty) || qty < 1) return;

        const existingIndex = cart.findIndex(
            item => item.name === name && item.size === size
        );
        
        if (existingIndex >= 0) {
            cart[existingIndex].quantity += qty;
        } else {
            cart.push({ name, price: parsedPrice, size, quantity: qty });
        }

        this.save();
        this.updateUI();
        Notification.success(
            `${name} added to cart (${quantity} ${quantity === 1 ? 'unit' : 'units'})`
        );
    },

    /**
     * Removes a product from the cart by index
     * @param {number} index - Product index
     */
    remove: function(index) {
        if (index < 0 || index >= cart.length) return;
        
        const item = cart[index];
        cart.splice(index, 1);
        
        this.save();
        this.updateUI();
        Notification.success(`${item.name} removed from cart`);
    },

    /**
     * Changes quantity of a cart item
     * @param {number} index - Product index
     * @param {number} delta - Quantity change (+1, -1)
     */
    changeQuantity: function(index, delta) {
        if (index < 0 || index >= cart.length) return;
        
        const item = cart[index];
        item.quantity += delta;
        
        if (item.quantity <= 0) {
            this.remove(index);
        } else {
            this.save();
            this.updateUI();
        }
    },

    /**
     * Gets the cart total
     * @returns {number} Total price
     */
    getTotal: function() {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    /**
     * Obtiene una copia de los items del carrito
     * @returns {Array} Items del carrito
     */
    getItems: function() {
        return cart.slice();
    },

    /**
     * Gets total item count
     * @returns {number} Total item count
     */
    getItemCount: function() {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    /**
     * Saves the cart to localStorage
     */
    save: function() {
        StorageUtil.save(CONFIG.storage.CART_KEY, cart);
    },

    /**
     * Loads the cart from localStorage
     */
    load: function() {
        cart = StorageUtil.load(CONFIG.storage.CART_KEY, []);
        
        // Normalize quantity
        cart = cart.map(item => ({
            ...item,
            quantity: item.quantity && item.quantity > 0 ? item.quantity : 1
        }));
        
        this.updateUI();
    },

    /**
     * Clears the cart
     */
    clear: function() {
        cart = [];
        this.save();
        this.updateUI();
    },

    /**
     * Returns cart items
     * @returns {Array} Array of cart items
     */
    getItems: function() {
        return cart;
    },

    /**
     * Updates the cart UI
     */
    updateUI: function() {
        const cartItemsEl = document.getElementById('cart-items');
        if (!cartItemsEl) return;

        // Show empty cart message
        if (cart.length === 0) {
            cartItemsEl.innerHTML = `
                <p style="text-align:center; opacity:0.5; padding: 20px;">
                    ${CONFIG.messages.cartEmpty}
                </p>
            `;
        } else {
            // Renderizar items
            cartItemsEl.innerHTML = '';
            cart.forEach((item, i) => {
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-header">
                        <div>
                            <h4 style="font-size:0.8rem; margin-bottom: 0.3rem;">${item.name} (${item.size})</h4>
                            <div class="cart-item-meta">
                                <span>Quantity: ${item.quantity}</span>
                                <span>Unit price: COP $${item.price.toLocaleString()}</span>
                            </div>
                        </div>
                        <button onclick="Cart.remove(${i})" style="color:var(--primary); background:none; border:none; cursor:pointer; font-weight:600">Remove</button>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="Cart.changeQuantity(${i}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="Cart.changeQuantity(${i}, 1)">+</button>
                        <span style="margin-left:auto; font-weight:700;">Subtotal: COP $${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                `;
                fragment.appendChild(itemEl);
            });
            cartItemsEl.innerHTML = '';
            cartItemsEl.appendChild(fragment);
        }

        const countEl = document.getElementById('cart-count');
        if (countEl) countEl.innerText = this.getItemCount();

        const totalEl = document.getElementById('total-price');
        if (totalEl) totalEl.innerText = this.getTotal().toLocaleString();

        const checkoutTotalEl = document.getElementById('checkout-total-price');
        if (checkoutTotalEl) checkoutTotalEl.innerText = this.getTotal().toLocaleString();

        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
    }
};

// Compatibility aliases
function addToCart(name, price, size = "One Size", quantity = 1) {
    Cart.add(name, price, size, quantity);
}

function saveCart() {
    Cart.save();
}

function loadCart() {
    Cart.load();
}

function updateUI() {
    Cart.updateUI();
}
