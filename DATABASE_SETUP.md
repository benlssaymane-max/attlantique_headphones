# Setup Instructions for WH-1000XM6 Full-Stack Application

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15 (or use Docker)
- npm or yarn

### Option 1: Docker Setup (Recommended)

1. **Start PostgreSQL and pgAdmin:**
```bash
docker-compose up -d
```

2. **Verify the database is running:**
```bash
docker-compose ps
```

3. **Access pgAdmin:**
- URL: http://localhost:5050
- Email: admin@aymane6.com
- Password: admin

### Option 2: Local PostgreSQL Setup

1. **Create database:**
```bash
createdb aymane6
```

2. **Create database user (if not exists):**
```bash
createuser -P aymane
```
Enter password: `SecurePassword123!`

### Install Dependencies

```bash
npm install
```

### Configure Environment

1. **Create .env.local:**
```bash
cp .env.example .env.local
```

2. **Verify DATABASE_URL:**
```env
DATABASE_URL="postgresql://aymane:SecurePassword123!@localhost:5432/aymane6"
JWT_SECRET="your-super-secret-key-change-in-production"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"
```

### Initialize Database

1. **Generate Prisma Client:**
```bash
npm run db:generate
```

2. **Run Database Migrations:**
```bash
npm run db:migrate
```

3. **Seed Database with Sample Data:**
```bash
npm run db:seed
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Management

### View Database in pgAdmin
1. Go to http://localhost:5050
2. Login with credentials above
3. Right-click "Servers" → "Register" → "Server"
4. Fill in:
   - Name: aymane6
   - Host: postgres (Docker) or localhost (local)
   - Username: aymane
   - Password: SecurePassword123!

### Prisma Studio (Interactive Database UI)
```bash
npm run db:studio
```

### Create New Migration After Schema Changes
```bash
npm run db:migrate -- --name add_new_feature
```

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user (returns JWT)

### Products
- **GET** `/api/products` - List all products (with pagination)
- **GET** `/api/products/{id}` - Get single product details
- **POST** `/api/products` - Create product (admin only)
- **PUT** `/api/products/{id}` - Update product (admin only)
- **DELETE** `/api/products/{id}` - Delete product (admin only)

### Sample API Calls

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "username": "newuser",
    "password": "Password123!",
    "firstName": "New",
    "lastName": "User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@aymane6.com",
    "password": "User123!"
  }'
```

**Get Products:**
```bash
curl http://localhost:3000/api/products?skip=0&take=10
```

**Get Single Product:**
```bash
curl http://localhost:3000/api/products/1
```

## Development Tips

### Hot Reload
The server automatically reloads when you modify files.

### Database Reset
To reset the database to seed state:
```bash
npm run db:push -- --force-reset
npm run db:seed
```

### Stop Docker Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs postgres -f
```

## Default Test Credentials

**Admin User:**
- Email: admin@aymane6.com
- Password: Admin123!

**Regular User:**
- Email: user@aymane6.com
- Password: User123!

## Troubleshooting

### Connection Refused
- Ensure PostgreSQL is running: `docker-compose ps`
- Verify DATABASE_URL in .env.local
- Check port 5432 is not in use

### Migration Failed
```bash
npm run db:push -- --force-reset
npm run db:seed
```

### Port Already in Use
```bash
# Change port in docker-compose.yml or your app config
# By default: 5432 (PostgreSQL), 5050 (pgAdmin), 3000 (Next.js)
```

### Clear Node Modules and Reinstall
```bash
rm -rf node_modules .next
npm install
npm run db:generate
```

## Production Deployment

1. **Set strong JWT_SECRET** in production environment
2. **Change database credentials** from defaults
3. **Enable HTTPS** for API endpoints
4. **Set up proper authentication middleware**
5. **Configure CORS** as needed
6. **Use environment-specific .env files**

## Next Steps

1. ✅ Database initialized
2. ✅ API routes created
3. ⏳ Frontend components (products list, auth pages)
4. ⏳ Admin dashboard
5. ⏳ Payment integration (Stripe/PayPal)
6. ⏳ Email notifications
7. ⏳ Search and filtering
