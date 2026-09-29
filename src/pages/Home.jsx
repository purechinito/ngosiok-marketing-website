import { Seo } from '@/components/common/Seo';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Features } from '@/components/home/Features';
import { Products } from '@/components/home/Products';
import { Contact } from '@/components/home/Contact';
import { COMPANY_INFO, SEO_CONFIG } from '@/utils/constants';

export const Home = () => {
  // Organization Schema for Google Knowledge Graph
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": COMPANY_INFO.name,
    "url": SEO_CONFIG.siteUrl,
    "logo": `${SEO_CONFIG.siteUrl}/logo.jpg`,
    "description": "Premium Filipino noodle manufacturer since 1945",
    "foundingDate": "1945",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "325 B. Aranas Street",
      "addressLocality": "Cebu City",
      "addressRegion": "Cebu",
      "postalCode": "6000",
      "addressCountry": "PH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": COMPANY_INFO.phone,
      "contactType": "customer service",
      "areaServed": "PH",
      "availableLanguage": ["English", "Filipino"]
    },
    "sameAs": [
      "https://www.facebook.com/p/Ngosiok-Marketing-Super-Q-Golden-Bihon-100063821509709/",
      "https://www.instagram.com/superq_bihon/"
    ]
  };

  return (
    <>
      <Seo
        title="Premium Quality Noodles Since 1945"
        description="Taste 80+ years of quality. Ngosiok Marketing offers the best bihon, pancit canton, and Filipino noodles for your family. Explore our premium products today!"
        canonical={`${SEO_CONFIG.siteUrl}/`}
        ogImage={SEO_CONFIG.defaultOgImage}
        schema={organizationSchema}
      />
      <main>
        <Hero />
        <About />
        <Features />
        <Products />
        <Contact />
      </main>
    </>
  );
};