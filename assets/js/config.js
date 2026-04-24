/**
 * CONFIG.JS - GLOBAL CONFIGURATION
 * Centralizes constants and settings used throughout the application.
 * Makes global updates easier without editing multiple files.
 */

const CONFIG = {
    // Sizes available by category
    sizes: {
        ropa: ['S', 'M', 'L', 'XL'],
        calzado: ['38', '39', '40', '41', '42']
    },
    
    // localStorage keys
    storage: {
        CART_KEY: 'luchoDIAZCart',
        CANVAS_SETTINGS_KEY: 'luchoDIAZCanvasSettings_v1'
    },
    
    // Currency and format
    currency: {
        symbol: 'COP $',
        locale: 'es-CO'
    },
    
    // WhatsApp contact
    whatsapp: {
        phoneNumber: '573044359009',
        baseUrl: 'https://wa.me/'
    },
    
    // Messages
    messages: {
        cartEmpty: 'Your bag is empty',
        emptySearch: 'No products matched your search.',
        selectSize: 'Please select a size.'
    }
};

// Export for other modules (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
