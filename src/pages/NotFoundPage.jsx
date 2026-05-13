import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Seo } from '../components/Seo';

export function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <Seo
        title="Page Not Found"
        description="The requested Safe Zone Security Academy page could not be found."
      />
      <Card className="p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">404</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-950">Page not found</h1>
        <p className="mt-4 leading-7 text-slate-600">
          The page you are looking for may have moved, or the link may no longer be available.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="primary">
            Go Home
          </Button>
          <Button to="/courses" variant="outline">
            View Courses
          </Button>
        </div>
      </Card>
    </main>
  );
}
