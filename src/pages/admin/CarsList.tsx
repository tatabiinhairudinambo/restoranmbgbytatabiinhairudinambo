import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Car, Plus, Edit2, Trash2, Search, AlertTriangle, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface CarItem {
  id: string;
  name: string;
  brand: string;
  year: number;
  transmission: string;
  price: number;
  condition: string;
  image: string;
  featured: boolean;
  passengers: number;
}

export default function CarsList() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { loadCars(); }, []);

  const loadCars = async () => {
    try {
      const { data } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
      if (data) setCars(data);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;
      setCars((prev) => prev.filter((c) => c.id !== id));
      toast.success('Mobil berhasil dihapus');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Gagal menghapus');
    } finally {
      setDeleting(false);
      setDeleteId(null);
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
          <h2 className="text-2xl font-bold text-gray-900 font-display">Kelola Mobil</h2>
          <p className="text-gray-500 text-sm">{cars.length} armada terdaftar</p>
        </div>
        <Link
          to="/admin/cars/new"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
        >
          <Plus size={16} />
          Tambah Mobil
        </Link>
      </div>

      {/* Search */}
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
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">Belum ada data mobil</p>
          <Link to="/admin/cars/new" className="text-red-600 text-sm font-semibold hover:underline mt-2 inline-block">
            Tambah mobil pertama
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-4">
              <img src={car.image} alt={car.name} className="w-20 h-16 object-cover rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 truncate">{car.name}</h3>
                  {car.featured && <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Populer</span>}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{car.brand} {car.year}</span>
                  <span className="w-px h-3 bg-gray-200" />
                  <span>{car.transmission}</span>
                  <span className="w-px h-3 bg-gray-200" />
                  <span>{car.passengers} penumpang</span>
                  <span className="w-px h-3 bg-gray-200" />
                  <span className="font-semibold text-red-600">{formatPrice(car.price)}/hari</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/cars/${car.id}/edit`}
                  className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-all"
                >
                  <Edit2 size={15} />
                </Link>
                <button
                  onClick={() => setDeleteId(car.id)}
                  className="w-9 h-9 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition-all"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Hapus Mobil</h3>
                <p className="text-sm text-gray-500">Aksi ini tidak bisa dibatalkan</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
              >
                {deleting ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
