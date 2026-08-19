export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice: number;
  stock: number;
  color?: string;
  size?: string;
  storage?: string;
  image?: string;
}

export interface ProductReview {
  id: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  images?: string[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  featuredImage: string;
  images: string[];
  description: string;
  shortDescription: string;
  features: string[];
  specifications: Record<string, string>;
  tags: string[];
  isFlashDeal?: boolean;
  flashDealEnd?: string;
  flashDealClaimed?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  warranty: string;
  returnPolicy: string;
  variants?: ProductVariant[];
  reviews: ProductReview[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  itemCount: number;
  subcategories: string[];
  description: string;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  selectedVariant?: ProductVariant;
  selectedColor?: string;
  selectedSize?: string;
  stock: number;
}

export type PaymentMethod = 'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer' | 'card';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  area: string;
  address: string;
  postalCode?: string;
  orderNotes?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderTrackingEvent {
  status: OrderStatus;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  trackingNumber: string;
  courier: string;
  riderName?: string;
  riderPhone?: string;
  showRiderPhone?: boolean;
  date: string;
  customer: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'cod_pending' | 'failed';
  bankTransferDetails?: {
    bankId?: string;
    bankName?: string;
    accountTitle?: string;
    iban?: string;
    transactionId?: string;
    senderAccountName?: string;
    senderBankName?: string;
    paymentProofUrl?: string;
  };
  status: OrderStatus;
  estimatedDeliveryDate: string;
  trackingTimeline: OrderTrackingEvent[];
}

export interface BankAccountOption {
  id: string;
  bankName: string;
  shortName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  branchCode: string;
  branchName: string;
  raastId?: string;
  isActive: boolean;
  notes?: string;
  isPopular?: boolean;
}

export interface BankTransferSettings {
  enabled: boolean;
  accounts: BankAccountOption[];
  instructions: string;
  whatsappVerificationNumber: string;
}

export interface CourierLogisticsSettings {
  isRiderPhoneEnabled: boolean;
  defaultRiderName: string;
  defaultRiderPhone: string;
  supportContactPhone: string;
  privacyModeMessage: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  description: string;
  expiryDate: string;
  isActive?: boolean;
  usageLimit?: number;
  timesUsed?: number;
  isPublic?: boolean;
}

export interface HeroSlideConfig {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaCategory: string;
  image: string;
  highlightCode: string;
}

export interface PromoBannerConfig {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  category: string;
  ctaText: string;
  discountLabel: string;
  image: string;
}

export interface SiteDesignSettings {
  accentColor: string;
  accentColorName: string;
  announcementText: string;
  announcementBadge: string;
  announcementCouponCode: string;
  announcementCouponDiscount: string;
  freeShippingThreshold: number;
  heroSlides: HeroSlideConfig[];
  promoBanners: PromoBannerConfig[];
  headerSlogan: string;
}

export interface SalesCampaignSettings {
  campaignName: string;
  campaignActive: boolean;
  campaignBadge: string;
  flashDealsTitle: string;
  flashDealsSubtitle: string;
  flashDealsEndsInHours: number;
  flashDealsTargetTimestamp: number;
  storewideSalePercentage: number;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  province: string;
  addresses: ShippingAddress[];
  createdAt: string;
  isAdmin?: boolean;
  role?: 'customer' | 'vip' | 'admin';
  loyaltyPoints?: number;
}

export type ActiveView = 'home' | 'catalog' | 'tracking' | 'account' | 'profile' | 'auth' | 'login' | 'register' | 'admin' | 'playstore-guide';

export interface FilterState {
  category: string;
  subcategory: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'discount';
}
