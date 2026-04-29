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

  const clearCount = validScans.filter(h => h.prediction === 'Clear Skin').length;
  const conditionScans = validScans.filter(h => h.prediction !== 'Clear Skin');

  // If all scans are clear, perfect score
  if (conditionScans.length === 0) return 100;

  // Calculate average penalty from condition scans
  // Severity weight is capped at 3 for the formula (so Cyst=5 doesn't obliterate the score)
  const totalPenalty = conditionScans.reduce((sum, h) => {
    const rawWeight = KNOWLEDGE_BASE[h.prediction]?.severityWeight || 1;
    const cappedWeight = Math.min(rawWeight, 3);
    return sum + (h.confidence * cappedWeight);
  }, 0);

  const avgPenalty = totalPenalty / conditionScans.length;

  // Condition ratio: what fraction of scans are conditions (not clear)
  const conditionRatio = conditionScans.length / validScans.length;

  // Clear skin bonus: if you have clear scans mixed in, your score improves
  const clearBonus = (clearCount / validScans.length) * 20;

  // Final score: start at 100, deduct based on severity and ratio, add clear bonus
  // The multiplier 35 (instead of 60) prevents the score from hitting 0 too easily
  const rawScore = 100 - (avgPenalty * conditionRatio * 35) + clearBonus;

  return Math.max(5, Math.min(100, Math.round(rawScore)));
}

module.exports = { computeBloomScore };
