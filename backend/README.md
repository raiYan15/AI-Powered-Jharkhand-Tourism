# Jharkhand Tourism Backend

A Node.js/Express backend with MongoDB for user authentication (signup, login) supporting multiple roles: Tourist, Vendor, Guide, Admin.

## Features
- REST API for signup, login, and user profile
- JWT authentication
- Role-based user model
- CORS enabled for frontend integration

## Setup
1. Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints
- `POST /api/signup` — Register a new user (fields: name, email, password, role)
- `POST /api/login` — Login (fields: email, password, role)
- `GET /api/profile` — Get user profile (requires Bearer token)

## User Roles
- Tourist
- Vendor
- Guide
- Admin

## Example .env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/jharkhandtourism
JWT_SECRET=your_jwt_secret_here
```

---

Integrate these endpoints with your React frontend for real authentication.
