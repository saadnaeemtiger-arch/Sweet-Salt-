import React from 'react';
import { motion } from 'motion/react';
import { Flame, Leaf, Cake, Zap, Shield, HeartHandshake, BadgeCheck } from 'lucide-react';

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: <Flame className="w-6 h-6 text-gold-500" />,
      title: 'Freshly Baked Daily',
      description: 'Our ovens run multiple times a day. You always receive warm bread and crisp pastries straight from baking trays.'
    },
    {
      icon: <Leaf className="w-6 h-6 text-gold-500" />,
      title: 'Premium Ingredients',
      description: 'We source pure butter, high-protein grains, organic berries, and single-origin chocolate with no artificial additions.'
    },
    {
      icon: <Cake className="w-6 h-6 text-gold-500" />,
      title: 'Bespoke Custom Orders',
      description: 'Choose your tiers, flavors, frostings, and designs. We bring your dream celebration cake to vivid, delicious life.'
    },
    {
      icon: <Zap className="w-6 h-6 text-gold-500" />,
      title: 'Fast & Secure Service',
      description: 'Quick pre-orders, timely pickup windows, and refrigerated custom cake courier delivery to keep orders cold and intact.'
    },
    {
      icon: <Shield className="w-6 h-6 text-gold-500" />,
      title: '100% Hygienic Kitchen',
      description: 'A spotless, open-concept kitchen facility. We maintain strict hygiene protocols and quality inspections at every step.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-gold-500" />,
      title: 'Warm & Friendly Staff',
      description: 'Baking is a service of love. Our team is always eager to customize your sandwich, suggest pairings, or adjust spices.'
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-gold-500" />,
      title: 'Satisfaction Guaranteed',
      description: 'We stand behind our bakes. If an item does not meet your expectations, we will gladly exchange it or make it right.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gold-100/50 relative overflow-hidden">
      {/* Dynamic background element */}
      <div className="absolute right-0 top-0 w-[30%] h-[30%] rounded-full bg-gold-200/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="block text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
            Our Baker Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-choco-950">
            Why Sweet&Salt HUT is Simply Better
          </h2>
          <div className="h-[2px] w-12 bg-gold-500 mx-auto mt-2" />
          <p className="text-choco-600 font-sans text-sm sm:text-base leading-relaxed">
            We are dedicated to elevating your everyday moments through impeccable baking standards, warm customer service, and exquisite design.
          </p>
        </div>

        {/* Bento/Grid Layout for Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            // Give one card a highlighted style to create beautiful variety (Why Choose Us, like custom cakes)
            const isHighlighted = item.title === 'Bespoke Custom Orders';
            
            return (
              <motion.div
                id={`why-card-${index}`}
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  isHighlighted 
                    ? 'bg-choco-900 border-choco-900 text-white shadow-md md:col-span-2 lg:col-span-1' 
                    : 'bg-white border-gold-100 text-choco-950'
                }`}
              >
                <div className={`p-3 rounded-xl inline-block mb-4 ${
                  isHighlighted ? 'bg-gold-500 text-white' : 'bg-gold-50 text-gold-600'
                }`}>
                  {item.icon}
                </div>
                
                <h3 className={`font-serif text-lg font-bold mb-2 ${
                  isHighlighted ? 'text-gold-300' : 'text-choco-950'
                }`}>
                  {item.title}
                </h3>
                
                <p className={`text-sm leading-relaxed font-sans ${
                  isHighlighted ? 'text-choco-100' : 'text-choco-600'
                }`}>
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
