import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const content = {
  privacy: {
    title: 'Privacy Policy',
    text: 'Safe Zone Security Academy uses submitted contact information to respond to inquiries, process registration interest, and support student communication.',
  },
  terms: {
    title: 'Terms of Use',
    text: 'Website information is provided for general course and academy communication. Enrollment, pricing, and schedules are confirmed directly by Safe Zone Security Academy.',
  },
};

export function StaticInfoPage({ type }) {
  const page = content[type] || content.privacy;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <Seo title={page.title} description={page.text} />
      <Card as="section" className="p-6">
        <h1 className="text-4xl font-extrabold text-slate-950">{page.title}</h1>
        <p className="mt-4 leading-7 text-slate-600">{page.text}</p>
        <Button className="mt-6" to="/contact">
          Contact Us
        </Button>
      </Card>
    </main>
  );
}
