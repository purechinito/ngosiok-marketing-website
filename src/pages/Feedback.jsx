import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { MessageSquare, ShieldCheck, Clock } from 'lucide-react';
import { SEO_CONFIG } from '@/utils/constants';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';
import { seoRoutes } from '@/data/seo-routes';

const route = seoRoutes.find((entry) => entry.path === '/feedback');

const assurances = [
  {
    icon: Clock,
    title: 'It reaches Cebu directly',
    body: 'Reports land on our team dashboard, not an inbox nobody checks.',
  },
  {
    icon: ShieldCheck,
    title: 'No account needed',
    body: 'Name and email are optional. Tell us anonymously if you prefer.',
  },
  {
    icon: MessageSquare,
    title: 'Empty shelves count',
    body: 'Stock-outs are the single most useful thing you can report to us.',
  },
];

export const Feedback = () => {
  return (
    <>
      <Seo
        title={route.title}
        description={route.description}
        canonical={`${SEO_CONFIG.siteUrl}/feedback`}
        ogImage={route.ogImage}
        schema={route.schema}
        appendBrand={false}
      />
      <main className="pt-20 bg-gray-50 min-h-screen">
        <Section className="relative overflow-hidden pt-20 pb-12">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: 'url(/noodle-hero-bg.png)' }}
          />
          <div className="absolute inset-0 bg-black/75 z-0" />

          <div className="text-center max-w-3xl mx-auto relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/30 shadow-sm">
              Tell Us
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-white mb-6 drop-shadow-lg">
              Report a <span className="text-primary-400">Problem</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md">
              Can&rsquo;t find Super Q on the shelf? Something wrong with a pack? Tell us and it
              goes straight to our team.
            </p>
          </div>
        </Section>

        <Section className="pt-12 pb-8">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-4">
            {assurances.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <item.icon className="w-5 h-5 text-primary-600 mb-3" />
                <h2 className="font-bold text-gray-900 text-sm mb-1.5">{item.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section className="pt-4 pb-24">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10">
            <FeedbackForm />
          </div>

          <p className="max-w-3xl mx-auto text-center text-sm text-gray-500 mt-8">
            Looking for stockists instead?{' '}
            <Link to="/where-to-buy" className="text-primary-600 font-semibold hover:underline">
              See where to buy Super Q
            </Link>
            .
          </p>
        </Section>
      </main>
    </>
  );
};
