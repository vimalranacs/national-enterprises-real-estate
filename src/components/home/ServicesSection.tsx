'use client';

import { motion, type Variants } from 'motion/react';
import {
  Home,
  Building2,
  TrendingUp,
  Hammer,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Home,
    title: 'Residential Properties',
    description:
      'Find your dream home from our curated selection of residential properties across Lucknow.',
  },
  {
    icon: Building2,
    title: 'Commercial Properties',
    description:
      'Premium commercial spaces for businesses, offices, and retail in prime locations.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Advisory',
    description:
      'Expert guidance to help you make profitable real estate investments.',
  },
  {
    icon: Hammer,
    title: 'Construction Services',
    description:
      'End-to-end construction management for your dream project.',
  },
  {
    icon: Settings,
    title: 'Property Management',
    description:
      'Complete property management solutions for landlords and investors.',
  },
  {
    icon: Users,
    title: 'Property Consultancy',
    description:
      'Personalized consultancy services tailored to your property needs.',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function ServicesSection() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-luxury">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block font-heading text-sm font-semibold uppercase tracking-widest text-gold">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Our Services
          </h2>
          <div className="gold-divider mx-auto mt-4 w-16" />
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Comprehensive real estate solutions tailored to meet every property
            need with expertise and trust.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group cursor-pointer rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:border-emerald-brand/20 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage">
                  <Icon className="h-6 w-6 text-gold" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* Link */}
                <div className="mt-5">
                  <span className="inline-flex items-center text-sm font-medium text-emerald-brand transition-colors group-hover:text-emerald-light">
                    Learn More
                    <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
