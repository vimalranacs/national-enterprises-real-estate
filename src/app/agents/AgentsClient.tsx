'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Star, MessageCircle, Phone, Award, Users, Building2, Home } from 'lucide-react';
import { agents } from '@/lib/data/agents';
import { CONTACT } from '@/lib/constants';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };

export default function AgentsClient() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-emerald-brand py-20 md:py-28">
        <div className="container-luxury text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-3"
          >Our Team</motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white"
          >Meet Our Experts</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-4 text-white/70 text-lg max-w-xl mx-auto"
          >
            A dedicated team of real estate professionals committed to finding you the perfect property.
          </motion.p>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {agents.map((agent) => (
              <motion.div
                key={agent.id}
                variants={fadeUp}
                className="bg-white rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="grid grid-cols-1 sm:grid-cols-5">
                  {/* Photo */}
                  <div className="sm:col-span-2 relative aspect-[4/3] sm:aspect-auto">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      unoptimized
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="sm:col-span-3 p-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="font-heading text-2xl font-bold text-foreground">{agent.name}</h2>
                          <p className="text-gold text-sm font-medium mt-0.5">{agent.title}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-sage rounded-full px-3 py-1 shrink-0">
                          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                          <span className="text-sm font-semibold text-foreground">{agent.rating}</span>
                        </div>
                      </div>

                      <div className="gold-divider-left my-4" />

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{agent.bio}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 mt-5">
                        {[
                          { icon: Building2, value: `${agent.propertiesCount}+`, label: 'Properties' },
                          { icon: Users, value: `${agent.reviewsCount}+`, label: 'Reviews' },
                          { icon: Award, value: `${agent.experience}+`, label: 'Years' },
                        ].map((stat) => {
                          const Icon = stat.icon;
                          return (
                            <div key={stat.label} className="text-center bg-sage/50 rounded-xl p-3">
                              <Icon className="h-4 w-4 text-gold mx-auto mb-1" />
                              <p className="font-heading text-lg font-bold text-emerald-brand">{stat.value}</p>
                              <p className="text-xs text-muted-foreground">{stat.label}</p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Specializations */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {agent.specialization.map((s) => (
                          <span key={s} className="text-xs bg-sage text-emerald-brand font-medium px-3 py-1 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                      <a
                        href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </a>
                      <a
                        href={`tel:${agent.phone.replace(/\s/g, '')}`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-brand text-white text-sm font-semibold hover:bg-emerald-dark transition-colors"
                      >
                        <Phone className="h-4 w-4" /> Call
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="section-padding bg-sage/30">
        <div className="container-luxury text-center">
          <div className="h-16 w-16 rounded-2xl bg-emerald-brand flex items-center justify-center mx-auto mb-6">
            <Home className="h-8 w-8 text-gold" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Want to Join Our Team?</h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            We&apos;re always looking for passionate real estate professionals who share our commitment to excellence and client satisfaction.
          </p>
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-brand px-8 py-4 font-semibold text-white hover:bg-emerald-dark transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
