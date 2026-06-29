import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle, Search, Sparkles } from 'lucide-react';
import { FAQItem } from '../types';
import { FAQS } from '../data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1'); // open the first FAQ by default
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'orders' | 'custom-cakes' | 'delivery'>('all');

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General Questions' },
    { id: 'orders', name: 'Pre-Ordering' },
    { id: 'custom-cakes', name: 'Custom Cakes' },
    { id: 'delivery', name: 'Delivery Services' }
  ];

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFAQs = FAQS.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="faqs" className="py-24 bg-gold-50 relative overflow-hidden">
      {/* Decorative circle grids */}
      <div className="absolute top-1/2 left-[-10%] w-96 h-96 bg-gold-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="block text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-choco-950">
            Frequently Answered Questions
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mt-2" />
          <p className="text-choco-600 font-sans text-sm sm:text-base leading-relaxed">
            Quick answers about custom cake timelines, pickup windows, allergy accommodations, and wedding catering options.
          </p>
        </div>

        {/* Search & Category Filter Section */}
        <div className="space-y-6 mb-10">
          {/* FAQ Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-choco-400 w-5 h-5" />
            <input
              id="faq-search-input"
              type="text"
              placeholder="Search bakery questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gold-200 focus:outline-none focus:border-gold-500 text-sm text-choco-900 bg-white"
            />
          </div>

          {/* Quick Categories filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                id={`faq-cat-btn-${cat.id}`}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-choco-900 text-white shadow-sm'
                    : 'bg-white border border-gold-100 text-choco-800 hover:bg-gold-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFAQs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  id={`faq-item-${faq.id}`}
                  key={faq.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gold-200/50 shadow-sm overflow-hidden"
                >
                  <button
                    id={`faq-header-btn-${faq.id}`}
                    onClick={() => handleToggle(faq.id)}
                    className="w-full text-left px-6 py-5 sm:py-6 flex items-center justify-between space-x-4 hover:bg-gold-50/50 transition-colors duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <HelpCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="font-serif font-bold text-base text-choco-950 sm:text-lg">
                        {faq.question}
                      </span>
                    </div>
                    <div className="p-1 rounded-full bg-gold-100 text-choco-900 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 sm:pb-8 pl-14 text-sm sm:text-base text-choco-700 leading-relaxed font-sans border-t border-gold-50 pt-2">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-choco-500 font-sans">
                No questions match your current search terms. Please contact our friendly staff directly!
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
