import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { Card, CardHeader, CardBody } from '@/components/common/Card';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import { COMPANY_INFO, SOCIAL_LINKS, SEO_CONFIG } from '@/utils/constants';

export const Contact = () => {
  // LocalBusiness Schema for Google Maps and local search
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${SEO_CONFIG.siteUrl}/#organization`,
    "name": COMPANY_INFO.name,
    "image": `${SEO_CONFIG.siteUrl}/logo.jpg`,
    "description": "Premium Filipino noodle manufacturer since 1945",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "325 B. Aranas Street",
      "addressLocality": "Cebu City",
      "addressRegion": "Cebu",
      "postalCode": "6000",
      "addressCountry": "PH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "10.3",
      "longitude": "123.9"
    },
    "url": SEO_CONFIG.siteUrl,
    "telephone": COMPANY_INFO.phone,
    "email": COMPANY_INFO.email,
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.youtube
    ]
  };

  return (
    <>
      <Seo
        title="Contact Us - Visit Our Cebu Office"
        description="Ready to partner or order? Contact Ngosiok Marketing today. Visit us in Cebu City or reach out for distributor inquiries and bulk orders. We're here to help!"
        canonical={`${SEO_CONFIG.siteUrl}/contact`}
        ogImage={`${SEO_CONFIG.siteUrl}/og-contact.jpg`}
        schema={localBusinessSchema}
      />
      <main className="pt-20 bg-gray-50 min-h-screen">
        {/* Header */}
        <Section className="relative overflow-hidden pt-20 pb-12">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: 'url(/ngosiok.jpg)' }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 z-0"></div>

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/30 shadow-sm">
              Get In Touch
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6 drop-shadow-lg">
              Contact <span className="text-primary-400">Us</span>
            </h1>
            <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md">
              We'd love to hear from you. Visit our office, give us a call, or send us an email.
            </p>
          </div>
        </Section>

        <Section className="relative pt-12 pb-24">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
            style={{ backgroundImage: 'url(/kim2.jpg)' }}
          ></div>
          <div className="absolute inset-0 bg-gray-50/95 z-0"></div>

          <div className="relative z-10 grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/90 rounded-3xl p-8 border border-white/40 shadow-xl hover:shadow-2xl hover:border-primary-200 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 text-primary-600 group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Phone</h3>
              <div className="space-y-3">
                <a href={`tel:${COMPANY_INFO.phone}`} className="block text-gray-600 hover:text-primary-600 transition-colors font-medium">
                  {COMPANY_INFO.phone}
                </a>
                <a href={`tel:${COMPANY_INFO.mobile}`} className="block text-gray-600 hover:text-primary-600 transition-colors font-medium">
                  {COMPANY_INFO.mobile}
                </a>
              </div>
            </div>

            <div className="bg-white/90 rounded-3xl p-8 border border-white/40 shadow-xl hover:shadow-2xl hover:border-primary-200 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-secondary-50 rounded-2xl flex items-center justify-center mb-6 text-secondary-600 group-hover:scale-110 transition-transform shadow-inner">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email</h3>
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-600 hover:text-secondary-600 transition-colors font-medium text-lg">
                {COMPANY_INFO.email}
              </a>
              <p className="text-gray-500 text-sm mt-4">
                For general inquiries and distributor information.
              </p>
            </div>

            <div className="bg-white/90 rounded-3xl p-8 border border-white/40 shadow-xl hover:shadow-2xl hover:border-primary-200 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-700 group-hover:scale-110 transition-transform shadow-inner">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Office</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                {COMPANY_INFO.address}
              </p>
            </div>
          </div>

          <div className="relative z-10 grid lg:grid-cols-5 gap-8">
            {/* Map occupying larger space since form is gone */}
            <div className="lg:col-span-3 h-[500px] lg:h-auto min-h-[500px] rounded-3xl overflow-hidden shadow-lg border border-white relative z-0">
              <iframe
                title="NGOSIOK MARKETING Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.4937!2d123.8829062!3d10.2952342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99bfee9ad9c2d%3A0x1670c596fbaf29f9!2sNgosiok%20Marketing!5e0!3m2!1sen!2sph!4v1714000000000!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="lg:col-span-2 space-y-8 flex flex-col">
              <div className="bg-white/90 p-8 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transition-shadow flex-1">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <h3 className="text-xl font-bold text-gray-900">Business Hours</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                    <span className="text-gray-600 font-medium">Monday - Friday</span>
                    <span className="font-bold text-gray-900">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                    <span className="text-gray-600 font-medium">Saturday</span>
                    <span className="font-bold text-gray-900">8:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Sunday</span>
                    <span className="font-bold text-gray-900 bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-xs uppercase tracking-wider">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>

                <h3 className="text-xl font-bold mb-2">Connect Socially</h3>
                <p className="text-primary-100 mb-6 text-sm">Stay updated with our latest news and announcements.</p>

                <div className="flex space-x-4">
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white flex items-center justify-center transition-all duration-300 hover:text-primary-700 group"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white flex items-center justify-center transition-all duration-300 hover:text-primary-700 group"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white flex items-center justify-center transition-all duration-300 hover:text-primary-700 group"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};