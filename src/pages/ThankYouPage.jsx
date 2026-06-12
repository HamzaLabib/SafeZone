import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function ThankYouPage() {
  return (
    <>
      <Seo
        title="Request Received"
        description="Safe Zone Security Academy has received your contact, registration interest, or item request."
        noindex
      />
      <main className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        <Card className="overflow-hidden">
          <section className="bg-academyNavy p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">Request received</p>
            <h1 className="mt-3 text-4xl font-extrabold">Thank you. We received your submission.</h1>
            <p className="mt-4 leading-7 text-white/75">
              Our team will review your message, registration interest, or item request and contact you with the next step.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/" size="lg">
                Home
              </Button>
              <Button to="/courses" variant="outlineDark" size="lg">
                Courses
              </Button>
              <Button to="/shop" variant="outlineDark" size="lg">
                Shop
              </Button>
            </div>
          </section>
        </Card>
      </main>
    </>
  );
}
