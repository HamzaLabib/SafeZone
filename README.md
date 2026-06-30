# Safe Zone Security Academy Website

React + Tailwind + React Router frontend prepared for Vercel deployment.

This is currently a brochure, lead-generation, and request-to-order website with MongoDB-backed registration, contact, and store submissions, Resend admin notifications, and a simple password-protected admin dashboard. There is no student portal backend, live payment processing, cart, or student authentication connected yet.

Payment readiness notes are documented in [docs/payment-readiness.md](docs/payment-readiness.md). The site is prepared for a future Stripe Checkout Sessions integration, but live payments remain disabled.

## Local development
1. `npm install`
2. `npm run dev`
3. Open the local URL shown by Vite.

Plain Vite dev serves the frontend only. For local API testing, use Vercel's local runtime (`vercel dev`) after configuring local environment variables.

## Vercel preview setup
Before creating or testing a Vercel preview deployment, configure these environment variables in the Vercel project settings for the Preview environment. Do not commit real values to GitHub.

- `MONGODB_URI`: MongoDB Atlas connection string.
- `MONGODB_DB`: database name, defaults to `safeZoneSecurityAcademy`.
- `ADMIN_PASSWORD`: temporary preview admin password for `/admin/login`; replace before staff handoff.
- `RESEND_API_KEY`: Resend API key for admin notification email delivery.
- `ADMIN_NOTIFICATION_EMAIL`: recipient inbox for contact, registration interest, and item request alerts.
- `EMAIL_FROM`: verified sender address used by Resend.
- `STRIPE_SECRET_KEY`: future Stripe secret key; leave blank until approved test-mode payment activation.
- `STRIPE_WEBHOOK_SECRET`: future Stripe webhook secret; leave blank until webhook activation.
- `APP_BASE_URL`: future absolute app URL for Stripe redirects; leave blank until payment activation needs it.
- `VITE_STRIPE_PUBLISHABLE_KEY`: future publishable key only; leave blank until frontend Stripe usage is approved.

Recommended preview flow:

1. Install Vercel CLI if needed: `npm install -g vercel`.
2. Link the project: `vercel link`.
3. Pull preview/development variables into an ignored local file: `vercel env pull .env.local`.
4. Run `vercel dev` to test both the React frontend and `/api/*` routes locally.
5. Use `npm run dev` only when you are testing frontend routes without serverless API execution.
6. Use `npm run build` before pushing or promoting a preview.

Additional preview QA is tracked in [docs/preview-testing-checklist.md](docs/preview-testing-checklist.md).

## Production build
- `npm run build`
- Output directory: `dist`

## Backend environment
Copy `.env.example` to `.env` for local backend testing, and add the same variables in Vercel:

- `MONGODB_URI`: MongoDB Atlas connection string.
- `MONGODB_DB`: database name, defaults to `safeZoneSecurityAcademy`.
- `ADMIN_NOTIFICATION_EMAIL`: admissions/admin inbox for new submissions.
- `EMAIL_FROM`: verified sender address for email notifications.
- `RESEND_API_KEY`: Resend API key for email delivery.
- `ADMIN_PASSWORD`: temporary password for `/admin/login`.
- `STRIPE_SECRET_KEY`: future Stripe secret key; leave blank until test-mode payment activation.
- `STRIPE_WEBHOOK_SECRET`: future webhook signing secret; leave blank until webhook activation.
- `APP_BASE_URL`: future absolute app URL for Stripe success/cancel redirects.
- `VITE_STRIPE_PUBLISHABLE_KEY`: future publishable key if the frontend needs Stripe.js.

## API routes
- `POST /api/register-interest`
- `POST /api/order-request`
- `POST /api/contact`
- `GET /api/admin/login`
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/dashboard-data`
- `POST /api/admin/update-lead-status`
- `POST /api/admin/update-order-status`

## Routes
- `/`
- `/about`
- `/courses`
- `/courses/:courseId`
- `/programs/security-program`
- `/checkout/:courseId`
- `/store`
- `/store/:productId`
- `/shop` and `/shop/:productId` redirect to the corresponding store routes
- `/order-request`
- `/register`
- `/contact`
- `/faq`
- `/thank-you` (utility page, noindex)
- `/privacy`
- `/terms`
- `/admin/login`
- `/admin/dashboard`
- `*` renders a 404 page

## Vercel SPA fallback
`vercel.json` includes a rewrite of all routes to `index.html` for direct-link support.

## Launch notes
- Configure MongoDB and Resend environment variables before live launch.
- Replace any unconfirmed business contact details before showing users.
- Replace the temporary admin password approach with proper role-based authentication before handing access to staff.
- Add real authentication before enabling student dashboard features.
- Add real schedules, pricing, and Stripe Checkout integration only when confirmed by the business.
- Keep store requests as request-to-order only until product prices, taxes, availability, pickup/shipping, and refund policy are confirmed.
- Use Stripe test mode and webhook signature verification before considering live mode.
- Collect remaining owner launch content in [docs/owner-launch-content-checklist.md](docs/owner-launch-content-checklist.md).
- Treat the current admin dashboard as preview-only; see [docs/admin-operations-readiness.md](docs/admin-operations-readiness.md).
- Asset cleanup notes are tracked in [docs/asset-readiness.md](docs/asset-readiness.md).

## Deploy to Vercel
1. Push project to GitHub.
2. Open Vercel and click **Add New Project**.
3. Import the GitHub repository.
4. Set framework preset to **Vite** (or React if shown).
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**.
