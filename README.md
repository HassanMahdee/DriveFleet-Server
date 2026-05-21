# DriveFleet – Backend API

**API Base URL:** `https://drivefleet-server.vercel.app` *(replace with your actual deployed URL)*

## 🔧 Features

- **JWT Authentication** – HTTP‑only cookie based token generation and verification.
- **Car CRUD** – Add, update, delete cars (ownerEmail set from verified token).
- **Booking System** – Create bookings, list user bookings, cancel bookings, and increment `bookingCount` using MongoDB `$inc`.
- **Search & Filter** – Search by car name (`$regex` case‑insensitive) and filter by type (`$in`).
- **Protected Routes** – Middleware `verifyJWT` secures all private endpoints.

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB (Mongoose)
- JWT (`jsonwebtoken`)
- Cookie‑Parser, CORS, Dotenv

## 📡 API Endpoints

| Method | Endpoint          | Description                | Auth |
|--------|-------------------|----------------------------|------|
| GET    | /cars             | All cars (search+filter)   | No   |
| GET    | /cars/:id         | Single car                 | No   |
| POST   | /cars             | Add car                    | Yes  |
| PATCH  | /cars/:id         | Update car (owner only)    | Yes  |
| DELETE | /cars/:id         | Delete car (owner only)    | Yes  |
| GET    | /my-cars          | User's cars                | Yes  |
| POST   | /bookings         | Create booking             | Yes  |
| GET    | /my-bookings      | User's bookings            | Yes  |
| DELETE | /bookings/:id     | Cancel booking             | Yes  |
| POST   | /auth/logout      | Clear JWT cookie           | No   |

## 📄 License

Academic assignment – for educational purposes only.