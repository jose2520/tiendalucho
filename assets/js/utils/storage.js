/**
 * UTILS/STORAGE.JS - GESTIÓN DE ALMACENAMIENTO LOCAL
 * Proporciona funciones para guardar y cargar datos del localStorage.
 * Facilita la persistencia del carrito entre sesiones.
 */

const StorageUtil = {
    /**
     * Guarda datos en localStorage de forma segura
     * @param {string} key - Clave de almacenamiento
     * @param {any} data - Datos a guardar
     */
    save: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    /**
     * Carga datos del localStorage de forma segura
     * @param {string} key - Clave de almacenamiento
     * @param {any} defaultValue - Valor por defecto si no existe
     * @returns {any} Datos cargados o valor por defecto
     */
    load: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return defaultValue;
        }
    },

    /**
     * Elimina un elemento del localStorage
     * @param {string} key - Clave a eliminar
     */
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    /**
     * Limpia todo el localStorage
     */
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};
