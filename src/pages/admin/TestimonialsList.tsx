import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Star, Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import TestimonialForm from './TestimonialForm';

interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export default function TestimonialsList() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (data) setItems(data);
    } catch {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      await supabase.from('testimonials').delete().eq('id', id);
      setItems((prev) => prev.filter((t) => t.id !== id));
      toast.success('Testimoni berhasil dihapus');
    } catch {
      toast.error('Gagal menghapus');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const onSaved = () => { setShowForm(false); setEditId(null); load(); };

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
          <h2 className="text-2xl font-bold text-gray-900 font-display">Testimoni</h2>
          <p className="text-gray-500 text-sm">{items.length} testimoni</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
        >
          <Plus size={16} />
          Tambah Testimoni
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <TestimonialForm editId={editId} onSaved={onSaved} onCancel={() => { setShowForm(false); setEditId(null); }} />
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <Star size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Belum ada testimoni</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-4">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-red-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{t.name}</h3>
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 truncate">"{t.comment}"</p>
                <p className="text-xs text-gray-400 mt-1">{t.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setEditId(t.id); setShowForm(true); }}
                  className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-100"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => setDeleteId(t.id)}
                  className="w-9 h-9 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Hapus Testimoni</h3>
                <p className="text-sm text-gray-500">Aksi ini tidak bisa dibatalkan</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} disabled={deleting} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</button>
              <button onClick={() => handleDelete(deleteId)} disabled={deleting} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 disabled:opacity-60 flex items-center justify-center gap-2">
                {deleting ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
