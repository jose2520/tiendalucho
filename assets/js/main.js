/**
 * MAIN.JS - ARCHIVO PRINCIPAL DE INICIALIZACIÓN
 * ================================================
 * Coordina la inicialización de todos los módulos y componentes.
 * Conecta eventos, configura UI y prepara la aplicación.
 */

/**
 * EVENTOS GLOBALES A LA CARGA DEL DOM
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar loader
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);

    // Cargar carrito desde almacenamiento
    Cart.load();

    // Inicializar productos
    Products.render();
    Products.setupEvents();

    // Configurar filtros
    Filters.setup();

    // Configurar modales
    Modals.setupEvents();

    // Configurar eventos de carrito
    setupCartEvents();

    // Configurar eventos de checkout
    setupCheckoutEvents();

    // Configurar eventos de FAQ
    setupFAQEvents();
});

/**
 * EVENTOS DEL CARRITO
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
 * EVENTOS DEL CHECKOUT Y PAGO
 */
function setupCheckoutEvents() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const submitBtn = document.getElementById('submit-order');

    // Abrir checkout
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => Modals.openCheckout());
    }

    // Enviar pedido por WhatsApp
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCheckoutSubmit();
        });
    }
}

/**
 * Procesa el envío del formulario de checkout
 */
function handleCheckoutSubmit() {
    // Obtener valores del formulario
    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const email = document.getElementById('cust-email').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    const city = document.getElementById('cust-city').value.trim();
    const payment = document.getElementById('cust-payment').value;
    const notes = document.getElementById('cust-notes').value.trim();
    const submitBtn = document.getElementById('submit-order');

    // Validaciones
    if (!name || name.length < 2) {
        Notification.error('Por favor ingresa un nombre válido (mínimo 2 caracteres).');
        document.getElementById('cust-name').focus();
        return;
    }

    if (!Helpers.isValidPhone(phone)) {
        Notification.error('Ingresa un número de WhatsApp válido de 10 dígitos.');
        document.getElementById('cust-phone').focus();
        return;
    }

    if (!Helpers.isValidEmail(email)) {
        Notification.error('Ingresa un correo electrónico válido o deja el campo vacío.');
        document.getElementById('cust-email').focus();
        return;
    }

    if (!address || address.length < 10) {
        Notification.error('Por favor ingresa una dirección completa.');
        document.getElementById('cust-address').focus();
        return;
    }

    if (!city || city.length < 3) {
        Notification.error('Por favor ingresa una ciudad válida.');
        document.getElementById('cust-city').focus();
        return;
    }

    // Mostrar estado de procesamiento
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> PROCESANDO...';
    submitBtn.disabled = true;

    // Construir mensaje para WhatsApp
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const total = Cart.getTotal();
    
    let productList = "";
    cart.forEach((item, index) => {
        productList += `${index + 1}. *${item.name}* [Talla: ${item.size}] x${item.quantity}\n`;
    });

    const message =
        `⚽ *NUEVO PEDIDO: #LD-${orderNumber}* ⚽\n` +
        `------------------------------------------\n` +
        `👤 *CLIENTE:* ${name.toUpperCase()}\n` +
        `📱 *TEL:* ${phone}\n` +
        `${email ? `✉️ *EMAIL:* ${email}\n` : ''}` +
        `📍 *CIUDAD:* ${city}\n` +
        `🏠 *DIRECCIÓN:* ${address}\n` +
        `💳 *PAGO:* ${payment}\n` +
        `${notes ? `📝 *NOTAS:* ${notes}\n` : ''}` +
        `------------------------------------------\n\n` +
        `📦 *PRODUCTOS:*\n${productList}\n` +
        `💰 *TOTAL: COP $${total.toLocaleString()}*\n\n` +
        `🚀 _Enviado desde Lucho Díaz Shop_`;

    const whatsappUrl = `${CONFIG.whatsapp.baseUrl}${CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');

        // Limpiar carrito
        Cart.clear();

        // Cerrar modal
        Modals.closeAll();

        // Resetear formulario
        document.getElementById('checkout-form').reset();

        // Restablecer botón
        submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> CONFIRMAR POR WHATSAPP';
        submitBtn.disabled = false;

        // Mostrar éxito
        Notification.success('¡Pedido enviado exitosamente! Revisa WhatsApp para confirmar.');
    }, 500);
}

/**
 * EVENTOS DE FAQ
 */
function setupFAQEvents() {
    const faqForm = document.getElementById('faq-form');

    if (faqForm) {
        faqForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('faq-name').value.trim();
            const email = document.getElementById('faq-email').value.trim();
            const question = document.getElementById('faq-question').value.trim();

            // Validar campos
            if (!name || !email || !question) {
                Notification.error('Completa todos los campos del formulario.');
                return;
            }

            // Éxito
            Notification.success('Gracias por tu pregunta. Te responderemos pronto.');
            Modals.close('#faq-modal');
            faqForm.reset();
        });
    }
}

/**
 * EVENTOS DEL MODAL DE PRODUCTO
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

            const cantidad = parseInt(document.getElementById('modal-qty').value);
            const name = document.getElementById('modal-name').innerText;
            const price = document.getElementById('modal-price').innerText.replace('COP $', '');
            const size = selected.innerText;

            Cart.add(name, price, size, cantidad);
            Modals.openCart();
            Modals.close('#product-modal');
        });
    }
});

/**
 * INICIALIZACIÓN CUANDO LA VENTANA SE CARGA (window.onload)
 * Usado para compatibility con código antiguo
 */
window.onload = function() {
    // Ya inicializado en DOMContentLoaded
};
