/**
 * MODULES/PRODUCTS.JS - GESTIÓN DE PRODUCTOS
 * Maneja el renderizado, búsqueda y filtrado de productos.
 * Crea las tarjetas de productos dinámicamente.
 */

const Products = {
    initialized: false,

    /**
     * Renderiza los productos en la grilla según filtros
     * @param {string} category - Categoría a filtrar
     * @param {string} searchTerm - Término de búsqueda
     * @param {string} sortBy - Criterio de ordenamiento
     */
    render: function(category = 'all', searchTerm = '', sortBy = 'name-asc') {
        const grid = document.getElementById('products-container');
        if (!grid) return;

        grid.innerHTML = '';
        
        // Filtrar por categoría
        let filteredProducts = products;
        if (category !== 'all') {
            filteredProducts = products.filter(p => p.category === category);
        }

        // Filtrar por búsqueda
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
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

        // Renderizar tarjetas
        if (filteredProducts.length === 0) {
            grid.innerHTML = `
                <p style="text-align:center; opacity:0.5; padding: 40px; grid-column: 1 / -1;">
                    ${CONFIG.messages.emptySearch}
                </p>
            `;
            document.getElementById('products-count').textContent = '';
        } else {
            const fragment = document.createDocumentFragment();
            filteredProducts.forEach(product => {
                fragment.appendChild(this.createCard(product));
            });
            grid.appendChild(fragment);

            const countText = filteredProducts.length === 1 
                ? '1 producto encontrado' 
                : `${filteredProducts.length} productos encontrados`;
            document.getElementById('products-count').textContent = countText;
        }
    },

    /**
     * Crea una tarjeta de producto
     * @param {Object} product - Objeto del producto
     * @returns {HTMLElement} Elemento de la tarjeta
     */
    createCard: function(product) {
        const article = document.createElement('article');
        article.className = 'card';
        article.dataset.name = product.name;
        article.dataset.price = product.price;
        article.dataset.category = product.category;
        article.dataset.image = product.image;
        
        article.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <span class="price">COP $${product.price.toLocaleString()}</span>
            <button class="btn-add btn-buy">Añadir al Carrito</button>
        `;
        
        return article;
    },

    /**
     * Configura los eventos de las tarjetas de productos
     */
    setupEvents: function() {
        if (this.initialized) return;

        const grid = document.getElementById('products-container');
        if (!grid) return;

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (!card) return;

            const buyButton = e.target.closest('.btn-buy');
            if (buyButton) {
                const name = card.dataset.name;
                const price = card.dataset.price;
                const size = Helpers.getDefaultSize(card.dataset.category);
                Cart.add(name, price, size, 1);
                return;
            }

            Modals.openProduct(card);
        });

        this.initialized = true;
    }
};
