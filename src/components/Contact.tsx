import { useState } from 'react';
import { Send, Phone, Mail, MapPin, MessageCircle, HeadphonesIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { ContactForm } from '../types';

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({ name: '', phone: '', message: '' });
  const [focused, setFocused] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo, saya ${formData.name}%0A%0ATelepon: ${formData.phone}%0A%0APesan: ${formData.message}`;
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    {
      icon: Phone,
      label: 'Telepon',
      value: '+62 812-3456-7890',
      sub: 'Senin - Minggu, 09:00 - 21:00',
      color: 'bg-green-600',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@carautogarageretail.com',
      sub: 'Balasan dalam 24 jam',
      color: 'bg-blue-600',
    },
    {
      icon: MapPin,
      label: 'Alamat',
      value: 'Jl. Sudirman No. 123',
      sub: 'Jakarta Selatan, DKI Jakarta 12190',
      color: 'bg-red-600',
    },
  ];

  return (
    <section id="kontak" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
          >
            <HeadphonesIcon size={13} />
            Hubungi Kami
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-display">
            Siap Membantu <span className="text-red-600">Rental Mobil</span> Anda
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Tim kami siap memberikan informasi lengkap dan membantu Anda memilih kendaraan yang tepat.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Contact cards */}
            <div className="space-y-4 mb-8">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="text-white" size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</p>
                    <p className="font-bold text-gray-900 text-sm">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2087749585404!2d106.82070731476889!3d-6.236690995480827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890123"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Showroom"
              />
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-6 font-display flex items-center gap-2">
                <MessageCircle size={22} className="text-red-600" />
                Kirim Pesan
              </h4>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Nama Lengkap
                  </label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    required
                    animate={{ borderColor: focused === 'name' ? '#dc2626' : '#e5e7eb' }}
                    className="w-full px-4 py-3 border-2 rounded-xl outline-none text-sm transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Nomor WhatsApp
                  </label>
                  <motion.input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused('')}
                    required
                    animate={{ borderColor: focused === 'phone' ? '#dc2626' : '#e5e7eb' }}
                    className="w-full px-4 py-3 border-2 rounded-xl outline-none text-sm transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Contoh: 081234567890"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Pesan
                  </label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    required
                    rows={4}
                    animate={{ borderColor: focused === 'message' ? '#dc2626' : '#e5e7eb' }}
                    className="w-full px-4 py-3 border-2 rounded-xl outline-none text-sm transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                    placeholder="Tulis pertanyaan atau kebutuhan Anda..."
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(220,38,38,0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-red-200 text-sm"
                >
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  Hubungi Admin Sekarang
                </motion.button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
                Pesan Anda akan dikirim langsung via WhatsApp untuk respons yang lebih cepat.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
