# Employee Performance Analytics - Project Files Index

## 📌 Start Here
- **SETUP_GUIDE.md** - Complete setup and project overview (READ THIS FIRST!)

---

## 📂 Backend Files

### Entry Point & Server
- `backend/src/server.js` - Express app setup, middleware, routes configuration

### Configuration
- `backend/src/config/db.js` - MongoDB connection
- `backend/.env` - Environment variables (configure this!)
- `backend/.gitignore` - Git ignore rules

### Database Models
- `backend/src/models/User.js` - User schema with authentication
- `backend/src/models/Employee.js` - Employee schema with AI fields

### API Controllers
- `backend/src/controllers/authController.js` - Login, signup, profile logic
- `backend/src/controllers/employeeController.js` - Employee CRUD operations
- `backend/src/controllers/aiController.js` - AI recommendations logic

### Routes
- `backend/src/routes/authRoutes.js` - Authentication endpoints
- `backend/src/routes/employeeRoutes.js` - Employee endpoints
- `backend/src/routes/aiRoutes.js` - AI recommendation endpoints

### Middleware
- `backend/src/middleware/authMiddleware.js` - JWT verification & role checking
- `backend/src/middleware/validationMiddleware.js` - Input validation with Joi
- `backend/src/middleware/errorHandler.js` - Global error handling

### Utilities
- `backend/src/utils/aiService.js` - OpenRouter API integration

### Backend Documentation
- `backend/README.md` - Backend documentation
- `backend/API_DOCUMENTATION.md` - Complete API reference with curl examples
- `backend/QUICK_START.md` - Quick backend setup instructions

### Backend Configuration
- `backend/package.json` - Dependencies and scripts
- `backend/package-lock.json` - Dependency lock file
- `backend/node_modules/` - Installed packages

---

## 🎨 Frontend Files

### Components
- `frontend/src/components/Navigation.jsx` - Top navigation bar

### Context & State
- `frontend/src/context/AuthContext.jsx` - Global auth state management

### Pages
- `frontend/src/pages/LoginPage.jsx` - User login
- `frontend/src/pages/RegisterPage.jsx` - User registration
- `frontend/src/pages/EmployeeListPage.jsx` - Employee management
- `frontend/src/pages/AddEmployeePage.jsx` - Add new employee form
- `frontend/src/pages/AIRecommendationsPage.jsx` - AI insights display
- `frontend/src/pages/AnalyticsPage.jsx` - Analytics dashboard

### Services
- `frontend/src/services/api.js` - Axios client & API endpoints

### Styles
- `frontend/src/App.css` - (Customized for app layout)
- `frontend/src/index.css` - Base styles
- `frontend/src/styles/GlobalStyles.css` - Global CSS variables & base styles
- `frontend/src/styles/Navigation.css` - Navigation styling
- `frontend/src/styles/AuthPages.css` - Login/Register styling
- `frontend/src/styles/Pages.css` - Page component styling

### Main Entry Points
- `frontend/src/App.jsx` - Main app component with routing
- `frontend/src/main.jsx` - React DOM entry point
- `frontend/index.html` - HTML template

### Frontend Documentation
- `frontend/README.md` - Frontend documentation
- `frontend/QUICK_START.md` - Quick frontend setup
- `frontend/node_modules/` - Installed packages

### Frontend Configuration
- `frontend/package.json` - Dependencies and scripts
- `frontend/package-lock.json` - Dependency lock file
- `frontend/vite.config.js` - Vite configuration
- `frontend/.gitignore` - Git ignore rules
- `frontend/eslint.config.js` - ESLint configuration
- `frontend/public/` - Static assets

---

## 📊 Database Schema Files

The actual database schemas are defined in:
- `backend/src/models/User.js` - User/Admin schema
- `backend/src/models/Employee.js` - Employee data schema

These files define:
- Field names and types
- Validation rules
- Default values
- Indexes for optimization
- Pre-save hooks for password hashing

---

## 🔐 Authentication Files

Files responsible for authentication:
- `backend/src/controllers/authController.js` - Auth logic
- `backend/src/middleware/authMiddleware.js` - JWT verification
- `backend/src/models/User.js` - User model with password methods
- `frontend/src/context/AuthContext.jsx` - Frontend auth state

---

## 🤖 AI Integration Files

Files for AI functionality:
- `backend/src/utils/aiService.js` - OpenRouter API wrapper
- `backend/src/controllers/aiController.js` - AI endpoints logic
- `backend/src/routes/aiRoutes.js` - AI API routes
- `frontend/src/pages/AIRecommendationsPage.jsx` - AI display

---

## 📝 Documentation Files

- **SETUP_GUIDE.md** - Main setup guide (START HERE)
- **backend/README.md** - Backend overview
- **backend/QUICK_START.md** - Backend quick setup
- **backend/API_DOCUMENTATION.md** - API reference with examples
- **frontend/README.md** - Frontend overview
- **frontend/QUICK_START.md** - Frontend quick setup

---

## 🗂️ File Organization by Feature

### User Management
- `backend/src/models/User.js`
- `backend/src/controllers/authController.js`
- `backend/src/routes/authRoutes.js`
- `frontend/src/pages/LoginPage.jsx`
- `frontend/src/pages/RegisterPage.jsx`

### Employee Management
- `backend/src/models/Employee.js`
- `backend/src/controllers/employeeController.js`
- `backend/src/routes/employeeRoutes.js`
- `frontend/src/pages/EmployeeListPage.jsx`
- `frontend/src/pages/AddEmployeePage.jsx`

### AI Features
- `backend/src/utils/aiService.js`
- `backend/src/controllers/aiController.js`
- `backend/src/routes/aiRoutes.js`
- `frontend/src/pages/AIRecommendationsPage.jsx`

### Analytics
- `backend/src/controllers/employeeController.js` (getAnalytics)
- `frontend/src/pages/AnalyticsPage.jsx`

### Security
- `backend/src/middleware/authMiddleware.js`
- `backend/src/middleware/errorHandler.js`
- `backend/src/models/User.js` (password hashing)
- `frontend/src/context/AuthContext.jsx`

---

## 📦 Dependencies

### Backend (in `backend/package.json`)
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT tokens
- dotenv - Environment variables
- cors - Cross-origin requests
- joi - Input validation
- axios - HTTP client

### Frontend (in `frontend/package.json`)
- react - UI library
- react-dom - React rendering
- react-router-dom - Routing
- axios - HTTP client

---

## 🚀 Quick Navigation

### To Start Backend
1. Edit `backend/.env`
2. Start MongoDB
3. Run `cd backend && npm run dev`
4. Check `backend/QUICK_START.md`

### To Start Frontend
1. Run `cd frontend && npm run dev`
2. Open http://localhost:5173
3. Check `frontend/QUICK_START.md`

### To View API Docs
- Read `backend/API_DOCUMENTATION.md`

### To Understand Architecture
- Read `SETUP_GUIDE.md`

### To Deploy
1. Read deployment section in `SETUP_GUIDE.md`
2. Build backend and frontend
3. Deploy to cloud platform

---

## 📋 File Checklist

### Backend ✅
- [x] Configuration files
- [x] Models (User, Employee)
- [x] Controllers (Auth, Employee, AI)
- [x] Routes (Auth, Employee, AI)
- [x] Middleware (Auth, Validation, Error)
- [x] Utils (AI Service)
- [x] Main server file
- [x] Documentation

### Frontend ✅
- [x] Components (Navigation)
- [x] Context (Auth)
- [x] Pages (5 pages)
- [x] Services (API)
- [x] Styles (4 CSS files)
- [x] Main app and entry point
- [x] Documentation

### Documentation ✅
- [x] Setup guide
- [x] Backend README
- [x] Frontend README
- [x] API documentation
- [x] Quick start guides
- [x] This index file

---

## 🎯 What Each File Does

### Critical Files (Must Have)
1. `backend/src/server.js` - Starts the backend
2. `backend/src/config/db.js` - Connects to database
3. `frontend/src/App.jsx` - Main frontend app
4. `frontend/src/main.jsx` - Frontend entry point
5. `backend/.env` - Configuration (YOU MUST UPDATE THIS)

### Important Logic Files
1. `backend/src/middleware/authMiddleware.js` - JWT verification
2. `backend/src/utils/aiService.js` - AI API calls
3. `frontend/src/context/AuthContext.jsx` - Auth state
4. `frontend/src/services/api.js` - API client

### Styling Files
1. `frontend/src/styles/GlobalStyles.css` - Base styles
2. `frontend/src/styles/Pages.css` - Page styles
3. `frontend/src/styles/Navigation.css` - Nav styles
4. `frontend/src/styles/AuthPages.css` - Auth styles

---

## 💡 Tips

- All backend files use ES6 modules
- All frontend files use JSX
- CSS is vanilla CSS (no preprocessor)
- No external UI library (built custom)
- Comments explain complex logic
- Error handling is comprehensive

---

## 📞 File Support

If you have issues:
1. Check the relevant documentation file
2. Look at the error in that file
3. Review the inline comments
4. Check SETUP_GUIDE.md troubleshooting section

---

## ✨ Next Steps

1. **Read** `SETUP_GUIDE.md` - Complete understanding
2. **Configure** `backend/.env` - Add your API keys
3. **Start** Backend - Run `npm run dev`
4. **Start** Frontend - Run `npm run dev`
5. **Test** - Follow SETUP_GUIDE.md testing section
6. **Deploy** - Follow deployment instructions

---

*All files created and ready to use!*
*Last Updated: May 18, 2026*
