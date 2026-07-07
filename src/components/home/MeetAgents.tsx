'use client';

import { motion } from 'motion/react';
import { Star, MessageCircle, Phone } from 'lucide-react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { agents } from '@/lib/data/agents';

const containerVariants = {
  hidden: {},
  visible: {
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
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function MeetAgents() {
  return (
    <section className="section-padding bg-sage/30">
      <div className="container-luxury">
        <SectionHeading
          title="Meet Our Experts"
          subtitle="Our experienced team is here to guide you through every step of your property journey."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Agent image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  unoptimized
                  className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>

              {/* Agent info */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {agent.name}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-gold">
                  {agent.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {agent.experience}+ years experience
                </p>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-1.5">
                  <Star className="size-4 fill-gold text-gold" />
                  <span className="text-sm font-semibold text-foreground">
                    {agent.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({agent.reviewsCount} reviews)
                  </span>
                </div>

                {/* Properties count */}
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {agent.propertiesCount}+ properties dealt
                </p>

                {/* Contact buttons */}
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-green-700"
                  >
                    <MessageCircle className="size-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${agent.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald-brand px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-emerald-dark"
                  >
                    <Phone className="size-3.5" />
                    Call
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
