import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Home, MessageSquare, Plus, TrendingUp, Eye, Package } from 'lucide-react';

async function getStats(supabase: Awaited<ReturnType<typeof createClient>>) {
  const [
    { count: totalProperties },
    { count: featuredProperties },
    { count: totalInquiries },
    { count: newInquiries },
  ] = await Promise.all([
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('is_featured', true),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('is_read', false),
  ]);

  return { totalProperties, featuredProperties, totalInquiries, newInquiries };
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const stats = await getStats(supabase);

  // Recent properties
  const { data: recentProperties } = await supabase
    .from('properties')
    .select('id, title, type, price_label, status, is_active, is_featured, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  // Recent inquiries
  const { data: recentInquiries } = await supabase
    .from('inquiries')
    .select('id, name, phone, property_type, message, created_at, is_read')
    .order('created_at', { ascending: false })
    .limit(5);

  const statCards = [
    { icon: Home, label: 'Total Properties', value: stats.totalProperties ?? 0, color: 'bg-emerald-50 text-emerald-700', iconBg: 'bg-emerald-100' },
    { icon: TrendingUp, label: 'Featured', value: stats.featuredProperties ?? 0, color: 'bg-amber-50 text-amber-700', iconBg: 'bg-amber-100' },
    { icon: MessageSquare, label: 'Total Inquiries', value: stats.totalInquiries ?? 0, color: 'bg-blue-50 text-blue-700', iconBg: 'bg-blue-100' },
    { icon: Eye, label: 'Unread Inquiries', value: stats.newInquiries ?? 0, color: 'bg-red-50 text-red-700', iconBg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`rounded-2xl p-5 border border-gray-100 bg-white shadow-sm`}>
              <div className={`h-10 w-10 rounded-xl ${card.iconBg} flex items-center justify-center mb-3`}>
                <Icon className={`h-5 w-5 ${card.color.split(' ')[1]}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/admin/properties/new', icon: Plus, label: 'Add New Property', desc: 'List a new property', color: 'bg-[#0E3B2E] text-white' },
          { href: '/admin/properties', icon: Package, label: 'Manage Properties', desc: 'Edit, delete, feature', color: 'bg-white text-gray-900 border border-gray-200' },
          { href: '/admin/inquiries', icon: MessageSquare, label: 'View Inquiries', desc: `${stats.newInquiries ?? 0} unread messages`, color: 'bg-white text-gray-900 border border-gray-200' },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.href} href={action.href}
              className={`${action.color} rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow`}
            >
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">{action.label}</p>
                <p className={`text-xs mt-0.5 ${action.color.includes('0E3B2E') ? 'text-white/60' : 'text-gray-400'}`}>{action.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Properties</h2>
            <Link href="/admin/properties" className="text-xs text-[#0E3B2E] font-medium hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentProperties && recentProperties.length > 0 ? recentProperties.map((p) => (
              <Link key={p.id} href={`/admin/properties/${p.id}`}
                className="flex items-center gap-3 px-6 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <Home className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                  <p className="text-xs text-gray-400 capitalize">{p.type} · {p.status === 'buy' ? 'For Sale' : 'For Rent'}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-[#0E3B2E]">{p.price_label}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.is_active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {p.is_active ? 'Active' : 'Hidden'}
                  </span>
                </div>
              </Link>
            )) : (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">
                No properties yet. <Link href="/admin/properties/new" className="text-[#0E3B2E] font-medium">Add your first one →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs text-[#0E3B2E] font-medium hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentInquiries && recentInquiries.length > 0 ? recentInquiries.map((inq) => (
              <div key={inq.id} className="px-6 py-3.5 flex items-start gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${inq.is_read ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'}`}>
                  {inq.name?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{inq.name}</p>
                    {!inq.is_read && <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-400">{inq.phone} · {inq.property_type || 'General'}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{inq.message}</p>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">No inquiries yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
