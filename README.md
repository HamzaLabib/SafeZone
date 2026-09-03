# Safe Zone Security Academy

Official website for Safe Zone Security Academy.

The platform provides information about security training programs and courses, allows prospective students to submit registration inquiries, supports customer contact requests, and includes a request-to-order store.

## Technology

- React
- Vite
- Tailwind CSS
- React Router
- Node.js / Vercel Serverless Functions
- MongoDB
- Resend
- Vercel

## Features

- Responsive public website
- Security training course catalogue
- Main Security Program page
- Course detail pages
- Registration interest form
- Contact form
- Store and product pages
- Request-to-order workflow
- Email notifications for new submissions
- Administrative dashboard
- Privacy Policy and Terms pages
- Responsive desktop and mobile design
- SEO and sitemap configuration

## Local Development

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

For local testing of both the frontend and Vercel serverless API routes:

```bash
vercel dev
```

## Environment Variables

Backend services require environment variables for services such as:

- MongoDB
- Resend
- Administrative authentication

Create local environment configuration from `.env.example`.

Never commit real credentials or production secrets to the repository.

## Production Build

```bash
npm run build
```

Production output is generated in:

```text
dist/
```

## Main Routes

Public routes include:

- `/`
- `/about`
- `/courses`
- `/courses/:courseId`
- `/programs/security-program`
- `/store`
- `/store/:productId`
- `/order-request`
- `/register`
- `/contact`
- `/faq`
- `/privacy`
- `/terms`

Administrative functionality is available through separate protected routes.

## Backend

Serverless API endpoints support:

- Registration inquiries
- Contact submissions
- Store order requests
- Administrative authentication
- Administrative lead and request management

MongoDB is used for persistent application data, and Resend is used for administrative email notifications.

## Deployment

The application is configured for deployment on Vercel.

Typical deployment:

1. Connect the GitHub repository to Vercel.
2. Configure the required environment variables.
3. Use the Vite framework configuration.
4. Build using:

```bash
npm run build
```

5. Deploy the generated application.

## Security

Production credentials and API keys are managed through environment variables and are not stored in this repository.

## Status

Safe Zone Security Academy is under active development and maintenance.
