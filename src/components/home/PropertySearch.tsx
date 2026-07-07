'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Home,
  IndianRupee,
  Maximize,
  Search,
  ChevronDown,
} from 'lucide-react';
import {
  LUCKNOW_AREAS,
  PROPERTY_TYPES,
  PRICE_RANGES,
  AREA_RANGES,
} from '@/lib/constants';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type TabValue = 'buy' | 'rent';

interface DropdownOption {
  label: string;
  value: string;
}

// ---------------------------------------------------------------------------
// Transform constants into dropdown options
// ---------------------------------------------------------------------------
const locationOptions: DropdownOption[] = LUCKNOW_AREAS.map((area) => ({
  label: area,
  value: area.toLowerCase().replace(/\s+/g, '-'),
}));

const propertyTypeOptions: DropdownOption[] = PROPERTY_TYPES.map((t) => ({
  label: t.label,
  value: t.value,
}));

const priceRangeOptions: DropdownOption[] = PRICE_RANGES.map((p) => ({
  label: p.label,
  value: `${p.min}-${p.max}`,
}));

const areaRangeOptions: DropdownOption[] = AREA_RANGES.map((a) => ({
  label: a.label,
  value: `${a.min}-${a.max}`,
}));

// ---------------------------------------------------------------------------
// Styled Dropdown (custom select)
// ---------------------------------------------------------------------------
interface FilterDropdownProps {
  icon: React.ReactNode;
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

function FilterDropdown({
  icon,
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative flex-1 min-w-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center gap-3 rounded-2xl border border-[#E9E9E9] bg-[#FCFBF8] px-4 py-3.5 text-left transition-all duration-200 hover:border-emerald-brand/30 focus:border-emerald-brand focus:outline-none focus:ring-2 focus:ring-emerald-brand/20"
      >
        <span className="flex-shrink-0 text-gold">{icon}</span>
        <div className="flex flex-1 min-w-0 flex-col">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5F6368]">
            {label}
          </span>
          <span className="truncate text-sm font-medium text-[#1A1A1A]">
            {selected ? selected.label : `Select ${label}`}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-[#5F6368] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-[#E9E9E9] bg-white py-1.5 shadow-xl"
          >
            {/* Empty / reset option */}
            <button
              type="button"
              onClick={() => {
                onChange('');
                setOpen(false);
              }}
              className="flex w-full items-center px-4 py-2.5 text-sm text-[#5F6368] transition-colors hover:bg-sage"
            >
              All {label}s
            </button>

            {options.map((option) => {
              const isActive = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-sage font-semibold text-emerald-brand'
                      : 'text-[#1A1A1A] hover:bg-sage/60'
                  }`}
                >
                  {option.label}
                  {isActive && (
                    <span className="ml-auto inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                  )}
                </button>
              );
            })}
          </motion.div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function PropertySearch() {
  const [activeTab, setActiveTab] = useState<TabValue>('buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [areaRange, setAreaRange] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('status', activeTab);
    if (location) params.set('location', location);
    if (propertyType) params.set('type', propertyType);
    if (priceRange) params.set('price', priceRange);
    if (areaRange) params.set('area', areaRange);
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <div className="container-luxury relative z-10 -mt-16 md:-mt-20 lg:-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/8 md:p-8"
      >
        {/* ── Tab Toggle ──────────────────────────────────────────── */}
        <div className="mb-6 flex items-center gap-2">
          {(['buy', 'rent'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-brand text-white shadow-md shadow-emerald-brand/20'
                    : 'border border-[#E9E9E9] bg-transparent text-[#5F6368] hover:border-emerald-brand/30 hover:text-emerald-brand'
                }`}
              >
                {tab === 'buy' ? 'Buy' : 'Rent'}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-emerald-brand"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Filter Row ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">
          {/* Dropdowns */}
          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <FilterDropdown
              icon={<MapPin className="h-5 w-5" />}
              label="Location"
              options={locationOptions}
              value={location}
              onChange={setLocation}
            />
            <FilterDropdown
              icon={<Home className="h-5 w-5" />}
              label="Property Type"
              options={propertyTypeOptions}
              value={propertyType}
              onChange={setPropertyType}
            />
            <FilterDropdown
              icon={<IndianRupee className="h-5 w-5" />}
              label="Price Range"
              options={priceRangeOptions}
              value={priceRange}
              onChange={setPriceRange}
            />
            <FilterDropdown
              icon={<Maximize className="h-5 w-5" />}
              label="Area / Size"
              options={areaRangeOptions}
              value={areaRange}
              onChange={setAreaRange}
            />
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="group flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-emerald-brand px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-emerald-dark hover:shadow-lg hover:shadow-emerald-brand/20 lg:flex-shrink-0"
          >
            <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            Search Properties
          </button>
        </div>
      </motion.div>
    </div>
  );
}
