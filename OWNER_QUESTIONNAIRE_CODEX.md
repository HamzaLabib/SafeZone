# Safe Zone Security Academy Website Launch Questionnaire

This document lists the information needed to replace placeholder content, confirm business details, and prepare the website for public launch.

## 1. Owner Questionnaire

### Business Identity

- What is the official public name of the academy/business?
- Should the website use "Safe Zone Security Academy" everywhere, or another exact name?
- What is the final website domain?
- Is the current logo approved for public use?
- Are there alternate logo versions we should use for dark backgrounds, light backgrounds, social media, or print?
- What is the approved tagline or slogan?
- What is the academy's mission statement?
- What is the academy's vision statement?
- Please provide the final "About Us" / "Who We Are" text.
- Why should students choose this academy instead of another training provider?
- Should the website mention Quebec, Canada, Montreal, or another service area in a specific way?
- Should the website be English only, French only, or bilingual?

### Contact And Location

- What phone number should appear on the website?
- What email address should appear on the website?
- What physical address should appear on the website?
- Should the full address be public, or should the site only show city/region?
- Please provide the Google Maps link, if available.
- What are the business hours?
- Who is the main contact person for student inquiries?
- Should inquiries be described as going to "Admissions", "Administration", or another department?
- Please provide official social media links, if any.
- Should WhatsApp, SMS, or another contact method be shown?

### Course Catalog

Please confirm which courses should appear on the launch website:

- Security Guard Training
- First Aid & CPR (Level C)
- Loss Prevention
- Security Supervisor Essentials
- Conflict De-escalation
- Emergency Response Procedures
- Any other courses to add
- Any courses to remove or hide for launch

For each course, please provide:

- Official course name
- Short course description
- Full syllabus or topic list
- Duration
- Price
- Upcoming schedule, dates, or cohort availability
- Course format: in-person, online, or hybrid
- Course language
- Registration requirements
- Minimum age, ID, or eligibility requirements
- Certificate, license, or proof of completion provided
- Whether the course is connected to BSP/security licensing requirements
- Any required licensing/accreditation wording
- Exam details, if applicable
- Passing requirements, if applicable
- Retake policy, if applicable
- Materials included
- Materials students must bring
- Maximum class size, if applicable
- Prerequisites, if applicable

### Instructors

- Should instructor information appear on the website at launch?
- Please provide instructor full names.
- Please provide instructor job titles.
- Please provide short instructor bios.
- Please provide credentials, certifications, and licenses.
- Please provide years of experience or relevant professional background.
- Please provide instructor photos, if they should be shown publicly.
- Which courses does each instructor teach?
- Are there any instructor details that should not be published?

### Registration Process

- Is the website form only for registration interest, or should it count as direct registration?
- What happens after a student submits the registration form?
- Who contacts the student after submission?
- How quickly should students expect a response?
- Which fields should be required?
- Which fields should be optional?
- Should students choose a preferred language?
- Should students provide availability or preferred class dates?
- Should students upload documents now, or later?
- What documents are required from students before enrollment?
- Should the website collect date of birth or address?
- Should the website collect consent for phone/email follow-up?
- What exact consent wording should be used?
- What confirmation message should students see after submitting the form?
- Should students receive an automatic confirmation email?

### Payments, Refunds, And Scheduling

- Is online payment needed for launch?
- If yes, should students pay full price, deposit only, or application fee?
- What payment methods should be accepted?
- Are e-transfer, cash, card, invoice, or in-person payment accepted?
- What is the refund policy?
- What is the cancellation policy?
- What is the rescheduling policy?
- What happens if a student misses a class?
- What happens if the academy cancels or reschedules a course?

### Legal, Trust, And Policies

- Please provide or approve the privacy policy.
- Please provide or approve the terms and conditions.
- Please provide or approve the refund policy.
- Please provide or approve the cancellation/rescheduling policy.
- Is an accessibility statement required?
- Is a student agreement required?
- Is a data collection consent statement required?
- Is there required Quebec/Canada legal or compliance wording?
- What exact wording should be used for BSP, certification, licensing, or recognition claims?
- Are there any claims the website must avoid, such as guaranteed jobs, guaranteed licenses, or guaranteed exam results?

### Website Content Approval

Please review and approve or replace text for:

- Homepage hero section
- Homepage "Why Safe Zone" section
- Homepage training image cards
- Featured course section
- Enrollment steps
- Final homepage call-to-action section
- Course cards
- Course detail pages
- About page
- Contact page
- FAQ page
- Footer
- Button text and calls to action
- Thank-you page message
- Privacy Policy page
- Terms of Use page
- Search engine descriptions and social sharing text

### FAQ Content

Please provide final answers for common student questions, including:

- How long does each course take?
- Are certificates recognized in Quebec?
- Does the training support BSP or licensing requirements?
- Do you offer online, hybrid, or in-person training?
- What are the requirements to register?
- What language is training offered in?
- How much do courses cost?
- When are the next classes?
- What payment methods are accepted?
- What should students bring?
- Is job placement or career support offered?

### Photos, Branding, And Assets

Please provide:

- Official logo files
- Approved brand colors, if any
- Real academy photos
- Classroom or training photos
- Instructor photos
- Team photos
- Certificate examples, if public display is allowed
- Approved brochures or PDFs
- Approved marketing copy
- Testimonials or reviews, if real and approved
- Social media profile links or assets
- Any partner, accreditation, or licensing logos that are approved for public use

### Launch Priority

Required before launch:

- Confirm public business name, domain, logo, and tagline.
- Confirm phone, email, location, hours, and service area.
- Confirm all launch courses, prices, schedules, durations, formats, and requirements.
- Approve all certification, licensing, and BSP-related wording.
- Replace all "to be confirmed", "contact for pricing", and launch placeholder text.
- Approve privacy, terms, refund, cancellation, and consent wording.
- Confirm whether forms are interest-only or direct registration.
- Approve all public images and visible website copy.

Can be added later:

- Student portal
- Online payments
- Full course calendar
- Instructor profile pages
- Testimonials and gallery
- Bilingual content, if not required for launch
- Document uploads
- Automatic student confirmation emails
- Advanced admin users or staff accounts

## 2. Developer Notes

### Launch Configuration

- Confirm final production domain and update all public references, sitemap, robots file, and site metadata.
- Configure hosting/deployment for production.
- Configure the database connection and confirm the production database name.
- Confirm whether the current collection structure for registration leads and contact messages should remain.
- Configure the admin notification inbox that receives website submissions.
- Configure the verified sender address used for website notification emails.
- Configure Resend for production email delivery.
- Set and securely store the admin dashboard password.
- Confirm whether the temporary password-only admin dashboard is acceptable for launch or should be replaced before handoff.
- Confirm who should have admin dashboard access.
- Confirm expected admin lead statuses and whether the current statuses are sufficient: New, Contacted, Registered, Not Interested.

### Forms And Notifications

- Confirm final registration form fields and required/optional validation rules.
- Confirm final contact form fields and required/optional validation rules.
- Confirm whether submissions should remain "interest/request" records or become official registrations.
- Confirm email notification subject lines and body content.
- Confirm whether student auto-reply emails are needed.
- Confirm spam prevention requirements beyond the current hidden-field and rate-limit approach.
- Test registration form storage, contact form storage, admin notifications, and admin dashboard display before launch.

### Future Technical Scope

- Student accounts and portal are future scope unless the owner requests them for launch.
- Online payment is future scope unless the owner confirms launch payment requirements.
- Course schedules and pricing can remain content-managed in code for launch, but a CMS or admin editor may be needed later.
- Bilingual support may require a translation/content structure if required for launch.
- File uploads for student documents should be scoped separately if needed.
- Proper role-based admin authentication should be considered before multiple staff members use the dashboard.

### Final Pre-Launch Checks

- Replace all placeholder or provisional business copy.
- Verify every course page has confirmed content.
- Verify all form submissions reach the owner/admin inbox.
- Verify admin dashboard access and logout.
- Verify privacy, terms, refund, cancellation, and consent pages are approved.
- Verify mobile and desktop display after final content is added.
- Run a production build before deployment.
