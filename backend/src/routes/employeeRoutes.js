const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getAllEmployees,
  searchEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getAnalytics,
} = require('../controllers/employeeController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Employee CRUD operations
router.post('/', roleMiddleware(['admin', 'hr']), addEmployee);
router.get('/', getAllEmployees);
router.get('/search', searchEmployees);
router.get('/analytics', getAnalytics);
router.get('/:id', getEmployeeById);
router.put('/:id', roleMiddleware(['admin', 'hr']), updateEmployee);
router.delete('/:id', roleMiddleware(['admin']), deleteEmployee);

module.exports = router;
