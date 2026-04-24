/**
 * UTILS/HELPERS.JS - FUNCIONES AUXILIARES
 * Contiene funciones reutilizables para operaciones comunes.
 * Facilita la legibilidad y mantenibilidad del código.
 */

const Helpers = {
    /**
     * Formatea un número como moneda
     * @param {number} amount - Cantidad a formatear
     * @returns {string} Cantidad formateada
     */
    formatCurrency: function(amount) {
        return new Intl.NumberFormat(CONFIG.currency.locale, {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(amount);
    },

    /**
     * Convierte una cadena de precio en número
     * @param {string|number} value - Valor a normalizar
     * @returns {number} Precio numérico
     */
    parsePrice: function(value) {
        if (typeof value === 'number') return value;
        const normalized = String(value)
            .replace(/COP|\$|\s/g, '')
            .replace(/\./g, '')
            .replace(/,/g, '.');
        const parsed = Number(normalized);
        return Number.isFinite(parsed) ? parsed : 0;
    },

    /**
     * Obtiene la talla por defecto según la categoría
     * @param {string} category - Categoría del producto
     * @returns {string} Talla por defecto
     */
    getDefaultSize: function(category) {
        if (!category || !CONFIG.sizes[category]) return 'Única';
        return CONFIG.sizes[category][0] || 'Única';
    },

    /**
     * Valida un email
     * @param {string} email - Email a validar
     * @returns {boolean} true si es válido
     */
    isValidEmail: function(email) {
        if (!email) return true; // Campo opcional
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    /**
     * Valida un número de WhatsApp
     * @param {string} phone - Número a validar
     * @returns {boolean} true si es válido
     */
    isValidPhone: function(phone) {
        return /^[0-9]{10}$/.test(phone);
    },

    /**
     * Obtiene un elemento DOM de forma segura
     * @param {string} selector - Selector CSS
     * @returns {HTMLElement|null} Elemento encontrado
     */
    getElement: function(selector) {
        return document.querySelector(selector);
    },

    /**
     * Obtiene múltiples elementos DOM
     * @param {string} selector - Selector CSS
     * @returns {NodeList} Elementos encontrados
     */
    getElements: function(selector) {
        return document.querySelectorAll(selector);
    },

    /**
     * Añade event listeners a múltiples elementos
     * @param {string} selector - Selector CSS
     * @param {string} event - Nombre del evento
     * @param {Function} callback - Función a ejecutar
     */
    addEventToAll: function(selector, event, callback) {
        this.getElements(selector).forEach(element => {
            element.addEventListener(event, callback);
        });
    },

    /**
     * Genera un ID único
     * @returns {string} ID único
     */
    generateId: function() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Debounce para funciones
     * @param {Function} func - Función a debounce
     * @param {number} wait - Tiempo de espera en ms
     * @returns {Function} Función debounced
     */
    debounce: function(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }
};
