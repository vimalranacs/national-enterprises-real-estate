import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services | National Enterprises Real Estate',
  description:
    'National Enterprises Real Estate offers residential, commercial, investment advisory, construction services, property management, and consultancy across Lucknow.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
