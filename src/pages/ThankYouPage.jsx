import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function ThankYouPage() {
  return (
    <>
      <Seo
        title="Thank You"
        description="Thank you for contacting Safe Zone Security Academy."
      />
      <main className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        <Card className="overflow-hidden">
          <section className="bg-academyNavy p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">Message received</p>
            <h1 className="mt-3 text-4xl font-extrabold">Thank you for contacting Safe Zone Security Academy.</h1>
            <p className="mt-4 leading-7 text-white/75">Our team will review your message and contact you soon.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/" size="lg">
                Home
              </Button>
              <Button to="/courses" variant="outlineDark" size="lg">
                Courses
              </Button>
            </div>
          </section>
        </Card>
      </main>
    </>
  );
}
