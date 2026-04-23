/**
 * BASE DE DATOS LOCAL DE PRODUCTOS
 * LuchoDIAZ Shop
 */

const products = [
    {
        name: "Jersey Local LFC 24/25",
        price: 360000,
        category: "ropa",
        image: "https://soccerpost.com/cdn/shop/files/IT2249_b2b012_plp.png_clipped_rev_1_grande.png?v=1715973769"
    },
    {
        name: "Adidas Samba OG",
        price: 480000,
        category: "calzado",
        image: "https://crepdogcrew.com/cdn/shop/files/2_6912eeb6-7588-495f-bd0d-a8dcac60c22f.png?v=1755096740&width=1080"
    },
    {
        name: "Jersey Colombia",
        price: 380000,
        category: "ropa",
        image: "https://www.wtadidaslam.com/2025/wc26/colombia/sportline/assets/img/showcase-jersey/colombia/jersey.webp"
    },
    {
        name: "Zapatillas F50 Elite",
        price: 1000000,
        category: "calzado",
        image: "https://unitedstorecolombia.com/cdn/shop/files/ce16fdf9_1.png?v=1720623650"
    },
    {
        name: "Chaqueta Anthem LFC",
        price: 440000,
        category: "ropa",
        image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/1092f709c28d4b759c084b1901ca3d78_9366/Chaqueta_Anthem_ADIDAS_Z.N.E._Liverpool_FC_Rojo_JW5484_01_laydown.jpg"
    },
    {
        name: "Gorra LFC Heritage",
        price: 140000,
        category: "ropa",
        image: "https://store.liverpoolfc.com/media/catalog/product/a/1/a16223_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700,700"
    },
    {
        name: "Shorts Local 24/25",
        price: 180000,
        category: "ropa",
        image: "https://images.footballfanatics.com/liverpool/liverpool-nike-home-stadium-shorts-2024-25_ss5_p-200583486+u-7f310f8tuxly6026jshv+v-d996d99df48d48b783f98889497e2055.jpg?_hv=2&w=900"
    },
    {
        name: "Balón Colombia Club",
        price: 120000,
        category: "ropa",
        image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/6cbcfb89143b46d79259abde012c9729_9366/Balon_Club_Colombia_Blanco_GN1889_01_standard.jpg"
    },
    {
        name: "Medias Local 24/25",
        price: 72000,
        category: "ropa",
        image: "https://images.footballfanatics.com/liverpool/liverpool-nike-home-stadium-socks-2024-25_ss5_p-200583525+u-p5h30t327f37r7o7m31s+v-4081ef126a11488c973a0c0e118129df.jpg?_hv=2&w=900"
    },
    {
        name: "Nike Air Max 270",
        price: 650000,
        category: "calzado",
        image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f37fca8-6bce-43e7-ad07-f57ae3c13142/NIKE+AIR+MAX+270.png"
    },
    {
        name: "Converse Chuck Taylor All Star",
        price: 280000,
        category: "calzado",
        image: "https://www.converse.com/dw/image/v2/BJJG_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw0b0b0b0b/images/a_107/M9160_A_107X1.jpg?sw=964"
    },
    {
        name: "Vans Old Skool",
        price: 350000,
        category: "calzado",
        image: "https://images.vans.com/is/image/Vans/VN000D3HY28-HERO?$583x583$"
    },
    {
        name: "Puma Suede Classic",
        price: 420000,
        category: "calzado",
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/COL/fmt/png/Suede-Classic-XXI-Sneakers"
    },
    {
        name: "Reebok Classic Leather",
        price: 380000,
        category: "calzado",
        image: "https://assets.reebok.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/691439f4f4a74b8e8b8ead0b00f7b9b9_9366/Classic_Leather_Shoes_White_FZ5710_01_standard.jpg"
    },
    {
        name: "Camiseta Básica Blanca",
        price: 85000,
        category: "ropa",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        name: "Jeans Clásicos Azules",
        price: 220000,
        category: "ropa",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
    },
    {
        name: "Sudadera Hoodie Negra",
        price: 180000,
        category: "ropa",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
    },
    {
        name: "Pantalones Jogger Deportivos",
        price: 160000,
        category: "ropa",
        image: "https://images.unsplash.com/photo-1506629905607-0b5b8b5e40e3?w=500"
    },
    {
        name: "Chaqueta Bomber Negra",
        price: 320000,
        category: "ropa",
        image: "https://png.pngtree.com/png-vector/20240613/ourmid/pngtree-magnificent-bomber-real-black-leather-jacket-for-men-psd-winter-mockup-png-image_12725060.png"
    },
    {
        name: "Zapatillas Running Adidas",
        price: 550000,
        category: "calzado",
        image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8c5d1994d49c4a4e8e8ead0b00f7b9b9_9366/Ultraboost_Light_Running_Shoes_Black_GZ9252_01_standard.jpg"
    },
    {
        name: "Camisa Polo Lacoste",
        price: 290000,
        category: "ropa",
        image: "https://padelproshop.com/cdn/shop/files/746854607_max-1.webp?v=1760960140&width=640"
    },
    {
        name: "Botas Chelsea Marrones",
        price: 480000,
        category: "calzado",
        image: "https://d1fufvy4xao6k9.cloudfront.net/feed/img/man_shoe/259395/side.png"
    },
    {
        name: "Shorts Cargo Militares",
        price: 140000,
        category: "ropa",
        image: "https://cdn.shopify.com/s/files/1/0659/1168/5316/files/o5iof197prfvrxlh2evp3eaipxcv.png?v=1747772174"
    }
];