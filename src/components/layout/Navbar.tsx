'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { PhoneCall, Menu, X, ChevronRight } from 'lucide-react';
import { NAV_LINKS, CONTACT, SITE_CONFIG } from '@/lib/constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 w-full"
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? 'rgba(255, 255, 255, 0.97)'
            : 'rgba(252, 251, 248, 1)',
          boxShadow: isScrolled
            ? '0 4px 30px rgba(0, 0, 0, 0.06)'
            : '0 0 0 rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {/* Top accent line */}
        <div className="h-[2px] bg-gradient-to-r from-emerald-brand via-gold to-emerald-brand" />

        <nav className="container-luxury">
          <motion.div
            className="flex items-center justify-between"
            initial={false}
            animate={{
              paddingTop: isScrolled ? '12px' : '18px',
              paddingBottom: isScrolled ? '12px' : '18px',
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {/* Logo */}
            <Link href="/" className="relative flex items-center gap-3 group">
              <motion.div
                initial={false}
                animate={{
                  height: isScrolled ? 40 : 50,
                  width: isScrolled ? 40 : 50,
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="relative overflow-hidden rounded-xl"
              >
                <Image
                  src="/logo.png"
                  alt={SITE_CONFIG.shortName}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="font-heading text-lg font-bold text-emerald-brand leading-tight tracking-tight">
                  National
                  <span className="text-gold"> Enterprises</span>
                </h1>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#5F6368]">
                  Real Estate
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-[#1A1A1A] transition-colors hover:text-emerald-brand group"
                >
                  {link.label}
                  {/* Hover underline */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gold transition-all duration-300 ease-out group-hover:w-[60%] rounded-full" />
                </Link>
              ))}
            </div>

            {/* Right Section: Phone + CTA */}
            <div className="flex items-center gap-3">
              {/* Phone */}
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="hidden md:flex items-center gap-2 text-sm font-medium text-[#1A1A1A] hover:text-emerald-brand transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage">
                  <PhoneCall className="h-4 w-4 text-gold" />
                </span>
                <span className="hidden xl:inline">{CONTACT.phone}</span>
              </a>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-emerald-brand px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-dark hover:shadow-lg hover:shadow-emerald-brand/20"
              >
                List Property
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-emerald-brand transition-colors hover:bg-sage-dark"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay + Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 z-[70] h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#E9E9E9]">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl">
                    <Image
                      src="/logo.png"
                      alt={SITE_CONFIG.shortName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-bold text-emerald-brand">
                      National <span className="text-gold">Enterprises</span>
                    </p>
                    <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#5F6368]">
                      Real Estate
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage text-emerald-brand transition-colors hover:bg-sage-dark"
                  aria-label="Close menu"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Drawer Nav Links */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-1">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-[#1A1A1A] transition-all hover:bg-sage hover:text-emerald-brand"
                      >
                        {link.label}
                        <ChevronRight className="h-4 w-4 text-[#5F6368]" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Gold divider */}
                <div className="gold-divider my-6" />

                {/* Mobile Phone */}
                <motion.a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-center gap-3 rounded-2xl bg-sage px-4 py-3.5 transition-colors hover:bg-sage-dark"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45, duration: 0.3 }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <PhoneCall className="h-4.5 w-4.5 text-gold" />
                  </span>
                  <div>
                    <p className="text-xs text-[#5F6368]">Call Us</p>
                    <p className="text-sm font-semibold text-emerald-brand">
                      {CONTACT.phone}
                    </p>
                  </div>
                </motion.a>
              </div>

              {/* Drawer Footer CTA */}
              <div className="border-t border-[#E9E9E9] px-6 py-5">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-brand px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-dark hover:shadow-lg"
                >
                  List Your Property
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
