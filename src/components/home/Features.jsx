import { useState, useEffect } from 'react';
import { Section } from '@/components/common/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { features } from '@/data/features';
import { contentSwitchVariants, defaultViewport } from '@/utils/animations';
import { ArrowRight, Pause, Play, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

export const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const PROGRESS_DURATION = 5000; // 5 seconds per slide
  const [progress, setProgress] = useState(0);

  // Prepare images array from features data
  const featureImages = features.map(feature => feature.image || '/ngosiok.jpg');

  useEffect(() => {
    let startTime = Date.now();
    let animationFrameId;

    const animate = () => {
      if (!isPaused) {
        const elapsed = Date.now() - startTime;
        const newProgress = (elapsed / PROGRESS_DURATION) * 100;

        if (newProgress >= 100) {
          setActiveFeature((prev) => (prev + 1) % features.length);
          startTime = Date.now();
          setProgress(0);
        } else {
          setProgress(newProgress);
        }
      } else {
        startTime = Date.now() - (progress / 100) * PROGRESS_DURATION;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, features.length]);

  const handleManualChange = (index) => {
    setActiveFeature(index);
    setProgress(0);
  };

  return (
    <Section className="relative overflow-hidden text-white py-24 md:py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/products/2018.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-primary-900/85"></div>
      </div>

      {/* Background decorations - Subtle texture */}
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div
        className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-7xl mx-auto relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Column - Large Image Slideshow */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6 }}
          className="relative order-1"
        >
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeFeature}
                src={featureImages[activeFeature]}
                alt={features[activeFeature].title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient overlay for text legibility if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

            {/* pause/play indicator */}
            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
            </div>
          </div>

          {/* Decorative element behind */}
          <div className="absolute -z-10 top-8 -left-8 w-full h-full bg-white/5 rounded-3xl border border-white/10 hidden md:block"></div>
        </motion.div>

        {/* Right Column - Dynamic Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-2 lg:pl-8 flex flex-col h-full justify-center"
        >
          <div className="min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                variants={contentSwitchVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Header Badge */}
                <div className="inline-block bg-white text-primary-700 px-4 py-2 rounded-full text-sm font-bold mb-8 shadow-lg">
                  Why Choose Us
                </div>

                {/* Title */}
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 leading-tight">
                  {features[activeFeature].title}
                </h3>

                {/* Description */}
                <p className="text-lg md:text-xl text-primary-50 leading-relaxed mb-8 font-medium opacity-90">
                  {features[activeFeature].description}
                </p>

                {/* Feature List/Highlights (Optional addition for detail) */}
                <ul className="space-y-3 mb-10">
                  <li className="flex items-center text-white/90">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-secondary-400" />
                    <span className="font-medium">Premium ingredients tailored for Filipino taste</span>
                  </li>
                  <li className="flex items-center text-white/90">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-secondary-400" />
                    <span className="font-medium">Trusted by households for generations</span>
                  </li>
                </ul>

                <Link to="/about">
                  <Button variant="white" size="lg" className="shadow-xl hover:scale-105 font-bold px-8">
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualChange(index)}
                className="group flex-1 focus:outline-none"
              >
                <div className="flex flex-col gap-3">
                  <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${activeFeature === index ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                    0{index + 1}
                  </span>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                    {/* Background track */}
                    <div className={`absolute inset-0 bg-white/10 transition-colors duration-300 ${activeFeature === index ? 'bg-white/20' : ''}`} />

                    {/* Progress Fill */}
                    {activeFeature === index && (
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-secondary-400"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0 }} // Controlled by state
                      />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};