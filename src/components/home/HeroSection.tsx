'use client';

import { motion, type Variants } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SITE_CONFIG, CONTACT, STATS } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const statsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.8 },
  },
};

const statItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* ── Background ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-emerald-brand" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(14,59,46,0.95) 0%, rgba(14,59,46,0.7) 100%)',
        }}
      />

      {/* Subtle decorative circles */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/[0.02]" />
      <div className="pointer-events-none absolute -bottom-60 -left-40 h-[600px] w-[600px] rounded-full bg-white/[0.02]" />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="container-luxury relative z-10 flex flex-1 flex-col justify-center pb-32 pt-28 lg:pb-40 lg:pt-36">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Pre-heading badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
              {SITE_CONFIG.location}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Building Trust.
            <br />
            <span className="text-gold-gradient">Creating Value.</span>
          </motion.h1>

          {/* Gold accent line */}
          <motion.div
            variants={itemVariants}
            className="mt-6 h-1 w-20 rounded-full bg-gold"
          />

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl"
          >
            {SITE_CONFIG.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="/properties"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-emerald-brand transition-all duration-300 hover:bg-ivory hover:shadow-lg hover:shadow-white/10"
            >
              Explore Properties
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Talk to an Expert
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stats Row ───────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container-luxury">
          <motion.div
            variants={statsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="grid grid-cols-2 gap-6 py-10 md:grid-cols-4 md:gap-8 lg:py-14"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={statItemVariants}
                className="text-center"
              >
                <p className="font-heading text-3xl font-bold text-gold md:text-4xl lg:text-5xl">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-1.5 text-sm font-medium tracking-wide text-white/70 md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
