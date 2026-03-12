# Premium Promoters Backend API

Node.js backend with Express and MongoDB for managing testimonials, services, and portfolio items.

## Setup Instructions

### 1. Install MongoDB
Download and install MongoDB from: https://www.mongodb.com/try/download/community

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment
Copy `.env.example` to `.env` and update values if needed:
```bash
cp .env.example .env
```

### 4. Start MongoDB
Make sure MongoDB is running on your system.

### 5. Create Admin User
Run this once to create the initial admin account:
```bash
curl -X POST http://localhost:5000/api/auth/setup
```

### 6. Start Server
```bash
npm run dev
```

Server will run on: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/setup` - Create initial admin (run once)

### Testimonials
- `GET /api/testimonials` - Get all active testimonials (public)
- `GET /api/testimonials/admin` - Get all testimonials (admin)
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create testimonial (admin)
- `PUT /api/testimonials/:id` - Update testimonial (admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin)

### Services
- `GET /api/services` - Get all active services (public)
- `GET /api/services/admin` - Get all services (admin)
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Portfolio
- `GET /api/portfolio` - Get all active portfolio items (public)
- `GET /api/portfolio/admin` - Get all portfolio items (admin)
- `GET /api/portfolio/:id` - Get single portfolio item
- `POST /api/portfolio` - Create portfolio item (admin)
- `PUT /api/portfolio/:id` - Update portfolio item (admin)
- `DELETE /api/portfolio/:id` - Delete portfolio item (admin)

## Default Admin Credentials
- Email: admin@premiumpromoters.com
- Password: admin123

**⚠️ Change these in production!**

## Testing the API

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@premiumpromoters.com","password":"admin123"}'
```

### Create Testimonial (use token from login)
```bash
curl -X POST http://localhost:5000/api/testimonials \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "text": "Amazing service!",
    "name": "John Doe",
    "role": "CEO, Tech Corp",
    "avatar": "JD",
    "rating": 5
  }'
```
