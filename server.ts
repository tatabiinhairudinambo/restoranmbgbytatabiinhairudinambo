import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { MenuItem, Order } from "./src/types";

// Seed data for the menu items
const INITIAL_MENU: MenuItem[] = [
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
    id: "m6",
    name: "Siomay Kukus Istimewa",
    description: "Siomay daging ikan tenggiri asli bercita rasa gurih ditambah telur rebus manis, kol, kentang, dan tahu putih kukus, disiram bumbu kacang istimewa khas Sunda.",
    price: 18000,
    category: "cemilan",
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80",
    isPopular: false,
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
  },
  {
    id: "m8",
    name: "Es Cendol Nangka Sejuk",
    description: "Minuman tradisional segar cendol pandan suji berpadu manisnya gula kelapa murni, kuah santan kelapa gurih segar, es serut, dan cacahan buah nangka manis.",
    price: 15500,
    category: "minuman",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    isPopular: false,
    isSpicy: false
  }
];

// In-memory data store for orders
let orders: Order[] = [
  {
    id: "ORD-9821",
    customerName: "Budi Santoso",
    phoneNumber: "081234567890",
    orderType: "dine-in",
    tableNumber: "Meja 05",
    items: [
      { menuId: "m1", name: "Bakso Urat Spesial MBG", price: 28000, quantity: 2, notes: "Pedas pisah" },
      { menuId: "m7", name: "Es Teler Durian MBG", price: 20000, quantity: 1 }
    ],
    totalAmount: 76000,
    status: "preparing",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    paymentMethod: "qris",
    paymentDetails: "QRIS Nasional"
  },
  {
    id: "ORD-3290",
    customerName: "Siti Rahma",
    phoneNumber: "087788990011",
    orderType: "delivery",
    deliveryAddress: "Jl. Merdeka No. 42, Jakarta Selatan",
    items: [
      { menuId: "m2", name: "Mie Ayam Pangsit MBG", price: 22000, quantity: 2 },
      { menuId: "m8", name: "Es Cendol Nangka Sejuk", price: 15500, quantity: 2 }
    ],
    totalAmount: 75000,
    status: "delivering",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    paymentMethod: "bank_transfer",
    paymentDetails: "Transfer BCA"
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Endpoints
  // 1. Get Menu list
  app.get("/api/menu", (req, res) => {
    res.json(INITIAL_MENU);
  });

  // 2. Get Orders list
  app.get("/api/orders", (req, res) => {
    res.json(orders);
  });

  // 3. Post a new order
  app.post("/api/orders", (req, res) => {
    try {
      const { customerName, phoneNumber, orderType, tableNumber, deliveryAddress, items, totalAmount, paymentMethod, paymentDetails } = req.body;

      if (!customerName || !phoneNumber || !orderType || !items || items.length === 0) {
        res.status(400).json({ error: "Data pesanan tidak lengkap." });
        return;
      }

      const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        id: orderId,
        customerName,
        phoneNumber,
        orderType,
        tableNumber: orderType === "dine-in" ? tableNumber : undefined,
        deliveryAddress: orderType === "delivery" ? deliveryAddress : undefined,
        items,
        totalAmount,
        status: "received",
        createdAt: new Date().toISOString(),
        paymentMethod,
        paymentDetails
      };

      orders.unshift(newOrder); // Add to the top of the list
      res.status(201).json(newOrder);
    } catch (err: any) {
      res.status(500).json({ error: "Gagal memproses pesanan." });
    }
  });

  // 4. Update order status (for admin simulations/live updates)
  app.patch("/api/orders/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["received", "preparing", "delivering", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: "Status pesanan tidak valid." });
      return;
    }

    const orderIndex = orders.findIndex(o => o.id === id);
    if (orderIndex === -1) {
      res.status(404).json({ error: "Pesanan tidak ditemukan." });
      return;
    }

    orders[orderIndex].status = status;
    res.json(orders[orderIndex]);
  });

  // 5. Delete an order
  app.delete("/api/orders/:id", (req, res) => {
    const { id } = req.params;
    const initialLength = orders.length;
    orders = orders.filter(o => o.id !== id);
    if (orders.length === initialLength) {
      res.status(404).json({ error: "Pesanan tidak ditemukan." });
      return;
    }
    res.json({ message: "Pesanan berhasil dihapus." });
  });

  // Vite middleware setup or Static assets serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Restoran MBG Backend] Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Gagal menyalakan server Restoran MBG:", err);
});
