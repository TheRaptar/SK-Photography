import Seo from '../components/shared/Seo';
import PricingTable from '../components/services/PricingTable';
import Faq from '../components/services/Faq';

export default function Services() {
  return (
    <>
      <Seo
        title="Services & Pricing"
        description="Photography packages and pricing for weddings, portraits, and commercial work, plus answers to common questions."
        path="/services"
      />

      <section className="pt-32 pb-16 max-w-7xl mx-auto px-6 lg:px-10">
        <p className="eyebrow mb-5">Services &amp; pricing</p>
        <h1 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] text-balance max-w-2xl">
          Packages built around how you'll actually use the photos.
        </h1>
        <p className="text-ink-dim max-w-xl mt-6 leading-relaxed">
          Every booking starts as a conversation — the packages below are starting points,
          not fixed menus. Custom quotes are always available.
        </p>
      </section>

      <section className="pb-28 max-w-7xl mx-auto px-6 lg:px-10">
        <PricingTable />
      </section>

      <section className="py-24 border-t border-line bg-surface">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-5">Frequently asked</p>
          <h2 className="font-display text-3xl mb-12">Before you reach out</h2>
          <Faq />
        </div>
      </section>
    </>
  );
}
