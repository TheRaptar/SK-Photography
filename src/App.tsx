import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import GalleryDetail from './pages/GalleryDetail';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import StudioAdmin from './pages/StudioAdmin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A quiet fade + rise between pages — long enough to register as a
 * transition, short enough to never feel like it's in the way. */
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (reduceMotion) return <>{children}</>;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * The hidden studio admin route. It is intentionally:
 * - not referenced anywhere in Header/Footer/nav/sitemap
 * - rendered OUTSIDE the public <Layout> (no site header/footer, so it
 *   never visually hints at its own existence to a visitor who lands here)
 * - gated behind a passphrase (see src/lib/adminAuth.ts) even though you
 *   know the URL
 *
 * Change this path to something only you know before you deploy, then
 * bookmark it privately. Do not link to it from anywhere on the public site.
 */
const HIDDEN_ADMIN_PATH = '/sk-studio-9247';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path={HIDDEN_ADMIN_PATH} element={<StudioAdmin />} />
              <Route
                path="*"
                element={
                  <Layout>
                    <PageTransition>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/portfolio/:galleryId" element={<GalleryDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </PageTransition>
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
        </MotionConfig>
      </ThemeProvider>
    </HelmetProvider>
  );
}
