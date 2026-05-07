# Safe Zone Security Academy Homepage

React + Tailwind + React Router multi-page frontend prepared for Vercel deployment.

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
- `/courses/security-guard-training`
- `/register`
- `/login`
- `/dashboard`
- `/contact`

## Vercel SPA fallback
`vercel.json` includes a rewrite of all routes to `index.html` for direct-link support.

## Deploy to Vercel
1. Push project to GitHub.
2. Open Vercel and click **Add New Project**.
3. Import the GitHub repository.
4. Set framework preset to **Vite** (or React if shown).
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**.
