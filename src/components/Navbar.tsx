import { ShoppingBag, Soup, Sparkles, ShieldCheck } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: 'menu' | 'orders' | 'admin';
  onChangeSection: (section: 'menu' | 'orders' | 'admin') => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  activeSection,
  onChangeSection,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => onChangeSection('menu')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-amber-500 text-white p-2 rounded-xl group-hover:scale-105 transition-transform">
              <Soup className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                Restoran <span className="text-amber-500">MBG</span>
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              </span>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Cita Rasa Nusantara</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex space-x-1">
            <button
              onClick={() => onChangeSection('menu')}
              className={`px-4 py-2 rounded-lg font-sans font-medium text-sm transition-colors ${
                activeSection === 'menu'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Menu Kami
            </button>
            <button
              onClick={() => onChangeSection('orders')}
              className={`px-4 py-2 rounded-lg font-sans font-medium text-sm transition-colors ${
                activeSection === 'orders'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Lacak Pesanan
            </button>
            <button
              onClick={() => onChangeSection('admin')}
              className={`px-4 py-2 rounded-lg font-sans font-medium text-sm transition-colors flex items-center gap-1.5 ${
                activeSection === 'admin'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-1000 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Simulasi Admin
            </button>
          </nav>

          {/* Right Side actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Nav Link representation for easier switching */}
            <div className="md:hidden flex gap-1">
              <button
                onClick={() => onChangeSection('orders')}
                className={`p-2 rounded-lg text-sm transition-colors ${
                  activeSection === 'orders'
                    ? 'bg-amber-100 text-amber-700 font-semibold'
                    : 'text-slate-600'
                }`}
                title="Lacak Pesanan"
              >
                Pesanan
              </button>
              <button
                onClick={() => onChangeSection('admin')}
                className={`p-2 rounded-lg text-sm transition-colors ${
                  activeSection === 'admin'
                    ? 'bg-slate-200 text-slate-800 font-semibold'
                    : 'text-slate-600'
                }`}
                title="Simulasi Admin"
              >
                Admin
              </button>
            </div>

            {/* Cart Button */}
            <button
              id="cart-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100/80 px-4 py-2 rounded-xl transition-all cursor-pointer font-medium active:scale-95"
            >
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <span className="hidden sm:inline font-sans text-sm">Keranjang</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-1 bg-amber-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
