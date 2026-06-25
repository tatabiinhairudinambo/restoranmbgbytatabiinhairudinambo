import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Car, Star, MessageSquare, CalendarCheck, TrendingUp, AlertCircle, Database, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

interface Stats {
  totalCars: number;
  totalTestimonials: number;
  totalContacts: number;
  unreadContacts: number;
  totalBookings: number;
}

const seedCars = [
  { name: 'Toyota Avanza', brand: 'Toyota', year: 2024, transmission: 'Automatic', kilometer: 0, price: 350000, condition: 'Baru', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Toyota_Avanza_1.3_E_2024_%282%29.jpg/960px-Toyota_Avanza_1.3_E_2024_%282%29.jpg', featured: true, passengers: 7, features: ['AC Dingin', 'BBM Irit', '7 Penumpang'] },
  { name: 'Daihatsu Xenia', brand: 'Daihatsu', year: 2024, transmission: 'Automatic', kilometer: 0, price: 330000, condition: 'Baru', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Daihatsu_Xenia_1.3_X_pre-facelift_%28F650%29_taken_in_Bandung%2C_West_Java_40115_01.jpg/960px-Daihatsu_Xenia_1.3_X_pre-facelift_%28F650%29_taken_in_Bandung%2C_West_Java_40115_01.jpg', featured: true, passengers: 7, features: ['Ekonomis', '7 Penumpang', 'Hemat BBM'] },
  { name: 'Toyota Calya', brand: 'Toyota', year: 2024, transmission: 'Automatic', kilometer: 0, price: 300000, condition: 'Baru', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/2023_Toyota_Calya_G%2C_Tunjungan_Plaza_6%2C_Central_Surabaya.jpg/960px-2023_Toyota_Calya_G%2C_Tunjungan_Plaza_6%2C_Central_Surabaya.jpg', featured: true, passengers: 7, features: ['Compact MPV', '7 Penumpang', 'Irit Bensin'] },
  { name: 'Daihatsu Sigra', brand: 'Daihatsu', year: 2024, transmission: 'Automatic', kilometer: 0, price: 280000, condition: 'Baru', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/2022_Daihatsu_Sigra_1.2_R_%28front_right%29%2C_GIIAS%2C_Grand_City%2C_Central_Surabaya.jpg/960px-2022_Daihatsu_Sigra_1.2_R_%28front_right%29%2C_GIIAS%2C_Grand_City%2C_Central_Surabaya.jpg', featured: true, passengers: 7, features: ['LCGC Hemat', '7 Penumpang', 'Harga Terjangkau'] },
  { name: 'Toyota Alphard', brand: 'Toyota', year: 2024, transmission: 'Automatic', kilometer: 0, price: 2500000, condition: 'Baru', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/2023_Toyota_Alphard_Hybrid_%28AH40%29_2.jpg/960px-2023_Toyota_Alphard_Hybrid_%28AH40%29_2.jpg', featured: true, passengers: 7, features: ['Luxury MPV', '7 Penumpang', 'Executive Class'] },
  { name: 'Toyota Innova Zenix', brand: 'Toyota', year: 2024, transmission: 'Automatic', kilometer: 0, price: 850000, condition: 'Baru', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/2022_Toyota_Kijang_Innova_Zenix_V_%28Indonesia%29_front_view.jpg/960px-2022_Toyota_Kijang_Innova_Zenix_V_%28Indonesia%29_front_view.jpg', featured: true, passengers: 7, features: ['Hybrid Technology', '7 Penumpang', 'Premium MPV'] },
  { name: 'Toyota Fortuner', brand: 'Toyota', year: 2024, transmission: 'Automatic', kilometer: 0, price: 1250000, condition: 'Baru', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/2021_Toyota_Fortuner_2.4_VRZ_GR_Sport_4x2_GUN165R_%2820211227%29.jpg/960px-2021_Toyota_Fortuner_2.4_VRZ_GR_Sport_4x2_GUN165R_%2820211227%29.jpg', featured: true, passengers: 7, features: ['SUV Premium', '7 Penumpang', 'All Terrain'] },
  { name: 'Daihatsu Terios', brand: 'Daihatsu', year: 2024, transmission: 'Automatic', kilometer: 0, price: 550000, condition: 'Baru', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/2024_Daihatsu_Terios_X_%28cropped%29.jpg/960px-2024_Daihatsu_Terios_X_%28cropped%29.jpg', featured: true, passengers: 7, features: ['SUV Tangguh', '7 Penumpang', 'Cocok Segala Medan'] },
  { name: 'Toyota Kijang Innova', brand: 'Toyota', year: 2023, transmission: 'Automatic', kilometer: 0, price: 700000, condition: 'Baru', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/2022_Toyota_Kijang_Innova_Zenix_V_Hybrid_Modellista_%28front%29%2C_Tunjungan_Plaza%2C_Central_Surabaya.jpg/960px-2022_Toyota_Kijang_Innova_Zenix_V_Hybrid_Modellista_%28front%29%2C_Tunjungan_Plaza%2C_Central_Surabaya.jpg', featured: true, passengers: 7, features: ['MPV Legendaris', '7 Penumpang', 'Nyaman & Luas'] },
];

const seedTestimonials = [
  { name: 'Budi Santoso', rating: 5, comment: 'Pelayanan sangat memuaskan! Mobil bersih dan nyaman. Proses sewa mudah dan cepat. Highly recommended!', avatar: 'https://i.pravatar.cc/150?img=12', date: '2 minggu yang lalu' },
  { name: 'Siti Nurhaliza', rating: 5, comment: 'Sewa Innova untuk liburan keluarga. Mobil kondisi prima, driver ramah, dan harga terjangkau!', avatar: 'https://i.pravatar.cc/150?img=45', date: '1 bulan yang lalu' },
  { name: 'Ahmad Yani', rating: 5, comment: 'Harga transparan tanpa biaya tersembunyi. Proses booking cepat via WhatsApp. Puas banget!', avatar: 'https://i.pravatar.cc/150?img=33', date: '3 minggu yang lalu' },
  { name: 'Dewi Lestari', rating: 4, comment: 'Sewa Avanza untuk mudik lebaran. Kondisi mobil bagus dan pelayanan ramah. Recommended!', avatar: 'https://i.pravatar.cc/150?img=47', date: '1 minggu yang lalu' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalCars: 0,
    totalTestimonials: 0,
    totalContacts: 0,
    unreadContacts: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [connectionOk, setConnectionOk] = useState<boolean | null>(null);
  const [brandData, setBrandData] = useState<{ brand: string; count: number }[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [carsRes, testimonialsRes, contactsRes, unreadRes] = await Promise.all([
        supabase.from('cars').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('is_read', false),
      ]);

      setStats({
        totalCars: carsRes.count ?? 0,
        totalTestimonials: testimonialsRes.count ?? 0,
        totalContacts: contactsRes.count ?? 0,
        unreadContacts: unreadRes.count ?? 0,
        totalBookings: 0,
      });

      const { data: cars } = await supabase.from('cars').select('brand');
      if (cars) {
        const brandCounts: Record<string, number> = {};
        cars.forEach((c) => { brandCounts[c.brand] = (brandCounts[c.brand] || 0) + 1; });
        setBrandData(Object.entries(brandCounts).map(([brand, count]) => ({ brand, count })));
      }
      setConnectionOk(true);
    } catch {
      setConnectionOk(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const { error: carsError } = await supabase.from('cars').insert(seedCars);
      if (carsError) throw carsError;

      const { error: testError } = await supabase.from('testimonials').insert(seedTestimonials);
      if (testError) throw testError;

      toast.success('Data default berhasil diisi!');
      loadStats();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal mengisi data';
      toast.error(msg);
    } finally {
      setSeeding(false);
    }
  };

  const cards = [
    { label: 'Total Mobil', value: stats.totalCars, icon: Car, color: 'bg-blue-600' },
    { label: 'Testimoni', value: stats.totalTestimonials, icon: Star, color: 'bg-yellow-600' },
    { label: 'Pesan Masuk', value: stats.totalContacts, icon: MessageSquare, color: 'bg-green-600' },
    { label: 'Belum Dibaca', value: stats.unreadContacts, icon: AlertCircle, color: 'bg-red-600' },
    { label: 'Booking', value: stats.totalBookings, icon: CalendarCheck, color: 'bg-purple-600' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-display">Dashboard</h2>
        <p className="text-gray-500 text-sm">Overview data armada rental Anda</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon size={18} className="text-white" />
              </div>
              <TrendingUp size={16} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      {brandData.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Armada per Merek</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="brand" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#dc2626" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {connectionOk === false && (
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mt-6 text-center">
          <AlertCircle size={32} className="text-red-500 mx-auto mb-3" />
          <p className="text-red-800 text-sm font-medium mb-2">
            Gagal terhubung ke Supabase!
          </p>
          <p className="text-red-600 text-xs">
            Pastikan tabel sudah dibuat (jalankan SQL migration di Supabase dashboard) dan environment variable VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY sudah benar.
          </p>
        </div>
      )}

      {connectionOk === true && stats.totalCars === 0 && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 mt-6 text-center">
          <Database size={32} className="text-yellow-500 mx-auto mb-3" />
          <p className="text-yellow-800 text-sm font-medium mb-4">
            Database masih kosong. Klik tombol di bawah untuk mengisi data default (9 mobil + 4 testimoni).
          </p>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-60 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all"
          >
            {seeding ? <Loader2 size={16} className="animate-spin" /> : <Database size={16} />}
            {seeding ? 'Mengisi data...' : 'Isi Data Default'}
          </button>
        </div>
      )}
    </div>
  );
}
