import React, { useState } from "react";
import { ShoppingBag, X, Trash2, MapPin, Table, Phone, User, Notebook, ArrowRight, Loader2, CheckCircle, QrCode, CreditCard, Wallet, Copy, Check } from "lucide-react";
import { CartItem } from "../types";
import { formatRupiah } from "../utils";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onUpdateNotes: (cartId: string, notes: string) => void;
  onRemoveItem: (cartId: string) => void;
  onSubmitOrder: (orderDetails: {
    customerName: string;
    phoneNumber: string;
    orderType: "dine-in" | "delivery";
    tableNumber?: string;
    deliveryAddress?: string;
    paymentMethod?: "qris" | "bank_transfer" | "ewallet";
    paymentDetails?: string;
  }) => Promise<void>;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onUpdateNotes,
  onRemoveItem,
  onSubmitOrder,
}: CartModalProps) {
  const [orderType, setOrderType] = useState<"dine-in" | "delivery">("dine-in");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "bank_transfer" | "ewallet">("qris");
  const [selectedBank, setSelectedBank] = useState<"bca" | "mandiri">("bca");
  const [selectedEwallet, setSelectedEwallet] = useState<"gopay" | "ovo" | "dana">("gopay");
  const [ewalletPhone, setEwalletPhone] = useState("");
  const [copiedText, setCopiedText] = useState(false);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedText(true);
    setTimeout(() => {
      setCopiedText(false);
    }, 1500);
  };

  if (!isOpen) return null;

  // Calculators
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.1); // PB1 10%
  const deliveryFee = orderType === "delivery" ? 10000 : 0;
  const total = subtotal + tax + deliveryFee;

  // Forms validations & submit
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("Silakan masukkan nama Anda.");
      return;
    }
    if (!phoneNumber.trim()) {
      alert("Silakan masukkan nomor telepon/WhatsApp Anda.");
      return;
    }
    if (orderType === "dine-in" && !tableNumber.trim()) {
      alert("Silakan masukkan nomor meja Anda.");
      return;
    }
    if (orderType === "delivery" && !deliveryAddress.trim()) {
      alert("Silakan masukkan alamat lengkap pengiriman.");
      return;
    }

    setIsSubmitting(true);
    try {
      const details = paymentMethod === "qris" 
        ? "QRIS Nasional" 
        : paymentMethod === "bank_transfer" 
          ? `Transfer ${selectedBank.toUpperCase()}` 
          : `${selectedEwallet.toUpperCase()} (${ewalletPhone.trim() || phoneNumber})`;

      await onSubmitOrder({
        customerName,
        phoneNumber,
        orderType,
        tableNumber: orderType === "dine-in" ? tableNumber : undefined,
        deliveryAddress: orderType === "delivery" ? deliveryAddress : undefined,
        paymentMethod,
        paymentDetails: details,
      });
      setCheckoutSuccess("ORD-SUCCESS");
      // Reset status on success
      setTimeout(() => {
        setCheckoutSuccess(null);
        setCustomerName("");
        setPhoneNumber("");
        setTableNumber("");
        setDeliveryAddress("");
        onClose();
      }, 2500);
    } catch (err) {
      alert("Gagal mengirim pesanan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md transform transition-all">
          <div className="h-full flex flex-col bg-white shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-display font-bold text-slate-900">Detail Keranjang</h2>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Container */}
            {checkoutSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-amber-50/20">
                <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full animate-bounce">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900 mt-6">Pesanan Diterima!</h3>
                <p className="mt-2 text-slate-600 text-sm max-w-xs">
                  Terima kasih, pesanan Anda berhasil dibuat dan sedang diproses oleh tim Restoran MBG. Silakan beralih ke halaman Lacak Pesanan.
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="bg-amber-50 text-amber-500 p-5 rounded-full mb-4">
                  <ShoppingBag className="w-12 h-12" />
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-800">Keranjang Masih Kosong</h3>
                <p className="text-slate-400 text-xs mt-1 max-w-xs">
                  Jelajahi menu lezat kami dan tambahkan hidangan favorit Anda ke keranjang.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-amber-500 text-slate-950 px-5 py-2.5 rounded-xl font-sans font-semibold text-xs hover:bg-amber-400 transition-colors cursor-pointer shadow-xs"
                >
                  Lihat Menu Makanan
                </button>
              </div>
            ) : (
              <>
                {/* List Items (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-4 bg-slate-50 border border-slate-100 rounded-xl relative group flex flex-col gap-3"
                    >
                      {/* Name & price */}
                      <div className="flex justify-between items-start pr-6">
                        <div>
                          <h4 className="font-sans font-bold text-sm text-slate-900">{item.name}</h4>
                          <p className="text-xs text-slate-400 font-semibold mt-0.5">{formatRupiah(item.price)}</p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer absolute top-3 right-3"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity & Notes line */}
                      <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/50">
                        {/* Selector control */}
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Jumlah</span>
                          <div className="flex items-center gap-2 border border-slate-200 bg-white rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-md cursor-pointer font-bold text-sm"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold text-slate-800 w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-100 rounded-md cursor-pointer font-bold text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Optional notes section */}
                        <div className="mt-1 flex items-center gap-1.5 bg-white border border-slate-150 px-2.5 py-1.5 rounded-lg">
                          <Notebook className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <input
                            type="text"
                            placeholder="Catatan porsi (contoh: minta kuah pisah...)"
                            value={item.notes}
                            onChange={(e) => onUpdateNotes(item.id, e.target.value)}
                            className="bg-transparent border-none outline-hidden text-xs text-slate-600 placeholder-slate-400 w-full p-0 leading-tight focus:ring-0"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Checkout Form embedded inside the workflow */}
                  <form onSubmit={handleCheckout} className="border-t border-slate-150 pt-6 mt-6 space-y-4">
                    <h3 className="font-display font-bold text-base text-slate-900 border-b border-amber-100 pb-2">
                      Informasi Pemesanan
                    </h3>

                    {/* Choose Order Type */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tipe Pesanan</label>
                      <div className="grid grid-cols-2 gap-2 bg-slate-100 p-0.5 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setOrderType("dine-in")}
                          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            orderType === "dine-in"
                              ? "bg-white text-amber-700 shadow-xs"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          <Table className="w-3.5 h-3.5" />
                          Makan di Sini
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderType("delivery")}
                          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            orderType === "delivery"
                              ? "bg-white text-amber-700 shadow-xs"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          Kirim / Delivery
                        </button>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Nama Pemesan</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Ahmad"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">No. WhatsApp</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            required
                            placeholder="Contoh: 0812XXXXXXXX"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {orderType === "dine-in" ? (
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Nomor Meja</label>
                          <div className="relative">
                            <Table className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              required={orderType === "dine-in"}
                              placeholder="Contoh: Meja 05"
                              value={tableNumber}
                              onChange={(e) => setTableNumber(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Alamat Lengkap Pengiriman</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                            <textarea
                              required={orderType === "delivery"}
                              placeholder="Contoh: Jl. Mangga No. 34 RT 02/05, Kelurahan Senayan, Jakarta Selatan"
                              value={deliveryAddress}
                              onChange={(e) => setDeliveryAddress(e.target.value)}
                              rows={3}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Section: PILIHAN METODE PEMBAYARAN */}
                    <div className="border-t border-slate-100 pt-5 mt-4 space-y-3">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-display">
                        Pilih Metode Pembayaran
                      </label>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {/* QRIS */}
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("qris")}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer text-center gap-1 ${
                            paymentMethod === "qris"
                              ? "bg-amber-500/10 border-amber-500 text-amber-700 font-bold"
                              : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                          }`}
                        >
                          <QrCode className="w-5 h-5 shrink-0 text-amber-500" />
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider">QRIS</span>
                        </button>

                        {/* BANK TRANSFER */}
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("bank_transfer")}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer text-center gap-1 ${
                            paymentMethod === "bank_transfer"
                              ? "bg-amber-500/10 border-amber-500 text-amber-700 font-bold"
                              : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                          }`}
                        >
                          <CreditCard className="w-5 h-5 shrink-0 text-amber-500" />
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider">TRANSFER</span>
                        </button>

                        {/* E-WALLET */}
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("ewallet")}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer text-center gap-1 ${
                            paymentMethod === "ewallet"
                              ? "bg-amber-500/10 border-amber-500 text-amber-700 font-bold"
                              : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                          }`}
                        >
                          <Wallet className="w-5 h-5 shrink-0 text-amber-500" />
                          <span className="text-[10px] font-sans font-bold uppercase tracking-wider">E-WALLET</span>
                        </button>
                      </div>

                      {/* Payment Detail Details Renderer */}
                      <div className="mt-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                        {paymentMethod === "qris" && (
                          <div className="flex flex-col items-center space-y-3">
                            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col items-center max-w-[200px]">
                              <div className="text-[9px] font-bold tracking-widest bg-amber-500 text-slate-950 w-full text-center py-0.5 rounded-sm mb-2 font-display">
                                QRIS NASIONAL
                              </div>
                              <div className="relative w-32 h-32 bg-slate-900 flex flex-wrap p-1 rounded-md justify-around items-center">
                                {/* Top-left marker */}
                                <div className="absolute top-1.5 left-1.5 w-8 h-8 bg-white border-4 border-slate-900 rounded-sm flex items-center justify-center">
                                  <div className="w-2.5 h-2.5 bg-slate-900"></div>
                                </div>
                                {/* Top-right marker */}
                                <div className="absolute top-1.5 right-1.5 w-8 h-8 bg-white border-4 border-slate-900 rounded-sm flex items-center justify-center">
                                  <div className="w-2.5 h-2.5 bg-slate-900"></div>
                                </div>
                                {/* Bottom-left marker */}
                                <div className="absolute bottom-1.5 left-1.5 w-8 h-8 bg-white border-4 border-slate-900 rounded-sm flex items-center justify-center">
                                  <div className="w-2.5 h-2.5 bg-slate-900"></div>
                                </div>
                                {/* Pixels pattern */}
                                <div className="w-20 h-20 grid grid-cols-6 gap-0.5 opacity-90 mt-6 ml-6">
                                  {Array.from({ length: 36 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-full h-full rounded-[1px] ${
                                        (i % 3 === 0 || i % 7 === 1 || i % 4 === 2 || i === 15 || i === 22) && i < 30
                                          ? "bg-white"
                                          : "bg-slate-950"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="text-[7px] text-slate-400 mt-2 font-sans font-extrabold tracking-widest text-center uppercase">
                                GPN • MBG RESTO DIGIPAY
                              </div>
                            </div>
                            <p className="text-center text-xs text-slate-500 max-w-xs leading-relaxed">
                              Pindai QRIS di atas lewat GoPay, OVO, Dana, atau m-Banking Anda sebesar <span className="font-bold text-amber-600 block text-sm mt-0.5">{formatRupiah(total)}</span>
                            </p>
                          </div>
                        )}

                        {paymentMethod === "bank_transfer" && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-0.5 rounded-lg">
                              <button
                                type="button"
                                onClick={() => setSelectedBank("bca")}
                                className={`py-1 rounded-md text-[11px] font-semibold text-center transition-all cursor-pointer ${
                                  selectedBank === "bca"
                                    ? "bg-white text-slate-900 shadow-xs"
                                    : "text-slate-500 hover:text-slate-850"
                                }`}
                              >
                                Bank BCA
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedBank("mandiri")}
                                className={`py-1 rounded-md text-[11px] font-semibold text-center transition-all cursor-pointer ${
                                  selectedBank === "mandiri"
                                    ? "bg-white text-slate-900 shadow-xs"
                                    : "text-slate-500 hover:text-slate-850"
                                }`}
                              >
                                Bank Mandiri
                              </button>
                            </div>

                            <div className="bg-white p-3 rounded-xl border border-slate-150 relative space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">No. Rekening</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(selectedBank === "bca" ? "428198273" : "167000827392")}
                                  className="text-[10px] text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1 cursor-pointer bg-amber-50 px-2 py-1 rounded-lg hover:bg-amber-100"
                                >
                                  {copiedText ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-600">Tersalin</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Salin</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <p className="font-mono font-extrabold text-slate-900 text-base">
                                {selectedBank === "bca" ? "428-198-273" : "167-00-08273-92"}
                              </p>
                              <div>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Penerima</span>
                                <p className="text-xs font-bold text-slate-800 uppercase">PT MBG GELORA KULINER</p>
                              </div>
                            </div>
                            <p className="text-[10px] text-slate-400 text-center italic">
                              Transfer tepat sebesar jumlah tagihan. Pembayaran akan terkonfirmasi terpadu secara instan.
                            </p>
                          </div>
                        )}

                        {paymentMethod === "ewallet" && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-0.5 rounded-lg">
                              {["gopay", "ovo", "dana"].map((wal) => (
                                <button
                                  key={wal}
                                  type="button"
                                  onClick={() => setSelectedEwallet(wal as any)}
                                  className={`py-1 rounded-md text-[11px] font-bold text-center capitalize transition-all cursor-pointer ${
                                    selectedEwallet === wal
                                      ? "bg-white text-slate-900 shadow-xs font-black"
                                      : "text-slate-500 hover:text-slate-800"
                                  }`}
                                >
                                  {wal}
                                </button>
                              ))}
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <label className="text-[11px] font-medium text-slate-600">No. HP Terdaftar</label>
                                <button
                                  type="button"
                                  onClick={() => setEwalletPhone(phoneNumber)}
                                  className="text-[10px] text-amber-700 font-semibold underline hover:text-amber-800"
                                >
                                  Salin dari Kontak
                                </button>
                              </div>
                              <div className="relative">
                                <Phone className="absolute left-3 top-2 w-4 h-4 text-slate-400" />
                                <input
                                  type="tel"
                                  placeholder="Contoh: 0812XXXXXXXX"
                                  value={ewalletPhone}
                                  onChange={(e) => setEwalletPhone(e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                                />
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                                Permintaan pembayaran akan langsung dikirimkan ke aplikasi <span className="capitalize font-bold text-slate-700">{selectedEwallet}</span> di ponsel Anda.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>

                {/* Sticky Summary & Action Footer */}
                <div className="px-6 py-5 bg-slate-50 border-t border-slate-150 space-y-4">
                  <div className="space-y-1.5 text-xs text-slate-500">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-slate-800">{formatRupiah(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pajak Restoran (PB1 10%)</span>
                      <span className="font-medium text-slate-800">{formatRupiah(tax)}</span>
                    </div>
                    {orderType === "delivery" && (
                      <div className="flex justify-between">
                        <span>Ongkos Kirim (Flat)</span>
                        <span className="font-medium text-slate-800">{formatRupiah(deliveryFee)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-slate-200 pt-2 text-sm">
                      <span className="font-bold text-slate-950">Total Tagihan</span>
                      <span className="font-bold text-amber-600 text-base">{formatRupiah(total)}</span>
                    </div>
                  </div>

                  {/* Submit Trigger */}
                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 disabled:bg-amber-200 font-sans font-bold text-sm px-4 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengirim Pesanan...</span>
                      </>
                    ) : (
                      <>
                        <span>Pesan & Kirim Sekarang</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
