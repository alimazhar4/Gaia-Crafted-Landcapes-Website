# Jobber API Setup and Integration Plan

This document explains the complete setup path for connecting this website's enquiry form to Jobber.

It is written for a first-time Jobber API user. It assumes:

- You already have a normal Jobber login for your business.
- You do not have a Jobber Developer Center account yet.
- You want the website form to keep sending emails as it does now.
- You also want each website enquiry to be created in Jobber.

## 1. What this website does today

Right now the website form in `components/GardenEnquiryForm.tsx` sends data to:

- `POST /api/capture-lead`

That server route currently:

- accepts the form data
- sends an email to the business
- sends a confirmation email to the customer
- does not send anything to Jobber

The current form fields are:

- `projectType`
- `journeyStage`
- `name`
- `phone`
- `email`
- `postcode`

That means the cleanest first Jobber integration is:

- keep the current email flow
- add a Jobber sync inside `app/api/capture-lead/route.ts`
- create or update a lead/contact record in Jobber
- store the extra website-specific answers in Jobber custom fields

## 2. Recommended integration shape for this project

For this codebase, the best v1 setup is:

- a private Jobber app for one Jobber account
- a `Draft` app in Jobber Developer Center
- OAuth 2.0 for authentication
- server-side GraphQL calls to Jobber
- one-time manual authorization by you
- refresh token rotation turned `OFF` during this private setup
- lead/client sync plus custom fields

Why this is the right fit:

- This repo does not currently have a database.
- This repo does not currently support multiple business accounts.
- A single-account private integration is much simpler than a marketplace-grade app.
- Turning refresh token rotation off avoids needing persistent token storage on day one.

## 3. What will be created in Jobber

Each website enquiry should create or update one Jobber record.

Recommended v1 behavior:

- find an existing Jobber client by email first
- if not found, try phone number
- if exactly one match is found, update it
- if no match is found, create a new client/lead
- if multiple matches are found, do not guess; log the issue and keep the email fallback

Recommended Jobber field mapping:

- Website `name` -> Jobber client name
- Website `email` -> Jobber primary email
- Website `phone` -> Jobber primary phone
- Website `postcode` -> Jobber custom field: `Website Postcode`
- Website `projectType` -> Jobber custom field: `Website Project Type`
- Website `journeyStage` -> Jobber custom field: `Website Journey Stage`

Why custom fields are recommended:

- your form currently collects only a postcode, not a full address
- your form has two business-specific answers that do not naturally fit Jobber's core client model
- custom fields keep the mapping simple and visible inside Jobber

## 4. Accounts you need before writing code

You need two separate things:

1. Your normal Jobber business account
2. A Jobber Developer Center account

Important: Jobber's developer docs describe the Developer Center account as separate from the normal Jobber account. Even if you already use Jobber day to day, you may still need to create a Developer Center login.

Official docs:

- Getting Started: https://developer.getjobber.com/docs/getting_started/

## 5. Create your Jobber Developer Center account

Do this first:

1. Go to Jobber Developer Center.
2. Sign up for a developer account.
3. Verify your email if prompted.
4. Sign in to the developer dashboard.

What you should expect to see:

- a place to create apps
- app settings
- OAuth credentials
- GraphiQL or API exploration tools

If Jobber asks you to create a development Jobber account for testing:

- you can do that for safe testing
- but for this private website integration, you will eventually connect the app to your real business Jobber account

## 6. Create a new Jobber app

Inside Developer Center:

1. Create a new app.
2. Keep it as a `Draft` app.
3. Give it a clear internal name, for example:
   `Gaia Website Lead Capture`
4. Add an app description for your own reference.

Why `Draft` is correct:

- you are not publishing this in Jobber's App Marketplace
- you are only using it for your own business account

Official docs:

- Custom Integrations: https://developer.getjobber.com/docs/custom_integrations/

## 7. Configure the app settings

When creating or editing the app, set the following carefully.

### Callback URL

You will need a callback route in this app.

Recommended routes:

- local: `http://localhost:3000/api/jobber/oauth/callback`
- production: `https://your-domain.com/api/jobber/oauth/callback`

Use the real production domain when you deploy. The callback URL in Jobber must exactly match what your app uses.

### Scopes

Enable the minimum scopes needed for this integration:

- Clients: read and write
- Custom Field Configurations: read and write

If Jobber's UI labels differ slightly, choose the scopes that allow:

- reading clients
- creating/updating clients
- reading custom field definitions
- creating custom field definitions
- writing custom field values on clients

### Refresh Token Rotation

For this private one-account setup, turn Refresh Token Rotation `OFF`.

Why:

- with rotation off, the refresh token stays the same
- you can keep one stable refresh token in environment variables
- you do not need a database just to keep replacing the refresh token

Important:

- Jobber recommends rotation `ON` for marketplace apps
- for this private internal integration, `OFF` is the simpler setup

Official docs:

- OAuth Authorization: https://developer.getjobber.com/docs/building_your_app/app_authorization/
- Refresh Token Rotation: https://developer.getjobber.com/docs/building_your_app/refresh_token_rotation

## 8. Decide your API version

Jobber uses versioned GraphQL APIs.

As of April 1, 2026, the official API versioning docs still describe date-based versions and a rolling support window. Use the latest active version shown in Jobber's Developer Center or GraphiQL on the day you implement this.

Recommended env variable:

- `JOBBER_API_VERSION=2025-04-16`

Use that only as a starting value. Before coding, verify the latest active version in Jobber's docs or developer dashboard.

Official docs:

- API Versioning: https://developer.getjobber.com/docs/using_jobbers_api/api_versioning/

## 9. Authorize the app against your Jobber account

This is the first part many people find confusing, so here is the plain-English version.

Creating the app in Developer Center does not connect it to your Jobber account yet.

You still need to:

1. send yourself through the OAuth connect flow
2. approve the app
3. receive an authorization code
4. exchange that code for tokens
5. save the refresh token in this website's server environment

The OAuth authorize URL pattern from Jobber is:

```text
https://api.getjobber.com/api/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL&response_type=code&state=RANDOM_STRING
```

What happens next:

1. You visit the authorize URL.
2. Jobber asks you to log in.
3. Jobber asks whether to allow the app.
4. Jobber redirects back to your callback URL with a temporary `code`.
5. Your callback route exchanges that code for an access token and refresh token.

For this project, the callback route should display the refresh token once so you can copy it into `.env` or your hosting provider's environment settings.

## 10. Environment variables this repo will need

Add these server-side environment variables:

```env
JOBBER_ENABLED=true
JOBBER_CLIENT_ID=your_jobber_client_id
JOBBER_CLIENT_SECRET=your_jobber_client_secret
JOBBER_REFRESH_TOKEN=your_long_lived_refresh_token
JOBBER_API_VERSION=2025-04-16
JOBBER_SETUP_SECRET=choose_a_long_random_secret
```

What each one does:

- `JOBBER_ENABLED`: feature flag to turn Jobber sync on or off
- `JOBBER_CLIENT_ID`: from Jobber Developer Center
- `JOBBER_CLIENT_SECRET`: from Jobber Developer Center
- `JOBBER_REFRESH_TOKEN`: the stable refresh token obtained from your OAuth callback
- `JOBBER_API_VERSION`: the Jobber GraphQL version header value
- `JOBBER_SETUP_SECRET`: protects the one-time setup route so random visitors cannot trigger your OAuth flow

Important security note:

- keep all Jobber values server-side only
- never expose them in client components
- never prefix them with `NEXT_PUBLIC_`

## 11. Files to add or change in this repo

Recommended implementation layout:

- add `lib/jobber.ts`
- add `app/api/jobber/oauth/start/route.ts`
- add `app/api/jobber/oauth/callback/route.ts`
- update `app/api/capture-lead/route.ts`

### `lib/jobber.ts`

This file should contain:

- access token refresh logic
- a small GraphQL request helper
- client lookup helper
- custom field lookup or creation helper
- create or update client helper
- value formatting for project type and journey stage

### `app/api/jobber/oauth/start/route.ts`

Purpose:

- build the Jobber authorize URL
- validate `JOBBER_SETUP_SECRET`
- redirect you to Jobber's approval screen

Suggested behavior:

- require a query parameter like `?secret=...`
- generate a `state` string
- store the `state` in a secure cookie
- redirect to Jobber authorize URL

### `app/api/jobber/oauth/callback/route.ts`

Purpose:

- receive `code` and `state`
- verify the `state`
- exchange the code for tokens
- display the refresh token once

Suggested output:

- a simple HTML page
- clear copy/paste instructions
- a warning that the token is sensitive

### `app/api/capture-lead/route.ts`

This is where the integration gets linked into the existing flow.

Recommended behavior:

1. validate incoming form data
2. send business email
3. send customer confirmation email
4. if `JOBBER_ENABLED=true`, call the Jobber sync helper
5. if Jobber fails but email succeeds, still return success to the website visitor
6. log the Jobber error for follow-up

This keeps your current form reliable even if Jobber has a temporary issue.

## 12. Suggested Jobber sync flow in code

Inside the Jobber helper, the flow should be:

1. Exchange `JOBBER_REFRESH_TOKEN` for an access token.
2. Query Jobber for matching clients.
3. Ensure the three custom field definitions exist.
4. Map the website values into human-readable text.
5. Update an existing client if exactly one match exists.
6. Otherwise create a new client.
7. Write the custom field values.

Recommended human-readable mappings:

### Project type

- `full-landscaping` -> `Full Garden Landscaping`
- `planters-pergolas` -> `Planters & Pergolas`
- `garden-design` -> `Garden Design Service`
- `patio-paving` -> `Patio or Paving`
- `fencing` -> `Fencing`
- `driveway` -> `Driveway`
- `garden-room` -> `Garden Room`

### Journey stage

- `planning` -> `I'm still planning and researching`
- `only-quote` -> `This is the only quote I'm getting`
- `multiple-quotes` -> `I've already received a few quotes`
- `ready` -> `I'm ready to get started`

## 13. GraphQL operations you will likely use

Jobber's API is GraphQL-based.

The implementation will likely need these categories of operations:

- query existing clients
- create a client
- update a client
- query custom field configurations
- create missing custom field configurations if needed
- write custom field values to the client record

Exact operation names and input shapes should be verified in Jobber GraphiQL during implementation because GraphQL schemas can evolve by version.

This is important:

- do not hardcode assumptions from old blog posts or third-party tutorials
- inspect the live schema in Jobber's GraphiQL for your chosen API version before final coding

## 14. Why we are not creating a Jobber request in v1

This site currently only asks for:

- name
- email
- phone
- postcode
- project type
- journey stage

That is enough for lead capture, but not ideal for a full request or job creation flow.

Reasons to avoid Jobber requests in v1:

- there is no full service address
- there is no request description textarea
- there is no preferred appointment date
- there is no property context

If you later want a richer Jobber workflow, the form can be extended with:

- address line 1
- town/city
- project notes
- budget
- preferred callback time

Then a v2 could create a request as well.

## 15. Implementation order for this repo

Follow this order to keep the work safe and simple.

### Phase 1: Jobber account and app setup

1. Create Developer Center account.
2. Create draft app.
3. Configure callback URL.
4. Configure scopes.
5. Turn refresh token rotation off.
6. Note your client ID and client secret.

### Phase 2: One-time OAuth connection

1. Add the OAuth start route.
2. Add the OAuth callback route.
3. Run the app locally.
4. Visit the setup URL with your secret.
5. Approve the app in Jobber.
6. Copy the returned refresh token into `.env`.

### Phase 3: Server integration

1. Build `lib/jobber.ts`.
2. Add token refresh logic.
3. Add GraphQL helper.
4. Add custom field helper.
5. Add client lookup and upsert logic.
6. Connect it to `app/api/capture-lead/route.ts`.

### Phase 4: Testing

1. Submit a new enquiry.
2. Confirm both emails still send.
3. Confirm a Jobber record is created.
4. Submit again with the same email.
5. Confirm the Jobber record updates instead of duplicating.
6. Temporarily break a Jobber env var and confirm the website still returns success if email succeeds.

## 16. Local development test plan

Before production, test locally with real but controlled submissions.

Checklist:

- app runs locally
- OAuth callback works on localhost
- refresh token is received
- access token refresh works
- custom fields are created once
- repeat submissions do not create obvious duplicates
- Jobber downtime does not break the form success path
- logs are readable when something fails

Recommended local callback:

- `http://localhost:3000/api/jobber/oauth/callback`

Recommended local setup URL:

- `http://localhost:3000/api/jobber/oauth/start?secret=YOUR_SETUP_SECRET`

## 17. Production rollout checklist

Before enabling on the live site:

1. Add the production callback URL in Jobber.
2. Set all Jobber env vars in your hosting platform.
3. Confirm `JOBBER_ENABLED=true` in production only when ready.
4. Do one live test submission.
5. Confirm:
   - business email arrives
   - customer email arrives
   - Jobber record is created or updated
6. Check logs for any GraphQL warnings or scope errors.

## 18. Failure handling rules

The safest user experience for this site is:

- email success = visitor sees success
- Jobber success = bonus confirmation in logs
- Jobber failure = logged internally, but visitor still sees success

Why:

- the business email is your fallback safety net
- a temporary CRM outage should not make the website look broken

## 19. Future upgrades after v1

Once v1 works, you can improve it in these directions:

- add a project notes textarea
- add full address fields
- create Jobber requests in addition to clients
- turn refresh token rotation back `ON`
- add persistent token storage in a database
- support multiple Jobber accounts
- add webhook handling for disconnect events

Those are useful, but they are not required to get the first integration working.

## 20. Important caveats

Keep these in mind while implementing:

- Jobber's exact GraphQL schema can vary by API version.
- Scope labels in the Developer Center UI may be worded slightly differently over time.
- Some Jobber features may depend on your Jobber plan.
- If custom fields are unavailable on your plan, fall back to client-only sync and keep the extra details in the email.

## 21. Practical next step inside this repo

After this plan, the next implementation task should be:

1. add the Jobber OAuth start route
2. add the Jobber OAuth callback route
3. get a refresh token from your own Jobber account
4. only then build the final submit-to-Jobber logic

That order matters because it proves the account connection before we spend time on the data sync layer.

## 22. Official reference links

These are the main official Jobber docs used for this plan:

- Getting Started: https://developer.getjobber.com/docs/getting_started/
- App Authorization (OAuth 2.0): https://developer.getjobber.com/docs/building_your_app/app_authorization/
- Refresh Token Rotation: https://developer.getjobber.com/docs/building_your_app/refresh_token_rotation
- Custom Integrations: https://developer.getjobber.com/docs/custom_integrations/
- API Versioning: https://developer.getjobber.com/docs/using_jobbers_api/api_versioning/
- Custom Fields: https://developer.getjobber.com/docs/using_jobbers_api/custom_fields
