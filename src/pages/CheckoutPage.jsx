import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getCourseById, isCoursePaymentReady } from '../data/courses';

const PAYMENT_UNAVAILABLE_MESSAGE =
  'Online payment is not available for this course yet. Please submit a registration request and our team will contact you.';

export function CheckoutPage() {
  const { courseId } = useParams();
  const course = getCourseById(courseId);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const registrationPath = `/register?course=${course.courseId}`;
  const paymentReady = isCoursePaymentReady(course);

  return (
    <>
      <Seo
        title={`Checkout - ${course.title}`}
        description="Payment readiness page for Safe Zone Security Academy course registration."
      />
      <main className="mx-auto max-w-4xl px-4 py-10 md:px-8">
        <Link
          to={`/courses/${course.courseId}`}
          className="mb-6 inline-flex items-center gap-2 rounded text-sm font-semibold text-academyBlue hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academyBlue"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to course
        </Link>

        <Card as="section" className="overflow-hidden">
          <div className="bg-academyNavy p-7 text-white">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">Course checkout</p>
            <h1 className="mt-2 text-3xl font-extrabold">{course.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              Payment collection is disabled until final course details, Stripe test mode, and business approval are complete.
            </p>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[1fr_280px]">
            <section>
              {!paymentReady ? (
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
                  <ShieldCheck className="h-6 w-6 text-academyBlue" aria-hidden="true" />
                  <h2 className="mt-3 text-xl font-bold text-slate-950">Registration request required</h2>
                  <p className="mt-3 leading-7 text-slate-700">{PAYMENT_UNAVAILABLE_MESSAGE}</p>
                  <Button to={registrationPath} className="mt-5">
                    Submit Registration Request
                  </Button>
                </div>
              ) : (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <CreditCard className="h-6 w-6 text-academyBlue" aria-hidden="true" />
                  <h2 className="mt-3 text-xl font-bold text-slate-950">Checkout session prepared</h2>
                  <p className="mt-3 leading-7 text-slate-700">
                    This course has the data needed for a future Stripe Checkout Session. The payment action remains disabled until
                    the Stripe server route and webhook handling are activated in test mode first.
                  </p>
                  <button
                    type="button"
                    className="mt-5 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-slate-300 px-5 py-3 text-sm font-semibold text-slate-600"
                    disabled
                  >
                    Stripe Checkout Not Active
                  </button>
                </div>
              )}
            </section>

            <aside className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-bold text-slate-950">Course Summary</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-slate-500">Price</dt>
                  <dd className="mt-1 font-bold text-slate-950">{course.displayPrice}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Schedule</dt>
                  <dd className="mt-1 font-bold text-slate-950">{course.schedule}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Cohort</dt>
                  <dd className="mt-1 font-bold text-slate-950">{course.cohort}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Format</dt>
                  <dd className="mt-1 font-bold text-slate-950">{course.format}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </Card>
      </main>
    </>
  );
}
