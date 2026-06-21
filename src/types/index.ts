export type Category =
  | 'weddings'
  | 'portraits'
  | 'events'
  | 'street'
  | 'landscape'
  | 'commercial';

export interface Photo {
  id: string;
  title: string;
  category: Category;
  galleryId: string;
  /** CSS gradient placeholder — swap for a real image URL, see README */
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Gallery {
  id: string;
  title: string;
  category: Category;
  date: string;
  location: string;
  cover: string;
  description: string;
  photoIds: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  weddings: 'Weddings',
  portraits: 'Portraits',
  events: 'Events',
  street: 'Street',
  landscape: 'Landscape',
  commercial: 'Commercial',
};
