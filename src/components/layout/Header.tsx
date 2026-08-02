import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import ScrollProgress from './ScrollProgress';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on route change rather than leaving it open behind a new page.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || menuOpen
          ? 'bg-surface/90 backdrop-blur-md border-b border-line shadow-[0_8px_30px_-20px_rgba(0,0,0,0.35)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <ScrollProgress />

      <div
        className={`max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? 'h-[4.25rem]' : 'h-20'
        }`}
      >
        <Link
          to="/"
          className="group flex items-center gap-3 font-display text-lg tracking-wide shrink-0"
        >
          <span className="relative w-10 h-10 shrink-0">
            <span className="absolute inset-0 rounded-full bg-accent/30 blur-md transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
            <img
              src="/logo.png"
              alt="SK Photography emblem"
              className="relative w-10 h-10 rounded-full object-cover transition-transform duration-500 group-hover:rotate-6"
            />
          </span>
          <span className="text-gold-gradient">SK</span>&nbsp;Photography
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const isActive = link.to === '/' ? pathname === '/' : pathname.startsWith(link.to);
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`relative py-1 text-[13px] tracking-[0.08em] uppercase transition-colors ${
                  isActive ? 'text-ink' : 'text-ink-dim hover:text-ink'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                  />
                )}
              </NavLink>
            );
          })}
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
            className="md:hidden relative w-10 h-10 grid place-items-center text-ink"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 grid place-items-center"
              >
                {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-line bg-surface"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => {
                const isActive = link.to === '/' ? pathname === '/' : pathname.startsWith(link.to);
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <NavLink
                      to={link.to}
                      className={`block py-2.5 text-base font-display ${isActive ? 'text-accent' : 'text-ink'}`}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
