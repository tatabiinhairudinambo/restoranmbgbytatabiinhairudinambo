import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const handleClick = () => {
    const phoneNumber = '6282213840415';
    const message = 'Halo! Saya tertarik dengan layanan sewa mobil Anda. Mohon info ketersediaan unit dan daftar harga terbaru, ya. Terima kasih banyak!';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group animate-bounce-subtle hover-glow"
      aria-label="Hubungi via WhatsApp"
    >
      <MessageCircle size={24} className="sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-300" />
      <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full animate-ping"></span>
      <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded-full animate-pulse-slow"></span>
    </motion.button>
  );
};

export default WhatsAppButton;
