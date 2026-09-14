import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle } from 'lucide-react';

export const JobApplicationModal = ({ job, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolioLink: '',
    resume: null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }

    if (formData.portfolioLink && !/^(https?:\/\/)/.test(formData.portfolioLink)) {
      newErrors.portfolioLink = 'Please enter a valid URL starting with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        portfolioLink: '',
        resume: null
      });

      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          ></motion.div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-tertiary-50 to-transparent border-b border-gray-200 px-6 sm:px-8 py-6 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    Apply for {job.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{job.department} • {job.location}</p>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="px-6 sm:px-8 py-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="flex justify-center mb-4"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Application Submitted!
                    </h3>
                    <p className="text-gray-600 mb-1">
                      Thank you for applying to the {job.title} position.
                    </p>
                    <p className="text-gray-600 text-sm">
                      We'll review your application and get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-tertiary-500'
                        } focus:outline-none focus:ring-2 bg-white`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-tertiary-500'
                        } focus:outline-none focus:ring-2 bg-white`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label htmlFor="resume" className="block text-sm font-semibold text-gray-900 mb-2">
                        Resume Upload *
                      </label>
                      <div className="relative">
                        <input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="resume"
                          className={`flex flex-col items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                            errors.resume
                              ? 'border-red-500 bg-red-50 hover:bg-red-100'
                              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <Upload className={`w-8 h-8 mb-2 ${errors.resume ? 'text-red-500' : 'text-gray-400'}`} />
                          <span className="text-sm font-medium text-gray-700">
                            {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            PDF, DOC, DOCX, or TXT (Max 5MB)
                          </span>
                        </label>
                      </div>
                      {errors.resume && (
                        <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
                      )}
                    </div>

                    {/* Portfolio Link */}
                    <div>
                      <label htmlFor="portfolioLink" className="block text-sm font-semibold text-gray-900 mb-2">
                        Portfolio Link
                      </label>
                      <input
                        id="portfolioLink"
                        type="url"
                        name="portfolioLink"
                        value={formData.portfolioLink}
                        onChange={handleInputChange}
                        placeholder="https://yourportfolio.com"
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          errors.portfolioLink
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-tertiary-500'
                        } focus:outline-none focus:ring-2 bg-white`}
                      />
                      {errors.portfolioLink && (
                        <p className="text-red-500 text-sm mt-1">{errors.portfolioLink}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-1">Optional: Share your portfolio, GitHub, or LinkedIn profile</p>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-tertiary-500 hover:bg-tertiary-600 disabled:bg-gray-400 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                            Submitting...
                          </>
                        ) : (
                          'Submit Application'
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold transition-colors duration-300"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
