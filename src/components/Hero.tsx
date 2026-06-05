import { Clock, MapPin, Phone, Sparkles, Utensils } from "lucide-react";

interface HeroProps {
  onExploreMenu: () => void;
}

export default function Hero({ onExploreMenu }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-25 mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80" 
          alt="Restoran MBG Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 py-12 sm:py-16 md:py-20 flex flex-col justify-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 self-start">
          <Sparkles className="w-3.5 h-3.5" />
          Mie Bakso Gelora Nusantara
        </div>
        
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white max-w-2xl leading-none">
          Sensasi Kuah Gurih & <span className="text-amber-400">Bakso Urat</span> Tulen Sejak 1998
        </h1>
        
        <p className="mt-4 text-slate-300 font-sans text-base sm:text-lg max-w-xl leading-relaxed">
          Selamat datang di Restoran MBG! Nikmati resep warisan legendaris mie basah premium kenyal, bakso urat berdaging tebal, dan aneka sajian khas Sunda-Nusantara bercita rasa autentik.
        </p>

        {/* Action Button */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={onExploreMenu}
            className="flex items-center gap-2 bg-amber-500 text-slate-950 hover:bg-amber-400 font-sans font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer active:scale-95"
          >
            <Utensils className="w-4 h-4" />
            Pesan Online Sekarang
          </button>
        </div>

        {/* Specs / Metadata row */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="bg-slate-800 text-amber-400 p-2.5 rounded-lg border border-slate-700">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase">Lokasi Restoran</p>
              <p className="text-slate-200 text-sm font-semibold mt-0.5">Grand Mutiara 2 Cileungsi B1/01, Jawa Barat, Kab. Bogor</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-slate-800 text-amber-400 p-2.5 rounded-lg border border-slate-700">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase">Jam Operasional</p>
              <p className="text-slate-200 text-sm font-semibold mt-0.5">Setiap Hari: 10:00 - 22:00 WIB</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-slate-800 text-amber-400 p-2.5 rounded-lg border border-slate-700">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase">Kontak Delivery</p>
              <p className="text-slate-200 text-sm font-semibold mt-0.5">0812-3456-7890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
