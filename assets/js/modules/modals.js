/**
 * MODULES/MODALS.JS - MODAL MANAGEMENT
 * Handles opening and closing of all modal dialogs.
 * Includes: product, checkout, size guide, FAQ.
 */

const Modals = {
    selectors: {
        cartModal: '#cart-modal',
        productModal: '#product-modal',
        checkoutModal: '#checkout-modal',
        sizeGuideModal: '#size-guide-modal',
        faqModal: '#faq-modal',
        overlay: '#overlay'
    },

    /**
     * Opens the product modal
     * @param {HTMLElement} card - Product card element
     */
    openProduct: function(card) {
        const { name, price, category, image } = card.dataset;
        
        document.getElementById('modal-name').innerText = name;
        document.getElementById('modal-price').innerText = `COP $${parseFloat(price).toLocaleString()}`;
        document.getElementById('modal-qty').value = 1;
        
        const imgEl = document.getElementById('modal-img-target');
        imgEl.src = image || '';
        imgEl.alt = name || 'Product';

        const sizesContainer = document.getElementById('modal-sizes');
        sizesContainer.innerHTML = '';
        const sizes = CONFIG.sizes[category] || ['One Size'];
        
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

        const firstBtn = sizesContainer.querySelector('.size-btn');
        if (firstBtn) firstBtn.classList.add('active');

        this.open(this.selectors.productModal);
    },

    /**
     * Opens a specific modal
     * @param {string} selector - Modal selector
     */
    open: function(selector) {
        const modal = document.querySelector(selector);
        const overlay = document.querySelector(this.selectors.overlay);
        
        if (modal) modal.classList.add('active');
        if (overlay) overlay.classList.add('active');
    },

    /**
     * Closes a specific modal
     * @param {string} selector - Modal selector
     */
    close: function(selector) {
        const modal = document.querySelector(selector);
        const overlay = document.querySelector(this.selectors.overlay);
        
        if (modal) modal.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    },

    /**
     * Closes all modals
     */
    closeAll: function() {
        Object.values(this.selectors).forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.classList.remove('active');
        });
    },

    openCart: function() {
        this.open(this.selectors.cartModal);
    },

    closeCart: function() {
        this.close(this.selectors.cartModal);
    },

    openCheckout: function() {
        if (cart.length === 0) {
            Notification.error('The cart is empty');
            return;
        }
        this.closeCart();
        this.open(this.selectors.checkoutModal);
    },

    openSizeGuide: function() {
        this.open(this.selectors.sizeGuideModal);
    },

    openFAQ: function() {
        this.open(this.selectors.faqModal);
    },

    setupEvents: function() {
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

        document.querySelector(this.selectors.overlay)?.addEventListener('click', () => {
            this.closeAll();
        });

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

function updateQty(val) {
    const input = document.getElementById('modal-qty');
    let n = parseInt(input.value) + val;
    input.value = n < 1 ? 1 : n;
}
