/**
 * =================================================================
 *  RATE LIMITER MIDDLEWARE
 *  Protects against brute-force attacks, credential stuffing,
 *  and API abuse by limiting request rates per IP address.
 * =================================================================
 */

const rateLimit = require('express-rate-limit');

/**
 * Auth Limiter — Strict limit for login/register endpoints.
 * Prevents brute-force password attacks.
 */
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute window
  max: 15,                   // Max 15 attempts per window
  standardHeaders: true,     // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,      // Disable `X-RateLimit-*` headers
  message: { error: 'Too many authentication attempts. Please try again in 15 minutes.' },
});

/**
 * API Limiter — General purpose limit for standard API endpoints.
 */
exports.apiLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1-minute window
  max: 60,              // Max 60 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Rate limit exceeded. Please slow down.' },
});

/**
 * Upload Limiter — Strict limit for image upload / ML prediction.
 * Prevents flooding the ML service.
 */
exports.uploadLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1-minute window
  max: 5,               // Max 5 scans per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many scan requests. Please wait a moment before trying again.' },
});

/**
 * Export Limiter — Prevents email bombing via the history export feature.
 */
exports.exportLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1-hour window
  max: 3,                    // Max 3 exports per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Export limit reached. You can export again in an hour.' },
});
