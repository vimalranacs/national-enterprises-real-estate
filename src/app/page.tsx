import { createClient } from '@/lib/supabase/server';
import { mapSupabaseProperty } from '@/lib/supabase/utils';
import HeroSection from '@/components/home/HeroSection';
import PropertySearch from '@/components/home/PropertySearch';
import FeaturedListings from '@/components/home/FeaturedListings';
import Categories from '@/components/home/Categories';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import LatestProperties from '@/components/home/LatestProperties';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import MeetAgents from '@/components/home/MeetAgents';
import PopularAreas from '@/components/home/PopularAreas';
import InvestmentCTA from '@/components/home/InvestmentCTA';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();

  // Fetch featured properties
  const { data: featuredData } = await supabase
    .from('properties')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(6);

  // Fetch latest properties
  const { data: latestData } = await supabase
    .from('properties')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(3);

  const featuredProperties = (featuredData || []).map(mapSupabaseProperty);
  const latestProperties = (latestData || []).map(mapSupabaseProperty);

  return (
    <>
      <HeroSection />
      <PropertySearch />
      <FeaturedListings properties={featuredProperties} />
      <Categories />
      <ServicesSection />
      <WhyChooseUs />
      <LatestProperties properties={latestProperties} />
      <TestimonialsSection />
      <MeetAgents />
      <PopularAreas />
      <InvestmentCTA />
      <FAQSection />
      <ContactSection />
      <WhatsAppButton />
    </>
  );
}