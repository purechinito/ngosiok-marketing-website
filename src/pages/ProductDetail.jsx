import { useParams, Link, Navigate } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { products } from '@/data/products';
import { SEO_CONFIG, COMPANY_INFO } from '@/utils/constants';
import { ArrowRight, ChevronRight, Phone, MessageCircle, Star } from 'lucide-react';

const renderPackagingTable = (data, title, tableKey) => {
  if (!data || data.length === 0) return null;

  const hasUnitPerSack = data.some((p) => p.unitPerSack);
  const hasPacking = data.some((p) => p.packing);
  const hasUnitPerBox = data.some((p) => p.unitPerBox);
  const hasBoxBarcode = data.some((p) => p.boxBarcode);
  const hasBoxSize = data.some((p) => p.boxSize);
  const hasAvailability = data.some((p) => p.availability !== undefined);
  const hasBarcode = data.some((p) => p.barcode);
  const hasProductBarcode = data.some((p) => p.productBarcode);

  return (
    <div key={tableKey} className="mb-8 last:mb-0">
      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
        {title}
      </h3>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">Weight</th>
              {hasProductBarcode && <th className="px-4 py-3">Product Barcode</th>}
              {hasBarcode && <th className="px-4 py-3">Barcode</th>}
              {hasAvailability && <th className="px-4 py-3"></th>}
              {hasUnitPerSack && <th className="px-4 py-3">Unit / Sack</th>}
              {hasPacking && <th className="px-4 py-3">Packing</th>}
              {hasUnitPerBox && <th className="px-4 py-3">Unit / Box</th>}
              {hasBoxBarcode && <th className="px-4 py-3">Box Barcode</th>}
              {hasBoxSize && <th className="px-4 py-3">Box Size*</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((pkg, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-2.5 text-gray-900 font-medium">{pkg.weight}</td>
                {hasProductBarcode && <td className="px-4 py-2.5 text-gray-600">{pkg.productBarcode || '-'}</td>}
                {hasBarcode && <td className="px-4 py-2.5 text-gray-600">{pkg.barcode || '-'}</td>}
                {hasAvailability && <td className="px-4 py-2.5 text-gray-600 font-medium">{pkg.availability || ''}</td>}
                {hasUnitPerSack && <td className="px-4 py-2.5 text-gray-600">{pkg.unitPerSack || '-'}</td>}
                {hasPacking && <td className="px-4 py-2.5 text-gray-600">{pkg.packing || '-'}</td>}
                {hasUnitPerBox && <td className="px-4 py-2.5 text-gray-600">{pkg.unitPerBox || '-'}</td>}
                {hasBoxBarcode && <td className="px-4 py-2.5 text-gray-600">{pkg.boxBarcode || '-'}</td>}
                {hasBoxSize && <td className="px-4 py-2.5 text-gray-600">{pkg.boxSize || '-'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasBoxSize && <p className="text-xs text-gray-500 mt-2 italic">*Box Size: width (mm) x length (mm) x height (mm)</p>}
    </div>
  );
};

export const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const canonicalUrl = SEO_CONFIG.siteUrl + '/products/' + product.slug;
  const imageUrl = SEO_CONFIG.siteUrl + product.image;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description.replace(/\n+/g, ' '),
    "image": imageUrl,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": COMPANY_INFO.name,
    },
    "manufacturer": {
      "@type": "Organization",
      "name": COMPANY_INFO.name,
      "url": SEO_CONFIG.siteUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SEO_CONFIG.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": SEO_CONFIG.siteUrl + '/products' },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": canonicalUrl },
    ],
  };

  const relatedProducts = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);

  const paragraphs = product.description.split('\n\n');
  const firstParagraph = paragraphs[0] || '';
  const metaDescription = firstParagraph.length > 150
    ? firstParagraph.slice(0, 150) + '... Wholesale & export inquiries welcome.'
    : firstParagraph + ' Wholesale & export inquiries welcome.';

  return (
    <>
      <Seo
        title={product.name + ' - ' + product.category}
        description={metaDescription}
        canonical={canonicalUrl}
        ogImage={imageUrl}
        schema={[productSchema, breadcrumbSchema]}
      />
      <main className="pt-20 bg-gray-50 min-h-screen">
        <Section className="pb-0 pt-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-primary-600 transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </Section>

        <Section className="pt-0">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <div className="rounded-3xl overflow-hidden bg-white shadow-lg border border-gray-100 aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>
              {product.additionalImages && product.additionalImages.length > 0 && (
                <div className="flex gap-3 mt-4 overflow-x-auto">
                  {product.additionalImages.map((img, idx) => (
                    <img key={idx} src={img} alt={product.name + ' ' + (idx + 1)} className="w-20 h-20 object-cover rounded-xl border border-gray-200 flex-shrink-0" />
                  ))}
                </div>
              )}
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Star className="w-3.5 h-3.5 fill-primary-600" />
                {product.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold font-heading text-gray-900 mb-6 leading-tight">
                {product.name}
              </h1>

              {product.features && product.features.length > 0 && (
                <ul className="flex flex-wrap gap-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <div className="text-gray-600 leading-relaxed space-y-4 mb-8">
                {paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex justify-center items-center gap-2 bg-primary-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary/20"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex justify-center items-center gap-2 bg-white text-gray-800 border-2 border-gray-200 px-6 py-3.5 rounded-xl font-bold hover:border-primary-600 hover:text-primary-600 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Inquire About This Product
                </Link>
              </div>
            </div>
          </div>
        </Section>

        {(product.localPackaging || product.exportPackaging || product.sharedPackaging || product.customTables) && (
          <Section className="pt-0">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Packaging & Availability</h2>
              {renderPackagingTable(product.localPackaging, product.localPackagingTitle || 'Local Packaging', 'local')}
              {renderPackagingTable(product.sharedPackaging, product.sharedPackagingTitle || 'Local and Export', 'shared')}
              {renderPackagingTable(product.exportPackaging, product.exportPackagingTitle || 'Export Packaging', 'export')}
              {product.customTables && product.customTables.map((t, i) => renderPackagingTable(t.data, t.title, 'custom-' + i))}
            </div>
          </Section>
        )}

        {relatedProducts.length > 0 && (
          <Section className="pt-0">
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">More {product.category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={'/products/' + p.slug}
                  className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">{p.name}</h3>
                </Link>
              ))}
            </div>
          </Section>
        )}

        <Section className="pt-0 pb-24">
          <Link to="/products" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all">
            <ArrowRight className="w-5 h-5 rotate-180" />
            Back to All Products
          </Link>
        </Section>
      </main>
    </>
  );
};
