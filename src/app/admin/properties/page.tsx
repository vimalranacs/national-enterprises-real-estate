import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import PropertiesTable from './_components/PropertiesTable';

export default async function AdminPropertiesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-500 text-sm mt-1">
            {properties?.length ?? 0} total properties
          </p>
        </div>
        <Link
          href="/admin/properties/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E3B2E] text-white text-sm font-semibold hover:bg-[#0a2e23] transition-colors"
        >
          + Add Property
        </Link>
      </div>

      <PropertiesTable properties={properties ?? []} />
    </div>
  );
}
