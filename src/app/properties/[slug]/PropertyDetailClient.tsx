'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  MapPin, Bed, Bath, Maximize, ChevronLeft, ChevronRight,
  Phone, MessageCircle, Calendar, Share2, Heart,
  Car, Zap, Droplets, Shield, Star, ArrowRight,
  School, Hospital, Train,
} from 'lucide-react';
import type { Property } from '@/types';
import PropertyCard from '@/components/ui/PropertyCard';
import { CONTACT } from '@/lib/constants';

interface Props {
  property: Property;
  similarProperties: Property[];
}

// ── EMI Calculator ──────────────────────────────────────────────────────────
function EMICalculator({ price }: { price: number }) {
  const [principal, setPrincipal] = useState(Math.round(price * 0.8));
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months)
    / (Math.pow(1 + monthlyRate, months) - 1);

  const formatINR = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <h3 className="font-heading text-xl font-semibold mb-6">EMI Calculator</h3>
      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted-foreground">Loan Amount</span>
            <span className="font-semibold text-emerald-brand">{formatINR(principal)}</span>
          </div>
          <input type="range" min={500000} max={price} step={100000}
            value={principal} onChange={(e) => setPrincipal(+e.target.value)}
            className="w-full accent-[#0E3B2E]" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted-foreground">Interest Rate</span>
            <span className="font-semibold text-emerald-brand">{rate}%</span>
          </div>
          <input type="range" min={6} max={15} step={0.1}
            value={rate} onChange={(e) => setRate(+e.target.value)}
            className="w-full accent-[#0E3B2E]" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted-foreground">Loan Tenure</span>
            <span className="font-semibold text-emerald-brand">{years} Years</span>
          </div>
          <input type="range" min={5} max={30} step={1}
            value={years} onChange={(e) => setYears(+e.target.value)}
            className="w-full accent-[#0E3B2E]" />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-sage p-4 text-center">
        <p className="text-sm text-muted-foreground">Estimated Monthly EMI</p>
        <p className="font-heading text-3xl font-bold text-emerald-brand mt-1">
          {isFinite(emi) ? formatINR(emi) : '—'}
        </p>
        <p className="text-xs text-muted-foreground mt-1">*Indicative figure only</p>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function PropertyDetailClient({ property, similarProperties }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const { title, description, priceLabel, price, type, status, location, features, amenities, images, isNew } = property;

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in: ${title} (${priceLabel}). Please share more details.`
  );

  const nearby = [
    { icon: School, label: 'City Montessori School', distance: '1.2 km' },
    { icon: School, label: 'Seth M.R. Jaipuria School', distance: '2.5 km' },
    { icon: Hospital, label: 'King George Medical University', distance: '3.8 km' },
    { icon: Hospital, label: 'Medanta Hospital', distance: '4.1 km' },
    { icon: Train, label: 'Hazratganj Metro Station', distance: '2.0 km' },
    { icon: Train, label: 'Lucknow Junction', distance: '5.5 km' },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container-luxury py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-emerald-brand transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/properties" className="hover:text-emerald-brand transition-colors">Properties</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground line-clamp-1">{title}</span>
          </nav>
        </div>
      </div>

      <div className="container-luxury py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT — Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden aspect-[16/9] bg-gray-100"
            >
              <Image
                src={images[activeImage]}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((p) => (p - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 text-foreground" />
                  </button>
                  <button
                    onClick={() => setActiveImage((p) => (p + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 text-foreground" />
                  </button>
                </>
              )}

              {/* Badges */}
              {isNew && (
                <span className="absolute top-4 left-4 bg-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  New
                </span>
              )}
              <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-sm font-medium px-3 py-1 rounded-full capitalize">
                {type}
              </span>

              {/* Counter */}
              <span className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full">
                {activeImage + 1} / {images.length}
              </span>
            </motion.div>

            {/* Property Header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      status === 'buy' ? 'bg-emerald-brand/10 text-emerald-brand' : 'bg-gold/10 text-gold'
                    }`}>
                      For {status === 'buy' ? 'Sale' : 'Rent'}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize bg-border px-3 py-1 rounded-full">{type}</span>
                  </div>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
                  <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-gold shrink-0" />
                    <span>{location.address}, {location.area}, {location.city}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`h-10 w-10 flex items-center justify-center rounded-full border transition-colors ${
                      isSaved ? 'border-red-300 bg-red-50 text-red-500' : 'border-border hover:border-red-300 text-muted-foreground'
                    }`}
                    aria-label="Save property"
                  >
                    <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => navigator.share?.({ title, url: window.location.href })}
                    className="h-10 w-10 flex items-center justify-center rounded-full border border-border hover:border-emerald-brand text-muted-foreground hover:text-emerald-brand transition-colors"
                    aria-label="Share property"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-center gap-3">
                <span className="font-heading text-4xl font-bold text-emerald-brand">{priceLabel}</span>
                {status === 'rent' && <span className="text-muted-foreground text-sm">per month</span>}
              </div>

              {/* Feature Pills */}
              <div className="mt-5 flex flex-wrap gap-3">
                {features.bedrooms && features.bedrooms > 0 && (
                  <span className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm font-medium">
                    <Bed className="h-4 w-4 text-gold" /> {features.bedrooms} Bedrooms
                  </span>
                )}
                {features.bathrooms && features.bathrooms > 0 && (
                  <span className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm font-medium">
                    <Bath className="h-4 w-4 text-gold" /> {features.bathrooms} Bathrooms
                  </span>
                )}
                <span className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm font-medium">
                  <Maximize className="h-4 w-4 text-gold" /> {features.area.toLocaleString('en-IN')} {features.areaUnit}
                </span>
                {features.parking && features.parking > 0 && (
                  <span className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm font-medium">
                    <Car className="h-4 w-4 text-gold" /> {features.parking} Parking
                  </span>
                )}
                {features.facing && (
                  <span className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm font-medium">
                    <Star className="h-4 w-4 text-gold" /> {features.facing} Facing
                  </span>
                )}
                {features.furnishing && (
                  <span className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm font-medium capitalize">
                    <Shield className="h-4 w-4 text-gold" /> {features.furnishing}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Overview */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-border">
              <h2 className="font-heading text-xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </motion.div>

            {/* Amenities */}
            {amenities.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl p-6 border border-border">
                <h2 className="font-heading text-xl font-semibold mb-5">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2.5 bg-sage/50 rounded-xl px-3 py-2.5">
                      <span className="h-2 w-2 rounded-full bg-gold shrink-0" />
                      <span className="text-sm font-medium text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Nearby */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-border">
              <h2 className="font-heading text-xl font-semibold mb-5">Nearby Infrastructure</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nearby.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-sage/30 transition-colors">
                      <div className="h-9 w-9 rounded-xl bg-sage flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-emerald-brand" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.distance}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="lg:col-span-1 space-y-6">

            {/* Contact Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl border border-border p-6 sticky top-24">
              <h3 className="font-heading text-lg font-semibold mb-1">Interested in this property?</h3>
              <p className="text-sm text-muted-foreground mb-6">Contact our expert for a site visit</p>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/${CONTACT.phoneRaw}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-emerald-brand text-white font-semibold hover:bg-emerald-dark transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
                <button
                  onClick={() => {
                    const msg = encodeURIComponent(`Hi, I'd like to book a site visit for: ${title}`);
                    window.open(`https://wa.me/${CONTACT.phoneRaw}?text=${msg}`, '_blank');
                  }}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl border-2 border-emerald-brand text-emerald-brand font-semibold hover:bg-sage transition-colors"
                >
                  <Calendar className="h-5 w-5" />
                  Book Site Visit
                </button>
              </div>

              <div className="mt-5 pt-5 border-t border-border text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <Zap className="h-3.5 w-3.5 text-gold" />
                  Usually responds within 30 minutes
                </div>
              </div>
            </motion.div>

            {/* EMI Calculator */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              {status === 'buy' && <EMICalculator price={price} />}
            </motion.div>

          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-border"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl font-bold">Similar Properties</h2>
              <Link href="/properties" className="flex items-center gap-1.5 text-sm font-semibold text-emerald-brand hover:text-emerald-light transition-colors">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
