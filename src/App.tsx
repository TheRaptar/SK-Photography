import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path={HIDDEN_ADMIN_PATH} element={<StudioAdmin />} />
            <Route
              path="*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/portfolio/:galleryId" element={<GalleryDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
