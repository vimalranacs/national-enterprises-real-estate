'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function InvestmentCTA() {
  return (
    <section className="relative overflow-hidden bg-emerald-brand py-20 text-white md:py-28">
      {/* Decorative gold circles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border border-gold/10" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full border border-gold/5" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-gold/5" />
        <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full border-2 border-gold/10" />
      </div>

      {/* Content */}
      <div className="container-luxury relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-gold">
            Invest in Your Future
          </span>

          <h2 className="mt-4 font-heading text-3xl font-bold text-white md:text-5xl">
            Ready to Find Your Perfect Property?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Whether you&apos;re looking for your dream home, a smart investment, or a commercial
            space in Lucknow, our expert team is here to guide you every step of the way.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-emerald-brand transition-colors hover:bg-gold-light"
            >
              Schedule a Consultation
              <ArrowRight className="h-4 w-4" />
            </motion.a>

            <motion.a
              href="/properties"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse Properties
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
