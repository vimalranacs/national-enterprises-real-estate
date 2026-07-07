import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { properties } from '@/lib/data/properties';
import PropertyDetailClient from './PropertyDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) return { title: 'Property Not Found' };

  return {
    title: `${property.title} | ${property.priceLabel}`,
    description: property.description,
    openGraph: {
      images: [{ url: property.images[0], alt: property.title }],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();

  const similar = properties
    .filter((p) => p.type === property.type && p.id !== property.id)
    .slice(0, 3);

  return <PropertyDetailClient property={property} similarProperties={similar} />;
}
