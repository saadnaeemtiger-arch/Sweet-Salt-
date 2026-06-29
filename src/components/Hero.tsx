import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Calendar, ArrowDown } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
  onContactUs: () => void;
  onExplorePlanner: () => void;
}

export default function Hero({ onOrderNow, onContactUs, onExplorePlanner }: HeroProps) {
  // Path to generated hero image
  const heroImageSrc = '/src/assets/images/hero_bakery_premium_1782726377432.jpg';

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-b from-gold-100/50 via-gold-50/30 to-gold-50 pt-28 pb-16 flex items-center overflow-hidden"
    >
      {/* Decorative Warm Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold-200/25 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-choco-200/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gold-100 border border-gold-300/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gold-800 uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-500 fill-gold-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Artisanal, Handcrafted & Fresh</span>
            </motion.div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-12 h-[2px] bg-gold-500 mb-6 hidden lg:block"
              />

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-serif text-4xl sm:text-5xl lg:text-[72px] leading-[0.95] mb-6 italic text-choco-950 tracking-tight"
              >
                Freshly Baked <br />
                <span className="text-gold-500 not-italic">Happiness</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-sm sm:text-base text-choco-800 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
              >
                Welcome to <strong className="text-choco-950 font-bold">Sweet&Salt HUT</strong>, where buttery golden lamination meets sweet decadent confections. From authentic 36-hour sourdough and flaky croissants to spectacular custom wedding cakes, we bake with love, premium ingredients, and strict artisan standards.
              </motion.p>
            </div>

            {/* Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                id="hero-order-btn"
                onClick={onOrderNow}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-planner-btn"
                onClick={onExplorePlanner}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-white hover:bg-gold-50 text-gold-700 border border-gold-200 font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
              >
                <Calendar className="w-4 h-4 text-gold-500" />
                <span>Custom Cake Planner</span>
              </button>

              <button
                id="hero-contact-btn"
                onClick={onContactUs}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full bg-transparent hover:bg-gold-100 text-choco-800 font-medium transition-colors duration-300"
              >
                <span>Contact Us</span>
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-8 border-t border-gold-200/50 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left"
            >
              <div>
                <span className="block text-2xl font-bold text-choco-950 font-serif">100%</span>
                <span className="text-xs text-choco-500 font-medium uppercase tracking-wider">Natural Ingredients</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-choco-950 font-serif">Fresh</span>
                <span className="text-xs text-choco-500 font-medium uppercase tracking-wider">Baked Daily</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-choco-950 font-serif">4.9 ★</span>
                <span className="text-xs text-choco-500 font-medium uppercase tracking-wider">Google Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[16:9] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              {/* Premium Generated Image with Ref Policy */}
              <img
                src={heroImageSrc}
                alt="Sweet & Salt HUT Artisanal Bakery Hero Display"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  // Fallback if local path fails (should not fail, but safe)
                  e.currentTarget.src = "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge overlaying the image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-3 border border-gold-100"
              >
                <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 font-bold text-lg">
                  🥐
                </div>
                <div>
                  <span className="block text-xs text-choco-500 uppercase tracking-widest font-bold">Hot Out of Oven</span>
                  <span className="block text-sm font-bold text-choco-900">Warm Croissants Now Ready!</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Background design elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold-300 rounded-2xl -z-10 opacity-20 blur-md rotate-12" />
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-choco-400 rounded-full -z-10 opacity-15 blur-lg" />
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="hidden sm:flex justify-center mt-12 animate-bounce">
          <button
            onClick={() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg border border-gold-100 text-choco-500 hover:text-gold-600 transition-colors duration-300"
            aria-label="Scroll Down"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
