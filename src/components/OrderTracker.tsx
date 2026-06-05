import { useState } from "react";
import { Order } from "../types";
import { formatRupiah } from "../utils";
import { Search, MapPin, Table, Clock, CheckCircle2, ChevronRight, CookingPot, Truck, Heart, AlertCircle, Trash2 } from "lucide-react";

interface OrderTrackerProps {
  orders: Order[];
  onCancelOrder?: (id: string) => void;
}

export default function OrderTracker({ orders, onCancelOrder }: OrderTrackerProps) {
  const [searchId, setSearchId] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(
    orders.length > 0 ? orders[0].id : null
  );

  // Filter or search logic
  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchId.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchId.toLowerCase())
  );

  const activeOrder = orders.find((o) => o.id === selectedOrderId);

  // Status mapping details
  const getStatusSteps = (status: Order["status"], type: "dine-in" | "delivery") => {
    const steps = [
      { key: "received", label: "Diterima", icon: CheckCircle2, desc: "Sistem mengonfirmasi order masuk" },
      { key: "preparing", label: "Dimasak", icon: CookingPot, desc: "Koki MBG mengolah bumbu rahasia" },
      {
        key: "delivering",
        label: type === "delivery" ? "Pengiriman" : "Disajikan",
        icon: type === "delivery" ? Truck : Table,
        desc: type === "delivery" ? "Kurir meluncur ke tempatmu" : "Pesanan meluncur ke mejamu"
      },
      { key: "completed", label: "Selesai", icon: Heart, desc: "Siap dinikmati hangat-hangat" }
    ];

    const statusIndices: Record<Order["status"], number> = {
      received: 0,
      preparing: 1,
      delivering: 2,
      completed: 3,
      cancelled: -1
    };

    const currentIndex = statusIndices[status];

    return steps.map((s, idx) => {
      let state: "upcoming" | "active" | "completed" = "upcoming";
      if (status === "cancelled") {
        state = "upcoming";
      } else if (idx < currentIndex) {
        state = "completed";
      } else if (idx === currentIndex) {
        state = "active";
      }
      return { ...s, state };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">Sistem Pelacak Pesanan</h2>
        <p className="mt-2 text-slate-500 font-sans text-sm">
          Pantau proses koki andalan kami menyajikan santapan hangat dari Restoran MBG secara real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Order List Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-50 pb-3">Daftar Pesanan Anda</h3>
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari ID Pesanan atau Nama..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white"
            />
          </div>

          {/* Orders vertical stack */}
          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-400 text-sm">Tidak ada pesanan ditemukan.</p>
              <p className="text-slate-300 text-xs mt-1">Coba ketik ID lain atau buat pesanan baru.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredOrders.map((ord) => (
                <button
                  key={ord.id}
                  onClick={() => setSelectedOrderId(ord.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedOrderId === ord.id
                      ? "bg-amber-500/10 border-amber-500/45 shadow-xs"
                      : "bg-slate-50/50 border-slate-150 hover:bg-slate-50 hover:border-slate-350"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono font-bold text-sm text-slate-900">{ord.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        ord.status === "completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : ord.status === "preparing"
                          ? "bg-amber-100 text-amber-800 animate-pulse"
                          : ord.status === "delivering"
                          ? "bg-sky-100 text-sky-800"
                          : ord.status === "cancelled"
                          ? "bg-rose-150 text-rose-800"
                          : "bg-slate-100 text-slate-800"
                      }`}>
                        {ord.status === "received" && "Diterima"}
                        {ord.status === "preparing" && "Dimasak"}
                        {ord.status === "delivering" && (ord.orderType === "delivery" ? "Dikirim" : "Disajikan")}
                        {ord.status === "completed" && "Selesai"}
                        {ord.status === "cancelled" && "Batal"}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-slate-500 mt-1">Atas nama: <span className="font-medium text-slate-700">{ord.customerName}</span></p>
                    <p className="font-sans text-[10px] text-slate-400 mt-0.5">Total: {formatRupiah(ord.totalAmount)}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${selectedOrderId === ord.id ? "translate-x-1 text-amber-600" : ""}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Active Order Timeline Detail Column */}
        <div className="lg:col-span-7">
          {activeOrder ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
              
              {/* Header metadata */}
              <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Pesanan Terpilih</p>
                  <h4 className="font-mono font-extrabold text-2xl text-slate-900 mt-0.5">{activeOrder.id}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Waktu Pemesanan: {new Date(activeOrder.createdAt).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })} WIB
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2 text-xs">
                  {activeOrder.orderType === "dine-in" ? (
                    <>
                      <Table className="w-4 h-4 text-amber-600" />
                      <div>
                        <p className="text-slate-400 font-semibold uppercase text-[9px]">Tipe Layanan</p>
                        <p className="font-bold text-slate-800">Dine-in: {activeOrder.tableNumber}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <div>
                        <p className="text-slate-400 font-semibold uppercase text-[9px]">Tipe Layanan</p>
                        <p className="font-bold text-slate-800 line-clamp-1 max-w-[140px]" title={activeOrder.deliveryAddress}>
                          Kirim / Delivery
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Status Timeline */}
              {activeOrder.status === "cancelled" ? (
                <div className="p-4 bg-rose-50 border border-rose-150 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-sans font-bold text-sm text-rose-900">Pesanan Dibatalkan</h5>
                    <p className="text-xs text-rose-600 mt-0.5">
                      Mohon maaf, pesanan ini telah dibatalkan karena kendala operasional ketersediaan bahan dapur. Silakan melakukan pemesanan menu lain.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h5 className="font-sans font-bold text-xs text-slate-400 uppercase tracking-widest">Aktivitas Lonceng Dapur</h5>
                  <div className="relative pl-6 border-l-2 border-slate-100 ml-3 space-y-8">
                    {getStatusSteps(activeOrder.status, activeOrder.orderType).map((step, idx) => {
                      const StepIcon = step.icon;
                      return (
                        <div key={idx} className="relative">
                          {/* Circle indicator */}
                          <div className={`absolute -left-[35px] top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                            step.state === "completed"
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : step.state === "active"
                              ? "bg-amber-500 border-amber-500 text-slate-950 animate-pulse"
                              : "bg-white border-slate-200 text-slate-300"
                          }`}>
                            <StepIcon className="w-3.5 h-3.5 fill-current" />
                          </div>

                          {/* Content label */}
                          <div>
                            <span className={`text-sm font-sans font-extrabold ${
                              step.state === "completed"
                                ? "text-slate-700 font-medium"
                                : step.state === "active"
                                ? "text-amber-600 font-extrabold flex items-center gap-1.5"
                                : "text-slate-400"
                            }`}>
                              {step.label}
                              {step.state === "active" && (
                                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                              )}
                            </span>
                            <p className="text-xs text-slate-400 mt-0.5 pr-2">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Items Summary detail box */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <h5 className="font-sans font-bold text-xs text-slate-400 uppercase tracking-widest border-b border-slate-200/50 pb-2 mb-3">Ringkasan Hidangan</h5>
                <div className="space-y-3">
                  {activeOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-start text-xs">
                      <div>
                        <p className="font-bold text-slate-800">
                          {it.name} <span className="text-amber-600 font-bold ml-1">x{it.quantity}</span>
                        </p>
                        {it.notes && (
                          <p className="text-[10px] text-amber-700 italic mt-0.5 bg-amber-50 px-1.5 py-0.5 rounded-sm inline-block">Catatan: {it.notes}</p>
                        )}
                      </div>
                      <span className="font-medium text-slate-700">{formatRupiah(it.price * it.quantity)}</span>
                    </div>
                  ))}
                  {activeOrder.paymentMethod && (
                    <div className="border-t border-dashed border-slate-200 pt-3 flex items-center justify-between text-xs mt-3">
                      <span className="text-slate-500 font-sans">Metode Pembayaran</span>
                      <span className="font-extrabold text-slate-700 bg-amber-500/10 text-amber-800 px-2.5 py-0.5 rounded-md text-[11px] font-sans">
                        {activeOrder.paymentMethod === 'bank_transfer' ? 'Transfer Bank' : activeOrder.paymentMethod.toUpperCase()}: <span className="text-slate-800 font-bold">{activeOrder.paymentDetails}</span>
                      </span>
                    </div>
                  )}
                  <div className="border-t border-slate-200 pt-3 flex justify-between text-sm font-bold mt-4">
                    <span className="text-slate-900">Total Tagihan</span>
                    <span className="text-amber-600">{formatRupiah(activeOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Cancellation trigger (if still pending) */}
              {activeOrder.status === "received" && onCancelOrder && (
                <button
                  onClick={() => onCancelOrder(activeOrder.id)}
                  disabled={activeOrder.status !== "received"}
                  className="w-full border border-rose-200 hover:bg-rose-50 text-rose-600 font-sans font-semibold text-xs py-3 rounded-lg transition-colors cursor-pointer"
                >
                  Batalkan Pemesanan Baru
                </button>
              )}

            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-xs text-center flex flex-col items-center justify-center h-full min-h-[350px]">
              <AlertCircle className="w-12 h-12 text-slate-300" />
              <h4 className="font-display font-bold text-lg text-slate-700 mt-4">Pilih Pesanan untuk Dilacak</h4>
              <p className="text-slate-400 text-xs mt-1 max-w-sm">
                Harap pilih salah satu pesanan di daftar sebelah kiri Anda untuk melihat rincian proses masak dan pengantaran koki.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
