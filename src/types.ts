export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cakes' | 'custom' | 'bread' | 'pastries' | 'cookies' | 'desserts' | 'savory' | 'sandwiches' | 'seasonal';
  image: string;
  rating: number;
  isSeasonal?: boolean;
  isGlutenFree?: boolean;
  isVegan?: boolean;
}

export interface CartItem {
  id: string; // can be menuItem.id or unique combined if custom cake
  item: MenuItem;
  quantity: number;
  customNotes?: string;
  isCustomCake?: boolean;
  customCakeDetails?: CustomCakeDetails;
}

export interface CustomCakeDetails {
  tiers: number;
  size: string; // "6 inch", "8 inch", "10 inch", etc.
  flavor: string;
  frosting: string;
  filling: string;
  message: string;
  decorations: string[];
  deliveryDate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'orders' | 'custom-cakes' | 'delivery';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cakes' | 'cupcakes' | 'bread' | 'pastries' | 'cookies' | 'interior' | 'process';
  image: string;
}
