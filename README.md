# Safe Zone Security Academy Website

React + Tailwind + React Router frontend prepared for Vercel deployment.

This is currently a brochure and lead-generation website. There is no backend, authentication, email delivery, database, payment processing, or admin system connected yet.

## Local development
1. `npm install`
2. `npm run dev`
3. Open the local URL shown by Vite.

## Production build
- `npm run build`
- Output directory: `dist`

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
- Connect register/contact forms to email or a database before live launch.
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
