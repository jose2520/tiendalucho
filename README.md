# Tienda Lucho Díaz Shop

Tienda oficial de productos inspirados en Luis Díaz, con una versión modularizada del frontend para facilitar mantenimiento y escalabilidad.

## 🚀 Características principales

- **Carrito de compras** con persistencia en `localStorage`
- **Búsqueda y filtrado** en tiempo real
- **Ordenamiento** por nombre y precio
- **Modal de producto** con selección de talla y cantidad
- **Checkout por WhatsApp** con validación de formulario
- **Precios en pesos colombianos (COP)** con formato local
- **Responsive design** para móviles, tabletas y desktop
- **Notificaciones toast** para feedback de usuario
- **Animaciones Canvas** con controles y preferencia de movimiento reducido

## 📁 Estructura del proyecto

```
tiendalucho/
├── index.html
├── LICENSE
├── README.md
├── ESTRUCTURA_MODULAR.md
├── ESTRUCTURA_VISUAL.md
├── RESUMEN_CAMBIOS.md
├── data/
│   └── products.js
└── assets/
    ├── css/
    │   ├── styles.css
    │   ├── variables/
    │   │   ├── colors.css
    │   │   ├── typography.css
    │   │   ├── effects.css
    │   │   └── spacing.css
    │   ├── components/
    │   │   ├── reset.css
    │   │   ├── loader.css
    │   │   ├── navbar.css
    │   │   ├── hero.css
    │   │   ├── buttons.css
    │   │   ├── cards.css
    │   │   ├── cart.css
    │   │   ├── modals.css
    │   │   ├── forms.css
    │   │   ├── search-filter.css
    │   │   ├── canvas-settings.css
    │   │   └── faq.css
    │   ├── layouts/
    │   │   ├── container.css
    │   │   └── footer.css
    │   └── utils/
    │       ├── animations.css
    │       ├── notifications.css
    │       ├── responsive.css
    │       └── accessibility.css
    └── js/
        ├── config.js
        ├── main.js
        ├── canvas-animations.js
        ├── shop.js
        ├── utils/
        │   ├── storage.js
        │   ├── notifications.js
        │   └── helpers.js
        └── modules/
            ├── cart.js
            ├── products.js
            ├── modals.js
            └── filters.js
```

## 🔧 Modularización del frontend

La aplicación está organizada en capas:

- `assets/css/styles.css` importa todos los módulos CSS.
- `assets/css/variables/` define colores, tipografía, espaciado y efectos.
- `assets/css/components/` agrupa estilos por componente visual.
- `assets/css/layouts/` contiene reglas de diseño global.
- `assets/css/utils/` aporta utilidades de animación, notificaciones, responsive y accesibilidad.
- `assets/js/config.js` centraliza constantes globales.
- `assets/js/utils/` contiene helpers reutilizables y acceso a `localStorage`.
- `assets/js/modules/` agrupa la lógica del carrito, renderizado de productos, modales y filtros.
- `assets/js/main.js` orquesta la inicialización general.

## 📋 Carga de scripts en `index.html`

```html
<script src="assets/js/config.js"></script>
<script src="assets/js/utils/storage.js"></script>
<script src="assets/js/utils/notifications.js"></script>
<script src="assets/js/utils/helpers.js"></script>
<script src="assets/js/modules/cart.js"></script>
<script src="assets/js/modules/products.js"></script>
<script src="assets/js/modules/modals.js"></script>
<script src="assets/js/modules/filters.js"></script>
<script src="data/products.js"></script>
<script src="assets/js/canvas-animations.js"></script>
<script src="assets/js/main.js"></script>
```

## 🛠️ Instalación y uso

1. Clona o descarga el proyecto.
2. Abre `index.html` directamente en el navegador o usa un servidor local.
3. Explora productos, agrega al carrito y finaliza la compra por WhatsApp.

### Servidor local recomendado

```bash
python3 -m http.server
```

Luego abre `http://localhost:8000`.

## 📦 Cómo agregar productos

Edita `data/products.js` y agrega nuevos objetos al array `products`:

```javascript
{
  name: "Nombre del Producto",
  price: 99999,
  category: "ropa",
  image: "https://url-de-la-imagen.jpg"
}
```

Los productos se renderizan automáticamente al cargar la página.

## 🛠️ Organización de JavaScript

- `config.js`: constantes y configuración global.
- `storage.js`: guardado y carga en `localStorage`.
- `notifications.js`: mensajes toast.
- `helpers.js`: utilidades como formato de moneda y validación.
- `cart.js`: gestión del carrito, totales y cantidades.
- `products.js`: renderizado de productos y tarjetas.
- `modals.js`: apertura y cierre de modales.
- `filters.js`: búsqueda, filtros de categoría y orden.
- `main.js`: inicializa eventos y conecta todos los módulos.

## 🎨 Organización de CSS

- `variables/`: paleta y tokens de diseño.
- `components/`: estilos separados por bloque UI.
- `layouts/`: estructura de página global.
- `utils/`: utilidades de estilo y accesibilidad.

## 📚 Documentación adicional

- `ESTRUCTURA_MODULAR.md`: guía de la arquitectura modular.
- `RESUMEN_CAMBIOS.md`: resumen de los cambios realizados.
- `ESTRUCTURA_VISUAL.md`: mapa visual de la estructura de archivos.

## 📱 Responsive Design

El sitio está optimizado para:
- Desktop: grilla de productos y navegación completa.
- Tablet: espaciado y columnas adaptadas.
- Mobile: menú simplificado y modales optimizados.

## 🤝 Contribuir

1. Haz fork del proyecto.
2. Crea una rama para tu mejora.
3. Realiza tus cambios.
4. Envía un pull request.

## 📄 Licencia

Licencia MIT.

## 📞 Contacto

- WhatsApp: +57 304 435 9009
- Email: ventas@luchodiaz.shop
- Ubicación: Barranquilla, Colombia
