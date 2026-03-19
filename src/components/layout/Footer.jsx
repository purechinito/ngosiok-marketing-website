import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO, SOCIAL_LINKS } from '@/utils/constants';
import { fadeUpVariants, staggerContainerVariants, defaultViewport } from '@/utils/animations';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10 pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainerVariants}
          className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <motion.div variants={fadeUpVariants} custom={0}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src="/logo.jpg"
                  alt={COMPANY_INFO.name}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div>
                <h3 className="text-white font-bold font-heading text-lg">
                  {COMPANY_INFO.name}
                </h3>
                <p className="text-xs text-primary-400">{COMPANY_INFO.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Transforming the noodle industry in the Philippines since {COMPANY_INFO.foundedYear}.
            </p>
            <div className="flex space-x-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-primary-600 hover:border-primary-500 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:border-transparent transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-500 transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUpVariants} custom={1}>
            <h4 className="text-white font-semibold mb-4 text-lg font-heading">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-primary-400 transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Our Products */}
          <motion.div variants={fadeUpVariants} custom={2}>
            <h4 className="text-white font-semibold mb-4 text-lg font-heading">Our Products</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-primary-400 transition-colors cursor-pointer flex items-center group">
                <span className="w-1.5 h-1.5 bg-tertiary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <Link to="/products">Super Q Golden Bihon</Link>
              </li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer flex items-center group">
                <span className="w-1.5 h-1.5 bg-tertiary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <Link to="/products">Super Q Pancit Canton</Link>
              </li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer flex items-center group">
                <span className="w-1.5 h-1.5 bg-tertiary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <Link to="/products">Super Q Special Palabok</Link>
              </li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer flex items-center group">
                <span className="w-1.5 h-1.5 bg-tertiary-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <Link to="/products">First Choice Noodles</Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUpVariants} custom={3}>
            <h4 className="text-white font-semibold mb-4 text-lg font-heading">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 group hover:bg-white/5 p-2 rounded-lg transition-all -ml-2">
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/30 transition-colors">
                  <MapPin className="w-4 h-4 text-primary-400" />
                </div>
                <span className="leading-relaxed">{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-3 group hover:bg-white/5 p-2 rounded-lg transition-all -ml-2">
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/30 transition-colors">
                  <Phone className="w-4 h-4 text-primary-400" />
                </div>
                <span>{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-3 group hover:bg-white/5 p-2 rounded-lg transition-all -ml-2">
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/30 transition-colors">
                  <Mail className="w-4 h-4 text-primary-400" />
                </div>
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-primary-400 transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/10 py-6"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center w-full space-y-4 md:space-y-0 text-sm">
              <div className="text-gray-400 text-center md:text-left">
                <span>
                  © {currentYear} <span className="text-white font-semibold">{COMPANY_INFO.name}</span>. All rights reserved.
                </span>
              </div>
              <div className="flex items-center space-x-6 text-gray-400">
                <Link to="/privacy" className="hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="/terms" className="hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>

            <div className="text-gray-500 text-xs md:text-sm text-center pt-2">
              <span className="flex items-center justify-center gap-1.5">
                Created by
                <a
                  href="https://www.facebook.com/profile.php?id=61587269647950"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold hover:text-primary-400 transition-colors border-b border-white hover:border-primary-400 flex items-center gap-1"
                >
                  ODC
                </a>
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};