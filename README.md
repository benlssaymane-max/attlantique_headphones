# Sony WH-1000XM6 Full-Stack E-Commerce Platform

A premium, Awwwards-level scrollytelling landing page with integrated e-commerce backend for Sony WH-1000XM6 headphones.

## ✨ Features

### Frontend
- **120-frame scroll-linked animation** - smooth product showcase with canvas-based rendering
- **Apple-style navigation** - glassmorphic navbar with scroll-triggered animations
- **Scroll-synced storytelling** - 5 narrative sections with progress-based animations
- **Premium typography** - custom typography scale from 4.5rem to 1rem
- **Responsive design** - optimized for all screen sizes
- **Performance-optimized** - GPU-accelerated animations, smart image preloading

### Backend
- **User authentication** - JWT-based login and registration with bcrypt password hashing
- **Product management** - full CRUD operations for product catalog
- **Order processing** - complete order management system
- **Reviews & ratings** - customer review system with 5-star ratings
- **Analytics** - page view tracking and analytics
- **Admin dashboard** - admin-only product management capabilities

### Database
- **PostgreSQL** - robust relational database (aymane6)
- **Prisma ORM** - type-safe database access layer
- **Docker containerization** - PostgreSQL + pgAdmin in Docker Compose
- **Automated seeding** - sample data for immediate testing

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone and navigate to project:**
```bash
cd wh-1000xm6-full
```

2. **Create environment file:**
```bash
cp .env.example .env.local
```

3. **Start PostgreSQL and pgAdmin:**
```bash
docker-compose up -d
```

4. **Install dependencies:**
```bash
npm install
```

5. **Setup database:**
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

6. **Start development server:**
```bash
npm run dev
```

7. **Open browser:**
```
http://localhost:3000
```

### Manual PostgreSQL Setup

1. **Create database:**
```bash
createdb aymane6
createuser aymane
# Set password: SecurePassword123!
```

2. **Grant privileges:**
```bash
psql -U postgres
GRANT ALL PRIVILEGES ON DATABASE aymane6 TO aymane;
\q
```

3. **Then follow steps 2-6 above**

## 📋 Project Structure

```
wh-1000xm6-full/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   └── products/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroContent.tsx
│   │   ├── ScrollCanvas.tsx
│   │   └── ScrollStorySection.tsx
│   ├── hooks/
│   │   └── useScrollAnimation.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── auth.ts (JWT utilities)
│   ├── prisma.ts (Prisma client singleton)
│   └── api-response.ts (API response helpers)
├── prisma/
│   └── schema.prisma (database schema)
├── scripts/
│   └── seed.ts (database seeding)
├── database/
│   └── init.sql (SQL initialization)
├── public/
│   ├── images/
│   │   ├── sequence/ (120 frame sequence)
│   │   └── products/ (product images)
│   └── fonts/
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── .env.example
├── DATABASE_SETUP.md
└── README.md
```

## 🔌 API Endpoints

### Authentication

**Register User**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username",
    "role": "USER",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

**Login User**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username",
    "role": "USER"
  }
}
```

### Products

**List Products**
```bash
GET /api/products?skip=0&take=10&category=Headphones
```

**Response (200):**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Sony WH-1000XM6 - Matte Black",
      "slug": "wh-1000xm6-matte-black",
      "price": 379.99,
      "stock": 50,
      "color": "Matte Black",
      "batteryLife": 30,
      "images": [
        { "url": "/images/products/...", "altText": "..." }
      ],
      "reviews": [
        { "rating": 5, "title": "...", "comment": "..." }
      ]
    }
  ],
  "pagination": {
    "total": 2,
    "skip": 0,
    "take": 10,
    "pages": 1
  }
}
```

**Get Single Product**
```bash
GET /api/products/1
```

**Create Product (Admin)**
```bash
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Sony WH-1000XM6",
  "slug": "wh-1000xm6",
  "description": "Best-in-class noise cancelling headphones",
  "price": 379.99,
  "stock": 50,
  "category": "Headphones",
  "color": "Matte Black",
  "batteryLife": 30,
  "weight": 250,
  "warranty": "2 Years"
}
```

## 🔐 Authentication

All protected endpoints require a Bearer token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

Tokens expire in 7 days and include user ID, email, and role (USER/ADMIN).

## 🗄️ Database Schema

### User
- id (Primary Key)
- email (Unique)
- username (Unique)
- password (Hashed)
- firstName, lastName
- role (USER or ADMIN)
- createdAt, updatedAt, deletedAt

### Product
- id (Primary Key)
- name, description
- price, stock
- category, color
- batteryLife, weight, warranty
- images (1-to-many relation)
- reviews (1-to-many relation)
- orderItems (1-to-many relation)

### Order
- id (Primary Key)
- userId (Foreign Key to User)
- status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- totalPrice
- shippingAddress fields
- orderItems (1-to-many relation)

### Review
- id (Primary Key)
- productId, userId (Foreign Keys)
- rating (1-5), title, comment
- createdAt, updatedAt

### ProductImage
- id (Primary Key)
- productId (Foreign Key)
- url, altText

### Contact
- id (Primary Key)
- name, email, subject, message
- createdAt

### PageView (Analytics)
- id (Primary Key)
- path, timestamp

## 📊 Database Management

### pgAdmin (Web UI)
```
http://localhost:5050
Email: admin@aymane6.com
Password: admin
```

### Prisma Studio (Interactive)
```bash
npm run db:studio
```
Opens at `http://localhost:5555`

### Database Backup
```bash
docker-compose exec postgres pg_dump -U aymane aymane6 > backup.sql
```

### Database Restore
```bash
docker-compose exec -T postgres psql -U aymane aymane6 < backup.sql
```

## 🛠️ Development

### File Structure Conventions
- Components: `app/components/`
- API Routes: `app/api/`
- Utilities: `lib/`
- Database: `prisma/schema.prisma`
- Styles: `app/globals.css` + Tailwind utilities

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Create and apply migration
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio

# Docker
npm run docker:up    # Start PostgreSQL + pgAdmin
npm run docker:down  # Stop services
```

### Styling Guide
- **Colors**: Use Tailwind's `brand-blue` (#0050FF), `brand-cyan` (#00D6FF), `brand-dark` (#050505)
- **Typography**: Use display-lg through body sizes from config
- **Animations**: Framer Motion for interactive, Tailwind keyframes for entrance
- **Utilities**: `.glass` for glassmorphism, `.gradient-text` for gradients, `.glow-subtle` for glows

### Adding Models to Database
1. Update `prisma/schema.prisma` with new model
2. Run `npm run db:migrate -- --name add_model_name`
3. Prisma client updates automatically

## 🧪 Testing

### Test User Credentials
```
Admin:
  Email: admin@aymane6.com
  Password: Admin123!

Regular User:
  Email: user@aymane6.com
  Password: User123!
```

### Sample Product Data
- WH-1000XM6 Matte Black (ID: 1) - $379.99
- WH-1000XM6 Silver (ID: 2) - $379.99

### Test API Calls
```bash
# Login and get token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@aymane6.com","password":"User123!"}'

# Get products
curl http://localhost:3000/api/products

# Get single product
curl http://localhost:3000/api/products/1
```

## 🐛 Troubleshooting

### PostgreSQL Connection Error
```bash
# Check if Docker container is running
docker-compose ps

# View logs
docker-compose logs postgres

# Restart services
docker-compose restart
```

### Database Migration Error
```bash
# Reset database to clean state
npm run db:push -- --force-reset
npm run db:seed
```

### Prisma Client Error
```bash
rm -rf node_modules .next
npm install
npm run db:generate
```

### Port Already in Use
- PostgreSQL: 5432
- pgAdmin: 5050
- Next.js: 3000

Change ports in `docker-compose.yml` or your environment.

## 📦 Dependencies

**Production:**
- react 18.2.0
- next 14.0.0
- framer-motion 10.16.0
- tailwindcss 3.3.0
- @prisma/client 5.7.0
- bcryptjs 2.4.3
- jsonwebtoken 9.1.2

**Development:**
- typescript 5.3.0
- prisma 5.7.0
- tailwindcss plugins
- ESLint & prettier

## 🚁 Deployment

### Vercel (Next.js)
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables (DATABASE_URL, JWT_SECRET)
4. Deploy automatically

### Railway/Render (PostgreSQL + Next.js)
1. Create PostgreSQL database
2. Set DATABASE_URL from connection string
3. Deploy Next.js app
4. Run migrations: `npm run db:migrate`

### Docker Production
```bash
docker build -t wh1000xm6 .
docker run -p 3000:3000 -e DATABASE_URL="..." wh1000xm6
```

## 📝 License

This is a demo project. For production use, customize accordingly.

## 🤝 Support

For issues or questions:
1. Check DATABASE_SETUP.md for database-specific help
2. Review API endpoint documentation above
3. Check Docker logs: `docker-compose logs`
4. Verify .env.local configuration

---

**Built with ❤️ using Next.js 14, Tailwind CSS, Prisma & PostgreSQL**
