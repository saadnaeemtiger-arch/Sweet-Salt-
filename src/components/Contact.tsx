import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Clock, MapPin, Send, MessageCircle, Check, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields first!');
      return;
    }

    // Process form
    setIsSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    });

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hello Sweet&Salt HUT! I'd like to ask about pre-ordering baked goods or custom cakes.");
    window.open(`https://wa.me/447123456789?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-24 right-[-10%] w-96 h-96 bg-gold-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="block text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
            Connect With Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-choco-950">
            Visit Our Bakery or Drop a Line
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mt-2" />
          <p className="text-choco-600 font-sans text-sm sm:text-base leading-relaxed">
            Have a question, custom request, or want to discuss a catering project? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left: Contact Info cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Phone card */}
              <div className="bg-gold-50/50 p-6 rounded-2xl border border-gold-200/50 flex items-start space-x-4">
                <div className="p-3 bg-gold-100 text-gold-600 rounded-xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-choco-950">Call Our Bakery</h4>
                  <p className="text-sm text-choco-600 mt-1 font-sans">+44 20 7946 0192</p>
                  <p className="text-xs text-choco-400 mt-0.5">Pre-orders, custom updates, catering inquiries</p>
                </div>
              </div>

              {/* WhatsApp Floating/Direct Action */}
              <div className="bg-emerald-50/40 p-6 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-500 text-white rounded-xl">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-emerald-950">Direct WhatsApp</h4>
                    <p className="text-xs text-emerald-700 mt-0.5 font-sans">Chat instantly with our lead decorator</p>
                  </div>
                </div>
                <button
                  id="contact-whatsapp-btn"
                  onClick={handleWhatsAppClick}
                  className="px-4.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WA</span>
                </button>
              </div>

              {/* Email card */}
              <div className="bg-gold-50/50 p-6 rounded-2xl border border-gold-200/50 flex items-start space-x-4">
                <div className="p-3 bg-gold-100 text-gold-600 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-choco-950">Email Chef Box</h4>
                  <p className="text-sm text-choco-600 mt-1 font-sans">hello@sweetandsalthut.com</p>
                  <p className="text-xs text-choco-400 mt-0.5">General questions, invoices, job postings</p>
                </div>
              </div>

              {/* Location & Hours card */}
              <div className="bg-gold-50/50 p-6 rounded-2xl border border-gold-200/50 flex items-start space-x-4">
                <div className="p-3 bg-gold-100 text-gold-600 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h4 className="font-serif font-bold text-base text-choco-950">Hours & Location</h4>
                  <p className="text-sm text-choco-800 mt-2 font-serif flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-gold-500 mr-1" />
                    <span>48 Baker Street, London, W1U 7DF</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-choco-600 border-t border-gold-200/20 pt-3">
                    <div>
                      <span className="block font-bold">Mon - Fri:</span>
                      <span>7:00 AM - 7:00 PM</span>
                    </div>
                    <div>
                      <span className="block font-bold">Sat - Sun:</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Micro Social icons panel */}
            <div className="pt-6 border-t border-gold-100 flex items-center space-x-4 justify-center lg:justify-start">
              <span className="text-xs font-bold uppercase text-choco-400 tracking-wider">Follow Us:</span>
              <a href="#" className="p-2 rounded-full bg-gold-50 hover:bg-gold-500 hover:text-white text-choco-500 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gold-50 hover:bg-gold-500 hover:text-white text-choco-500 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gold-50 hover:bg-gold-500 hover:text-white text-choco-500 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right: Map Placeholder & Message Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Google Map location placeholder */}
            <div className="h-64 rounded-3xl overflow-hidden border border-gold-200 bg-gold-100/50 shadow-inner relative flex items-center justify-center p-6 text-center">
              {/* Stylized vector map background placeholder */}
              <div className="absolute inset-0 bg-[radial-gradient(#d1baac_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />
              
              <div className="relative z-10 space-y-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 shadow-md mx-auto animate-bounce">
                  <MapPin className="w-6 h-6 fill-red-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-choco-950">Google Maps Location</h4>
                  <p className="text-xs text-choco-500 font-sans mt-0.5">Sweet&Salt HUT • 48 Baker Street, London</p>
                </div>
                <button
                  id="open-maps-btn"
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  className="px-4 py-1.5 bg-white hover:bg-gold-50 border border-gold-200 text-gold-700 font-bold text-xs rounded-full transition-colors"
                >
                  View Route Planner
                </button>
              </div>
            </div>

            {/* General Inquiry Form */}
            <div className="bg-gold-50/50 border border-gold-200/50 p-6 sm:p-8 rounded-3xl shadow-sm">
              <h4 className="font-serif font-bold text-lg text-choco-950 mb-4">
                Send a Direct Message
              </h4>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-choco-700 mb-1">
                      Your Name
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gold-200 text-sm focus:outline-none focus:border-gold-500 bg-white text-choco-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-choco-700 mb-1">
                      Your Email
                    </label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gold-200 text-sm focus:outline-none focus:border-gold-500 bg-white text-choco-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-choco-700 mb-1">
                    Subject Matter
                  </label>
                  <select
                    id="contact-subject-select"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gold-200 text-sm focus:outline-none focus:border-gold-500 bg-white text-choco-900"
                  >
                    <option>General Inquiry</option>
                    <option>Wedding & Big Celebration Cake Catering</option>
                    <option>Dietary Allergy Accommodation</option>
                    <option>Feedback or Suggestion</option>
                    <option>Corporate Catering Order</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-choco-700 mb-1">
                    Your Message / Request
                  </label>
                  <textarea
                    id="contact-message-input"
                    required
                    placeholder="Describe your project, question, or pastry requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl border border-gold-200 text-sm focus:outline-none focus:border-gold-500 bg-white h-28 resize-none text-choco-900"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      id="contact-success-banner"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 font-semibold text-xs flex items-center space-x-2"
                    >
                      <Check className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
                      <span>Thank you! Your message was received. Our team will email back within 12 hours.</span>
                    </motion.div>
                  ) : (
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-choco-950 hover:bg-choco-900 text-white font-semibold text-xs sm:text-sm transition-colors duration-300 shadow-md flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4 text-gold-400" />
                      <span>Send Direct Message</span>
                    </button>
                  )}
                </AnimatePresence>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
