import type { Metadata } from 'next';
import { properties } from '@/lib/data/properties';
import PropertiesClient from './PropertiesClient';

export const metadata: Metadata = {
  title: 'Properties in Lucknow | Buy & Rent Residential, Commercial, Villas',
  description:
    'Browse premium residential, commercial, apartments, plots, farmhouses and luxury villas for sale and rent in Lucknow. Filter by location, price, and area.',
  keywords: [
    'Properties in Lucknow',
    'Buy Property Lucknow',
    'Rent Property Lucknow',
    'Apartments Lucknow',
    'Villas Lucknow',
    'Plots Lucknow',
  ],
};

export default function PropertiesPage() {
  return <PropertiesClient allProperties={properties} />;
}
