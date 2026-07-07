import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | National Enterprises Real Estate',
  description:
    'Get in touch with National Enterprises Real Estate. Call, WhatsApp, or email us for property inquiries, site visits, and real estate consultancy in Lucknow.',
};

export default function ContactPage() {
  return <ContactClient />;
}
