// ============================================
// National Enterprises Real Estate — SEO Utilities
// ============================================

export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'National Enterprises Real Estate',
    description:
      'Lucknow-based real estate consultancy providing residential, commercial, and investment property solutions.',
    url: 'https://nationalenterprises.in',
    logo: 'https://nationalenterprises.in/logo.png',
    telephone: '+917705869153',
    email: 'info@nationalenterprises.in',
    founder: {
      '@type': 'Person',
      name: 'Manish Rawat',
    },
    foundingDate: '2026',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lucknow',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: 'Lucknow',
    },
    sameAs: [],
  };
}

export function createWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'National Enterprises Real Estate',
    url: 'https://nationalenterprises.in',
    description:
      'Find premium residential, commercial, and investment properties across Lucknow with transparent guidance.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://nationalenterprises.in/properties?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function createPropertySchema(property: {
  title: string;
  description: string;
  price: number;
  location: { area: string; city: string; state: string; address: string };
  images: string[];
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.title,
    description: property.description,
    image: property.images,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: property.price,
      availability: 'https://schema.org/InStock',
    },
    url: `https://nationalenterprises.in/properties/${property.slug}`,
  };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}