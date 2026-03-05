import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Section } from '@/components/common/Section';
import { Button } from '@/components/common/Button';
import { Mail, Phone, MapPin, ArrowRight, MessageSquare, ExternalLink } from 'lucide-react';
import { COMPANY_INFO } from '@/utils/constants';
import { fadeUpVariants, defaultViewport } from '@/utils/animations';

export const Contact = () => {
  return (
    <Section className="text-white relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/kim1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-primary-900/85"></div>
      </div>

      {/* Background decorations - Subtle texture & Logo Pattern */}
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">
        {/* Left Column - Contact Info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUpVariants}
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/20 shadow-sm">
            <MessageSquare className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight text-white">
            Let's Start a<br />
            <span className="text-primary-200">Conversation</span>
          </h2>

          <p className="text-lg text-primary-50 mb-8 leading-relaxed font-medium">
            Have questions about our products or want to become a distributor?
            We'd love to hear from you. Our team is ready to assist you.
          </p>

          <div className="grid gap-4 mb-8">
            {/* Phone Card */}
            <motion.div
              custom={1}
              variants={fadeUpVariants}
              className="group flex items-center space-x-4 p-4 bg-white rounded-xl shadow-lg border border-white/10 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Call Us</div>
                <div className="flex flex-col sm:flex-row sm:space-x-4 text-gray-600">
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-primary-600 transition-colors font-medium">
                    {COMPANY_INFO.phone}
                  </a>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <a href={`tel:${COMPANY_INFO.mobile}`} className="hover:text-primary-600 transition-colors font-medium">
                    {COMPANY_INFO.mobile}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              className="group flex items-center space-x-4 p-4 bg-white rounded-xl shadow-lg border border-white/10 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-secondary-50 text-secondary-600 rounded-lg flex items-center justify-center group-hover:bg-secondary-600 group-hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Email Us</div>
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-600 hover:text-secondary-600 transition-colors font-medium block">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </motion.div>

            {/* Address Card */}
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              className="group flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg border border-white/10 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gray-50 text-gray-600 rounded-lg flex items-center justify-center group-hover:bg-gray-800 group-hover:text-white transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Visit Us</div>
                <p className="text-gray-600 font-medium leading-snug">
                  {COMPANY_INFO.address}
                </p>
              </div>
            </motion.div>
          </div>

        </motion.div>

        {/* Right Column - Map */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeUpVariants}
          custom={2}
          className="relative h-full min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20"
        >
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

          {/* Overlay Badge */}
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-[200px] hidden sm:block border border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Located in</p>
            <p className="font-bold text-primary-700 flex items-center gap-1">
              Cebu City, Philippines
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};