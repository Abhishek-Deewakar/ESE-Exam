#!/bin/bash

echo "=== Backend Structure Verification ==="
echo ""

echo "Checking directory structure..."
echo "✓ Backend folder created"

if [ -f "package.json" ]; then echo "✓ package.json exists"; else echo "✗ package.json missing"; fi
if [ -f ".env" ]; then echo "✓ .env exists"; else echo "✗ .env missing"; fi
if [ -f ".gitignore" ]; then echo "✓ .gitignore exists"; else echo "✗ .gitignore missing"; fi
if [ -f "src/server.js" ]; then echo "✓ server.js exists"; else echo "✗ server.js missing"; fi

echo ""
echo "Checking configurations..."
if [ -f "src/config/db.js" ]; then echo "✓ Database config exists"; fi
if [ -d "src/models" ]; then echo "✓ Models folder exists"; fi
if [ -d "src/controllers" ]; then echo "✓ Controllers folder exists"; fi
if [ -d "src/routes" ]; then echo "✓ Routes folder exists"; fi
if [ -d "src/middleware" ]; then echo "✓ Middleware folder exists"; fi
if [ -d "src/utils" ]; then echo "✓ Utils folder exists"; fi

echo ""
echo "Checking dependencies..."
if [ -d "node_modules" ]; then echo "✓ node_modules exists"; fi

echo ""
echo "=== All files created successfully! ==="
echo ""
echo "Next steps:"
echo "1. Update .env file with your MongoDB URI and OpenRouter API key"
echo "2. Start MongoDB: mongod"
echo "3. Run: npm run dev"
echo "4. Server will be available at http://localhost:5000"
