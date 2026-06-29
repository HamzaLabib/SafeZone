# Payment Readiness Foundation

Status: payment-ready foundation only. Live Stripe payments are not active.

## Current Behavior

- Course catalog records include future payment fields: `courseId`, `amountCents`, `currency`, `displayPrice`, `stripePriceId`, `schedule`, `cohort`, `duration`, `location`, `format`, `active`, and `paymentEnabled`.
- All current courses keep `amountCents: null`, `displayPrice: "Contact us for pricing"`, blank `stripePriceId`, and `paymentEnabled: false`.
- `/checkout/:courseId` exists as a disabled payment-readiness route.
- If a course has no confirmed price, no confirmed schedule, no Stripe price id, or `paymentEnabled` is false, the route blocks payment and sends the visitor back to registration interest.
- `/store` and `/order-request` are request-to-order only. Product records include future payment fields, but all Phase 1 store items keep `paymentEnabled: false` and do not expose cart or checkout actions.
- Stripe Checkout Sessions should be the future payment method. No card data should ever touch this server.

## Store Request Fields

`orderRequests` stores request-to-order metadata without creating a purchase:

- `name` and `fullName`
- `email`
- `phone`
- `productId`
- `productTitle`
- `sku`
- `quantity`
- `fulfillmentPreference`
- `status`: `New`, `Contacted`, `Quoted`, `Confirmed`, `Fulfilled`, or `Cancelled`
- `paymentStatus`: defaults to `unpaid`
- `linkedOrderId`: future internal order reference; currently `null`
- `createdAt`
- `notificationStatus`

Final price, taxes, availability, and pickup or shipping must be confirmed manually before treating a store request as a purchase.

## Registration Lead Fields

`registrationLeads` now stores payment-ready metadata without requiring payment:

- `paymentStatus`: `unpaid`, `pending`, `paid`, `failed`, or `refunded`; new leads default to `unpaid`.
- `linkedOrderId`: future internal payment/order reference; currently `null`.
- `selectedCourseId`: catalog course id.
- `selectedCourseTitle`: catalog course title.
- `amountCents`: amount from the server-side catalog only, or `null` when unconfirmed.
- `currency`: defaults to `CAD`.

## Future Collections

### `payments`

Recommended purpose: durable payment record for each completed or attempted transaction.

Suggested fields:

- `registrationLeadId`
- `email`
- `courseId`
- `courseTitle`
- `amountCents`
- `currency`
- `status`
- `stripeSessionId`
- `stripePaymentIntentId`
- `createdAt`
- `updatedAt`

Recommended indexes:

- `{ email: 1, createdAt: -1 }`
- `{ courseId: 1, createdAt: -1 }`
- `{ stripeSessionId: 1 }` unique sparse
- `{ stripePaymentIntentId: 1 }` unique sparse
- `{ createdAt: -1 }`

### `checkoutSessions`

Recommended purpose: local record created before redirecting to Stripe Checkout.

Suggested fields:

- `registrationLeadId`
- `email`
- `courseId`
- `amountCents`
- `currency`
- `stripeSessionId`
- `status`
- `expiresAt`
- `createdAt`
- `updatedAt`

Recommended indexes:

- `{ email: 1, createdAt: -1 }`
- `{ courseId: 1, createdAt: -1 }`
- `{ stripeSessionId: 1 }` unique
- `{ createdAt: -1 }`

### `enrollments` or `registrations`

Recommended purpose: confirmed student enrollment after payment or manual admin approval.

Suggested fields:

- `registrationLeadId`
- `paymentId`
- `email`
- `fullName`
- `courseId`
- `courseTitle`
- `cohort`
- `status`
- `createdAt`
- `updatedAt`

Recommended indexes:

- `{ email: 1, createdAt: -1 }`
- `{ courseId: 1, createdAt: -1 }`
- `{ createdAt: -1 }`

### `webhookEvents`

Recommended purpose: Stripe webhook idempotency and audit trail.

Suggested fields:

- `webhookEventId`
- `type`
- `stripeSessionId`
- `stripePaymentIntentId`
- `processedAt`
- `createdAt`
- `payloadSummary`

Recommended indexes:

- `{ webhookEventId: 1 }` unique
- `{ stripeSessionId: 1 }` sparse
- `{ stripePaymentIntentId: 1 }` sparse
- `{ createdAt: -1 }`

## Future Email Templates

These templates are documented only. They are not wired to send yet.

### Student Paid-Registration Confirmation

Subject: `Registration confirmed: {{courseTitle}}`

Body should include student name, course title, cohort/schedule, location or format, amount paid, receipt link from Stripe, refund/cancellation policy link, and admissions contact details.

### Admin Paid-Registration Notification

Subject: `Paid registration: {{courseTitle}} - {{studentName}}`

Body should include student contact details, course id/title, cohort, amount paid, Stripe session id, Stripe payment intent id, and a link to the admin dashboard.

### Failed Payment Notification

Subject: `Payment issue for {{courseTitle}}`

Body should explain that enrollment is not confirmed, provide a retry/contact path, and avoid exposing sensitive payment details.

### Refund Confirmation

Subject: `Refund confirmation: {{courseTitle}}`

Body should include course title, refunded amount, timing note, Stripe receipt/refund reference if available, and admissions contact details.

Current registration-interest admin notification remains active through `POST /api/register-interest`: the route inserts the lead in MongoDB, calls `sendAdminNotification`, and records notification delivery status.

## Admin Readiness

The dashboard has read-only surfaces for:

- unpaid registration
- pending payment
- paid
- failed
- refunded

Keep the current lead follow-up statuses separate from payment status. Do not treat `paid` as enrollment completion until an `enrollments` or `registrations` record is created.

## Security Requirements Before Live Payments

- Change `ADMIN_PASSWORD` from any temporary/default value before launch.
- Verify Stripe webhook signatures with `STRIPE_WEBHOOK_SECRET`.
- Make webhook handling idempotent by storing and checking `webhookEventId`.
- Never collect, transmit, log, or store card data on this server.
- Test the full flow in Stripe test mode before live mode.
- Use Stripe-hosted Checkout Sessions for payment collection.
- Replace in-memory rate limiting with stronger production-grade rate limiting for payment routes.
- Keep live Stripe keys out of client bundles; only `VITE_STRIPE_PUBLISHABLE_KEY` may be public.

## Business Blockers Before Activation

The client must provide:

- final course prices
- final schedules/cohorts
- course locations or online/in-person format
- refund/cancellation policy
- terms of sale
- tax handling for Quebec GST/QST if applicable
- official business legal name
- client-owned Stripe account
- payment recipient bank account
- official business email

## Later Stripe Activation Steps

1. Confirm the business blockers above in writing.
2. Create products/prices in the client-owned Stripe account in test mode.
3. Add test-mode `stripePriceId`, `amountCents`, confirmed schedule/cohort, and `paymentEnabled: true` only for approved courses.
4. Add a server route to create Stripe Checkout Sessions with server-side catalog validation.
5. Store a `checkoutSessions` record before redirecting to Stripe.
6. Add a Stripe webhook route that verifies signatures and records each `webhookEventId` before processing.
7. Update `registrationLeads.paymentStatus`, create `payments`, and create `enrollments` or `registrations` only after confirmed Stripe events.
8. Send paid, failed, and refund emails only after webhook-confirmed state changes.
9. Run end-to-end tests in Stripe test mode, including success, failed payment, expired session, duplicate webhook, and refund paths.
10. Rotate to live Stripe keys only after test sign-off and production security review.
