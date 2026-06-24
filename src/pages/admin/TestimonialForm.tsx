import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  editId: string | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function TestimonialForm({ editId, onSaved, onCancel }: Props) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [avatar, setAvatar] = useState('');
  const [date, setDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editId) {
      setLoading(true);
      supabase.from('testimonials').select('*').eq('id', editId).single().then(({ data }) => {
        if (data) {
          setName(data.name);
          setRating(data.rating);
          setComment(data.comment);
          setAvatar(data.avatar || '');
          setDate(data.date || '');
        }
        setLoading(false);
      });
    }
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name, rating, comment, avatar, date };
      if (editId) {
        await supabase.from('testimonials').update(payload).eq('id', editId);
        toast.success('Testimoni diperbarui');
      } else {
        await supabase.from('testimonials').insert([payload]);
        toast.success('Testimoni ditambahkan');
      }
      onSaved();
    } catch {
      toast.error('Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white";
  const labelClass = "block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide";

  if (loading) {
    return <div className="flex justify-center py-8"><div className="animate-spin w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full" /></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
      <h3 className="font-bold text-gray-900">{editId ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>Nama</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>Rating (1-5)</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className={inputClass}>
            {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Bintang</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className={labelClass}>Komentar</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required rows={3} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>URL Avatar</label>
          <input value={avatar} onChange={(e) => setAvatar(e.target.value)} className={inputClass} placeholder="https://i.pravatar.cc/150?img=..." />
        </div>
        <div>
          <label className={labelClass}>Tanggal</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} placeholder="2 minggu yang lalu" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</button>
        <button type="submit" disabled={saving} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}
