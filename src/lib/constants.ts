// ============================================
// National Enterprises Real Estate — Constants
// ============================================

export const SITE_CONFIG = {
  name: 'National Enterprises Real Estate',
  shortName: 'National Enterprises',
  tagline: 'Building Trust. Creating Value.',
  description:
    'National Enterprises Real Estate is a Lucknow-based real estate consultancy founded by Manish Rawat, dedicated to helping individuals, families, and investors make confident property decisions with transparency, affordability, and personalized guidance.',
  founder: 'Manish Rawat',
  established: 2026,
  location: 'Lucknow, Uttar Pradesh',
  url: 'https://nationalenterprises.in',
} as const;

export const CONTACT = {
  phone: '+91 7705869153',
  phoneRaw: '917705869153',
  whatsapp: '+91 7705869153',
  whatsappLink: 'https://wa.me/917705869153',
  email: 'info@nationalenterprises.in',
  address: 'Lucknow, Uttar Pradesh, India',
  businessHours: {
    weekdays: '9:00 AM – 7:00 PM',
    saturday: '10:00 AM – 5:00 PM',
    sunday: 'By Appointment',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Properties', href: '/properties' },
  { label: 'Services', href: '/services' },
  { label: 'Locations', href: '/locations' },
  { label: 'Agents', href: '/agents' },
  { label: 'Contact', href: '/contact' },
] as const;

export const PROPERTY_TYPES = [
  { label: 'Residential', value: 'residential', icon: 'Home' },
  { label: 'Commercial', value: 'commercial', icon: 'Building2' },
  { label: 'Apartments', value: 'apartment', icon: 'Building' },
  { label: 'Plots', value: 'plot', icon: 'LandPlot' },
  { label: 'Farm Houses', value: 'farmhouse', icon: 'TreePine' },
  { label: 'Luxury Villas', value: 'villa', icon: 'Castle' },
] as const;

export const LUCKNOW_AREAS = [
  'Gomti Nagar',
  'Hazratganj',
  'Aliganj',
  'Indira Nagar',
  'Jankipuram',
  'Sushant Golf City',
  'Chinhat',
  'Faizabad Road',
  'Kanpur Road',
  'Raebareli Road',
  'Shaheed Path',
  'Sultanpur Road',
] as const;

export const PRICE_RANGES = [
  { label: 'Under ₹25 Lakh', min: 0, max: 2500000 },
  { label: '₹25 - 50 Lakh', min: 2500000, max: 5000000 },
  { label: '₹50 Lakh - 1 Cr', min: 5000000, max: 10000000 },
  { label: '₹1 - 2 Cr', min: 10000000, max: 20000000 },
  { label: '₹2 - 5 Cr', min: 20000000, max: 50000000 },
  { label: 'Above ₹5 Cr', min: 50000000, max: Infinity },
] as const;

export const AREA_RANGES = [
  { label: 'Under 500 sq ft', min: 0, max: 500 },
  { label: '500 - 1000 sq ft', min: 500, max: 1000 },
  { label: '1000 - 2000 sq ft', min: 1000, max: 2000 },
  { label: '2000 - 5000 sq ft', min: 2000, max: 5000 },
  { label: 'Above 5000 sq ft', min: 5000, max: Infinity },
] as const;

export const STATS = [
  { label: 'Properties Sold', value: 0, suffix: '' },
  { label: 'Happy Clients', value: 0, suffix: '' },
  { label: 'Expert Agents', value: 2, suffix: '' },
  { label: 'Areas Covered', value: 25, suffix: '+' },
] as const;
