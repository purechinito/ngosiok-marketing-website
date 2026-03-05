import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { Card, CardHeader, CardBody } from '@/components/common/Card';
import { History, Target, Award, Users, Globe, Zap, Heart } from 'lucide-react';
import { SEO_CONFIG } from '@/utils/constants';
import { motion } from 'framer-motion';
import { fadeUpVariants, defaultViewport } from '@/utils/animations';
import { WorldMap } from '@/components/common/WorldMap';

export const About = () => {
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
        "name": "About Us",
        "item": `${SEO_CONFIG.siteUrl}/about`
      }
    ]
  };

  const timelineEvents = [
    {
      year: "Early 1900s",
      title: "The Roots",
      description: "Origins in Fujian, China."
    },
    {
      year: "1943",
      title: "Founding",
      description: "Lucio Ngosiok starts business in Cebu."
    },
    {
      year: "1945",
      title: "Re-establishment",
      description: "Post-war restart in Cebu City."
    },
    {
      year: "1973",
      title: "Leadership",
      description: "2nd Gen takes over management."
    },
    {
      year: "Mid-1970s",
      title: "Expansion",
      description: "Formation of Ngosiok Marketing."
    },
    {
      year: "Today",
      title: "Global Reach",
      description: "Exporting worldwide."
    }
  ];

  const commitments = [
    {
      icon: Zap,
      title: "Innovation & Automation",
      description: "We implemented automated processes to eliminate foreign matter exposure and improve production efficiency."
    },
    {
      icon: Award,
      title: "Quality Standards",
      description: "We revolutionized consumer tastes with our quality bihon, differing from traditional ones in taste, color, and texture."
    },
    {
      icon: Globe,
      title: "Global Distribution",
      description: "Starting from Cebu, our distribution network now spans the entire Philippines and reaches international markets."
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description: "Our channels are always open to feedback, ensuring we continuously provide the quality our products are known for."
    }
  ];

  return (
    <>
      <Seo
        title="Our Story - 80+ Years of Noodle Excellence"
        description="From humble beginnings in 1945 to becoming the Philippines' trusted noodle brand. Discover the Ngosiok Marketing story and our commitment to quality Filipino noodles."
        canonical={`${SEO_CONFIG.siteUrl}/about`}
        ogImage={`${SEO_CONFIG.siteUrl}/og-about.jpg`}
        schema={breadcrumbSchema}
      />
      <main className="pt-20">

        {/* HERO SECTION */}
        <Section className="relative overflow-hidden py-20">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: 'url(/ngosiok.jpg)' }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 z-0"></div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl z-0 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl z-0 -translate-x-1/3 translate-y-1/3"></div>

          <div className="text-center max-w-4xl mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={fadeUpVariants}
            >
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/30 shadow-sm">
                <History className="w-4 h-4" />
                <span>Since 1945</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-6 leading-tight drop-shadow-lg">
                About <span className="text-primary-400">Ngosiok Marketing</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-md">
                A legacy of quality, innovation, and trust spanning over 80 years of noodle making excellence.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* THE ORIGIN STORY */}
        <Section className="relative py-20 overflow-hidden">
          {/* Parallax Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
            style={{ backgroundImage: 'url(/oldcover.jpg)' }}
          ></div>
          <div className="absolute inset-0 bg-white/95 z-0"></div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none z-0"></div>
          <div className="absolute bottom-20 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none z-0"></div>

          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">Tracing Our Humble Beginnings</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-yellow-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-10 text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p>
                  <span className="text-5xl font-heading font-bold text-primary-600 float-left mr-3 mt-1 leading-none">N</span>
                  gosiok Marketing traces its humble beginnings to the early 20th century when the father of Lucio Ngosiok opened the business of making Chinese noodles in the coastal town of Fujian, China. Unfortunately, he did not live long enough to pass on the business to the next generation as the orphaned children were aged five and three.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bg-gray-50 border-l-4 border-primary-500 p-6 md:p-8 rounded-r-2xl shadow-sm">
                <p>
                  With the desire to continue his father's business, <strong>Lucio Ngosiok</strong> (known to his friends and peers only as Ngo Siok and the founder of the present enterprise) learned the rudiments of noodle making to start this business in Cebu City, Philippines, during World War II in 1943. With a pair of hands and simple implements, he produced noodles from rice to cater to a few but growing market. This heralded the start of the noodle industry in Cebu.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p>
                  The lingering menace of war forced the business to move from place to place. For a short time, the business was established in Bato, Leyte. After the war, the patriarch re-established the business in Cebu.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p>
                  With the passing of the patriarch in 1973, two descendants of Ngo Siok assumed the management of the business. Their able leadership has steered the business to its present innovativeness and stature.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-6 md:p-8 rounded-2xl shadow-sm">
                <p>
                  In mid-1970's, <strong>Ngosiok Marketing</strong> was established to represent four affiliated companies producing different types of noodles. Two companies are producing the wheat-based Chinese noodles under the brand names <em>First Choice</em> and <em>Long Life</em>. Two other separate facilities manufacture the cornstarch-based noodles under the brand names <span className="text-yellow-700 font-bold">Eagle VSP</span> and <span className="text-yellow-700 font-bold">Super Q</span>.
                </p>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* HERITAGE TIMELINE SECTION */}
        <Section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">Our Heritage</h2>
              <p className="text-lg text-gray-600">The journey from humble beginnings to industry leadership</p>
            </div>

            {/* Responsive Timeline Container */}
            <div className="relative">

              {/* DESKTOP: Horizontal Line (Hidden on Mobile) */}
              <div className="hidden md:block absolute top-[138px] left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-400 to-secondary-400 rounded-full z-0"></div>

              {/* MOBILE: Vertical Line (Hidden on Desktop) */}
              <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-200 via-primary-400 to-secondary-400 rounded-full z-0"></div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-row md:flex-col items-center md:items-start group"
                  >

                    {/* MOBILE LAYOUT */}
                    <div className="md:hidden flex items-start w-full">
                      {/* Circle Node */}
                      <div className="flex-shrink-0 w-16 flex justify-center pt-2">
                        <div className="w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-md z-10"></div>
                      </div>
                      {/* Content Card */}
                      <div className="flex-grow pb-8">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative">
                          <span className="inline-block px-2 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded mb-2">
                            {event.year}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* DESKTOP LAYOUT */}
                    <div className="hidden md:flex flex-col items-center w-full text-center h-[350px] group/card">
                      {/* Alternating Content (Top) */}
                      <div className={`flex-1 flex flex-col justify-end pb-8 w-full transition-opacity duration-300 ${index % 2 === 0 ? 'opacity-100' : 'opacity-0'}`}>
                        {index % 2 === 0 && (
                          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative transform hover:-translate-y-1 z-10">
                            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-100 rotate-45"></div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover/card:text-primary-600 transition-colors">{event.title}</h3>
                            <div className="max-h-0 overflow-hidden group-hover/card:max-h-40 transition-[max-height] duration-500 ease-in-out">
                              <p className="text-gray-600 text-sm mt-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100 border-t border-gray-100 pt-2">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Middle Node & Year */}
                      <div className="flex-shrink-0 flex flex-col items-center justify-center relative h-12">
                        <div className="w-5 h-5 rounded-full bg-primary-600 border-4 border-white shadow-md z-20 group-hover/card:scale-125 group-hover/card:bg-secondary-500 transition-all duration-300"></div>
                        <div className="absolute top-10 font-bold text-primary-700 text-sm whitespace-nowrap bg-primary-50 px-2 py-1 rounded-full group-hover/card:bg-secondary-100 group-hover/card:text-secondary-700 transition-colors">
                          {event.year}
                        </div>
                      </div>

                      {/* Alternating Content (Bottom) */}
                      <div className={`flex-1 flex flex-col justify-start pt-14 w-full transition-opacity duration-300 ${index % 2 !== 0 ? 'opacity-100' : 'opacity-0'}`}>
                        {index % 2 !== 0 && (
                          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative transform hover:translate-y-1 z-10">
                            <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover/card:text-primary-600 transition-colors">{event.title}</h3>
                            <div className="max-h-0 overflow-hidden group-hover/card:max-h-40 transition-[max-height] duration-500 ease-in-out">
                              <p className="text-gray-600 text-sm mt-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100 border-t border-gray-100 pt-2">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>



        {/* GLOBAL REACH MAP SECTION */}
        <Section className="relative py-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
            style={{ backgroundImage: 'url(/images/superqprods.jpg)' }}
          ></div>
          <div className="absolute inset-0 bg-primary-900/90 z-0"></div>

          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0 mix-blend-overlay"
            style={{ backgroundImage: 'url(/world-map.svg)', opacity: 0.15, backgroundSize: 'contain' }}
          ></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-secondary-400 font-bold tracking-wider uppercase text-sm mb-2 block">Our Reach</span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6">Nationwide Presence, Global Appeal</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-500 mx-auto rounded-full mb-8"></div>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                From our strategic hub in Cebu, our distribution network spans the entire Philippines and extends to key international markets across the globe.
              </p>
            </div>

            <WorldMap />

          </div>
        </Section>

        {/* COMMITMENT SECTION */}
        <Section className="bg-white py-24 relative">
          <div className="text-center max-w-3xl mx-auto px-4 mb-16">
            <h2 className="text-4xl font-bold font-heading text-gray-900 mb-6">Our Commitment</h2>
            <p className="text-xl text-gray-600">
              We are totally committed to product quality and customer satisfaction.
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {commitments.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-primary-50/30 hover:border-primary-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 border border-gray-100">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

      </main>
    </>
  );
};