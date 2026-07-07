import { Property, PropertyType } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSupabaseProperty(row: any): Property {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description || '',
    price: Number(row.price) || 0,
    priceLabel: row.price_label || '',
    type: (row.type as PropertyType) || 'residential',
    category: row.status === 'rent' ? 'rent' : 'buy',
    status: row.status === 'rent' ? 'rent' : 'buy',
    location: {
      area: row.area || '',
      city: row.city || 'Lucknow',
      state: row.state || 'Uttar Pradesh',
      address: row.address || '',
      pincode: row.pincode || '',
    },
    features: {
      bedrooms: row.bedrooms,
      bathrooms: row.bathrooms,
      area: row.area_sqft || 0,
      areaUnit: 'sqft',
      floors: row.floors,
      parking: row.parking,
      facing: row.facing,
      furnishing: row.furnishing,
    },
    amenities: row.amenities || [],
    images: row.images || [],
    isFeatured: row.is_featured || false,
    isNew: false, // Could calculate this based on created_at if needed
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
