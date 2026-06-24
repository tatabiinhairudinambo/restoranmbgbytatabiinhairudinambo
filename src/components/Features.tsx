import {
  ShieldCheck,
  Search,
  DollarSign,
  CreditCard,
  MessageCircle,
  ClipboardCheck,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: ShieldCheck,
    title: 'Armada Bersih & Terawat',
    description: 'Semua mobil rutin diservis dan dalam kondisi prima untuk kenyamanan perjalanan Anda.',
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    icon: DollarSign,
    title: 'Harga Transparan',
    description: 'Tidak ada biaya tersembunyi. Harga yang tertera adalah harga final untuk rental.',
    color: 'bg-green-600',
    lightColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
  {
    icon: ClipboardCheck,
    title: 'Driver Profesional',
    description: 'Tersedia layanan dengan driver berpengalaman dan bersertifikat untuk perjalanan aman.',
    color: 'bg-purple-600',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    icon: MessageCircle,
    title: 'Customer Support 24 Jam',
    description: 'Tim kami siap membantu Anda kapan saja selama masa rental, 24/7.',
    color: 'bg-orange-600',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600',
  },
  {
    icon: Search,
    title: 'Booking Mudah via WhatsApp',
    description: 'Pesan mobil dengan cepat dan mudah melalui WhatsApp tanpa ribet.',
    color: 'bg-teal-600',
    lightColor: 'bg-teal-50',
    textColor: 'text-teal-600',
  },
  {
    icon: CreditCard,
    title: 'Unit Terjamin Siap Jalan',
    description: 'Setiap unit sudah dicek kelayakan dan dijamin siap untuk perjalanan jauh maupun dekat.',
    color: 'bg-red-600',
    lightColor: 'bg-red-50',
    textColor: 'text-red-600',
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Sparkles size={13} />
            Keunggulan Kami
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 font-display leading-tight">
            Mengapa Memilih <span className="text-red-600">Rental Kami?</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Komitmen kami adalah memberikan pelayanan rental mobil terbaik dengan harga bersaing
            dan kendaraan yang selalu prima.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:border-transparent transition-all duration-300 group cursor-default"
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <feature.icon className="text-white" size={26} />
              </div>

              {/* Content */}
              <h4 className="text-lg font-bold text-gray-900 mb-3 font-display group-hover:text-red-600 transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>

              {/* Bottom accent */}
              <motion.div
                className={`h-0.5 ${feature.color} rounded-full mt-5 origin-left`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
