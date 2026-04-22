/**
 * LÓGICA GENERAL DE LA TIENDA
 * Tienda Lucho Díaz Shop
 */

// --- SELECTORES GLOBALES ---
const loader = document.getElementById('loader');
const cartModal = document.getElementById('cart-modal');
const overlay = document.getElementById('overlay');
const productModal = document.getElementById('product-modal');
const checkoutModal = document.getElementById('checkout-modal');
const sizeGuideModal = document.getElementById('size-guide-modal');
const faqModal = document.getElementById('faq-modal');

// --- PANTALLA DE CARGA ---
window.onload = () => {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
    initShop(); // Inicializar tienda después de cargar
};

// --- GESTIÓN DE INTERFAZ (ABRIR/CERRAR) ---
function toggleCart() {
    cartModal.classList.toggle('active');
    overlay.classList.toggle('active');
}

document.getElementById('open-cart').onclick = toggleCart;
document.getElementById('close-cart').onclick = toggleCart;

document.getElementById('close-modal').onclick = () => {
    productModal.classList.remove('active');
    overlay.classList.remove('active');
};

document.getElementById('close-checkout').onclick = () => {
    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
};

document.getElementById('close-size-guide').onclick = () => {
    sizeGuideModal.classList.remove('active');
    overlay.classList.remove('active');
};

document.getElementById('close-faq').onclick = () => {
    faqModal.classList.remove('active');
    overlay.classList.remove('active');
};

document.querySelectorAll('[data-open-modal]').forEach(element => {
    element.onclick = (e) => {
        e.preventDefault();
        const target = e.currentTarget.dataset.openModal;
        if (target === 'size-guide') sizeGuideModal.classList.add('active');
        if (target === 'faq') faqModal.classList.add('active');
        overlay.classList.add('active');
    };
});

overlay.onclick = () => {
    [cartModal, productModal, checkoutModal, sizeGuideModal, faqModal, overlay].forEach(m => m.classList.remove('active'));
};

document.getElementById('faq-form').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('faq-name').value.trim();
    const email = document.getElementById('faq-email').value.trim();
    const question = document.getElementById('faq-question').value.trim();
    if (!name || !email || !question) {
        showToast('Completa todos los campos del formulario.', 'error');
        return;
    }
    showToast('Gracias por tu pregunta. Te responderemos pronto.', 'success');
    faqModal.classList.remove('active');
    overlay.classList.remove('active');
    e.target.reset();
};

// Control de cantidad en el modal
window.updateQty = (val) => {
    const input = document.getElementById('modal-qty');
    let n = parseInt(input.value) + val;
    input.value = n < 1 ? 1 : n;
};

// Añadir desde el modal con cantidad y talla
document.getElementById('modal-add-to-cart').onclick = () => {
    const selected = document.querySelector('.size-btn.active');
    if(!selected) return alert('Por favor, selecciona una talla.');

    const cantidad = parseInt(document.getElementById('modal-qty').value);
    addToCart(
        document.getElementById('modal-name').innerText,
        document.getElementById('modal-price').innerText.replace('COP $',''),
        selected.innerText,
        cantidad
    );
    productModal.classList.remove('active');
    cartModal.classList.add('active');
};

// --- PROCESO DE PAGO (WHATSAPP) ---
document.getElementById('checkout-btn').onclick = () => {
    if(!cart.length) return alert('El carrito está vacío');
    cartModal.classList.remove('active');
    checkoutModal.classList.add('active');
};

document.getElementById('checkout-form').onsubmit = function(e) {
    e.preventDefault();

    const btn = document.getElementById('submit-order');
    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const email = document.getElementById('cust-email').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    const city = document.getElementById('cust-city').value.trim();
    const payment = document.getElementById('cust-payment').value;
    const notes = document.getElementById('cust-notes').value.trim();
    const total = document.getElementById('checkout-total-price').innerText.replace(/\./g, '');

    // Validaciones
    if (!name || name.length < 2) {
        showToast('Por favor ingresa un nombre válido (mínimo 2 caracteres).', 'error');
        document.getElementById('cust-name').focus();
        return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
        showToast('Ingresa un número de WhatsApp válido de 10 dígitos.', 'error');
        document.getElementById('cust-phone').focus();
        return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Ingresa un correo electrónico válido o deja el campo vacío.', 'error');
        document.getElementById('cust-email').focus();
        return;
    }
    if (!address || address.length < 10) {
        showToast('Por favor ingresa una dirección completa.', 'error');
        document.getElementById('cust-address').focus();
        return;
    }
    if (!city || city.length < 3) {
        showToast('Por favor ingresa una ciudad válida.', 'error');
        document.getElementById('cust-city').focus();
        return;
    }

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> PROCESANDO...';
    btn.disabled = true;

    let productList = "";
    cart.forEach((item, index) => {
        productList += `${index + 1}. *${item.name}* [Talla: ${item.size}] x${item.quantity}\n`;
    });

    const message =
        `⚽ *NUEVO PEDIDO: #LD-${Math.floor(1000 + Math.random() * 9000)}* ⚽\n` +
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
        `💰 *TOTAL: COP $${total}*\n\n` +
        `🚀 _Enviado desde Lucho Díaz Shop_`;

    const whatsappUrl = `https://wa.me/573044359009?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        cart = [];
        saveCart();
        updateUI();
        checkoutModal.classList.remove('active');
        overlay.classList.remove('active');
        btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> CONFIRMAR POR WHATSAPP';
        btn.disabled = false;
        e.target.reset();
        showToast('¡Pedido enviado exitosamente! Revisa WhatsApp para confirmar.', 'success');
    }, 500);
};