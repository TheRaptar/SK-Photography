import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { pricingPackages } from '../../data/content';

export default function PricingTable() {
  return (
    <div className="grid lg:grid-cols-3 gap-px bg-line">
      {pricingPackages.map((pkg) => (
        <div
          key={pkg.id}
          className={`p-8 lg:p-10 flex flex-col ${
            pkg.featured ? 'bg-ink text-bg' : 'bg-bg text-ink'
          }`}
        >
          {pkg.featured && (
            <span className="eyebrow mb-4 self-start" style={{ color: 'var(--accent)' }}>
              Most booked
            </span>
          )}
          <h3 className="font-display text-2xl mb-2">{pkg.name}</h3>
          <p className={`text-sm mb-6 ${pkg.featured ? 'text-bg/65' : 'text-ink-dim'}`}>
            {pkg.description}
          </p>
          <div className="mb-8">
            <span className="font-display text-4xl">{pkg.price}</span>
            <span className={`text-sm ml-2 ${pkg.featured ? 'text-bg/55' : 'text-ink-dim'}`}>
              {pkg.unit}
            </span>
          </div>
          <ul className="space-y-3 mb-10 flex-1">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <Check size={15} strokeWidth={1.8} className="mt-0.5 shrink-0 text-accent" />
                <span className={pkg.featured ? 'text-bg/85' : 'text-ink-dim'}>{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className={`inline-flex items-center justify-center text-[12px] tracking-[0.08em] uppercase px-6 py-3.5 border transition-colors ${
              pkg.featured
                ? 'bg-bg text-ink border-bg hover:bg-accent hover:text-ink hover:border-accent'
                : 'border-line-strong hover:bg-ink hover:text-bg hover:border-ink'
            }`}
          >
            Inquire about this
          </Link>
        </div>
      ))}
    </div>
  );
}
