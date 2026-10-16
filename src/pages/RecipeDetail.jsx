import { useParams, Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Section } from '@/components/common/Section';
import { recipes, getRecipe } from '@/data/recipes';
import { SEO_CONFIG } from '@/utils/constants';
import { organizationNode, orgRef } from '@/utils/schema';
import { NotFound } from '@/pages/NotFound';
import { ChevronRight, Clock, Users, ArrowRight, ArrowDown, Heart, Store } from 'lucide-react';

const isoMinutes = (minutes) => `PT${minutes}M`;

export const RecipeDetail = () => {
  const { slug } = useParams();
  const recipe = getRecipe(slug);

  if (!recipe) {
    return <NotFound />;
  }

  const canonicalUrl = `${SEO_CONFIG.siteUrl}/recipes/${recipe.slug}`;
  const imageUrl = encodeURI(`${SEO_CONFIG.siteUrl}${recipe.image}`);
  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  const allIngredients = recipe.ingredientGroups.flatMap((group) => group.items);

  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    image: [imageUrl],
    author: orgRef,
    publisher: orgRef,
    datePublished: recipe.published,
    recipeCategory: recipe.category,
    recipeCuisine: recipe.cuisine,
    recipeYield: recipe.servings,
    prepTime: isoMinutes(recipe.prepMinutes),
    cookTime: isoMinutes(recipe.cookMinutes),
    totalTime: isoMinutes(totalMinutes),
    keywords: `${recipe.name}, ${recipe.product.name}, Filipino recipe, pancit`,
    recipeIngredient: allIngredients,
    recipeInstructions: recipe.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${canonicalUrl}#step-${index + 1}`,
    })),
    mainEntityOfPage: canonicalUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SEO_CONFIG.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Recipes', item: `${SEO_CONFIG.siteUrl}/recipes` },
      { '@type': 'ListItem', position: 3, name: recipe.name, item: canonicalUrl },
    ],
  };

  const otherRecipes = recipes.filter((r) => r.slug !== recipe.slug);
  const introParagraphs = recipe.intro.split('\n\n');

  return (
    <>
      <Seo
        title={recipe.seoTitle || `${recipe.name} Recipe`}
        description={recipe.description}
        canonical={canonicalUrl}
        ogImage={imageUrl}
        type="article"
        schema={[organizationNode, recipeSchema, breadcrumbSchema]}
      />

      <main className="pt-20 bg-white">
        <Section className="pb-0 pt-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/recipes" className="hover:text-primary-600 transition-colors">Recipes</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{recipe.name}</span>
          </nav>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl">
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3 block">
              {recipe.cuisine} {recipe.category === 'Soup' ? 'soup' : 'recipe'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-6 leading-tight">
              {recipe.headline}
            </h1>
            {recipe.tagline && (
              <p className="text-2xl text-primary-700 leading-snug mb-4 font-heading font-semibold">
                {recipe.tagline}
              </p>
            )}
            <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
              {recipe.description}
            </p>
            <a
              href="#recipe"
              className="inline-flex items-center gap-2 mb-8 bg-primary-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors"
            >
              <ArrowDown className="w-4 h-4" />
              Jump to recipe
            </a>

            <dl className="flex flex-wrap gap-x-8 gap-y-4 text-sm border-y border-gray-100 py-5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-600" />
                <dt className="text-gray-500">Prep</dt>
                <dd className="font-bold text-gray-900">{recipe.prepMinutes} min</dd>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-600" />
                <dt className="text-gray-500">Cook</dt>
                <dd className="font-bold text-gray-900">{recipe.cookMinutes} min</dd>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-600" />
                <dt className="text-gray-500">Total</dt>
                <dd className="font-bold text-gray-900">{totalMinutes} min</dd>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-600" />
                <dt className="text-gray-500">Serves</dt>
                <dd className="font-bold text-gray-900">{recipe.servings}</dd>
              </div>
            </dl>
          </div>
        </Section>

        <Section className="pt-0">
          <figure className="max-w-xl">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
              <img
                src={recipe.image}
                alt={recipe.imageAlt}
                className="w-full h-auto object-contain"
              />
            </div>
          </figure>
        </Section>

        <Section className="pt-0">
          <div className="max-w-3xl space-y-5 text-lg text-gray-600 leading-relaxed">
            {introParagraphs.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
        </Section>

        <Section className="pt-0">
          <div id="recipe" className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 lg:gap-16 max-w-6xl scroll-mt-28">
            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Ingredients</h2>
              <div className="space-y-6">
                {recipe.ingredientGroups.map((group) => (
                  <div key={group.title || 'main'}>
                    {group.title && (
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{group.title}</h3>
                    )}
                    <ul className="space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-gray-700 leading-relaxed">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Instructions</h2>
              <ol className="space-y-6 list-none">
                {recipe.steps.map((step, index) => (
                  <li key={step.name} id={`step-${index + 1}`} className="flex gap-4 scroll-mt-28">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{step.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        {recipe.tips && recipe.tips.length > 0 && (
          <Section className="pt-0">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Tips</h2>
              <div className="space-y-4">
                {recipe.tips.map((tip) => (
                  <p
                    key={tip.slice(0, 40)}
                    className="border-l-4 border-primary-500 bg-gray-50 rounded-r-2xl p-5 text-gray-700 leading-relaxed"
                  >
                    {tip}
                  </p>
                ))}
              </div>
            </div>
          </Section>
        )}

        {(recipe.forLove || recipe.forBusiness) && (
          <Section className="pt-0">
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl">
              {recipe.forLove && (
                <div className="rounded-3xl border border-rose-100 bg-rose-50/60 p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-600 shadow-sm">
                      <Heart className="w-5 h-5" />
                    </span>
                    <h2 className="text-2xl font-bold font-heading text-gray-900">{recipe.forLove.title}</h2>
                  </div>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    {recipe.forLove.body.map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </div>
                </div>
              )}
              {recipe.forBusiness && (
                <div className="rounded-3xl border border-amber-100 bg-amber-50/60 p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-700 shadow-sm">
                      <Store className="w-5 h-5" />
                    </span>
                    <h2 className="text-2xl font-bold font-heading text-gray-900">{recipe.forBusiness.title}</h2>
                  </div>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    {recipe.forBusiness.body.map((para) => (
                      <p key={para.slice(0, 40)}>{para}</p>
                    ))}
                  </div>
                  {recipe.forBusiness.points && (
                    <ul className="mt-4 space-y-2">
                      {recipe.forBusiness.points.map((point) => (
                        <li key={point.slice(0, 40)} className="flex gap-3 text-gray-700 leading-relaxed">
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-5 text-sm text-gray-600">
                    Buying noodles in bulk for your business?{' '}
                    <Link to="/wholesale" className="text-primary-600 font-semibold hover:underline">
                      See wholesale and distributor orders
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>
          </Section>
        )}

        <Section className="pt-0">
          <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-3xl p-8 md:p-10 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-3">
              Made with {recipe.product.name}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-2xl">
              Pack sizes, barcodes and wholesale availability are on the product page.
              Not sure which noodle you need?{' '}
              <Link to="/bihon-guide" className="text-primary-600 font-semibold hover:underline">
                Read our bihon guide
              </Link>
              .
            </p>
            <Link
              to={`/products/${recipe.product.slug}`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary/20"
            >
              View {recipe.product.name}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </Section>

        <Section className="pt-0 pb-24">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-6">More recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
            {otherRecipes.map((r) => (
              <Link
                key={r.slug}
                to={`/recipes/${r.slug}`}
                className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 mb-3">
                  <img
                    src={r.image}
                    alt={r.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {r.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {r.prepMinutes + r.cookMinutes} min · {r.servings}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
};
