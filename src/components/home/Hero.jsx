import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { ArrowRight } from 'lucide-react';
import { createFadeUpVariants } from '@/utils/animations';
import TiltedCard from '@/components/common/TiltedCard';
import CountUp from '@/components/common/CountUp';

export const Hero = () => {
  const fadeUpVariants = createFadeUpVariants({
    baseDelay: 0.3,
    stagger: 0.2,
    duration: 0.9
  });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed noodle background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: 'url(/noodle-hero-bg.png)' }}
      ></div>

      {/* Dark cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90"></div>

      {/* Subtle warm ambient glow */}
      <div className="absolute bottom-0 left-1/4 -translate-x-1/2 w-[600px] h-[300px] bg-amber-900/10 rounded-full filter blur-[120px] pointer-events-none"></div>

      <Container className="relative z-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Minimal Text */}
          <div className="text-center lg:text-left">
            {/* Tagline badge */}
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white/90 mb-6 sm:mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-400 animate-pulse"></span>
              <span>Est. 1945 · Cebu, Philippines</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-heading leading-[1.05] mb-8 tracking-tight"
            >
              <span className="text-white">Quality</span>
              <br />
              <span className="bg-gradient-to-r from-tertiary-300 via-tertiary-400 to-tertiary-500 bg-clip-text text-transparent drop-shadow-lg">
                Since 1945
              </span>
            </motion.h1>

            {/* CTA buttons — glassmorphism */}
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group flex items-center justify-center gap-2 bg-tertiary-500 hover:bg-tertiary-400 text-gray-900 font-semibold px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-sm sm:text-base transition-colors duration-300 shadow-lg shadow-tertiary-500/20"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-medium px-6 py-3 sm:px-8 sm:py-3.5 rounded-full text-sm sm:text-base transition-colors duration-300"
                >
                  Our Story
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Interactive Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Backglow effect */}
              <div className="absolute inset-0 bg-tertiary-500/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <TiltedCard
                imageSrc="/KimCNgosiok.jpg"
                altText="NGOSIOK MARKETING - 80+ Years of Excellence"
                captionText={
                  <div className="text-tertiary">
                    <div className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                      <CountUp
                        from={0}
                        to={80}
                        separator=","
                        direction="up"
                        duration={2.5}
                        className="inline-block"
                      />
                      <span>+</span>
                    </div>
                    <div className="text-sm md:text-base font-medium drop-shadow-lg">
                      Years of Excellence
                    </div>
                  </div>
                }
                containerHeight="450px"
                containerWidth="340px"
                imageHeight="450px"
                imageWidth="340px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={false}
              />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom fade for seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-500 to-transparent pointer-events-none"></div>
    </section>
  );
};