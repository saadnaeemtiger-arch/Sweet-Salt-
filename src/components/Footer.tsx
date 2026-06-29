import React, { useState } from 'react';
import { Cake, Mail, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  const footerLinks = [
    { name: 'Artisanal Home', id: 'home' },
    { name: 'Our Heritage Story', id: 'about' },
    { name: 'The Baking Menu', id: 'menu' },
    { name: 'Interactive Cake Planner', id: 'planner' },
    { name: 'Photo Gallery', id: 'gallery' },
    { name: 'Guest Reviews', id: 'testimonials' },
    { name: 'Frequently Asked', id: 'faqs' },
    { name: 'Contact & Route', id: 'contact' }
  ];

  return (
    <footer className="bg-choco-950 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Warm Accent Blobs */}
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top: Newsletter signup & brand info row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-white/10 pb-16">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white">
                <Cake className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-white">
                Sweet&Salt <span className="text-gold-400">HUT</span>
              </span>
            </div>
            <p className="text-neutral-400 text-sm max-w-sm leading-relaxed font-sans">
              Sign up for our exclusive baking letters to receive weekend hot-out-of-the-oven notifications, seasonal dessert pre-orders, and secret discount coupons.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 max-w-xl lg:ml-auto w-full">
              <h4 className="font-serif font-bold text-sm text-gold-300 uppercase tracking-widest mb-3">
                Join The Flour Club Newsletter
              </h4>

              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                    <input
                      id="newsletter-email-input"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder-white/40 focus:outline-none focus:border-gold-400"
                    />
                    <button
                      id="newsletter-submit-btn"
                      type="submit"
                      className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white rounded-xl text-sm font-bold shadow-md transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <span>Subscribe</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <motion.div
                    id="newsletter-success-banner"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center space-x-2"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Welcome to the Flour Club! Check your inbox soon for 15% off your first order!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Middle: Quick Links grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm border-b border-white/10 pb-12">
          
          {/* Brand Summary */}
          <div className="space-y-4">
            <h5 className="font-serif font-bold text-gold-300 text-base">The Artisan Promise</h5>
            <p className="text-neutral-400 leading-relaxed font-sans text-xs sm:text-sm">
              We handcraft our bakes in a hygienic kitchen using wild yeast starter, premium cream pasture butter, and organic locally-milled wheat. No compromises, no chemical shortcut. Every day is freshly baked happiness.
            </p>
          </div>

          {/* Quick Navigation links */}
          <div className="space-y-4">
            <h5 className="font-serif font-bold text-gold-300 text-base">Quick Navigation</h5>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-400">
              {footerLinks.map((link) => (
                <button
                  id={`footer-link-${link.id}`}
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-left hover:text-gold-400 transition-colors py-1"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Core Contacts info */}
          <div className="space-y-4 text-xs sm:text-sm text-neutral-400">
            <h5 className="font-serif font-bold text-gold-300 text-base">Sweet&Salt Contacts</h5>
            <p className="font-sans leading-relaxed">
              📍 48 Baker Street, Marylebone, London, W1U 7DF <br />
              📞 +44 20 7946 0192 <br />
              ✉️ hello@sweetandsalthut.com
            </p>
            <div className="pt-2">
              <span className="block font-bold text-white mb-1">Weekly Coupon Active:</span>
              <span className="inline-block bg-white/10 px-2.5 py-1 text-xs text-gold-300 border border-white/15 rounded font-mono font-bold tracking-wider">
                BAKEFRESH (15% OFF)
              </span>
            </div>
          </div>

        </div>

        {/* Bottom: Legal & credit bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <span>
            © 2026 Sweet & Salt HUT. Handcrafted with Baking Devotion. All rights reserved.
          </span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-gold-400 transition-colors">Cookie settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
