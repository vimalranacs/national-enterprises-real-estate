'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { PhoneCall, MessageCircle, Mail, MapPin, Clock, Send } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { CONTACT } from '@/lib/constants';

const contactInfo = [
  {
    icon: PhoneCall,
    label: 'Phone',
    value: CONTACT.phone,
    sublabel: 'Call us anytime',
    href: `tel:${CONTACT.phoneRaw}`,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: CONTACT.whatsapp,
    sublabel: 'Chat with us',
    href: CONTACT.whatsappLink,
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT.email,
    sublabel: 'We reply within 24 hours',
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: MapPin,
    label: 'Address',
    value: CONTACT.address,
    sublabel: 'Visit our office',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: `Weekdays: ${CONTACT.businessHours.weekdays}`,
    sublabel: `Saturday: ${CONTACT.businessHours.saturday} · Sunday: ${CONTACT.businessHours.sunday}`,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic to be added later
  };

  return (
    <section className="section-padding bg-sage/30">
      <div className="container-luxury">
        <SectionHeading
          title="Get in Touch"
          subtitle="Ready to start your property journey? Reach out to us and our experts will guide you every step of the way."
        />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: Contact info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const Wrapper = item.href ? 'a' : 'div';
              const linkProps = item.href
                ? { href: item.href, target: item.href.startsWith('http') ? '_blank' : undefined, rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined }
                : {};

              return (
                <motion.div key={item.label} variants={itemVariants}>
                  <Wrapper
                    {...linkProps}
                    className="mb-6 flex items-start gap-4 group"
                  >
                    <span className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sage">
                      <Icon className="h-5 w-5 text-gold" />
                    </span>
                    <div>
                      <p className="font-heading text-base font-semibold text-foreground group-hover:text-emerald-brand transition-colors">
                        {item.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.sublabel}
                      </p>
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: Inquiry form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-8 shadow-lg"
            >
              <h3 className="mb-6 font-heading text-xl font-bold text-foreground">
                Quick Inquiry
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-border bg-transparent p-4 text-foreground placeholder:text-muted-foreground focus:border-emerald-brand focus:outline-none focus:ring-1 focus:ring-emerald-brand transition-colors"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-border bg-transparent p-4 text-foreground placeholder:text-muted-foreground focus:border-emerald-brand focus:outline-none focus:ring-1 focus:ring-emerald-brand transition-colors"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-border bg-transparent p-4 text-foreground placeholder:text-muted-foreground focus:border-emerald-brand focus:outline-none focus:ring-1 focus:ring-emerald-brand transition-colors"
                />

                <textarea
                  name="message"
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-transparent p-4 text-foreground placeholder:text-muted-foreground focus:border-emerald-brand focus:outline-none focus:ring-1 focus:ring-emerald-brand transition-colors"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-brand py-4 font-semibold text-white transition-colors hover:bg-emerald-dark"
              >
                Send Inquiry
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
