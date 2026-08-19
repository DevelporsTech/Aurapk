import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Flame, 
  Clock, 
  Sparkles, 
  Tag, 
  TrendingDown, 
  Zap, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  Layers, 
  Check, 
  Sliders, 
  Filter,
  DollarSign
} from 'lucide-react';
import { formatPKR } from '../../data/pakistanLocations';
import { Product } from '../../types';

export const SalesCampaignManager: React.FC = () => {
  const { 
    products, 
    salesSettings, 
    updateSalesSettings, 
    applyStorewideDiscount, 
    toggleProductFlashDeal, 
    setBulkFlashDeals,
    addToast 
  } = useStore();

  // Local form state for sales settings
  const [campaignName, setCampaignName] = useState(salesSettings.campaignName);
  const [campaignActive, setCampaignActive] = useState(salesSettings.campaignActive);
  const [campaignBadge, setCampaignBadge] = useState(salesSettings.campaignBadge);
  const [flashDealsTitle, setFlashDealsTitle] = useState(salesSettings.flashDealsTitle);
  const [flashDealsSubtitle, setFlashDealsSubtitle] = useState(salesSettings.flashDealsSubtitle);
  const [countdownHours, setCountdownHours] = useState(24);

  // Storewide discount input
  const [customStorewidePct, setCustomStorewidePct] = useState(15);

  // Filter for products table
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bulkCategory, setBulkCategory] = useState('smart-audio');
  const [bulkDiscount, setBulkDiscount] = useState(35);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const newTarget = Date.now() + countdownHours * 60 * 60 * 1000;
    updateSalesSettings({
      campaignName,
      campaignActive,
      campaignBadge,
      flashDealsTitle,
      flashDealsSubtitle,
      flashDealsEndsInHours: countdownHours,
      flashDealsTargetTimestamp: newTarget
    });
  };

  const handleExtendCountdown = (hours: number) => {
    setCountdownHours(hours);
    const newTarget = Date.now() + hours * 60 * 60 * 1000;
    updateSalesSettings({
      flashDealsEndsInHours: hours,
      flashDealsTargetTimestamp: newTarget
    });
    addToast('success', 'Timer Updated', `Flash deals countdown extended to ${hours} hours.`);
  };

  const flashProducts = products.filter(p => p.isFlashDeal);

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="sales-campaign-manager-section" className="space-y-6 text-white">
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e0e] border border-white/10 p-6 rounded-3xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-display font-black text-white uppercase italic tracking-tight">
              SALES CAMPAIGNS & FLASH VAULT
            </h2>
            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              campaignActive 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'bg-zinc-800 text-zinc-400'
            }`}>
              {campaignActive ? 'CAMPAIGN LIVE' : 'CAMPAIGN PAUSED'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Control homepage flash deals, countdown timers, and apply instant storewide price markdowns across Pakistan.
          </p>
        </div>

        <button
          onClick={() => {
            const next = !campaignActive;
            setCampaignActive(next);
            updateSalesSettings({ campaignActive: next });
            addToast(
              next ? 'success' : 'info',
              next ? 'Sale Active' : 'Sale Paused',
              `Promotional campaign is now ${next ? 'LIVE' : 'PAUSED'}.`
            );
          }}
          className={`px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
            campaignActive
              ? 'bg-amber-500 hover:bg-amber-600 text-black'
              : 'bg-[#181818] hover:bg-white/10 text-white border border-white/20'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{campaignActive ? 'PAUSE LIVE SALES' : 'ACTIVATE LIVE SALES'}</span>
        </button>
      </div>

      {/* Campaign Settings & Countdown Timers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Columns: Campaign Texts & Settings */}
        <div className="lg:col-span-7 bg-[#0e0e0e] border border-white/10 p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <Sliders className="w-4 h-4 text-[#059669]" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-200">
              CAMPAIGN IDENTITY & HEADLINES
            </h3>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                CAMPAIGN TITLE
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={e => setCampaignName(e.target.value)}
                placeholder="e.g. 🇵🇰 Mega Azadi & Tech Gala 2026"
                className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  BANNER BADGE TEXT
                </label>
                <input
                  type="text"
                  value={campaignBadge}
                  onChange={e => setCampaignBadge(e.target.value)}
                  placeholder="e.g. SUPER DEALS & STEALS"
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                  HOMEPAGE FLASH HEADER
                </label>
                <input
                  type="text"
                  value={flashDealsTitle}
                  onChange={e => setFlashDealsTitle(e.target.value)}
                  placeholder="e.g. SUPER DEALS & STEALS"
                  className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[10px] mb-1">
                SUBTITLE / LOCATION PROMISE
              </label>
              <input
                type="text"
                value={flashDealsSubtitle}
                onChange={e => setFlashDealsSubtitle(e.target.value)}
                placeholder="e.g. Pakistan Flash Vault • Limited Quantities at Factory Direct Prices"
                className="w-full bg-[#141414] border border-white/15 p-3 rounded-2xl text-white outline-none focus:border-[#059669]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#059669] hover:bg-[#047857] text-white font-black px-6 py-2.5 rounded-full uppercase tracking-wider text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>SAVE CAMPAIGN TITLES</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 5 Columns: Countdown Clock & Quick Presets */}
        <div className="lg:col-span-5 bg-[#0e0e0e] border border-white/10 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Clock className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-200">
                LIVE COUNTDOWN CLOCK
              </h3>
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Adjust the closing urgency timer shown to shoppers on the home flash deals grid.
            </p>

            <div className="bg-[#141414] border border-white/10 p-4 rounded-2xl my-4 text-center">
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                CURRENT EXPIRATION WINDOW
              </div>
              <div className="text-2xl font-mono font-black text-amber-400">
                {countdownHours} HOURS REMAINING
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                QUICK EXTEND COUNTDOWN TIMER:
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[6, 12, 24, 48].map(h => (
                  <button
                    key={h}
                    onClick={() => handleExtendCountdown(h)}
                    className={`py-2 rounded-xl font-mono font-bold text-xs uppercase transition-all cursor-pointer ${
                      countdownHours === h
                        ? 'bg-amber-500 text-black font-black'
                        : 'bg-[#181818] text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {h}H
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-2xl text-[11px] text-amber-200">
            💡 Timers automatically calculate real-time seconds on customer screens and drive instant FOMO.
          </div>
        </div>

      </div>

      {/* Storewide Instant Markdown Controls */}
      <div className="bg-[#0e0e0e] border border-white/10 p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-rose-400" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-200">
              ONE-CLICK STOREWIDE DISCOUNT (ALL INVENTORY)
            </h3>
          </div>
          {salesSettings.storewideSalePercentage > 0 && (
            <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              {salesSettings.storewideSalePercentage}% ACTIVE
            </span>
          )}
        </div>

        <p className="text-xs text-slate-400">
          Apply flat catalog-wide percentage discounts across all Pakistani kurtas, lawn, shoes, and audio gadgets.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {[10, 15, 20, 25, 35].map(pct => (
            <button
              key={pct}
              onClick={() => applyStorewideDiscount(pct)}
              className="bg-[#141414] hover:bg-[#059669] hover:text-white text-slate-200 font-mono font-black text-xs px-4 py-3 rounded-2xl border border-white/10 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <span>{pct}% STOREWIDE</span>
            </button>
          ))}

          <div className="flex items-center gap-2 bg-[#141414] border border-white/10 px-3 py-1.5 rounded-2xl">
            <span className="text-[11px] text-slate-400 font-bold">CUSTOM:</span>
            <input
              type="number"
              min={1}
              max={90}
              value={customStorewidePct}
              onChange={e => setCustomStorewidePct(Number(e.target.value))}
              className="w-14 bg-[#1e1e1e] border border-white/10 text-xs text-center py-1 rounded text-white font-mono"
            />
            <span className="text-xs font-bold text-slate-300">%</span>
            <button
              onClick={() => applyStorewideDiscount(customStorewidePct)}
              className="bg-[#059669] hover:bg-[#047857] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase cursor-pointer"
            >
              APPLY
            </button>
          </div>

          <button
            onClick={() => applyStorewideDiscount(0)}
            className="bg-rose-950/40 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-bold text-xs px-4 py-3 rounded-2xl transition-all cursor-pointer ml-auto flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET TO REGULAR PRICES</span>
          </button>
        </div>
      </div>

      {/* Flash Deals Inventory Selector Table */}
      <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl overflow-hidden shadow-md space-y-4 p-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#059669]" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-200">
                FLASH VAULT PRODUCTS ({flashProducts.length} ACTIVE DEALS)
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Items checked below appear directly in the prominent homepage flash deals carousel.
            </p>
          </div>

          {/* Bulk Category Action */}
          <div className="flex items-center gap-2">
            <select
              value={bulkCategory}
              onChange={e => setBulkCategory(e.target.value)}
              className="bg-[#141414] border border-white/15 text-xs text-white p-2 rounded-xl outline-none"
            >
              <option value="smart-audio">Smart Audio</option>
              <option value="womens-fashion">Women's Fashion</option>
              <option value="mens-wear">Men's Wear</option>
              <option value="footwear">Footwear</option>
              <option value="fragrances">Fragrances</option>
              <option value="accessories">Accessories</option>
              <option value="all">All Categories</option>
            </select>

            <select
              value={bulkDiscount}
              onChange={e => setBulkDiscount(Number(e.target.value))}
              className="bg-[#141414] border border-white/15 text-xs text-white p-2 rounded-xl outline-none"
            >
              <option value={30}>30% Off</option>
              <option value={40}>40% Off</option>
              <option value={50}>50% Off</option>
              <option value={60}>60% Off</option>
            </select>

            <button
              onClick={() => setBulkFlashDeals(bulkCategory, bulkDiscount)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs px-3.5 py-2 rounded-xl uppercase tracking-wider cursor-pointer"
            >
              BULK FLASH
            </button>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search products by title or brand..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 bg-[#141414] border border-white/15 text-xs text-white p-3 rounded-2xl outline-none focus:border-[#059669]"
          />

          <select
            value={selectedCategoryFilter}
            onChange={e => setSelectedCategoryFilter(e.target.value)}
            className="bg-[#141414] border border-white/15 text-xs text-white p-3 rounded-2xl outline-none focus:border-[#059669]"
          >
            <option value="all">All Categories</option>
            <option value="smart-audio">Smart Audio & ANC</option>
            <option value="womens-fashion">Women's Lawn & Pret</option>
            <option value="mens-wear">Men's Kurta & Shalwar</option>
            <option value="footwear">Footwear & Chappals</option>
            <option value="fragrances">Fragrances & Oud</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Product Cards Table */}
        <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141414] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-white/10 sticky top-0 z-10">
              <tr>
                <th className="p-3">PRODUCT</th>
                <th className="p-3">CATEGORY</th>
                <th className="p-3">REGULAR</th>
                <th className="p-3">SALE PRICE</th>
                <th className="p-3">DISCOUNT</th>
                <th className="p-3 text-right">FLASH VAULT STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  
                  {/* Product Info */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.featuredImage}
                        alt={product.title}
                        className="w-10 h-10 rounded-xl object-cover border border-white/10"
                      />
                      <div>
                        <div className="font-bold text-white max-w-xs truncate">{product.title}</div>
                        <div className="text-[10px] text-slate-400">{product.brand}</div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-3 text-[11px] text-slate-400 capitalize">
                    {product.category.replace('-', ' ')}
                  </td>

                  {/* Regular Price */}
                  <td className="p-3 font-mono text-slate-400 line-through">
                    {formatPKR(product.originalPrice)}
                  </td>

                  {/* Sale Price */}
                  <td className="p-3 font-mono font-black text-white text-sm">
                    {formatPKR(product.price)}
                  </td>

                  {/* Discount */}
                  <td className="p-3">
                    <span className="bg-emerald-950/80 text-[#059669] border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold text-xs">
                      {product.discountPercentage}% OFF
                    </span>
                  </td>

                  {/* Toggle Flash Deal */}
                  <td className="p-3 text-right">
                    <button
                      onClick={() => toggleProductFlashDeal(product.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                        product.isFlashDeal
                          ? 'bg-amber-500 text-black hover:bg-amber-600'
                          : 'bg-[#181818] text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                    >
                      <Zap className="w-3 h-3" />
                      <span>{product.isFlashDeal ? 'IN FLASH VAULT' : '+ ADD TO FLASH'}</span>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
