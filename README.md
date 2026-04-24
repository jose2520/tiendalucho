# Tienda Lucho Díaz Shop

Tienda  de productos inspirados en Luis Díaz, el talentoso futbolista colombiano.

[![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-green.svg)](LICENSE)
[![Versión](https://img.shields.io/badge/Versión-1.0-blue.svg)]()
[![Estado](https://img.shields.io/badge/Estado-Activo-success.svg)]()

## 🚀 Resumen del proyecto

Este proyecto es una tienda en línea completamente funcional y modular, dedicada a productos inspirados en Luis Díaz. Ha sido refactorizado a una estructura modular y escalable, con separación clara entre estilos, lógica y datos.

- **CSS modularizado** en `assets/css/` con variables, componentes, layouts y utilidades.
- **JavaScript dividido** en utilidades (`assets/js/utils/`), módulos de negocio (`assets/js/modules/`) y archivos de configuración.
- **Soporte completo** para carrito con persistencia, búsqueda, filtros, modales, checkout y animaciones Canvas.
- **Diseño responsive** optimizado para desktop, tablet y móvil.
- **Accesibilidad WCAG 2.1** implementada.

## 📚 Tabla de contenido

- [Resumen del proyecto](#-resumen-del-proyecto)
- [Funcionalidades principales](#-funcionalidades-principales)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [CSS modularizado](#-css-modularizado)
- [JavaScript modularizado](#-javascript-modularizado)
- [Orden de carga recomendado](#-orden-de-carga-recomendado)
- [Uso rápido](#-uso-rápido)
- [Agregar nuevos productos](#-agregar-nuevos-productos)
- [API de Módulos](#-api-de-módulos)
- [Resumen de cambios](#-resumen-de-cambios)
- [Próximos pasos sugeridos](#-próximos-pasos-sugeridos)

## ✨ Funcionalidades principales

- 🛒 **Carrito de compras** con persistencia en `localStorage`
- 🔍 **Búsqueda y filtrado** de productos en tiempo real
- 📊 **Ordenamiento** por nombre y precio
- 🔲 **Modal de producto** con selección de talla y cantidad
- 💳 **Checkout** con validación y envío por WhatsApp
- 💰 **Precios en COP** con formato local colombiano
- 📱 **Diseño responsive** para múltiples dispositivos
- 🔔 **Notificaciones toast** para feedback de usuario
- 🎨 **Panel de control** para animaciones Canvas
- ❓ **Sección FAQ** con preguntas frecuentes
- 📏 **Guía de tallas** integrada

## 📁 Estructura del proyecto

```
tiendalucho/
├── index.html                    # Página principal HTML
├── LICENSE                       # Licencia MIT
├── README.md                     # Documentación combinada
├── data/
│   └── products.js               # Base de datos de productos
└── assets/
    ├── css/
    │   ├── styles.css            # Archivo principal (importa módulos)
    │   ├── variables/            # Variables globales CSS
    │   ├── components/           # Componentes UI reutilizables
    │   ├── layouts/              # Layouts y estructuras
    │   └── utils/                # Utilidades CSS
    └── js/
        ├── config.js             # Configuración global
        ├── main.js               # Inicialización principal
        ├── canvas-animations.js  # Animaciones visuales
        ├── utils/                # Utilidades JavaScript
        └── modules/              # Módulos de lógica de negocio
```

## 🧩 CSS modularizado

- `assets/css/variables/`: colores, tipografía, efectos y espaciado.
- `assets/css/components/`: estilos por componente como navbar, hero, cards, carrito, modals, botones, filtros y FAQ.
- `assets/css/layouts/`: contenedores generales y footer.
- `assets/css/utils/`: animaciones, notificaciones, responsive y accesibilidad.

## 🛠️ JavaScript modularizado

### Configuración
- `assets/js/config.js`: constantes globales, claves de `localStorage`, configuración de moneda y mensajes.

### Utilidades
- `assets/js/utils/storage.js`: gestión de datos en `localStorage`.
- `assets/js/utils/notifications.js`: notificaciones toast.
- `assets/js/utils/helpers.js`: formateo de moneda, validaciones, debounce y utilidades DOM.

### Módulos de negocio
- `assets/js/modules/cart.js`: manejo del carrito, cantidades y totales.
- `assets/js/modules/products.js`: renderizado de productos y tarjetas.
- `assets/js/modules/modals.js`: control de modales, checkout y FAQ.
- `assets/js/modules/filters.js`: filtros por categoría, búsqueda y ordenamiento.

### Inicialización
- `assets/js/main.js`: orquesta la carga, eventos y la interacción general.

## 🔄 Orden de carga recomendado

1. `assets/js/config.js`
2. `assets/js/utils/storage.js`
3. `assets/js/utils/notifications.js`
4. `assets/js/utils/helpers.js`
5. `assets/js/modules/cart.js`
6. `assets/js/modules/products.js`
7. `assets/js/modules/modals.js`
8. `assets/js/modules/filters.js`
9. `data/products.js`
10. `assets/js/canvas-animations.js`
11. `assets/js/main.js`

## 📌 Uso rápido

1. Clona o descarga el proyecto.
2. Abre `index.html` en tu navegador o usa un servidor local.
3. Navega los productos, agrégalos al carrito y completa el checkout.
4. Confirma el pedido por WhatsApp.

## 📦 Agregar nuevos productos

Edita `data/products.js` y agrega productos al array `products` con esta estructura:

```javascript
{
  name: "Nombre del Producto",
  price: 99999,
  category: "ropa", // o "calzado"
  image: "https://url-de-la-imagen.jpg"
}
```

## 📚 API de Módulos

### Cart (assets/js/modules/cart.js)

```javascript
// Agregar producto al carrito
Cart.add(name, price, size, quantity)

// Remover producto por índice
Cart.remove(index)

// Cambiar cantidad de producto
Cart.changeQuantity(index, delta)

// Obtener total del carrito
Cart.getTotal() // Retorna: number

// Obtener cantidad de items
Cart.getItemCount() // Retorna: number

// Cargar carrito desde localStorage
Cart.load()

// Guardar carrito en localStorage
Cart.save()

// Vaciar carrito
Cart.clear()

// Actualizar interfaz del carrito
Cart.updateUI()
```

### Products (assets/js/modules/products.js)

```javascript
// Renderizar productos con filtros
Products.render(category, searchTerm, sortBy)

// Crear tarjeta de producto
Products.createCard(product) // Retorna: HTMLElement

// Configurar eventos de productos
Products.setupEvents()
```

### Modals (assets/js/modules/modals.js)

```javascript
// Abrir modal de producto
Modals.openProduct(card)

// Abrir carrito
Modals.openCart()

// Abrir checkout
Modals.openCheckout()

// Abrir guía de tallas
Modals.openSizeGuide()

// Abrir FAQ
Modals.openFAQ()

// Cerrar modal específico
Modals.close(selector)

// Cerrar todos los modales
Modals.closeAll()

// Configurar eventos de modales
Modals.setupEvents()
```

### Filters (assets/js/modules/filters.js)

```javascript
// Inicializar filtros
Filters.setup()
```

## 📌 Resumen de cambios

### Estructura de carpetas creada

```
assets/
├── css/
│   ├── variables/      (4 archivos)
│   ├── components/     (13 archivos)
│   ├── layouts/        (2 archivos)
│   └── utils/          (4 archivos)
└── js/
    ├── utils/          (3 archivos)
    ├── modules/        (4 archivos)
    ├── config.js
    ├── main.js
    ├── canvas-animations.js
```

### CSS modularizado

- `variables/`: colores, tipografía, efectos, espaciado.
- `components/`: reset, loader, navbar, hero, buttons, cards, cart, modals, forms, search-filter, canvas-settings, faq.
- `layouts/`: container y footer.
- `utils/`: animations, notifications, responsive, accessibility.

### JavaScript modularizado

- `config.js`: configuración global.
- `main.js`: inicialización principal.
- `utils/storage.js`: `save()`, `load()`, `remove()`, `clear()`.
- `utils/notifications.js`: `show()`, `success()`, `error()`.
- `utils/helpers.js`: formateo y utilidades.
- `modules/cart.js`: `add()`, `remove()`, `getTotal()`, `load()`, `save()`.
- `modules/products.js`: renderizado y tarjetas.
- `modules/modals.js`: diálogos y eventos.
- `modules/filters.js`: filtros y búsqueda.

### Orden de carga de scripts

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

## 🎯 Características de la nueva estructura

- ✅ **Separación de responsabilidades**
- ✅ **Reutilización de código**
- ✅ **Fácil mantenimiento**
- ✅ **Escalabilidad**
- ✅ **Documentación**
- ✅ **Organización visual**
- ✅ **Performance**
- ✅ **Accesibilidad**

## 📊 Comparativa: Antes vs Después

### ANTES

- `assets/css/styles.css` era un único archivo con estilos mezclados.
- `assets/js/main.js` contenía parte de la lógica de inicialización junto a archivos heredados.

### DESPUÉS

- `assets/css/` con variables, componentes, layouts y utilidades.
- `assets/js/` con config, utils y módulos separados.

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| **Total de archivos CSS** | 23 |
| **Total de archivos JS** | 12 |
| **Métodos reutilizables** | 30+ |
| **Líneas de código comentadas** | 200+ |
| **Variables CSS definidas** | 30+ |
| **Breakpoints responsive** | 3 |

## 🚀 Próximos pasos sugeridos

1. Agregar unit tests para módulos.
2. Minificar CSS y JS en producción.
3. Implementar versionado de componentes.
4. Crear guía de componentes o Storybook.
5. Añadir CI/CD para validación de código.
6. Implementar lazy loading de módulos.

## 🎨 Estructura visual del proyecto

```
tiendalucho/
│
├── 📄 index.html                          # Página principal
├── 📄 README.md                           # Documentación combinada
├── 📄 LICENSE
│
├── 📂 data/
│   └── products.js                        # Base de datos de productos
│
└── 📂 assets/
    │
    ├── 📂 css/
    │   │
    │   ├── 📄 styles.css                  # Main (importa todos los módulos)
    │   │
    │   ├── 📂 variables/                  # Variables globales (4 archivos)
    │   │   ├── colors.css                 # Colores
    │   │   ├── typography.css             # Tipografía
    │   │   ├── effects.css                # Efectos (sombras, transiciones)
    │   │   └── spacing.css                # Espaciado
    │   │
    │   ├── 📂 components/                 # Componentes UI (13 archivos)
    │   │   ├── reset.css                  # Reset y base
    │   │   ├── loader.css                 # Pantalla de carga
    │   │   ├── navbar.css                 # Barra de navegación
    │   │   ├── hero.css                   # Sección hero
    │   │   ├── buttons.css                # Botones
    │   │   ├── cards.css                  # Tarjetas de productos
    │   │   ├── cart.css                   # Carrito lateral
    │   │   ├── modals.css                 # Diálogos modales
    │   │   ├── forms.css                  # Formularios
    │   │   ├── search-filter.css          # Búsqueda y filtros
    │   │   ├── canvas-settings.css        # Panel de configuración
    │   │   └── faq.css                    # Preguntas frecuentes
    │   │
    │   ├── 📂 layouts/                    # Layouts de página (2 archivos)
    │   │   ├── container.css              # Contenedores
    │   │   └── footer.css                 # Pie de página
    │   │
    │   └── 📂 utils/                      # Utilidades CSS (4 archivos)
    │       ├── animations.css             # Animaciones
    │       ├── notifications.css          # Notificaciones
    │       ├── responsive.css              # Responsive design
    │       └── accessibility.css          # Accesibilidad
    │
    └── 📂 js/
        │
        ├── 📄 config.js                   # Configuración global
        ├── 📄 main.js                     # Inicialización y orquestación
        ├── 📄 canvas-animations.js        # Animaciones de canvas
        │
        ├── 📂 utils/                      # Utilidades (3 archivos)
        │   ├── storage.js                 # Gestión de localStorage
        │   ├── notifications.js           # Sistema de notificaciones
        │   └── helpers.js                 # Funciones auxiliares
        │
        └── 📂 modules/                    # Módulos de lógica (4 archivos)
            ├── cart.js                    # Gestión del carrito
            ├── products.js                # Productos y renderizado
            ├── modals.js                  # Control de diálogos
            └── filters.js                 # Búsqueda y filtros
```
