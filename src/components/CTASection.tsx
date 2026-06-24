import { motion } from 'framer-motion';
import { MessageCircle, Car, CheckCircle } from 'lucide-react';

const badges = [
  'Tanpa DP',
  'Armada Terawat',
  'Driver Berpengalaman',
  'Harga Transparan',
];

const CTASection = () => {
  const handleWhatsApp = () => {
    const msg = 'Halo, saya ingin booking mobil. Mohon info lebih lanjut.';
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const scrollToCatalog = () => {
    document.getElementById('unit-mobil')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-black relative overflow-hidden">
      {/* Glow accents */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-600/15 border border-red-600/25 text-red-400 px-5 py-2 rounded-full text-sm font-semibold mb-8"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-red-500 rounded-full"
            />
            Tersedia 24/7 — Booking Sekarang
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 font-display leading-tight">
            Siap Berangkat?{' '}
            <span className="gradient-text">Pesan Mobil Anda</span>{' '}
            Sekarang
          </h2>

          <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Wujudkan perjalanan yang aman, nyaman, dan berkesan bersama driver profesional kami.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg shadow-blue-900/30"
            >
              <MessageCircle size={18} />
              Booking Via WhatsApp
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.07)' }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToCatalog}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-transparent border border-white/20 hover:border-white/40 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
            >
              <Car size={18} />
              Lihat Katalog
            </motion.button>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-gray-500">
                <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
