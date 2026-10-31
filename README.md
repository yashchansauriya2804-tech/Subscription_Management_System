# Subscription Management System

The project contains a React frontend in `Frontend/` and an Express/MongoDB API in `Backend/`.

## Run the full stack locally

Requirements: Node.js 20.19+ and a MongoDB instance (local MongoDB or MongoDB Atlas).

1. Install the root and backend dependencies:

   ```powershell
   npm install
   npm install --prefix .\Backend
   ```

2. Configure the backend environment:

   ```powershell
   Copy-Item .\Backend\.env.example .\Backend\.env
   ```

   Edit `Backend/.env` and set `MONGODB_URI`, a private random `JWT_SECRET` of at least 32 characters, and the initial admin email/password. Generate a secret with `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"`. The initial admin password must be at least 12 characters. Do not commit `Backend/.env`.

3. Start MongoDB, then run both applications from the repository root:

   ```powershell
   npm run dev
   ```

   The frontend is served at `http://localhost:5173`; the API is served at `http://localhost:3001`. Vite proxies `/api` requests to the API.

The API creates the initial administrator (if configured) and the Starter, Pro, and Business plans on startup. Public registration creates customer accounts; admin accounts are never self-registered. To run only one side, use `npm run dev:web` or `npm run dev:api`.

If you change or create `Backend/.env` while the development command is already running, stop and restart `npm run dev` so the API reloads those settings.

## API

All API routes are under `/api`. Authenticate with `POST /auth/login` or `POST /auth/register`; send the returned token as `Authorization: Bearer <token>` for protected routes. The API includes:

- Authentication and customer profile: `/auth`, `/customers`
- Staff administration: `/staff`
- Plans, products, and discounts: `/plans`, `/products`, `/discounts`
- Subscriptions, invoices, payments, and quotation previews: `/subscriptions`, `/invoices`, `/payments`, `/quotations/preview`
- Reporting and analytics: `/reports`, `/analytics`

Management endpoints use role checks. Customer subscriptions create pending invoices; an admin/staff member may record a payment with `POST /payments`, which marks the invoice paid and activates its subscription when recorded as `Succeeded`. This records payment status only; no payment gateway is integrated. Password reset is also unavailable until an email provider is configured.

## Validation

```powershell
npm run build
npm run lint
npm --prefix .\Backend start
npm --prefix .\Backend test
```

Password reset currently returns an explicit “not configured” response because no email-delivery provider is set up.
