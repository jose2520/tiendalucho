/**
 * MODULES/FILTERS.JS - FILTERS AND SEARCH
 * Handles product search and filtering.
 * Coordinates category buttons, search input, and sorting.
 */

const Filters = {
    state: {
        category: 'all',
        searchTerm: '',
        sortBy: 'name-asc'
    },

    /**
     * Sets up filter and search events
     */
    setup: function() {
        this.setupCategoryButtons();
        this.setupSearchInput();
        this.setupSortSelect();
    },

    /**
     * Sets up category buttons
     */
    setupCategoryButtons: function() {
        const buttons = document.querySelectorAll('.filter-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.state.category = button.dataset.category;
                this.render();
            });
        });
    },

    /**
     * Sets up search input
     */
    setupSearchInput: function() {
        const searchInput = document.getElementById('search-input');
        
        if (searchInput) {
            const debouncedRender = Helpers.debounce((value) => {
                this.state.searchTerm = value.trim();
                this.render();
            }, 220);

            searchInput.addEventListener('input', (e) => {
                debouncedRender(e.target.value);
            });
        }
    },

    /**
     * Sets up sort select
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
     * Renders products using current filters
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
