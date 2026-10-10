import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HeadCollectorContext } from '@/components/common/headCollector';
import App from './App.jsx';

/**
 * Server entry used only at build time by scripts/prerender.mjs.
 * Renders one route to an HTML string and returns the head data that the
 * page's <Seo> component reported.
 */
export function render(path) {
  const collector = {
    path,
    head: null,
    report(head) {
      this.head = head;
    },
  };
  const html = renderToString(
    <StrictMode>
      <HeadCollectorContext.Provider value={collector}>
        <StaticRouter location={path}>
          <App />
        </StaticRouter>
      </HeadCollectorContext.Provider>
    </StrictMode>,
  );
  return { html, head: collector.head };
}

export { products } from '@/data/products';
