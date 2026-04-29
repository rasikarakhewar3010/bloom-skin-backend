const express = require('express');
const router = express.Router();
const { handlePrediction } = require('../controllers/prediction.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../config/cloudinary.config');
const { uploadLimiter } = require('../middleware/rateLimiter');

/**
 * @route   POST /api/predict
 * @desc    Receives an image, authenticates the user, uploads the image,
 *          gets a prediction from the AI service, saves the result, and returns it.
 * @access  Private (authenticated + rate-limited)
 */
router.post('/', authMiddleware, uploadLimiter, upload.single('image'), handlePrediction);

module.exports = router;