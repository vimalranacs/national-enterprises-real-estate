'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import {
  Home, Building2, TrendingUp, Hammer, Settings, Users,
  CheckCircle, ArrowRight, PhoneCall,
} from 'lucide-react';
import { CONTACT } from '@/lib/constants';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };

const services = [
  {
    icon: Home,
    title: 'Residential Properties',
    tagline: 'Find Your Dream Home',
    description: 'Whether you are looking for a cozy 2 BHK apartment or a luxurious 5 BHK villa, our residential experts guide you to the perfect home in Lucknow\'s best localities.',
    features: [
      'Apartments & Flats',
      'Independent Houses & Villas',
      'Row Houses & Bungalows',
      'Penthouse Properties',
      'Affordable to Luxury Homes',
      'First-Time Buyer Assistance',
    ],
    href: '/properties?type=residential',
    cta: 'Explore Residential',
  },
  {
    icon: Building2,
    title: 'Commercial Properties',
    tagline: 'Grow Your Business',
    description: 'Prime commercial spaces for businesses of all sizes — from retail shops on high streets to premium office spaces in business hubs. We help you find the right commercial address.',
    features: [
      'Office Spaces & Co-working',
      'Retail Shops & Showrooms',
      'Warehouses & Godowns',
      'Commercial Plots',
      'Business Parks',
      'Hospitality Properties',
    ],
    href: '/properties?type=commercial',
    cta: 'Explore Commercial',
  },
  {
    icon: TrendingUp,
    title: 'Investment Advisory',
    tagline: 'Grow Your Wealth',
    description: 'Expert investment guidance backed by deep market knowledge. We identify high-potential properties with strong appreciation prospects and rental yield opportunities in Lucknow.',
    features: [
      'Investment Portfolio Planning',
      'High-ROI Property Identification',
      'Rental Yield Analysis',
      'Market Trend Reports',
      'NRI Investment Assistance',
      'RERA Compliant Properties',
    ],
    href: '/contact',
    cta: 'Get Investment Advice',
  },
  {
    icon: Hammer,
    title: 'Construction Services',
    tagline: 'Build Your Vision',
    description: 'End-to-end construction management from architectural design to handover. We partner with certified contractors to ensure your dream project is completed on time and within budget.',
    features: [
      'Architectural Design',
      'Structural Engineering',
      'Interior Design',
      'Project Management',
      'Quality Inspection',
      'Vastu Compliance',
    ],
    href: '/contact',
    cta: 'Discuss Your Project',
  },
  {
    icon: Settings,
    title: 'Property Management',
    tagline: 'Hassle-Free Ownership',
    description: 'Complete property management solutions for landlords and investors. From tenant sourcing to maintenance, we handle everything so you can enjoy passive income without the headaches.',
    features: [
      'Tenant Screening & Verification',
      'Rent Collection',
      'Maintenance Coordination',
      'Legal Documentation',
      'Property Inspection',
      'Monthly Reporting',
    ],
    href: '/contact',
    cta: 'Manage My Property',
  },
  {
    icon: Users,
    title: 'Property Consultancy',
    tagline: 'Expert Guidance',
    description: 'Personalized one-on-one consultancy tailored to your specific needs. Our experienced consultants provide honest, unbiased advice to help you navigate Lucknow\'s real estate market.',
    features: [
      'Market Research & Analysis',
      'Property Valuation',
      'Legal Due Diligence',
      'Negotiation Support',
      'Documentation Assistance',
      'Post-Sale Support',
    ],
    href: '/contact',
    cta: 'Book Consultation',
  },
];

export default function ServicesClient() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-emerald-brand py-20 md:py-28">
        <div className="container-luxury text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-3"
          >What We Offer</motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white"
          >Our Services</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-4 text-white/70 text-lg max-w-xl mx-auto"
          >
            Comprehensive real estate solutions designed to meet every property need across Lucknow.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-3xl p-8 border border-border hover:shadow-xl hover:border-emerald-brand/20 transition-all duration-300 flex flex-col"
                >
                  <div className="h-14 w-14 rounded-2xl bg-sage flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-gold" strokeWidth={1.8} />
                  </div>
                  <span className="text-gold text-xs font-semibold tracking-widest uppercase">{service.tagline}</span>
                  <h2 className="font-heading text-2xl font-bold text-foreground mt-1.5 mb-3">{service.title}</h2>
                  <div className="gold-divider-left mb-4" />
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                        <CheckCircle className="h-4 w-4 text-emerald-brand shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border-2 border-emerald-brand text-emerald-brand font-semibold text-sm hover:bg-emerald-brand hover:text-white transition-all duration-200"
                  >
                    {service.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-sage/30">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">How We Work</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Our Simple Process</h2>
            <div className="gold-divider mx-auto mt-4 w-16" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Initial Consultation', desc: 'Share your requirements and budget with our expert. We listen carefully and understand your vision.' },
              { step: '02', title: 'Property Shortlisting', desc: 'We curate a personalized list of properties that match your criteria from our extensive portfolio.' },
              { step: '03', title: 'Site Visits', desc: 'We arrange convenient site visits at your preferred time and guide you through each property in detail.' },
              { step: '04', title: 'Deal Closure', desc: 'Once you choose your property, we handle negotiations, documentation, and registration end-to-end.' },
            ].map((p) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex h-16 w-16 rounded-2xl bg-emerald-brand items-center justify-center text-gold font-heading text-2xl font-bold mb-5">
                  {p.step}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="bg-emerald-brand rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.03]" />
              <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-white/[0.03]" />
            </div>
            <div className="relative z-10">
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">Get Started Today</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-3">
                Ready to Find Your Perfect Property?
              </h2>
              <p className="text-white/70 mt-4 max-w-xl mx-auto">
                Our experts are just a call away. Let us guide you through every step of your real estate journey.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-semibold text-emerald-brand hover:bg-gold-light transition-colors"
                >
                  <PhoneCall className="h-4 w-4" />
                  Schedule Consultation
                </a>
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
