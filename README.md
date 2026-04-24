# LuchoDIAZ Shop

LuchoDIAZ Shop is an online sports store for soccer fans, featuring jerseys, footwear, apparel, and accessories.

[![License MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0-blue.svg)]()
[![Status](https://img.shields.io/badge/Status-Active-success.svg)]()

## 🚀 Project Summary

This project is a fully functional and modular e-commerce storefront built for sports apparel and soccer accessories. It has been organized into a scalable structure with clear separation between styles, UI logic, configuration, and data.

- **Modular CSS** in `assets/css/` with variables, components, layouts, and utilities.
- **JavaScript split** across utilities (`assets/js/utils/`), business modules (`assets/js/modules/`), and configuration.
- **Complete shopping experience** with persistence, search, filters, modals, checkout, and canvas animations.
- **Responsive design** optimized for desktop, tablet, and mobile.
- **Accessibility-ready** with improved semantics and aria labels.

## ✨ Key Features

- 🛒 **Shopping cart** with `localStorage` persistence
- 🔍 **Real-time search and filtering**
- 📊 **Sorting** by name and price
- 🔲 **Product modal** with size selection and quantity control
- 💳 **Checkout** with validation and WhatsApp order submission
- 💰 **Prices in COP** formatted for Colombian locale
- 📱 **Responsive layout** across devices
- 🔔 **Toast notifications** for user feedback
- 🎨 **Canvas control panel** for animation settings
- ❓ **FAQ section** with quick answers
- 📏 **Built-in size guide**

## 📁 Project Structure

```
tiendalucho/
├── index.html                    # Main HTML page
├── LICENSE                       # MIT license
├── README.md                     # Project documentation
├── data/
│   └── products.js               # Local product database
└── assets/
    ├── css/
    │   ├── styles.css            # Main stylesheet (imports component files)
    │   ├── variables/            # Global CSS variables
    │   ├── components/           # Reusable UI component styles
    │   ├── layouts/              # Layout and structure styles
    │   └── utils/                # Utility styles
    └── js/
        ├── config.js             # Global configuration
        ├── main.js               # Application initialization
        ├── canvas-animations.js   # Visual animations
        ├── shop.js               # Legacy shop logic (compatibility)
        ├── utils/                # JavaScript utilities
        └── modules/              # Business logic modules
```

## 🧩 Modular CSS

- `assets/css/variables/`: color palette, typography, effects, spacing.
- `assets/css/components/`: navbar, hero, cards, cart, modals, buttons, filters, FAQ, and more.
- `assets/css/layouts/`: section containers and footer layout.
- `assets/css/utils/`: animations, notifications, responsiveness, accessibility.

## 🛠️ Modular JavaScript

### Configuration
- `assets/js/config.js`: global constants, `localStorage` keys, currency settings, and UI messages.

### Utilities
- `assets/js/utils/storage.js`: local storage helpers.
- `assets/js/utils/notifications.js`: toast notification manager.
- `assets/js/utils/helpers.js`: currency formatting, validation, DOM utilities.

### Business Modules
- `assets/js/modules/cart.js`: cart operations, totals, and UI updates.
- `assets/js/modules/products.js`: product rendering, cards, and interactions.
- `assets/js/modules/modals.js`: modal behavior for product details, checkout, size guide, and FAQ.
- `assets/js/modules/filters.js`: category filtering, search, and sorting.

### Initialization
- `assets/js/main.js`: orchestrates startup, event binding, and page behavior.

## 🔄 Recommended Load Order

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

## 📌 Quick Start

1. Clone or download the project.
2. Open `index.html` in your browser or use a local server.
3. Browse products, add them to the cart, and complete checkout.
4. Confirm your order through WhatsApp.

## 📦 Add New Products

Edit `data/products.js` and add new products to the `products` array using this structure:

```javascript
{
  name: "Product Name",
  price: 99999,
  category: "ropa", // or "calzado"
  image: "https://image-url.jpg"
}
```

## 📚 Module API

### Cart (`assets/js/modules/cart.js`)

```javascript
Cart.add(name, price, size, quantity)
Cart.remove(index)
Cart.changeQuantity(index, delta)
Cart.getTotal() // returns number
Cart.getItemCount() // returns number
Cart.load()
Cart.save()
Cart.clear()
Cart.updateUI()
```

### Products (`assets/js/modules/products.js`)

```javascript
Products.render(category, searchTerm, sortBy)
Products.createCard(product)
Products.setupEvents()
```

### Modals (`assets/js/modules/modals.js`)

```javascript
Modals.openProduct(card)
Modals.openCart()
Modals.openCheckout()
Modals.openSizeGuide()
Modals.openFAQ()
Modals.close(selector)
Modals.closeAll()
Modals.setupEvents()
```

### Filters (`assets/js/modules/filters.js`)

```javascript
Filters.setup()
```

## 📌 Translation Summary

- UI text translated to English.
- Checkout and order messages translated.
- README updated to English.
- Labels, buttons, placeholders, FAQ content, and footer copy translated.

## 🎯 Project Improvements

- ✅ Better separation of concerns.
- ✅ Easier to maintain and extend.
- ✅ Improved documentation.
- ✅ Cleaner module structure.
- ✅ Consistent UI text in English.

## 🚀 Next Improvements

1. Add unit tests for modules.
2. Minify CSS and JS for production.
3. Add component versioning.
4. Create a component style guide or Storybook.
5. Add CI/CD validation.
6. Add dynamic module loading.
