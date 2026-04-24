/**
 * MODULES/PRODUCTS.JS - PRODUCT MANAGEMENT
 * Handles rendering, search, and filtering of products.
 * Creates product cards dynamically.
 */

const Products = {
    /**
     * Renders products in the grid using current filters
     * @param {string} category - Category to filter
     * @param {string} searchTerm - Search query
     * @param {string} sortBy - Sort criteria
     */
    render: function(category = 'all', searchTerm = '', sortBy = 'name-asc') {
        const grid = document.getElementById('products-container');
        if (!grid) return;

        grid.innerHTML = '';
        
        // Filter by category
        let filteredProducts = products;
        if (category !== 'all') {
            filteredProducts = products.filter(p => p.category === category);
        }

        // Filter by search
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort products
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

        // Render cards
        if (filteredProducts.length === 0) {
            grid.innerHTML = `
                <p style="text-align:center; opacity:0.5; padding: 40px; grid-column: 1 / -1;">
                    ${CONFIG.messages.emptySearch}
                </p>
            `;
            document.getElementById('products-count').textContent = '';
        } else {
            filteredProducts.forEach(product => {
                grid.appendChild(this.createCard(product));
            });
            
            const countText = filteredProducts.length === 1 
                ? '1 product found' 
                : `${filteredProducts.length} products found`;
            document.getElementById('products-count').textContent = countText;
        }
    },

    /**
     * Creates a product card element
     * @param {Object} product - Product object
     * @returns {HTMLElement} Card element
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
                <img data-src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <h3>${product.name}</h3>
            <span class="price">COP $${product.price.toLocaleString()}</span>
            <button class="btn-add btn-buy">Add to Cart</button>
        `;
        
        return article;
    },

    /**
     * Configures product card events
     */
    setupEvents: function() {
        // Click on card opens product modal
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-buy')) return;
                Modals.openProduct(card);
            });
        });

        // Quick buy button
        document.querySelectorAll('.card .btn-buy').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = e.target.closest('.card');
                Cart.add(
                    card.dataset.name,
                    card.dataset.price,
                    Helpers.getDefaultSize(card.dataset.category),
                    1
                );
            });
        });
    }
};
