import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { businessInfo } from '../data/business';

const content = {
  privacy: {
    title: 'Privacy Policy',
    description:
      'How Safe Zone Security Academy handles contact, registration interest, and item request information submitted through this website.',
    intro:
      'This preview-ready policy explains the current website behavior. It must be reviewed and approved before public launch or payment activation.',
    sections: [
      {
        title: 'Information We Collect',
        text: 'Website forms may collect your name, email address, phone number, course interest, product or material request, quantity, fulfillment preference, subject, message, consent confirmation, basic submission metadata, and anti-spam fields.',
      },
      {
        title: 'Why We Collect It',
        text: 'Safe Zone Security Academy uses submitted information to respond to inquiries, follow up on registration interest, confirm shop item requests, review availability, and support admissions or administrative communication.',
      },
      {
        title: 'Storage And Access',
        text: 'Submissions may be stored in MongoDB-backed website collections and displayed in protected admin tools used by academy staff. Admin email notifications may also be sent when email delivery is configured.',
      },
      {
        title: 'Payments',
        text: 'This website does not currently process online payments. Course enrollment, shop pricing, taxes, pickup or shipping, and any payment instructions must be confirmed directly by staff.',
      },
      {
        title: 'Review Status',
        text: 'This policy is not a substitute for legal advice. A final privacy review, including Quebec Law 25 requirements, retention practices, and contact information for privacy questions, is still required before public launch.',
      },
      {
        title: 'Contact',
        text: 'For privacy questions or website policy requests, email Safe Zone Security Academy at',
        showEmail: true,
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    description:
      'Current terms for using the Safe Zone Security Academy website during the preview and request-only launch phase.',
    intro:
      'These terms describe the current preview/request-only website. They must be finalized before public launch, online payments, or confirmed enrollment workflows.',
    sections: [
      {
        title: 'Website Information',
        text: 'Course, shop, schedule, format, availability, and pricing information on this website is provided for general communication and may change before enrollment or purchase is confirmed.',
      },
      {
        title: 'Registration Interest',
        text: 'Submitting a course registration interest form does not complete enrollment, reserve a seat, or create a payment obligation. Admissions must confirm schedule, format, pricing, requirements, and next steps directly.',
      },
      {
        title: 'Shop Requests',
        text: 'Submitting an item request is not a purchase. Staff must confirm final product details, price, taxes, availability, quantity, pickup or shipping, and payment instructions before any sale is finalized.',
      },
      {
        title: 'Payments',
        text: 'Online payment processing is not active. Do not enter card details anywhere on this website. Future payment terms, refund rules, cancellation rules, and receipts must be approved before Stripe or another payment provider is enabled.',
      },
      {
        title: 'Required Final Review',
        text: 'These terms are placeholder-ready operational text for preview use. Final legal, privacy, refund, cancellation, French-language, tax, and licensing wording must be reviewed by the business owner and appropriate advisors before public launch.',
      },
      {
        title: 'Contact',
        text: 'For questions about these website terms, email Safe Zone Security Academy at',
        showEmail: true,
      },
    ],
  },
};

export function StaticInfoPage({ type }) {
  const page = content[type] || content.privacy;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <Seo title={page.title} description={page.description} />
      <Card as="section" className="p-6">
        <h1 className="text-4xl font-extrabold text-slate-950">{page.title}</h1>
        <p className="mt-4 leading-7 text-slate-600">{page.intro}</p>
        <div className="mt-6 space-y-6">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-slate-950">{section.title}</h2>
              <p className="mt-2 leading-7 text-slate-600">
                {section.text}
                {section.showEmail && (
                  <>
                    {' '}
                    <a
                      className="font-semibold text-academyBlue hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue"
                      href={`mailto:${businessInfo.email}`}
                    >
                      {businessInfo.email}
                    </a>
                    .
                  </>
                )}
              </p>
            </section>
          ))}
        </div>
        <Button className="mt-6" to="/contact">
          Contact Us
        </Button>
      </Card>
    </main>
  );
}
