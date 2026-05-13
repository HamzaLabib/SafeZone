# Safe Zone Security Academy Website

React + Tailwind + React Router frontend prepared for Vercel deployment.

This is currently a brochure and lead-generation website with a minimal backend for registration/contact submissions. There is no authentication, student portal backend, payment processing, or admin dashboard connected yet.

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

## API routes
- `POST /api/register-interest`
- `POST /api/contact`

## Routes
- `/`
- `/about`
- `/courses`
- `/courses/:courseId`
- `/register`
- `/login`
- `/dashboard`
- `/contact`
- `/faq`
- `/privacy`
- `/terms`
- `*` renders a 404 page

## Vercel SPA fallback
`vercel.json` includes a rewrite of all routes to `index.html` for direct-link support.

## Launch notes
- Configure MongoDB and Resend environment variables before live launch.
- Replace any unconfirmed business contact details before showing users.
- Add real authentication before enabling student dashboard features.
- Add real schedules, pricing, and payment integration only when confirmed by the business.

## Deploy to Vercel
1. Push project to GitHub.
2. Open Vercel and click **Add New Project**.
3. Import the GitHub repository.
4. Set framework preset to **Vite** (or React if shown).
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**.
