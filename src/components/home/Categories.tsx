'use client';

import { motion } from 'motion/react';
import {
  Home,
  Building2,
  Building,
  LandPlot,
  TreePine,
  Castle,
  type LucideIcon,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { PROPERTY_TYPES } from '@/lib/constants';

/* Map icon names from constants to actual Lucide components */
const iconMap: Record<string, LucideIcon> = {
  Home,
  Building2,
  Building,
  LandPlot,
  TreePine,
  Castle,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
} as const;

export default function Categories({ counts = {} }: { counts?: Record<string, number> }) {
  return (
    <section className="section-padding bg-sage/50">
      <div className="container-luxury">
        <SectionHeading
          title="Browse by Category"
          subtitle="Find properties that match your lifestyle and investment goals across diverse categories."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {PROPERTY_TYPES.map((category) => {
            const Icon = iconMap[category.icon];
            const count = counts[category.value] ?? 0;

            return (
              <motion.div
                key={category.value}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group cursor-pointer rounded-2xl bg-white p-6 md:p-8 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sage transition-colors duration-300 group-hover:bg-emerald-brand/10">
                  {Icon && (
                    <Icon
                      size={40}
                      className="text-gold transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  )}
                </div>

                <h3 className="font-heading font-semibold text-foreground text-sm md:text-base">
                  {category.label}
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  {count} Properties
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
