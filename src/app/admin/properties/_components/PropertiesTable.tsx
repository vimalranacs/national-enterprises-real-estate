'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search, Edit2, Trash2, Eye, EyeOff, Star, StarOff,
  Home, ChevronUp, ChevronDown,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Property {
  id: string;
  title: string;
  type: string;
  status: string;
  price_label: string;
  area: string;
  bedrooms: number | null;
  is_active: boolean;
  is_featured: boolean;
  images: string[] | null;
  created_at: string;
}

export default function PropertiesTable({ properties: initial }: { properties: Property[] }) {
  const router = useRouter();
  const [properties, setProperties] = useState(initial);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const filtered = properties.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.type.toLowerCase().includes(search.toLowerCase()) ||
    (p.area ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const toggleField = async (id: string, field: 'is_active' | 'is_featured', current: boolean) => {
    setLoading(id + field);
    const supabase = createClient();
    const { error } = await supabase.from('properties').update({ [field]: !current }).eq('id', id);
    if (!error) {
      setProperties((prev) => prev.map((p) => p.id === id ? { ...p, [field]: !current } : p));
    }
    setLoading(null);
  };

  const deleteProperty = async (id: string) => {
    setLoading(id + 'delete');
    const supabase = createClient();
    // Delete images from storage
    const prop = properties.find((p) => p.id === id);
    if (prop?.images?.length) {
      const paths = prop.images.map((url) => url.split('/property-images/')[1]).filter(Boolean);
      if (paths.length) await supabase.storage.from('property-images').remove(paths);
    }
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (!error) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
    setDeleteId(null);
    setLoading(null);
  };

  return (
    <>
      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#0E3B2E] focus:ring-2 focus:ring-[#0E3B2E]/10 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Property</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider hidden lg:table-cell">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider hidden lg:table-cell">Area</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Status</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Featured</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                    {search ? 'No properties match your search.' : 'No properties yet. '}
                    {!search && (
                      <Link href="/admin/properties/new" className="text-[#0E3B2E] font-medium hover:underline">
                        Add your first property →
                      </Link>
                    )}
                  </td>
                </tr>
              )}
              {filtered.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 overflow-hidden">
                        {property.images?.[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={property.images[0]} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <Home className="h-5 w-5 text-emerald-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[180px]">{property.title}</p>
                        <p className="text-xs text-gray-400 capitalize">{property.status === 'buy' ? 'For Sale' : 'For Rent'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium capitalize">
                      {property.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="font-semibold text-[#0E3B2E]">{property.price_label || '—'}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell text-gray-500">{property.area || '—'}</td>

                  {/* Active toggle */}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => toggleField(property.id, 'is_active', property.is_active)}
                      disabled={loading === property.id + 'is_active'}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        property.is_active
                          ? 'bg-green-50 text-green-600 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {property.is_active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      {property.is_active ? 'Live' : 'Hidden'}
                    </button>
                  </td>

                  {/* Featured toggle */}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => toggleField(property.id, 'is_featured', property.is_featured)}
                      disabled={loading === property.id + 'is_featured'}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        property.is_featured
                          ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {property.is_featured ? <Star className="h-3.5 w-3.5 fill-current" /> : <StarOff className="h-3.5 w-3.5" />}
                      {property.is_featured ? 'Featured' : 'Normal'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/properties/${property.id}`}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(property.id)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center">Delete Property?</h3>
            <p className="text-gray-500 text-sm text-center mt-2">
              This will permanently delete the property and all its photos. This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProperty(deleteId)}
                disabled={loading === deleteId + 'delete'}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-60"
              >
                {loading === deleteId + 'delete' ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
