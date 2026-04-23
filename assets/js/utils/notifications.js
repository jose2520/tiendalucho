/**
 * UTILS/NOTIFICATIONS.JS - SISTEMA DE NOTIFICACIONES
 * Crea y muestra notificaciones toast (emergentes) al usuario.
 * Se utiliza para confirmar acciones, mostrar errores, etc.
 */

const Notification = {
    /**
     * Muestra una notificación toast
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de notificación ('success' o 'error')
     * @param {number} duration - Duración en milisegundos (default: 3000)
     */
    show: function(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'success' 
            ? 'fa-check-circle' 
            : 'fa-exclamation-triangle';
        
        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation after creation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove toast after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    },

    /**
     * Muestra una notificación de éxito
     * @param {string} message - Mensaje a mostrar
     */
    success: function(message) {
        this.show(message, 'success');
    },

    /**
     * Muestra una notificación de error
     * @param {string} message - Mensaje a mostrar
     */
    error: function(message) {
        this.show(message, 'error');
    }
};

// Alias para mantener compatibilidad con código existente
function showToast(message, type = 'success') {
    Notification.show(message, type);
}
