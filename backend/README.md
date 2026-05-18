# Employee Performance Analytics Backend

AI-powered backend for employee performance analysis and recommendations.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User/Admin schema
│   │   └── Employee.js        # Employee schema
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   ├── employeeController.js # Employee CRUD
│   │   └── aiController.js    # AI recommendations
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── employeeRoutes.js  # Employee endpoints
│   │   └── aiRoutes.js        # AI endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   ├── validationMiddleware.js # Data validation
│   │   └── errorHandler.js    # Error handling
│   ├── utils/
│   │   └── aiService.js       # OpenRouter integration
│   └── server.js              # Express app setup
├── .env                        # Environment variables
├── .env.example               # Example env file
├── .gitignore                 # Git ignore rules
└── package.json               # Dependencies
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy and update `.env` file:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-analytics
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

### 3. Start MongoDB

```bash
# Using MongoDB locally
mongod

# Or use MongoDB Atlas connection string in MONGODB_URI
```

### 4. Start the Server

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- **POST** `/api/auth/signup` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/profile` - Get user profile (protected)

### Employees

- **POST** `/api/employees` - Add employee (HR/Admin only)
- **GET** `/api/employees` - Get all employees
- **GET** `/api/employees/search` - Search employees
- **GET** `/api/employees/analytics` - Get analytics
- **GET** `/api/employees/:id` - Get employee by ID
- **PUT** `/api/employees/:id` - Update employee (HR/Admin only)
- **DELETE** `/api/employees/:id` - Delete employee (Admin only)

### AI Recommendations

- **POST** `/api/ai/recommend/:employeeId` - Get AI recommendation for single employee
- **POST** `/api/ai/bulk-recommend` - Generate recommendations for all employees
- **GET** `/api/ai/rank/all` - Rank all employees
- **GET** `/api/ai/department/:department` - Get recommendations by department
- **GET** `/api/ai/promotion-candidates` - Get promotion candidates

## API Request Examples

### 1. Signup

```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@company.com",
  "password": "password123",
  "role": "admin"
}
```

### 2. Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@company.com",
  "password": "password123"
}
```

### 3. Add Employee

```bash
POST /api/employees
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Aman Verma",
  "email": "aman@gmail.com",
  "department": "Development",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 85,
  "experience": 3
}
```

### 4. Search Employees

```bash
GET /api/employees/search?department=Development&minScore=80
Authorization: Bearer <token>
```

### 5. Get AI Recommendation

```bash
POST /api/ai/recommend/65a1b2c3d4e5f6g7h8i9j0k1
Authorization: Bearer <token>
```

### 6. Bulk Recommendations

```bash
POST /api/ai/bulk-recommend
Authorization: Bearer <token>
```

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin|hr|manager),
  createdAt: Date,
  updatedAt: Date
}
```

### Employee Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  department: String,
  skills: [String],
  performanceScore: Number (0-100),
  experience: Number,
  status: String (active|inactive|on-leave),
  aiRecommendations: {
    promotionSuggestion: String,
    trainingSuggestions: [String],
    skillGaps: [String],
    ranking: Number,
    feedback: String,
    generatedAt: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Testing

Run tests:

```bash
npm test
```

## Security Features

- ✅ JWT Authentication
- ✅ bcrypt Password Hashing
- ✅ Role-based Access Control (RBAC)
- ✅ Request validation using Joi
- ✅ Comprehensive error handling
- ✅ CORS protection
- ✅ Protected routes

## Key Features

- 🔐 User authentication and authorization
- 👥 Employee management (CRUD)
- 🔍 Advanced search and filtering
- 📊 Employee analytics and statistics
- 🤖 AI-powered recommendations using OpenRouter
- 📈 Employee ranking system
- 🎯 Promotion candidate identification
- 📝 Department-wise analysis

## Error Handling

All errors return standardized JSON responses:

```json
{
  "success": false,
  "message": "Error description",
  "details": []
}
```

## Next Steps

After backend setup:
1. Test all endpoints using Postman/Insomnia
2. Set up frontend React application
3. Integrate frontend with backend APIs
4. Deploy to production

## Support

For issues or questions, refer to the case study requirements document.
