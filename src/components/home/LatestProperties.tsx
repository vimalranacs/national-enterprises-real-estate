'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import PropertyCard from '@/components/ui/PropertyCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { latestProperties } from '@/lib/data/properties';

export default function LatestProperties() {
  return (
    <section className="section-padding bg-sage/40">
      <div className="container-luxury">
        <SectionHeading
          title="Fresh on the Market"
          subtitle="Explore the newest homes, plots, and investment opportunities added across Lucknow."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {latestProperties.slice(0, 6).map((property) => (
            <motion.div
              key={property.id}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-14 text-center">
          <Link
            href="/properties?sort=newest"
            className="group inline-flex items-center gap-2 font-semibold text-emerald-brand transition-colors hover:text-emerald-light"
          >
            View latest properties
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}