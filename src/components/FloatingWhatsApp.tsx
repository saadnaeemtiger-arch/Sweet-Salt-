import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingWhatsApp() {
  const handleWAOpen = () => {
    const text = encodeURIComponent("Hello Sweet&Salt HUT! I'm visiting your website and would love to ask about custom celebration cakes, allergen options, or pre-orders.");
    window.open(`https://wa.me/447123456789?text=${text}`, '_blank');
  };

  return (
    <motion.button
      id="floating-whatsapp-trigger"
      onClick={handleWAOpen}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group border border-emerald-400"
      aria-label="Chat with Sweet&Salt HUT on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white text-emerald-500 group-hover:rotate-6 transition-transform" />
      
      {/* Tooltip prompt */}
      <span className="absolute right-14 bg-white text-choco-950 font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg border border-gold-200 pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Order via WhatsApp 💬
      </span>
    </motion.button>
  );
}
