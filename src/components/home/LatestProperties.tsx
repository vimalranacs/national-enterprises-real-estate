'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import PropertyCard from '@/components/ui/PropertyCard';
import { Property } from '@/types';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
} as const;

export default function LatestProperties({ properties }: { properties: Property[] }) {
  if (!properties || properties.length === 0) return null;
  // Get 3 latest properties based on createdAt or just take first 3 if already sorted
  const latestProperties = properties.slice(0, 3);

  return (
    <section className="section-padding bg-sage/30">
      <div className="container-luxury">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            title="Newly Added Properties"
            subtitle="Explore our most recent residential and commercial listings across Lucknow."
            centered={false}
          />
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 text-emerald-brand font-semibold hover:text-gold transition-colors shrink-0 mb-4 md:mb-8"
          >
            See all new listings
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {latestProperties.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}