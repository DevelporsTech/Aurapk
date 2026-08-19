import React, { Component, ReactNode, ErrorInfo } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in AuraPK:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      this.setState({ hasError: false, error: null });
      window.location.reload();
    } catch {
      window.location.href = '/';
    }
  };

  private handleClearCache = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    } catch {
      window.location.href = '/';
    }
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center p-4 sm:p-6 font-sans">
          <div className="max-w-lg w-full bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black text-amber-400 tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                AuraPK Seamless Recovery
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-white">
                Application Interruption Prevented
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                An unexpected view state was intercepted and safely handled. Your cart and store settings remain intact.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-[#181818] p-3 rounded-2xl border border-white/5 text-[11px] font-mono text-slate-400 text-left overflow-x-auto max-h-28">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 bg-[#059669] hover:bg-[#047857] text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-lg shadow-[#059669]/20"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Store</span>
              </button>

              <button
                type="button"
                onClick={this.handleClearCache}
                className="bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-full transition-colors cursor-pointer"
              >
                Reset Local State
              </button>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
