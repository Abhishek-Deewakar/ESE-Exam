# Quick Start Guide - Backend

## ⚡ Quick Setup (5 minutes)

### 1. Prerequisites
- Node.js installed
- MongoDB installed locally or MongoDB Atlas account
- OpenRouter API key (free at https://openrouter.ai)

### 2. Environment Setup

Edit `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-analytics
JWT_SECRET=your_super_secret_key_123
NODE_ENV=development
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

### 3. Start MongoDB

**Windows (if installed):**
```bash
mongod
```

**Or use MongoDB Atlas:**
Replace `MONGODB_URI` with your MongoDB Atlas connection string.

### 4. Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Expected output:
```
Server running on port 5000
Environment: development
MongoDB connected successfully
```

## 📡 Quick Test

### 1. Create Admin User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@test.com",
    "password": "Test123!",
    "role": "admin"
  }'
```

Copy the token from response.

### 2. Add Employee
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <paste_token_here>" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "department": "Development",
    "skills": ["React", "Node.js"],
    "performanceScore": 85,
    "experience": 3
  }'
```

### 3. Get Employees
```bash
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer <paste_token_here>"
```

### 4. Get AI Recommendation
```bash
curl -X POST http://localhost:5000/api/ai/recommend/<employee_id> \
  -H "Authorization: Bearer <paste_token_here>"
```

## 📚 Full Documentation

See `API_DOCUMENTATION.md` for complete API reference with all endpoints and examples.

## 🐛 Troubleshooting

**MongoDB Connection Error?**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- For Atlas: make sure IP is whitelisted

**API Key Error?**
- Get free API key from https://openrouter.ai
- Update OPENROUTER_API_KEY in .env

**Port 5000 Already in Use?**
- Change PORT in .env
- Or kill process: `npx lsof -i :5000` (Mac/Linux) or `netstat -ano | findstr :5000` (Windows)

## 📂 Project Structure

```
backend/
├── src/
│   ├── config/db.js
│   ├── models/User.js, Employee.js
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/aiService.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## ✨ Features Ready

✅ User authentication with JWT  
✅ Employee CRUD operations  
✅ Advanced search & filtering  
✅ Analytics dashboard  
✅ AI-powered recommendations  
✅ Employee ranking  
✅ Role-based access control  
✅ Data validation  
✅ Error handling  

## 🚀 Next Step

Frontend setup ready! Run:
```bash
cd ../frontend
npm create vite@latest . -- --template react
```

Then integrate with backend APIs.
