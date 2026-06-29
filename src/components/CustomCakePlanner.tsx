import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingBag, Send, Calendar, Check, Info } from 'lucide-react';
import { CustomCakeDetails, MenuItem } from '../types';

interface CustomCakePlannerProps {
  onAddCustomCakeToCart: (customCake: CustomCakeDetails, estimatedPrice: number) => void;
}

export default function CustomCakePlanner({ onAddCustomCakeToCart }: CustomCakePlannerProps) {
  // Planner configurations
  const [tiers, setTiers] = useState<number>(1);
  const [size, setSize] = useState<string>('8 inch');
  const [flavor, setFlavor] = useState<string>('Belgian Triple Chocolate');
  const [frosting, setFrosting] = useState<string>('Rustic Buttercream');
  const [filling, setFilling] = useState<string>('Salted Caramel Cream');
  const [message, setMessage] = useState<string>('');
  const [decorations, setDecorations] = useState<string[]>([]);
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  
  // Submit contact info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const flavorOptions = [
    { name: 'Belgian Triple Chocolate', desc: 'Moist single-origin chocolate sponge layered with ganache.', color: '#4E2F1D' },
    { name: 'Red Velvet Dream', desc: 'Classic velvety rich chocolate sponge with hints of buttermilk.', color: '#8B0000' },
    { name: 'Madagascar Vanilla Bean', desc: 'Light, moist, elegant chiffon cake infused with real vanilla bean.', color: '#FFF8DC' },
    { name: 'Lemon Raspberry Zest', desc: 'Zesty lemon cake layered with sweet-tart fresh raspberry compote.', color: '#FFFACD' },
    { name: 'Almond Pistachio Praline', desc: 'Roasted nut-infused rich crumb sponge for a beautiful earthy taste.', color: '#E9FFDB' }
  ];

  const sizeOptions = [
    { label: '6 inch (serves 6-8)', value: '6 inch', basePrice: 45 },
    { label: '8 inch (serves 12-16)', value: '8 inch', basePrice: 65 },
    { label: '10 inch (serves 20-25)', value: '10 inch', basePrice: 90 },
    { label: '12 inch (serves 30-40)', value: '12 inch', basePrice: 125 }
  ];

  const frostingOptions = [
    { name: 'Rustic Buttercream', cost: 0, color: '#FFFAFA', desc: 'Soft, textured, semi-naked modern look.' },
    { name: 'Pristine White Fondant', cost: 15, color: '#FFFFFF', desc: 'Flawless, smooth silk finish suitable for painting.' },
    { name: 'Metallic Gold-Splattered Buttercream', cost: 25, color: '#D4AF37', desc: 'Textured frosting with luxurious hand-splattered gold leaf.' },
    { name: 'Velvet Espresso Ganache', cost: 10, color: '#3d2314', desc: 'Thick whipped chocolate and coffee glaze.' }
  ];

  const fillingOptions = [
    'Salted Caramel Cream',
    'White Chocolate Ganache',
    'Fresh Berry Compote',
    'Hazelnut Praline Paste',
    'Tahitian Vanilla Bean Custard'
  ];

  const premiumDecorations = [
    { name: 'Edible 24k Gold Leaf Accents', price: 15, emoji: '✨' },
    { name: 'Fresh Seasonal Organic Florals', price: 12, emoji: '🌸' },
    { name: 'Handcrafted Chocolate Sail Shards', price: 10, emoji: '🍫' },
    { name: 'Macaron Cascade Wrap', price: 18, emoji: '🍬' },
    { name: 'Sparkler Fountain Candles', price: 5, emoji: '🎆' }
  ];

  // Price Calculation Engine
  const calculatedPrice = useMemo(() => {
    // 1. Get base price of the selected size
    const sizeObj = sizeOptions.find(s => s.value === size);
    let total = sizeObj ? sizeObj.basePrice : 65;

    // 2. Tiers multiplier
    if (tiers === 2) total *= 1.7; // 2 tiers is 1.7x base
    if (tiers === 3) total *= 2.4; // 3 tiers is 2.4x base

    // 3. Frosting add-on
    const frostingObj = frostingOptions.find(f => f.name === frosting);
    if (frostingObj) total += frostingObj.cost;

    // 4. Decoration add-ons
    decorations.forEach(decName => {
      const decObj = premiumDecorations.find(d => d.name === decName);
      if (decObj) total += decObj.price;
    });

    return Math.round(total * 100) / 100;
  }, [tiers, size, frosting, decorations]);

  const handleDecorationToggle = (name: string) => {
    if (decorations.includes(name)) {
      setDecorations(decorations.filter(d => d !== name));
    } else {
      setDecorations([...decorations, name]);
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone || !deliveryDate) {
      alert('Please fill in all contact and delivery details first!');
      return;
    }
    setIsSubmitted(true);
  };

  const handleAddToCart = () => {
    const customCake: CustomCakeDetails = {
      tiers,
      size,
      flavor,
      frosting,
      filling,
      message,
      decorations,
      deliveryDate
    };
    onAddCustomCakeToCart(customCake, calculatedPrice);
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2500);
  };

  // Helper for virtual visual colors
  const activeFlavorColor = flavorOptions.find(f => f.name === flavor)?.color || '#4E2F1D';
  const activeFrostingColor = frostingOptions.find(f => f.name === frosting)?.color || '#FFFAFA';

  return (
    <section id="planner" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-[-10%] w-96 h-96 bg-gold-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-96 h-96 bg-choco-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="block text-xs font-bold uppercase tracking-widest text-gold-600 font-sans flex items-center justify-center space-x-1.5">
            <Sparkles className="w-4 h-4 fill-gold-500 text-gold-500 animate-pulse" />
            <span>Design Studio</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-choco-950">
            Interactive Custom Cake Planner
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mt-2" />
          <p className="text-choco-600 font-sans text-sm sm:text-base leading-relaxed">
            Customize every layer, size, filling, and premium decoration to generate an instant cost estimate and design your dream cake.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Customization Selections */}
          <div className="lg:col-span-7 space-y-8 bg-gold-50/50 border border-gold-100 p-6 sm:p-8 rounded-3xl shadow-sm">
            
            {/* 1. Tiers Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-choco-900 uppercase tracking-wider">
                1. Select Cake Tiers
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((t) => (
                  <button
                    id={`tier-select-${t}`}
                    key={t}
                    type="button"
                    onClick={() => setTiers(t)}
                    className={`py-3 rounded-xl border font-bold text-sm transition-all duration-300 flex flex-col items-center justify-center space-y-1 ${
                      tiers === t
                        ? 'bg-choco-900 border-choco-900 text-white shadow-md'
                        : 'bg-white border-gold-200/60 text-choco-900 hover:bg-gold-50'
                    }`}
                  >
                    <span className="text-xl">🎂</span>
                    <span>{t} Tier{t > 1 ? 's' : ''}</span>
                    <span className="text-[10px] font-normal opacity-75">
                      {t === 1 ? 'Base' : t === 2 ? '1.7x Price' : '2.4x Price'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Size Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-choco-900 uppercase tracking-wider">
                2. Base Layer Diameter (Size)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sizeOptions.map((option) => (
                  <button
                    id={`size-select-${option.value}`}
                    key={option.value}
                    type="button"
                    onClick={() => setSize(option.value)}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all duration-300 text-center flex flex-col justify-center h-16 ${
                      size === option.value
                        ? 'bg-gold-500 border-gold-500 text-white shadow-md'
                        : 'bg-white border-gold-200/60 text-choco-900 hover:bg-gold-50'
                    }`}
                  >
                    <span>{option.label}</span>
                    <span className="text-[10px] font-normal block mt-1 opacity-90">
                      Base: ${option.basePrice}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Sponge Flavor Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-choco-900 uppercase tracking-wider">
                3. Premium Sponge Flavor
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {flavorOptions.map((option) => (
                  <button
                    id={`flavor-select-${option.name}`}
                    key={option.name}
                    type="button"
                    onClick={() => setFlavor(option.name)}
                    className={`p-3 rounded-xl border text-left transition-all duration-300 flex items-start space-x-3 ${
                      flavor === option.name
                        ? 'bg-white border-gold-500 ring-2 ring-gold-400 shadow-md'
                        : 'bg-white border-gold-200/60 text-choco-900 hover:bg-gold-50'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border border-choco-900/10 flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: option.color }}
                    />
                    <div>
                      <span className="block font-bold text-sm text-choco-950">{option.name}</span>
                      <span className="block text-xs text-choco-500 leading-normal font-sans mt-0.5">
                        {option.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Frosting Style Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-choco-900 uppercase tracking-wider">
                4. Outer Frosting & Finishes
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {frostingOptions.map((option) => (
                  <button
                    id={`frosting-select-${option.name}`}
                    key={option.name}
                    type="button"
                    onClick={() => setFrosting(option.name)}
                    className={`p-3 rounded-xl border text-left transition-all duration-300 flex items-start space-x-3 ${
                      frosting === option.name
                        ? 'bg-white border-gold-500 ring-2 ring-gold-400 shadow-md'
                        : 'bg-white border-gold-200/60 text-choco-900 hover:bg-gold-50'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-md border border-choco-900/10 flex-shrink-0 mt-0.5 shadow-inner"
                      style={{ backgroundColor: option.color }}
                    />
                    <div>
                      <span className="block font-bold text-sm text-choco-950">
                        {option.name} {option.cost > 0 && `(+$${option.cost})`}
                      </span>
                      <span className="block text-xs text-choco-500 leading-normal font-sans mt-0.5">
                        {option.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Filling Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-choco-900 uppercase tracking-wider">
                5. Mid-Layer Filling Cream
              </label>
              <div className="flex flex-wrap gap-2">
                {fillingOptions.map((fill) => (
                  <button
                    id={`filling-select-${fill}`}
                    key={fill}
                    type="button"
                    onClick={() => setFilling(fill)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold border transition-all duration-300 ${
                      filling === fill
                        ? 'bg-choco-900 border-choco-900 text-white shadow-sm'
                        : 'bg-white border-gold-200/60 text-choco-800 hover:bg-gold-50'
                    }`}
                  >
                    {fill}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Premium Add-on Decorations */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-choco-900 uppercase tracking-wider">
                6. Premium Artisanal Decorations (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {premiumDecorations.map((dec) => {
                  const isChecked = decorations.includes(dec.name);
                  return (
                    <button
                      id={`dec-toggle-${dec.name}`}
                      key={dec.name}
                      type="button"
                      onClick={() => handleDecorationToggle(dec.name)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex items-center justify-between ${
                        isChecked
                          ? 'bg-gold-100 border-gold-400 text-choco-950 font-semibold'
                          : 'bg-white border-gold-200/60 text-choco-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-base">{dec.emoji}</span>
                        <span className="text-xs font-bold">{dec.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gold-600 font-serif">
                        +${dec.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. Writing Message on Cake */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-choco-900 uppercase tracking-wider">
                7. Custom Writing / Board Message (Free)
              </label>
              <input
                id="planner-message-input"
                type="text"
                placeholder="e.g. 'Happy Birthday Sophie! 🌸' or 'Happily Ever After'"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 rounded-xl border border-gold-200 text-sm text-choco-950 placeholder-choco-400 focus:outline-none focus:border-gold-500 bg-white"
                maxLength={50}
              />
              <span className="text-[10px] text-choco-400 block text-right font-medium">
                {50 - message.length} characters left
              </span>
            </div>

          </div>

          {/* Right Column: Visualizer, Cost Summary & Inquiry Form */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            
            {/* Visualizer Block */}
            <div className="bg-gold-50 border border-gold-200 rounded-3xl p-6 text-center space-y-6 shadow-sm overflow-hidden relative">
              <span className="text-[10px] tracking-widest font-bold uppercase text-choco-400 block">
                Interactive Layer Virtualizer
              </span>

              {/* Stack representation */}
              <div className="h-64 flex flex-col justify-end items-center relative py-6">
                
                {/* 3 Tiers Stack */}
                <div className="space-y-1.5 flex flex-col items-center w-full max-w-[240px]">
                  {/* Tier 3 (Top) */}
                  {tiers >= 3 && (
                    <motion.div
                      id="visual-tier-3"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="h-10 rounded-lg shadow-md border-b-2 border-black/10 transition-colors duration-500"
                      style={{
                        backgroundColor: activeFrostingColor,
                        width: '45%',
                        boxShadow: `0 4px 6px -1px rgba(0,0,0,0.1), inset 0 -4px 0 0 ${activeFlavorColor}`
                      }}
                    />
                  )}

                  {/* Tier 2 (Middle) */}
                  {tiers >= 2 && (
                    <motion.div
                      id="visual-tier-2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="h-12 rounded-lg shadow-md border-b-2 border-black/10 transition-colors duration-500"
                      style={{
                        backgroundColor: activeFrostingColor,
                        width: '70%',
                        boxShadow: `0 4px 6px -1px rgba(0,0,0,0.1), inset 0 -5px 0 0 ${activeFlavorColor}`
                      }}
                    />
                  )}

                  {/* Tier 1 (Base) */}
                  <motion.div
                    id="visual-tier-1"
                    className="h-14 rounded-lg shadow-md border-b-2 border-black/10 transition-colors duration-500"
                    style={{
                      backgroundColor: activeFrostingColor,
                      width: '100%',
                      boxShadow: `0 4px 6px -1px rgba(0,0,0,0.1), inset 0 -6px 0 0 ${activeFlavorColor}`
                    }}
                  />
                </div>

                {/* Cake Stand Stand */}
                <div className="w-[110%] max-w-[280px] h-3 bg-neutral-300 rounded-full shadow-inner" />
                <div className="w-24 h-6 bg-neutral-200 rounded-b-xl border-t border-neutral-300" />
                
                {/* Visual decorations indicator */}
                {decorations.length > 0 && (
                  <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-1 justify-center pointer-events-none">
                    {decorations.map((d, i) => {
                      const emoji = premiumDecorations.find(pd => pd.name === d)?.emoji || '✨';
                      return (
                        <span key={i} className="text-sm bg-white/95 px-2 py-0.5 rounded-full shadow-sm border border-gold-100 animate-bounce">
                          {emoji}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Message Banner on Cake board */}
              {message && (
                <div className="bg-white px-4 py-2 rounded-xl border border-dashed border-gold-300 inline-block max-w-full text-xs font-serif italic text-choco-800">
                  🖋️ "{message}"
                </div>
              )}

              {/* Specifications badge row */}
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-choco-700 bg-white/80 p-3 rounded-2xl border border-gold-100">
                <div className="text-left">
                  <span className="text-choco-400 block uppercase text-[9px] font-bold">Base Flavour</span>
                  <span className="truncate block font-bold text-choco-950">{flavor}</span>
                </div>
                <div className="text-left border-l border-gold-100 pl-3">
                  <span className="text-choco-400 block uppercase text-[9px] font-bold">Mid Filling</span>
                  <span className="truncate block font-bold text-choco-950">{filling}</span>
                </div>
              </div>
            </div>

            {/* Price invoice & cart submission */}
            <div className="bg-choco-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative border border-gold-500/20">
              
              {/* Gold Ribbon Decorative */}
              <div className="absolute top-0 right-8 w-12 h-16 bg-gold-500 rounded-b-lg flex flex-col justify-end pb-2 items-center text-[10px] font-bold text-white shadow-md">
                <span>EST</span>
              </div>

              <h4 className="font-serif font-bold text-xl text-gold-300">
                Inquiry & Order Summary
              </h4>

              <div className="space-y-3.5 text-sm border-b border-white/15 pb-5">
                <div className="flex justify-between">
                  <span className="text-neutral-300">{tiers} Tier cake ({size})</span>
                  <span className="font-bold text-gold-300">
                    ${(sizeOptions.find(s => s.value === size)?.basePrice || 65) * (tiers === 1 ? 1 : tiers === 2 ? 1.7 : 2.4)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-300">Frosting Finish: {frosting}</span>
                  <span className="font-bold text-gold-300">
                    ${frostingOptions.find(f => f.name === frosting)?.cost || 0}
                  </span>
                </div>

                {decorations.length > 0 && (
                  <div className="space-y-1.5 pl-3 border-l border-white/10">
                    {decorations.map((d, idx) => {
                      const cost = premiumDecorations.find(pd => pd.name === d)?.price || 0;
                      return (
                        <div key={idx} className="flex justify-between text-xs text-neutral-400">
                          <span>+ {d}</span>
                          <span>${cost}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t border-white/10 text-base font-bold">
                  <span className="text-white">Estimated Price:</span>
                  <span className="text-gold-400 font-serif text-2xl">${calculatedPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Action buttons or Inquiry details */}
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmitInquiry} className="space-y-4">
                    <h5 className="text-xs font-bold uppercase text-gold-300 tracking-wider flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-gold-400" /> Enter Delivery Info & Contact
                    </h5>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                          Pickup/Delivery Date
                        </label>
                        <input
                          id="planner-delivery-date"
                          type="date"
                          required
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white focus:outline-none focus:border-gold-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                          Full Name
                        </label>
                        <input
                          id="planner-customer-name"
                          type="text"
                          required
                          placeholder="Your Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-white/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                          Email Address
                        </label>
                        <input
                          id="planner-customer-email"
                          type="email"
                          required
                          placeholder="name@email.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-white/40"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                          Phone Number
                        </label>
                        <input
                          id="planner-customer-phone"
                          type="tel"
                          required
                          placeholder="e.g. +44 7123..."
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-white/40"
                        />
                      </div>
                    </div>

                    <button
                      id="planner-submit-inquiry-btn"
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Cake Inquiry</span>
                    </button>
                  </form>
                ) : (
                  <motion.div
                    id="planner-success-panel"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4 text-center py-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="font-bold text-base text-white">Inquiry Submitted Successfully!</h5>
                      <p className="text-xs text-neutral-300 font-sans mt-1">
                        Thank you, {customerName}. Our lead wedding & custom pastry chef will review your design and reach out within 24 hours at <strong>{customerPhone}</strong>.
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-2">
                      <p className="text-[11px] text-neutral-400 mb-3 font-sans">
                        Would you like to lock this build in and add it to your online ordering basket for instant pre-order processing?
                      </p>

                      <div className="flex gap-2">
                        <button
                          id="planner-reset-btn"
                          type="button"
                          onClick={() => {
                            setIsSubmitted(false);
                            setCustomerName('');
                            setCustomerEmail('');
                            setCustomerPhone('');
                          }}
                          className="flex-1 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/5 text-xs font-semibold"
                        >
                          Modify Cake Design
                        </button>
                        
                        <button
                          id="planner-add-cart-btn"
                          type="button"
                          onClick={handleAddToCart}
                          className="flex-1 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-white text-xs font-semibold shadow-md flex items-center justify-center space-x-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{isAddedToCart ? 'Added!' : 'Add Cake to Basket'}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
