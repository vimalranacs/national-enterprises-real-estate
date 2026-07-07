'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import PropertyCard from '@/components/ui/PropertyCard';
import type { Property, PropertyType } from '@/types';
import { LUCKNOW_AREAS, PROPERTY_TYPES, PRICE_RANGES } from '@/lib/constants';

interface Props {
  allProperties: Property[];
}

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

export default function PropertiesClient({ allProperties }: Props) {
  const [status, setStatus] = useState<'buy' | 'rent'>('buy');
  const [type, setType] = useState<PropertyType | ''>('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = allProperties.filter((p) => p.status === status);

    if (type) list = list.filter((p) => p.type === type);
    if (location) list = list.filter((p) => p.location.area.toLowerCase().includes(location.toLowerCase()));
    if (search) list = list.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.area.toLowerCase().includes(search.toLowerCase())
    );
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      list = list.filter((p) => p.price >= min && (max === Infinity || p.price <= max));
    }

    if (sort === 'newest') list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    else if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [allProperties, status, type, location, search, priceRange, sort]);

  const clearFilters = () => {
    setType('');
    setLocation('');
    setPriceRange('');
    setSearch('');
  };

  const hasFilters = type || location || priceRange || search;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Bar */}
      <div className="bg-emerald-brand py-14 md:py-20">
        <div className="container-luxury text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Find Your Property
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white"
          >
            Properties in Lucknow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/70 text-lg max-w-xl mx-auto"
          >
            Explore {allProperties.length}+ premium properties across Lucknow's finest localities
          </motion.p>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="sticky top-16 z-20 bg-white border-b border-border shadow-sm">
        <div className="container-luxury py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Buy/Rent Toggle */}
            <div className="flex rounded-full border border-border overflow-hidden shrink-0">
              {(['buy', 'rent'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-5 py-2 text-sm font-semibold transition-colors ${
                    status === s ? 'bg-emerald-brand text-white' : 'text-muted-foreground hover:text-emerald-brand'
                  }`}
                >
                  {s === 'buy' ? 'Buy' : 'Rent'}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-ivory text-sm focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-colors shrink-0 ${
                showFilters || hasFilters
                  ? 'bg-emerald-brand border-emerald-brand text-white'
                  : 'border-border text-foreground hover:border-emerald-brand hover:text-emerald-brand'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters {hasFilters && `(${[type, location, priceRange].filter(Boolean).length})`}
            </button>

            {/* Sort */}
            <div className="relative shrink-0">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2.5 rounded-full border border-border bg-white text-sm font-medium focus:outline-none focus:border-emerald-brand cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Expanded Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {/* Property Type */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Property Type</label>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setType(type === t.value ? '' : t.value as PropertyType)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        type === t.value
                          ? 'bg-emerald-brand border-emerald-brand text-white'
                          : 'border-border text-foreground hover:border-emerald-brand hover:text-emerald-brand'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Location</label>
                <div className="flex flex-wrap gap-2">
                  {LUCKNOW_AREAS.slice(0, 6).map((area) => (
                    <button
                      key={area}
                      onClick={() => setLocation(location === area ? '' : area)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        location === area
                          ? 'bg-emerald-brand border-emerald-brand text-white'
                          : 'border-border text-foreground hover:border-emerald-brand hover:text-emerald-brand'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Price Range</label>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.slice(0, 4).map((p) => (
                    <button
                      key={p.label}
                      onClick={() => setPriceRange(priceRange === `${p.min}-${p.max}` ? '' : `${p.min}-${p.max}`)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        priceRange === `${p.min}-${p.max}`
                          ? 'bg-emerald-brand border-emerald-brand text-white'
                          : 'border-border text-foreground hover:border-emerald-brand hover:text-emerald-brand'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {hasFilters && (
                <div className="sm:col-span-3 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <X className="h-4 w-4" /> Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container-luxury py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground text-sm">
            <span className="font-semibold text-foreground text-lg">{filtered.length}</span> properties found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-6">🏠</p>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">No properties found</h2>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-full bg-emerald-brand text-white font-semibold text-sm hover:bg-emerald-dark transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((property) => (
              <motion.div
                key={property.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
