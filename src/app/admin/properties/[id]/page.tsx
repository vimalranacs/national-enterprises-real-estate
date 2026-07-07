import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import PropertyForm from '../_components/PropertyForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (!property) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
        <p className="text-gray-500 text-sm mt-1 truncate">{property.title}</p>
      </div>
      <PropertyForm mode="edit" property={property} />
    </div>
  );
}
