import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Container } from '@/components/common/Container';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '@/utils/constants';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 50;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        paddingLeft: isScrolled ? '1rem' : '0',
        paddingRight: isScrolled ? '1rem' : '0',
        paddingTop: isScrolled ? '1rem' : '0',
      }}
    >
      <motion.div
        layout
        className="w-full"
        transition={{
          layout: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
        }}
      >
        <motion.div
          layout
          className={`${isScrolled
            ? 'mx-auto max-w-7xl'
            : 'w-full'
            }`}
          style={{
            borderRadius: isScrolled ? '9999px' : '0',
          }}
          transition={{
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <motion.div
            layout
            className={`${isScrolled
              ? 'bg-white/70 backdrop-blur-xl py-2.5 px-6 border border-white/40'
              : 'bg-white/95 backdrop-blur-md py-4 px-0 border-b border-white/40'
              }`}
            style={{
              boxShadow: isScrolled
                ? '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
                : '0 4px 16px 0 rgba(31, 38, 135, 0.05)',
              borderRadius: isScrolled ? '9999px' : '0',
            }}
            transition={{
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            <Container className={isScrolled ? 'px-0' : ''}>
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-3 group">
                  <motion.div
                    layout
                    className="relative flex-shrink-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <motion.img
                      src="/logo.jpg"
                      alt={`${COMPANY_INFO.name} logo`}
                      className="relative object-cover rounded-xl group-hover:scale-105 transition-all duration-300 ring-2 ring-primary-500/20 group-hover:ring-primary-500/40"
                      loading="lazy"
                      animate={{
                        width: isScrolled ? '48px' : '56px',
                        height: isScrolled ? '48px' : '56px',
                      }}
                      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                    />
                  </motion.div>
                  <motion.div
                    layout
                    className="block"
                  >
                    {/*
                      Deliberately a <span>, not an <h1>. This is the site-wide
                      logo wordmark, so making it a heading gave every page the
                      same first-level heading ("NGOSIOK MARKETING") and buried
                      the real page h1 underneath it. Visual styling unchanged.
                    */}
                    <motion.span
                      layout
                      className="block font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent font-heading whitespace-nowrap"
                      animate={{
                        fontSize: isScrolled ? '1rem' : '1.125rem',
                      }}
                      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      {COMPANY_INFO.name}
                    </motion.span>
                    <motion.p
                      layout
                      className="text-gray-600 font-medium whitespace-nowrap"
                      animate={{
                        fontSize: isScrolled ? '0.7rem' : '0.75rem',
                      }}
                      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      {COMPANY_INFO.tagline}
                    </motion.p>
                  </motion.div>
                </Link>

                <Navigation className="hidden md:flex" />

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2.5 rounded-xl hover:bg-primary-50 active:bg-primary-100 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-primary-600" />
                  ) : (
                    <Menu className="w-5 h-5 text-primary-600" />
                  )}
                </button>
              </div>
            </Container>
          </motion.div>

          <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </motion.div>
      </motion.div>
    </motion.header>
  );
};