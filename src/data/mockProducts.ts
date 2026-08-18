import { Product, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'women-fashion',
    name: "Women's Pret & Lawn",
    slug: 'womens-fashion',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    itemCount: 42,
    subcategories: ['Luxury Pret', 'Unstitched 3-Piece', 'Embroidered Chiffon', 'Casual Kurtis', 'Shawls & Dupattas'],
    description: 'Designer lawn, handcrafted embroidery, and contemporary Pakistani pret wear.'
  },
  {
    id: 'men-fashion',
    name: "Men's Kurta & Casuals",
    slug: 'mens-fashion',
    icon: 'User',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    itemCount: 38,
    subcategories: ['Wash & Wear Shalwar Kameez', 'Designer Kurtas', 'Waistcoats', 'Polo Shirts', 'Chinos & Denims'],
    description: 'Crisp fabrics, traditional cuts, and smart tailored menswear for every occasion.'
  },
  {
    id: 'audio-gadgets',
    name: 'Smart Audio & Earbuds',
    slug: 'smart-audio',
    icon: 'Headphones',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
    itemCount: 29,
    subcategories: ['TWS Wireless Earbuds', 'ANC Headphones', 'Party Speakers', 'Smart Neckbands'],
    description: 'High bass, long battery life, and crystal clear calling for daily commutes and workouts.'
  },
  {
    id: 'smartwatches',
    name: 'Smartwatches & Fitness',
    slug: 'smartwatches',
    icon: 'Watch',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
    itemCount: 24,
    subcategories: ['AMOLED Smartwatches', 'Bluetooth Calling Watches', 'Fitness Bands', 'Luxury Straps'],
    description: 'Track health, receive WhatsApp & Urdu call alerts, and elevate your wrist style.'
  },
  {
    id: 'fragrances',
    name: 'Oud, Attar & Perfumes',
    slug: 'fragrances',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    itemCount: 31,
    subcategories: ['Pure Dehn Al Oud', 'French & Oriental Blends', 'Alcohol-Free Attars', 'Body Mists'],
    description: 'Long-lasting projection, royal silage, and authentic non-alcoholic perfumery.'
  },
  {
    id: 'leather-accessories',
    name: 'Pure Leather Goods',
    slug: 'leather-goods',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    itemCount: 22,
    subcategories: ['Full-Grain Wallets', 'Handcrafted Peshawari Chappals', 'Laptop Bags', 'Reversible Belts'],
    description: 'Genuine cowhide and buffalo leather crafted in Sialkot and Lahore.'
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen Essentials',
    slug: 'home-kitchen',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    itemCount: 35,
    subcategories: ['Non-Stick Cookware Sets', 'Air Fryers & Blenders', 'Bedding Sets', 'Islamic Wall Art'],
    description: 'Transform your home with durable cookware and premium textile craftsmanship.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    title: 'Emerald Embroidered 3-Piece Luxury Lawn Collection',
    slug: 'emerald-embroidered-luxury-lawn-3pc',
    brand: 'Khaadi Studio',
    category: 'womens-fashion',
    subcategory: 'Luxury Pret',
    price: 6499,
    originalPrice: 8999,
    discountPercentage: 28,
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
    stockCount: 18,
    featuredImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Step out in unmatched sophistication with this embroidered 3-piece luxury lawn suit. Features intricate Resham threadwork on the neckline and daman, paired with a soft digital printed silk dupatta and dyed cambric trousers. Ideal for festive gatherings, Jummah dinners, and daytime celebrations.',
    shortDescription: 'Hand-embroidered shirt with digital pure silk dupatta and dyed trousers.',
    features: [
      '100% Premium Combed Cotton Lawn Shirt (3.0 Meters)',
      'Digital Printed Silk Chiffon Dupatta (2.5 Meters)',
      'Dyed Cambric Cotton Trouser (2.5 Meters)',
      'Heavy Zari and Resham Threadwork Embroidery on Neckline',
      'Color Fastness Guarantee & Pre-Shrunk Fabric'
    ],
    specifications: {
      'Fabric': 'Premium Lawn & Pure Silk',
      'Pieces': '3 Piece (Unstitched / Semi-Stitched)',
      'Season': 'Spring / Summer Festive',
      'Origin': 'Faisalabad, Pakistan',
      'Care': 'Dry Clean or Gentle Hand Wash'
    },
    tags: ['Lawn', 'Festive', 'Khaadi', '3 Piece', 'Summer 2026', 'Eid Special'],
    isFlashDeal: true,
    flashDealEnd: '2026-08-20T23:59:59',
    flashDealClaimed: 84,
    isBestSeller: true,
    warranty: '7-Day Return Guarantee & Color Fastness Warranty',
    returnPolicy: 'Easy 7-day doorstep replacement across Pakistan.',
    variants: [
      { id: 'v1', name: 'Unstitched', sku: 'KHD-L3P-UNS', price: 6499, originalPrice: 8999, stock: 12 },
      { id: 'v2', name: 'Stitched - Medium (M)', sku: 'KHD-L3P-STM-M', price: 7999, originalPrice: 10499, stock: 4, size: 'M' },
      { id: 'v3', name: 'Stitched - Large (L)', sku: 'KHD-L3P-STM-L', price: 7999, originalPrice: 10499, stock: 2, size: 'L' }
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Ayesha Tariq',
        userCity: 'Lahore',
        rating: 5,
        date: '2026-08-10',
        comment: 'Fabric is amazingly soft and the embroidery in emerald green looks 10x richer than photos. Delivered in 24 hours via TCS in DHA Lahore!',
        verifiedPurchase: true,
        helpfulCount: 29
      },
      {
        id: 'r2',
        userName: 'Fatima Noor',
        userCity: 'Karachi (Clifton)',
        rating: 5,
        date: '2026-08-04',
        comment: 'Silk dupatta is breathtaking. Stitching quality is clean. Best purchase for upcoming family wedding.',
        verifiedPurchase: true,
        helpfulCount: 14
      }
    ]
  },
  {
    id: 'prod-02',
    title: 'AuraPulse ANC Wireless Earbuds (45dB Noise Cancellation)',
    slug: 'aurapulse-anc-wireless-earbuds-45db',
    brand: 'AuraTech PK',
    category: 'smart-audio',
    subcategory: 'TWS Wireless Earbuds',
    price: 4999,
    originalPrice: 7499,
    discountPercentage: 33,
    rating: 4.9,
    reviewCount: 388,
    inStock: true,
    stockCount: 45,
    featuredImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered specifically for busy Pakistani commutes and loud outdoor environments. With 45dB Active Noise Cancellation, Quad ENC microphones for wind-free voice calls, and huge 12mm Titanium dynamic drivers for deep Pakistani thumping bass. Up to 40 hours playtime with Type-C Fast Flash Charging.',
    shortDescription: '45dB Hybrid ANC, Quad Mic AI ENC calling, 40hr Battery, IPX5 Water Resistant.',
    features: [
      'Hybrid 45dB Active Noise Cancellation + Transparency Ambient Mode',
      'AI Environmental Noise Cancellation (ENC) for crystal clear Bike & Traffic calls',
      '40-Hour Total Playtime with Fast Charge (10 mins = 3 hours playback)',
      'Ultra-Low 38ms Gaming Latency for PUBG & FreeFire players in Pakistan',
      'IPX5 Sweat & Splash Resistance for gym and monsoon weather'
    ],
    specifications: {
      'Bluetooth Version': 'v5.4 with Dual Device Pairing',
      'Driver Size': '12mm Titanium Dynamic Bass Driver',
      'Battery Life': '10h Earbuds + 30h Charging Case',
      'Charging Port': 'USB Type-C Fast Charging',
      'Warranty': '1 Year Official Replacement Warranty in Pakistan'
    },
    tags: ['Earbuds', 'ANC', 'Gaming', 'PUBG', 'Audio', 'Bass', 'Best Seller'],
    isFlashDeal: true,
    flashDealEnd: '2026-08-22T18:00:00',
    flashDealClaimed: 91,
    isBestSeller: true,
    isTrending: true,
    warranty: '1 Year Brand Replacement Warranty (Karachi, Lahore, Islamabad Service Centers)',
    returnPolicy: '7 Days Check Warranty with Doorstep Pickup.',
    variants: [
      { id: 'v1', name: 'Midnight Charcoal Black', sku: 'AP-ANC-BLK', price: 4999, originalPrice: 7499, stock: 25, color: '#18181b' },
      { id: 'v2', name: 'Pearl Arctic White', sku: 'AP-ANC-WHT', price: 4999, originalPrice: 7499, stock: 15, color: '#f8fafc' },
      { id: 'v3', name: 'Emerald Cyber Edition', sku: 'AP-ANC-EMR', price: 5299, originalPrice: 7999, stock: 5, color: '#047857' }
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Hamza Bilal',
        userCity: 'Islamabad (F-7)',
        rating: 5,
        date: '2026-08-12',
        comment: 'SubhanAllah what a beast product! Call quality while driving on Islamabad Expressway was 100% clean, no traffic noise at all. Battery lasts forever.',
        verifiedPurchase: true,
        helpfulCount: 52
      },
      {
        id: 'r2',
        userName: 'Zubair Sheikh',
        userCity: 'Karachi',
        rating: 5,
        date: '2026-08-08',
        comment: 'Bass is unbelievable on Coke Studio tracks! Fast delivery with Cash on Delivery in Gulshan. 10/10 recommend.',
        verifiedPurchase: true,
        helpfulCount: 38
      }
    ]
  },
  {
    id: 'prod-03',
    title: 'Royal Egyptian Cotton Wash & Wear Shalwar Kameez Suit',
    slug: 'royal-cotton-wash-wear-shalwar-kameez',
    brand: 'J. Exclusive',
    category: 'mens-fashion',
    subcategory: 'Wash & Wear Shalwar Kameez',
    price: 5299,
    originalPrice: 6999,
    discountPercentage: 24,
    rating: 4.7,
    reviewCount: 96,
    inStock: true,
    stockCount: 30,
    featuredImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Designed for the Pakistani summer heat and effortless wrinkle resistance. Made from premium imported Egyptian micro-fibers that provide a liquid-soft drape, subtle sheen, and crisp collar retention throughout the day. Perfect for Jummah, formal boardroom meetings, and family festivities.',
    shortDescription: 'Wrinkle-resistant soft drape wash & wear 4.25m unstitched fabric with metallic buttons.',
    features: [
      '4.25 Meters Unstitched High-Density Fabric',
      'Wrinkle-Resistant Easy-Iron Technology',
      'Includes 8 Premium Signature Metallic Buttons + Brand Collar Tag',
      'Ultra-Breathable Soft Texture for 45°C+ Temperatures',
      'Non-Bleed & Anti-Pilling Guarantee'
    ],
    specifications: {
      'Fabric Blend': 'Egyptian Poly-Viscose Microfiber',
      'Length': '4.25 Meters (Standard 54 inch width)',
      'Occasion': 'Formal, Friday Jummah, Casual',
      'Included': 'Fabric, 8 Metallic Buttons, Brand Woven Label'
    },
    tags: ['Menswear', 'Shalwar Kameez', 'Wash & Wear', 'Junaid Jamshed style', 'Formal'],
    isNewArrival: true,
    isTrending: true,
    warranty: '100% Color & Fabric Shrinkage Replacement Warranty',
    returnPolicy: '7 Days Hassle-Free Returns.',
    variants: [
      { id: 'v1', name: 'Navy Royal Blue', sku: 'J-WW-NVY', price: 5299, originalPrice: 6999, stock: 12, color: '#1e3a8a' },
      { id: 'v2', name: 'Slate Charcoal', sku: 'J-WW-CHR', price: 5299, originalPrice: 6999, stock: 10, color: '#334155' },
      { id: 'v3', name: 'Off-White Ivory Cream', sku: 'J-WW-IVR', price: 5299, originalPrice: 6999, stock: 8, color: '#fef3c7' }
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Daniyal Khan',
        userCity: 'Peshawar',
        rating: 5,
        date: '2026-08-11',
        comment: 'Mashallah the drape of this cloth is majestic. Doesn’t crease even after a full day of traveling. Buttons are solid brass.',
        verifiedPurchase: true,
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'prod-04',
    title: 'Aura AMOLED Bluetooth Calling Smartwatch (Urdu Notifications)',
    slug: 'aura-amoled-bluetooth-calling-smartwatch',
    brand: 'AuraTech PK',
    category: 'smartwatches',
    subcategory: 'AMOLED Smartwatches',
    price: 7499,
    originalPrice: 11999,
    discountPercentage: 37,
    rating: 4.8,
    reviewCount: 215,
    inStock: true,
    stockCount: 22,
    featuredImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pakistan’s top-rated flagship smartwatch with a 1.43-inch vibrant Super AMOLED Always-On Display (1000 nits peak brightness readable under direct sunlight). Equipped with single-chip Bluetooth 5.3 calling, built-in Islamic prayer times & Qibla compass, heart rate, SpO2 sensor, and full Urdu & English notification rendering.',
    shortDescription: '1.43" AMOLED 60Hz, Bluetooth Calling, 12-Day Battery, Urdu & Prayer Time Alerts.',
    features: [
      '1.43-inch HD Super AMOLED Display (466x466 resolution, 60Hz fluid refresh)',
      'Loud Speaker & HD Mic for One-Click Phone Calls directly from your wrist',
      'Built-in Qibla Direction Compass & Azan Reminder Notifications',
      'Full Urdu WhatsApp & SMS notification text support',
      'Zinc Alloy Aircraft-Grade Metallic Frame + 2 Free Straps Included (Leather + Ocean Silicone)'
    ],
    specifications: {
      'Display': '1.43" Super AMOLED 1000 Nits Always-On',
      'Battery': '380mAh (Up to 12 days normal use / 4 days heavy call use)',
      'Sensors': 'Optical Heart Rate, Blood Oxygen (SpO2), Sleep, Pedometer',
      'Waterproof': 'IP68 Certified (Water & Dust Proof)',
      'Compatibility': 'Android (all phones) & iOS iPhone'
    },
    tags: ['Smartwatch', 'AMOLED', 'Calling', 'Urdu', 'Prayer Alerts', 'Fitness', 'PlayStore Ready'],
    isFlashDeal: true,
    flashDealEnd: '2026-08-21T21:00:00',
    flashDealClaimed: 78,
    isBestSeller: true,
    warranty: '1 Year Brand Replacement Warranty across Pakistan',
    returnPolicy: '7 Days Return & Exchange guarantee.',
    variants: [
      { id: 'v1', name: 'Gunmetal Titanium with Black Strap', sku: 'AURA-W1-TIT', price: 7499, originalPrice: 11999, stock: 14, color: '#3f3f46' },
      { id: 'v2', name: 'Rose Gold with Starlight Cream Strap', sku: 'AURA-W1-GLD', price: 7499, originalPrice: 11999, stock: 8, color: '#e0a96d' }
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Waqas Ahmed',
        userCity: 'Rawalpindi',
        rating: 5,
        date: '2026-08-14',
        comment: 'Display is shockingly crisp like an Apple Watch! Urdu text renders smoothly without broken letters. Delivered within 2 days with Leopards COD.',
        verifiedPurchase: true,
        helpfulCount: 41
      }
    ]
  },
  {
    id: 'prod-05',
    title: 'Dehn Al Oud Royal Cambodi & Amber Pure Non-Alcoholic Attar (12ml)',
    slug: 'dehn-al-oud-royal-cambodi-attar-12ml',
    brand: 'Junaid J. Aromas',
    category: 'fragrances',
    subcategory: 'Pure Dehn Al Oud',
    price: 3899,
    originalPrice: 5499,
    discountPercentage: 29,
    rating: 4.9,
    reviewCount: 167,
    inStock: true,
    stockCount: 20,
    featuredImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Extracted from aged wild agarwood trees from the mountainous Cambodian ranges and infused with warm golden amber, Taif rose, and rich Madagascan vanilla. 100% alcohol-free concentrated oil (Ittar) that lasts for over 24+ hours on fabrics and skin. Comes in a royal handcrafted velvet gift box with a crystal wand.',
    shortDescription: 'Aged Cambodian Agarwood oil with warm Amber & Taif Rose. 24h+ lasting.',
    features: [
      '100% Concentrated Pure Perfume Oil (Alcohol Free / Halal Certified)',
      'Unrivaled Projection & Royal Oriental Silage',
      'Lasts 24+ hours on clothes through Pakistani humidity',
      'Comes in Gold-Plated Heavy Crystal Bottle with Velvet Collector Box',
      'Perfect Gift for Weddings, Eid, Jummah, and Fragrance Connoisseurs'
    ],
    specifications: {
      'Volume': '12ml Concentrated Perfume Oil',
      'Notes': 'Top: Taif Rose; Heart: Cambodian Oud; Base: Warm Amber & White Musk',
      'Longevity': '24-36 Hours on clothes',
      'Formulation': '100% Non-Alcoholic Pure Attar'
    },
    tags: ['Oud', 'Attar', 'Perfume', 'Halal', 'Long Lasting', 'Eid Gift', 'Luxury'],
    isBestSeller: true,
    warranty: '100% Purity & Projection Authenticity Guarantee',
    returnPolicy: '7 Days Money-Back Guarantee if unsealed.',
    reviews: [
      {
        id: 'r1',
        userName: 'Mufti Salman',
        userCity: 'Karachi (Nazimabad)',
        rating: 5,
        date: '2026-08-09',
        comment: 'Fragrance is sweet, woody, and intensely majestic. Everyone in the Masjid asked what I was wearing after Friday prayers. 100% authentic.',
        verifiedPurchase: true,
        helpfulCount: 46
      }
    ]
  },
  {
    id: 'prod-06',
    title: 'Handcrafted Full-Grain Leather Peshawari Chappal (Kaptaan Style)',
    slug: 'handcrafted-leather-peshawari-chappal-kaptaan',
    brand: 'Charsadda Heritage',
    category: 'leather-goods',
    subcategory: 'Handcrafted Peshawari Chappals',
    price: 4499,
    originalPrice: 6200,
    discountPercentage: 27,
    rating: 4.9,
    reviewCount: 178,
    inStock: true,
    stockCount: 15,
    featuredImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Masterfully hand-stitched by traditional cobblers in Charsadda and Peshawar using 100% pure cowhide leather and recycled durable tyre sole. Features extra cushioned memory foam insoles to ensure all-day comfort without foot fatigue. The iconic traditional footwear for cultural pride and formal elegance.',
    shortDescription: 'Charsadda handmade 100% pure cowhide leather with memory foam cushion & tyre sole.',
    features: [
      '100% Genuine Full-Grain Cow Leather Upper & Lining',
      'High-Traction Grip Tyre Rubber Sole for lifetime durability',
      'Soft Orthopedic Dual-Layer Memory Foam Insole',
      'Double Hand-Stitched Nylon Waxed Threading',
      'Signature Kaptaan Cut with Adjustable Buckle Strap'
    ],
    specifications: {
      'Material': '100% Genuine Full Grain Leather',
      'Sole': 'Heavy Duty Recycled Tyre Sole',
      'Origin': 'Charsadda / Peshawar, Pakistan',
      'Available Sizes': '7, 8, 9, 10, 11, 12 (UK/Pakistani Sizing)'
    },
    tags: ['Peshawari Chappal', 'Kaptaan', 'Charsadda', 'Leather', 'Traditional', 'Menswear'],
    isTrending: true,
    warranty: 'Lifetime Sole & Stitching Guarantee',
    returnPolicy: 'Free Size Exchange at your doorstep.',
    variants: [
      { id: 'v1', name: 'Size 8 (UK/PK) - Tan Mustard Brown', sku: 'PCH-TN-8', price: 4499, originalPrice: 6200, stock: 5, size: '8' },
      { id: 'v2', name: 'Size 9 (UK/PK) - Tan Mustard Brown', sku: 'PCH-TN-9', price: 4499, originalPrice: 6200, stock: 4, size: '9' },
      { id: 'v3', name: 'Size 10 (UK/PK) - Tan Mustard Brown', sku: 'PCH-TN-10', price: 4499, originalPrice: 6200, stock: 3, size: '10' },
      { id: 'v4', name: 'Size 9 (UK/PK) - Royal Jet Black', sku: 'PCH-BLK-9', price: 4499, originalPrice: 6200, stock: 3, size: '9' }
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Sardar Usman',
        userCity: 'Multan',
        rating: 5,
        date: '2026-08-07',
        comment: 'Leather quality is top notch. Soft insole makes it comfortable even on hard marble floors during events. Pure Charsadda craft.',
        verifiedPurchase: true,
        helpfulCount: 23
      }
    ]
  },
  {
    id: 'prod-07',
    title: 'Die-Cast Granite Marble Non-Stick Cookware Set (10 Pieces)',
    slug: 'die-cast-granite-non-stick-cookware-10pc',
    brand: 'Master Chef PK',
    category: 'home-kitchen',
    subcategory: 'Non-Stick Cookware Sets',
    price: 14999,
    originalPrice: 21999,
    discountPercentage: 32,
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    stockCount: 10,
    featuredImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Upgrade your Pakistani kitchen with heavy-duty 5-layer German marble granite coating. 100% PFOA and PTFE free for healthy zero-oil cooking (Biryani, Nihari, Karahi, Omelettes). Induction and gas stove compatible with heat-resistant soft-touch wooden finish handles.',
    shortDescription: '10-Piece heavy granite set: 3 Casserole pots, 1 Karahi, 1 Fry Pan, Tempered glass lids & spatulas.',
    features: [
      '5-Layer Scratch-Resistant Greblon Granite Coating',
      'Zero-Oil Non-Stick Cooking Guarantee',
      'Includes 28cm Large Biryani Pot, 24cm Pot, 20cm Pot, 26cm Karahi, 24cm Pan + 4 Lids + 2 Spatulas',
      'Dishwasher Safe & Compatible with all gas and electric stoves',
      'Heavy Heavy-Gauge Aluminum Base prevents food burning'
    ],
    specifications: {
      'Pieces': '10-Piece Complete Cookware Set',
      'Coating': 'German Granite Non-Stick Coating',
      'Handles': 'Stay-Cool Bakelite Soft Grip',
      'Warranty': '2 Years Replacement Guarantee'
    },
    tags: ['Kitchen', 'Cookware', 'NonStick', 'Biryani', 'Karahi', 'Wedding Gift'],
    isNewArrival: true,
    warranty: '2 Years Manufacturer Replacement Warranty',
    returnPolicy: '7 Days Return on undamaged packaging.',
    reviews: [
      {
        id: 'r1',
        userName: 'Saira Naveed',
        userCity: 'Faisalabad',
        rating: 5,
        date: '2026-08-01',
        comment: 'Made Chicken Karahi and Biryani without sticking at all! Cleaning takes literally 30 seconds. Heavy quality and beautiful wooden handles.',
        verifiedPurchase: true,
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'prod-08',
    title: 'Executive Top-Grain Leather Bi-Fold RFID Protected Wallet & Card Holder',
    slug: 'executive-leather-rfind-bifold-wallet',
    brand: 'Royal Sialkot Leather',
    category: 'leather-goods',
    subcategory: 'Full-Grain Wallets',
    price: 1899,
    originalPrice: 2800,
    discountPercentage: 32,
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    stockCount: 50,
    featuredImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crafted from oily pull-up genuine Sialkot leather that patinas beautifully over time. Features military-grade RFID signal blocking to protect your Pakistani CNIC and credit/debit chip cards from electronic theft. Sized specifically to fit PKR 5,000 and PKR 1,000 currency notes without folding.',
    shortDescription: '100% Genuine Leather with CNIC slot, PKR currency notes compartment & RFID protection.',
    features: [
      '100% Pure Sialkot Cowhide Hunter Leather',
      'Built-in RFID Theft Protection Shield for ATM & CNIC cards',
      'Holds 8+ Cards, Dual Currency Notes Slot, Transparent CNIC window, and Secret Coin Pocket',
      'Slim profile fits comfortably in front and back pockets',
      'Packed in Matte Black Embossed Gift Box'
    ],
    specifications: {
      'Material': '100% Genuine Hunter Cow Leather',
      'Dimensions': '11.5cm x 9.5cm (Fits PKR 5000 note flat)',
      'Card Slots': '8 Slots + 2 Hidden Pockets + 1 ID Window',
      'Warranty': '5 Years Leather Longevity Guarantee'
    },
    tags: ['Wallet', 'Leather', 'RFID', 'CNIC', 'Gift', 'Menswear'],
    isBestSeller: true,
    warranty: '5 Years Replacement on Leather Crack',
    returnPolicy: '7 Days Doorstep Return.',
    reviews: [
      {
        id: 'r1',
        userName: 'Farhan Zaidi',
        userCity: 'Karachi (Gulshan)',
        rating: 5,
        date: '2026-08-13',
        comment: 'Leather smell is authentic. CNIC fits smoothly and 5000 rupee notes do not stick out. Great price for pure leather.',
        verifiedPurchase: true,
        helpfulCount: 45
      }
    ]
  }
];

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    badge: '🇵🇰 Mega Azadi & Tech Gala 2026',
    title: 'Up to 60% Off Across Pakistan',
    subtitle: 'From Designer Lawn Pret to High-End Wireless ANC Earbuds. Enjoy Free TCS Delivery & Cash on Delivery nationwide.',
    ctaText: 'Explore Gala Deals',
    ctaCategory: 'smart-audio',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    highlightCode: 'USE CODE: AZADI500'
  },
  {
    id: 'slide-2',
    badge: '✨ Festive Elegance 2026',
    title: 'Luxury Pret & Embroidered Lawn',
    subtitle: 'Step into unmatched sophistication with handcrafted 3-piece designer wear and pure silk dupattas.',
    ctaText: 'Shop Women’s Pret',
    ctaCategory: 'womens-fashion',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    highlightCode: 'CODE: WELCOMEPK (15% OFF)'
  },
  {
    id: 'slide-3',
    badge: '👑 Royal Oriental Heritage',
    title: 'Pure Dehn Al Oud & Artisan Leather',
    subtitle: 'Indulge in non-alcoholic attars and Charsadda handmade Peshawari footwear crafted for royalty.',
    ctaText: 'Discover Collection',
    ctaCategory: 'fragrances',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80',
    highlightCode: 'FREE SHIPPING OVER ₨2,999'
  }
];

export const TRUST_BENEFITS = [
  {
    id: 'b1',
    icon: 'Truck',
    title: 'Cash On Delivery Nationwide',
    description: 'Pay safely at your doorstep in over 250+ cities, towns, and villages across Pakistan.'
  },
  {
    id: 'b2',
    icon: 'ShieldCheck',
    title: '100% Authentic Guarantee',
    description: 'Original brand warranties with official service centers in Karachi, Lahore, and Islamabad.'
  },
  {
    id: 'b3',
    icon: 'RotateCcw',
    title: '7-Day Easy Doorstep Returns',
    description: 'Not satisfied? Rider will pick up from your home and get instant refund or exchange.'
  },
  {
    id: 'b4',
    icon: 'Smartphone',
    title: 'JazzCash & Easypaisa Ready',
    description: 'Instant 1-tap mobile payments, 1Link Raast ID, Bank Transfers, and Card checkout.'
  }
];
