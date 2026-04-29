const express = require('express');
const router = express.Router();
const { getRoutine, trackRoutine } = require('../controllers/routine.controller');
const authMiddleware = require('../middleware/auth.middleware');

// @route   GET /api/routine
// @desc    Get auto-generated personalized skincare routine
// @access  Private
router.get('/', authMiddleware, getRoutine);

// @route   POST /api/routine/track
// @desc    Track routine completion (AM or PM)
// @access  Private
router.post('/track', authMiddleware, trackRoutine);

module.exports = router;
