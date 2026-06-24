import { Shield, Award, Users, Zap, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    { icon: CheckCircle2, title: 'Unit Terawat', desc: 'Semua mobil rutin diservis dan dalam kondisi prima' },
    { icon: Award, title: 'Harga Bersaing', desc: 'Tarif rental kompetitif dengan promo menarik' },
    { icon: Users, title: 'Layanan 24/7', desc: 'Customer support siap membantu kapan saja' },
    { icon: Zap, title: 'Proses Mudah', desc: 'Booking cepat via WhatsApp tanpa ribet' },
  ];

  const stats = [
    { number: '500+', label: 'Pelanggan Puas', color: 'text-red-600' },
    { number: '50+', label: 'Unit Kendaraan', color: 'text-blue-600' },
    { number: '24/7', label: 'Customer Support', color: 'text-green-600' },
    { number: '5+', label: 'Tahun Pengalaman', color: 'text-purple-600' },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="tentang" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          >
            <Shield size={13} />
            Tentang Kami
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 font-display leading-tight">
            Rental Mobil <span className="text-red-600">Terpercaya</span><br />di Indonesia
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Car Auto Garage Retail Indonesia telah melayani ribuan pelanggan dengan armada terawat dan
            sistem booking yang mudah sejak 2019.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80"
                alt="Rental Mobil + Driver"
                className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-6 left-6 bg-red-600 text-white px-5 py-3.5 rounded-2xl shadow-xl"
              >
                <p className="text-3xl font-bold font-display leading-none">5+</p>
                <p className="text-xs mt-0.5 text-red-100">Tahun Pengalaman</p>
              </motion.div>

              {/* Rating badge */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                className="absolute top-6 right-6 bg-white text-gray-900 px-4 py-3 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="font-bold text-sm">4.9/5</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Rating Pelanggan</p>
              </motion.div>

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-2xl font-bold text-white font-display mb-1">RENTAL MOBIL + DRIVER</h4>
                <p className="text-white/80 text-sm">Melayani Perjalanan Keluarga, Wisata & Corporate</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <p className="text-gray-600 mb-8 leading-relaxed text-base">
              Dengan armada terawat dan sistem booking yang mudah, kami memastikan
              setiap perjalanan Anda nyaman dan aman. Kepuasan pelanggan adalah
              prioritas utama kami.
            </p>

            {/* Features */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
                  className="flex items-start gap-4 p-5 bg-gray-50 hover:bg-white rounded-2xl transition-all duration-300 border border-transparent hover:border-red-100 cursor-default"
                >
                  <div className="flex-shrink-0 w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center shadow-md shadow-red-200">
                    <f.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">{f.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(220,38,38,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('unit-mobil')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg shadow-red-200"
            >
              <TrendingUp size={18} />
              Lihat Armada Kami
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.03 }}
              viewport={{ once: true }}
              className="text-center bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-default"
            >
              <p className={`text-3xl md:text-4xl font-bold mb-2 font-display ${s.color}`}>{s.number}</p>
              <p className="text-gray-500 text-xs md:text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
