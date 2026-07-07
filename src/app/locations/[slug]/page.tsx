import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { areas } from '@/lib/data/areas';
import { properties } from '@/lib/data/properties';
import PropertyCard from '@/components/ui/PropertyCard';
import { MapPin, TrendingUp, Home, ArrowLeft, CheckCircle, MessageCircle } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  if (!area) return { title: 'Area Not Found' };
  return {
    title: `Properties in ${area.name}, Lucknow | National Enterprises`,
    description: `${area.description} Find residential, commercial, plots and villas in ${area.name} with National Enterprises Real Estate.`,
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  if (!area) notFound();

  const areaProperties = properties.filter((p) =>
    p.location.area.toLowerCase().includes(area.name.toLowerCase())
  ).slice(0, 6);

  const priceTrends = [
    { label: 'Average Property Rate', value: area.avgPrice },
    { label: 'YoY Appreciation', value: '8-12%' },
    { label: 'Rental Yield', value: '3-5% p.a.' },
    { label: 'Investment Outlook', value: 'High Potential' },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <Image src={area.image} alt={area.name} fill unoptimized className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container-luxury pb-10">
            <Link href="/locations" className="inline-flex items-center gap-1.5 text-white/70 text-sm hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> All Locations
            </Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">{area.name}</h1>
            <div className="flex items-center gap-1.5 mt-2 text-white/70">
              <MapPin className="h-4 w-4 text-gold" />
              Lucknow, Uttar Pradesh
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-gold/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {area.propertiesCount} Properties
              </span>
              {area.highlights.map((h) => (
                <span key={h} className="bg-white/20 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full">{h}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container-luxury py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-2xl border border-border p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                {area.name} is one of Lucknow&apos;s most dynamic real estate markets, offering a blend of modern amenities and excellent connectivity. With ongoing infrastructure development and increasing demand, properties here represent both a comfortable living choice and a sound investment.
              </p>
            </div>

            {/* Price Trends */}
            <div className="bg-white rounded-2xl border border-border p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-gold" /> Price Trends
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {priceTrends.map((t) => (
                  <div key={t.label} className="bg-sage/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.label}</p>
                    <p className="font-heading text-lg font-bold text-emerald-brand mt-1">{t.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Area Properties */}
            {areaProperties.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Home className="h-6 w-6 text-gold" /> Properties in {area.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {areaProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
                </div>
                <div className="mt-8">
                  <Link
                    href={`/properties?location=${encodeURIComponent(area.name)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-brand px-7 py-3.5 text-sm font-semibold text-white hover:bg-emerald-dark transition-colors"
                  >
                    View All {area.name} Properties
                  </Link>
                </div>
              </div>
            )}

            {areaProperties.length === 0 && (
              <div className="bg-white rounded-2xl border border-border p-8 text-center">
                <p className="text-muted-foreground">No properties currently listed in {area.name}.</p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-brand hover:text-emerald-light transition-colors">
                  Contact us for upcoming listings →
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT Sidebar */}
          <div className="space-y-6">
            {/* Investment Potential */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gold" /> Investment Potential
              </h3>
              <ul className="space-y-3">
                {[
                  'Strong infrastructure development',
                  'Increasing demand from IT professionals',
                  'Excellent rental yield potential',
                  'Metro connectivity planned',
                  'Upcoming commercial hubs nearby',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-emerald-brand shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Card */}
            <div className="bg-emerald-brand rounded-2xl p-6 text-white">
              <h3 className="font-heading text-lg font-semibold mb-2">
                Looking for a property in {area.name}?
              </h3>
              <p className="text-white/70 text-sm mb-5">
                Our local experts know this area inside out. Get personalized property recommendations today.
              </p>
              <a
                href={`${CONTACT.whatsappLink}?text=${encodeURIComponent(`Hi, I'm looking for a property in ${area.name}, Lucknow. Please help.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gold text-emerald-brand font-semibold text-sm hover:bg-gold-light transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Get Expert Help
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
