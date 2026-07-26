import { Link } from 'react-router-dom';

export default function CtaSection() {
  return (
    <section className="py-28 lg:py-40 bg-ink text-bg relative overflow-hidden">
      <div className="glow-orb w-[30rem] h-[30rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" aria-hidden="true" />
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center relative">
        <p className="eyebrow mb-6">Availability is limited each month</p>
        <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-[1.1] text-balance">
          Let's make something worth keeping.
        </h2>
        <p className="mt-6 text-bg/65 max-w-md mx-auto">
          Tell me about the day, the brief, or the idea — and I'll get back to you within
          two business days with availability and a quote.
        </p>
        <Link
          to="/contact"
          className="btn-gold mt-10 inline-flex items-center text-[13px] tracking-[0.08em] uppercase px-8 py-4"
        >
          Start an inquiry
        </Link>
      </div>
    </section>
  );
}
