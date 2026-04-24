/**
 * LÓGICA DEL CARRITO Y PRODUCTOS
 * Tienda Lucho Díaz Shop
 */

// --- CONFIGURACIÓN DE PRODUCTOS ---
const tallas = {
    ropa: ['S', 'M', 'L', 'XL'],
    calzado: ['38', '39', '40', '41', '42']
};

let cart = [];

// --- FUNCIONES DE NOTIFICACIONES ---
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- FUNCIONES DEL CARRITO ---
function getDefaultSize(category) {
    if (!category || !tallas[category]) return 'Única';
    return tallas[category][0] || 'Única';
}

function saveCart() {
    localStorage.setItem('luchoCart', JSON.stringify(cart));
}

function loadCart() {
    try {
        cart = JSON.parse(localStorage.getItem('luchoCart')) || [];
        cart = cart.map(item => ({
            ...item,
            quantity: item.quantity && item.quantity > 0 ? item.quantity : 1
        }));
    } catch {
        cart = [];
    }
    updateUI();
}

function addToCart(name, price, size = "Única", quantity = 1) {
    const parsedPrice = parseFloat(price);
    if (Number.isNaN(parsedPrice) || quantity < 1) return;

    const existingIndex = cart.findIndex(item => item.name === name && item.size === size);
    if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({ name, price: parsedPrice, size, quantity });
    }

    saveCart();
    updateUI();
    showToast(`${name} agregado al carrito (${quantity} ${quantity === 1 ? 'unidad' : 'unidades'})`);
}

function updateUI() {
    const items = document.getElementById('cart-items');
    items.innerHTML = cart.length ? '' : '<p style="text-align:center; opacity:0.5; padding: 20px;">Tu bolsa está vacía</p>';

    cart.forEach((item, i) => {
        const d = document.createElement('div');
        d.className = 'cart-item';
        d.innerHTML = `
            <div class="cart-item-header">
                <div>
                    <h4 style="font-size:0.8rem; margin-bottom: 0.3rem;">${item.name} (${item.size})</h4>
                    <div class="cart-item-meta">
                        <span>Cantidad: ${item.quantity}</span>
                        <span>Precio unidad: COP $${item.price.toLocaleString()}</span>
                    </div>
                </div>
                <button onclick="removeItem(${i})" style="color:var(--primary); background:none; border:none; cursor:pointer; font-weight:600">Eliminar</button>
            </div>
            <div class="cart-item-controls">
                <button onclick="changeQuantity(${i}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${i}, 1)">+</button>
                <span style="margin-left:auto; font-weight:700;">Subtotal: COP $${(item.price * item.quantity).toLocaleString()}</span>
            </div>
        `;
        items.appendChild(d);
    });

    const total = cart.reduce((s, x) => s + x.price * x.quantity, 0).toLocaleString();
    document.getElementById('cart-count').innerText = cart.reduce((s, x) => s + x.quantity, 0);
    document.getElementById('total-price').innerText = total;
    document.getElementById('checkout-total-price').innerText = total;
    document.getElementById('checkout-btn').disabled = cart.length === 0;
}

window.removeItem = (i) => {
    const item = cart[i];
    cart.splice(i, 1);
    saveCart();
    updateUI();
    showToast(`${item.name} eliminado del carrito`);
};

window.changeQuantity = (i, delta) => {
    const item = cart[i];
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        cart.splice(i, 1);
    }
    saveCart();
    updateUI();
};

// --- FUNCIONES DE PRODUCTOS ---
function renderProducts(category = 'all', searchTerm = '', sortBy = 'name-asc') {
    const grid = document.getElementById('products-container');
    if (!grid) return;

    grid.innerHTML = '';
    
    // Filtrar productos según la categoría seleccionada
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Ordenar productos
    filteredProducts.sort((a, b) => {
        switch (sortBy) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            default:
                return 0;
        }
    });

    // Función auxiliar para crear una card de producto
    function createProductCard(product) {
        const article = document.createElement('article');
        article.className = 'card';
        article.dataset.name = product.name;
        article.dataset.price = product.price;
        article.dataset.category = product.category;
        article.dataset.image = product.image;
        article.innerHTML = `
            <div class="card-img-wrapper"><img src="${product.image}" alt="${product.name}"></div>
            <h3>${product.name}</h3>
            <span class="price">COP $${product.price.toLocaleString()}</span>
            <button class="btn-add btn-buy">Añadir al Carrito</button>
        `;
        return article;
    }

    // Renderizar productos filtrados
    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="text-align:center; opacity:0.5; padding: 40px; grid-column: 1 / -1;">No se encontraron productos que coincidan con tu búsqueda.</p>';
        document.getElementById('products-count').textContent = '';
    } else {
        filteredProducts.forEach(product => {
            grid.appendChild(createProductCard(product));
        });
        const countText = filteredProducts.length === 1 ? '1 producto encontrado' : `${filteredProducts.length} productos encontrados`;
        document.getElementById('products-count').textContent = countText;
    }
}

function setupProductEvents() {
    document.querySelectorAll('.card').forEach(card => {
        card.onclick = (e) => {
            if (e.target.classList.contains('btn-buy')) return;

            document.getElementById('modal-name').innerText = card.dataset.name;
            const modalImage = document.getElementById('modal-img-target');
            modalImage.src = card.dataset.image || '';
            modalImage.alt = card.dataset.name || 'Producto';
            document.getElementById('modal-price').innerText = `COP $${parseFloat(card.dataset.price).toLocaleString()}`;
            document.getElementById('modal-qty').value = 1;

            const sizeContainer = document.getElementById('modal-sizes');
            sizeContainer.innerHTML = '';
            const cat = card.dataset.category || 'ropa';
            tallas[cat].forEach(t => {
                const b = document.createElement('button');
                b.className = 'size-btn';
                b.innerText = t;
                b.onclick = () => {
                    document.querySelectorAll('.size-btn').forEach(x => x.classList.remove('active'));
                    b.classList.add('active');
                };
                sizeContainer.appendChild(b);
            });
            const firstButton = sizeContainer.querySelector('.size-btn');
            if (firstButton) firstButton.classList.add('active');

            document.getElementById('product-modal').classList.add('active');
            document.getElementById('overlay').classList.add('active');
        };
    });

    document.querySelectorAll('.card .btn-buy').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = e.target.closest('.card');
            addToCart(card.dataset.name, card.dataset.price, getDefaultSize(card.dataset.category), 1);
        });
    });
}

// --- FUNCIONES DE FILTROS ---
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentCategory = 'all';
    let currentSearch = '';
    let currentSort = 'name-asc';

    // Función para renderizar con todos los filtros
    function renderWithFilters() {
        renderProducts(currentCategory, currentSearch, currentSort);
        setupProductEvents();
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            // Obtener la categoría del botón
            currentCategory = button.dataset.category;
            
            // Renderizar productos filtrados
            renderWithFilters();
        });
    });

    // Configurar búsqueda
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.trim();
            renderWithFilters();
        });
    }

    // Configurar ordenamiento
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderWithFilters();
        });
    }
}

// --- INICIALIZACIÓN ---
function initShop() {
    renderProducts();
    setupProductEvents();
    setupCategoryFilters();
    loadCart();
}