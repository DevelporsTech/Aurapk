import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  ProductVariant, 
  Order, 
  UserProfile, 
  Coupon, 
  FilterState, 
  ShippingAddress, 
  ActiveView, 
  CourierLogisticsSettings,
  SiteDesignSettings,
  SalesCampaignSettings,
  HeroSlideConfig,
  PromoBannerConfig,
  BankAccountOption,
  BankTransferSettings
} from '../types';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES as INITIAL_CATEGORIES, HERO_SLIDES as INITIAL_HERO_SLIDES } from '../data/mockProducts';
import { PAKISTAN_CITIES, AVAILABLE_COUPONS, CityInfo, DEFAULT_BANK_SETTINGS } from '../data/pakistanLocations';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error' | 'warning';
  title: string;
  message: string;
}

interface StoreContextType {
  products: Product[];
  categories: typeof INITIAL_CATEGORIES;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedCity: CityInfo;
  setSelectedCity: (city: CityInfo) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCount: number;
  
  // Coupon Engine & Management
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => boolean;
  updateCoupon: (code: string, updated: Partial<Coupon>) => void;
  deleteCoupon: (code: string) => void;
  toggleCouponStatus: (code: string) => void;
  giveCouponToUser: (code: string, recipient?: string) => void;

  // Sales & Flash Deals Management
  salesSettings: SalesCampaignSettings;
  updateSalesSettings: (settings: Partial<SalesCampaignSettings>) => void;
  applyStorewideDiscount: (percentage: number) => void;
  toggleProductFlashDeal: (productId: string, discountPct?: number) => void;
  setBulkFlashDeals: (category: string, discountPct: number) => void;

  // Storefront Design & Theme Studio
  siteDesign: SiteDesignSettings;
  updateSiteDesign: (settings: Partial<SiteDesignSettings>) => void;
  updateHeroSlide: (slideId: string, updated: Partial<HeroSlideConfig>) => void;
  updatePromoBanner: (bannerId: string, updated: Partial<PromoBannerConfig>) => void;
  resetDesignToDefault: () => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Product Modals & Views
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  
  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
  orders: Order[];
  createOrder: (
    shipping: ShippingAddress, 
    paymentMethod: any, 
    bankTransferDetails?: Order['bankTransferDetails']
  ) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: any) => void;
  
  // Bank Payment & Pakistani Banking Gateway
  bankSettings: BankTransferSettings;
  updateBankSettings: (settings: Partial<BankTransferSettings>) => void;
  addBankAccount: (account: BankAccountOption) => void;
  updateBankAccount: (accountId: string, updated: Partial<BankAccountOption>) => void;
  deleteBankAccount: (accountId: string) => void;
  toggleBankAccountStatus: (accountId: string) => void;
  
  // Courier & Rider Admin Controls
  courierSettings: CourierLogisticsSettings;
  updateCourierSettings: (settings: Partial<CourierLogisticsSettings>) => void;
  toggleGlobalRiderPhone: () => void;
  toggleOrderRiderPhone: (orderId: string) => void;
  updateOrderRiderDetails: (orderId: string, riderName: string, riderPhone: string, showRiderPhone?: boolean) => void;
  
  // Search & Filtering
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  searchHistory: string[];
  addSearchQuery: (query: string) => void;
  
  // User & Auth
  user: UserProfile | null;
  loginUser: (phoneOrEmail: string, name?: string, isAdmin?: boolean, role?: 'customer' | 'vip' | 'admin') => void;
  logoutUser: () => void;
  login: (phoneOrEmail: string, password?: string, remember?: boolean) => boolean;
  register: (name: string, email: string, phone: string, password?: string, city?: string) => boolean;
  grantAdminAccess: (password: string) => boolean;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  
  // Admin Product Management
  addProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  
  // Toasts & Notifications
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'aurapk_cart_v1',
  WISHLIST: 'aurapk_wishlist_v1',
  USER: 'aurapk_user_v1',
  ORDERS: 'aurapk_orders_v1',
  THEME: 'aurapk_theme_v1',
  CITY: 'aurapk_city_v1',
  PRODUCTS: 'aurapk_products_v1',
  COURIER_SETTINGS: 'aurapk_courier_settings_v1',
  COUPONS: 'aurapk_coupons_v1',
  SALES_SETTINGS: 'aurapk_sales_settings_v1',
  SITE_DESIGN: 'aurapk_site_design_v1',
  BANK_SETTINGS: 'aurapk_bank_settings_v1'
};

function safeStorageGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (e) {
    console.warn(`Storage get failed for key "${key}":`, e);
    return fallback;
  }
}

function safeStorageSet(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Storage set failed for key "${key}":`, e);
  }
}

const DEFAULT_SITE_DESIGN: SiteDesignSettings = {
  accentColor: '#059669',
  accentColorName: 'Emerald Green',
  announcementText: 'Free Nationwide TCS Shipping on Orders Over ₨ 2,999 — Shop 2026 Collection',
  announcementBadge: 'PAKISTAN DROP',
  announcementCouponCode: 'WELCOMEPK',
  announcementCouponDiscount: '15% OFF',
  freeShippingThreshold: 2999,
  headerSlogan: 'PREMIUM SHOPPING DESTINATION ACROSS PAKISTAN',
  heroSlides: INITIAL_HERO_SLIDES,
  promoBanners: [
    {
      id: 'promo-1',
      badge: 'FESTIVE LAWN PRET 2026',
      title: 'EMBROIDERED 3-PIECE & SILK',
      subtitle: 'Discover lightweight summer lawn with intricate zari embroidery and digital silk dupattas from Faisalabad mills.',
      category: 'womens-fashion',
      ctaText: 'SHOP COLLECTION',
      discountLabel: 'EXTRA 15% OFF',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'promo-2',
      badge: 'ROYAL AROMAS & HERITAGE',
      title: 'PURE DEHN AL OUD & ATTAR',
      subtitle: '24-hour long projection. Pure non-alcoholic Cambodian agarwood and Taif rose oils in velvet collector boxes.',
      category: 'fragrances',
      ctaText: 'EXPLORE OUD',
      discountLabel: 'CODE: WELCOMEPK',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'
    }
  ]
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    return safeStorageGet<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  });

  // Coupons state
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    return safeStorageGet<Coupon[]>(
      STORAGE_KEYS.COUPONS,
      AVAILABLE_COUPONS.map(c => ({
        ...c,
        isActive: true,
        usageLimit: 1000,
        timesUsed: Math.floor(Math.random() * 20) + 8,
        isPublic: true
      }))
    );
  });

  // Sales & Flash Deals Settings
  const [salesSettings, setSalesSettings] = useState<SalesCampaignSettings>(() => {
    return safeStorageGet<SalesCampaignSettings>(STORAGE_KEYS.SALES_SETTINGS, {
      campaignName: '🇵🇰 Mega Azadi & Tech Gala 2026',
      campaignActive: true,
      campaignBadge: 'SUPER DEALS & STEALS',
      flashDealsTitle: 'SUPER DEALS & STEALS',
      flashDealsSubtitle: 'Pakistan Flash Vault • Limited Quantities at Factory Direct Prices',
      flashDealsEndsInHours: 24,
      flashDealsTargetTimestamp: Date.now() + 24 * 60 * 60 * 1000,
      storewideSalePercentage: 0
    });
  });

  // Storefront Design & Theme Settings
  const [siteDesign, setSiteDesign] = useState<SiteDesignSettings>(() => {
    return safeStorageGet<SiteDesignSettings>(STORAGE_KEYS.SITE_DESIGN, DEFAULT_SITE_DESIGN);
  });

  const [courierSettings, setCourierSettings] = useState<CourierLogisticsSettings>(() => {
    return safeStorageGet<CourierLogisticsSettings>(STORAGE_KEYS.COURIER_SETTINGS, {
      isRiderPhoneEnabled: true,
      defaultRiderName: 'Muhammad Tariq',
      defaultRiderPhone: '+92 321 4455667',
      supportContactPhone: '+92 21 111 287 275',
      privacyModeMessage: 'Direct rider mobile number is masked by store administration for driver safety. Contact Central Support for live delivery coordination.'
    });
  });

  const [bankSettings, setBankSettings] = useState<BankTransferSettings>(() => {
    return safeStorageGet<BankTransferSettings>(STORAGE_KEYS.BANK_SETTINGS, DEFAULT_BANK_SETTINGS);
  });
  
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCity, setSelectedCity] = useState<CityInfo>(() => {
    return safeStorageGet<CityInfo>(STORAGE_KEYS.CITY, PAKISTAN_CITIES[0]);
  });
  
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return safeStorageGet<boolean>(STORAGE_KEYS.THEME, false);
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    return safeStorageGet<CartItem[]>(STORAGE_KEYS.CART, []);
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    return safeStorageGet<string[]>(STORAGE_KEYS.WISHLIST, ['prod-01', 'prod-02']);
  });

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  
  const [orders, setOrders] = useState<Order[]>(() => {
    return safeStorageGet<Order[]>(STORAGE_KEYS.ORDERS, [
      {
        id: 'ord-8831',
        orderNumber: 'AURA-PK-88319',
        trackingNumber: 'TCS-PK-9824103',
        courier: 'TCS Express Pakistan',
        riderName: 'Muhammad Tariq',
        riderPhone: '+92 321 4455667',
        showRiderPhone: true,
        date: '2026-08-15',
        customer: {
          fullName: 'Ali Hassan',
          phone: '+92 300 8472910',
          email: 'ali.hassan@example.pk',
          province: 'Punjab',
          city: 'Lahore',
          area: 'DHA Phase 5',
          address: 'House 42, Sector C, Street 8',
          postalCode: '54000'
        },
        items: [
          {
            id: 'cart-1',
            productId: 'prod-02',
            title: 'AuraPulse ANC Wireless Earbuds (45dB Noise Cancellation)',
            slug: 'aurapulse-anc-wireless-earbuds-45db',
            price: 4999,
            originalPrice: 7499,
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
            quantity: 1,
            stock: 45
          }
        ],
        subtotal: 4999,
        discount: 500,
        shippingFee: 0,
        total: 4499,
        paymentMethod: 'cod',
        paymentStatus: 'cod_pending',
        status: 'out_for_delivery',
        estimatedDeliveryDate: '2026-08-17',
        trackingTimeline: [
          {
            status: 'confirmed',
            title: 'Order Confirmed',
            description: 'Order placed & inventory reserved in Lahore Central Warehouse.',
            location: 'Lahore Distribution Hub',
            timestamp: '2026-08-15 11:30 AM',
            completed: true
          },
          {
            status: 'processing',
            title: 'Packed & Quality Verified',
            description: 'Item securely boxed with tamper-proof security seal.',
            location: 'Aura Fulfillment Center',
            timestamp: '2026-08-15 03:45 PM',
            completed: true
          },
          {
            status: 'shipped',
            title: 'Handed to TCS Express',
            description: 'Airway bill generated (TCS-PK-9824103) & dispatched in transit.',
            location: 'TCS Hub Gulberg Lahore',
            timestamp: '2026-08-16 09:15 AM',
            completed: true
          },
          {
            status: 'out_for_delivery',
            title: 'Out for Doorstep Delivery',
            description: 'Rider Muhammad Tariq assigned for cash collection.',
            location: 'DHA Delivery Station, Lahore',
            timestamp: '2026-08-17 08:30 AM',
            completed: true
          },
          {
            status: 'delivered',
            title: 'Delivered',
            description: 'Parcel handed over to customer.',
            location: 'Customer Address',
            timestamp: 'Expected Today by 04:00 PM',
            completed: false
          }
        ]
      }
    ]);
  });

  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    subcategory: 'all',
    brand: 'all',
    minPrice: 0,
    maxPrice: 30000,
    minRating: 0,
    inStockOnly: false,
    onSaleOnly: false,
    searchQuery: '',
    sortBy: 'featured'
  });

  const [searchHistory, setSearchHistory] = useState<string[]>(['Lawn suit', 'Wireless Earbuds', 'Shalwar Kameez', 'Oud Attar', 'Peshawari Chappal']);

  const [user, setUser] = useState<UserProfile | null>(() => {
    return safeStorageGet<UserProfile | null>(STORAGE_KEYS.USER, {
      id: 'usr-901',
      name: 'Muhammad Farooq',
      phone: '+92 300 1234567',
      email: 'arainumarfarooq40@gmail.com',
      city: 'Karachi',
      province: 'Sindh',
      addresses: [
        {
          fullName: 'Muhammad Farooq',
          phone: '+92 300 1234567',
          email: 'arainumarfarooq40@gmail.com',
          province: 'Sindh',
          city: 'Karachi',
          area: 'Clifton Block 4',
          address: 'Apartment 5B, Ocean Heights',
          postalCode: '74200'
        }
      ],
      createdAt: '2026-01-10'
    });
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // Sync to LocalStorage
  useEffect(() => {
    safeStorageSet(STORAGE_KEYS.CART, cart);
  }, [cart]);

  useEffect(() => {
    safeStorageSet(STORAGE_KEYS.WISHLIST, wishlist);
  }, [wishlist]);

  useEffect(() => {
    safeStorageSet(STORAGE_KEYS.THEME, darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    safeStorageSet(STORAGE_KEYS.CITY, selectedCity);
  }, [selectedCity]);

  useEffect(() => {
    safeStorageSet(STORAGE_KEYS.ORDERS, orders);
  }, [orders]);

  useEffect(() => {
    safeStorageSet(STORAGE_KEYS.PRODUCTS, products);
  }, [products]);

  useEffect(() => {
    safeStorageSet(STORAGE_KEYS.COURIER_SETTINGS, courierSettings);
  }, [courierSettings]);

  useEffect(() => {
    safeStorageSet(STORAGE_KEYS.COUPONS, coupons);
  }, [coupons]);

  useEffect(() => {
    safeStorageSet(STORAGE_KEYS.SALES_SETTINGS, salesSettings);
  }, [salesSettings]);

  useEffect(() => {
    safeStorageSet(STORAGE_KEYS.SITE_DESIGN, siteDesign);
  }, [siteDesign]);

  useEffect(() => {
    safeStorageSet(STORAGE_KEYS.BANK_SETTINGS, bankSettings);
  }, [bankSettings]);

  useEffect(() => {
    if (user) {
      safeStorageSet(STORAGE_KEYS.USER, user);
    } else {
      try {
        localStorage.removeItem(STORAGE_KEYS.USER);
      } catch (e) {
        console.warn('Failed removing user storage:', e);
      }
    }
  }, [user]);

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant, selectedColor?: string, selectedSize?: string) => {
    const cartItemId = variant ? `${product.id}-${variant.id}` : `${product.id}-${selectedColor || ''}-${selectedSize || ''}`;
    const price = variant ? variant.price : product.price;
    const originalPrice = variant ? variant.originalPrice : product.originalPrice;
    const image = variant?.image || product.featuredImage;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            title: product.title,
            slug: product.slug,
            price,
            originalPrice,
            image,
            quantity,
            selectedVariant: variant,
            selectedColor,
            selectedSize,
            stock: variant ? variant.stock : product.stockCount
          }
        ];
      }
    });

    addToast('success', 'Added to Cart', `${product.title} (₨ ${price.toLocaleString()}) added.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    addToast('info', 'Item Removed', 'Product removed from your cart.');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: Math.min(quantity, item.stock) } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const couponDiscount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? Math.round((cartSubtotal * appliedCoupon.discountValue) / 100)
      : appliedCoupon.discountValue
    : 0;

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find(c => c.code.toUpperCase() === cleanCode);
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code. Please check code spelling.' };
    }
    if (coupon.isActive === false) {
      return { success: false, message: `Coupon ${coupon.code} is currently deactivated by store admin.` };
    }
    if (coupon.expiryDate) {
      const exp = new Date(coupon.expiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (exp < today) {
        return { success: false, message: `Coupon ${coupon.code} expired on ${coupon.expiryDate}.` };
      }
    }
    if (cartSubtotal < coupon.minSpend) {
      return {
        success: false,
        message: `Min spend for ${coupon.code} is ₨ ${coupon.minSpend.toLocaleString()}`
      };
    }
    
    // Update usage count
    setCoupons(prev =>
      prev.map(c => (c.code.toUpperCase() === cleanCode ? { ...c, timesUsed: (c.timesUsed || 0) + 1 } : c))
    );

    setAppliedCoupon(coupon);
    addToast('success', 'Coupon Applied!', `₨ ${coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : coupon.discountValue} discount applied!`);
    return { success: true, message: `Discount coupon ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('info', 'Coupon Removed', 'Discount coupon removed.');
  };

  // Coupon Admin Methods
  const addCoupon = (newCoupon: Coupon): boolean => {
    const cleanCode = newCoupon.code.trim().toUpperCase();
    if (!cleanCode) {
      addToast('error', 'Invalid Coupon', 'Coupon code cannot be empty.');
      return false;
    }
    const exists = coupons.some(c => c.code.toUpperCase() === cleanCode);
    if (exists) {
      addToast('error', 'Duplicate Code', `Coupon code ${cleanCode} already exists.`);
      return false;
    }
    const formatted: Coupon = {
      ...newCoupon,
      code: cleanCode,
      isActive: newCoupon.isActive !== undefined ? newCoupon.isActive : true,
      timesUsed: 0,
      usageLimit: newCoupon.usageLimit || 500,
      isPublic: newCoupon.isPublic !== undefined ? newCoupon.isPublic : true
    };
    setCoupons(prev => [formatted, ...prev]);
    addToast('success', 'Coupon Created', `Voucher ${cleanCode} has been published successfully.`);
    return true;
  };

  const updateCoupon = (code: string, updated: Partial<Coupon>) => {
    const cleanCode = code.trim().toUpperCase();
    setCoupons(prev =>
      prev.map(c => {
        if (c.code.toUpperCase() === cleanCode) {
          const next = { ...c, ...updated };
          if (updated.code) {
            next.code = updated.code.trim().toUpperCase();
          }
          return next;
        }
        return c;
      })
    );
    addToast('success', 'Coupon Updated', `Changes to ${cleanCode} saved.`);
  };

  const deleteCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    setCoupons(prev => prev.filter(c => c.code.toUpperCase() !== cleanCode));
    if (appliedCoupon && appliedCoupon.code.toUpperCase() === cleanCode) {
      setAppliedCoupon(null);
    }
    addToast('info', 'Coupon Deleted', `Coupon ${cleanCode} has been permanently deleted.`);
  };

  const toggleCouponStatus = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    setCoupons(prev =>
      prev.map(c => {
        if (c.code.toUpperCase() === cleanCode) {
          const nextActive = !c.isActive;
          addToast(
            nextActive ? 'success' : 'info',
            nextActive ? 'Coupon Activated' : 'Coupon Paused',
            `Coupon ${cleanCode} is now ${nextActive ? 'ACTIVE and redeemable' : 'PAUSED'}.`
          );
          return { ...c, isActive: nextActive };
        }
        return c;
      })
    );
  };

  const giveCouponToUser = (code: string, recipient?: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find(c => c.code.toUpperCase() === cleanCode);
    if (!coupon) return;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(cleanCode).catch(() => {});
    }

    const discountText = coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₨ ${coupon.discountValue} OFF`;
    addToast(
      'success',
      'Coupon Voucher Issued!',
      `Copied code ${cleanCode} (${discountText}). Share with customer ${recipient ? `(${recipient})` : 'or WhatsApp'}!`
    );
  };

  // Sales & Flash Deals Admin Methods
  const updateSalesSettings = (settings: Partial<SalesCampaignSettings>) => {
    setSalesSettings(prev => ({ ...prev, ...settings }));
    addToast('success', 'Sales Settings Saved', 'Live promotional campaign and countdown timers updated.');
  };

  const applyStorewideDiscount = (percentage: number) => {
    if (percentage <= 0) {
      // Reset prices to original
      setProducts(INITIAL_PRODUCTS);
      setSalesSettings(prev => ({ ...prev, storewideSalePercentage: 0 }));
      addToast('info', 'Sale Reset', 'All product discounts reset to default catalog pricing.');
      return;
    }

    setProducts(prev =>
      prev.map(p => {
        const discountPercentage = Math.max(p.discountPercentage, percentage);
        const price = Math.round(p.originalPrice * (1 - discountPercentage / 100));
        return {
          ...p,
          discountPercentage,
          price
        };
      })
    );
    setSalesSettings(prev => ({ ...prev, storewideSalePercentage: percentage }));
    addToast('success', 'Storewide Sale Active', `Applied ${percentage}% discount across all inventory!`);
  };

  const toggleProductFlashDeal = (productId: string, discountPct?: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const isFlash = !p.isFlashDeal;
          const discountPercentage = discountPct !== undefined ? discountPct : (isFlash ? Math.max(p.discountPercentage, 35) : p.discountPercentage);
          const price = Math.round(p.originalPrice * (1 - discountPercentage / 100));
          return {
            ...p,
            isFlashDeal: isFlash,
            discountPercentage,
            price,
            flashDealClaimed: isFlash ? Math.floor(Math.random() * 40) + 50 : undefined
          };
        }
        return p;
      })
    );
    addToast('success', 'Flash Deal Updated', 'Product flash status toggled.');
  };

  const setBulkFlashDeals = (category: string, discountPct: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (category === 'all' || p.category === category) {
          const discountPercentage = Math.max(discountPct, p.discountPercentage);
          const price = Math.round(p.originalPrice * (1 - discountPercentage / 100));
          return {
            ...p,
            isFlashDeal: true,
            discountPercentage,
            price,
            flashDealClaimed: Math.floor(Math.random() * 35) + 60
          };
        }
        return p;
      })
    );
    addToast('success', 'Flash Deals Applied', `Bulk ${discountPct}% Flash Deals activated.`);
  };

  // Storefront Design & Theme Methods
  const updateSiteDesign = (settings: Partial<SiteDesignSettings>) => {
    setSiteDesign(prev => ({ ...prev, ...settings }));
    addToast('success', 'Theme & Design Saved', 'Storefront styling, colors, and banner assets updated in real-time.');
  };

  const updateHeroSlide = (slideId: string, updated: Partial<HeroSlideConfig>) => {
    setSiteDesign(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.map(s => (s.id === slideId ? { ...s, ...updated } : s))
    }));
    addToast('success', 'Hero Slide Saved', 'Hero banner slide updated.');
  };

  const updatePromoBanner = (bannerId: string, updated: Partial<PromoBannerConfig>) => {
    setSiteDesign(prev => ({
      ...prev,
      promoBanners: prev.promoBanners.map(b => (b.id === bannerId ? { ...b, ...updated } : b))
    }));
    addToast('success', 'Promo Banner Saved', 'Promotional card updated.');
  };

  const resetDesignToDefault = () => {
    setSiteDesign(DEFAULT_SITE_DESIGN);
    addToast('info', 'Design Reset', 'Store design reset to official AuraPK defaults.');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('info', 'Wishlist Updated', 'Item removed from your wishlist.');
        return prev.filter(id => id !== productId);
      } else {
        addToast('success', 'Saved to Wishlist', 'Item saved for later shopping.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const resetFilters = () => {
    setFilterState({
      category: 'all',
      subcategory: 'all',
      brand: 'all',
      minPrice: 0,
      maxPrice: 30000,
      minRating: 0,
      inStockOnly: false,
      onSaleOnly: false,
      searchQuery: '',
      sortBy: 'featured'
    });
  };

  const addSearchQuery = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory(prev => [query.trim(), ...prev.filter(q => q.toLowerCase() !== query.toLowerCase())].slice(0, 8));
  };

  const loginUser = (phoneOrEmail: string, name = 'Valued Customer', isAdmin = false, role: 'customer' | 'vip' | 'admin' = 'customer') => {
    const isEmail = phoneOrEmail.includes('@');
    const newUser: UserProfile = {
      id: 'usr-' + Math.random().toString(36).substring(2, 7),
      name,
      phone: phoneOrEmail.startsWith('03') || phoneOrEmail.startsWith('+92') ? phoneOrEmail : '+92 300 1234567',
      email: isEmail ? phoneOrEmail : `${name.toLowerCase().replace(/\s+/g, '')}@aurapk.com`,
      city: selectedCity.name,
      province: selectedCity.province,
      isAdmin: isAdmin || role === 'admin' || phoneOrEmail.toLowerCase().includes('admin'),
      role: isAdmin || phoneOrEmail.toLowerCase().includes('admin') ? 'admin' : role,
      loyaltyPoints: role === 'vip' ? 2450 : 250,
      addresses: [
        {
          fullName: name,
          phone: phoneOrEmail.startsWith('03') || phoneOrEmail.startsWith('+92') ? phoneOrEmail : '+92 300 1234567',
          email: isEmail ? phoneOrEmail : `${name.toLowerCase().replace(/\s+/g, '')}@aurapk.com`,
          province: selectedCity.province,
          city: selectedCity.name,
          area: 'Central Block, Main Road',
          address: 'House #12, Street 4',
          postalCode: selectedCity.postalCode
        }
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    addToast('success', 'Welcome to AuraPK!', `Signed in as ${name}`);
  };

  const login = (phoneOrEmail: string, password?: string, _remember?: boolean) => {
    const isEmail = phoneOrEmail.includes('@');
    const isAdminPassword = password === 'unfavhamza' || phoneOrEmail === 'unfavhamza';
    const isAdmin = isAdminPassword || phoneOrEmail.toLowerCase().includes('admin');
    let name = 'Valued Customer';
    let role: 'customer' | 'vip' | 'admin' = isAdmin ? 'admin' : 'customer';

    if (isAdminPassword) {
      name = 'Hamza (Store Admin)';
      role = 'admin';
    } else if (isAdmin) {
      name = 'Store Admin (HQ)';
      role = 'admin';
    } else if (phoneOrEmail.includes('vip') || phoneOrEmail.includes('ayesha')) {
      name = 'Ayesha Khan (VIP)';
      role = 'vip';
    } else if (phoneOrEmail.includes('hamza') || phoneOrEmail.includes('1234567')) {
      name = 'Hamza Ali';
    } else if (isEmail) {
      name = phoneOrEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    loginUser(phoneOrEmail, name, isAdmin, role);
    if (isAdminPassword) {
      addToast('success', 'Admin Access Granted 🛡️', 'Logged in with Master Password unfavhamza. Admin portal unlocked.');
    }
    return true;
  };

  const register = (name: string, email: string, phone: string, password?: string, city?: string) => {
    const assignedCity = city || selectedCity.name;
    const matchedCity = PAKISTAN_CITIES.find(c => c.name.toLowerCase() === assignedCity.toLowerCase()) || selectedCity;
    const isAdminPassword = password === 'unfavhamza';
    const isAdmin = isAdminPassword || email.toLowerCase().includes('admin');
    const role: 'customer' | 'vip' | 'admin' = isAdmin ? 'admin' : 'customer';

    const newUser: UserProfile = {
      id: 'usr-' + Math.random().toString(36).substring(2, 7),
      name: name.trim() || (isAdminPassword ? 'Hamza (Store Admin)' : 'Shopper'),
      phone: phone || '+92 300 1234567',
      email: email || 'user@aurapk.com',
      city: matchedCity.name,
      province: matchedCity.province,
      isAdmin,
      role,
      loyaltyPoints: isAdmin ? 9999 : 500, // Welcome gift points
      addresses: [
        {
          fullName: name.trim() || (isAdminPassword ? 'Hamza Admin' : 'Customer'),
          phone: phone || '+92 300 1234567',
          email: email || 'user@aurapk.com',
          province: matchedCity.province,
          city: matchedCity.name,
          area: 'Main City Center',
          address: 'Street 1, Near Main Bazaar',
          postalCode: matchedCity.postalCode
        }
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    if (isAdminPassword) {
      addToast('success', 'Admin Account Created & Verified! 🛡️', 'Master Password unfavhamza recognized. Full administrator access active.');
    } else {
      addToast('success', 'Account Verified & Created! 🎉', `Welcome to AuraPK, ${newUser.name}. 500 Welcome Points added!`);
    }
    return true;
  };

  const grantAdminAccess = (pass: string): boolean => {
    if (pass === 'unfavhamza') {
      const adminUser: UserProfile = user ? {
        ...user,
        isAdmin: true,
        role: 'admin',
        name: user.name.toLowerCase().includes('customer') ? 'Hamza (Store Admin)' : user.name
      } : {
        id: 'adm-' + Math.random().toString(36).substring(2, 7),
        name: 'Hamza (Store Admin)',
        email: 'admin@aurapk.com',
        phone: '+92 300 0000000',
        city: selectedCity.name,
        province: selectedCity.province,
        isAdmin: true,
        role: 'admin',
        loyaltyPoints: 9999,
        addresses: [
          {
            fullName: 'Admin Operations HQ',
            phone: '+92 300 0000000',
            email: 'admin@aurapk.com',
            province: selectedCity.province,
            city: selectedCity.name,
            area: 'Command Center',
            address: 'AuraPK Headquarters, I.I. Chundrigar Road',
            postalCode: selectedCity.postalCode
          }
        ],
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUser(adminUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(adminUser));
      addToast('success', 'Admin Access Granted! 🛡️', 'Master password unfavhamza confirmed. Command Center unlocked.');
      return true;
    }
    addToast('error', 'Access Denied', 'Incorrect admin password.');
    return false;
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    addToast('info', 'Signed Out', 'You have been signed out securely.');
  };

  const logout = logoutUser;

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    addToast('success', 'Profile Updated', 'Your profile details were saved.');
  };

  const createOrder = async (
    shipping: ShippingAddress, 
    paymentMethod: any, 
    bankTransferDetails?: Order['bankTransferDetails']
  ): Promise<Order> => {
    const orderNum = 'AURA-PK-' + Math.floor(10000 + Math.random() * 90000);
    const trackingNum = 'TCS-PK-' + Math.floor(1000000 + Math.random() * 9000000);
    
    // Free delivery threshold: Free if subtotal > 2999, else city fee
    const shippingFee = cartSubtotal >= 2999 ? 0 : selectedCity.deliveryFee;
    const finalTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);

    const now = new Date();
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + (selectedCity.name === 'Karachi' || selectedCity.name === 'Lahore' || selectedCity.name === 'Islamabad' ? 2 : 4));

    const newOrder: Order = {
      id: 'ord-' + Math.random().toString(36).substring(2, 9),
      orderNumber: orderNum,
      trackingNumber: trackingNum,
      courier: 'TCS Express Pakistan',
      riderName: courierSettings.defaultRiderName,
      riderPhone: courierSettings.defaultRiderPhone,
      showRiderPhone: courierSettings.isRiderPhoneEnabled,
      date: now.toISOString().split('T')[0],
      customer: shipping,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: couponDiscount,
      shippingFee,
      total: finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'cod_pending' : paymentMethod === 'bank_transfer' ? 'pending' : 'paid',
      bankTransferDetails,
      status: 'confirmed',
      estimatedDeliveryDate: estDate.toISOString().split('T')[0],
      trackingTimeline: [
        {
          status: 'confirmed',
          title: 'Order Placed & Confirmed',
          description: paymentMethod === 'bank_transfer' 
            ? `Order received with Bank Transfer (${bankTransferDetails?.bankName || 'Direct Bank Deposit'}). Verification in progress.`
            : `Order received and assigned to Fulfillment Hub. Payment method: ${paymentMethod.toUpperCase()}.`,
          location: 'Lahore Central Hub',
          timestamp: 'Just now',
          completed: true
        },
        {
          status: 'processing',
          title: 'Packaging & Quality Check',
          description: 'Items undergoing 3-point inspection and tamper-proof packing.',
          location: 'Fulfillment Station',
          timestamp: 'Scheduled today',
          completed: false
        },
        {
          status: 'shipped',
          title: 'Dispatched with Courier',
          description: `Assigned tracking number ${trackingNum} via TCS Logistics.`,
          location: 'Main Logistics Terminal',
          timestamp: 'Scheduled tomorrow',
          completed: false
        },
        {
          status: 'out_for_delivery',
          title: 'Out for Delivery',
          description: `Local rider ${courierSettings.defaultRiderName} dispatched to ${shipping.city}, ${shipping.area}.`,
          location: `${shipping.city} Express Hub`,
          timestamp: 'Upcoming',
          completed: false
        },
        {
          status: 'delivered',
          title: 'Delivered',
          description: 'Package handed to recipient.',
          location: shipping.address,
          timestamp: 'Upcoming',
          completed: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: any) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updatedTimeline = ord.trackingTimeline.map(evt => {
            if (evt.status === status) return { ...evt, completed: true, timestamp: 'Updated' };
            return evt;
          });
          return { ...ord, status, trackingTimeline: updatedTimeline };
        }
        return ord;
      })
    );
    addToast('success', 'Order Updated', `Order ${orderId} status set to ${status}`);
  };

  // Courier & Rider Admin Controls
  const updateCourierSettings = (settings: Partial<CourierLogisticsSettings>) => {
    setCourierSettings(prev => {
      const updated = { ...prev, ...settings };
      localStorage.setItem(STORAGE_KEYS.COURIER_SETTINGS, JSON.stringify(updated));
      return updated;
    });
    addToast('success', 'Courier Settings Saved', 'Logistics and rider parameters updated.');
  };

  const toggleGlobalRiderPhone = () => {
    setCourierSettings(prev => {
      const nextState = !prev.isRiderPhoneEnabled;
      const updated = { ...prev, isRiderPhoneEnabled: nextState };
      localStorage.setItem(STORAGE_KEYS.COURIER_SETTINGS, JSON.stringify(updated));
      
      if (nextState) {
        addToast('success', 'Rider Numbers Enabled', 'Customers can now view courier rider phone numbers and call directly.');
      } else {
        addToast('warning', 'Rider Numbers Disabled', 'Courier rider direct phone numbers are now hidden across tracking pages.');
      }
      return updated;
    });
  };

  const toggleOrderRiderPhone = (orderId: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const currentVisible = ord.showRiderPhone !== false;
          const nextVisible = !currentVisible;
          if (nextVisible) {
            addToast('success', 'Rider Number Enabled', `Rider contact enabled for Order #${ord.orderNumber}`);
          } else {
            addToast('info', 'Rider Number Disabled', `Rider contact disabled for Order #${ord.orderNumber}`);
          }
          return { ...ord, showRiderPhone: nextVisible };
        }
        return ord;
      })
    );
  };

  const updateOrderRiderDetails = (orderId: string, riderName: string, riderPhone: string, showRiderPhone?: boolean) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            riderName,
            riderPhone,
            showRiderPhone: showRiderPhone !== undefined ? showRiderPhone : (ord.showRiderPhone ?? true)
          };
        }
        return ord;
      })
    );
    addToast('success', 'Rider Assigned', `Updated courier rider details for consignment.`);
  };

  // Bank Payment & Pakistani Banking Gateway Methods
  const updateBankSettings = (settings: Partial<BankTransferSettings>) => {
    setBankSettings(prev => {
      const updated = { ...prev, ...settings };
      localStorage.setItem(STORAGE_KEYS.BANK_SETTINGS, JSON.stringify(updated));
      return updated;
    });
    addToast('success', 'Bank Settings Saved', 'Official Pakistani bank accounts & Raast configuration updated.');
  };

  const addBankAccount = (account: BankAccountOption) => {
    setBankSettings(prev => {
      const updated = {
        ...prev,
        accounts: [...prev.accounts, account]
      };
      localStorage.setItem(STORAGE_KEYS.BANK_SETTINGS, JSON.stringify(updated));
      return updated;
    });
    addToast('success', 'Bank Account Added', `${account.bankName} added to payment options.`);
  };

  const updateBankAccount = (accountId: string, updated: Partial<BankAccountOption>) => {
    setBankSettings(prev => {
      const updatedAccounts = prev.accounts.map(acc => 
        acc.id === accountId ? { ...acc, ...updated } : acc
      );
      const nextSettings = { ...prev, accounts: updatedAccounts };
      localStorage.setItem(STORAGE_KEYS.BANK_SETTINGS, JSON.stringify(nextSettings));
      return nextSettings;
    });
    addToast('success', 'Account Updated', 'Bank details saved successfully.');
  };

  const deleteBankAccount = (accountId: string) => {
    setBankSettings(prev => {
      const filtered = prev.accounts.filter(acc => acc.id !== accountId);
      const nextSettings = { ...prev, accounts: filtered };
      localStorage.setItem(STORAGE_KEYS.BANK_SETTINGS, JSON.stringify(nextSettings));
      return nextSettings;
    });
    addToast('info', 'Account Removed', 'Bank account removed from payment methods.');
  };

  const toggleBankAccountStatus = (accountId: string) => {
    setBankSettings(prev => {
      const updatedAccounts = prev.accounts.map(acc => {
        if (acc.id === accountId) {
          const nextActive = !acc.isActive;
          addToast(
            nextActive ? 'success' : 'info', 
            nextActive ? 'Bank Activated' : 'Bank Deactivated', 
            `${acc.bankName} is now ${nextActive ? 'active in checkout' : 'hidden from checkout'}.`
          );
          return { ...acc, isActive: nextActive };
        }
        return acc;
      });
      const nextSettings = { ...prev, accounts: updatedAccounts };
      localStorage.setItem(STORAGE_KEYS.BANK_SETTINGS, JSON.stringify(nextSettings));
      return nextSettings;
    });
  };

  // Product Admin
  const addProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    addToast('success', 'Product Added', `${newProd.title} published.`);
  };

  const editProduct = (updatedProd: Product) => {
    setProducts(prev => prev.map(p => (p.id === updatedProd.id ? updatedProd : p)));
    addToast('success', 'Product Updated', `${updatedProd.title} saved.`);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    addToast('info', 'Product Deleted', 'Product removed from store.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories: INITIAL_CATEGORIES,
        activeView,
        setActiveView,
        selectedCity,
        setSelectedCity,
        darkMode,
        setDarkMode,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotalCount,
        coupons,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        toggleCouponStatus,
        giveCouponToUser,
        salesSettings,
        updateSalesSettings,
        applyStorewideDiscount,
        toggleProductFlashDeal,
        setBulkFlashDeals,
        siteDesign,
        updateSiteDesign,
        updateHeroSlide,
        updatePromoBanner,
        resetDesignToDefault,
        bankSettings,
        updateBankSettings,
        addBankAccount,
        updateBankAccount,
        deleteBankAccount,
        toggleBankAccountStatus,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        selectedProduct,
        setSelectedProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastPlacedOrder,
        setLastPlacedOrder,
        orders,
        createOrder,
        updateOrderStatus,
        courierSettings,
        updateCourierSettings,
        toggleGlobalRiderPhone,
        toggleOrderRiderPhone,
        updateOrderRiderDetails,
        filterState,
        setFilterState,
        resetFilters,
        searchHistory,
        addSearchQuery,
        user,
        loginUser,
        logoutUser,
        login,
        register,
        grantAdminAccess,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        updateUserProfile,
        addProduct,
        editProduct,
        deleteProduct,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
