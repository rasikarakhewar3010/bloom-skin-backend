/**
 * =================================================================
 *  BLOOM SCORE CALCULATOR — Shared Module
 *  Single source of truth for Bloom Score computation.
 *  Used by both Dashboard and Recommendation controllers.
 * =================================================================
 */

const { KNOWLEDGE_BASE } = require('../data/recommendationKnowledgeBase');

/**
 * Computes a Bloom Score (0-100) from a user's scan history.
 * 
 * Algorithm:
 *   1. Clear skin scans contribute positively (boost).
 *   2. Condition scans penalize based on severity weight × confidence.
 *   3. The score is anchored at 100 and deducted proportionally.
 *   4. Recency bias: recent clear scans count more than old ones.
 * 
 * @param {Array} history - Array of scan history entries from MongoDB.
 * @returns {number} Bloom Score between 0 and 100.
 */
function computeBloomScore(history) {
  if (!history || history.length === 0) return 100;

  const validScans = history.filter(h => h.prediction !== 'Invalid Image');
  if (validScans.length === 0) return 100;

  // Smoothing Algorithm:
  // Instead of the whole history, we focus on the last 3 scans to reflect "Current Health".
  // We use a weighted average so the newest scan counts most, but is buffered by the previous two.
  
  // Scans are sorted by date in the history array (check dashboard controller sorting)
  // Dashboard controller sorts by createdAt: 1 (oldest first).
  // Let's get the newest ones.
  const sortedNewest = [...validScans].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recentScans = sortedNewest.slice(0, 3);
  
  const scanScores = recentScans.map(scan => {
    if (scan.prediction === 'Clear Skin') return 100;
    const weight = KNOWLEDGE_BASE[scan.prediction]?.severityWeight || 1;
    // Each individual scan score formula: 100 - (confidence * weight * 12)
    // 12 is a scaling factor to keep scores in a realistic range (60-95 for mild/moderate)
    return Math.max(10, 100 - (scan.confidence * weight * 12));
  });

  // Weights for smoothing: Newest (50%), Previous (30%), Older (20%)
  const weights = [0.5, 0.3, 0.2];
  let weightedSum = 0;
  let activeWeightSum = 0;

  scanScores.forEach((score, i) => {
    weightedSum += score * weights[i];
    activeWeightSum += weights[i];
  });

  const smoothedScore = Math.round(weightedSum / activeWeightSum);
  
  return Math.max(5, Math.min(100, smoothedScore));
}

module.exports = { computeBloomScore };
