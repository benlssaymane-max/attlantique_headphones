#!/bin/bash

# wh-1000xm6-full Setup Script
# This script automates the complete setup process for Windows, macOS, and Linux

echo "🚀 Sony WH-1000XM6 Full-Stack Application Setup"
echo "=================================================="
echo ""

# Check Node.js
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

node_version=$(node -v)
echo "✅ Node.js $node_version found"
echo ""

# Check Docker
echo "🐳 Checking Docker..."
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. You can:"
    echo "   1. Install Docker Desktop: https://www.docker.com/products/docker-desktop"
    echo "   2. Or use local PostgreSQL instead"
    docker_available=false
else
    echo "✅ Docker found"
    docker_available=true
fi
echo ""

# Install dependencies
echo "📥 Installing npm dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Setup environment
echo "⚙️  Setting up environment..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local (verify database credentials)"
else
    echo "✅ .env.local already exists"
fi
echo ""

# Start Docker if available
if [ "$docker_available" = true ]; then
    echo "🐳 Starting Docker services..."
    docker-compose up -d
    if [ $? -eq 0 ]; then
        echo "✅ Docker services started"
        echo "   PostgreSQL: localhost:5432"
        echo "   pgAdmin: http://localhost:5050"
    else
        echo "❌ Docker startup failed. Check your Docker installation."
        exit 1
    fi
    echo ""

    # Wait for PostgreSQL
    echo "⏳ Waiting for PostgreSQL to be ready..."
    sleep 5
else
    echo "⚠️  Skipping Docker setup. Make sure PostgreSQL is running locally."
    echo ""
fi

# Generate Prisma Client
echo "🔧 Generating Prisma client..."
npm run db:generate
if [ $? -ne 0 ]; then
    echo "❌ Prisma generation failed"
    exit 1
fi
echo "✅ Prisma client generated"
echo ""

# Run migrations
echo "📡 Running database migrations..."
npm run db:migrate
if [ $? -ne 0 ]; then
    echo "❌ Database migration failed"
    exit 1
fi
echo "✅ Database migrations complete"
echo ""

# Seed database
echo "🌱 Seeding database with sample data..."
npm run db:seed
if [ $? -ne 0 ]; then
    echo "❌ Database seeding failed"
    exit 1
fi
echo "✅ Database seeded successfully"
echo ""

# Summary
echo "=================================================="
echo "✅ Setup Complete!"
echo "=================================================="
echo ""
echo "📌 Next Steps:"
echo ""
echo "1. Start the development server:"
echo "   npm run dev"
echo ""
echo "2. Open in browser:"
echo "   http://localhost:3000"
echo ""
echo "3. View products page:"
echo "   http://localhost:3000/products"
echo ""
if [ "$docker_available" = true ]; then
    echo "4. Access pgAdmin (database UI):"
    echo "   http://localhost:5050"
    echo "   Email: admin@aymane6.com"
    echo "   Password: admin"
else
    echo "4. Connect to local PostgreSQL:"
    echo "   Database: aymane6"
    echo "   User: aymane"
    echo "   Password: SecurePassword123!"
fi
echo ""
echo "📚 Documentation:"
echo "   - GETTING_STARTED.md (Quick start guide)"
echo "   - DATABASE_SETUP.md (Database configuration)"
echo "   - README.md (Full documentation)"
echo ""
echo "🔑 Test Credentials:"
echo "   Admin: admin@aymane6.com / Admin123!"
echo "   User: user@aymane6.com / User123!"
echo ""
echo "🎉 Happy coding!"
