import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Filter, Star, Check, Sparkles, AlertCircle } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface MenuProps {
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyVegan, setOnlyVegan] = useState(false);
  const [onlyGlutenFree, setOnlyGlutenFree] = useState(false);
  
  // Customization state for adding items
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Specialties' },
    { id: 'cakes', name: 'Cakes' },
    { id: 'custom', name: 'Custom Celebration Cakes' },
    { id: 'bread', name: 'Bread' },
    { id: 'pastries', name: 'Pastries' },
    { id: 'cookies', name: 'Cookies' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'savory', name: 'Savory Snacks' },
    { id: 'sandwiches', name: 'Sandwiches' },
    { id: 'seasonal', name: 'Seasonal Specials' }
  ];

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Dietary filter - simulate or extract
      if (onlyVegan && !item.name.toLowerCase().includes('spinach') && !item.name.toLowerCase().includes('baguette') && !item.name.toLowerCase().includes('sourdough') && !item.name.toLowerCase().includes('focaccia')) {
        // Just mock some items as vegan for interactivity
        const veganList = ['bread-1', 'bread-2', 'cookie-3', 'sandwich-2'];
        if (!veganList.includes(item.id)) return false;
      }
      if (onlyGlutenFree) {
        const glutenFreeList = ['dessert-2', 'cookie-1', 'cake-3'];
        if (!glutenFreeList.includes(item.id)) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, onlyVegan, onlyGlutenFree]);

  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setQuantity(1);
    setNotes('');
    setFeedbackMsg(null);
  };

  const handleConfirmAdd = () => {
    if (!customizingItem) return;
    onAddToCart(customizingItem, quantity, notes);
    
    // Show quick feedback inside popup or card
    setFeedbackMsg(`Successfully added ${quantity}x ${customizingItem.name} to your cart!`);
    setTimeout(() => {
      setCustomizingItem(null);
      setFeedbackMsg(null);
    }, 1500);
  };

  return (
    <section id="menu" className="py-24 bg-gold-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-24 left-[-10%] w-96 h-96 bg-gold-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-24 right-[-10%] w-96 h-96 bg-choco-300/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="block text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
            Freshly Handcrafted
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-choco-950">
            Explore Our Exquisite Menu
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mt-2" />
          <p className="text-choco-600 font-sans text-sm sm:text-base leading-relaxed">
            Choose from our baked masterworks. From daily artisanal loaves to beautiful custom layers, select a treat to add to your order.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-6 mb-12">
          
          {/* Search and Quick Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gold-100 shadow-sm">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-choco-400 w-5 h-5" />
              <input
                id="menu-search-input"
                type="text"
                placeholder="Search sweet and savory treats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold-100 focus:outline-none focus:border-gold-500 text-choco-900 placeholder-choco-400 font-sans text-sm"
              />
            </div>

            {/* Quick Dietary Filters */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-start md:justify-end">
              <span className="text-xs font-semibold text-choco-500 uppercase tracking-wider flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1.5" /> Filter by:
              </span>
              
              <button
                id="filter-gluten-free-btn"
                onClick={() => setOnlyGlutenFree(!onlyGlutenFree)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                  onlyGlutenFree
                    ? 'bg-gold-500 border-gold-500 text-white shadow-sm'
                    : 'bg-gold-50 border-gold-200/60 text-choco-800 hover:bg-gold-100'
                }`}
              >
                Gluten-Free Friendly
              </button>

              <button
                id="filter-vegan-btn"
                onClick={() => setOnlyVegan(!onlyVegan)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                  onlyVegan
                    ? 'bg-gold-500 border-gold-500 text-white shadow-sm'
                    : 'bg-gold-50 border-gold-200/60 text-choco-800 hover:bg-gold-100'
                }`}
              >
                Vegan Friendly
              </button>
            </div>
          </div>

          {/* Categories Tab Bar */}
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none gap-2">
            {categories.map((cat) => (
              <button
                id={`cat-btn-${cat.id}`}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-choco-900 text-white shadow-md'
                    : 'bg-white border border-gold-100 text-choco-800 hover:border-gold-400 hover:bg-gold-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Menu Grid Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                id={`menu-card-${item.id}`}
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl overflow-hidden border border-gold-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group h-full"
              >
                {/* Product Image Panel */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gold-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-md flex items-center space-x-1 border border-gold-100 text-xs font-bold text-choco-950">
                    <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                    <span>{item.rating}</span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-4 right-4 bg-choco-950/85 backdrop-blur-sm px-3.5 py-1 rounded-full shadow-md text-[10px] tracking-wider uppercase font-semibold text-gold-300">
                    {item.category === 'custom' ? 'Celebration' : item.category}
                  </div>

                  {/* Seasonal Accent badge */}
                  {item.isSeasonal && (
                    <div className="absolute bottom-4 left-4 bg-gold-500 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 fill-white" />
                      <span>Seasonal special</span>
                    </div>
                  )}
                </div>

                {/* Info & Purchase Actions */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="space-y-2 flex-grow">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-choco-950 leading-snug group-hover:text-gold-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-sm text-choco-600 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Pricing and Quick Buy Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-gold-100">
                    <div>
                      <span className="block text-xs font-semibold text-choco-400 uppercase tracking-wider">
                        Price estimate
                      </span>
                      <span className="text-xl font-bold text-choco-900 font-serif">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      id={`buy-btn-${item.id}`}
                      onClick={() => handleOpenCustomize(item)}
                      className="px-4.5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 group-hover:scale-105 transform"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Order Treat</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center text-choco-400 mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-xl text-choco-900">
                No Treats Found
              </h4>
              <p className="text-sm text-choco-500 font-sans max-w-sm mx-auto">
                We couldn't find any treats matching your current filters. Try searching for other terms or selecting another category!
              </p>
              <button
                id="clear-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setOnlyVegan(false);
                  setOnlyGlutenFree(false);
                }}
                className="px-6 py-2.5 rounded-full bg-choco-900 hover:bg-choco-800 text-white font-semibold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Product Customization / Add Modal */}
      <AnimatePresence>
        {customizingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              id="customize-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCustomizingItem(null)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Body */}
            <motion.div
              id="customize-modal-panel"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-gold-200 p-6 sm:p-8 max-w-lg w-full relative z-10 flex flex-col max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] tracking-widest font-bold uppercase text-gold-600 block mb-1">
                    Add to order
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-choco-950">
                    {customizingItem.name}
                  </h3>
                </div>
                <span className="font-serif font-bold text-2xl text-gold-600">
                  ${(customizingItem.price * quantity).toFixed(2)}
                </span>
              </div>

              {/* Body */}
              <div className="space-y-6 flex-grow">
                {/* Image */}
                <div className="rounded-2xl overflow-hidden aspect-[16/9] w-full bg-gold-100">
                  <img
                    src={customizingItem.image}
                    alt={customizingItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm text-choco-600 leading-relaxed font-sans bg-gold-50 p-3.5 rounded-xl border border-gold-100">
                  {customizingItem.description}
                </p>

                {/* Quantity adjuster */}
                <div className="flex items-center justify-between border-b border-gold-100 pb-4">
                  <span className="text-sm font-bold text-choco-900">Select Quantity</span>
                  <div className="flex items-center space-x-3 bg-gold-50 border border-gold-200 px-3 py-1.5 rounded-xl">
                    <button
                      id="qty-minus-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-choco-900 hover:text-gold-500 font-bold px-2.5 py-1 text-lg"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="font-bold text-choco-900 text-base min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      id="qty-plus-btn"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-choco-900 hover:text-gold-500 font-bold px-2.5 py-1 text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Custom Notes */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-choco-900">
                    Special Preparation Notes (Optional)
                  </label>
                  <textarea
                    id="product-custom-notes"
                    placeholder="e.g. 'No nuts please', 'Write Happy Anniversary Sophie on cake box', 'Deliver sliced'"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-4 rounded-xl border border-gold-200 text-sm text-choco-950 placeholder-choco-400 focus:outline-none focus:border-gold-500 h-24 resize-none"
                    maxLength={200}
                  />
                  <span className="text-[10px] text-choco-400 block text-right font-medium">
                    {200 - notes.length} characters left
                  </span>
                </div>
              </div>

              {/* Feedback messages / Action buttons */}
              <div className="mt-6 space-y-4 pt-4 border-t border-gold-100">
                {feedbackMsg && (
                  <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 text-xs font-semibold flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feedbackMsg}</span>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    id="cancel-customize-btn"
                    onClick={() => setCustomizingItem(null)}
                    className="flex-1 py-3.5 rounded-full border border-gold-200 hover:bg-gold-50 text-choco-800 text-sm font-semibold transition-colors duration-300"
                    disabled={!!feedbackMsg}
                  >
                    Go Back
                  </button>

                  <button
                    id="confirm-add-cart-btn"
                    onClick={handleConfirmAdd}
                    className="flex-1 py-3.5 rounded-full bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    disabled={!!feedbackMsg}
                  >
                    Confirm & Add
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
