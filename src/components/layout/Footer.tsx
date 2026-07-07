'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Share2,
  Camera,
  BriefcaseBusiness,
  Video,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { NAV_LINKS, CONTACT, SITE_CONFIG, LUCKNOW_AREAS } from '@/lib/constants';

const QUICK_LINKS = NAV_LINKS.filter((link) =>
  ['Home', 'About', 'Properties', 'Services', 'Contact'].includes(link.label)
);

const POPULAR_AREAS = LUCKNOW_AREAS.slice(0, 6);

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: Share2, href: '#' },
  { label: 'Instagram', icon: Camera, href: '#' },
  { label: 'LinkedIn', icon: BriefcaseBusiness, href: '#' },
  { label: 'YouTube', icon: Video, href: '#' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function Footer() {
  return (
    <footer className="relative bg-emerald-brand">
      {/* Gold divider at top */}
      <div className="gold-divider" />

      {/* Main Footer Content */}
      <div className="container-luxury py-16 md:py-20">
        <motion.div
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Column 1: Logo + Description + Social */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/logo.png"
                  alt={SITE_CONFIG.shortName}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white leading-tight">
                  National
                  <span className="text-gold"> Enterprises</span>
                </h3>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                  Real Estate
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-xs">
              {SITE_CONFIG.tagline} — Lucknow&apos;s trusted real estate
              consultancy helping you find your dream property with transparency
              and personalized guidance.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-gold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    <ChevronRight className="h-3 w-3 text-gold/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-gold" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Popular Areas */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-gold mb-6">
              Popular Areas
            </h4>
            <ul className="space-y-3">
              {POPULAR_AREAS.map((area) => (
                <li key={area}>
                  <Link
                    href={`/locations/${area.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    <ChevronRight className="h-3 w-3 text-gold/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-gold" />
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading text-sm font-bold uppercase tracking-[0.15em] text-gold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {/* Phone */}
              <li>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="group flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <PhoneCall className="h-3.5 w-3.5 text-gold" />
                  </span>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">Phone</p>
                    <p>{CONTACT.phone}</p>
                  </div>
                </a>
              </li>

              {/* WhatsApp */}
              <li>
                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <MessageCircle className="h-3.5 w-3.5 text-gold" />
                  </span>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">WhatsApp</p>
                    <p>{CONTACT.whatsapp}</p>
                  </div>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <Mail className="h-3.5 w-3.5 text-gold" />
                  </span>
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">Email</p>
                    <p>{CONTACT.email}</p>
                  </div>
                </a>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3 text-sm text-white/70">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <MapPin className="h-3.5 w-3.5 text-gold" />
                </span>
                <div>
                  <p className="text-xs text-white/40 mb-0.5">Address</p>
                  <p>{CONTACT.address}</p>
                </div>
              </li>

              {/* Business Hours */}
              <li className="flex items-start gap-3 text-sm text-white/70">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
                  <Clock className="h-3.5 w-3.5 text-gold" />
                </span>
                <div>
                  <p className="text-xs text-white/40 mb-0.5">Business Hours</p>
                  <p>Mon-Fri: {CONTACT.businessHours.weekdays}</p>
                  <p>Sat: {CONTACT.businessHours.saturday}</p>
                  <p>Sun: {CONTACT.businessHours.sunday}</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-luxury py-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} National Enterprises Real Estate. All
              rights reserved.
            </p>
            <p className="flex items-center gap-1 text-xs text-white/50">
              Designed with{' '}
              <Heart className="h-3 w-3 fill-gold text-gold" /> in
              Lucknow
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
