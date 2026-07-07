import type { Metadata } from 'next';
import AgentsClient from './AgentsClient';

export const metadata: Metadata = {
  title: 'Our Agents | National Enterprises Real Estate',
  description:
    'Meet our experienced team of real estate consultants at National Enterprises. Expert guidance for buying, selling, and renting properties in Lucknow.',
};

export default function AgentsPage() {
  return <AgentsClient />;
}
