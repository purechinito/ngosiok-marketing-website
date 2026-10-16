import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { recipes } from '@/data/recipes';
import { SEO_CONFIG } from '@/utils/constants';
import { organizationNode, orgRef } from '@/utils/schema';
import { ChevronRight, Clock, Users } from 'lucide-react';

export const Recipes = () => {
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/recipes`;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Filipino noodle recipes',
    itemListElement: recipes.map((recipe, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SEO_CONFIG.siteUrl}/recipes/${recipe.slug}`,
    })),
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Filipino Noodle Recipes',
    url: canonicalUrl,
    publisher: orgRef,
    mainEntity: itemListSchema,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SEO_CONFIG.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Recipes', item: canonicalUrl },
    ],
  };

  return (
    <>
      <Seo
        title="Filipino Noodle Recipes: Pancit Bihon, Bam-i, Palabok"
        description="Step-by-step Filipino noodle recipes from the makers of Super Q: pancit bihon guisado, Cebuano bam-i, pancit palabok and chicken sotanghon soup."
        canonical={canonicalUrl}
        ogImage={SEO_CONFIG.defaultOgImage}
        schema={[organizationNode, collectionSchema, breadcrumbSchema]}
      />

      <main className="pt-20 bg-white">
        <Section className="pb-0 pt-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Recipes</span>
          </nav>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3 block">
              From our kitchen in Cebu
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6 leading-tight">
              Filipino Noodle Recipes
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              The pancit and noodle soups Filipino households cook most, written by the
              people who make the noodles. Every recipe names the exact Super Q noodle it
              uses and links to its pack sizes.
            </p>
          </div>
        </Section>

        <Section className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl">
            {recipes.map((recipe) => (
              <Link
                key={recipe.slug}
                to={`/recipes/${recipe.slug}`}
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                    {recipe.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{recipe.description}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {recipe.prepMinutes + recipe.cookMinutes} min
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      {recipe.servings}
                    </span>
                    <span className="text-primary-700 font-semibold">{recipe.product.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <Section className="pt-0 pb-24">
          <div className="max-w-3xl text-lg text-gray-600 leading-relaxed">
            <p>
              Choosing between bihon, sotanghon and pancit canton?{' '}
              <Link to="/bihon-guide" className="text-primary-600 font-semibold hover:underline">
                Our bihon guide
              </Link>{' '}
              compares them side by side. Buying for a restaurant, store or export?{' '}
              <Link to="/wholesale" className="text-primary-600 font-semibold hover:underline">
                See wholesale and private label
              </Link>
              .
            </p>
          </div>
        </Section>
      </main>
    </>
  );
};
