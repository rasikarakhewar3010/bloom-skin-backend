const axios = require('axios');
const FormData = require('form-data');
const History = require('../models/history.model'); // ensure correct path
const https = require('https'); // for self-signed certs if needed

// ✅ Your deployed Python/Flask ML API URL
const PYTHON_API_URL = 'https://bloom-skin-ml-3.onrender.com/predict';

exports.handlePrediction = async (req, res) => {
  try {
    // ✅ Check authentication
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: Please log in first.' });
    }

    // ✅ Check for uploaded image
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'Image file is required.' });
    }

    const imageUrl = req.file.path;
    console.log(`✅ Image uploaded to Cloudinary: ${imageUrl}`);

    // ✅ Step 1: Download the image from Cloudinary
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      // Remove httpsAgent unless you have a self-signed cert
    });

    // ✅ Step 2: Prepare FormData for the Flask API
    const formData = new FormData();
    formData.append('image', imageResponse.data, {
      filename: 'image.jpg',
      contentType: 'image/jpeg',
    });

    console.log('✅ Forwarding image to Python ML service for prediction...');

    // ✅ Step 3: Forward to Flask ML API
    const predictionResponse = await axios.post(PYTHON_API_URL, formData, {
      headers: formData.getHeaders(),
      // timeout: 20000, // optional: add timeout if your model takes time
    });

    const { class: prediction, confidence, info } = predictionResponse.data;

    // ✅ Step 4: Save to user history
    const newHistoryItem = new History({
      user: req.user._id, // Ensure your user model uses `_id`
      imageUrl,
      prediction,
      confidence,
      info,
    });

    await newHistoryItem.save();
    console.log(`✅ Prediction saved to history for user: ${req.user.email}`);

    // ✅ Return prediction to frontend
    res.json(predictionResponse.data);

  } catch (error) {
    console.error('❌ Prediction error:', error.message);

    if (error.response) {
      console.error('❌ Error from Python service:', error.response.data);
      return res.status(error.response.status).json({
        error: 'ML Service Error',
        details: error.response.data,
      });
    }

    res.status(500).json({ error: 'Internal server error during prediction.' });
  }
};
