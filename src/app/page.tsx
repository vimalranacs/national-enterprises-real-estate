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

export default function Home() {
  return (
    <>
      <HeroSection />
      <PropertySearch />
      <FeaturedListings />
      <Categories />
      <ServicesSection />
      <WhyChooseUs />
      <LatestProperties />
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