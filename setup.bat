@echo off
REM WH-1000XM6 Full-Stack Application Setup Script for Windows
REM This script automates the complete setup process

echo.
echo 🚀 Sony WH-1000XM6 Full-Stack Application Setup
echo ==================================================
echo.

REM Check Node.js
echo 📦 Checking Node.js...
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set node_version=%%i
echo ✅ Node.js %node_version% found
echo.

REM Check Docker
echo 🐳 Checking Docker...
where docker >nul 2>nul
if errorlevel 1 (
    echo ⚠️  Docker is not installed. You can:
    echo    1. Install Docker Desktop: https://www.docker.com/products/docker-desktop
    echo    2. Or use local PostgreSQL instead
    set docker_available=false
) else (
    echo ✅ Docker found
    set docker_available=true
)
echo.

REM Install dependencies
echo 📥 Installing npm dependencies...
call npm install
if errorlevel 1 (
    echo ❌ npm install failed
    pause
    exit /b 1
)
echo ✅ Dependencies installed
echo.

REM Setup environment
echo ⚙️  Setting up environment...
if not exist .env.local (
    copy .env.example .env.local >nul
    echo ✅ Created .env.local (verify database credentials)
) else (
    echo ✅ .env.local already exists
)
echo.

REM Start Docker if available
if "%docker_available%"=="true" (
    echo 🐳 Starting Docker services...
    call docker-compose up -d
    if errorlevel 1 (
        echo ❌ Docker startup failed. Check your Docker installation.
        pause
        exit /b 1
    )
    echo ✅ Docker services started
    echo    PostgreSQL: localhost:5432
    echo    pgAdmin: http://localhost:5050
    echo.
    
    echo ⏳ Waiting for PostgreSQL to be ready...
    timeout /t 5 /nobreak
) else (
    echo ⚠️  Skipping Docker setup. Make sure PostgreSQL is running locally.
    echo.
)

REM Generate Prisma Client
echo 🔧 Generating Prisma client...
call npm run db:generate
if errorlevel 1 (
    echo ❌ Prisma generation failed
    pause
    exit /b 1
)
echo ✅ Prisma client generated
echo.

REM Run migrations
echo 📡 Running database migrations...
call npm run db:migrate
if errorlevel 1 (
    echo ❌ Database migration failed
    pause
    exit /b 1
)
echo ✅ Database migrations complete
echo.

REM Seed database
echo 🌱 Seeding database with sample data...
call npm run db:seed
if errorlevel 1 (
    echo ❌ Database seeding failed
    pause
    exit /b 1
)
echo ✅ Database seeded successfully
echo.

REM Summary
echo ==================================================
echo ✅ Setup Complete!
echo ==================================================
echo.
echo 📌 Next Steps:
echo.
echo 1. Start the development server:
echo    npm run dev
echo.
echo 2. Open in browser:
echo    http://localhost:3000
echo.
echo 3. View products page:
echo    http://localhost:3000/products
echo.

if "%docker_available%"=="true" (
    echo 4. Access pgAdmin (database UI):
    echo    http://localhost:5050
    echo    Email: admin@aymane6.com
    echo    Password: admin
) else (
    echo 4. Connect to local PostgreSQL:
    echo    Database: aymane6
    echo    User: aymane
    echo    Password: SecurePassword123!
)

echo.
echo 📚 Documentation:
echo    - GETTING_STARTED.md (Quick start guide)
echo    - DATABASE_SETUP.md (Database configuration)
echo    - README.md (Full documentation)
echo.
echo 🔑 Test Credentials:
echo    Admin: admin@aymane6.com / Admin123!
echo    User: user@aymane6.com / User123!
echo.
echo 🎉 Happy coding!
echo.
pause
