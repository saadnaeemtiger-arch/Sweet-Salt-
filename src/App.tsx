import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Menu from './components/Menu';
import CustomCakePlanner from './components/CustomCakePlanner';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { CartItem, MenuItem, CustomCakeDetails } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from local storage on initial mount if available
  useEffect(() => {
    const savedCart = localStorage.getItem('sweet_and_salt_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart', e);
      }
    }
  }, []);

  // Sync cart to local storage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('sweet_and_salt_cart', JSON.stringify(newCart));
  };

  // Add standard product item to cart
  const handleAddToCart = (item: MenuItem, quantity: number, notes?: string) => {
    const cartId = notes ? `${item.id}-${notes.replace(/\s+/g, '-').toLowerCase()}` : item.id;
    
    const existingIndex = cart.findIndex((cartItem) => cartItem.id === cartId);
    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [
        ...cart,
        {
          id: cartId,
          item,
          quantity,
          customNotes: notes,
          isCustomCake: false
        }
      ];
    }
    saveCart(updatedCart);
  };

  // Add custom cake designer build to cart
  const handleAddCustomCakeToCart = (customCake: CustomCakeDetails, estimatedPrice: number) => {
    // Generate a beautiful mock menu item representing this custom cake
    const customCakeItem: MenuItem = {
      id: `custom-cake-item-${Date.now()}`,
      name: `${customCake.tiers} Tier Custom Celebration Cake`,
      description: `Premium sponge: ${customCake.flavor}. Frosting finish: ${customCake.frosting}. Filling layer: ${customCake.filling}. Delivery: ${customCake.deliveryDate}.`,
      price: estimatedPrice,
      category: 'custom',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&auto=format&fit=crop&q=80',
      rating: 5.0
    };

    const newCartItem: CartItem = {
      id: `cart-custom-cake-${Date.now()}`,
      item: customCakeItem,
      quantity: 1,
      isCustomCake: true,
      customCakeDetails: customCake
    };

    const updatedCart = [...cart, newCartItem];
    saveCart(updatedCart);
    setIsCartOpen(true); // Open the cart so they can see their gorgeous custom cake inside!
  };

  // Update item quantity inside cart
  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === id) {
        return { ...cartItem, quantity: qty };
      }
      return cartItem;
    });
    saveCart(updatedCart);
  };

  // Delete item from cart
  const handleRemoveItem = (id: string) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== id);
    saveCart(updatedCart);
  };

  // Clear cart on complete checkout
  const handleClearCart = () => {
    saveCart([]);
  };

  // Smooth scroll helper for navigation clicks
  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartItemCount = cart.reduce((acc, current) => acc + current.quantity, 0);

  return (
    <div className="relative min-h-screen bg-gold-50 selection:bg-gold-500 selection:text-white overflow-x-hidden antialiased">
      {/* Top Banner alert */}
      <div className="bg-choco-950 text-gold-300 text-[10px] sm:text-xs font-bold py-2 px-4 text-center tracking-widest uppercase relative z-50 border-b border-gold-500/10">
        ✨ Save 15% on your first pre-order! Use code <span className="text-white bg-white/10 px-2 py-0.5 rounded border border-white/15">BAKEFRESH</span> at Checkout ✨
      </div>

      {/* Primary Sticky Header */}
      <Header
        cartCount={totalCartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigation}
      />

      {/* Main content layouts */}
      <main className="space-y-0">
        
        {/* Home/Hero Section */}
        <Hero
          onOrderNow={() => handleNavigation('menu')}
          onContactUs={() => handleNavigation('contact')}
          onExplorePlanner={() => handleNavigation('planner')}
        />

        {/* Brand Heritage About Story */}
        <About />

        {/* Why Choose Us Values Grid */}
        <WhyChooseUs />

        {/* Interactive Baked Treats Menu Catalog */}
        <Menu onAddToCart={handleAddToCart} />

        {/* Exquisite Stacked Custom Cake Studio */}
        <CustomCakePlanner onAddCustomCakeToCart={handleAddCustomCakeToCart} />

        {/* Visual Showcase Gallery Grid */}
        <Gallery />

        {/* Customer Reviews & Form Input */}
        <Testimonials />

        {/* Accordions FAQ Block */}
        <FAQ />

        {/* Geolocation Map & Message Forms */}
        <Contact />

      </main>

      {/* Floating Action WhatsApp Help */}
      <FloatingWhatsApp />

      {/* Footer layout */}
      <Footer onNavigate={handleNavigation} />

      {/* Slides Drawer Cart Panel */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
