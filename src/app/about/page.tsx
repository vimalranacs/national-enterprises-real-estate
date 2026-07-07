import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | National Enterprises Real Estate',
  description:
    'Learn about National Enterprises Real Estate, founded by Manish Rawat in 2026. Our mission is to provide transparent, personalized real estate consultancy in Lucknow.',
};

export default function AboutPage() {
  return <AboutClient />;
}
