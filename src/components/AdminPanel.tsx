import React from "react";
import { Order } from "../types";
import { formatRupiah } from "../utils";
import { Shield, Clock, Plus, Trash2, ArrowRight, TrendingUp, ShoppingBag, Utensils, Check, RotateCcw, AlertTriangle } from "lucide-react";

interface AdminPanelProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order["status"]) => void;
  onDeleteOrder: (id: string) => void;
}

export default function AdminPanel({ orders, onUpdateStatus, onDeleteOrder }: AdminPanelProps) {
  // Simple statistical analytics
  const totalRevenue = orders
    .filter(o => o.status === "completed")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const activeOrdersCount = orders.filter(o => ["received", "preparing", "delivering"].includes(o.status)).length;
  const completedCount = orders.filter(o => o.status === "completed").length;
  const cancelledCount = orders.filter(o => o.status === "cancelled").length;

  const dineInCount = orders.filter(o => o.orderType === "dine-in").length;
  const deliveryCount = orders.filter(o => o.orderType === "delivery").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Admin Title Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 mb-8 flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-black text-2xl tracking-tight">Backend Admin Simulator</h2>
            <p className="text-slate-400 text-xs mt-0.5">Simulasikan sistem pengelolaan dapur dan pesanan masuk (Server-Side In-Memory DB).</p>
          </div>
        </div>

        <div className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-wide">
          SINKRONISASI AKTIF
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
        {/* Rev */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Omset Selesai (Completed)</p>
            <p className="font-display font-bold text-lg text-slate-900 mt-0.5">{formatRupiah(totalRevenue)}</p>
          </div>
        </div>

        {/* Active Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Menunggu & Diproses</p>
            <p className="font-display font-bold text-lg text-slate-900 mt-0.5">{activeOrdersCount} Pesanan</p>
          </div>
        </div>

        {/* Counter breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Metode Layanan</p>
            <p className="font-display font-medium text-xs text-slate-500 mt-0.5">
              Dine-In: <span className="font-bold text-slate-800">{dineInCount}</span> | Delivery: <span className="font-bold text-slate-800">{deliveryCount}</span>
            </p>
          </div>
        </div>

        {/* Completed status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-xl">
            <TickIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Status Pemesanan</p>
            <p className="font-display font-medium text-xs text-slate-500 mt-0.5">
              Selesai: <span className="font-bold text-emerald-600">{completedCount}</span> | Batal: <span className="font-bold text-rose-600">{cancelledCount}</span>
            </p>
          </div>
        </div>

      </div>

      {/* Main orders table */}
      <div className="bg-white rounded-2xl border border-slate-150 shadow-sm overflow-hidden">
        <div className="px-6 py-5 bg-slate-50 border-b border-slate-150 flex justify-between items-center flex-wrap gap-4">
          <h3 className="font-display font-black text-lg text-slate-900">Daftar Log Antrean Dapur</h3>
          <p className="text-slate-500 text-xs">Ubah status pesanan ke kanan untuk memperbarui visual pelacakan di gawai pelanggan.</p>
        </div>

        {orders.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <ShoppingBag className="w-12 h-12 mx-auto text-slate-300" />
            <p className="mt-4 text-sm">Belum ada pesanan masuk di server.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-3.5">ID / Pelanggan</th>
                  <th className="px-6 py-3.5">Layanan / Detail</th>
                  <th className="px-6 py-3.5">Item / Catatan</th>
                  <th className="px-6 py-3.5">Total Harga</th>
                  <th className="px-6 py-3.5">Alur Status Kerja</th>
                  <th className="px-6 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/40 transition-colors">
                    
                    {/* ID & Customer */}
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-slate-900 text-sm">{ord.id}</div>
                      <div className="font-sans font-medium text-slate-700 mt-0.5">{ord.customerName}</div>
                      <div className="text-[10px] text-slate-400">{ord.phoneNumber}</div>
                      {ord.paymentMethod && (
                        <div className="mt-1.5 flex items-center gap-1">
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-xs bg-amber-500/10 text-amber-800 uppercase tracking-wide">
                            {ord.paymentMethod === 'bank_transfer' ? 'Bank' : ord.paymentMethod}
                          </span>
                          <span className="text-[10px] font-medium text-slate-500 truncate max-w-[110px]" title={ord.paymentDetails}>
                            {ord.paymentDetails}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Service / Placement */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {ord.orderType === "dine-in" ? (
                          <>
                            <span className="bg-amber-150 text-amber-900 text-[10px] font-semibold px-2 py-0.5 rounded-md">Dine-in</span>
                            <span className="text-xs text-slate-600 font-bold">{ord.tableNumber}</span>
                          </>
                        ) : (
                          <>
                            <span className="bg-sky-150 text-sky-900 text-[10px] font-semibold px-2 py-0.5 rounded-md">Delivery</span>
                            <span className="text-xs text-slate-500 font-medium line-clamp-1 max-w-[120px]" title={ord.deliveryAddress}>
                              {ord.deliveryAddress}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Dibuat: {new Date(ord.createdAt).toLocaleTimeString("id-ID")} WIB
                      </div>
                    </td>

                    {/* Items detail list */}
                    <td className="px-6 py-4">
                      <div className="text-xs text-slate-600 space-y-0.5 max-w-[200px]">
                        {ord.items.map((it, i) => (
                          <div key={i} className="line-clamp-1">
                            • <span className="font-bold">{it.name}</span> (x{it.quantity})
                            {it.notes && <span className="text-[10px] text-amber-700 block italic pl-2">NB: {it.notes}</span>}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Price total */}
                    <td className="px-6 py-4">
                      <div className="font-display font-semibold text-slate-900">{formatRupiah(ord.totalAmount)}</div>
                    </td>

                    {/* Quick Stepper Status controls */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {/* Current Status Badge representation */}
                        <div className="mr-2">
                          <span className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase ${
                            ord.status === "received"
                              ? "bg-slate-100 text-slate-800"
                              : ord.status === "preparing"
                              ? "bg-amber-100 text-amber-800"
                              : ord.status === "delivering"
                              ? "bg-sky-150 text-sky-850"
                              : ord.status === "completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}>
                            {ord.status === "received" && "Baru Masuk"}
                            {ord.status === "preparing" && "Dimasak"}
                            {ord.status === "delivering" && (ord.orderType === "delivery" ? "Kirim" : "Saji")}
                            {ord.status === "completed" && "Selesai"}
                            {ord.status === "cancelled" && "Batal"}
                          </span>
                        </div>

                        {/* Interactive flow actions */}
                        {ord.status === "received" && (
                          <button
                            onClick={() => onUpdateStatus(ord.id, "preparing")}
                            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-[10px] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            Masak Hidangan
                          </button>
                        )}
                        
                        {ord.status === "preparing" && (
                          <button
                            onClick={() => onUpdateStatus(ord.id, "delivering")}
                            className="bg-sky-500 hover:bg-sky-600 text-slate-950 font-semibold text-[10px] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            {ord.orderType === "delivery" ? "Kirim Kurir" : "Sajikan ke Meja"}
                          </button>
                        )}
                        
                        {ord.status === "delivering" && (
                          <button
                            onClick={() => onUpdateStatus(ord.id, "completed")}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-[10px] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            Selesai Saji
                          </button>
                        )}

                        {["received", "preparing"].includes(ord.status) && (
                          <button
                            onClick={() => onUpdateStatus(ord.id, "cancelled")}
                            className="hover:bg-rose-50 text-rose-600 border border-transparent hover:border-rose-200 font-semibold text-[10px] px-2 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            Tolak/Batal
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Deletion row action for cleanup (testing ease) */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onDeleteOrder(ord.id)}
                        className="text-slate-350 hover:text-rose-600 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Hapus Permanen Dari Log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline svg wrapper icon for completions
function TickIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
