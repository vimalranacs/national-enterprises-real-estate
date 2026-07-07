'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { areas } from '@/lib/data/areas';
import SectionHeading from '@/components/ui/SectionHeading';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function PopularAreas() {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        <SectionHeading
          title="Popular Areas in Lucknow"
          subtitle="Explore premium localities with the best residential and commercial properties in the city"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {areas.map((area) => (
            <motion.div
              key={area.id}
              variants={cardVariants}
              className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/3]"
            >
              {/* Background image */}
              <Image
                src={area.image}
                alt={area.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/80" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-heading text-2xl font-bold text-white">
                  {area.name}
                </h3>

                <div className="mt-3 flex items-center gap-3">
                  <span className="rounded-full bg-gold/90 px-3 py-1 text-sm font-medium text-white">
                    {area.propertiesCount} Properties
                  </span>
                  <span className="text-sm text-white/80">
                    {area.avgPrice}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
