export interface Product {
  id: string
  title: string
  description: string
  priceUSD: number
  image: string
  category: string
  brand: string
}

export const PRODUCTS: Product[] = [
  // Laptops
  { id: '1', title: 'ASUS ROG Zephyrus G14', description: 'Laptop Gamer de 14" con RTX 4060, AMD Ryzen 9, 16GB RAM y 1TB SSD.', priceUSD: 1499.99, image: '/product_laptop.png', category: 'Laptops', brand: 'Asus' },
  { id: '2', title: 'MacBook Pro 16" M3 Max', description: 'Potencia extrema para profesionales. Chip M3 Max, 36GB RAM, 1TB SSD.', priceUSD: 3499.00, image: '/product_laptop.png', category: 'Laptops', brand: 'Apple' },
  { id: '3', title: 'Dell XPS 15', description: 'Pantalla OLED 3.5K, Intel Core i7 13th Gen, 32GB RAM, RTX 4050.', priceUSD: 1899.99, image: '/product_laptop.png', category: 'Laptops', brand: 'Dell' },
  { id: '4', title: 'Lenovo Legion Pro 5i', description: 'Intel Core i9, RTX 4070, 32GB RAM, 2TB NVMe SSD. Refrigeración avanzada.', priceUSD: 1750.00, image: '/product_laptop.png', category: 'Laptops', brand: 'Lenovo' },
  
  // Smartphones
  { id: '5', title: 'Samsung Galaxy S24 Ultra', description: 'Smartphone insignia con pantalla Dynamic AMOLED 2X, Snapdragon 8 Gen 3.', priceUSD: 1199.99, image: '/product_phone.png', category: 'Smartphones', brand: 'Samsung' },
  { id: '6', title: 'iPhone 15 Pro Max', description: 'Diseño en titanio, chip A17 Pro y el sistema de cámaras más avanzado.', priceUSD: 1099.00, image: '/product_phone.png', category: 'Smartphones', brand: 'Apple' },
  { id: '7', title: 'Google Pixel 8 Pro', description: 'El mejor Android con IA integrada, cámara de nivel profesional.', priceUSD: 999.00, image: '/product_phone.png', category: 'Smartphones', brand: 'Google' },
  { id: '8', title: 'Xiaomi 14 Pro', description: 'Cámaras Leica, carga ultra rápida de 120W, Snapdragon 8 Gen 3.', priceUSD: 899.99, image: '/product_phone.png', category: 'Smartphones', brand: 'Xiaomi' },

  // Accesorios
  { id: '9', title: 'Logitech MX Master 3S', description: 'Ratón inalámbrico de rendimiento avanzado con sensor de 8000 DPI.', priceUSD: 99.99, image: '/product_laptop.png', category: 'Periféricos', brand: 'Logitech' },
  { id: '10', title: 'Keychron Q1 Pro', description: 'Teclado mecánico custom inalámbrico, cuerpo de aluminio, hot-swappable.', priceUSD: 199.99, image: '/product_laptop.png', category: 'Periféricos', brand: 'Keychron' },
  { id: '11', title: 'Razer DeathAdder V3 Pro', description: 'Ratón eSports ultraligero, ergonómico y con sensor óptico Focus Pro 30K.', priceUSD: 149.99, image: '/product_laptop.png', category: 'Periféricos', brand: 'Razer' },
  { id: '12', title: 'Apple Magic Keyboard', description: 'Teclado inalámbrico y recargable con Touch ID para Mac.', priceUSD: 149.00, image: '/product_laptop.png', category: 'Periféricos', brand: 'Apple' },

  // Audio
  { id: '13', title: 'Sony WH-1000XM5', description: 'Auriculares inalámbricos con la mejor cancelación de ruido de la industria.', priceUSD: 398.00, image: '/product_phone.png', category: 'Audio', brand: 'Sony' },
  { id: '14', title: 'AirPods Pro (2da Gen)', description: 'Audio espacial personalizado, cancelación activa de ruido 2x.', priceUSD: 249.00, image: '/product_phone.png', category: 'Audio', brand: 'Apple' },
  { id: '15', title: 'Bose QuietComfort Ultra', description: 'Audio inmersivo revolucionario y cancelación de ruido de clase mundial.', priceUSD: 429.00, image: '/product_phone.png', category: 'Audio', brand: 'Bose' },
  { id: '16', title: 'Sennheiser Momentum 4', description: 'Auriculares con sonido premium y hasta 60 horas de batería.', priceUSD: 349.95, image: '/product_phone.png', category: 'Audio', brand: 'Sennheiser' },

  // Componentes
  { id: '17', title: 'NVIDIA GeForce RTX 4090', description: 'La GPU definitiva para jugadores y creadores. 24GB GDDR6X.', priceUSD: 1599.00, image: '/product_laptop.png', category: 'Componentes', brand: 'Nvidia' },
  { id: '18', title: 'AMD Ryzen 9 7950X', description: 'Procesador de 16 núcleos y 32 hilos, ideal para creadores.', priceUSD: 599.00, image: '/product_laptop.png', category: 'Componentes', brand: 'AMD' },
  { id: '19', title: 'Corsair Vengeance RGB 32GB', description: 'Memoria RAM DDR5 6000MHz, optimizada para Intel y AMD.', priceUSD: 129.99, image: '/product_laptop.png', category: 'Componentes', brand: 'Corsair' },
  { id: '20', title: 'Samsung 990 PRO 2TB', description: 'SSD NVMe PCIe 4.0 con velocidades de lectura de hasta 7450 MB/s.', priceUSD: 169.99, image: '/product_laptop.png', category: 'Componentes', brand: 'Samsung' },

  // Monitores
  { id: '21', title: 'Alienware 34" QD-OLED', description: 'Monitor curvo ultrawide para gaming, 165Hz, tiempo de respuesta 0.1ms.', priceUSD: 999.99, image: '/product_laptop.png', category: 'Monitores', brand: 'Dell' },
  { id: '22', title: 'LG UltraGear 27"', description: 'Monitor Nano IPS 1440p, 240Hz, ideal para juegos competitivos.', priceUSD: 499.00, image: '/product_laptop.png', category: 'Monitores', brand: 'LG' },
  { id: '23', title: 'ASUS ProArt Display 32"', description: 'Monitor 4K HDR para profesionales, precisión de color Calman.', priceUSD: 799.00, image: '/product_laptop.png', category: 'Monitores', brand: 'Asus' },
  { id: '24', title: 'Samsung Odyssey G9', description: 'Monitor curvo super ultrawide de 49", 240Hz, Mini LED.', priceUSD: 1499.00, image: '/product_laptop.png', category: 'Monitores', brand: 'Samsung' },

  // Consolas y Videojuegos
  { id: '25', title: 'PlayStation 5 Slim', description: 'Consola de nueva generación con lector de discos, 1TB SSD.', priceUSD: 499.99, image: '/product_phone.png', category: 'Consolas', brand: 'Sony' },
  { id: '26', title: 'Xbox Series X', description: 'La Xbox más rápida y potente de la historia. 4K a 120 FPS.', priceUSD: 499.99, image: '/product_phone.png', category: 'Consolas', brand: 'Microsoft' },
  { id: '27', title: 'Nintendo Switch OLED', description: 'Pantalla OLED vibrante de 7", audio mejorado y soporte ajustable.', priceUSD: 349.99, image: '/product_phone.png', category: 'Consolas', brand: 'Nintendo' },
  { id: '28', title: 'Steam Deck OLED', description: 'PC portátil para juegos con pantalla OLED HDR y 512GB NVMe.', priceUSD: 549.00, image: '/product_phone.png', category: 'Consolas', brand: 'Valve' },

  // Smart Home / TV
  { id: '29', title: 'LG OLED evo C3 65"', description: 'Smart TV 4K OLED con procesador a9 AI, ideal para cine y gaming.', priceUSD: 1699.99, image: '/product_laptop.png', category: 'TV', brand: 'LG' },
  { id: '30', title: 'Samsung Neo QLED 4K 55"', description: 'Televisor Mini LED con Quantum HDR 24x y sonido Dolby Atmos.', priceUSD: 1299.99, image: '/product_laptop.png', category: 'TV', brand: 'Samsung' },
  { id: '31', title: 'Amazon Echo Show 10', description: 'Pantalla inteligente HD con movimiento y Alexa integrada.', priceUSD: 249.99, image: '/product_phone.png', category: 'Smart Home', brand: 'Amazon' },
  { id: '32', title: 'Philips Hue Starter Kit', description: 'Luces LED inteligentes que cambian de color, compatible con asistentes de voz.', priceUSD: 199.99, image: '/product_phone.png', category: 'Smart Home', brand: 'Philips' },

  // Accesorios de Bajo Costo (Ideal para completar pedidos al mayor)
  { id: '33', title: 'Cable USB-C a Lightning 1m', description: 'Cable de carga rápida con certificación MFi. Alta durabilidad.', priceUSD: 12.99, image: '/product_phone.png', category: 'Accesorios', brand: 'Baseus' },
  { id: '34', title: 'Cargador de Pared 20W', description: 'Adaptador de corriente USB-C compacto y de carga súper rápida.', priceUSD: 15.00, image: '/product_phone.png', category: 'Accesorios', brand: 'Anker' },
  { id: '35', title: 'JBL T110 In-Ear', description: 'Auriculares con cable y micrófono. Sonido Pure Bass de JBL.', priceUSD: 14.99, image: '/product_phone.png', category: 'Audio', brand: 'JBL' },
  { id: '36', title: 'Funda Transparente Antichoque', description: 'Case de TPU flexible con protección en las cuatro esquinas.', priceUSD: 8.50, image: '/product_phone.png', category: 'Accesorios', brand: 'Spigen' },
  { id: '37', title: 'Protector de Pantalla Cristal Templado', description: 'Vidrio templado 9H anti-rayones y fácil instalación.', priceUSD: 5.99, image: '/product_phone.png', category: 'Accesorios', brand: 'Spigen' },
  { id: '38', title: 'Memoria USB 3.0 64GB', description: 'Pendrive ultracompacto para transferir archivos a alta velocidad.', priceUSD: 9.99, image: '/product_laptop.png', category: 'Almacenamiento', brand: 'SanDisk' },
  { id: '39', title: 'Batería Portátil 10000mAh', description: 'Power Bank delgado con doble puerto USB y carga rápida de 18W.', priceUSD: 24.99, image: '/product_phone.png', category: 'Accesorios', brand: 'Redmi' },
  { id: '40', title: 'Cable USB-C a USB-C 2m Trenzado', description: 'Cable reforzado de nailon con soporte para carga de 100W.', priceUSD: 16.50, image: '/product_phone.png', category: 'Accesorios', brand: 'Baseus' },
]

// Extraemos marcas y categorías únicas para los filtros
export const CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category))).sort()
export const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.brand))).sort()
