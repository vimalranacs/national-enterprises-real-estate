// ============================================
// National Enterprises Real Estate — Type Definitions
// ============================================

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceLabel?: string;
  type: PropertyType;
  category: PropertyCategory;
  status: 'buy' | 'rent';
  location: {
    area: string;
    city: string;
    state: string;
    address: string;
    pincode?: string;
  };
  features: {
    bedrooms?: number;
    bathrooms?: number;
    area: number;
    areaUnit: 'sqft' | 'sqm' | 'sqyd';
    floors?: number;
    parking?: number;
    facing?: string;
    furnishing?: 'furnished' | 'semi-furnished' | 'unfurnished';
  };
  amenities: string[];
  images: string[];
  isFeatured: boolean;
  isNew: boolean;
  agent?: Agent;
  createdAt: string;
  updatedAt: string;
}

export type PropertyType =
  | 'residential'
  | 'commercial'
  | 'apartment'
  | 'plot'
  | 'farmhouse'
  | 'villa';

export type PropertyCategory = 'buy' | 'rent';

export interface Agent {
  id: string;
  name: string;
  title: string;
  image: string;
  phone: string;
  whatsapp: string;
  email: string;
  bio: string;
  experience: number;
  specialization: string[];
  propertiesCount: number;
  rating: number;
  reviewsCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
  propertyType?: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  slug: string;
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  propertiesCount: number;
  avgPrice: string;
  highlights: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyType?: PropertyType;
  budget?: string;
}

export interface SearchFilters {
  status: 'buy' | 'rent';
  type?: PropertyType;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
}

export interface SiteVisitBooking {
  name: string;
  phone: string;
  email: string;
  propertyId: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}
