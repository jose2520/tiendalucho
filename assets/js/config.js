/**
 * CONFIG.JS - CONFIGURACIÓN GLOBAL
 * Centraliza constantes y configuración que se usan en toda la aplicación.
 * Facilita cambios globales sin modificar múltiples archivos.
 */

const CONFIG = {
    // Tallas disponibles por categoría
    sizes: {
        ropa: ['S', 'M', 'L', 'XL'],
        calzado: ['38', '39', '40', '41', '42']
    },
    
    // Claves de localStorage
    storage: {
        CART_KEY: 'luchoDIAZCart',
        CANVAS_SETTINGS_KEY: 'luchoDIAZCanvasSettings_v1'
    },
    
    // Moneda y formato
    currency: {
        symbol: 'COP $',
        locale: 'es-CO'
    },
    
    // Contacto WhatsApp
    whatsapp: {
        phoneNumber: '573044359009',
        baseUrl: 'https://wa.me/'
    },
    
    // Mensajes
    messages: {
        cartEmpty: 'Tu bolsa está vacía',
        emptySearch: 'No se encontraron productos que coincidan con tu búsqueda.',
        selectSize: 'Por favor, selecciona una talla.'
    }
};

// Exportar para uso en otros módulos (si se usa módulos ES6)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
