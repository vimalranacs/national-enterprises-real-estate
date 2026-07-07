import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import InquiriesClient from './_components/InquiriesClient';

export default async function InquiriesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-500 text-sm mt-1">
          {inquiries?.filter((i) => !i.is_read).length ?? 0} unread · {inquiries?.length ?? 0} total
        </p>
      </div>
      <InquiriesClient inquiries={inquiries ?? []} />
    </div>
  );
}
