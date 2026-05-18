# Frontend Quick Start Guide

## ⚡ Fast Setup (2 minutes)

### 1. Dependencies Installed ✅
All packages are ready. You can verify with:
```bash
npm list
```

### 2. Start Development Server

```bash
npm run dev
```

Then open: `http://localhost:5173`

### 3. Backend Must Be Running

Make sure backend is running on `http://localhost:5000`:
```bash
# In another terminal, from backend folder
npm run dev
```

## 📋 Test the App

### Step 1: Register
- Go to http://localhost:5173/register
- Create a test account
- Select "HR" or "Admin" role
- Click Register

### Step 2: Add Employees
- Click "+ Add Employee"
- Fill in the form:
  - Name: John Doe
  - Email: john@test.com
  - Department: Development
  - Skills: React, Node.js, MongoDB
  - Performance Score: 85
  - Experience: 3
- Click "Add Employee"

### Step 3: View Employees
- Click "Employees" in navbar
- See your newly added employee
- Try search and filter options

### Step 4: Get AI Recommendations
- Click "AI Recommendations"
- Click "Load Recommendations" button
- View AI-generated insights for employees

### Step 5: Analytics
- Click "Analytics"
- View performance metrics
- See top performers
- Check department statistics

## 🔧 Key Files

### `src/services/api.js`
- All API endpoints
- Axios configuration
- JWT token management

### `src/context/AuthContext.jsx`
- Authentication state
- Login/Signup logic
- User management

### `src/pages/`
- All page components
- User interface

### `src/styles/`
- CSS files for styling
- Responsive design

## 🎯 Feature Checklist

✅ User authentication (Login/Register)
✅ Employee management (Add, View, Delete, Search)
✅ Search & Filter functionality
✅ AI recommendations (via backend)
✅ Analytics dashboard
✅ Responsive UI
✅ JWT token management
✅ Role-based access

## 📱 Responsive Design

The app is fully responsive:
- Desktop: Full featured
- Tablet: Optimized layout
- Mobile: Touch-friendly navigation

## 🐛 Common Issues

**"Cannot GET /api"**
- Backend not running
- Check port 5000 is accessible

**Login not working**
- Backend API not responding
- Check email/password
- Ensure backend is running

**Styles not loading**
- Check CSS files in `src/styles/`
- Clear browser cache (Ctrl+Shift+Delete)

## 📦 Build for Production

```bash
npm run build
```

Output goes to `dist/` folder

## 🚀 Deployment Ready

Frontend is ready to deploy to:
- Vercel
- Netlify  
- GitHub Pages
- AWS S3
- Any static hosting

Just run `npm run build` and upload the `dist` folder.
