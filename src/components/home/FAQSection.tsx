'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const faqData = [
  {
    id: '1',
    question: 'How do I start the property buying process?',
    answer:
      'The process begins with an initial consultation where we understand your requirements, budget, and preferred locations. Our experts then curate a list of matching properties, arrange site visits, and guide you through negotiations, documentation, and registration — all at no upfront cost to you.',
  },
  {
    id: '2',
    question: 'What documents are needed to buy a property in Lucknow?',
    answer:
      'You will typically need Aadhaar Card, PAN Card, address proof, passport-size photographs, income proof (salary slips or ITR), and bank statements. For home loan applications, additional documents such as employment certificate and Form 16 may be required. Our team helps you prepare the complete checklist.',
  },
  {
    id: '3',
    question: 'Do you help with home loans?',
    answer:
      'Yes, we have strong partnerships with leading banks and financial institutions including SBI, HDFC, ICICI, and Axis Bank. We assist you in comparing interest rates, processing loan applications, and ensuring fast approvals with the best possible terms for your purchase.',
  },
  {
    id: '4',
    question: 'What areas in Lucknow do you cover?',
    answer:
      'We cover all major localities across Lucknow including Gomti Nagar, Hazratganj, Aliganj, Indira Nagar, Jankipuram, Sushant Golf City, Chinhat, Faizabad Road, Kanpur Road, Raebareli Road, Shaheed Path, and Sultanpur Road. We are continuously expanding our coverage to new developing areas.',
  },
  {
    id: '5',
    question: 'How do you verify properties?',
    answer:
      'Every property listed with us undergoes a thorough legal verification process. This includes title deed verification, encumbrance check, RERA registration status, land use verification, and builder background check. We engage certified legal professionals to ensure you invest in a completely safe and dispute-free property.',
  },
  {
    id: '6',
    question: 'What are the charges for your services?',
    answer:
      'Our initial consultation and property search services are completely free of charge for buyers. We earn a standard brokerage commission only upon successful completion of a transaction, which is transparently communicated upfront. There are no hidden fees or surprise charges.',
  },
  {
    id: '7',
    question: 'Can I schedule a site visit?',
    answer:
      'Absolutely! You can schedule a site visit through our website, by calling us at +91 7705869153, or via WhatsApp. We offer flexible timing including weekends and can arrange multiple property visits in a single trip to save your time. Our representative will accompany you to answer all your questions on-site.',
  },
  {
    id: '8',
    question: 'Do you help with property registration?',
    answer:
      'Yes, we provide end-to-end support for property registration. Our team handles stamp duty calculation, document preparation, sub-registrar appointment booking, and accompanies you throughout the registration process. We also assist with mutation and utility connections post-registration to ensure a hassle-free experience.',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about buying, selling, and investing in Lucknow real estate"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.07 },
            },
          }}
          className="mx-auto max-w-3xl"
        >
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                className="border-b border-border py-5"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-lg font-medium text-foreground">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-base leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
