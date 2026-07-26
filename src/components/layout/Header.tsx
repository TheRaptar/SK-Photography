import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? 'bg-surface/90 backdrop-blur-md border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <Link
          to="/"
          className="flex items-center gap-3 font-display text-lg tracking-wide shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <span className="relative w-10 h-10 shrink-0">
            <span className="absolute inset-0 rounded-full bg-accent/30 blur-md" aria-hidden="true" />
            <img
              src="/logo.png"
              alt="SK Photography emblem"
              className="relative w-10 h-10 rounded-full object-cover"
            />
          </span>
          <span className="text-gold-gradient">SK</span>&nbsp;Photography
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative py-1 text-[13px] tracking-[0.08em] uppercase transition-colors group ${
                  isActive ? 'text-ink' : 'text-ink-dim hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10 grid place-items-center rounded-full border border-line text-ink-dim hover:text-ink hover:border-line-strong transition-colors"
          >
            {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>

          <Link
            to="/contact"
            className="btn-outline-gold hidden sm:inline-flex items-center text-[13px] tracking-[0.08em] uppercase border border-line-strong px-5 py-2.5 hover:bg-ink hover:text-bg transition-colors"
          >
            Book a session
          </Link>

          <button
            type="button"
            className="md:hidden w-10 h-10 grid place-items-center text-ink"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-line bg-surface px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-base font-display ${isActive ? 'text-accent' : 'text-ink'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
