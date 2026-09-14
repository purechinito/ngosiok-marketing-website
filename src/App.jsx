import { Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { Toaster } from '@/components/ui/sonner';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Products } from '@/pages/Products';
import { ProductDetail } from '@/pages/ProductDetail';
import { Contact } from '@/pages/Contact';
import { WhereToBuy } from '@/pages/WhereToBuy';
import { BihonGuide } from '@/pages/BihonGuide';
import { Feedback } from '@/pages/Feedback';
import { AdminPage } from '@/pages/admin/AdminPage';
import { NotFound } from '@/pages/NotFound';

/** The public site: marketing chrome wrapped around the content routes. */
const MarketingSite = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/where-to-buy" element={<WhereToBuy />} />
        <Route path="/bihon" element={<BihonGuide />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    <Footer />
  </div>
);

/**
 * True when served from an `admin.*` hostname (admin.superq.ph).
 *
 * Host detection rather than a Vercel rewrite: a rewrite to /index.html leaves
 * the browser path at "/", so the router would render the marketing homepage
 * on the admin domain. Checking the hostname works identically on Vercel,
 * Netlify and localhost, and needs no host-specific configuration.
 *
 * /admin on the main domain keeps working too, which is handy for testing
 * before the subdomain's DNS resolves.
 */
const isAdminHost = () =>
  typeof window !== 'undefined' && window.location.hostname.startsWith('admin.');

function App() {
  if (isAdminHost()) {
    return (
      <>
        <AdminPage />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* The admin area is its own shell - no marketing header or footer. */}
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="*" element={<MarketingSite />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
