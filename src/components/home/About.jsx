import { Section } from '@/components/common/Section';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Award, Globe, Users, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';
import CountUp from '@/components/common/CountUp';
import { COMPANY_INFO } from '@/utils/constants';
import { fadeUpVariants, scaleVariants, defaultViewport } from '@/utils/animations';

export const About = () => {
  const highlights = [
    'Automated production processes',
    'Quality control at every step',
    'Nationwide distribution network',
    'International export reach',
  ];

  const stats = [
    { icon: Award, value: 82, suffix: '+', label: 'Years', gradient: 'from-primary-500 to-primary-600', iconBg: 'bg-gradient-to-br from-primary-500 to-primary-600' },
    { icon: Globe, value: 5, suffix: '+', label: 'Continents', gradient: 'from-secondary-500 to-secondary-600', iconBg: 'bg-gradient-to-br from-secondary-500 to-secondary-600' },
    { icon: MapPin, textValue: 'Nationwide', suffix: '', label: 'Presence', gradient: 'from-tertiary-500 to-tertiary-600', iconBg: 'bg-gradient-to-br from-tertiary-500 to-tertiary-600' },
    { icon: TrendingUp, value: 4, suffix: '', label: 'Brands', gradient: 'from-primary-400 to-secondary-500', iconBg: 'bg-gradient-to-br from-primary-400 to-secondary-500' },
  ];

  const currentYear = new Date().getFullYear();
  const foundedYear = parseInt(COMPANY_INFO.foundedYear);
  const totalYears = currentYear - foundedYear;

  return (
    <Section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100/30 rounded-full blur-3xl -z-10"></div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left side - Stats Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="relative"
        >
          <div className="relative rounded-3xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] overflow-hidden p-8 lg:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-secondary-500/10 to-transparent rounded-full blur-2xl"></div>

            <div className="relative h-full flex flex-col justify-center items-center text-center">
              {/* Main founding year */}
              <motion.div
                custom={0}
                variants={scaleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-8 w-full"
              >
                <div className="text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-2">
                  <CountUp
                    to={currentYear}
                    from={foundedYear}
                    separator=""
                    direction="down"
                    duration={3.5}
                    className="inline-block"
                  />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 font-display">
                  Founded in Cebu
                </div>

                {/* Visual Timeline Line */}
                <div className="w-full max-w-[80%] mx-auto">
                  <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 font-heading tracking-wider">
                    <span>{foundedYear}</span>
                    <span>TODAY</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden relative shadow-inner ring-1 ring-black/5">
                    {/* Animated Fill Bar */}
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2.0, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                    </motion.div>
                  </div>
                  <div className="text-xs text-center mt-2 font-bold text-primary-700 tracking-wide uppercase">
                    {totalYears}+ Years of Excellence
                  </div>
                </div>
              </motion.div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 w-full mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={scaleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white/60 hover:scale-[1.02]"
                  >
                    {/* Branded Icon with custom gradient */}
                    <div className="relative mb-3 mx-auto w-fit">
                      {/* Glow effect */}
                      <div className={`absolute inset-0 ${stat.iconBg} rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                      {/* Icon container */}
                      <div className={`relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg ring-2 ring-white/50`}>
                        <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white drop-shadow-md" />
                      </div>
                    </div>

                    {/* Animated CountUp OR Text Value */}
                    <div className="font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent flex justify-center items-baseline px-2">
                      <span className={`text-gray-900 ${stat.textValue ? 'text-[1.35rem] lg:text-3xl' : 'text-2xl lg:text-3xl'}`}>
                        {stat.textValue ? stat.textValue : (
                          <CountUp
                            from={0}
                            to={stat.value}
                            separator=","
                            direction="up"
                            duration={2.5}
                            className="inline-block"
                          />
                        )}
                      </span>
                      {stat.suffix && <span className="text-primary-600 text-lg ml-0.5 font-extrabold">{stat.suffix}</span>}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600 font-bold uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Content */}
        <div>
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-primary-100 shadow-sm"
          >
            <Award className="w-4 h-4" />
            <span>About Us</span>
          </motion.div>


          <motion.h2
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight text-gray-900"
          >
            Leading the Way in<br />
            <span className="text-primary-600">
              Quality Noodles
            </span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-gray-700 mb-6 leading-relaxed font-medium"
          >
            A pioneer in the Philippine noodle industry, Ngosiok Marketing constantly innovates to improve
            quality and efficiency. By automating production, we've eliminated contamination risks from
            traditional sun-drying and set new standards with our premium bihon.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                custom={4 + index * 0.5}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center space-x-3 group p-3 bg-white/50 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-100 shadow-sm hover:shadow"
              >
                <div className="relative w-8 h-8 flex-shrink-0">
                  {/* Branded glow effect */}
                  <div className="absolute inset-0 bg-primary-100 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  {/* Icon with brand colors */}
                  <div className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm ring-1 ring-primary-100">
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                  </div>
                </div>
                <span className="text-gray-800 font-semibold text-lg">{highlight}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            custom={5}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 font-heading">
              Our Certifications
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'HACCP Certified',
                'Halal Certified by IDCP',
                'GMP Certified',
                'FDA Approved'
              ].map((cert, index) => (
                <div key={index} className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-200 shadow-sm text-xs sm:text-sm font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            custom={6}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link to="/about" className="inline-block">
              <Button variant="primary" size="lg" className="group shadow-primary/25 shadow-lg hover:shadow-primary/40 hover:shadow-xl transition-all">
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};