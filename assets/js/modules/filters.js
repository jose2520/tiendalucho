/**
 * MODULES/FILTERS.JS - FILTROS Y BÚSQUEDA
 * Maneja la búsqueda y filtrado de productos.
 * Coordina entre búsqueda, categorías y ordenamiento.
 */

const Filters = {
    // Estado actual de filtros
    state: {
        category: 'all',
        searchTerm: '',
        sortBy: 'name-asc'
    },

    /**
     * Configura los eventos de filtros y búsqueda
     */
    setup: function() {
        this.setupCategoryButtons();
        this.setupSearchInput();
        this.setupSortSelect();
    },

    /**
     * Configura botones de categoría
     */
    setupCategoryButtons: function() {
        const buttons = document.querySelectorAll('.filter-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Agregar clase active al clickeado
                button.classList.add('active');
                
                // Actualizar estado
                this.state.category = button.dataset.category;
                
                // Renderizar
                this.render();
            });
        });
    },

    /**
     * Configura input de búsqueda
     */
    setupSearchInput: function() {
        const searchInput = document.getElementById('search-input');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.state.searchTerm = e.target.value.trim();
                this.render();
            });
        }
    },

    /**
     * Configura select de ordenamiento
     */
    setupSortSelect: function() {
        const sortSelect = document.getElementById('sort-select');
        
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.state.sortBy = e.target.value;
                this.render();
            });
        }
    },

    /**
     * Renderiza productos con los filtros actuales
     */
    render: function() {
        Products.render(
            this.state.category,
            this.state.searchTerm,
            this.state.sortBy
        );
        Products.setupEvents();
    }
};
