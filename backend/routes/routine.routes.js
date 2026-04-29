const express = require('express');
const router = express.Router();
const { getRoutine } = require('../controllers/routine.controller');
const authMiddleware = require('../middleware/auth.middleware');

// @route   GET /api/routine
// @desc    Get auto-generated personalized skincare routine
// @access  Private
router.get('/', authMiddleware, getRoutine);

module.exports = router;
