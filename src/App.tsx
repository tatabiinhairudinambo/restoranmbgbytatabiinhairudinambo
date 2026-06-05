/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuCard from "./components/MenuCard";
import CartModal from "./components/CartModal";
import OrderTracker from "./components/OrderTracker";
import AdminPanel from "./components/AdminPanel";
import { MenuItem, CartItem, Order } from "./types";
import { Search, MapPin, Clock, ShieldAlert, Sparkles, SlidersHorizontal, ArrowUpRight } from "lucide-react";

// Static menus backup for extreme robustness
const BACKUP_MENU: MenuItem[] = [
  {
    id: "m1",
    name: "Bakso Urat Spesial MBG",
    description: "Bakso urat sapi premium ukuran besar dengan kuah kaldu sapi asli yang gurih, disajikan dengan mie kuning, bihun, tahu baso, kuah segar, taburan seledri dan bawang goreng.",
    price: 28000,
    category: "bakso-mie",
    image: "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    isSpicy: false
  },
  {
    id: "m2",
    name: "Mie Ayam Pangsit MBG",
    description: "Mie kuning kenyal khas Restoran MBG ditaburi daging ayam kecap gurih manis homemade, disajikan bersama sawi hijau segar dan pangsit basah berisi adonan ayam.",
    price: 22000,
    category: "bakso-mie",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    isSpicy: false
  },
  {
    id: "m3",
    name: "Nasi Goreng Gila MBG",
    description: "Nasi goreng beraroma bumbu rempah khas dapur MBG dipadukan dengan tumisan pelengkap (sosis ayam, bakso sapi premium, telur orak-arik, sayuran segar, rasa pedas manis).",
    price: 25000,
    category: "nasi",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    isSpicy: true
  },
  {
    id: "m4",
    name: "Nasi Timbel Komplet MBG",
    description: "Nasi hangat gurih bungkus daun pisang, disajikan dengan ayam goreng bumbu kuning wangi, tahu tempe goreng, lalapan segar, sayur asem hangat, dan sambal terasi khas Sunda.",
    price: 35000,
    category: "nasi",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    isPopular: false,
    isSpicy: false
  },
  {
    id: "m5",
    name: "Batagor Bandung Renyah",
    description: "Bakwan tahu goreng khas Sunda dan siomay renyah premium disiram dengan saus kacang giling tradisional beraroma kencur, siraman kecap manis, dan perasan jeruk limau.",
    price: 18000,
    category: "cemilan",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    isSpicy: false
  },
  {
    id: "m7",
    name: "Es Teler Durian MBG",
    description: "Es serut salju bercampur kelapa muda, potongan buah alpukat mentega, nangka manis, sirup kelapa manis wangi, kental manis, ditambah buah durian matang lezat.",
    price: 20000,
    category: "minuman",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80",
    isPopular: true,
    isSpicy: false
  }
];

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(BACKUP_MENU);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("mbg_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeSection, setActiveSection] = useState<'menu' | 'orders' | 'admin'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isServerHealthy, setIsServerHealthy] = useState(true);

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("mbg_cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch Menu first time
  const fetchMenu = async () => {
    try {
      const res = await fetch("/api/menu");
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
        setIsServerHealthy(true);
      }
    } catch (err) {
      console.warn("Koneksi server gagal, menggunakan data menu cadangan offline.");
      setIsServerHealthy(false);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Gagal mengambil log pesanan dari server:", err);
    }
  };

  // Poll orders status updates every 10 seconds to make it highly reactive
  useEffect(() => {
    fetchMenu();
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Menu filter logic
  const filteredMenu = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handler: Add item to cart
  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      // Find item with same menuId
      const existing = prevCart.find((c) => c.menuId === item.id);
      if (existing) {
        return prevCart.map((c) =>
          c.menuId === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        const newCartItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          menuId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          notes: "",
        };
        return [...prevCart, newCartItem];
      }
    });

    // Pulse feedback
    const cartBtn = document.getElementById("cart-button");
    if (cartBtn) {
      cartBtn.classList.add("scale-105", "bg-amber-100");
      setTimeout(() => {
        cartBtn.classList.remove("scale-105", "bg-amber-100");
      }, 300);
    }
  };

  // Handler: Update quantity
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((c) => {
          if (c.id === cartId) {
            const nextQty = c.quantity + delta;
            return { ...c, quantity: nextQty };
          }
          return c;
        })
        .filter((c) => c.quantity > 0)
    );
  };

  // Handler: Update notes
  const handleUpdateNotes = (cartId: string, notes: string) => {
    setCart((prevCart) =>
      prevCart.map((c) => (c.id === cartId ? { ...c, notes } : c))
    );
  };

  // Handler: Remove item
  const handleRemoveItem = (cartId: string) => {
    setCart((prevCart) => prevCart.filter((c) => c.id !== cartId));
  };

  // Handler: Submit Order
  const handleSubmitOrder = async (details: {
    customerName: string;
    phoneNumber: string;
    orderType: "dine-in" | "delivery";
    tableNumber?: string;
    deliveryAddress?: string;
    paymentMethod?: "qris" | "bank_transfer" | "ewallet";
    paymentDetails?: string;
  }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.1);
    const deliveryFee = details.orderType === "delivery" ? 10000 : 0;
    const totalAmount = subtotal + tax + deliveryFee;

    const payload = {
      customerName: details.customerName,
      phoneNumber: details.phoneNumber,
      orderType: details.orderType,
      tableNumber: details.tableNumber,
      deliveryAddress: details.deliveryAddress,
      paymentMethod: details.paymentMethod,
      paymentDetails: details.paymentDetails,
      items: cart.map((c) => ({
        menuId: c.menuId,
        name: c.name,
        price: c.price,
        quantity: c.quantity,
        notes: c.notes || undefined,
      })),
      totalAmount,
    };

    // Send payload to REST API
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }

    // Success: clear cart local & fetch latest list
    setCart([]);
    await fetchOrders();
    // Redirect to orders view immediately
    setTimeout(() => {
      setActiveSection("orders");
    }, 100);
  };

  // Admin and test controls: Update status
  const handleUpdateOrderStatus = async (id: string, status: Order["status"]) => {
    try {
      const response = await fetch(`/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        // Redraw list local
        await fetchOrders();
      }
    } catch (err) {
      console.error("Gagal mengubah status di server:", err);
    }
  };

  // Admin control: Cancel/Delete order
  const handleDeleteOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchOrders();
      }
    } catch (err) {
      console.error("Gagal menghapus pesanan di server:", err);
    }
  };

  // Active items sum
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Header Utilities Alerts */}
      {!isServerHealthy && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Mode Offline Terdeteksi. Sistem menggunakan data lokal yang tetap responsif sepenuhnya.</span>
        </div>
      )}

      {/* Main navigation Header */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onChangeSection={(sec) => {
          setActiveSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Body viewports */}
      <main className="flex-grow pb-16">
        {activeSection === "menu" && (
          <div className="transition-all duration-300">
            {/* Display banner hero */}
            <Hero onExploreMenu={() => {
              const el = document.getElementById("explore-menu-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }} />

            {/* Menu Exploration Core Workspace */}
            <div id="explore-menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
              {/* Header Title & Subtitle */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-100 uppercase tracking-widest">
                    <Sparkles className="w-3 h-3 text-amber-500fill-amber-505" />
                    PILIHAN TERBAIK INDONESIA
                  </div>
                  <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight mt-1">
                    Jelajahi Menu Dapur MBG
                  </h2>
                  <p className="mt-1 text-slate-500 font-sans text-xs">
                    Mulai petualangan kulinermu hari ini dengan cita rasa otentik bumbu warisan kami.
                  </p>
                </div>

                {/* Live Menu stats */}
                <div className="flex items-center gap-4 text-xs text-slate-400 bg-white border border-slate-100 px-4 py-2.5 rounded-2xl self-start md:self-auto">
                  <div className="flex items-center gap-1.5 border-r border-slate-100 pr-3">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Saji dalam <span className="font-bold text-slate-800">15-25 mnt</span></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Cileungsi, Kab. Bogor</span>
                  </div>
                </div>
              </div>

              {/* Filtering Controls Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-100">
                {/* Categories */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                  {[
                    { key: "all", label: "Semua Menu" },
                    { key: "bakso-mie", label: "Bakso & Mie" },
                    { key: "nasi", label: "Nasi Nusantara" },
                    { key: "cemilan", label: "Cemilan Enak" },
                    { key: "minuman", label: "Minuman Segar" }
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`whitespace-nowrap font-sans font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer ${
                        selectedCategory === cat.key
                          ? "bg-amber-500 text-slate-950 shadow-xs"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Live Search menu box */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari makanan & minuman favorit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Menu Grid results */}
              {filteredMenu.length === 0 ? (
                <div className="bg-white rounded-3xl py-16 text-center border border-slate-100 max-w-xl mx-auto mt-12 shadow-xs">
                  <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="font-display font-bold text-lg text-slate-800 mt-4">Menu Tidak Ditemukan</h4>
                  <p className="text-slate-400 text-xs mt-1 px-4">
                    Mohon maaf, menu '{searchQuery}' saat ini belum tersedia di kategori ini. Silakan cari kata kunci populer lain seperti "Bakso", "Kopi", "Nasi", atau pilih kategori lainnya.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="mt-6 bg-amber-50 text-amber-700 hover:bg-amber-100 font-sans font-semibold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMenu.map((item) => {
                    const matchedCartItem = cart.find((c) => c.menuId === item.id);
                    return (
                      <MenuCard
                        key={item.id}
                        item={item}
                        onAddToCart={handleAddToCart}
                        quantityInCart={matchedCartItem ? matchedCartItem.quantity : 0}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === "orders" && (
          <OrderTracker 
            orders={orders} 
            onCancelOrder={(id) => handleUpdateOrderStatus(id, "cancelled")} 
          />
        )}

        {activeSection === "admin" && (
          <AdminPanel
            orders={orders}
            onUpdateStatus={handleUpdateOrderStatus}
            onDeleteOrder={handleDeleteOrder}
          />
        )}
      </main>

      {/* Slide-over interactive Drawer for checkout */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateNotes={handleUpdateNotes}
        onRemoveItem={handleRemoveItem}
        onSubmitOrder={handleSubmitOrder}
      />

      {/* Simple dynamic and minimalist footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-850 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display font-bold text-lg text-white">Restoran MBG</p>
              <p className="text-xs text-slate-500 mt-1">© 2026 Restoran MBG - grand mutiara 2 cileungsi b1/01 jawa barat kab bogor. Terbuka setiap hari untuk memanjakan lidah Anda.</p>
              <p className="text-xs text-slate-500 font-medium mt-1.5 border-t border-slate-800/60 pt-1">Dibuat oleh <span className="text-amber-400 font-semibold text-[13px]">Tatabiin Hairudin Ambo</span> • Telp: <span className="text-slate-400 font-mono text-xs select-all">082213840415</span></p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <button onClick={() => { setActiveSection("menu"); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition-colors cursor-pointer">Menu Pilihan</button>
              <button onClick={() => { setActiveSection("orders"); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition-colors cursor-pointer">Lacak Pesanan</button>
              <button onClick={() => { setActiveSection("admin"); window.scrollTo({top:0, behavior:'smooth'}); }} className="hover:text-white transition-colors cursor-pointer text-emerald-400">Simulasikan Admin Dapur</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
