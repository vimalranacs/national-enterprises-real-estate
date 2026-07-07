import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { mapSupabaseProperty } from '@/lib/supabase/utils';
import PropertyDetailClient from './PropertyDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: property } = await supabase
    .from('properties')
    .select('title, description, price_label, images')
    .eq('slug', slug)
    .single();

  if (!property) return { title: 'Property Not Found' };

  return {
    title: `${property.title} | ${property.price_label || ''}`,
    description: property.description || '',
    openGraph: {
      images: property.images?.[0] ? [{ url: property.images[0], alt: property.title }] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!data || !data.is_active) notFound();

  const property = mapSupabaseProperty(data);

  // Fetch similar properties
  const { data: similarData } = await supabase
    .from('properties')
    .select('*')
    .eq('type', data.type)
    .eq('is_active', true)
    .neq('id', data.id)
    .limit(3);

  const similar = (similarData || []).map(mapSupabaseProperty);

  return <PropertyDetailClient property={property} similarProperties={similar} />;
}
