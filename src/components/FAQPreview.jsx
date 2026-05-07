import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faqs } from '../data/faqs';

export function FAQPreview() {
  const previewFaqs = faqs.slice(0, 4);
  const [openQuestion, setOpenQuestion] = useState(previewFaqs[0]?.question || '');

  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-3xl font-extrabold">FAQ Preview</h2>
        <Link className="cursor-pointer text-sm font-semibold text-academyBlue hover:text-blue-700" to="/faq">
          View All FAQs
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {previewFaqs.map((item) => {
          const isOpen = openQuestion === item.question;
          return (
            <article key={item.question} className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <button
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left font-semibold hover:text-academyBlue"
                type="button"
                onClick={() => setOpenQuestion(isOpen ? '' : item.question)}
              >
                {item.question}
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${isOpen ? 'rotate-180 text-academyBlue' : ''}`} />
              </button>
              {isOpen && <p className="border-t border-slate-100 px-4 pb-4 pt-3 text-sm leading-6 text-slate-600">{item.answer}</p>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
