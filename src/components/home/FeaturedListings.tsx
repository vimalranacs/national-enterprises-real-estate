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

export default function FeaturedListings({ properties }: { properties: Property[] }) {
  if (!properties || properties.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <SectionHeading
          title="Featured Properties"
          subtitle="Handpicked premium properties in Lucknow's most sought-after locations, curated for discerning buyers and investors."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {properties.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-brand bg-transparent px-8 py-3.5 text-sm font-semibold text-emerald-brand transition-all duration-300 hover:bg-emerald-brand hover:text-white"
          >
            View All Properties
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
