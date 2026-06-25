import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Tag, Edit2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface CarItem {
  id: string;
  name: string;
  brand: string;
  year: number;
  transmission: string;
  price: number;
  passengers: number;
  image: string;
}

export default function Prices() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const { data } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
      if (data) setCars(data);
    } catch {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (p: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

  const filtered = cars.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.brand.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-display">Daftar Harga Rental</h2>
          <p className="text-gray-500 text-sm">{cars.length} armada — harga per hari</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari mobil..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none text-sm bg-white focus:ring-2 focus:ring-red-500 transition-all"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <Tag size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Belum ada data armada</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">#</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Mobil</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Merek</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Tahun</th>
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Transmisi</th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-500">Harga/Hari</th>
                <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((car, i) => (
                <tr key={car.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-5 py-4 text-gray-400 text-sm font-mono">{String(i + 1).padStart(2, '0')}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">{car.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-sm">{car.brand}</td>
                  <td className="px-5 py-4 text-gray-600 text-sm">{car.year}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">{car.transmission}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-lg font-bold text-red-600 font-display">{formatPrice(car.price)}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Link
                      to={`/admin/cars/${car.id}/edit`}
                      className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      <Edit2 size={13} />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
