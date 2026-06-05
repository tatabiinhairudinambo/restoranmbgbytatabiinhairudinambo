import React from "react";
import { Flame, Plus, Star } from "lucide-react";
import { MenuItem } from "../types";
import { formatRupiah } from "../utils";

interface MenuCardProps {
  key?: string;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  quantityInCart: number;
}

export default function MenuCard({ item, onAddToCart, quantityInCart }: MenuCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full transform hover:-translate-y-0.5 overflow-hidden">
      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges layer */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {item.isPopular && (
            <span className="inline-flex items-center gap-1 bg-amber-500/90 backdrop-blur-xs text-slate-950 text-[10px] font-bold px-2 py-1 rounded-md shadow-xs">
              <Star className="w-3 h-3 fill-slate-950" />
              TERLARIS
            </span>
          )}
          {item.isSpicy && (
            <span className="inline-flex items-center gap-1 bg-rose-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-xs">
              <Flame className="w-3 h-3 fill-white" />
              PEDAS
            </span>
          )}
        </div>
      </div>

      {/* Details body */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-display font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-amber-600 transition-colors">
          {item.name}
        </h3>
        
        <p className="mt-2 text-slate-500 font-sans text-xs line-clamp-3 leading-relaxed flex-grow">
          {item.description}
        </p>

        {/* Pricing and Action row */}
        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Harga</p>
            <p className="font-display font-bold text-lg text-slate-900">
              {formatRupiah(item.price)}
            </p>
          </div>

          <button
            onClick={() => onAddToCart(item)}
            className={`group/btn flex items-center gap-1.5 font-sans font-semibold text-xs px-3.5 py-2.5 rounded-xl cursor-pointer active:scale-95 transition-all ${
              quantityInCart > 0
                ? "bg-amber-600 text-white hover:bg-amber-700 shadow-sm shadow-amber-500/10"
                : "bg-slate-50 text-slate-800 hover:bg-amber-50 hover:text-amber-700 border border-slate-200 hover:border-amber-200"
            }`}
          >
            <Plus className="w-4 h-4 transition-transform group-hover/btn:rotate-90" />
            <span>{quantityInCart > 0 ? `Tambah (${quantityInCart})` : "Tambah"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
