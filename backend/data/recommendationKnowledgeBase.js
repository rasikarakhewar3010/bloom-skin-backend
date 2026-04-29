/**
 * =================================================================
 *  RECOMMENDATION KNOWLEDGE BASE
 *  Curated skincare knowledge mapped to detectable conditions.
 *  Each condition maps to products, ingredients, and routines
 *  with priority scores for weighted recommendation ranking.
 * =================================================================
 */

const KNOWLEDGE_BASE = {
  Blackheads: {
    description: 'Open comedones caused by clogged pores with oxidized sebum.',
    category: 'comedonal',
    severityWeight: 1,
    ingredients: [
      { name: 'Salicylic Acid (BHA)', benefit: 'Penetrates pores to dissolve sebum plugs', priority: 10 },
      { name: 'Niacinamide', benefit: 'Regulates oil production and minimizes pores', priority: 9 },
      { name: 'Retinol', benefit: 'Increases cell turnover to prevent clogging', priority: 8 },
      { name: 'Clay (Kaolin/Bentonite)', benefit: 'Absorbs excess oil from skin surface', priority: 7 },
      { name: 'AHA (Glycolic Acid)', benefit: 'Exfoliates surface dead skin cells', priority: 6 },
    ],
    products: [
      { type: 'Cleanser', suggestion: 'Salicylic Acid Face Wash (2%)', usage: 'Twice daily, morning and night', priority: 10 },
      { type: 'Exfoliant', suggestion: 'BHA Liquid Exfoliant', usage: '2-3 times per week at night', priority: 9 },
      { type: 'Mask', suggestion: 'Clay Mask with Kaolin', usage: 'Once a week', priority: 7 },
      { type: 'Moisturizer', suggestion: 'Oil-Free Gel Moisturizer with Niacinamide', usage: 'Twice daily after cleansing', priority: 8 },
      { type: 'Sunscreen', suggestion: 'Lightweight SPF 50 Non-Comedogenic', usage: 'Every morning, reapply every 2 hours', priority: 10 },
    ],
    tips: [
      'Never squeeze blackheads — it can cause scarring and push bacteria deeper.',
      'Use non-comedogenic products to prevent further clogging.',
      'Double cleanse at night if you wear makeup or sunscreen.',
      'Change pillowcases frequently to reduce oil transfer.',
    ],
    avoidIngredients: ['Heavy mineral oils', 'Coconut oil', 'Isopropyl myristate'],
  },

  Whiteheads: {
    description: 'Closed comedones trapped under the skin surface.',
    category: 'comedonal',
    severityWeight: 1,
    ingredients: [
      { name: 'Retinoid (Adapalene)', benefit: 'Unclogs pores and prevents new comedones', priority: 10 },
      { name: 'Salicylic Acid', benefit: 'Dissolves pore-clogging debris', priority: 9 },
      { name: 'Azelaic Acid', benefit: 'Reduces inflammation and unclogs pores', priority: 8 },
      { name: 'Niacinamide', benefit: 'Controls sebum and strengthens skin barrier', priority: 7 },
      { name: 'Zinc', benefit: 'Anti-inflammatory and oil-regulating', priority: 6 },
    ],
    products: [
      { type: 'Treatment', suggestion: 'Adapalene Gel 0.1%', usage: 'At night, start 3x per week', priority: 10 },
      { type: 'Cleanser', suggestion: 'Gentle Foaming Cleanser with Salicylic Acid', usage: 'Morning and night', priority: 9 },
      { type: 'Serum', suggestion: 'Niacinamide 10% + Zinc 1% Serum', usage: 'Morning, before moisturizer', priority: 8 },
      { type: 'Moisturizer', suggestion: 'Lightweight Hydrating Gel', usage: 'After treatment, morning and night', priority: 7 },
      { type: 'Sunscreen', suggestion: 'Mineral SPF 30+ Sunscreen', usage: 'Every morning', priority: 10 },
    ],
    tips: [
      'Be patient — retinoids take 8-12 weeks to show full results.',
      'Start retinoids slowly to avoid irritation (purging is normal).',
      'Avoid touching your face throughout the day.',
      'Keep skin hydrated even if oily — dehydration worsens whiteheads.',
    ],
    avoidIngredients: ['Heavy silicones', 'Cocoa butter', 'Petroleum-based products'],
  },

  Papules: {
    description: 'Small, inflamed red bumps without pus — early inflammatory acne.',
    category: 'inflammatory',
    severityWeight: 2,
    ingredients: [
      { name: 'Benzoyl Peroxide (2.5-5%)', benefit: 'Kills acne-causing bacteria on contact', priority: 10 },
      { name: 'Niacinamide', benefit: 'Calms redness and inflammation', priority: 9 },
      { name: 'Centella Asiatica', benefit: 'Soothes irritated skin and promotes healing', priority: 8 },
      { name: 'Azelaic Acid', benefit: 'Anti-inflammatory and antibacterial', priority: 8 },
      { name: 'Green Tea Extract', benefit: 'Antioxidant that reduces inflammation', priority: 6 },
    ],
    products: [
      { type: 'Spot Treatment', suggestion: 'Benzoyl Peroxide 2.5% Gel', usage: 'On affected areas at night', priority: 10 },
      { type: 'Cleanser', suggestion: 'Gentle Non-Foaming Cleanser', usage: 'Morning and night', priority: 9 },
      { type: 'Serum', suggestion: 'Centella Asiatica Recovery Serum', usage: 'After cleansing, morning', priority: 8 },
      { type: 'Moisturizer', suggestion: 'Soothing Barrier Repair Cream', usage: 'Morning and night', priority: 8 },
      { type: 'Sunscreen', suggestion: 'Gentle Mineral Sunscreen SPF 50', usage: 'Every morning', priority: 10 },
    ],
    tips: [
      'Do NOT pop or squeeze papules — they have no head and will scar.',
      'Use anti-inflammatory ingredients to calm the skin.',
      'Reduce sugar and dairy intake — they can trigger inflammation.',
      'Ice the area for 1-2 minutes to reduce swelling.',
    ],
    avoidIngredients: ['Alcohol-based toners', 'Harsh scrubs', 'Fragrance'],
  },

  Pustules: {
    description: 'Inflamed pimples with visible white/yellow pus center — bacterial acne.',
    category: 'inflammatory',
    severityWeight: 3,
    ingredients: [
      { name: 'Benzoyl Peroxide (5%)', benefit: 'Kills P. acnes bacteria effectively', priority: 10 },
      { name: 'Salicylic Acid', benefit: 'Clears pores and reduces inflammation', priority: 9 },
      { name: 'Tea Tree Oil', benefit: 'Natural antibacterial agent', priority: 7 },
      { name: 'Sulfur', benefit: 'Dries out pimples and reduces bacteria', priority: 7 },
      { name: 'Niacinamide', benefit: 'Reduces redness and post-inflammatory marks', priority: 8 },
    ],
    products: [
      { type: 'Spot Treatment', suggestion: 'Benzoyl Peroxide 5% Cream', usage: 'Directly on pustules at night', priority: 10 },
      { type: 'Cleanser', suggestion: 'Medicated Acne Cleanser with Salicylic Acid', usage: 'Morning and night', priority: 9 },
      { type: 'Serum', suggestion: 'Niacinamide + Zinc Serum', usage: 'Morning, on clean skin', priority: 8 },
      { type: 'Moisturizer', suggestion: 'Oil-Free Hydrating Lotion', usage: 'After serum, morning and night', priority: 7 },
      { type: 'Sunscreen', suggestion: 'Non-Comedogenic SPF 50', usage: 'Every morning', priority: 10 },
      { type: 'Mask', suggestion: 'Sulfur-Based Drying Mask', usage: 'Once a week on affected areas', priority: 6 },
    ],
    tips: [
      'If you must extract, use a sterilized comedone extractor — never your fingers.',
      'Wash hands before touching your face.',
      'Change your towel and pillowcase frequently.',
      'Consider consulting a dermatologist if pustules are widespread.',
    ],
    avoidIngredients: ['Heavy oils', 'Fragrance', 'Sodium Lauryl Sulfate'],
  },

  Cyst: {
    description: 'Deep, painful, infected nodules under the skin — severe inflammatory acne.',
    category: 'inflammatory',
    severityWeight: 5,
    ingredients: [
      { name: 'Benzoyl Peroxide (5-10%)', benefit: 'Penetrates deep to kill bacteria', priority: 10 },
      { name: 'Retinoid (Tretinoin)', benefit: 'Prevents cyst formation by unclogging deep pores', priority: 10 },
      { name: 'Niacinamide', benefit: 'Reduces inflammation and hyperpigmentation', priority: 8 },
      { name: 'Azelaic Acid', benefit: 'Anti-inflammatory for deep acne', priority: 8 },
      { name: 'Zinc Supplements', benefit: 'Internal anti-inflammatory support', priority: 7 },
    ],
    products: [
      { type: 'Treatment', suggestion: 'Prescription Retinoid (consult dermatologist)', usage: 'Nightly as prescribed', priority: 10 },
      { type: 'Spot Treatment', suggestion: 'Benzoyl Peroxide 5% + Hydrocortisone', usage: 'On cysts, morning and night', priority: 9 },
      { type: 'Cleanser', suggestion: 'Gentle pH-Balanced Cleanser', usage: 'Morning and night — DO NOT scrub', priority: 9 },
      { type: 'Serum', suggestion: 'Azelaic Acid 10% Serum', usage: 'Nightly after cleansing', priority: 8 },
      { type: 'Moisturizer', suggestion: 'Ceramide Barrier Repair Moisturizer', usage: 'Morning and night', priority: 8 },
      { type: 'Sunscreen', suggestion: 'Broad Spectrum SPF 50+', usage: 'Every morning — crucial with retinoids', priority: 10 },
    ],
    tips: [
      '⚠️ NEVER squeeze cystic acne — it will cause deep scarring.',
      'See a dermatologist — cystic acne often needs prescription treatment.',
      'Apply warm compress for 10-15 minutes to reduce pain and swelling.',
      'Consider hormonal factors — hormonal acne often presents as cysts.',
      'Maintain consistent routine — cystic acne takes 3-6 months to improve.',
    ],
    avoidIngredients: ['Harsh physical scrubs', 'Alcohol-heavy products', 'DIY remedies like toothpaste or lemon'],
  },

  'Clear Skin': {
    description: 'No significant skin conditions detected — maintenance mode.',
    category: 'healthy',
    severityWeight: 0,
    ingredients: [
      { name: 'Vitamin C', benefit: 'Brightens skin and provides antioxidant protection', priority: 9 },
      { name: 'Hyaluronic Acid', benefit: 'Deep hydration for plump, healthy skin', priority: 9 },
      { name: 'SPF Protection', benefit: 'Prevents premature aging and sun damage', priority: 10 },
      { name: 'Ceramides', benefit: 'Maintains strong skin barrier', priority: 8 },
      { name: 'Peptides', benefit: 'Supports collagen production', priority: 7 },
    ],
    products: [
      { type: 'Serum', suggestion: 'Vitamin C 15% Brightening Serum', usage: 'Every morning before moisturizer', priority: 9 },
      { type: 'Moisturizer', suggestion: 'Hydrating Cream with Ceramides + HA', usage: 'Morning and night', priority: 8 },
      { type: 'Sunscreen', suggestion: 'Daily UV Protection SPF 50', usage: 'Every morning, rain or shine', priority: 10 },
      { type: 'Cleanser', suggestion: 'Gentle Hydrating Cleanser', usage: 'Morning and night', priority: 8 },
    ],
    tips: [
      'Great job maintaining healthy skin! Keep up your current routine.',
      'Focus on prevention — sunscreen is your #1 anti-aging tool.',
      'Stay hydrated and get adequate sleep for skin cell renewal.',
      'Consider periodic facials for deeper maintenance.',
    ],
    avoidIngredients: [],
  },
};

/**
 * Ingredient compatibility matrix for conflict detection.
 * Key = ingredient, Value = array of incompatible ingredients.
 */
const INGREDIENT_CONFLICTS = {
  'Retinol': ['AHA (Glycolic Acid)', 'Vitamin C', 'Benzoyl Peroxide (2.5-5%)', 'Benzoyl Peroxide (5%)', 'Benzoyl Peroxide (5-10%)'],
  'Retinoid (Adapalene)': ['AHA (Glycolic Acid)', 'Vitamin C'],
  'Retinoid (Tretinoin)': ['AHA (Glycolic Acid)', 'Vitamin C', 'Benzoyl Peroxide (5-10%)'],
  'Vitamin C': ['Retinol', 'Retinoid (Adapalene)', 'Retinoid (Tretinoin)', 'Niacinamide'],
  'AHA (Glycolic Acid)': ['Retinol', 'Retinoid (Adapalene)', 'Retinoid (Tretinoin)', 'Salicylic Acid'],
  'Benzoyl Peroxide (2.5-5%)': ['Retinol', 'Vitamin C'],
  'Benzoyl Peroxide (5%)': ['Retinol', 'Vitamin C'],
  'Benzoyl Peroxide (5-10%)': ['Retinol', 'Retinoid (Tretinoin)', 'Vitamin C'],
};

module.exports = { KNOWLEDGE_BASE, INGREDIENT_CONFLICTS };
