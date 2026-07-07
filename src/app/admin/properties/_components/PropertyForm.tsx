'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, GripVertical, Plus, CheckSquare, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { LUCKNOW_AREAS, PROPERTY_TYPES } from '@/lib/constants';

// ── Types ────────────────────────────────────────────────────────────────────
interface PropertyData {
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  price?: number;
  price_label?: string;
  type?: string;
  status?: string;
  area?: string;
  city?: string;
  state?: string;
  address?: string;
  pincode?: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area_sqft?: number | null;
  parking?: number | null;
  floors?: number | null;
  facing?: string;
  furnishing?: string;
  amenities?: string[];
  images?: string[];
  is_featured?: boolean;
  is_active?: boolean;
}

interface Props {
  mode: 'create' | 'edit';
  property?: PropertyData;
}

// ── Constants ────────────────────────────────────────────────────────────────
const AMENITIES_LIST = [
  'Lift / Elevator', 'Power Backup', 'Security / Guard', 'CCTV Surveillance',
  'Club House', 'Swimming Pool', 'Gym / Fitness Center', 'Children Play Area',
  'Garden / Park', 'Indoor Games', 'Intercom', 'Rain Water Harvesting',
  'Solar Power', 'Vastu Compliant', 'Gated Society', 'Visitor Parking',
  'Covered Parking', 'Two Wheeler Parking', 'Gas Pipeline', 'Water Supply 24x7',
  'Modular Kitchen', 'Balcony', 'Terrace', 'Store Room',
];

const FURNISHING_OPTIONS = ['unfurnished', 'semi-furnished', 'furnished'];
const FACING_OPTIONS = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

// ── Image Upload Row ──────────────────────────────────────────────────────────
interface ImagePreview {
  url: string;
  file?: File;
  uploading?: boolean;
  error?: string;
}

// ── Main Form ─────────────────────────────────────────────────────────────────
export default function PropertyForm({ mode, property }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [title, setTitle] = useState(property?.title ?? '');
  const [slug, setSlug] = useState(property?.slug ?? '');
  const [description, setDescription] = useState(property?.description ?? '');
  const [price, setPrice] = useState(property?.price?.toString() ?? '');
  const [priceLabel, setPriceLabel] = useState(property?.price_label ?? '');
  const [type, setType] = useState(property?.type ?? 'residential');
  const [status, setStatus] = useState(property?.status ?? 'buy');
  const [area, setArea] = useState(property?.area ?? '');
  const [city, setCity] = useState(property?.city ?? 'Lucknow');
  const [state, setState] = useState(property?.state ?? 'Uttar Pradesh');
  const [address, setAddress] = useState(property?.address ?? '');
  const [pincode, setPincode] = useState(property?.pincode ?? '');
  const [bedrooms, setBedrooms] = useState(property?.bedrooms?.toString() ?? '');
  const [bathrooms, setBathrooms] = useState(property?.bathrooms?.toString() ?? '');
  const [areaSqft, setAreaSqft] = useState(property?.area_sqft?.toString() ?? '');
  const [parking, setParking] = useState(property?.parking?.toString() ?? '');
  const [floors, setFloors] = useState(property?.floors?.toString() ?? '');
  const [facing, setFacing] = useState(property?.facing ?? '');
  const [furnishing, setFurnishing] = useState(property?.furnishing ?? '');
  const [amenities, setAmenities] = useState<string[]>(property?.amenities ?? []);
  const [isFeatured, setIsFeatured] = useState(property?.is_featured ?? false);
  const [isActive, setIsActive] = useState(property?.is_active ?? true);

  // Images
  const [images, setImages] = useState<ImagePreview[]>(
    (property?.images ?? []).map((url) => ({ url }))
  );
  const [uploadingImages, setUploadingImages] = useState(false);

  // Form status
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (mode === 'create') setSlug(slugify(val));
  };

  // Toggle amenity
  const toggleAmenity = (a: string) => {
    setAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  };

  // Upload images to Supabase Storage
  const handleImageFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingImages(true);
    const supabase = createClient();

    const newImages: ImagePreview[] = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      file,
      uploading: true,
    }));

    setImages((prev) => [...prev, ...newImages]);

    const uploadedImages: ImagePreview[] = await Promise.all(
      newImages.map(async (img) => {
        if (!img.file) return img;
        const ext = img.file.name.split('.').pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error } = await supabase.storage
          .from('property-images')
          .upload(path, img.file, { cacheControl: '3600', upsert: false });

        if (error) {
          return { ...img, uploading: false, error: error.message };
        }

        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(path);

        return { url: publicUrl, uploading: false };
      })
    );

    setImages((prev) => {
      const withoutUploading = prev.filter((p) => !p.uploading);
      return [...withoutUploading, ...uploadedImages];
    });
    setUploadingImages(false);
  }, []);

  const removeImage = async (index: number) => {
    const img = images[index];
    // If it's a Supabase URL, delete from storage
    if (img.url.includes('supabase') && img.url.includes('property-images')) {
      const path = img.url.split('/property-images/')[1];
      if (path) {
        const supabase = createClient();
        await supabase.storage.from('property-images').remove([path]);
      }
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Save / Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaveSuccess(false);
    setSaving(true);

    const supabase = createClient();
    const finalImages = images.filter((img) => !img.uploading && !img.error).map((img) => img.url);

    const payload = {
      title,
      slug,
      description,
      price: price ? Number(price) : null,
      price_label: priceLabel,
      type,
      status,
      area,
      city,
      state,
      address,
      pincode,
      bedrooms: bedrooms ? Number(bedrooms) : null,
      bathrooms: bathrooms ? Number(bathrooms) : null,
      area_sqft: areaSqft ? Number(areaSqft) : null,
      parking: parking ? Number(parking) : null,
      floors: floors ? Number(floors) : null,
      facing: facing || null,
      furnishing: furnishing || null,
      amenities,
      images: finalImages,
      is_featured: isFeatured,
      is_active: isActive,
    };

    let error;
    if (mode === 'create') {
      ({ error } = await supabase.from('properties').insert(payload));
    } else {
      ({ error } = await supabase.from('properties').update(payload).eq('id', property!.id!));
    }

    setSaving(false);

    if (error) {
      setSaveError(error.message);
      return;
    }

    setSaveSuccess(true);
    setTimeout(() => router.push('/admin/properties'), 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success / Error banners */}
      {saveSuccess && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl px-5 py-4">
          <CheckCircle className="h-5 w-5 shrink-0" />
          Property {mode === 'create' ? 'created' : 'updated'} successfully! Redirecting...
        </div>
      )}
      {saveError && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl px-5 py-4">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {saveError}
        </div>
      )}

      {/* ── Section: Basic Info ──────────────────────────────────────────── */}
      <Card title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Label>Property Title *</Label>
            <input required value={title} onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Luxury 3 BHK Apartment in Gomti Nagar"
              className={inputCls} />
          </div>
          <div>
            <Label>URL Slug *</Label>
            <input required value={slug} onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="luxury-3bhk-gomti-nagar"
              className={inputCls} />
            <p className="text-xs text-gray-400 mt-1">Auto-generated from title. Used in the URL.</p>
          </div>
          <div>
            <Label>For</Label>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              {['buy', 'rent'].map((s) => (
                <button key={s} type="button" onClick={() => setStatus(s)}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors capitalize ${status === s ? 'bg-[#0E3B2E] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >{s === 'buy' ? 'For Sale' : 'For Rent'}</button>
              ))}
            </div>
          </div>
          <div>
            <Label>Property Type *</Label>
            <select required value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
              {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label>Description *</Label>
            <textarea required rows={5} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the property in detail — highlights, unique features, surroundings..."
              className={`${inputCls} resize-none`} />
          </div>
        </div>
      </Card>

      {/* ── Section: Pricing ────────────────────────────────────────────── */}
      <Card title="Pricing">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label>Price (₹) *</Label>
            <input required type="number" value={price} onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 7500000 (75 Lakhs)"
              className={inputCls} />
          </div>
          <div>
            <Label>Price Label (Display) *</Label>
            <input required value={priceLabel} onChange={(e) => setPriceLabel(e.target.value)}
              placeholder="e.g. ₹75 Lakhs, ₹1.2 Cr, ₹25,000/mo"
              className={inputCls} />
            <p className="text-xs text-gray-400 mt-1">This is shown on the website exactly as typed.</p>
          </div>
        </div>
      </Card>

      {/* ── Section: Location ────────────────────────────────────────────── */}
      <Card title="Location">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <Label>Area / Locality *</Label>
            <select required value={area} onChange={(e) => setArea(e.target.value)} className={inputCls}>
              <option value="">Select area</option>
              {LUCKNOW_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <Label>City</Label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>State</Label>
            <input value={state} onChange={(e) => setState(e.target.value)} className={inputCls} />
          </div>
          <div className="lg:col-span-2">
            <Label>Full Address</Label>
            <input value={address} onChange={(e) => setAddress(e.target.value)}
              placeholder="Plot No, Street, Sector..."
              className={inputCls} />
          </div>
          <div>
            <Label>Pincode</Label>
            <input value={pincode} onChange={(e) => setPincode(e.target.value)}
              placeholder="226010" maxLength={6} className={inputCls} />
          </div>
        </div>
      </Card>

      {/* ── Section: Features ────────────────────────────────────────────── */}
      <Card title="Property Features">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <div>
            <Label>Bedrooms</Label>
            <input type="number" min={0} value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}
              placeholder="e.g. 3" className={inputCls} />
          </div>
          <div>
            <Label>Bathrooms</Label>
            <input type="number" min={0} value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}
              placeholder="e.g. 2" className={inputCls} />
          </div>
          <div>
            <Label>Area (sq ft) *</Label>
            <input required type="number" min={0} value={areaSqft} onChange={(e) => setAreaSqft(e.target.value)}
              placeholder="e.g. 1500" className={inputCls} />
          </div>
          <div>
            <Label>Parking Spaces</Label>
            <input type="number" min={0} value={parking} onChange={(e) => setParking(e.target.value)}
              placeholder="e.g. 1" className={inputCls} />
          </div>
          <div>
            <Label>Total Floors</Label>
            <input type="number" min={0} value={floors} onChange={(e) => setFloors(e.target.value)}
              placeholder="e.g. 4" className={inputCls} />
          </div>
          <div>
            <Label>Facing Direction</Label>
            <select value={facing} onChange={(e) => setFacing(e.target.value)} className={inputCls}>
              <option value="">Select</option>
              {FACING_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <Label>Furnishing Status</Label>
            <select value={furnishing} onChange={(e) => setFurnishing(e.target.value)} className={inputCls}>
              <option value="">Select</option>
              {FURNISHING_OPTIONS.map((f) => (
                <option key={f} value={f} className="capitalize">{f}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* ── Section: Amenities ───────────────────────────────────────────── */}
      <Card title={`Amenities (${amenities.length} selected)`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {AMENITIES_LIST.map((a) => (
            <button
              key={a} type="button"
              onClick={() => toggleAmenity(a)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left ${
                amenities.includes(a)
                  ? 'border-[#0E3B2E] bg-[#0E3B2E]/5 text-[#0E3B2E]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <CheckSquare className={`h-4 w-4 shrink-0 ${amenities.includes(a) ? 'text-[#0E3B2E]' : 'text-gray-300'}`} />
              {a}
            </button>
          ))}
        </div>
      </Card>

      {/* ── Section: Photos ──────────────────────────────────────────────── */}
      <Card title="Property Photos">
        {/* Upload zone */}
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${uploadingImages ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-[#0E3B2E] hover:bg-[#0E3B2E]/[0.02]'}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleImageFiles(e.dataTransfer.files); }}
        >
          {uploadingImages ? (
            <div className="flex items-center justify-center gap-3 text-blue-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="font-medium">Uploading photos...</span>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="font-semibold text-gray-700">Click to upload or drag & drop photos here</p>
              <p className="text-sm text-gray-400 mt-1">JPG, PNG, WebP — max 5MB each. Upload multiple at once.</p>
              <button type="button"
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E3B2E] text-white text-sm font-medium hover:bg-[#0a2e23] transition-colors"
              >
                <Plus className="h-4 w-4" /> Choose Photos
              </button>
            </>
          )}
          <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden"
            onChange={(e) => handleImageFiles(e.target.files)} />
        </div>

        {/* Image previews */}
        {images.length > 0 && (
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className={`w-full h-full object-cover transition-all ${img.uploading ? 'opacity-50' : ''}`} />

                {img.uploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-[#0E3B2E]" />
                  </div>
                )}

                {img.error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-500/10">
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  </div>
                )}

                {/* First photo badge */}
                {i === 0 && !img.uploading && (
                  <span className="absolute bottom-1.5 left-1.5 bg-[#0E3B2E] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    Cover
                  </span>
                )}

                {/* Remove button */}
                {!img.uploading && (
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1.5 right-1.5 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {images.length > 0 && (
          <p className="text-xs text-gray-400 mt-2">
            First photo is the cover image. Hover over a photo to remove it.
            {images.length > 1 && ' You can add more photos anytime.'}
          </p>
        )}
      </Card>

      {/* ── Section: Visibility ──────────────────────────────────────────── */}
      <Card title="Visibility & Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ToggleCard
            checked={isActive}
            onChange={setIsActive}
            label="Active (Visible on Website)"
            desc="When ON, this property appears on the public website."
            activeColor="bg-green-500"
          />
          <ToggleCard
            checked={isFeatured}
            onChange={setIsFeatured}
            label="Featured Property"
            desc="When ON, this appears in the Featured section on the home page."
            activeColor="bg-amber-500"
          />
        </div>
      </Card>

      {/* ── Submit ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 pt-2 pb-8">
        <button
          type="button"
          onClick={() => router.push('/admin/properties')}
          className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving || uploadingImages}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#0E3B2E] text-white font-semibold text-sm hover:bg-[#0a2e23] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : mode === 'create' ? 'Create Property' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

// ── Helper Components ─────────────────────────────────────────────────────────
const inputCls = 'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#0E3B2E] focus:ring-2 focus:ring-[#0E3B2E]/10 focus:bg-white transition-all';

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-gray-700 mb-1.5">{children}</label>;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function ToggleCard({
  checked, onChange, label, desc, activeColor,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  desc: string;
  activeColor: string;
}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${checked ? 'border-[#0E3B2E]/20 bg-[#0E3B2E]/[0.02]' : 'border-gray-200 hover:border-gray-300'}`}
    >
      <div className={`relative h-6 w-11 rounded-full transition-colors shrink-0 mt-0.5 ${checked ? activeColor : 'bg-gray-200'}`}>
        <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
