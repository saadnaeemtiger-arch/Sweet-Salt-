import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, MapPin, Truck, Check, Sparkles, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  
  // Checkout & coupon states
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // decimal multiplier
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);
  const [checkoutOption, setCheckoutOption] = useState<'pickup' | 'delivery'>('pickup');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [address, setAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, current) => {
      return acc + (current.item.price * current.quantity);
    }, 0);
  }, [cartItems]);

  const deliveryFee = checkoutOption === 'delivery' ? 5.99 : 0;
  
  const discountAmount = useMemo(() => {
    return subtotal * appliedDiscount;
  }, [subtotal, appliedDiscount]);

  const finalTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + deliveryFee);
  }, [subtotal, discountAmount, deliveryFee]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'BAKEFRESH') {
      setAppliedDiscount(0.15); // 15% off
      setCouponFeedback('Successfully applied 15% discount!');
    } else {
      setCouponFeedback('Invalid coupon code. Try "BAKEFRESH"');
    }
    setTimeout(() => {
      setCouponFeedback(null);
    }, 3000);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (checkoutOption === 'delivery' && !address) {
      alert('Please provide a delivery address!');
      return;
    }
    setCheckoutComplete(true);
  };

  const handleFinishReceiptClose = () => {
    setCheckoutComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop filter overlay */}
            <motion.div
              id="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-choco-950 z-50 backdrop-blur-sm"
            />

            {/* Sidebar drawer container */}
            <motion.div
              id="cart-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[480px] max-w-full bg-gold-50 shadow-2xl z-50 flex flex-col overflow-hidden border-l border-gold-200"
            >
              {/* Header */}
              <div className="p-6 border-b border-gold-200/50 flex items-center justify-between bg-white">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-gold-100 text-gold-600 rounded-xl">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-choco-950">Your Baking Basket</h3>
                    <span className="text-xs text-choco-400 font-sans font-medium">
                      {cartItems.length} specialty item{cartItems.length === 1 ? '' : 's'} loaded
                    </span>
                  </div>
                </div>

                <button
                  id="close-cart-btn"
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-gold-100 text-choco-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                
                {/* List of Cart Items */}
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {cartItems.map((cartItem) => (
                      <motion.div
                        id={`cart-item-row-${cartItem.id}`}
                        key={cartItem.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white p-4 rounded-2xl border border-gold-200/50 flex space-x-3 shadow-sm relative group"
                      >
                        {/* Image */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gold-50 flex-shrink-0 border border-gold-100">
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Text and Actions block */}
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-serif font-bold text-sm text-choco-950 leading-snug truncate max-w-[200px]">
                                {cartItem.item.name}
                              </h4>
                              <span className="font-serif font-bold text-sm text-choco-900 flex-shrink-0">
                                ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                              </span>
                            </div>

                            {/* Optional custom notes rendering */}
                            {cartItem.customNotes && (
                              <p className="text-[11px] text-gold-600 font-sans italic mt-1 bg-gold-50/50 p-1 rounded border border-dashed border-gold-200 truncate">
                                📝 Notes: {cartItem.customNotes}
                              </p>
                            )}

                            {/* Custom cake planner metadata */}
                            {cartItem.isCustomCake && cartItem.customCakeDetails && (
                              <div className="text-[10px] bg-choco-950 text-gold-100 p-2 rounded-lg mt-1 space-y-0.5 leading-tight">
                                <span className="block font-bold text-gold-300">🎂 Custom Design:</span>
                                <span className="block">Flavour: {cartItem.customCakeDetails.flavor}</span>
                                <span className="block">Frosting: {cartItem.customCakeDetails.frosting}</span>
                                <span className="block">Filling: {cartItem.customCakeDetails.filling}</span>
                                {cartItem.customCakeDetails.message && <span className="block italic">" {cartItem.customCakeDetails.message} "</span>}
                              </div>
                            )}
                          </div>

                          {/* Quantity control / Remove bar */}
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gold-100/30">
                            <div className="flex items-center space-x-2 bg-gold-50 border border-gold-100 rounded-lg px-2 py-0.5">
                              <button
                                id={`cart-minus-btn-${cartItem.id}`}
                                onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                                className="text-choco-900 hover:text-gold-500 font-bold px-1.5 text-xs"
                                disabled={cartItem.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="font-bold text-xs text-choco-900 min-w-[12px] text-center">
                                {cartItem.quantity}
                              </span>
                              <button
                                id={`cart-plus-btn-${cartItem.id}`}
                                onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                                className="text-choco-900 hover:text-gold-500 font-bold px-1.5 text-xs"
                              >
                                +
                              </button>
                            </div>

                            <button
                              id={`cart-delete-btn-${cartItem.id}`}
                              onClick={() => onRemoveItem(cartItem.id)}
                              className="text-choco-300 hover:text-red-500 transition-colors p-1"
                              aria-label="Delete item from cart"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {cartItems.length === 0 && (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center text-choco-400 mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-serif font-bold text-lg text-choco-900">Your Basket is Empty</h4>
                    <p className="text-xs text-choco-500 max-w-xs mx-auto font-sans">
                      Browse our sweets and treats menu or use our Custom Cake Planner to design your own cake layer.
                    </p>
                    <button
                      id="cart-browse-btn"
                      onClick={onClose}
                      className="px-6 py-2 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs"
                    >
                      Browse Treats Menu
                    </button>
                  </div>
                )}

                {cartItems.length > 0 && (
                  <>
                    {/* Pickup vs. Delivery Toggle */}
                    <div className="bg-white p-4 rounded-2xl border border-gold-200/50 space-y-3">
                      <span className="block text-xs font-bold text-choco-900 uppercase tracking-wider">
                        Select Order Mode
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          id="mode-pickup-btn"
                          onClick={() => setCheckoutOption('pickup')}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                            checkoutOption === 'pickup'
                              ? 'bg-choco-950 border-choco-950 text-white shadow-sm'
                              : 'bg-gold-50 border-gold-200 text-choco-700 hover:bg-gold-100'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Bakery Pickup</span>
                        </button>

                        <button
                          id="mode-delivery-btn"
                          onClick={() => setCheckoutOption('delivery')}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                            checkoutOption === 'delivery'
                              ? 'bg-choco-950 border-choco-950 text-white shadow-sm'
                              : 'bg-gold-50 border-gold-200 text-choco-700 hover:bg-gold-100'
                          }`}
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Home Delivery (+$5.99)</span>
                        </button>
                      </div>
                    </div>

                    {/* Applied address if delivery */}
                    {checkoutOption === 'delivery' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-2 bg-white p-4 rounded-2xl border border-gold-200/50"
                      >
                        <label className="block text-xs font-bold text-choco-900 uppercase tracking-wider">
                          Delivery Address (UK/Local)
                        </label>
                        <input
                          id="cart-address-input"
                          type="text"
                          required
                          placeholder="e.g. 10 Downing Street, London"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-gold-50 border border-gold-200 text-xs text-choco-950 focus:outline-none focus:border-gold-500"
                        />
                      </motion.div>
                    )}

                    {/* Coupon Input Block */}
                    <form onSubmit={handleApplyCoupon} className="flex gap-2 bg-white p-3.5 rounded-2xl border border-gold-200/50">
                      <div className="relative flex-grow">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-choco-400 w-4 h-4" />
                        <input
                          id="cart-coupon-input"
                          type="text"
                          placeholder="Coupon Code (e.g. BAKEFRESH)"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full pl-9 pr-2 py-2 text-xs rounded-xl bg-gold-50 border border-gold-200 focus:outline-none focus:border-gold-500 uppercase font-semibold text-choco-950 placeholder-choco-400"
                        />
                      </div>
                      <button
                        id="apply-coupon-btn"
                        type="submit"
                        className="px-4 py-2 bg-choco-900 hover:bg-choco-800 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Apply
                      </button>
                    </form>

                    {couponFeedback && (
                      <div className={`p-2.5 rounded-xl text-[11px] font-semibold text-center ${
                        couponFeedback.includes('Invalid') 
                          ? 'bg-rose-50 text-rose-800 border border-rose-100' 
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                      }`}>
                        {couponFeedback}
                      </div>
                    )}
                  </>
                )}

              </div>

              {/* Invoice footer panel */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-white border-t border-gold-200/80 space-y-4 shadow-inner">
                  <div className="space-y-1.5 text-xs text-choco-600">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Discount Applied (15%):</span>
                        <span>- ${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    {checkoutOption === 'delivery' && (
                      <div className="flex justify-between">
                        <span>Courier Delivery Service Fee:</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-bold text-choco-950 pt-2 border-t border-gold-100">
                      <span>Grand Total:</span>
                      <span className="text-xl font-serif text-gold-600 font-bold">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    id="checkout-submit-btn"
                    onClick={handleCheckoutSubmit}
                    className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold rounded-full shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Secured Checkout</span>
                  </button>
                  <p className="text-[10px] text-choco-400 text-center font-sans">
                    🔐 256-bit Secure Sockets Layer Encryption active
                  </p>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Complete Receipt Modal */}
      <AnimatePresence>
        {checkoutComplete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              id="receipt-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="absolute inset-0 bg-black"
            />

            <motion.div
              id="receipt-modal-panel"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gold-200 max-w-md w-full relative z-[101] text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600 block">
                  Sweet&Salt HUT Ordering
                </span>
                <h3 className="font-serif font-bold text-2xl text-choco-950">Order Placed Successfully!</h3>
                <p className="text-sm text-choco-600 font-sans leading-relaxed">
                  Your artisanal baking ticket was created. A chef has been assigned to prepare your items for {checkoutOption === 'pickup' ? 'bakery pickup' : 'home delivery'}.
                </p>
              </div>

              {/* Order Invoice Spec details */}
              <div className="bg-gold-50/50 p-4 rounded-2xl border border-gold-200/50 text-left space-y-2 text-xs text-choco-800">
                <div className="flex justify-between font-bold text-choco-950 border-b border-gold-200/40 pb-2">
                  <span>Order ID:</span>
                  <span className="font-mono">#SSH-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mode:</span>
                  <span className="capitalize font-bold">{checkoutOption}</span>
                </div>
                {checkoutOption === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Address:</span>
                    <span className="font-bold truncate max-w-[200px]">{address}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-choco-950 border-t border-gold-200/40 pt-2 text-sm">
                  <span>Total charged:</span>
                  <span className="text-gold-600 font-serif text-lg">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-[11px] text-choco-400 font-sans">
                Please show this ticket on pickup or to the driver on delivery. For any urgent order modification requests, WhatsApp or call us instantly.
              </p>

              <button
                id="close-receipt-btn"
                onClick={handleFinishReceiptClose}
                className="w-full py-3 rounded-full bg-choco-950 hover:bg-choco-900 text-white text-xs sm:text-sm font-semibold shadow-md transition-colors"
              >
                Return to Bakery Shop
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
