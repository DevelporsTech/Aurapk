import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { CategorySlider } from './components/home/CategorySlider';
import { FlashDeals } from './components/home/FlashDeals';
import { PromoBanners } from './components/home/PromoBanners';
import { TrustSection } from './components/home/TrustSection';
import { ProductCard } from './components/catalog/ProductCard';
import { ProductGrid } from './components/catalog/ProductGrid';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderSuccessModal } from './components/order/OrderSuccessModal';
import { OrderTrackingView } from './components/order/OrderTrackingView';
import { UserProfileView } from './components/profile/UserProfileView';
import { AuthView } from './components/auth/AuthView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PlayStoreLaunchHub } from './components/playstore/PlayStoreLaunchHub';
import { LegalModal } from './components/legal/LegalModal';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';
import { AIAssistantWidget } from './components/ai/AIAssistantWidget';
import { Sparkles, ArrowRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    products,
    isLegalModalOpen,
    setIsLegalModalOpen,
    legalModalTab
  } = useStore();

  const trendingProducts = products.filter(p => p.isBestSeller || p.isNewArrival).slice(0, 6);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#080808] text-white flex flex-col font-sans selection:bg-[#059669] selection:text-black">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <Navbar />

      {/* Main View Switcher */}
      <main className="flex-1 pb-20 sm:pb-8">
        {activeView === 'home' && (
          <div className="space-y-6">
            {/* Hero Slider with Pakistan City Delivery */}
            <HeroBanner />

            {/* Category Quick Selector */}
            <CategorySlider />

            {/* Live Countdown Flash Deals */}
            <FlashDeals />

            {/* Festive / Seasonal Promo Banners */}
            <PromoBanners />

            {/* Best Sellers in Pakistan with Bold Typography */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-[#059669] mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>CURATED PICKS • PAKISTAN BESTSELLERS</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white italic">
                    NATIONWIDE <span className="text-transparent stroke-text-white">FAVORITES</span>
                  </h2>
                </div>

                <button
                  onClick={() => setActiveView('catalog')}
                  className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#059669] flex items-center gap-2 self-start sm:self-auto group transition-colors cursor-pointer"
                >
                  <span>VIEW ALL (250+)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* 100% Trust & COD Assurance Section */}
            <TrustSection />
          </div>
        )}

        {activeView === 'catalog' && <ProductGrid />}

        {activeView === 'tracking' && <OrderTrackingView />}

        {(activeView === 'auth' || activeView === 'login' || activeView === 'register') && <AuthView />}

        {(activeView === 'account' || (activeView as string) === 'profile') && <UserProfileView />}

        {activeView === 'admin' && <AdminDashboard />}

        {activeView === 'playstore-guide' && <PlayStoreLaunchHub />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Fixed Navigation Bar (App Experience) */}
      <MobileNav />

      {/* Global Modals & Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <ProductDetailModal />
      <AuthModal />
      <ToastContainer />
      <AIAssistantWidget />
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
