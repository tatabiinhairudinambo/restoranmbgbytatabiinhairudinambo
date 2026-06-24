import { Star, Quote, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
  return (
    <section id="testimoni" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-60" />

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
            className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 border border-yellow-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          >
            <Star size={13} className="fill-yellow-500" />
            Testimoni Pelanggan
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 font-display leading-tight">
            Apa Kata <span className="text-red-600">Pelanggan Kami</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Ribuan pelanggan puas telah menemukan mobil impian mereka bersama kami.
          </p>

          {/* Stars row */}
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
            <span className="ml-2 text-gray-600 text-sm font-semibold">4.9/5</span>
            <span className="ml-1 text-gray-400 text-sm">dari 500+ ulasan</span>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="bg-gray-50 hover:bg-white p-6 rounded-2xl border border-gray-100 hover:border-red-100 transition-all duration-300 group relative cursor-default"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 text-red-100 group-hover:text-red-200 transition-colors">
                <Quote size={32} className="fill-current" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-4">
                "{t.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-red-100"
                />
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">{t.name}</h5>
                  <p className="text-xs text-gray-400">{t.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-gray-500 mb-5 text-sm">
            Bergabunglah dengan ribuan pelanggan yang puas rental mobil bersama kami
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(220,38,38,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg shadow-red-200"
          >
            <MessageSquare size={18} />
            Sewa Mobil Sekarang
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
