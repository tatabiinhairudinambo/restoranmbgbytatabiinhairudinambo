import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import CarCard from './CarCard';
import { supabase } from '../lib/supabase';
import type { Car as CarType } from '../types';
import toast from 'react-hot-toast';

const CarGrid = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
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
      toast.error('Gagal memuat data armada');
    } finally {
      setLoading(false);
    }
  };

  const brands = ['all', ...Array.from(new Set(cars.map((car) => car.brand)))];

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || car.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <section id="unit-mobil" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          >
            <Car size={13} />
            Armada Mobil
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-display leading-tight">
            Pilih <span className="text-red-600">Armada</span> Rental Anda
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Kami menyediakan berbagai pilihan armada berkualitas untuk kebutuhan
            perjalanan pribadi maupun bisnis Anda.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari nama atau merek mobil..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm bg-gray-50 focus:bg-white transition-all"
            />
          </div>

          <div className="relative sm:w-48">
            <SlidersHorizontal
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none appearance-none bg-gray-50 focus:bg-white text-sm cursor-pointer transition-all"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand === 'all' ? 'Semua Merek' : brand}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm mb-6"
            >
              Menampilkan{' '}
              <span className="font-bold text-gray-900">{filteredCars.length}</span>{' '}
              kendaraan tersedia
            </motion.p>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-base font-medium">
                  Tidak ada mobil yang sesuai pencarian Anda.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedBrand('all'); }}
                  className="mt-3 text-red-600 text-sm font-semibold hover:underline"
                >
                  Reset filter
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CarGrid;
