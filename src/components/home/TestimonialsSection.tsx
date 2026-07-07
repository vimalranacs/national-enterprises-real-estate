'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { testimonials } from '@/lib/data/testimonials';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function TestimonialsSection() {
  const displayedTestimonials = testimonials.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Real stories from real clients who trusted us with their most important investment decisions."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {displayedTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="group relative rounded-2xl border border-border bg-white p-8 transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Large gold quote icon — decorative */}
              <Quote className="absolute right-6 top-6 size-14 text-gold opacity-10" />

              {/* Star rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < testimonial.rating
                        ? 'fill-gold text-gold'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="mt-4 leading-relaxed text-foreground italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Client info */}
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  unoptimized
                  className="size-12 rounded-full object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-heading font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>

                {testimonial.propertyType && (
                  <span className="shrink-0 rounded-full bg-sage px-2 py-1 text-xs font-medium text-emerald-brand">
                    {testimonial.propertyType}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
