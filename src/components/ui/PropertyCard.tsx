'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
}

function formatPrice(price: number, priceLabel?: string): string {
  if (priceLabel) return priceLabel;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

function capitalizeType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    title,
    slug,
    price,
    priceLabel,
    type,
    location,
    features,
    images,
    isNew,
  } = property;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      className="group rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/properties/${slug}`} className="block">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={images[0]}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Price Badge — Top Left */}
          <span className="absolute top-4 left-4 bg-emerald-brand text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
            {formatPrice(price, priceLabel)}
          </span>

          {/* Property Type Badge — Top Right */}
          <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-sm text-foreground px-3 py-1 rounded-full font-medium">
            {capitalizeType(type)}
          </span>

          {/* NEW Badge */}
          {isNew && (
            <span className="absolute top-14 left-4 bg-gold text-white px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">
              New
            </span>
          )}

          {/* Favorite Heart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
            aria-label="Add to favorites"
          >
            <Heart className="h-[18px] w-[18px] text-muted-foreground transition-colors hover:text-red-500" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-5 md:p-6">
          <h3 className="text-xl font-heading font-semibold text-foreground line-clamp-1">
            {title}
          </h3>

          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-gold" />
            <span className="line-clamp-1">
              {location.area}, {location.city}
            </span>
          </div>

          {/* Divider */}
          <div className="my-4 h-px w-full bg-border" />

          {/* Features Row */}
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            {features.bedrooms !== undefined && features.bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed className="h-4 w-4 text-gold" />
                <span>{features.bedrooms} Beds</span>
              </div>
            )}

            {features.bathrooms !== undefined && features.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-gold" />
                <span>{features.bathrooms} Baths</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-gold" />
              <span>
                {features.area.toLocaleString('en-IN')} {features.areaUnit}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
