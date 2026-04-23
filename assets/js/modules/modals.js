/**
 * MODULES/MODALS.JS - GESTIÓN DE DIÁLOGOS MODALES
 * Maneja la apertura y cierre de todos los modales.
 * Incluye: producto, checkout, guía de tallas, FAQ.
 */

const Modals = {
    // Selectores de modales
    selectors: {
        cartModal: '#cart-modal',
        productModal: '#product-modal',
        checkoutModal: '#checkout-modal',
        sizeGuideModal: '#size-guide-modal',
        faqModal: '#faq-modal',
        overlay: '#overlay'
    },

    /**
     * Abre el modal de producto
     * @param {HTMLElement} card - Elemento de la tarjeta
     */
    openProduct: function(card) {
        const { name, price, category, image } = card.dataset;
        
        // Actualizar información del modal
        document.getElementById('modal-name').innerText = name;
        document.getElementById('modal-price').innerText = `COP $${parseFloat(price).toLocaleString()}`;
        document.getElementById('modal-qty').value = 1;
        
        const imgEl = document.getElementById('modal-img-target');
        imgEl.src = image || '';
        imgEl.alt = name || 'Producto';

        // Configurar selector de tallas
        const sizesContainer = document.getElementById('modal-sizes');
        sizesContainer.innerHTML = '';
        const sizes = CONFIG.sizes[category] || ['Única'];
        
        sizes.forEach(size => {
            const btn = document.createElement('button');
            btn.className = 'size-btn';
            btn.innerText = size;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            sizesContainer.appendChild(btn);
        });

        // Seleccionar primer tamaño
        const firstBtn = sizesContainer.querySelector('.size-btn');
        if (firstBtn) firstBtn.classList.add('active');

        // Abrir modal
        this.open(this.selectors.productModal);
    },

    /**
     * Abre un modal específico
     * @param {string} selector - Selector del modal
     */
    open: function(selector) {
        const modal = document.querySelector(selector);
        const overlay = document.querySelector(this.selectors.overlay);
        
        if (modal) modal.classList.add('active');
        if (overlay) overlay.classList.add('active');
    },

    /**
     * Cierra un modal específico
     * @param {string} selector - Selector del modal
     */
    close: function(selector) {
        const modal = document.querySelector(selector);
        const overlay = document.querySelector(this.selectors.overlay);
        
        if (modal) modal.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    },

    /**
     * Cierra todos los modales
     */
    closeAll: function() {
        Object.values(this.selectors).forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.classList.remove('active');
        });
    },

    /**
     * Abre carrito
     */
    openCart: function() {
        this.open(this.selectors.cartModal);
    },

    /**
     * Cierra carrito
     */
    closeCart: function() {
        this.close(this.selectors.cartModal);
    },

    /**
     * Abre checkout
     */
    openCheckout: function() {
        if (cart.length === 0) {
            Notification.error('El carrito está vacío');
            return;
        }
        this.closeCart();
        this.open(this.selectors.checkoutModal);
    },

    /**
     * Abre guía de tallas
     */
    openSizeGuide: function() {
        this.open(this.selectors.sizeGuideModal);
    },

    /**
     * Abre FAQ
     */
    openFAQ: function() {
        this.open(this.selectors.faqModal);
    },

    /**
     * Configura los eventos de apertura y cierre de modales
     */
    setupEvents: function() {
        // Botones de cierre
        document.getElementById('close-modal')?.addEventListener('click', () => {
            this.close(this.selectors.productModal);
        });

        document.getElementById('close-checkout')?.addEventListener('click', () => {
            this.close(this.selectors.checkoutModal);
        });

        document.getElementById('close-size-guide')?.addEventListener('click', () => {
            this.close(this.selectors.sizeGuideModal);
        });

        document.getElementById('close-faq')?.addEventListener('click', () => {
            this.close(this.selectors.faqModal);
        });

        // Overlay cierra modales
        document.querySelector(this.selectors.overlay)?.addEventListener('click', () => {
            this.closeAll();
        });

        // Links que abren modales con data-open-modal
        document.querySelectorAll('[data-open-modal]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.currentTarget.dataset.openModal;
                
                if (target === 'size-guide') this.openSizeGuide();
                else if (target === 'faq') this.openFAQ();
            });
        });
    }
};

// Alias para mantener compatibilidad
function updateQty(val) {
    const input = document.getElementById('modal-qty');
    let n = parseInt(input.value) + val;
    input.value = n < 1 ? 1 : n;
}
