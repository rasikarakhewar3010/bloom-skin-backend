const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendation.controller');
const authMiddleware = require('../middleware/auth.middleware');

// @route   GET /api/recommendations
// @desc    Get personalized skincare recommendations based on history
// @access  Private
router.get('/', authMiddleware, getRecommendations);

module.exports = router;
