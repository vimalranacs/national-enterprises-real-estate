'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  LayoutDashboard, Home, Plus, LogOut, Menu, X,
  Building2, MessageSquare, ChevronRight,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Home, label: 'Properties', href: '/admin/properties' },
  { icon: Plus, label: 'Add Property', href: '/admin/properties/new' },
  { icon: MessageSquare, label: 'Inquiries', href: '/admin/inquiries' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserEmail(data.user.email ?? '');
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex">
      {/* Sidebar */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 z-40 h-full w-64 bg-[#0E3B2E] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Logo */}
          <div className="px-6 py-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#C9A14A]/10 border border-[#C9A14A]/20 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-[#C9A14A]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">National Enterprises</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#C9A14A] text-[#0E3B2E]'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                  {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* User + Logout */}
          <div className="px-3 py-4 border-t border-white/10 space-y-2">
            <div className="px-3 py-2.5 rounded-xl bg-white/[0.04]">
              <p className="text-white/40 text-[10px] uppercase tracking-wider">Logged in as</p>
              <p className="text-white text-xs font-medium mt-0.5 truncate">{userEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              <Home className="h-4 w-4" />
              View Website
            </Link>
          </div>
        </aside>
      </>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
            <span>Admin</span>
            {pathname !== '/admin' && (
              <>
                <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                <span className="text-gray-900 font-medium capitalize truncate">
                  {pathname.split('/').filter(Boolean).slice(1).join(' › ')}
                </span>
              </>
            )}
          </div>

          <div className="ml-auto">
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0E3B2E] text-white text-sm font-medium hover:bg-[#0a2e23] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Property
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
