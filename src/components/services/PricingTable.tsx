import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { pricingPackages } from '../../data/content';

export default function PricingTable() {
  return (
    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {pricingPackages.map((pkg) => (
        <div
          key={pkg.id}
          className={`p-8 lg:p-10 flex flex-col relative rounded-2xl border card-premium ${
            pkg.featured
              ? 'bg-ink text-bg border-transparent ring-1 ring-accent/40'
              : 'bg-surface text-ink border-line-strong'
          }`}
        >
          {pkg.featured && (
            <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase text-white">
              Most booked
            </span>
          )}
          <h3 className="font-display text-2xl mb-2">{pkg.name}</h3>
          <p className={`text-sm mb-6 ${pkg.featured ? 'text-bg/65' : 'text-ink-dim'}`}>
            {pkg.description}
          </p>
          <div className="mb-8">
            <span className="font-display text-4xl font-semibold">{pkg.price}</span>
            <span className={`text-sm ml-2 ${pkg.featured ? 'text-bg/55' : 'text-ink-dim'}`}>
              {pkg.unit}
            </span>
          </div>
          <ul className="space-y-3 mb-10 flex-1">
            {pkg.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15">
                  <Check size={12} strokeWidth={2.4} className="text-accent" />
                </span>
                <span className={pkg.featured ? 'text-bg/85' : 'text-ink-dim'}>{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className={`inline-flex items-center justify-center text-[12px] font-semibold tracking-[0.06em] uppercase px-6 py-3.5 ${
              pkg.featured ? 'btn-primary' : 'btn-outline border border-line-strong'
            }`}
          >
            Inquire about this
          </Link>
        </div>
      ))}
    </div>
  );
}
