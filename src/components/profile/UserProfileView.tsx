import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  Phone, 
  Mail, 
  LogOut, 
  Truck
} from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';
import { ProductCard } from '../catalog/ProductCard';
import { AuthView } from '../auth/AuthView';

export const UserProfileView: React.FC = () => {
  const { user, logout, orders, wishlist, products, setActiveView, openAuthModal } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (!user) {
    return <AuthView />;
  }

  return (
    <div id="profile-page" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Profile Header Card */}
      <div className="bg-[#0e0e0e] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#059669] text-black font-display font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-[#059669]/20">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display font-black text-white uppercase italic tracking-tight">
                {user.name}
              </h1>
              {user.isAdmin && (
                <span className="bg-[#059669]/20 text-[#059669] border border-[#059669]/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                  ADMIN
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#059669]" />
                {user.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#059669]" />
                {user.email}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.isAdmin && (
            <button
              onClick={() => setActiveView('admin')}
              className="bg-white hover:bg-slate-200 text-black text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              ADMIN DASHBOARD
            </button>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-black uppercase tracking-wider px-4 py-2.5 rounded-full bg-rose-950/40 border border-rose-500/30 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-6 font-black text-xs uppercase tracking-widest">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 flex items-center gap-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>MY ORDERS ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 flex items-center gap-2 transition-colors ${
            activeTab === 'wishlist'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>WISHLIST ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 flex items-center gap-2 transition-colors ${
            activeTab === 'addresses'
              ? 'border-b-2 border-[#059669] text-[#059669]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>ADDRESSES ({user.addresses.length})</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map(order => (
              <div
                key={order.id}
                className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-md space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wider">Order ID: </span>
                    <span className="font-mono font-bold text-white">{order.orderNumber}</span>
                    <span className="text-slate-500 ml-2">({order.date})</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="bg-[#059669]/20 text-[#059669] border border-[#059669]/30 font-black px-2.5 py-0.5 rounded-full uppercase text-[10px] tracking-widest">
                      {order.status.replace('-', ' ')}
                    </span>
                    <span className="font-mono font-bold text-slate-300">
                      {order.courier}: {order.trackingNumber}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-white/10">
                  {order.items.map(item => (
                    <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover bg-slate-800" />
                        <div>
                          <p className="font-bold text-white uppercase">{item.title}</p>
                          <p className="text-slate-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-mono font-black text-[#059669]">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wider">Total ({order.paymentMethod.toUpperCase()}): </span>
                    <span className="font-mono font-black text-[#059669] text-sm">
                      {formatPKR(order.total)}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveView('tracking')}
                    className="bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-wider px-4 py-2 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>TRACK CONSIGNMENT</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-[#0e0e0e] rounded-3xl border border-white/10 space-y-2">
              <Package className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-display font-black text-white uppercase">NO ORDERS YET</p>
              <p className="text-xs text-slate-400">Your recent Cash on Delivery orders will appear here.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#0e0e0e] rounded-3xl border border-white/10 space-y-3">
              <Heart className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-base font-display font-black text-white uppercase">YOUR WISHLIST IS EMPTY</h3>
              <p className="text-xs text-slate-400">Tap the heart icon on any product to save it for later.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.addresses.map(addr => (
            <div
              key={addr.id}
              className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-5 shadow-xs space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-sm text-white uppercase">{addr.title}</span>
                {addr.isDefault && (
                  <span className="bg-[#059669]/20 text-[#059669] border border-[#059669]/30 font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-widest">
                    DEFAULT
                  </span>
                )}
              </div>
              <p className="font-semibold text-slate-300">{addr.fullName} ({addr.phone})</p>
              <p className="text-slate-400 leading-relaxed">
                {addr.address}, {addr.area}, {addr.city} ({addr.province})
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
