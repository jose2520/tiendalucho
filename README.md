# Tienda Lucho Díaz Shop

Tienda oficial de productos inspirados en Luis Díaz, el talentoso futbolista colombiano.

## 🚀 Características

- **Carrito de compras** con persistencia en localStorage
- **Búsqueda y filtrado** de productos en tiempo real
- **Ordenamiento** por nombre y precio
- **Modal de producto** con selección de talla y cantidad
- **Compra rápida** desde las tarjetas
- **Checkout completo** con validación y envío por WhatsApp
- **Precios en pesos colombianos (COP)** con formato local
- **Responsive design** para móviles y desktop
- **Notificaciones toast** para feedback de usuario

## 📁 Arquitectura del Proyecto

```
TIENDALUCHO/
├── index.html          # Estructura principal y home
├── assets/             # Archivos estáticos
│   ├── css/
│   │   └── styles.css  # Diseño de la tienda
│   ├── js/
│   │   ├── main.js     # Lógica general (DOM, modales, checkout)
│   │   └── shop.js     # Lógica del carrito y productos
│   └── images/         # Fotos de productos y logo
├── data/
│   └── products.js     # Base de datos local en JS
├── README.md           # Documentación del proyecto
└── .vscode/            # Configuración de VS Code
```

## 🛠️ Instalación y Uso

1. **Clona o descarga** el proyecto
2. **Abre** `index.html` en tu navegador web
3. **Navega** por los productos y agrega al carrito
4. **Completa** el checkout para enviar pedido por WhatsApp

### Requisitos
- Navegador web moderno con JavaScript habilitado
- Conexión a internet para cargar fuentes e íconos

## 📦 Cómo agregar productos

Edita `data/products.js` y agrega objetos al array `products`:

```javascript
{
    name: "Nombre del Producto",
    price: 99999,  // Precio en COP sin puntos
    category: "ropa", // "ropa" o "calzado"
    image: "https://url-de-la-imagen.jpg"
}
```

Los productos se renderizan automáticamente al cargar la página.

## 🔧 Desarrollo

### Archivos principales:
- `main.js`: Maneja la interfaz general, modales y proceso de checkout
- `shop.js`: Maneja productos, carrito, búsqueda y filtros

### Funcionalidades técnicas:
- **Persistencia**: Carrito guardado en localStorage
- **Validación**: Formularios con regex y mensajes de error
- **UX**: Notificaciones toast, animaciones suaves
- **Integración**: Envío directo a WhatsApp con mensaje formateado

## 📱 Responsive Design

La tienda está optimizada para:
- **Desktop**: Layout completo con grid
- **Tablet**: Ajustes en espaciado y tamaños
- **Mobile**: Navegación touch-friendly, modales adaptados

## 🤝 Contribuir

Para contribuir:
1. Haz fork del proyecto
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Envía un pull request

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

## 📞 Contacto

- **WhatsApp**: +57 304 435 9009
- **Email**: ventas@luchodiaz.shop
- **Ubicación**: Barranquilla, Colombia

---

*Desarrollado con ❤️ para los fans de Lucho Díaz*
- `products.js`: Contiene los datos de productos

## Tecnologías

- HTML5, CSS3, JavaScript vanilla
- Font Awesome para iconos
- Google Fonts (Poppins)
- localStorage para persistencia

## 🎨 Animaciones Canvas

Se añadieron dos animaciones Canvas de alto rendimiento para mejorar el diseño:

- `hero-canvas`: animación sutil de ondas y un foco de luz en la cabecera.
- `particles-canvas`: partículas conectadas detrás del grid de productos.

Características importantes:
- Alto rendimiento: soporte para devicePixelRatio (pantallas Retina), `requestAnimationFrame`, pausa automática cuando la pestaña está oculta.
- Accesibilidad: respeta `prefers-reduced-motion` y es capaz de desactivarse.
- Controles en UI: hay un botón flotante en la esquina inferior izquierda que abre un panel para activar/desactivar animaciones y ajustar la densidad de partículas. Los ajustes se guardan en `localStorage`.

Cómo probar y ajustar:
1. Abre `index.html` con un servidor local (por ejemplo `python3 -m http.server`).
2. Haz clic en el icono de "sliders" en la esquina inferior izquierda para abrir el panel de Animaciones.
3. Activa/desactiva "Hero" o "Partículas" y ajusta la intensidad de partículas con el slider. Los cambios se guardan automáticamente.

Si quieres cambiar valores por defecto o el comportamiento programáticamente, revisa `assets/js/canvas-animations.js`.