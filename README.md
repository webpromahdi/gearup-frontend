## 🌐 Frontend Routes & API Integration

The frontend consumes the GearUp Backend REST API and provides a role-based user experience for Customers, Providers, and Admins.

| Frontend Route | Feature | Backend API |
|----------------|---------|-------------|
| `/` | Home page (Featured Gear) | `GET /api/gear` |
| `/gear` | Browse gear, search & filter | `GET /api/gear` `GET /api/categories` |
| `/gear/[id]` | Gear details | `GET /api/gear/:id` |
| `/login` | User login | `POST /api/auth/login` |
| `/register` | User registration | `POST /api/auth/register` |
| `/profile` | Current user profile | `GET /api/auth/me` |
| `/dashboard/customer` | Customer dashboard | `GET /api/rentals` `GET /api/payments` |
| `/dashboard/customer/rentals/[id]` | Rental details | `GET /api/rentals/:id` |
| `/dashboard/customer/payment/[id]` | Payment page | `POST /api/payments/create` |
| `/dashboard/customer/reviews` | Customer reviews | `GET /api/reviews` `POST /api/reviews` |
| `/dashboard/provider` | Provider dashboard | `GET /api/provider/gear` `GET /api/provider/orders` |
| `/dashboard/provider/gear` | Provider gear list | `GET /api/provider/gear` |
| `/dashboard/provider/gear/new` | Add new gear | `POST /api/provider/gear` |
| `/dashboard/provider/gear/[id]/edit` | Update gear | `PUT /api/provider/gear/:id` |
| `/dashboard/provider/orders` | Incoming rental orders | `GET /api/provider/orders` |
| `/dashboard/provider/orders/[id]` | Order details & status update | `GET /api/provider/orders/:id` `PATCH /api/provider/orders/:id` |
| `/dashboard/admin` | Admin dashboard | `GET /api/admin/users` `GET /api/admin/gear` `GET /api/admin/rentals` |
| `/dashboard/admin/users` | User management | `GET /api/admin/users` `PATCH /api/admin/users/:id` |
| `/dashboard/admin/categories` | Category management | `GET /api/categories` `POST /api/categories` `PUT /api/categories/:id` `DELETE /api/categories/:id` |
| `/dashboard/admin/gear` | Gear moderation | `GET /api/admin/gear` |
| `/dashboard/admin/rentals` | Rental management | `GET /api/admin/rentals` |
| `/payment/success` | Stripe payment success | Stripe Checkout Redirect |
| `/payment/cancel` | Stripe payment cancelled | Stripe Checkout Redirect |