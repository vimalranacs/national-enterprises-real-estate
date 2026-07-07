'use client';

import { motion, type Variants } from 'motion/react';
import { Shield, Handshake, Eye, Clock, type LucideIcon } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface TrustPillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

const trustPillars: TrustPillar[] = [
  {
    icon: Shield,
    title: 'Transparent Dealings',
    description:
      'We believe in complete transparency at every step, ensuring you are always informed and confident in your decisions.',
  },
  {
    icon: Handshake,
    title: 'Trusted Relationships',
    description:
      'Building lasting relationships with our clients through honesty, integrity, and exceptional service delivery.',
  },
  {
    icon: Eye,
    title: 'Market Expertise',
    description:
      'Deep knowledge of the Lucknow real estate market, helping you identify the best opportunities available.',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description:
      'We respect your time and ensure every project and transaction is completed within the committed timeline.',
  },
];

const stats: Stat[] = [
  { target: 500, suffix: '+', label: 'Properties Sold' },
  { target: 350, suffix: '+', label: 'Happy Clients' },
  { target: 15, suffix: '+', label: 'Expert Agents' },
  { target: 25, suffix: '+', label: 'Areas Covered' },
];

const pillarContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const pillarVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-emerald-brand">
      <div className="container-luxury">
        {/* Section Heading — inline white variant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block font-heading text-sm font-semibold uppercase tracking-widest text-gold">
            Why Us
          </span>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Why Choose National Enterprises
          </h2>
          <div className="gold-divider mx-auto mt-4 w-16" />
          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
            We are committed to delivering excellence in every aspect of real
            estate, backed by years of experience and unwavering dedication to
            our clients.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          {/* Left — Trust Pillars */}
          <motion.div
            variants={pillarContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-8"
          >
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={pillarVariants}
                  className="flex gap-5"
                >
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="h-6 w-6 text-gold" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right — Stat Counters */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm"
              >
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={2000}
                  className="text-4xl font-bold text-gold"
                />
                <p className="mt-2 text-sm text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
