# Lucho Díaz Shop - Estructura Modular

## 📋 Descripción General

Este proyecto ha sido refactorizado para seguir una estructura **modular y escalable**, permitiendo mejor mantenimientoy colaboración entre desarrolladores.

---

## 🗂️ Estructura de Carpetas

```
tiendalucho/
├── index.html                    # Archivo HTML principal
├── README.md                      # Este archivo
├── LICENSE
├── data/
│   └── products.js               # Base de datos de productos
├── assets/
│   ├── css/
│   │   ├── styles.css            # Archivo principal que importa todos los módulos
│   │   ├── variables/            # Variables globales
│   │   │   ├── colors.css        # Colores de la aplicación
│   │   │   ├── typography.css    # Tipografía y fuentes
│   │   │   ├── effects.css       # Sombras, transiciones, z-index
│   │   │   └── spacing.css       # Márgenes, paddings, gaps
│   │   │
│   │   ├── components/           # Componentes reutilizables
│   │   │   ├── reset.css         # Reset y estilos base
│   │   │   ├── loader.css        # Pantalla de carga
│   │   │   ├── navbar.css        # Barra de navegación
│   │   │   ├── hero.css          # Sección hero
│   │   │   ├── buttons.css       # Estilos de botones
│   │   │   ├── cards.css         # Tarjetas de productos
│   │   │   ├── cart.css          # Carrito lateral
│   │   │   ├── modals.css        # Diálogos modales
│   │   │   ├── forms.css         # Formularios (checkout, FAQ)
│   │   │   ├── search-filter.css # Búsqueda y filtros
│   │   │   ├── canvas-settings.css # Panel de configuración
│   │   │   └── faq.css           # Preguntas frecuentes
│   │   │
│   │   ├── layouts/              # Layouts y estructuras de página
│   │   │   ├── container.css     # Contenedor y canvas
│   │   │   └── footer.css        # Pie de página y botón WhatsApp
│   │   │
│   │   └── utils/                # Utilidades y herramientas
│   │       ├── animations.css    # Animaciones reutilizables
│   │       ├── notifications.css # Notificaciones toast
│   │       ├── responsive.css    # Media queries y responsive
│   │       └── accessibility.css # Accesibilidad y reglas WCAG
│   │
│   └── js/
│       ├── config.js             # Configuración global
│       ├── main.js               # Inicialización principal
│       ├── utils/                # Funciones auxiliares
│       │   ├── storage.js        # Gestión de localStorage
│       │   ├── notifications.js  # Sistema de notificaciones toast
│       │   └── helpers.js        # Funciones de utilidad general
│       │
│       └── modules/              # Módulos de lógica de negocio
│           ├── cart.js           # Gestión del carrito
│           ├── products.js       # Productos y renderizado
│           ├── modals.js         # Control de diálogos
│           └── filters.js        # Búsqueda y ordenamiento
```

---

## 📦 Archivos CSS Modularizados

### Variables (`css/variables/`)
- **colors.css** - Define colores primarios, secundarios y neutrales
- **typography.css** - Familias, tamaños y pesos de fuentes
- **effects.css** - Sombras, transiciones y z-index
- **spacing.css** - Sistema de espaciado consistente

### Componentes (`css/components/`)
- **reset.css** - Reset CSS y estilos base
- **loader.css** - Pantalla de carga con spinner
- **navbar.css** - Barra de navegación superior
- **hero.css** - Sección hero principal
- **buttons.css** - Estilos de botones (primario, filtro, etc)
- **cards.css** - Tarjetas de productos
- **cart.css** - Carrito lateral deslizable
- **modals.css** - Todos los diálogos modales
- **forms.css** - Formularios de checkout y FAQ
- **search-filter.css** - Barra de búsqueda y filtros
- **canvas-settings.css** - Panel flotante de configuración
- **faq.css** - Sección de preguntas frecuentes

### Layouts (`css/layouts/`)
- **container.css** - Contenedores generales y canvas
- **footer.css** - Pie de página y botón flotante WhatsApp

### Utilidades (`css/utils/`)
- **animations.css** - Animaciones reutilizables (fade, slide, pulse, etc)
- **notifications.css** - Estilos de mensajes emergentes
- **responsive.css** - Media queries para tablets y móviles
- **accessibility.css** - Accesibilidad, focus-visible, prefers-reduced-motion

---

## 🎯 Archivos JavaScript Modularizados

### config.js
Centraliza la configuración global:
- Tallas disponibles por categoría
- Claves de localStorage
- Configuración de moneda
- Contacto de WhatsApp
- Mensajes globales

### Utilidades (`js/utils/`)

**storage.js**
- `StorageUtil.save()` - Guarda en localStorage
- `StorageUtil.load()` - Carga de localStorage
- `StorageUtil.remove()` - Elimina datos
- `StorageUtil.clear()` - Limpia todo el storage

**notifications.js**
Maneja notificaciones emergentes:
- `Notification.show(message, type, duration)`
- `Notification.success(message)` - Notificación verde
- `Notification.error(message)` - Notificación roja
- `showToast()` - Alias para compatibilidad

**helpers.js**
Funciones auxiliares útiles:
- `Helpers.formatCurrency()` - Formatea moneda
- `Helpers.getDefaultSize()` - Obtiene talla por defecto
- `Helpers.isValidEmail()` - Valida email
- `Helpers.isValidPhone()` - Valida número WhatsApp
- `Helpers.getElement()` - Selecciona elemento DOM
- `Helpers.addEventToAll()` - Agrega eventos a múltiples elementos
- `Helpers.debounce()` - Debounce para funciones

### Módulos (`js/modules/`)

**cart.js**
Gestión completa del carrito:
- `Cart.add(name, price, size, quantity)` - Agrega producto
- `Cart.remove(index)` - Elimina producto
- `Cart.changeQuantity(index, delta)` - Cambia cantidad
- `Cart.getTotal()` - Total del carrito
- `Cart.getItemCount()` - Cantidad de items
- `Cart.load()` - Carga del localStorage
- `Cart.save()` - Guarda en localStorage
- `Cart.clear()` - Vacía carrito
- `Cart.updateUI()` - Actualiza interfaz

**products.js**
Renderizado y gestión de productos:
- `Products.render(category, searchTerm, sortBy)` - Renderiza productos
- `Products.createCard(product)` - Crea tarjeta de producto
- `Products.setupEvents()` - Configura eventos de tarjetas

**modals.js**
Control de diálogos modales:
- `Modals.openProduct(card)` - Abre modal de producto
- `Modals.openCart()` - Abre carrito
- `Modals.openCheckout()` - Abre checkout
- `Modals.openSizeGuide()` - Abre guía de tallas
- `Modals.openFAQ()` - Abre FAQ
- `Modals.close(selector)` - Cierra modal específico
- `Modals.closeAll()` - Cierra todos los modales
- `Modals.setupEvents()` - Configura eventos

**filters.js**
Búsqueda, filtrado y ordenamiento:
- `Filters.setup()` - Inicializa filtros
- `Filters.setupCategoryButtons()` - Botones de categoría
- `Filters.setupSearchInput()` - Input de búsqueda
- `Filters.setupSortSelect()` - Select de ordenamiento
- `Filters.render()` - Renderiza con filtros actuales

### main.js
Archivo principal que:
- Inicializa todos los módulos en `DOMContentLoaded`
- Configura eventos del carrito
- Maneja el checkout y envío por WhatsApp
- Procesa formularios (FAQ)
- Coordina todas las interacciones

---

## ⚙️ Flujo de Carga y Ejecución

1. **HTML carga**
2. **Archivos JS cargan en orden:**
   - `config.js` → Configura constantes globales
   - `utils/*` → Funciones auxiliares
   - `modules/*` → Lógica de negocio
   - `data/products.js` → Datos de productos
   - `canvas-animations.js` → Animaciones
   - `main.js` → Inicialización y eventos

3. **Cuando DOM está listo:**
   - Cargar carrito del localStorage
   - Renderizar productos
   - Configurar filtros
   - Configurar modales
   - Configurar eventos

---

## 🎨 Sistema de Diseño

### Colores Principales
- **Primario:** `#C8102E` (Rojo Lucho Díaz)
- **Primario Oscuro:** `#a00d25`
- **Oscuro:** `#121212` (Negro)
- **Claro:** `#FFFFFF` (Blanco)
- **Éxito:** `#25d366` (Verde WhatsApp)
- **Error:** `#e74c3c` (Rojo)

### Tipografía
- **Familia:** Poppins
- **Pesos:** 300, 400, 600, 900
- **Tamaños base:** xs, sm, base, lg, xl, 2xl, 3xl

### Espaciado
Sistema consistente de 4px:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 80px

### Responsive
- **Desktop:** Grilla de 3-4 columnas
- **Tablet (768px):** Ajustes de layout
- **Móvil (480px):** Una columna, menú simplificado

---

## 🔌 Cómo Agregar Nuevas Funciones

### Agregar una nueva validación
1. Editar `assets/js/utils/helpers.js`
2. Agregar nuevo método a `Helpers`
3. Usar en módulos donde sea necesario

### Agregar nuevo componente CSS
1. Crear archivo en `assets/css/components/`
2. Importar en `assets/css/styles.css`
3. Usar clases en HTML

### Agregar nueva variable de estilo
1. Editar archivo correspondiente en `assets/css/variables/`
2. Usar variable con `var(--nombre)`

### Agregar nuevo módulo JavaScript
1. Crear archivo en `assets/js/modules/`
2. Importar en `index.html` antes de `main.js`
3. Usar métodos del módulo en `main.js`

---

## 📝 Comentarios en el Código

Cada archivo contiene:
- **Block comment** al inicio explicando qué hace
- **Inline comments** en secciones complejas
- Documentación de parámetros y return en funciones
- Agrupaciones de código con separadores

---

## 🚀 Ventajas de esta Estructura

✅ **Modular** - Código dividido en responsabilidades claras
✅ **Escalable** - Fácil de agregar nuevas funciones
✅ **Mantenible** - Cambios localizados y predecibles
✅ **Reutilizable** - Componentes y funciones reutilizables
✅ **Documentado** - Comentarios explicativos en cada archivo
✅ **Rendimiento** - CSS y JS organizados eficientemente
✅ **Accesible** - Siguiendo estándares WCAG

---

## 📞 Contacto

**WhatsApp:** +57 304 435 9009
**Email:** ventas@luchodiaz.shop
**Ubicación:** Barranquilla, Colombia

© 2026 Lucho Díaz Shop. All Rights Reserved.
