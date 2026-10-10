import { Seo } from '@/components/common/Seo';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Features } from '@/components/home/Features';
import { Products } from '@/components/home/Products';
import { Contact } from '@/components/home/Contact';
import { COMPANY_INFO, SEO_CONFIG } from '@/utils/constants';
import { organizationNode, websiteNode } from '@/utils/schema';

export const Home = () => {

  return (
    <>
      <Seo
        title="Ngosiok Marketing: Bihon & Filipino Noodles Since 1945"
        description="Makers of Super Q Golden Bihon in Cebu since 1945. Cornstarch bihon, pancit canton and Filipino noodles for homes, distributors, food service and export."
        canonical={`${SEO_CONFIG.siteUrl}/`}
        ogImage={SEO_CONFIG.defaultOgImage}
        schema={[organizationNode, websiteNode]}
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