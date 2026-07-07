import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { areas } from '@/lib/data/areas';
import { MapPin, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Locations | Properties Across Lucknow',
  description: 'Explore premium properties in Gomti Nagar, Hazratganj, Aliganj, Indira Nagar, Jankipuram, Sushant Golf City and more areas in Lucknow.',
};

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <section className="bg-emerald-brand py-20">
        <div className="container-luxury text-center">
          <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-3">Explore Lucknow</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Popular Areas</h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
            Find properties in Lucknow&apos;s most sought-after residential and commercial localities.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area) => (
              <Link
                key={area.id}
                href={`/locations/${area.slug}`}
                className="group block bg-white rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={area.image} alt={area.name} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-gold/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {area.propertiesCount} Properties
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-heading text-xl font-bold text-foreground">{area.name}</h2>
                  <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4 text-gold shrink-0" />
                    Lucknow, Uttar Pradesh
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-3 line-clamp-2">{area.description}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-emerald-brand text-sm font-semibold">
                    <TrendingUp className="h-4 w-4" />
                    Avg. Price: {area.avgPrice}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {area.highlights.map((h) => (
                      <span key={h} className="text-xs bg-sage text-emerald-brand font-medium px-2.5 py-1 rounded-full">{h}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
