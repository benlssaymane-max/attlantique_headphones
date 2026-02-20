# 🚀 Getting Started with WH-1000XM6 Full-Stack Platform

This guide will help you get the complete Sony WH-1000XM6 e-commerce platform running in 10 minutes.

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org))
- **Git** (for cloning, optional)
- **Docker Desktop** (optional but recommended)

## ⚡ 3-Step Quick Start

### Step 1: Setup Environment (2 minutes)

```bash
# Navigate to project directory
cd wh-1000xm6-full

# Copy environment template
cp .env.example .env.local

# Install dependencies
npm install
```

**Windows Users:** If npm install fails, try:
```bash
# Delete and reinstall
rmdir node_modules
npm cache clean --force
npm install
```

### Step 2: Start PostgreSQL (3 minutes)

#### Option A: Docker (Easiest)
```bash
docker-compose up -d
```

Verify it's running:
```bash
docker-compose ps
```

You should see `postgres` and `pgadmin` containers running.

#### Option B: Local PostgreSQL

If PostgreSQL is already installed locally:

```bash
# Check if PostgreSQL is running
psql --version

# Create database
createdb aymane6

# Create user (password: SecurePassword123!)
createuser aymane
```

### Step 3: Initialize Database (2 minutes)

```bash
# Generate Prisma client
npm run db:generate

# Create database tables
npm run db:migrate

# Seed with sample data
npm run db:seed
```

You should see:
```
✅ Database seeded successfully!
- Created 2 users (1 admin, 1 regular)
- Created 2 products
- Created 2 reviews
- Created 2 orders
```

### Step 4: Start Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✅ Verify Everything Works

### Test 1: View Website
Open [http://localhost:3000](http://localhost:3000) - You should see the scrollytelling hero landing page.

### Test 2: View Products
Open [http://localhost:3000/products](http://localhost:3000/products) - You should see 2 WH-1000XM6 products.

### Test 3: Access pgAdmin (Database GUI)
Open [http://localhost:5050](http://localhost:5050)
- Email: admin@aymane6.com
- Password: admin

### Test 4: API Test
```bash
# Get all products
curl http://localhost:3000/api/products

# Login as test user
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@aymane6.com",
    "password": "User123!"
  }'
```

---

## 🔑 Important Credentials

### Default Test Accounts
```
Admin User:
  Email: admin@aymane6.com
  Password: Admin123!

Regular User:
  Email: user@aymane6.com
  Password: User123!
```

### Database Connection
```
Host: localhost (or postgres if using Docker)
Port: 5432
Database: aymane6
User: aymane
Password: SecurePassword123!
```

---

## 📁 Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage (scrollytelling landing) |
| `app/products/page.tsx` | Products listing page |
| `app/api/auth/login` | Login API endpoint |
| `app/api/products/` | Products API endpoints |
| `prisma/schema.prisma` | Database schema |
| `docker-compose.yml` | PostgreSQL Docker setup |
| `.env.local` | Environment variables (local credentials) |

---

## 🛠️ Common Tasks

### View Database in pgAdmin
```
1. Open http://localhost:5050
2. Add server: Right-click "Servers" → "Register" → "Server"
3. Connection tab:
   - Hostname: postgres (Docker) or localhost (local)
   - Username: aymane
   - Password: SecurePassword123!
4. Click "Save"
```

### Stop Services
```bash
# Stop all Docker containers
docker-compose down

# Stop Node.js development server
Press Ctrl+C in terminal
```

### Reset Database to Clean State
```bash
npm run db:push -- --force-reset
npm run db:seed
```

### View Database in Prisma Studio
```bash
npm run db:studio
# Opens at http://localhost:5555
```

### Check Logs
```bash
# Docker PostgreSQL logs
docker-compose logs postgres -f

# Node.js development logs
# Visible in the terminal where you ran `npm run dev`
```

---

## 🐛 Troubleshooting

### "Cannot connect to PostgreSQL"
```bash
# Check if Docker is running
docker-compose ps

# If containers are down, start them
docker-compose up -d

# Check logs
docker-compose logs postgres
```

### "Port 5432 already in use"
```bash
# Change DATABASE_URL in .env.local to different port
# Or kill the process using port 5432
```

### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm run db:generate
```

### "Database tables don't exist"
```bash
# Run migrations
npm run db:migrate

# Or push schema directly
npm run db:push
```

---

## 📚 Next Steps

1. **Explore the codebase:**
   - Check `app/components/` for UI components
   - Review `app/api/` for backend endpoints
   - Read `prisma/schema.prisma` for database structure

2. **Customize for production:**
   - Change JWT_SECRET in .env.local
   - Update product data in `scripts/seed.ts`
   - Modify brand colors in `tailwind.config.js`

3. **Deploy to production:**
   - See README.md for deployment instructions
   - Update DATABASE_URL to production database
   - Set NEXT_PUBLIC_API_URL to production domain

---

## 📞 Quick Help

| Issue | Command |
|-------|---------|
| Slow performance | Check Docker resources: `docker stats` |
| Database locked | Reset fresh: `npm run db:push -- --force-reset` |
| Can't login | User might be deleted, run: `npm run db:seed` |
| TypeScript errors | Run: `npm run db:generate` |
| API not responding | Check server is running: `npm run dev` |

---

## 🎯 Success Checklist

✅ Node.js and npm installed
✅ Project dependencies installed (`npm install`)
✅ Docker running (if using Docker) or PostgreSQL installed
✅ database connection successful (`docker-compose ps` shows postgres running)
✅ Database initialized (`npm run db:seed` completed)
✅ Development server running (`npm run dev` shows "ready on http://localhost:3000)")
✅ Website loads at `http://localhost:3000`
✅ Products page shows 2 items at `/products`
✅ Can login with test credentials at `/api/auth/login`
✅ pgAdmin accessible at `http://localhost:5050`

**Once all checkboxes are done, you're ready to start building! 🚀**

---

## 📖 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL](https://www.postgresql.org/docs)
- [Docker](https://docs.docker.com)

---

**Built with ❤️ - Happy coding! 🎉**
