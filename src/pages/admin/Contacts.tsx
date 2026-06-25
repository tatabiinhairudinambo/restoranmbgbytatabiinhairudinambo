import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { MessageSquare, Mail, Phone, CheckCheck, Trash2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactItem {
  id: string;
  name: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
      if (data) setContacts(data);
    } catch {
      toast.error('Gagal memuat pesan');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    await supabase.from('contacts').update({ is_read: true }).eq('id', id);
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, is_read: true } : c)));
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from('contacts').delete().eq('id', id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast.success('Pesan dihapus');
      if (selected?.id === id) setSelected(null);
    } catch {
      toast.error('Gagal menghapus');
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const unread = contacts.filter((c) => !c.is_read).length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 font-display">Pesan Masuk</h2>
        <p className="text-gray-500 text-xs lg:text-sm">
          {contacts.length} pesan{unread > 0 && `, ${unread} belum dibaca`}
        </p>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <MessageSquare size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Belum ada pesan masuk</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
          {/* List */}
          <div className="space-y-2 lg:space-y-3">
            {contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => { setSelected(c); if (!c.is_read) markAsRead(c.id); }}
                className={`w-full text-left bg-white rounded-2xl border p-3 lg:p-4 shadow-sm hover:shadow-md transition-all ${
                  selected?.id === c.id ? 'border-red-200 ring-2 ring-red-100' : 'border-gray-100'
                } ${!c.is_read ? 'border-l-4 border-l-red-500' : ''}`}
              >
                <div className="flex items-center justify-between mb-0.5 lg:mb-1">
                  <h3 className={`text-xs lg:text-sm ${!c.is_read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                    {c.name}
                  </h3>
                  <span className="text-[9px] lg:text-[10px] text-gray-400 flex-shrink-0 ml-2">
                    {new Date(c.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="text-[11px] lg:text-xs text-gray-500 truncate">{c.message}</p>
                <div className="flex items-center gap-1 mt-1.5 lg:mt-2">
                  <Phone size={10} className="lg:size-[11px] text-gray-400" />
                  <span className="text-[10px] lg:text-[11px] text-gray-400">{c.phone}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 lg:p-6 shadow-sm">
            {selected ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Detail Pesan</h3>
                  <div className="flex items-center gap-2">
                    {!selected.is_read && (
                      <button onClick={() => markAsRead(selected.id)} className="text-xs text-blue-600 hover:underline font-medium flex items-center gap-1">
                        <CheckCheck size={14} /> Tandai dibaca
                      </button>
                    )}
                    <button onClick={() => setDeleteId(selected.id)} className="text-xs text-red-600 hover:underline font-medium">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                      <Mail size={16} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Nama</p>
                      <p className="font-semibold text-gray-900 text-sm">{selected.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      <Phone size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">No. WhatsApp</p>
                      <p className="font-semibold text-gray-900 text-sm">{selected.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Pesan</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-xl leading-relaxed">
                      {selected.message}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <a
                      href={`https://wa.me/${selected.phone.replace(/^0/, '62')}?text=${encodeURIComponent(`Halo ${selected.name}, saya balas pesan Anda...`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-bold text-center transition-all"
                    >
                      Balas via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <MessageSquare size={32} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">Pilih pesan untuk melihat detail</p>
              </div>
            )}
          </div>
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
                <h3 className="font-bold text-gray-900">Hapus Pesan</h3>
                <p className="text-sm text-gray-500">Aksi ini tidak bisa dibatalkan</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
