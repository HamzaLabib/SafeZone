import { Link } from 'react-router-dom';

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
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-4xl font-extrabold text-slate-950">{page.title}</h1>
        <p className="mt-4 leading-7 text-slate-600">{page.text}</p>
        <Link className="mt-6 inline-flex rounded-lg bg-academyBlue px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700" to="/contact">
          Contact Us
        </Link>
      </section>
    </main>
  );
}
