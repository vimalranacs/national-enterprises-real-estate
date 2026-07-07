'use client';

import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  centered?: boolean;
  goldAccent?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  goldAccent = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-14 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}
    >
      {goldAccent && (
        <div
          className={`mb-5 ${centered ? 'flex justify-center' : ''}`}
        >
          <span className="block h-0.5 w-16 bg-gold rounded-full" />
        </div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight">
        {title}
      </h2>

      <p
        className={`mt-4 text-lg text-muted-foreground max-w-2xl ${
          centered ? 'mx-auto' : ''
        }`}
      >
        {subtitle}
      </p>
    </motion.div>
  );
}
