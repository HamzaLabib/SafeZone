# Vercel Preview Testing Checklist

Use this checklist for each Vercel preview before public sharing. Test with preview environment variables configured in Vercel; do not use real secrets in committed files.

## Environment

- [ ] `MONGODB_URI` is configured in Vercel Preview.
- [ ] `MONGODB_DB` is configured or intentionally defaults to `safeZoneSecurityAcademy`.
- [ ] `ADMIN_PASSWORD` is configured and is not a reused database/API password.
- [ ] `RESEND_API_KEY` is configured if email notifications are expected.
- [ ] `ADMIN_NOTIFICATION_EMAIL` is configured if email notifications are expected.
- [ ] `EMAIL_FROM` is configured with a verified sender if email notifications are expected.
- [ ] Stripe variables remain blank or unused because payments are not active.

## Public Forms

- [ ] Contact form submits successfully.
- [ ] Contact form rejects missing required fields and missing consent.
- [ ] Register interest form submits successfully.
- [ ] Register interest form rejects invalid email, missing phone, missing course, and missing consent.
- [ ] Order request form submits successfully.
- [ ] Order request form rejects invalid product, invalid quantity, and missing consent.
- [ ] Thank-you page works naturally after contact, registration interest, and order request submissions.

## Admin

- [ ] Admin login works with the configured preview password.
- [ ] Invalid admin login shows a safe error and does not reveal configuration details.
- [ ] Admin login rate limiting returns a temporary lockout after repeated attempts.
- [ ] Dashboard loads registration leads, contact messages, and store requests.
- [ ] Admin lead status update works.
- [ ] Admin market request status update works.
- [ ] Email notification status displays as `sent`, `failed`, or `pending`.
- [ ] Logout clears the session.

## Routing And UX

- [ ] Invalid course route redirects safely to `/courses`.
- [ ] Invalid product route redirects safely to `/store`.
- [ ] Mobile navigation opens, closes, and links to all public sections.
- [ ] 404 page renders for unknown frontend routes.
- [ ] `/checkout/:courseId` clearly shows payment is disabled.
- [ ] `/store` and product pages clearly say an item request is not a purchase.

## SEO And Private Pages

- [ ] `/thank-you` is not in the sitemap and has noindex metadata.
- [ ] `/admin/*` is blocked by `robots.txt`.
- [ ] `/store`, product pages, and `/order-request` are in the sitemap.
- [ ] Legacy `/shop` and `/shop/:productId` links redirect to the corresponding `/store` routes.
- [ ] Canonical tags render on public pages.
- [ ] Open Graph image metadata renders on public pages.

## Final Preview Checks

- [ ] `npm audit --audit-level=low` reports no vulnerabilities.
- [ ] `npm run build` passes.
- [ ] Secret scan finds no committed real `.env`, MongoDB URI, Resend key, Stripe key, webhook secret, or password value.
- [ ] Internal questionnaire/review files remain removed from the public repo.
- [ ] Public launch is still blocked until owner/legal/French/content items are complete.
- [ ] Payments remain disabled.
