# Safe Zone Security Academy Website

React + Tailwind + React Router frontend prepared for Vercel deployment.

This is currently a brochure, lead-generation, and request-to-order website with MongoDB-backed registration/contact/shop submissions, Resend admin notifications, and a simple password-protected admin dashboard. There is no student portal backend, live payment processing, cart, or student authentication connected yet.

Payment readiness notes are documented in [docs/payment-readiness.md](docs/payment-readiness.md). The site is prepared for a future Stripe Checkout Sessions integration, but live payments remain disabled.

## Local development
1. `npm install`
2. `npm run dev`
3. Open the local URL shown by Vite.

For local API testing, use Vercel's local runtime (`vercel dev`) after configuring `.env`. Plain Vite dev serves the frontend only.

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
- `/checkout/:courseId`
- `/shop`
- `/shop/:productId`
- `/order-request`
- `/register`
- `/login`
- `/dashboard`
- `/contact`
- `/faq`
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
- Keep shop requests as request-to-order only until product prices, taxes, availability, pickup/shipping, and refund policy are confirmed.
- Use Stripe test mode and webhook signature verification before considering live mode.

## Deploy to Vercel
1. Push project to GitHub.
2. Open Vercel and click **Add New Project**.
3. Import the GitHub repository.
4. Set framework preset to **Vite** (or React if shown).
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**.
