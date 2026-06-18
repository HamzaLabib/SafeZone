import { ArrowLeft, CheckCircle2, PackageCheck } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { businessInfo } from '../data/business';
import { getProductById } from '../data/products';

const REQUEST_NOTICE =
  'Submitting a request is not a purchase. Final price, taxes, availability, and pickup or shipping will be confirmed by the academy.';

export function ProductDetailsPage() {
  const { productId } = useParams();
  const product = getProductById(productId);

  if (!product || !product.active) {
    return <Navigate to="/shop" replace />;
  }

  const imageSrc = product.images?.[0] || '/logo-shield.svg';

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <Seo title={product.title} description={product.description} />
      <Link
        to="/shop"
        className="mb-6 inline-flex items-center gap-2 rounded text-sm font-semibold text-academyBlue hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to shop
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <Card className="overflow-hidden">
            <div className="bg-slate-50 p-8">
              <img
                src={imageSrc}
                alt={product.imageAlt || `${product.title} product image`}
                className="mx-auto h-72 w-full max-w-md object-contain"
              />
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">{product.category}</p>
              <h1 className="mt-2 text-4xl font-extrabold text-slate-950">{product.title}</h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">{product.description}</p>
              <p className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-semibold leading-6 text-blue-900">
                {REQUEST_NOTICE}
              </p>
            </div>
          </Card>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card as="section" className="p-6">
              <h2 className="text-xl font-bold text-slate-950">Request Details</h2>
              <ul className="mt-4 space-y-3">
                {[
                  'Staff will confirm final price and taxes before any purchase is made.',
                  'Availability and quantities are confirmed manually by the academy.',
                  'Pickup or shipping options are confirmed after the request is reviewed.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-academyBlue" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card as="section" className="p-6">
              <h2 className="text-xl font-bold text-slate-950">Fulfillment</h2>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                This item is {product.pickupEligible ? 'eligible for pickup review' : 'not currently marked for pickup'} and{' '}
                {product.shippingRequired
                  ? 'may require shipping details before confirmation.'
                  : 'may be handled through academy pickup or direct coordination.'}
              </p>
            </Card>
          </div>
        </div>

        <Card as="aside" className="h-fit p-6 lg:sticky lg:top-6">
          <PackageCheck className="h-7 w-7 text-academyBlue" aria-hidden="true" />
          <h2 className="mt-3 text-xl font-bold text-slate-950">Product Summary</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
              <dt className="font-semibold text-slate-500">SKU</dt>
              <dd className="text-right font-bold text-slate-950">{product.sku}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
              <dt className="font-semibold text-slate-500">Price</dt>
              <dd className="text-right font-bold text-slate-950">{product.displayPrice}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
              <dt className="font-semibold text-slate-500">Availability</dt>
              <dd className="text-right font-bold text-slate-950">{product.inventoryStatus}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-slate-500">Payment</dt>
              <dd className="text-right font-bold text-slate-950">Not active</dd>
            </div>
          </dl>
          <Button to={`/order-request?product=${product.productId}`} className="mt-6 w-full">
            Request Item
          </Button>
          <Button to="/contact" variant="outline" className="mt-3 w-full">
            Ask a Question
          </Button>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Product questions? Email{' '}
            <a
              className="font-semibold text-academyBlue hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue"
              href={`mailto:${businessInfo.email}`}
            >
              {businessInfo.email}
            </a>
            .
          </p>
        </Card>
      </section>
    </main>
  );
}
