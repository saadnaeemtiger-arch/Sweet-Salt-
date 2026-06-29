import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, Star } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'cakes', name: 'Cakes' },
    { id: 'cupcakes', name: 'Cupcakes & Macarons' },
    { id: 'bread', name: 'Breads' },
    { id: 'pastries', name: 'Pastries' },
    { id: 'cookies', name: 'Cookies' },
    { id: 'interior', name: 'Bakery Interior' },
    { id: 'process', name: 'Baking Process' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handleOpenLightbox = (imageIndexInFiltered: number) => {
    // We map back to the filtered list's index
    setLightboxIndex(imageIndexInFiltered);
  };

  const handleNextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-24 bg-gold-100/30 relative overflow-hidden">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-gold-300 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="block text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
            Visual Delights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-choco-950">
            Our Gallery & Kitchen Moments
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mt-2" />
          <p className="text-choco-600 font-sans text-sm sm:text-base leading-relaxed">
            Take a visual tour of our fresh creations, cosy warm interior, and traditional baking process in actions.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              id={`gal-cat-btn-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gold-500 text-white shadow-md'
                  : 'bg-white border border-gold-100 text-choco-800 hover:border-gold-300 hover:bg-gold-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                id={`gal-card-${item.id}`}
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group aspect-square rounded-2xl overflow-hidden bg-gold-100 shadow-sm border border-gold-200/50 cursor-pointer"
                onClick={() => handleOpenLightbox(index)}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover overlay with detail and expand icon */}
                <div className="absolute inset-0 bg-choco-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/35 text-white transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-gold-300 font-bold mb-0.5">
                      {item.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm sm:text-base truncate">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-choco-950/95 p-4 sm:p-8">
            <button
              id="lightbox-close-btn"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Image Trigger */}
            <button
              id="lightbox-prev-btn"
              onClick={handlePrevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden sm:block"
              aria-label="Previous image"
            >
              &larr;
            </button>

            {/* Main Lightbox Frame */}
            <motion.div
              id="lightbox-content-frame"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl max-h-[80vh] w-full flex flex-col justify-center items-center relative"
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
              <div className="text-center mt-4">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h4 className="font-serif text-lg text-white font-bold mt-1">
                  {filteredItems[lightboxIndex].title}
                </h4>
              </div>
            </motion.div>

            {/* Next Image Trigger */}
            <button
              id="lightbox-next-btn"
              onClick={handleNextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors hidden sm:block"
              aria-label="Next image"
            >
              &rarr;
            </button>

            {/* Swipe prompt indicator on mobile */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-400 text-xs sm:hidden">
              Tap outside to close
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
