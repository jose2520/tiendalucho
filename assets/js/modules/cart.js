/**
 * MODULES/CART.JS - GESTIÓN DEL CARRITO
 * Maneja todas las operaciones del carrito de compras.
 * Incluye: agregar, eliminar, actualizar cantidad, guardar, cargar.
 */

let cart = [];

const Cart = {
    /**
     * Agrega un producto al carrito o aumenta su cantidad
     * @param {string} name - Nombre del producto
     * @param {number} price - Precio del producto
     * @param {string} size - Talla seleccionada
     * @param {number} quantity - Cantidad a agregar
     */
    add: function(name, price, size = "Única", quantity = 1) {
        const parsedPrice = parseFloat(price);
        
        if (Number.isNaN(parsedPrice) || quantity < 1) return;

        const existingIndex = cart.findIndex(
            item => item.name === name && item.size === size
        );
        
        if (existingIndex >= 0) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push({ name, price: parsedPrice, size, quantity });
        }

        this.save();
        this.updateUI();
        Notification.success(
            `${name} agregado al carrito (${quantity} ${quantity === 1 ? 'unidad' : 'unidades'})`
        );
    },

    /**
     * Elimina un producto del carrito por índice
     * @param {number} index - Índice del producto
     */
    remove: function(index) {
        if (index < 0 || index >= cart.length) return;
        
        const item = cart[index];
        cart.splice(index, 1);
        
        this.save();
        this.updateUI();
        Notification.success(`${item.name} eliminado del carrito`);
    },

    /**
     * Cambia la cantidad de un producto
     * @param {number} index - Índice del producto
     * @param {number} delta - Cambio en cantidad (+1, -1, etc)
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
     * Obtiene el total del carrito
     * @returns {number} Total en pesos
     */
    getTotal: function() {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    /**
     * Obtiene la cantidad total de items
     * @returns {number} Cantidad total
     */
    getItemCount: function() {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    /**
     * Guarda el carrito en localStorage
     */
    save: function() {
        StorageUtil.save(CONFIG.storage.CART_KEY, cart);
    },

    /**
     * Carga el carrito desde localStorage
     */
    load: function() {
        cart = StorageUtil.load(CONFIG.storage.CART_KEY, []);
        
        // Normalizar cantidad
        cart = cart.map(item => ({
            ...item,
            quantity: item.quantity && item.quantity > 0 ? item.quantity : 1
        }));
        
        this.updateUI();
    },

    /**
     * Vacía el carrito
     */
    clear: function() {
        cart = [];
        this.save();
        this.updateUI();
    },

    /**
     * Obtiene los items del carrito
     * @returns {Array} Array de items del carrito
     */
    getItems: function() {
        return cart;
    },

    /**
     * Actualiza la interfaz del carrito
     */
    updateUI: function() {
        const cartItemsEl = document.getElementById('cart-items');
        if (!cartItemsEl) return;

        // Mostrar carrito vacío
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
                                <span>Cantidad: ${item.quantity}</span>
                                <span>Precio unidad: COP $${item.price.toLocaleString()}</span>
                            </div>
                        </div>
                        <button onclick="Cart.remove(${i})" style="color:var(--primary); background:none; border:none; cursor:pointer; font-weight:600">Eliminar</button>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="Cart.changeQuantity(${i}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="Cart.changeQuantity(${i}, 1)">+</button>
                        <span style="margin-left:auto; font-weight:700;">Subtotal: COP $${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                `;
                cartItemsEl.appendChild(itemEl);
            });
        }

        // Actualizar badge y totales
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

// Alias para mantener compatibilidad
function addToCart(name, price, size = "Única", quantity = 1) {
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
