const express = require('express');
const router = express.Router();
const { getHistory, deleteHistory, exportHistory } = require('../controllers/history.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { exportLimiter } = require('../middleware/rateLimiter');

// @route   GET /api/history
// @desc    Get user's prediction history
// @access  Private
router.get('/', authMiddleware, getHistory);

// @route   DELETE /api/history
// @desc    Delete all of a user's history
// @access  Private
router.delete('/', authMiddleware, deleteHistory);

// @route   POST /api/history/export
// @desc    Export history to user's email (rate-limited to prevent email bombing)
// @access  Private
router.post('/export', authMiddleware, exportLimiter, exportHistory);

module.exports = router;