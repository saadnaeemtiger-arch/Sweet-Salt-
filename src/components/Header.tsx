import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Cake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ cartCount, onOpenCart, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Our Menu', id: 'menu' },
    { name: 'Cake Planner', id: 'planner' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'FAQs', id: 'faqs' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple intersection observer behavior manually
      const scrollPosition = window.scrollY + 100;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
    setActiveSection(id);
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-gold-50/90 backdrop-blur-md shadow-md border-b border-gold-100 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              id="header-logo-btn"
              onClick={() => handleLinkClick('home')}
              className="flex items-center space-x-2 text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-12 shadow-md">
                <Cake className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-serif font-bold text-lg sm:text-xl tracking-tight text-choco-950">
                  Sweet&Salt <span className="text-gold-500">HUT</span>
                </span>
                <span className="block text-[10px] tracking-widest uppercase font-sans text-choco-500 -mt-1 font-medium">
                  Artisanal Bakery
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav id="desktop-nav" className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  id={`nav-link-${link.id}`}
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    activeSection === link.id
                      ? 'text-gold-600'
                      : 'text-choco-800 hover:text-gold-500'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Shopping Cart Trigger */}
              <button
                id="cart-trigger-btn"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full bg-gold-100 hover:bg-gold-200 text-choco-900 transition-colors duration-300"
                aria-label="Open Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    id="cart-count-badge"
                    className="absolute -top-1 -right-1 bg-gold-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Order Quick Action */}
              <button
                id="header-order-btn"
                onClick={() => handleLinkClick('menu')}
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Order Now
              </button>

              {/* Mobile Menu Toggle */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-choco-900 hover:bg-gold-100 transition-colors duration-300"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-full bg-gold-50 shadow-2xl z-50 lg:hidden flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-gold-100 pb-5 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center text-white">
                    <Cake className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-serif font-bold text-base tracking-tight text-choco-950">
                      Sweet&Salt <span className="text-gold-500">HUT</span>
                    </span>
                    <span className="block text-[9px] tracking-widest uppercase font-sans text-choco-500 -mt-1 font-medium">
                      Artisanal Bakery
                    </span>
                  </div>
                </div>
                <button
                  id="close-mobile-menu-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-choco-900 hover:bg-gold-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col space-y-4 flex-grow">
                {navLinks.map((link) => (
                  <button
                    id={`mobile-nav-link-${link.id}`}
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-left py-3 px-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                      activeSection === link.id
                        ? 'bg-gold-500 text-white shadow-md'
                        : 'text-choco-900 hover:bg-gold-100'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              <div className="mt-8 border-t border-gold-100 pt-6">
                <button
                  id="mobile-menu-order-btn"
                  onClick={() => handleLinkClick('menu')}
                  className="w-full flex items-center justify-center py-3.5 rounded-full bg-choco-900 hover:bg-choco-800 text-white font-semibold shadow-md transition-colors duration-300"
                >
                  Order Online Now
                </button>
                <div className="text-center mt-4 text-xs text-choco-500">
                  📍 48 Baker Street, London • Open Daily
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
