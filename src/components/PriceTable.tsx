import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, MessageCircle, TrendingDown, Car } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Car as CarType } from '../types';
import toast from 'react-hot-toast';

const PriceTable = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setCars(data);
    } catch {
      toast.error('Gagal memuat daftar harga');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  const handleWhatsApp = (carName: string, price: number) => {
    const msg = `Halo, saya tertarik rental mobil ${carName} seharga ${formatPrice(price)}/Hari. Mohon info lebih lanjut.`;
    window.open(`https://wa.me/6282213840415?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="harga" className="py-16 sm:py-20 lg:py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 border border-red-600/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          >
            <Tag size={13} />
            Daftar Harga
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 font-display leading-tight">
            Harga Rental <span className="text-red-500">Per Hari</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            Daftar lengkap harga rental seluruh armada. Hubungi kami untuk paket mingguan dan bulanan lebih hemat.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="hidden lg:block rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl"
            >
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-800 to-gray-800/80">
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">#</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Nama Mobil</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Tahun</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Transmisi</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">Kapasitas</th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">Harga/Hari</th>
                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-400">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {cars.map((car, i) => (
                    <motion.tr
                      key={car.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                      className="bg-gray-900/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-gray-600 text-sm font-medium">{String(i + 1).padStart(2, '0')}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{car.name}</p>
                            <p className="text-xs text-gray-500">{car.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{car.year}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-gray-800 text-gray-300 rounded-lg text-xs font-medium">{car.transmission}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-blue-500/15 text-blue-400 rounded-lg text-xs font-bold border border-blue-500/20">
                          {car.passengers} Penumpang
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-lg font-bold text-white font-display">{formatPrice(car.price)}</span>
                        <span className="text-xs text-gray-500">/hari</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleWhatsApp(car.name, car.price)}
                          className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors duration-200"
                        >
                          <MessageCircle size={13} />
                          Sewa
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {cars.map((car, i) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/60 rounded-2xl overflow-hidden border border-gray-700/50"
                >
                  <div className="flex gap-4 p-4">
                    <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-700">
                      <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-0.5 truncate text-sm">{car.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{car.brand}</p>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-lg">{car.year}</span>
                        <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-lg">{car.transmission}</span>
                        <span className="bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-lg font-bold border border-blue-500/20">
                          {car.passengers} Penumpang
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-900/50 flex items-center justify-between border-t border-gray-700/50">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Harga/Hari</p>
                      <p className="text-base font-bold text-white font-display">{formatPrice(car.price)}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWhatsApp(car.name, car.price)}
                      className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
                    >
                      <MessageCircle size={14} />
                      Sewa
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-600/20 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
            >
              <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingDown size={20} className="text-red-400" />
              </div>
              <p className="text-gray-300 text-sm">
                <span className="font-bold text-white">Harga dapat berubah saat high season.</span>{' '}
                Hubungi admin untuk paket mingguan, bulanan, dan promo spesial dengan diskon menarik.
              </p>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default PriceTable;
