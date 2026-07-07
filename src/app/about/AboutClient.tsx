'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield, Eye, Handshake, Heart, Award, TrendingUp,
  ChevronRight, Star, Users, Home, ArrowRight,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const values = [
  { icon: Shield, title: 'Transparency', description: 'Complete honesty in every transaction. We disclose everything — the good and the not-so-good.' },
  { icon: Handshake, title: 'Trust', description: 'Your trust is our most valuable asset. We build relationships that last a lifetime.' },
  { icon: Eye, title: 'Integrity', description: 'We operate with the highest ethical standards, always putting your interest first.' },
  { icon: Heart, title: 'Client-First', description: 'Every decision we make is filtered through one question: Is this the best for our client?' },
  { icon: TrendingUp, title: 'Excellence', description: 'We continuously raise our standards to deliver experiences that exceed expectations.' },
  { icon: Award, title: 'Accountability', description: 'We stand behind our recommendations and take full responsibility for our advice.' },
];

const timeline = [
  { year: '2026', title: 'Founded', description: 'National Enterprises Real Estate was established in Lucknow with a mission to transform how people buy and sell property.' },
  { year: '2026', title: 'First 50 Clients', description: 'Within months of launch, we successfully served 50+ clients across Lucknow, building our reputation for honesty and results.' },
  { year: '2026', title: '100+ Properties Listed', description: 'Expanded our portfolio to include residential, commercial, plots, and luxury properties across Lucknow.' },
  { year: '2026', title: 'Growing Strong', description: 'With a dedicated team of 15+ agents, we continue to grow and serve more clients every day.' },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-emerald-brand section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/[0.03]" />
          <div className="absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-white/[0.03]" />
        </div>
        <div className="container-luxury text-center relative z-10">
          <motion.span
            variants={fadeUp} initial="hidden" animate="visible"
            className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4"
          >Our Story</motion.span>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible"
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            About National Enterprises
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-6 text-white/70 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Building trust, one property at a time. A story of passion, transparency, and commitment to excellence.
          </motion.p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">Founder&apos;s Story</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Meet Manish Rawat
              </h2>
              <div className="gold-divider-left mb-8" />
              <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
                Manish Rawat founded National Enterprises Real Estate in 2026 with a clear vision: to create a real estate consultancy where every client feels valued, informed, and confident in their property decisions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Having navigated the complex Lucknow real estate market for years, Manish witnessed firsthand the lack of transparency and personalized guidance that frustrated buyers and sellers alike. He set out to change this.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Today, National Enterprises is a growing consultancy with a dedicated team serving hundreds of clients across Lucknow — from first-time homebuyers to seasoned investors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-brand px-7 py-3.5 text-sm font-semibold text-white hover:bg-emerald-dark transition-colors"
                >
                  Talk to Manish <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-emerald-brand px-7 py-3.5 text-sm font-semibold text-emerald-brand hover:bg-sage transition-colors"
                >
                  View Properties
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-sage">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                  alt="Manish Rawat — Founder"
                  fill
                  unoptimized
                  className="object-cover"
                />
                {/* Gold accent */}
                <div className="absolute -bottom-4 -right-4 h-48 w-48 rounded-3xl bg-gold/10 -z-10" />
              </div>
              {/* Stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-emerald-brand flex items-center justify-center">
                    <Star className="h-6 w-6 text-gold fill-gold" />
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-bold text-foreground">4.9/5</p>
                    <p className="text-xs text-muted-foreground">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-sage/30">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Home,
                label: 'Our Mission',
                heading: 'Making Property Buying Simple & Trustworthy',
                text: 'To be Lucknow\'s most trusted real estate partner by providing transparent, personalized, and expert guidance that empowers every client to make confident property decisions — from their first home to their next investment.',
                bg: 'bg-emerald-brand',
                textColor: 'text-white',
                subColor: 'text-white/70',
                iconBg: 'bg-white/10',
                iconColor: 'text-gold',
              },
              {
                icon: TrendingUp,
                label: 'Our Vision',
                heading: 'Transforming Lucknow\'s Real Estate Landscape',
                text: 'To build a real estate ecosystem in Lucknow where every transaction is marked by integrity, every client is treated like family, and every property is matched with its perfect owner — creating lasting value for generations.',
                bg: 'bg-white',
                textColor: 'text-foreground',
                subColor: 'text-muted-foreground',
                iconBg: 'bg-sage',
                iconColor: 'text-emerald-brand',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`${item.bg} rounded-3xl p-10 border border-border`}
                >
                  <div className={`h-14 w-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6`}>
                    <Icon className={`h-7 w-7 ${item.iconColor}`} />
                  </div>
                  <span className="text-gold text-xs font-bold tracking-widest uppercase">{item.label}</span>
                  <h3 className={`font-heading text-2xl font-bold ${item.textColor} mt-2 mb-4`}>{item.heading}</h3>
                  <p className={`${item.subColor} leading-relaxed`}>{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">What We Stand For</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Our Core Values</h2>
            <div className="gold-divider mx-auto mt-4 w-16" />
          </div>
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-7 border border-border hover:shadow-lg hover:border-emerald-brand/20 transition-all duration-300 group"
                >
                  <div className="h-12 w-12 rounded-xl bg-sage flex items-center justify-center mb-5 group-hover:bg-emerald-brand/10 transition-colors">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-emerald-brand">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Journey</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-3">Milestones</h2>
            <div className="gold-divider mx-auto mt-4 w-16" />
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />
            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-10"
            >
              {timeline.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="relative pl-16">
                  <div className="absolute left-0 top-1 h-12 w-12 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center">
                    <span className="text-gold text-xs font-bold">{item.year.slice(2)}</span>
                  </div>
                  <span className="text-gold text-xs font-semibold tracking-widest uppercase">{item.year}</span>
                  <h3 className="font-heading text-xl font-semibold text-white mt-1">{item.title}</h3>
                  <p className="text-white/70 mt-2 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Home, value: '500+', label: 'Properties Dealt' },
              { icon: Users, value: '350+', label: 'Happy Clients' },
              { icon: Award, value: '15+', label: 'Expert Agents' },
              { icon: Star, value: '4.9', label: 'Average Rating' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 text-center border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="h-12 w-12 rounded-xl bg-sage flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <p className="font-heading text-3xl font-bold text-emerald-brand">{stat.value}</p>
                  <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-sage/30">
        <div className="container-luxury text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Ready to Start Your Property Journey?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Get in touch with our team today and let us help you find the perfect property in Lucknow.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-brand px-8 py-4 font-semibold text-white hover:bg-emerald-dark transition-colors"
            >
              Contact Us <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-brand px-8 py-4 font-semibold text-emerald-brand hover:bg-emerald-brand hover:text-white transition-colors"
            >
              View Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
