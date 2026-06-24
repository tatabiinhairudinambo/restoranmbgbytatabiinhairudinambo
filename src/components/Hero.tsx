import { ArrowRight, ChevronDown, Star, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToUnits = () => {
    document.getElementById('unit-mobil')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '500+', label: 'Pelanggan Puas', icon: Star },
    { value: '50+', label: 'Unit Armada', icon: Shield },
    { value: '24/7', label: 'Customer Support', icon: Clock },
  ];

  return (
    <section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
          alt="Hero Background"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/75 to-black/50" />
        {/* Red accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/30 via-transparent to-transparent" />
      </div>

      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-500/40 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-400 px-5 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-red-500 rounded-full"
          />
          🚗 Rental Mobil Terpercaya Indonesia
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-display"
        >
          Rental Mobil{' '}
          <span className="relative inline-block">
            <span className="gradient-text">Terpercaya</span>
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
          </span>
          <br />
          <span className="text-gray-100">untuk Perjalanan Anda</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Sewa mobil dengan armada terbaik, harga terjangkau, dan pelayanan
          profesional untuk kebutuhan perjalanan pribadi maupun bisnis.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(220,38,38,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToUnits}
            className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center gap-3 transition-all duration-300 w-full sm:w-auto justify-center shadow-xl shadow-red-900/40"
          >
            Lihat Armada
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.6)' }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToContact}
            className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white border border-white/25 px-8 py-4 rounded-xl font-bold text-base flex items-center gap-3 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            Hubungi Admin
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-3 gap-4 max-w-xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-4 cursor-default"
            >
              <stat.icon size={18} className="text-red-500 mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-bold text-white font-display">{stat.value}</p>
              <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToUnits}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
