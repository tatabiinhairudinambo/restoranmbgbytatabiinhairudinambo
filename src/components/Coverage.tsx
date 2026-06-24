import { MapPin, CheckCircle, Car, Globe2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Coverage = () => {
  const areas = [
    {
      name: 'Jakarta',
      icon: '🏙️',
      description: 'Jakarta Pusat, Utara, Selatan, Barat, Timur',
      color: 'bg-red-600',
      lightColor: 'bg-red-50',
    },
    {
      name: 'Bogor',
      icon: '🌳',
      description: 'Bogor Kota, Kabupaten Bogor, Cibinong',
      color: 'bg-green-600',
      lightColor: 'bg-green-50',
    },
    {
      name: 'Depok',
      icon: '🏘️',
      description: 'Depok Kota dan sekitarnya',
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
    },
    {
      name: 'Tangerang',
      icon: '🏢',
      description: 'Tangerang Kota, Tangerang Selatan, BSD',
      color: 'bg-orange-600',
      lightColor: 'bg-orange-50',
    },
    {
      name: 'Bekasi',
      icon: '🏭',
      description: 'Bekasi Kota, Kabupaten Bekasi',
      color: 'bg-purple-600',
      lightColor: 'bg-purple-50',
    },
    {
      name: 'Bandung',
      icon: '⛰️',
      description: 'Bandung Kota dan Bandung Raya',
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50',
    },
  ];

  const features = [
    {
      icon: Car,
      title: 'Armada Siap 24/7',
      description: 'Unit kendaraan tersedia kapan saja untuk memenuhi kebutuhan perjalanan Anda',
    },
    {
      icon: MapPin,
      title: 'Jangkauan Luas',
      description: 'Melayani seluruh wilayah Jabodetabek dan sekitarnya dengan layanan prima',
    },
    {
      icon: Globe2,
      title: 'Perjalanan Luar Kota',
      description: 'Tersedia juga untuk perjalanan wisata dan bisnis ke luar kota',
    },
  ];

  return (
    <section id="wilayah" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          >
            <Sparkles size={13} />
            Wilayah Layanan
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 font-display leading-tight">
            Armada Siap <span className="text-red-600">Di Mana Pun</span> Anda Berada
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Melayani seluruh wilayah <span className="font-semibold text-gray-700">Jabodetabek</span> dan sekitarnya dengan armada lengkap dan driver profesional. Perjalanan Anda adalah prioritas kami.
          </p>
        </motion.div>

        {/* Coverage Areas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
              className={`${area.lightColor} p-5 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-default group`}
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl mb-3"
                >
                  {area.icon}
                </motion.div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm group-hover:text-red-600 transition-colors">
                  {area.name}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {area.description}
                </p>
                <div className="mt-3 flex items-center justify-center gap-1 text-green-600">
                  <CheckCircle size={14} />
                  <span className="text-xs font-semibold">Tersedia</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-red-100 transition-all duration-300 cursor-default group"
            >
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-red-200">
                <feature.icon className="text-white" size={22} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-base group-hover:text-red-600 transition-colors">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5 backdrop-blur-sm" />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
                Butuh Rental Mobil?
              </h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                Hubungi kami sekarang untuk informasi lebih lanjut dan dapatkan penawaran terbaik untuk perjalanan Anda!
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20informasi%20rental%20mobil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Hubungi via WhatsApp
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Coverage;
