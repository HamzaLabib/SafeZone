import { BadgeCheck, PackageSearch, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

export function ProductCard({ product }) {
  const imageSrc = product.images?.[0] || '/logo-shield.svg';

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <Link
        to={`/shop/${product.productId}`}
        className="group block bg-slate-50 focus:outline-none focus:ring-2 focus:ring-academyBlue focus:ring-offset-2"
      >
        <img
          src={imageSrc}
          className="h-44 w-full object-contain p-8 transition group-hover:scale-105"
          alt={product.imageAlt || `${product.title} product image`}
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-academyBlue">{product.category}</p>
        <h3 className="text-lg font-bold text-slate-950">
          <Link to={`/shop/${product.productId}`} className="hover:text-academyBlue">
            {product.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{product.description}</p>
        <dl className="mt-4 grid gap-2 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="inline-flex items-center gap-1 font-semibold text-slate-500">
              <ShoppingBag className="h-4 w-4 text-academyBlue" aria-hidden="true" />
              Price
            </dt>
            <dd className="text-right font-bold text-slate-950">{product.displayPrice}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="inline-flex items-center gap-1 font-semibold text-slate-500">
              <BadgeCheck className="h-4 w-4 text-academyBlue" aria-hidden="true" />
              Availability
            </dt>
            <dd className="text-right font-bold text-slate-950">{product.inventoryStatus}</dd>
          </div>
        </dl>
        <div className="mt-5 grid gap-2">
          <Button to={`/order-request?product=${product.productId}`}>
            <PackageSearch className="h-4 w-4" aria-hidden="true" />
            Request Item
          </Button>
          <Button to={`/shop/${product.productId}`} variant="outline">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
