import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import PropertyForm from '../_components/PropertyForm';

export default async function NewPropertyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in all the details and upload photos.</p>
      </div>
      <PropertyForm mode="create" />
    </div>
  );
}
