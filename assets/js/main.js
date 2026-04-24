/**
 * MAIN.JS - MAIN INITIALIZATION FILE
 * ====================================
 * Coordinates initialization of all modules and components.
 * Connects events, sets up UI, and prepares the application.
 */

/**
 * Updates the product modal quantity
 * @param {number} delta - Quantity change (+1 or -1)
 */
function updateQty(delta) {
    const qtyInput = document.getElementById('modal-qty');
    if (!qtyInput) return;

    let currentQty = parseInt(qtyInput.value) || 1;
    currentQty += delta;

    if (currentQty < 1) currentQty = 1;

    qtyInput.value = currentQty;
}

document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);

    initThemeSystem();
    Cart.load();
    Products.render();
    Products.setupEvents();
    Filters.setup();
    Modals.setupEvents();
    setupCartEvents();
    setupCheckoutEvents();
    setupFAQEvents();
    setupDataOpenModalEvents();
    initLazyLoading();
});

/**
 * Cart events
 */
function setupCartEvents() {
    const openCartBtn = document.getElementById('open-cart');
    const closeCartBtn = document.getElementById('close-cart');

    if (openCartBtn) {
        openCartBtn.addEventListener('click', () => Modals.openCart());
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => Modals.closeCart());
    }
}

/**
 * Checkout and payment events
 */
function setupCheckoutEvents() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const submitBtn = document.getElementById('submit-order');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => Modals.openCheckout());
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCheckoutSubmit();
        });
    }
}

/**
 * Processes the checkout form submission
 */
function handleCheckoutSubmit() {
    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const email = document.getElementById('cust-email').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    const city = document.getElementById('cust-city').value.trim();
    const payment = document.getElementById('cust-payment').value;
    const notes = document.getElementById('cust-notes').value.trim();
    const submitBtn = document.getElementById('submit-order');

    if (!name || name.length < 2) {
        Notification.error('Please enter a valid name (at least 2 characters).');
        document.getElementById('cust-name').focus();
        return;
    }

    if (!Helpers.isValidPhone(phone)) {
        Notification.error('Enter a valid 10-digit WhatsApp number.');
        document.getElementById('cust-phone').focus();
        return;
    }

    if (!Helpers.isValidEmail(email)) {
        Notification.error('Enter a valid email address or leave the field empty.');
        document.getElementById('cust-email').focus();
        return;
    }

    if (!address || address.length < 10) {
        Notification.error('Please enter a complete address.');
        document.getElementById('cust-address').focus();
        return;
    }

    if (!city || city.length < 3) {
        Notification.error('Please enter a valid city.');
        document.getElementById('cust-city').focus();
        return;
    }

    if (!submitBtn) return;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> PROCESSING...';
    submitBtn.disabled = true;

    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const total = Cart.getTotal();
    
    let productList = "";
    Cart.getItems().forEach((item, index) => {
        productList += `${index + 1}. *${item.name}* [Size: ${item.size}] x${item.quantity}\n`;
    });

    const message =
        `⚽ *NEW ORDER: #LD-${orderNumber}* ⚽\n` +
        `------------------------------------------\n` +
        `👤 *CUSTOMER:* ${name.toUpperCase()}\n` +
        `📱 *PHONE:* ${phone}\n` +
        `${email ? `✉️ *EMAIL:* ${email}\n` : ''}` +
        `📍 *CITY:* ${city}\n` +
        `🏠 *ADDRESS:* ${address}\n` +
        `💳 *PAYMENT:* ${payment}\n` +
        `${notes ? `📝 *NOTES:* ${notes}\n` : ''}` +
        `------------------------------------------\n\n` +
        `📦 *PRODUCTS:*\n${productList}\n` +
        `💰 *TOTAL: COP $${total.toLocaleString()}*\n\n` +
        `🚀 _Sent from LuchoDIAZ Shop_`;

    const whatsappUrl = `${CONFIG.whatsapp.baseUrl}${CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        Cart.clear();
        Modals.closeAll();
        document.getElementById('checkout-form').reset();
        submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> CONFIRM VIA WHATSAPP';
        submitBtn.disabled = false;
        Notification.success('Order sent successfully! Check WhatsApp to confirm.');
    }, 500);
}

/**
 * FAQ events
 */
function setupFAQEvents() {
    const faqForm = document.getElementById('faq-form');

    if (faqForm) {
        faqForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('faq-name').value.trim();
            const email = document.getElementById('faq-email').value.trim();
            const question = document.getElementById('faq-question').value.trim();

            if (!name || !email || !question) {
                Notification.error('Complete all form fields.');
                return;
            }

            Notification.success('Thank you for your question. We will respond shortly.');
            Modals.close('#faq-modal');
            faqForm.reset();
        });
    }
}

/**
 * Initializes lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Theme system (light/dark)
 */
function initThemeSystem() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    function getSavedTheme() {
        try {
            return localStorage.getItem('theme') || 'light';
        } catch (e) {
            return 'light';
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            // Ignore localStorage errors
        }
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Switch to light theme');
        } else {
            html.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
    }

    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        saveTheme(newTheme);
    });
}

/**
 * Product modal events
 */
document.addEventListener('DOMContentLoaded', function() {
    const modalAddBtn = document.getElementById('modal-add-to-cart');

    if (modalAddBtn) {
        modalAddBtn.addEventListener('click', function() {
            const selected = document.querySelector('.size-btn.active');
            
            if (!selected) {
                Notification.error(CONFIG.messages.selectSize);
                return;
            }

            const quantity = parseInt(document.getElementById('modal-qty').value);
            const name = document.getElementById('modal-name').innerText;
            const price = document.getElementById('modal-price').innerText.replace('COP $', '');
            const size = selected.innerText;

            Cart.add(name, price, size, quantity);
            Modals.openCart();
            Modals.close('#product-modal');
        });
    }
});

/**
 * Window load fallback
 * Used for compatibility with older code
 */
window.onload = function() {
    // Initialization is already handled in DOMContentLoaded
};
