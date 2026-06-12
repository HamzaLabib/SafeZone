# Admin Operations Readiness

The current admin dashboard is suitable for preview testing only. It uses a simple shared password stored in `ADMIN_PASSWORD`, an HTTP-only signed cookie, and basic rate limiting on the login route.

## Current Preview Capabilities

- Review registration interest leads.
- Review contact messages.
- Review market/item requests.
- Update registration lead status.
- Update market request status.
- View notification status for form submission emails.
- View payment status fields that are currently informational only.

## Current Limits

- No per-user admin accounts.
- No roles or permissions.
- No audit trail for status changes.
- No export/reporting tools.
- No durable distributed rate limiter.
- No payment operations.
- No refund or fulfillment operations.

## Required Before Real Operations Or Payments

- Replace shared password access with per-user authentication.
- Add admin roles and staff permissions.
- Add audit logging for status, payment, and fulfillment changes.
- Add stronger production-grade rate limiting.
- Add export/reporting if staff need operational records.
- Keep payment status separate from lead status.
- Do not treat a `paid` status as enrollment completion until a confirmed enrollment or registration record exists.

