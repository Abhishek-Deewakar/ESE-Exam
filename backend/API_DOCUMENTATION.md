# Backend API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 1. AUTHENTICATION ENDPOINTS

### 1.1 User Signup

**Endpoint:** `POST /api/auth/signup`

**Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "hr"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "hr"
  }
}
```

**Test Command:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "role": "hr"
  }'
```

---

### 1.2 User Login

**Endpoint:** `POST /api/auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "hr"
  }
}
```

**Test Command:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

### 1.3 Get User Profile

**Endpoint:** `GET /api/auth/profile`

**Access:** Protected (Requires JWT token)

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "hr",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Test Command:**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## 2. EMPLOYEE ENDPOINTS

### 2.1 Add Employee

**Endpoint:** `POST /api/employees`

**Access:** Protected - Requires HR or Admin role

**Request Body:**
```json
{
  "name": "Aman Verma",
  "email": "aman@gmail.com",
  "department": "Development",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 85,
  "experience": 3,
  "status": "active"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Employee added successfully",
  "employee": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "name": "Aman Verma",
    "email": "aman@gmail.com",
    "department": "Development",
    "skills": ["React", "Node.js", "MongoDB"],
    "performanceScore": 85,
    "experience": 3,
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Test Command:**
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "name": "Aman Verma",
    "email": "aman@gmail.com",
    "department": "Development",
    "skills": ["React", "Node.js", "MongoDB"],
    "performanceScore": 85,
    "experience": 3
  }'
```

---

### 2.2 Get All Employees

**Endpoint:** `GET /api/employees`

**Access:** Protected

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)

**Response (200):**
```json
{
  "success": true,
  "total": 5,
  "page": 1,
  "pages": 1,
  "employees": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Aman Verma",
      "email": "aman@gmail.com",
      "department": "Development",
      "skills": ["React", "Node.js", "MongoDB"],
      "performanceScore": 85,
      "experience": 3,
      "status": "active",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Test Command:**
```bash
curl -X GET "http://localhost:5000/api/employees?page=1&limit=10" \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### 2.3 Search Employees

**Endpoint:** `GET /api/employees/search`

**Access:** Protected

**Query Parameters:**
- `department` - Filter by department
- `name` - Filter by name (case-insensitive)
- `minScore` - Minimum performance score
- `maxScore` - Maximum performance score
- `experience` - Minimum years of experience

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "employees": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Aman Verma",
      "email": "aman@gmail.com",
      "department": "Development",
      "performanceScore": 85,
      "experience": 3
    }
  ]
}
```

**Test Command:**
```bash
curl -X GET "http://localhost:5000/api/employees/search?department=Development&minScore=80" \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### 2.4 Get Employee Analytics

**Endpoint:** `GET /api/employees/analytics`

**Access:** Protected

**Response (200):**
```json
{
  "success": true,
  "analytics": {
    "totalEmployees": 5,
    "performanceStats": {
      "avgScore": 82.4,
      "maxScore": 95,
      "minScore": 65
    },
    "departmentStats": [
      {
        "_id": "Development",
        "count": 3,
        "avgPerformance": 85
      }
    ],
    "topPerformers": [
      {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "name": "Aman Verma",
        "performanceScore": 85
      }
    ]
  }
}
```

**Test Command:**
```bash
curl -X GET http://localhost:5000/api/employees/analytics \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### 2.5 Get Employee by ID

**Endpoint:** `GET /api/employees/:id`

**Access:** Protected

**Response (200):**
```json
{
  "success": true,
  "employee": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "name": "Aman Verma",
    "email": "aman@gmail.com",
    "department": "Development",
    "skills": ["React", "Node.js", "MongoDB"],
    "performanceScore": 85,
    "experience": 3,
    "status": "active",
    "aiRecommendations": {
      "promotionSuggestion": "Yes, recommended for promotion",
      "trainingSuggestions": ["Advanced React", "System Design"],
      "skillGaps": ["DevOps", "Cloud Architecture"],
      "ranking": 1,
      "generatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Test Command:**
```bash
curl -X GET http://localhost:5000/api/employees/65a1b2c3d4e5f6g7h8i9j0k2 \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### 2.6 Update Employee

**Endpoint:** `PUT /api/employees/:id`

**Access:** Protected - Requires HR or Admin role

**Request Body:**
```json
{
  "name": "Aman Verma Updated",
  "performanceScore": 90,
  "skills": ["React", "Node.js", "MongoDB", "Docker"]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "employee": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "name": "Aman Verma Updated",
    "performanceScore": 90,
    "skills": ["React", "Node.js", "MongoDB", "Docker"]
  }
}
```

**Test Command:**
```bash
curl -X PUT http://localhost:5000/api/employees/65a1b2c3d4e5f6g7h8i9j0k2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "performanceScore": 90
  }'
```

---

### 2.7 Delete Employee

**Endpoint:** `DELETE /api/employees/:id`

**Access:** Protected - Requires Admin role

**Response (200):**
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

**Test Command:**
```bash
curl -X DELETE http://localhost:5000/api/employees/65a1b2c3d4e5f6g7h8i9j0k2 \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## 3. AI ENDPOINTS

### 3.1 Get AI Recommendation for Single Employee

**Endpoint:** `POST /api/ai/recommend/:employeeId`

**Access:** Protected - Requires HR or Admin role

**Response (200):**
```json
{
  "success": true,
  "message": "AI recommendation generated successfully",
  "recommendation": {
    "promotionSuggestion": "Yes, ready for senior position",
    "trainingSuggestions": [
      "Advanced React patterns",
      "System design and architecture",
      "Team leadership skills"
    ],
    "skillGaps": [
      "Cloud architecture",
      "DevOps practices",
      "Kubernetes"
    ],
    "feedback": "Strong technical performer with good potential for leadership roles",
    "generatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**Test Command:**
```bash
curl -X POST http://localhost:5000/api/ai/recommend/65a1b2c3d4e5f6g7h8i9j0k2 \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### 3.2 Generate Bulk Recommendations

**Endpoint:** `POST /api/ai/bulk-recommend`

**Access:** Protected - Requires HR or Admin role

**Response (200):**
```json
{
  "success": true,
  "message": "AI recommendations generated for 5 employees",
  "recommendations": [
    {
      "employeeId": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Aman Verma",
      "recommendation": {
        "promotionSuggestion": "Yes",
        "trainingSuggestions": ["Advanced React", "System Design"],
        "skillGaps": ["DevOps"],
        "generatedAt": "2024-01-15T10:30:00Z"
      }
    }
  ]
}
```

**Test Command:**
```bash
curl -X POST http://localhost:5000/api/ai/bulk-recommend \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### 3.3 Rank All Employees

**Endpoint:** `GET /api/ai/rank/all`

**Access:** Protected

**Response (200):**
```json
{
  "success": true,
  "message": "Employee ranking generated successfully",
  "totalEmployees": 5,
  "ranking": [
    {
      "rank": 1,
      "employeeId": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Aman Verma",
      "performanceScore": 95,
      "experience": 5
    },
    {
      "rank": 2,
      "employeeId": "65a1b2c3d4e5f6g7h8i9j0k3",
      "name": "Priya Singh",
      "performanceScore": 88,
      "experience": 4
    }
  ],
  "aiAnalysis": "Ranking based on performance score, experience, skills, and growth potential..."
}
```

**Test Command:**
```bash
curl -X GET http://localhost:5000/api/ai/rank/all \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### 3.4 Get Department Recommendations

**Endpoint:** `GET /api/ai/department/:department`

**Access:** Protected

**URL Parameters:**
- `department` - Department name (Development, HR, Sales, Marketing, Operations, Finance)

**Response (200):**
```json
{
  "success": true,
  "department": "Development",
  "totalEmployees": 3,
  "recommendations": [
    {
      "employeeId": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Aman Verma",
      "performanceScore": 85,
      "recommendation": {
        "promotionSuggestion": "Yes",
        "trainingSuggestions": ["Advanced React", "System Design"],
        "skillGaps": ["DevOps"]
      }
    }
  ]
}
```

**Test Command:**
```bash
curl -X GET http://localhost:5000/api/ai/department/Development \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

### 3.5 Get Promotion Candidates

**Endpoint:** `GET /api/ai/promotion-candidates`

**Access:** Protected

**Query Parameters:**
- `minScore` (default: 80) - Minimum performance score for promotion consideration

**Response (200):**
```json
{
  "success": true,
  "minScore": 80,
  "totalCandidates": 2,
  "candidates": [
    {
      "employeeId": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Aman Verma",
      "department": "Development",
      "performanceScore": 85,
      "experience": 3,
      "promotionRecommendation": "Yes, ready for senior position"
    }
  ]
}
```

**Test Command:**
```bash
curl -X GET "http://localhost:5000/api/ai/promotion-candidates?minScore=80" \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "\"email\" must be a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Token is not valid"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access forbidden. Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Employee not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Testing Workflow

### 1. Create an Admin User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@company.com",
    "password": "Admin123!",
    "role": "admin"
  }'
```

Save the returned token.

### 2. Add Employees
```bash
# Use the token from step 1
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Aman Verma",
    "email": "aman@gmail.com",
    "department": "Development",
    "skills": ["React", "Node.js"],
    "performanceScore": 85,
    "experience": 3
  }'
```

### 3. Get All Employees
```bash
curl -X GET http://localhost:5000/api/employees \
  -H "Authorization: Bearer <token>"
```

### 4. Generate AI Recommendations
```bash
# First copy the employee ID from the list
curl -X POST http://localhost:5000/api/ai/recommend/<employee_id> \
  -H "Authorization: Bearer <token>"
```

### 5. Get Rankings
```bash
curl -X GET http://localhost:5000/api/ai/rank/all \
  -H "Authorization: Bearer <token>"
```

---

## Notes

- All timestamps are in ISO 8601 format
- JWT tokens expire in 7 days
- Performance scores must be between 0-100
- Department must be one of: Development, HR, Sales, Marketing, Operations, Finance
- Status must be one of: active, inactive, on-leave
- Role must be one of: admin, hr, manager
