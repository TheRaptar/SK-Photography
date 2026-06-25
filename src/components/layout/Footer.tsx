import { Link } from 'react-router-dom';
import { ExternalLink, Mail, Aperture } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 font-display text-lg tracking-wide mb-4">
            <Aperture size={20} strokeWidth={1.4} className="text-accent" />
            SK&nbsp;Photography
          </Link>
          <p className="text-sm text-ink-dim max-w-sm leading-relaxed">
            Full-time photography studio based in London, available across the UK —
            weddings, portraits, events, and commercial work.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm text-ink-dim">
            <li><Link to="/portfolio" className="hover:text-ink transition-colors">Portfolio</Link></li>
            <li><Link to="/about" className="hover:text-ink transition-colors">About</Link></li>
            <li><Link to="/services" className="hover:text-ink transition-colors">Services & pricing</Link></li>
            <li><Link to="/contact" className="hover:text-ink transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Connect</p>
          <ul className="space-y-2.5 text-sm text-ink-dim">
            <li>
              <a href="mailto:sivask3002@gmail.com" className="inline-flex items-center gap-2 hover:text-ink transition-colors">
                <Mail size={14} strokeWidth={1.5} /> sivask3002@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/sk03_photography" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ink transition-colors">
                <ExternalLink size={14} strokeWidth={1.5} /> Instagram
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ink transition-colors">
                <ExternalLink size={14} strokeWidth={1.5} /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row gap-3 items-center justify-between text-[11px] tracking-[0.08em] uppercase text-ink-dim">
          <span>© {new Date().getFullYear()} SK Photography</span>
          <span>London, United Kingdom</span>
        </div>
      </div>
    </footer>
  );
}
