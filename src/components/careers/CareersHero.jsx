import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { createFadeUpVariants } from '@/utils/animations';

export const CareersHero = () => {
  const fadeUpVariants = createFadeUpVariants({
    baseDelay: 0.3,
    stagger: 0.2,
    duration: 0.9
  });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900"></div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-tertiary-400/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 left-1/4 w-80 h-80 bg-secondary-400/5 rounded-full blur-3xl"></div>

      <Container className="relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Tagline badge */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white/90 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-400 animate-pulse"></span>
            <span>80+ Years of Excellence · Now Hiring</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.1] mb-6 tracking-tight"
          >
            <span className="text-white">Join Our</span>
            <br />
            <span className="bg-gradient-to-r from-tertiary-300 via-tertiary-400 to-tertiary-500 bg-clip-text text-transparent drop-shadow-lg">
              Growing Team
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed"
          >
            We're seeking talented professionals to help drive operational excellence through AI innovation and automation. Be part of a team transforming the food industry.
          </motion.p>

          {/* Key highlights */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-6 sm:gap-8"
          >
            {[
              { label: '4+', description: 'Open Positions' },
              { label: '1945', description: 'Year Founded' },
              { label: '80+', description: 'Years Operating' }
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-tertiary-400">
                    {stat.label}
                  </div>
                  <div className="text-sm text-white/60">
                    {stat.description}
                  </div>
                </div>
                {idx < 2 && <div className="hidden sm:block w-px h-12 bg-white/20"></div>}
              </div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
};
