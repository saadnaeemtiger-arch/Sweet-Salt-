import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, PlusCircle, Check } from 'lucide-react';
import { Testimonial } from '../types';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  
  // Custom review form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewText) {
      alert('Please enter your name and a brief review message!');
      return;
    }

    const reviewObj: Testimonial = {
      id: `custom-t-${Date.now()}`,
      name: newReviewName,
      rating: newReviewRating,
      text: newReviewText,
      date: 'Today',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80' // default friendly user avatar placeholder
    };

    setReviews([reviewObj, ...reviews]);
    setSuccessMsg(true);

    // Reset fields
    setNewReviewName('');
    setNewReviewText('');
    setNewReviewRating(5);

    setTimeout(() => {
      setIsFormOpen(false);
      setSuccessMsg(false);
    }, 2000);
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative floral or blob elements */}
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-gold-200/10 rounded-full blur-3xl" />
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-choco-100/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="block text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
            Our Happy Guests
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-choco-950">
            Loving Words from Bakery Devotees
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mt-2" />
          <p className="text-choco-600 font-sans text-sm sm:text-base leading-relaxed">
            Read real feedback from our community, or add your own experience with Sweet&Salt HUT below.
          </p>
        </div>

        {/* Dynamic Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {reviews.map((t, idx) => (
              <motion.div
                id={`review-card-${t.id}`}
                key={t.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-gold-50/50 p-6 sm:p-8 rounded-3xl border border-gold-200/50 relative shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Gold Quote icon in background */}
                <span className="absolute right-6 top-6 text-6xl text-gold-400/25 font-serif select-none pointer-events-none">
                  “
                </span>

                {/* Star rating block */}
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4.5 h-4.5 ${
                        i < t.rating ? 'text-gold-500 fill-gold-500' : 'text-neutral-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-choco-800 text-sm sm:text-base leading-relaxed mb-6 font-sans italic">
                  "{t.text}"
                </p>

                {/* User Bio panel */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gold-200/30">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gold-200 border border-gold-300 flex-shrink-0">
                    <img src={t.avatar} alt={t.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="block font-serif font-bold text-sm text-choco-950">{t.name}</span>
                    <span className="block text-[10px] text-choco-400 font-sans">{t.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Review Quick trigger button */}
        <div className="mt-12 text-center">
          <AnimatePresence mode="wait">
            {!isFormOpen ? (
              <motion.button
                id="open-review-form-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-choco-950 hover:bg-choco-900 text-white font-semibold text-xs sm:text-sm transition-colors duration-300 shadow-md"
              >
                <PlusCircle className="w-4 h-4 text-gold-400" />
                <span>Share Your Experience</span>
              </motion.button>
            ) : (
              <motion.div
                id="review-form-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="max-w-xl mx-auto bg-gold-50 p-6 sm:p-8 rounded-3xl border border-gold-200 text-left"
              >
                <h3 className="font-serif font-bold text-xl text-choco-950 mb-6 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-gold-500" />
                  <span>Write a Review</span>
                </h3>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-choco-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      id="new-review-name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gold-200 text-sm text-choco-950 focus:outline-none focus:border-gold-500 bg-white"
                      disabled={successMsg}
                    />
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-choco-700 mb-1">
                      Star Rating (1 to 5)
                    </label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          id={`star-btn-${star}`}
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="p-1 rounded hover:scale-110 transition-transform"
                          disabled={successMsg}
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newReviewRating ? 'text-gold-500 fill-gold-500' : 'text-neutral-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review Message Textarea */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-choco-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="new-review-text"
                      required
                      placeholder="How was our freshly baked bread, cakes or customer service? Let us know!"
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      className="w-full p-4 rounded-xl border border-gold-200 text-sm text-choco-950 focus:outline-none focus:border-gold-500 bg-white h-28 resize-none"
                      maxLength={300}
                      disabled={successMsg}
                    />
                    <span className="text-[10px] text-choco-400 block text-right font-medium">
                      {300 - newReviewText.length} characters left
                    </span>
                  </div>

                  {/* Submit review */}
                  <div className="pt-4 border-t border-gold-200/50 flex space-x-3">
                    <button
                      id="cancel-review-btn"
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="flex-1 py-3 rounded-full border border-gold-200 hover:bg-gold-100 text-choco-800 text-xs font-bold"
                      disabled={successMsg}
                    >
                      Cancel
                    </button>
                    
                    <button
                      id="submit-review-btn"
                      type="submit"
                      className="flex-1 py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold shadow-md flex items-center justify-center space-x-2"
                      disabled={successMsg}
                    >
                      {successMsg ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Submitted!</span>
                        </>
                      ) : (
                        <span>Post Review</span>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
