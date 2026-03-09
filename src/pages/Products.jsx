import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { Button } from '@/components/common/Button';
import { products } from '@/data/products';
import { ArrowRight, Star, X, Check, Phone, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { classNames } from '@/utils/helpers';
import { SEO_CONFIG, COMPANY_INFO } from '@/utils/constants';
import { motion, AnimatePresence } from 'framer-motion';

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryScrollPos, setGalleryScrollPos] = useState(0);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
      setSelectedImage(null);
      setGalleryScrollPos(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'Cornstarch-based Noodles', name: 'Cornstarch-based' },
    { id: 'Wheat-based Noodles', name: 'Wheat-based' },
    { id: 'Vermicelli Noodles', name: 'Vermicelli' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SEO_CONFIG.siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${SEO_CONFIG.siteUrl}/products`
      }
    ]
  };

  return (
    <>
      <Seo
        title="Premium Bihon & Pancit Canton | Our Products"
        description="Browse our complete range of premium Filipino noodles. Super Q Golden Bihon, Eagle VSP, First Choice, and more. Find the perfect noodles for your family's pancit today!"
        canonical={`${SEO_CONFIG.siteUrl}/products`}
        ogImage={`${SEO_CONFIG.siteUrl}/og-products.jpg`}
        schema={breadcrumbSchema}
      />
      <main className="pt-20 bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <Section className="relative overflow-hidden py-20">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: 'url(/ngosiok.jpg)' }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 z-0"></div>

          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl z-0 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl z-0 -translate-x-1/3 translate-y-1/3"></div>

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/30 shadow-sm">
              Our Collection
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6 drop-shadow-lg">
              Premium Quality <span className="text-primary-400">Noodles</span>
            </h1>
            <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md">
              Discover our range of traditional and innovative noodle products,
              crafted with care and dedication.
            </p>
          </div>
        </Section>

        <Section className="bg-gray-50 pt-0">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={classNames(
                  'px-6 py-3 rounded-full font-bold transition-all duration-300 border',
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg border-primary-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary-200 hover:text-primary-600 hover:shadow-sm'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={classNames(
                  "group flex flex-col h-full relative rounded-2xl md:rounded-3xl p-3 md:p-4 transition-all duration-500 cursor-pointer border",
                  [1, 2, 4, 8].includes(product.id)
                    ? "bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 shadow-xl shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:-translate-y-2 border-yellow-300"
                    : "bg-white border-transparent hover:border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2"
                )}
                onClick={() => setSelectedProduct(product)}
              >
                {/* Floating Top Seller Badge Outward */}
                {[1, 2, 4, 8].includes(product.id) && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:-top-4 z-20">
                    <span className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-lg flex items-center gap-1.5 border-2 border-white/80 whitespace-nowrap">
                      <Star className="w-3 h-3 md:w-3.5 h-3.5 fill-white text-white" />
                      <span>Top Seller</span>
                    </span>
                  </div>
                )}
                {/* Image Container - The "Card" part */}
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[14px] md:rounded-[21px] bg-white mb-3 md:mb-5 shadow-sm">
                  {/* Floating Badge */}
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 flex flex-col gap-1.5 md:gap-2">
                    <span className="bg-white/95 backdrop-blur-md text-primary-700 px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-sm border border-primary-100 flex items-center gap-1 w-fit">
                      <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-primary-600 text-primary-600" />
                      <span>{product.category}</span>
                    </span>
                  </div>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Quick View Button (Overlay) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Content - Below Image */}
                <div className="flex-1 flex flex-col px-1">
                  <h3 className={classNames(
                    "text-sm md:text-2xl font-bold mb-1 md:mb-2 font-heading transition-colors line-clamp-2",
                    [1, 2, 4, 8].includes(product.id) ? "text-gray-900 group-hover:text-gray-800" : "text-gray-900 group-hover:text-primary-600"
                  )}>
                    {product.name}
                  </h3>

                  <p className={classNames(
                    "mb-2 md:mb-4 line-clamp-2 text-xs md:text-sm font-medium leading-relaxed",
                    [1, 2, 4, 8].includes(product.id) ? "text-gray-900" : "text-gray-600"
                  )}>
                    {product.description}
                  </p>

                  <div className="mt-auto hidden md:block">
                    <ul className="flex flex-wrap gap-2">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className={classNames(
                          "flex items-center text-xs font-semibold px-2 py-1 rounded-md",
                          [1, 2, 4, 8].includes(product.id) ? "bg-white/60 text-yellow-900" : "bg-primary-50 text-primary-700"
                        )}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Call to Action Section - Dark Theme Parallax */}
        <Section className="relative border-t border-gray-100 py-24 pb-32">
          {/* Parallax Background Images */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
            style={{ backgroundImage: 'url(/images/superqpancit.jpg)' }}
          ></div>
          <div className="absolute inset-0 bg-primary-900/85 z-0"></div>

          <div className="relative z-10 text-center max-w-4xl mx-auto rounded-3xl bg-primary-800/40 p-12 lg:p-16 border border-white/10 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6 drop-shadow-md">
              Interested in Our Products?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-sm font-medium">
              Contact us to learn more about our distribution options,
              bulk orders, or to become a retail partner.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center space-x-2 bg-secondary-500 text-white px-8 py-4 rounded-full font-bold hover:bg-secondary-600 transition-colors shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/40 hover:-translate-y-1 transform duration-300"
            >
              <span className="text-lg">Get in Touch</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Section>
      </main>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 z-20 bg-white/50 hover:bg-white text-gray-700 hover:text-gray-900 p-2 rounded-full backdrop-blur-md transition-all duration-300 hover:rotate-90 shadow-sm"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Left Side - Image with Gallery Carousel Overlay */}
                <div className="w-full md:w-1/2 h-[38vh] sm:h-[45vh] md:h-auto relative bg-white md:bg-gray-100 p-2 sm:p-4 md:p-0 flex items-center justify-center shrink-0 border-b border-gray-100 md:border-none group">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none md:hidden" />
                  <img
                    src={selectedImage || selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain md:object-cover relative z-10"
                  />

                  {/* Gallery Carousel - Overlay at Bottom of Image */}
                  {selectedProduct.additionalImages && selectedProduct.additionalImages.length > 0 && (
                    <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-xs">
                      {/* Gallery Container with Arrow Buttons */}
                      <div className="flex items-center gap-1.5 md:gap-2">
                        {/* Left Arrow */}
                        <button
                          onClick={() => {
                            const container = document.getElementById('gallery-scroll');
                            if (container) {
                              container.scrollBy({ left: -80, behavior: 'smooth' });
                              setGalleryScrollPos(Math.max(0, galleryScrollPos - 80));
                            }
                          }}
                          className="flex-shrink-0 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 p-1.5 md:p-2 rounded-full shadow-lg transition-all backdrop-blur-sm"
                        >
                          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </button>

                        {/* Gallery Scroll Container */}
                        <div
                          id="gallery-scroll"
                          className="flex-1 flex gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
                        >
                          {/* Main product image thumbnail */}
                          <div
                            onClick={() => setSelectedImage(null)}
                            className={classNames(
                              "flex-shrink-0 w-16 h-16 md:w-20 md:h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                              !selectedImage
                                ? "border-primary-600 shadow-md ring-2 ring-primary-300"
                                : "border-gray-300 hover:border-gray-400"
                            )}
                          >
                            <img
                              src={selectedProduct.image}
                              alt={`${selectedProduct.name} main`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Additional product images */}
                          {selectedProduct.additionalImages.map((img, idx) => (
                            <div
                              key={idx}
                              onClick={() => setSelectedImage(img)}
                              className={classNames(
                                "flex-shrink-0 w-16 h-16 md:w-20 md:h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition-all",
                                selectedImage === img
                                  ? "border-primary-600 shadow-md ring-2 ring-primary-300"
                                  : "border-gray-300 hover:border-gray-400"
                              )}
                            >
                              <img
                                src={img}
                                alt={`${selectedProduct.name} ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                          onClick={() => {
                            const container = document.getElementById('gallery-scroll');
                            if (container) {
                              container.scrollBy({ left: 80, behavior: 'smooth' });
                              setGalleryScrollPos(galleryScrollPos + 80);
                            }
                          }}
                          className="flex-shrink-0 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 p-1.5 md:p-2 rounded-full shadow-lg transition-all backdrop-blur-sm"
                        >
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side - Details */}
                <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-10 flex flex-col overflow-y-auto">
                  <div className="mb-3 md:mb-6">
                    <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1 bg-primary-50 text-primary-700 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 md:mb-4">
                      <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-primary-600" />
                      {selectedProduct.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-1 sm:mb-2 md:mb-4 leading-tight">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-lg leading-relaxed whitespace-pre-wrap">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 md:pt-6 border-t border-gray-100">
                    <p className="text-[10px] md:text-sm text-gray-500 mb-2 md:mb-4 hidden sm:block">
                      Interested in this product? Contact our sales team for pricing and availability.
                    </p>
                    <div className="flex flex-row gap-2 md:gap-3">
                      <Link
                        to="/contact"
                        className="flex-1 inline-flex justify-center items-center gap-1 md:gap-2 bg-primary-600 text-white px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-xs md:text-base font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary/20"
                      >
                        <Phone className="w-4 h-4 md:w-5 md:h-5" />
                        Call Now
                      </Link>
                      <Link
                        to="/contact"
                        className="flex-1 inline-flex justify-center items-center gap-1 md:gap-2 bg-white text-gray-800 border md:border-2 border-gray-200 px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-xs md:text-base font-bold hover:border-primary-600 hover:text-primary-600 transition-all"
                      >
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                        Inquire
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};