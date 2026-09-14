import { useState } from 'react';
import { motion } from 'framer-motion';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/common/Container';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { CareersHero } from '@/components/careers/CareersHero';
import { JobApplicationModal } from '@/components/careers/JobApplicationModal';
import { ArrowRight, Briefcase, Users, TrendingUp } from 'lucide-react';
import { createFadeUpVariants } from '@/utils/animations';
import { SEO_CONFIG } from '@/utils/constants';

const jobListings = [
  {
    id: 'ai-workflow-specialist',
    title: 'AI Workflow Specialist',
    department: 'Operations & AI',
    location: 'Hybrid - Cebu, Philippines',
    type: 'Full-time',
    featured: true,
    goal: 'Identify bottlenecks and integrate AI tools to automate internal processes and improve company efficiency.',
    requirements: [
      'Strong understanding of LLMs (Large Language Models)',
      'Experience with workflow automation tools (n8n, Zapier, or similar)',
      'Proficiency in system integrations and APIs',
      'Excellent problem-solving and analytical skills',
      'Experience with process documentation and optimization'
    ],
    description: 'We are seeking an AI Workflow Specialist to transform our internal operations through intelligent automation. You will evaluate existing processes, identify inefficiencies, and implement AI-powered solutions to boost productivity across the organization.',
    responsibilities: [
      'Audit and analyze existing business processes to identify automation opportunities',
      'Design and implement AI-powered workflow solutions',
      'Integrate LLM capabilities into existing systems',
      'Train teams on new automation tools and best practices',
      'Monitor and optimize automated workflows for continuous improvement'
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    department: 'Product',
    location: 'On-site - Cebu, Philippines',
    type: 'Full-time',
    featured: false,
    goal: 'Drive product vision and strategy while collaborating with engineering and marketing teams.',
    requirements: [
      '5+ years of product management experience',
      'Strong data analysis and user research skills',
      'Experience with agile development methodologies',
      'Excellent communication and leadership abilities'
    ],
    description: 'Lead the product development process from conception through launch. You will work with stakeholders to define product strategy and ensure successful delivery of innovative solutions.'
  },
  {
    id: 'marketing-specialist',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'On-site - Cebu, Philippines',
    type: 'Full-time',
    featured: false,
    goal: 'Create and execute marketing campaigns that increase brand awareness and drive sales.',
    requirements: [
      '3+ years of digital marketing experience',
      'Expertise in social media marketing and content creation',
      'Data-driven approach to marketing',
      'SEO and SEM knowledge'
    ],
    description: 'Develop and execute integrated marketing campaigns across multiple channels. You will analyze campaign performance and optimize strategies for maximum ROI.'
  },
  {
    id: 'operations-lead',
    title: 'Operations Manager',
    department: 'Operations',
    location: 'On-site - Cebu, Philippines',
    type: 'Full-time',
    featured: false,
    goal: 'Optimize operational efficiency and ensure smooth day-to-day company operations.',
    requirements: [
      '7+ years of operations management experience',
      'Supply chain and logistics knowledge',
      'Process improvement expertise',
      'Strong leadership and organizational skills'
    ],
    description: 'Oversee all operational aspects of the company. You will implement improvements, manage vendor relationships, and ensure adherence to operational standards.'
  }
];

export const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fadeUpVariants = createFadeUpVariants({
    baseDelay: 0.2,
    stagger: 0.1,
    duration: 0.6
  });

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  const featuredJob = jobListings.find(job => job.featured);
  const otherJobs = jobListings.filter(job => !job.featured);

  const careersSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Careers at Ngosiok Marketing",
    "url": `${SEO_CONFIG.siteUrl}/careers`,
    "description": "Join our team and drive innovation in food processing and AI automation."
  };

  return (
    <>
      <Seo
        title="Careers - Join Our Team at Ngosiok Marketing"
        description="Explore exciting career opportunities at Ngosiok Marketing. We're hiring AI Workflow Specialists, Product Managers, and more. Grow your career with us!"
        canonical={`${SEO_CONFIG.siteUrl}/careers`}
        ogImage={`${SEO_CONFIG.siteUrl}/og-careers.jpg`}
        schema={careersSchema}
      />
      <main>
        <CareersHero />

        {/* Featured Job Section */}
        {featuredJob && (
          <section className="py-16 lg:py-24 bg-gradient-to-b from-primary-50/50 to-transparent">
            <Container>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="inline-flex items-center gap-2 bg-tertiary-100 text-tertiary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <TrendingUp className="w-4 h-4" />
                  Featured Position
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4">
                  We're Hiring
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl">
                  Help us transform our operations with AI and automation
                </p>
              </motion.div>

              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="border-2 border-tertiary-300 bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative">
                  {/* Accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tertiary-400 to-tertiary-600"></div>

                  <CardHeader className="bg-gradient-to-r from-tertiary-50 to-transparent pb-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          {featuredJob.title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <span className="inline-flex items-center gap-1.5 text-gray-600 text-sm">
                            <Briefcase className="w-4 h-4" />
                            {featuredJob.department}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600 text-sm">{featuredJob.location}</span>
                          <span className="text-gray-400">•</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {featuredJob.type}
                          </span>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-12 h-12 rounded-full bg-tertiary-100 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-tertiary-600" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardBody className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                        Role Overview
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {featuredJob.goal}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                          Key Requirements
                        </h4>
                        <ul className="space-y-2">
                          {featuredJob.requirements.map((req, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span className="text-tertiary-500 font-bold flex-shrink-0">✓</span>
                              <span className="text-gray-700">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                          Main Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {featuredJob.responsibilities?.map((resp, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span className="text-tertiary-500 font-bold flex-shrink-0">•</span>
                              <span className="text-gray-700">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApplyClick(featuredJob)}
                        className="group flex items-center justify-center gap-2 bg-tertiary-500 hover:bg-tertiary-600 text-gray-900 font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg shadow-tertiary-500/20 flex-1 sm:flex-none"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                      <button className="flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-8 py-3 rounded-full transition-colors duration-300 flex-1 sm:flex-none">
                        Learn More
                      </button>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </Container>
          </section>
        )}

        {/* Other Positions Section */}
        {otherJobs.length > 0 && (
          <section className="py-16 lg:py-24">
            <Container>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Users className="w-4 h-4" />
                  Open Positions
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
                  More Opportunities
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {otherJobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    custom={idx}
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 flex flex-col">
                      <CardHeader className="pb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {job.department}
                          </span>
                          <span className="text-gray-500 text-xs">{job.location}</span>
                        </div>
                      </CardHeader>

                      <CardBody className="flex-grow flex flex-col">
                        <p className="text-gray-700 text-sm mb-4 flex-grow">
                          {job.goal}
                        </p>

                        <div className="mb-4 pt-4 border-t border-gray-200">
                          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">
                            Requirements
                          </h4>
                          <ul className="space-y-1">
                            {job.requirements.slice(0, 3).map((req, idx) => (
                              <li key={idx} className="flex gap-2 text-xs text-gray-600">
                                <span className="text-tertiary-500 flex-shrink-0">✓</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApplyClick(job)}
                          className="group flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors duration-300 w-full mt-auto"
                        >
                          Apply Now
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </CardBody>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Culture Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-transparent to-secondary-50/30">
          <Container>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4">
                Why Join Us?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl">
                We believe in creating an environment where innovation thrives and talent grows
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Innovation First',
                  description: 'Work with cutting-edge AI and automation technologies to solve real business problems.'
                },
                {
                  title: 'Growth Opportunities',
                  description: 'Continuous learning programs and career development pathways to advance your skills.'
                },
                {
                  title: 'Collaborative Culture',
                  description: 'Work alongside passionate professionals in a supportive and inclusive environment.'
                }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardBody className="space-y-4">
                      <div className="w-12 h-12 rounded-full bg-tertiary-100 flex items-center justify-center mx-auto">
                        <span className="text-xl">✨</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {benefit.description}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      {/* Job Application Modal */}
      {isModalOpen && selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
