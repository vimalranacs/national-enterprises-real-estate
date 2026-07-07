'use client';

import { useState } from 'react';
import { MessageSquare, Phone, Mail, Clock, CheckCheck, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  property_type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function InquiriesClient({ inquiries: initial }: { inquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState(initial);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const markRead = async (id: string) => {
    const supabase = createClient();
    await supabase.from('inquiries').update({ is_read: true }).eq('id', id);
    setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, is_read: true } : i));
  };

  const deleteInquiry = async (id: string) => {
    const supabase = createClient();
    await supabase.from('inquiries').delete().eq('id', id);
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    if (selected?.id === id) setSelected(null);
    setDeletingId(null);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {inquiries.length === 0 ? (
        <div className="py-20 text-center">
          <MessageSquare className="h-12 w-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No inquiries yet.</p>
          <p className="text-gray-300 text-sm mt-1">When visitors submit the contact form, they&apos;ll appear here.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {inquiries.map((inq) => (
            <div key={inq.id}
              className={`px-6 py-4 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors ${selected?.id === inq.id ? 'bg-blue-50' : ''}`}
              onClick={() => { setSelected(inq); if (!inq.is_read) markRead(inq.id); }}
            >
              {/* Avatar */}
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${inq.is_read ? 'bg-gray-100 text-gray-400' : 'bg-[#0E3B2E]/10 text-[#0E3B2E]'}`}>
                {inq.name?.[0]?.toUpperCase()}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-semibold ${inq.is_read ? 'text-gray-700' : 'text-gray-900'}`}>{inq.name}</p>
                  {!inq.is_read && <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />}
                  <span className="ml-auto text-xs text-gray-400 shrink-0">{formatDate(inq.created_at)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{inq.phone} {inq.email ? `· ${inq.email}` : ''}</p>
                <p className={`text-sm mt-1 line-clamp-1 ${inq.is_read ? 'text-gray-400' : 'text-gray-600'}`}>{inq.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Inquiry Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 text-xl leading-none">×</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">From</p>
                <p className="font-semibold text-gray-900 text-lg">{selected.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a href={`tel:${selected.phone}`}
                  className="flex items-center gap-2.5 bg-green-50 text-green-700 rounded-xl px-4 py-3 text-sm font-medium hover:bg-green-100 transition-colors">
                  <Phone className="h-4 w-4" /> {selected.phone}
                </a>
                {selected.email && (
                  <a href={`mailto:${selected.email}`}
                    className="flex items-center gap-2.5 bg-blue-50 text-blue-700 rounded-xl px-4 py-3 text-sm font-medium hover:bg-blue-100 transition-colors">
                    <Mail className="h-4 w-4" /> Email
                  </a>
                )}
              </div>
              {selected.property_type && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Interest</p>
                  <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm capitalize">{selected.property_type}</span>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Message</p>
                <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4 text-sm">{selected.message}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="h-3.5 w-3.5" />
                {formatDate(selected.created_at)}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => markRead(selected.id)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0E3B2E]/5 text-[#0E3B2E] text-sm font-medium hover:bg-[#0E3B2E]/10 transition-colors"
              >
                <CheckCheck className="h-4 w-4" /> Mark as Read
              </button>
              {deletingId === selected.id ? (
                <button
                  onClick={() => deleteInquiry(selected.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" /> Confirm Delete
                </button>
              ) : (
                <button
                  onClick={() => setDeletingId(selected.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-500 text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
