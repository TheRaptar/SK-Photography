import Seo from '../components/shared/Seo';
import Hero from '../components/home/Hero';
import Intro from '../components/home/Intro';
import FeaturedCategories from '../components/home/FeaturedCategories';
import Testimonials from '../components/home/Testimonials';
import CtaSection from '../components/home/CtaSection';

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="Full-time photography studio based in London, shooting weddings, portraits, events, landscape, street, and commercial work across the UK."
        path="/"
      />
      <Hero />
      <Intro />
      <FeaturedCategories />
      <Testimonials />
      <CtaSection />
    </>
  );
}
