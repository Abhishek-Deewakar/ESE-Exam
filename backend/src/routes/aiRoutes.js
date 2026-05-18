const express = require('express');
const router = express.Router();
const {
  getAIRecommendation,
  generateBulkRecommendations,
  rankEmployees,
  getDepartmentRecommendations,
  getPromotionCandidates,
} = require('../controllers/aiController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// AI recommendation endpoints
router.post('/recommend/:employeeId', roleMiddleware(['admin', 'hr']), getAIRecommendation);
router.post('/bulk-recommend', roleMiddleware(['admin', 'hr']), generateBulkRecommendations);

// Rankings / analytics should also be role protected as per rubric
router.get('/rank/all', roleMiddleware(['admin', 'hr']), rankEmployees);
router.get('/department/:department', roleMiddleware(['admin', 'hr']), getDepartmentRecommendations);
router.get('/promotion-candidates', roleMiddleware(['admin', 'hr']), getPromotionCandidates);


module.exports = router;
