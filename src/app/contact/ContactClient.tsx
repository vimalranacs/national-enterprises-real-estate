'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle,
} from 'lucide-react';
import { CONTACT, SITE_CONFIG } from '@/lib/constants';

const contactItems = [
  {
    icon: Phone,
    label: 'Call Us',
    value: CONTACT.phone,
    sub: 'Available Mon–Sat, 9 AM – 7 PM',
    href: `tel:${CONTACT.phoneRaw}`,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: CONTACT.whatsapp,
    sub: 'Chat with us anytime',
    href: CONTACT.whatsappLink,
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT.email,
    sub: 'We reply within 24 hours',
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Lucknow, Uttar Pradesh',
    sub: CONTACT.address,
    href: '#',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon–Fri: 9 AM – 7 PM',
    sub: `Sat: ${CONTACT.businessHours.saturday} | Sun: ${CONTACT.businessHours.sunday}`,
    href: '#',
  },
];

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — Supabase integration will go here in Phase 3
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="bg-emerald-brand py-20 md:py-28">
        <div className="container-luxury text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-3"
          >Get in Touch</motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white"
          >Contact Us</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-4 text-white/70 text-lg max-w-xl mx-auto"
          >
            Have a property question? Our experts are ready to help you find the right solution.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* LEFT — Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Let&apos;s Talk</h2>
                <p className="text-muted-foreground mt-2">
                  Reach out through any of these channels and we&apos;ll get back to you promptly.
                </p>
              </div>

              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const isLink = item.href !== '#';
                const Wrapper = isLink ? 'a' : 'div';
                const props = isLink
                  ? { href: item.href, target: item.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                  : {};

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {/* @ts-ignore */}
                    <Wrapper
                      {...props}
                      className={`flex items-start gap-4 p-5 rounded-2xl border border-border bg-white transition-all duration-200 ${
                        isLink ? 'hover:border-emerald-brand/30 hover:shadow-md cursor-pointer' : ''
                      }`}
                    >
                      <div className="h-11 w-11 rounded-xl bg-sage flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-foreground mt-0.5">{item.value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                      </div>
                    </Wrapper>
                  </motion.div>
                );
              })}

              {/* Quick WhatsApp */}
              <a
                href={CONTACT.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors mt-2"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp Now
              </a>
            </div>

            {/* RIGHT — Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl border border-border p-8 md:p-10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="h-20 w-20 rounded-full bg-sage flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="h-10 w-10 text-emerald-brand" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground">Message Sent!</h3>
                    <p className="text-muted-foreground mt-3 max-w-sm mx-auto">
                      Thank you for reaching out. Our team will contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', type: '', message: '' }); }}
                      className="mt-6 px-6 py-3 rounded-full bg-emerald-brand text-white text-sm font-semibold hover:bg-emerald-dark transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Send an Inquiry</h2>
                    <p className="text-muted-foreground text-sm mb-8">Fill out the form and we&apos;ll get back to you shortly.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your full name"
                            className="w-full px-4 py-3.5 rounded-xl border border-border bg-ivory focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number *</label>
                          <input
                            required
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full px-4 py-3.5 rounded-xl border border-border bg-ivory focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-ivory focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Property Interest</label>
                        <select
                          value={form.type}
                          onChange={(e) => setForm({ ...form, type: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-ivory focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all text-sm"
                        >
                          <option value="">Select property type</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="apartment">Apartment</option>
                          <option value="plot">Plot</option>
                          <option value="villa">Luxury Villa</option>
                          <option value="farmhouse">Farm House</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us about your property requirements..."
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-ivory focus:outline-none focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/10 transition-all text-sm resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-emerald-brand text-white font-semibold hover:bg-emerald-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </button>
                      <p className="text-xs text-muted-foreground text-center">
                        By submitting this form you agree to be contacted by {SITE_CONFIG.name}.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
