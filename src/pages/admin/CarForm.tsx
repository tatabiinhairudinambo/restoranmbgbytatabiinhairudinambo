import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const brands = ['Toyota', 'Daihatsu', 'Honda', 'Mitsubishi', 'Suzuki', 'Nissan', 'BMW', 'Mercedes'];
const transmissions = ['Manual', 'Automatic'] as const;
const conditions = ['Bekas', 'Baru'] as const;

interface FormData {
  name: string;
  brand: string;
  year: number;
  transmission: string;
  kilometer: number;
  price: number;
  condition: string;
  image: string;
  featured: boolean;
  passengers: number;
  features: string;
}

const emptyForm: FormData = {
  name: '',
  brand: 'Toyota',
  year: new Date().getFullYear(),
  transmission: 'Automatic',
  kilometer: 0,
  price: 0,
  condition: 'Baru',
  image: '',
  featured: false,
  passengers: 4,
  features: '',
};

export default function CarForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (id) {
      supabase.from('cars').select('*').eq('id', id).single().then(({ data, error }) => {
        if (error || !data) {
          toast.error('Data tidak ditemukan');
          navigate('/admin/cars');
          return;
        }
        setForm({
          name: data.name,
          brand: data.brand,
          year: data.year,
          transmission: data.transmission,
          kilometer: data.kilometer,
          price: data.price,
          condition: data.condition,
          image: data.image,
          featured: data.featured,
          passengers: data.passengers,
          features: (data.features as string[])?.join('\n') || '',
        });
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price),
      year: Number(form.year),
      kilometer: Number(form.kilometer),
      passengers: Number(form.passengers),
      features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
    };

    try {
      if (isEdit) {
        const { error } = await supabase.from('cars').update(payload).eq('id', id);
        if (error) throw error;
        toast.success('Mobil berhasil diperbarui');
      } else {
        const { error } = await supabase.from('cars').insert([payload]);
        if (error) throw error;
        toast.success('Mobil berhasil ditambahkan');
      }
      navigate('/admin/cars');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan data';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl outline-none text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white";
  const labelClass = "block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate('/admin/cars')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-medium mb-6 transition-all">
        <ArrowLeft size={16} />
        Kembali
      </button>

      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">
          {isEdit ? 'Edit Mobil' : 'Tambah Mobil Baru'}
        </h2>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className={labelClass}>Nama Mobil</label>
              <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Contoh: Toyota Avanza" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className={labelClass}>Merek</label>
              <select name="brand" value={form.brand} onChange={handleChange} className={inputClass}>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Tahun</label>
              <input type="number" name="year" value={form.year} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Transmisi</label>
              <select name="transmission" value={form.transmission} onChange={handleChange} className={inputClass}>
                {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Kilometer</label>
              <input type="number" name="kilometer" value={form.kilometer} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Penumpang</label>
              <input type="number" name="passengers" value={form.passengers} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className={labelClass}>Harga / Hari (Rp)</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className={labelClass}>Kondisi</label>
              <select name="condition" value={form.condition} onChange={handleChange} className={inputClass}>
                {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={labelClass}>URL Gambar</label>
              <input name="image" value={form.image} onChange={handleChange} required className={inputClass} placeholder="https://upload.wikimedia.org/..." />
              {form.image && (
                <img src={form.image} alt="Preview" className="mt-2 h-24 w-40 object-cover rounded-xl border border-gray-100" />
              )}
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Fitur (1 baris per fitur)</label>
              <textarea
                name="features"
                value={form.features}
                onChange={handleChange}
                rows={4}
                className={inputClass}
                placeholder="AC Dingin&#10;7 Penumpang&#10;BBM Irit"
              />
            </div>
            <div className="col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                <span className="text-sm font-medium text-gray-700">Tandai sebagai Populer</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/admin/cars')}
              className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
