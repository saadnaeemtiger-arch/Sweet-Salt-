import { MenuItem, Testimonial, FAQItem, GalleryItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // --- Cakes ---
  {
    id: 'cake-1',
    name: 'Belgian Chocolate Fudge Gateau',
    description: 'Decadent, rich moist Belgian chocolate cake layers enveloped in velvety smooth chocolate fudge frosting and topped with dark curls.',
    price: 42.00,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
    rating: 4.9
  },
  {
    id: 'cake-2',
    name: 'Red Velvet White Chocolate Dream',
    description: 'Beautiful crimson sponge layers with a touch of premium cocoa, frosted with our signature luxury white chocolate cream cheese.',
    price: 38.50,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1586985289688-ca9cf499340e?w=600&auto=format&fit=crop&q=80',
    rating: 4.8
  },
  {
    id: 'cake-3',
    name: 'Strawberry & Madagascar Vanilla Cream',
    description: 'Light chiffon cake layered with fresh organic strawberries and high-grade Madagascar vanilla bean whipped chantilly cream.',
    price: 36.00,
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1464349110296-4d5023cddf60?w=600&auto=format&fit=crop&q=80',
    rating: 4.7
  },

  // --- Custom Celebration Cakes ---
  {
    id: 'custom-1',
    name: 'Gold Leaf Triple-Tier Wedding Cake',
    description: 'An elegant statement cake covered in flawless white fondant, hand-painted with genuine edible 24k gold leaf and sugar florals.',
    price: 185.00,
    category: 'custom',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&auto=format&fit=crop&q=80',
    rating: 5.0
  },
  {
    id: 'custom-2',
    name: 'Enchanted Forest Celebration Cake',
    description: 'Hand-sculpted buttercream mushrooms, rich forest moss effects, and delicate fondant twigs on a chocolate hazelnut forest trunk theme.',
    price: 120.00,
    category: 'custom',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop&q=80',
    rating: 4.9
  },
  {
    id: 'custom-3',
    name: 'Macaron Cascading Masterpiece',
    description: 'A stylish minimalist cake adorned with a magnificent cascading spiral of multi-colored raspberry, pistachio, and vanilla French macarons.',
    price: 95.00,
    category: 'custom',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&auto=format&fit=crop&q=80',
    rating: 4.9
  },

  // --- Bread ---
  {
    id: 'bread-1',
    name: 'Wild-Yeast Sourdough Boule',
    description: 'Slow-fermented for 36 hours using our 50-year-old sourdough starter. Expect a deep, dark blistered crust and a perfect open crumb.',
    price: 6.50,
    category: 'bread',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80',
    rating: 4.9
  },
  {
    id: 'bread-2',
    name: 'Artisan French Baguette',
    description: 'The absolute classic. Crisp golden crust, soft chewy interior, with hint of toasted wheat aroma. Baked fresh three times daily.',
    price: 4.00,
    category: 'bread',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    rating: 4.8
  },
  {
    id: 'bread-3',
    name: 'Golden Butter Brioche Loaf',
    description: 'Incredibly rich, tender crumb bread enriched with premium French pasture butter and pasture-raised eggs. Perfectly sweet and pillowy.',
    price: 8.00,
    category: 'bread',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    rating: 4.9
  },

  // --- Pastries ---
  {
    id: 'pastry-1',
    name: 'Signature Butter Croissant',
    description: 'Our pride. 81 microscopic, crispy layers of premium butter and wheat flour, offering a shatteringly crisp shell and a honeycomb interior.',
    price: 3.75,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80',
    rating: 4.9
  },
  {
    id: 'pastry-2',
    name: 'Double Chocolate Pain au Chocolat',
    description: 'Flaky pastry filled with two premium single-origin Valrhona dark chocolate batons, lightly dusted with cocoa powder.',
    price: 4.25,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&auto=format&fit=crop&q=80',
    rating: 4.8
  },
  {
    id: 'pastry-3',
    name: 'Roasted Pistachio & Custard Danish',
    description: 'Golden laminated pastry shell filled with rich house-cooked vanilla bean custard and topped with roasted Persian pistachios and simple syrup.',
    price: 4.75,
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=600&auto=format&fit=crop&q=80',
    rating: 4.7
  },

  // --- Cookies ---
  {
    id: 'cookie-1',
    name: 'Double Chocolate Sea Salt Lava Cookie',
    description: 'Crisp on the outside, ultra-molten on the inside, loaded with 70% dark chocolate chunks and finished with Maldon sea salt flakes.',
    price: 3.50,
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80',
    rating: 4.9
  },
  {
    id: 'cookie-2',
    name: 'Matcha White Chocolate Macadamia',
    description: 'Crafted with premium ceremonial-grade Japanese Uji Matcha, sweet white chocolate chips, and buttery toasted macadamia nuts.',
    price: 3.75,
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1558961309-dbdf032a1e08?w=600&auto=format&fit=crop&q=80',
    rating: 4.7
  },
  {
    id: 'cookie-3',
    name: 'Soft Chewy Cinnamon Snickerdoodle',
    description: 'A nostalgic comfort. Pillowy soft cookie rolled in aromatic sweet Saigon cinnamon and organic brown sugar.',
    price: 3.00,
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?w=600&auto=format&fit=crop&q=80',
    rating: 4.6
  },

  // --- Desserts ---
  {
    id: 'dessert-1',
    name: 'Parisian Raspberry Macaron Rose',
    description: 'An oversized beautiful pink macaron shell filled with lychee-infused pastry cream, fresh whole raspberries, and organic rosewater scent.',
    price: 6.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&auto=format&fit=crop&q=80',
    rating: 4.8
  },
  {
    id: 'dessert-2',
    name: 'Tahitian Vanilla Crème Brûlée',
    description: 'Silky, rich, chilled custard specked with Tahitian vanilla bean, topped with a hard, warm shell of caramelized turbinado sugar.',
    price: 7.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=600&auto=format&fit=crop&q=80',
    rating: 4.9
  },
  {
    id: 'dessert-3',
    name: 'Salted Caramel Pecan Tart',
    description: 'A crisp buttery pâte sablée pastry shell loaded with buttery roasted pecans suspended in our slow-cooked sea salt caramel.',
    price: 6.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1508737804141-4c3b688e2546?w=600&auto=format&fit=crop&q=80',
    rating: 4.8
  },

  // --- Savory Snacks ---
  {
    id: 'savory-1',
    name: 'Spinach, Feta & Pine Nut Puff',
    description: 'Flaky golden puff pastry roll stuffed with organic baby spinach, rich Greek feta cheese, toasted pine nuts, and Greek herbs.',
    price: 5.50,
    category: 'savory',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80',
    rating: 4.7
  },
  {
    id: 'savory-2',
    name: 'Thyme & Caramelized Onion Tart',
    description: 'Slow-cooked sweet yellow onions, French thyme, and soft goat cheese baked in a delicate buttery puff pastry square.',
    price: 5.25,
    category: 'savory',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=600&auto=format&fit=crop&q=80',
    rating: 4.8
  },
  {
    id: 'savory-3',
    name: 'Cheddar, Chive & Jalapeño Scone',
    description: 'Buttermilk biscuit-style scone packed with aged sharp English cheddar cheese, fresh chives, and a mild kick of diced jalapeño.',
    price: 4.50,
    category: 'savory',
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600&auto=format&fit=crop&q=80',
    rating: 4.6
  },

  // --- Sandwiches ---
  {
    id: 'sandwich-1',
    name: 'Wild Mushroom & Truffle Toastie',
    description: 'Sautéed forest mushrooms, melted Swiss Gruyère cheese, truffle-infused aioli, and wild rocket pressed inside our thick rustic sourdough.',
    price: 11.50,
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    rating: 4.9
  },
  {
    id: 'sandwich-2',
    name: 'Caprese Pesto Focaccia',
    description: 'House-made sea salt and rosemary focaccia stuffed with creamy buffalo mozzarella, heirloom vine tomatoes, fresh basil pesto, and balsamic glaze.',
    price: 10.50,
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    rating: 4.8
  },
  {
    id: 'sandwich-3',
    name: 'Smoked Salmon & Chive Brioche',
    description: 'Oak-smoked Scottish salmon, lemon and dill whipped cream cheese, capers, and pickled red onions on our signature toasted brioche bun.',
    price: 13.00,
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80',
    rating: 4.9
  },

  // --- Seasonal Specials ---
  {
    id: 'seasonal-1',
    name: 'Spiced Pumpkin Caramel Cake',
    description: 'Soft heirloom pumpkin-puree sponge layered with cinnamon-ginger buttercream, slow-dripped salted caramel, and toasted pumpkin seeds.',
    price: 44.00,
    category: 'seasonal',
    image: 'https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    isSeasonal: true
  },
  {
    id: 'seasonal-2',
    name: 'Maple Pecan Butter Danish',
    description: 'Autumn special. Beautifully braided pastry filled with smooth pure Quebec maple paste, creamy custard, and heavily toasted maple-glazed pecans.',
    price: 4.95,
    category: 'seasonal',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    rating: 4.8,
    isSeasonal: true
  },
  {
    id: 'seasonal-3',
    name: 'Winter Spiced Pear Frangipane Tart',
    description: 'Vanilla-poached Bartlett pears baked inside an almond frangipane paste and buttery sweet shortcrust pastry, spiced with cloves and star anise.',
    price: 6.50,
    category: 'seasonal',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=600&auto=format&fit=crop&q=80',
    rating: 4.9,
    isSeasonal: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Eleanor Vance',
    rating: 5,
    text: 'Sweet&Salt HUT created our wedding cake and it was a masterpiece! Not only did it look breathtaking with the gold leaf details, but the hazelnut and chocolate layers were incredibly moist. Everyone was asking where we got it!',
    date: 'June 12, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 't-2',
    name: 'Marcus Thorne',
    rating: 5,
    text: 'As a bread purist, finding a proper wild-yeast sourdough is rare. Their 36-hour boule is perfect: magnificent crust, deep complex flavor, and lovely honeycomb interior. Simply the best bakery in town!',
    date: 'May 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 't-3',
    name: 'Sophie Dubois',
    rating: 5,
    text: 'Their croissants transport me straight back to Paris! The shatteringly crisp laminations and rich butter flavor are unmatched. My absolute go-to every Saturday morning.',
    date: 'June 20, 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 't-4',
    name: 'Daniel Carter',
    rating: 5,
    text: 'I order the Truffle Mushroom Toastie at least twice a week. The sourdough is perfect, and the mixture of cheese and mushrooms is so decadent. The staff is always smiling and friendly!',
    date: 'June 15, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Do you make custom celebration cakes?',
    answer: 'Absolutely! Custom cakes are our specialty. We craft beautiful cakes for weddings, birthdays, anniversaries, and corporate events. You can use our interactive Custom Cake Planner on the website to design your cake and get an estimated quote.',
    category: 'custom-cakes'
  },
  {
    id: 'faq-2',
    question: 'How far in advance should I order my cake?',
    answer: 'For standard menu cakes, we require at least 24 to 48 hours notice. For custom celebration or wedding cakes, we recommend ordering at least 1 to 2 weeks in advance to ensure availability and proper planning.',
    category: 'orders'
  },
  {
    id: 'faq-3',
    question: 'Do you offer delivery?',
    answer: 'Yes, we offer hand-delivered service for all our cakes and catering orders within a 15-mile radius of our bakery. Standard bakery items can be ordered for immediate pickup or delivery via major delivery partners. Premium cakes are delivered in refrigerated vehicles to ensure safe transit.',
    category: 'delivery'
  },
  {
    id: 'faq-4',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, and bank transfers for custom events. For online pre-orders, we support secure checkout directly on our platform.',
    category: 'orders'
  },
  {
    id: 'faq-5',
    question: 'Do you cater for special dietary needs?',
    answer: 'Yes, we have a selection of vegetarian, vegan, and gluten-free pastries and cakes. While we take maximum precautions against cross-contamination in our kitchen, please note that we handle flour, nuts, dairy, and eggs on site.',
    category: 'general'
  },
  {
    id: 'faq-6',
    question: 'Can you cater for corporate events or private parties?',
    answer: 'We would love to! We offer beautiful savory sandwich platters, pastry boxes, dessert bars, and customized cake catering for events of any size. Please reach out to us via our inquiry form or call our events manager directly.',
    category: 'general'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Double Chocolate Fudge Cake',
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-2',
    title: 'Edible Gold Luxe Wedding Cake',
    category: 'cakes',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-3',
    title: 'Artisanal Sourdough Boules',
    category: 'bread',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-4',
    title: 'Golden Honeycomb Croissants',
    category: 'pastries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-5',
    title: 'Signature Sea Salt Lava Cookies',
    category: 'cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-6',
    title: 'Charming Bakery Counter',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-7',
    title: 'Crafting Fresh Baguettes',
    category: 'process',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'gal-8',
    title: 'Delicate Pastel Macarons',
    category: 'cupcakes',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&auto=format&fit=crop&q=80'
  }
];
