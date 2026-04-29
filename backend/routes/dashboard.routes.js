const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboard.controller');
const authMiddleware = require('../middleware/auth.middleware');

// @route   GET /api/dashboard/stats
// @desc    Get aggregated dashboard stats (Bloom Score, timeline, charts)
// @access  Private
router.get('/stats', authMiddleware, getDashboardStats);

module.exports = router;
