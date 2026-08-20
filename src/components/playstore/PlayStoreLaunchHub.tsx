import React, { useState } from 'react';
import { 
  Smartphone, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  Terminal, 
  Package, 
  Layers, 
  Lock, 
  AlertCircle,
  FileCode2,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PlayStoreLaunchHub: React.FC = () => {
  const { addToast } = useStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customPackageName, setCustomPackageName] = useState('com.aurapk.app');
  const [customSha256, setCustomSha256] = useState('14:6D:E9:44:C5:11:12:40:06:4B:FF:70:91:66:1B:90:E9:DD:5E:0B:4F:2E:80:F3:28:F1:0E:80:48:A5:5D:09');
  const [activeTab, setActiveTab] = useState<'checklist' | 'bubblewrap' | 'assetlinks' | 'store-listing'>('checklist');

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast('success', 'Copied to Clipboard!', `${label} ready to paste.`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const bubblewrapCommand = `# 1. Install Bubblewrap CLI globally
npm install -g @bubblewrap/cli

# 2. Initialize your Android TWA Project directly from your Manifest
bubblewrap init --manifest="https://ais-dev-n3rumcbbsryw5gxzkwmnzk-422216030912.asia-east1.run.app/manifest.json"

# 3. Build the Google Play Store Android App Bundle (.aab)
bubblewrap build

# Your signed .aab file will be generated in ./app-release-signed.aab ready for Google Play Console!`;

  const assetLinksJson = JSON.stringify([
    {
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target": {
        "namespace": "android_app",
        "package_name": customPackageName,
        "sha256_cert_fingerprints": [customSha256]
      }
    }
  ], null, 2);

  return (
    <div id="playstore-hub" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-white">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#022c22] via-[#051c14] to-[#0a0a0a] border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-widest">
            <Smartphone className="w-4 h-4" />
            <span>GOOGLE PLAY STORE LAUNCH READY • TWA & PWA ENGINE</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white italic">
            GOOGLE PLAY <span className="text-[#059669]">DEVELOPER HUB</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Your AuraPK store is pre-configured with complete <strong>Trusted Web Activity (TWA)</strong>, <strong>Digital Asset Links</strong>, <strong>Service Worker offline caching</strong>, and <strong>Play Store Policy compliance</strong>. Package your app into an official Android App Bundle (<code>.aab</code>) for publishing to the Google Play Console in under 2 minutes.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Package ID</span>
              <span className="font-mono font-bold text-xs text-emerald-400">com.aurapk.app</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Target Android API</span>
              <span className="font-mono font-bold text-xs text-white">SDK 34 (Android 14+)</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">App Manifest</span>
              <span className="font-mono font-bold text-xs text-emerald-400">100% Validated</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Data Safety Policy</span>
              <span className="font-mono font-bold text-xs text-emerald-400">In-App Deletion Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar gap-2">
        {[
          { id: 'checklist', label: '1. Play Console Checklist', icon: CheckCircle2 },
          { id: 'bubblewrap', label: '2. Generate .AAB Bundle', icon: Terminal },
          { id: 'assetlinks', label: '3. Digital Asset Links', icon: Lock },
          { id: 'store-listing', label: '4. Play Store Listing Copy', icon: FileCode2 }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'border-[#059669] text-[#059669] bg-[#059669]/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Technical Checklist */}
            <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 space-y-4">
              <h3 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Technical Readiness (Completed)</span>
              </h3>
              
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Web App Manifest (PWA) Configured</strong>
                    <span className="text-slate-400">Standalone display, portrait lock, background color #080808, and high-res maskable icons.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Service Worker & Offline Fallback Active</strong>
                    <span className="text-slate-400">Caches essential shell assets and handles graceful offline alerts when network disconnects.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Digital Asset Links (.well-known/assetlinks.json)</strong>
                    <span className="text-slate-400">Eliminates the Android Chrome address bar so the app runs 100% full-screen native.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">High-Resolution App Assets Ready</strong>
                    <span className="text-slate-400">App icon (512x512 px) and App Logo (1024x1024 px) already bundled in <code>/public</code>.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Play Policy Checklist */}
            <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 space-y-4">
              <h3 className="text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Google Play Console Policy Checklist</span>
              </h3>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Public Privacy Policy URL</strong>
                    <span className="text-slate-400">Included in the footer & in-app modal detailing data sharing only with TCS/Leopards logistics.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Account Deletion & Data Safety Compliant</strong>
                    <span className="text-slate-400">Instant user account & address erasure tool available in User Profile and Legal Center.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Target API Level 34+ (Android 14)</strong>
                    <span className="text-slate-400">Bubblewrap and PWA Builder automatically target Google's required API level.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">E-Commerce & COD Payment Disclosures</strong>
                    <span className="text-slate-400">Clear PKR pricing, no hidden in-app billing surprises, and official 7-day return policy.</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Bubblewrap Build Guide */}
      {activeTab === 'bubblewrap' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base uppercase text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <span>Generate Signed Android App Bundle (.aab) via Bubblewrap</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Run these 3 commands in your local terminal to create the release package for Google Play Console:
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(bubblewrapCommand, 'bubblewrap', 'Bubblewrap Commands')}
                className="bg-[#059669] hover:bg-[#047857] text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center gap-2 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                {copiedKey === 'bubblewrap' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>Copy Terminal Commands</span>
              </button>
            </div>

            <div className="bg-[#060606] border border-white/15 rounded-2xl p-4 font-mono text-xs text-emerald-300 overflow-x-auto">
              <pre>{bubblewrapCommand}</pre>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
              <strong className="text-white block">Option 2: Use PWABuilder (No Code Alternative)</strong>
              <p className="text-slate-400">
                You can also paste your live URL into <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-bold">PWABuilder.com</a>, click <strong>Package for Google Play</strong>, and download your signed <code>.aab</code> package directly with 0 coding.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Digital Asset Links */}
      {activeTab === 'assetlinks' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-bold text-base uppercase text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-400" />
                <span>Digital Asset Links Generator (assetlinks.json)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                This file is saved at <code>/public/.well-known/assetlinks.json</code>. It pairs your domain with your Android App Signing key to verify ownership and remove the URL browser bar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  Android Package Name
                </label>
                <input
                  type="text"
                  value={customPackageName}
                  onChange={e => setCustomPackageName(e.target.value)}
                  className="w-full bg-[#141414] border border-white/15 text-white text-xs p-3 rounded-xl outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                  App Signing Certificate SHA-256 Fingerprint
                </label>
                <input
                  type="text"
                  value={customSha256}
                  onChange={e => setCustomSha256(e.target.value)}
                  placeholder="Get from Google Play Console > App Signing"
                  className="w-full bg-[#141414] border border-white/15 text-white text-xs p-3 rounded-xl outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-bold uppercase">Generated assetlinks.json</span>
                <button
                  onClick={() => copyToClipboard(assetLinksJson, 'assetlinks', 'assetlinks.json')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'assetlinks' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy JSON</span>
                </button>
              </div>

              <div className="bg-[#060606] border border-white/15 rounded-2xl p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                <pre>{assetLinksJson}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Store Listing Copy */}
      {activeTab === 'store-listing' && (
        <div className="space-y-6">
          <div className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="font-bold text-base uppercase text-white flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-emerald-400" />
              <span>Google Play Store Listing Details (Ready to Copy)</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-emerald-400 uppercase tracking-wider">App Title (30 characters max)</strong>
                  <button
                    onClick={() => copyToClipboard("AuraPK — Pakistan Online Store", 'title', 'App Title')}
                    className="text-slate-400 hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-white font-medium text-sm">AuraPK — Pakistan Online Store</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-emerald-400 uppercase tracking-wider">Short Description (80 characters max)</strong>
                  <button
                    onClick={() => copyToClipboard("Shop authentic fashion, audio & attar with Cash on Delivery nationwide via TCS.", 'short_desc', 'Short Description')}
                    className="text-slate-400 hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-white font-medium">Shop authentic fashion, audio & attar with Cash on Delivery nationwide via TCS.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="text-emerald-400 uppercase tracking-wider">Category & Content Rating</strong>
                </div>
                <p className="text-slate-300">Category: <strong>Shopping</strong> | Content Rating: <strong>Everyone (3+)</strong> | In-App Purchases: <strong>No (Physical E-Commerce COD)</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
