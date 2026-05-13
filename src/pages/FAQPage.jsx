import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Seo } from '../components/Seo';
import { faqs } from '../data/faqs';

export function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState(faqs[0].question);
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <Seo
        title="FAQ"
        description="Frequently asked questions about Safe Zone Security Academy courses, registration, training format, and student expectations."
        jsonLd={faqJsonLd}
      />
      <p className="text-sm font-semibold uppercase tracking-wide text-academyBlue">FAQ</p>
      <h1 className="mt-2 text-4xl font-extrabold text-slate-950">Frequently Asked Questions</h1>
      <div className="mt-8 space-y-3">
        {faqs.map((item, index) => {
          const isOpen = openQuestion === item.question;
          const buttonId = `faq-button-${index}`;
          const panelId = `faq-panel-${index}`;
          return (
            <article key={item.question} className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <button
                id={buttonId}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-semibold text-slate-950 hover:text-academyBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenQuestion(isOpen ? '' : item.question)}
              >
                {item.question}
                <ChevronDown className={`h-5 w-5 shrink-0 transition ${isOpen ? 'rotate-180 text-academyBlue' : ''}`} aria-hidden="true" />
              </button>
              {isOpen && (
                <p id={panelId} role="region" aria-labelledby={buttonId} className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-6 text-slate-600">
                  {item.answer}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
