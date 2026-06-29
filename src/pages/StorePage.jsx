import { useMemo, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { PageHero } from '../components/ui/PageHero';
import { getActiveProducts, getProductCategories } from '../data/products';

const STORE_NOTICE =
  'Submitting a request is not a purchase. Final price, taxes, availability, and pickup or shipping will be confirmed by the academy.';

export function StorePage() {
  const products = getActiveProducts();
  const categories = getProductCategories();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const visibleProducts = useMemo(
    () => (selectedCategory === 'All' ? products : products.filter((product) => product.category === selectedCategory)),
    [products, selectedCategory],
  );

  return (
    <>
      <Seo
        title="Store"
        description="Browse Safe Zone Security Academy books, course materials, equipment, uniform accessories, bundles, and request-to-order items."
      />
      <PageHero
        eyebrow="Store"
        title="Store Training Materials"
        description="Browse books, course materials, equipment, accessories, and bundles. Submit a request and the academy will confirm final details before any purchase is made."
        primaryAction={{ label: 'Request an Item', to: '/order-request' }}
        secondaryAction={{ label: 'Ask a Question', to: '/contact' }}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <section className="mb-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-semibold text-blue-900">{STORE_NOTICE}</p>
        </section>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">Catalog</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Request books, materials, and equipment</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Filter by product type, review request details, and submit a request so staff can confirm availability and
              fulfillment.
            </p>
          </div>
          <Button to="/order-request">Request an Item</Button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" aria-label="Product category filters">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                className={[
                  'rounded-lg border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue',
                  isActive
                    ? 'border-academyBlue bg-academyBlue text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-academyBlue hover:text-academyBlue',
                ].join(' ')}
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}
