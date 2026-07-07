import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { mapSupabaseProperty } from '@/lib/supabase/utils';
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

export const dynamic = 'force-dynamic';

export default async function PropertiesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  const properties = (data || []).map(mapSupabaseProperty);

  return <PropertiesClient allProperties={properties} />;
}
