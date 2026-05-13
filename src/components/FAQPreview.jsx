import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '../data/faqs';
import { Button } from './ui/Button';
import { SectionHeader } from './ui/SectionHeader';

export function FAQPreview() {
  const previewFaqs = faqs.slice(0, 4);
  const [openQuestion, setOpenQuestion] = useState(previewFaqs[0]?.question || '');

  return (
    <section className="mt-8">
      <SectionHeader
        eyebrow="Questions"
        title="Frequently asked questions"
        description="Quick answers about course timing, registration expectations, and training format."
        action={
          <Button to="/faq" variant="ghost" size="sm">
            View All FAQs
          </Button>
        }
      />
      <div className="grid gap-3 md:grid-cols-2">
        {previewFaqs.map((item, index) => {
          const isOpen = openQuestion === item.question;
          const buttonId = `faq-preview-button-${index}`;
          const panelId = `faq-preview-panel-${index}`;
          return (
            <article key={item.question} className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <button
                id={buttonId}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left font-semibold hover:text-academyBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenQuestion(isOpen ? '' : item.question)}
              >
                {item.question}
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${isOpen ? 'rotate-180 text-academyBlue' : ''}`} aria-hidden="true" />
              </button>
              {isOpen && (
                <p id={panelId} role="region" aria-labelledby={buttonId} className="border-t border-slate-100 px-4 pb-4 pt-3 text-sm leading-6 text-slate-600">
                  {item.answer}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
