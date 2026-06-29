import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Heart, Award, ShieldCheck } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Award className="w-5 h-5 text-gold-500" />,
      title: 'Uncompromised Quality',
      description: 'We import premium butter from Normandy, organic flour from local mills, and handpicked Madagascar vanilla bean pods.'
    },
    {
      icon: <Heart className="w-5 h-5 text-gold-500" />,
      title: 'Handcrafted Tradition',
      description: 'No commercial shortcuts. Every croissant is laminated by hand, and every sourdough loaf undergoes a slow, natural 36-hour fermentation.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold-500" />,
      title: 'Hygienic & Warm Service',
      description: 'Baked in our modern, pristine open-concept kitchen, and served by a friendly, passionate team that loves treating people like family.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-gold-50 rounded-full opacity-40 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Images Grid Block (Left) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-lg border border-gold-100 aspect-[3/4]"
              >
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80"
                  alt="Baker hands dusting flour on fresh sourdough bread"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              
              <div className="bg-gold-500 p-6 rounded-2xl text-white shadow-xl flex flex-col justify-center items-center text-center space-y-2">
                <span className="block text-4xl font-serif font-bold">12+</span>
                <span className="block text-xs uppercase tracking-widest font-semibold">Years of Baking Love</span>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-gold-100 p-6 rounded-2xl border border-gold-200 flex flex-col justify-center items-center text-center space-y-1">
                <span className="text-3xl">🥖</span>
                <span className="block font-serif text-lg font-bold text-choco-950">Daily Fresh</span>
                <span className="block text-xs text-choco-600">Baked fresh 3x daily</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl overflow-hidden shadow-lg border border-gold-100 aspect-[3/4]"
              >
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80"
                  alt="Beautiful golden flaky French pastries"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>

            {/* Accent badge */}
            <div className="absolute -top-6 -left-6 bg-choco-950 text-gold-300 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center font-serif shadow-xl border border-gold-500/20 text-xs font-bold leading-tight uppercase tracking-wider -rotate-12">
              <span>Pure</span>
              <span className="text-white text-base">Art</span>
              <span>Baking</span>
            </div>
          </div>

          {/* About us text details (Right) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="block text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
                Our Story & Commitment
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-choco-950 leading-tight">
                Crafting Joy from Simple, Premium Ingredients
              </h2>
              <div className="h-[2px] w-12 bg-gold-500 mt-2" />
            </div>

            <p className="text-base text-choco-700 leading-relaxed font-sans">
              Founded with a dream to bring authentic European-inspired baking methods to the neighborhood, <strong className="text-choco-950">Sweet&Salt HUT</strong> represents a perfect harmony of sweet luxury and wholesome savory goodness.
            </p>

            <p className="text-base text-choco-700 leading-relaxed font-sans">
              We believe that bread is a living food and dessert is an emotional connection. That is why our team starts kneading, folding, and whipping at 3:00 AM every single morning. We never use artificial preservatives, hydrogenated oils, or pre-made mixes. Every crisp bite, every velvety layer, and every golden crumb is made with uncompromised integrity.
            </p>

            {/* Core Values List */}
            <div className="space-y-4 pt-4 border-t border-gold-100">
              {values.map((val, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-xl bg-gold-100 text-gold-700 mt-0.5 flex-shrink-0">
                    {val.icon}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-choco-950 text-base">
                      {val.title}
                    </h3>
                    <p className="text-sm text-choco-600 font-sans mt-0.5 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
