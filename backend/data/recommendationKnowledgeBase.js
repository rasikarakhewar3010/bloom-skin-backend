/**
 * =================================================================
 *  RECOMMENDATION KNOWLEDGE BASE
 *  Curated skincare knowledge mapped to detectable conditions.
 *  Each condition maps to real products with dynamic Google Shopping
 *  search links (never break, always show latest prices).
 * =================================================================
 */

/**
 * Generates a Google Shopping search URL for a product.
 * This approach ensures links NEVER break — unlike hardcoded retailer URLs.
 */
const shopLink = (productName) =>
  `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(productName)}`;

const KNOWLEDGE_BASE = {
  Blackheads: {
    description: 'Open comedones caused by clogged pores with oxidized sebum.',
    category: 'comedonal',
    severityWeight: 1,
    icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233497.png',
    ingredients: [
      { name: 'Salicylic Acid (BHA)', benefit: 'Penetrates pores to dissolve sebum plugs', priority: 10 },
      { name: 'Niacinamide', benefit: 'Regulates oil production and minimizes pores', priority: 9 },
      { name: 'Retinol', benefit: 'Increases cell turnover to prevent clogging', priority: 8 },
      { name: 'Clay (Kaolin/Bentonite)', benefit: 'Absorbs excess oil from skin surface', priority: 7 },
      { name: 'AHA (Glycolic Acid)', benefit: 'Exfoliates surface dead skin cells', priority: 6 },
    ],
    products: [
      {
        type: 'Cleanser', suggestion: 'Minimalist 2% Salicylic Acid Face Wash',
        usage: 'Twice daily, morning and night', priority: 10,
        buyLink: shopLink('Minimalist 2% Salicylic Acid Face Wash'),
        imageUrl: '/images/products/faceWash.png'
      },
      {
        type: 'Exfoliant', suggestion: "Paula's Choice 2% BHA Liquid Exfoliant",
        usage: '2-3 times per week at night', priority: 9,
        buyLink: shopLink("Paula's Choice 2% BHA Liquid Exfoliant"),
        imageUrl: '/images/products/serum.png'
      },
      {
        type: 'Mask', suggestion: 'Innisfree Super Volcanic Pore Clay Mask',
        usage: 'Once a week', priority: 7,
        buyLink: shopLink('Innisfree Super Volcanic Pore Clay Mask'),
        imageUrl: '/images/products/mask.png'
      },
      {
        type: 'Moisturizer', suggestion: 'Neutrogena Oil-Free Moisturizer',
        usage: 'Twice daily after cleansing', priority: 8,
        buyLink: shopLink('Neutrogena Oil Free Moisturizer'),
        imageUrl: '/images/products/moisturizer.png'
      },
      {
        type: 'Sunscreen', suggestion: 'La Shield Fisico SPF 50 Sunscreen Gel',
        usage: 'Every morning, reapply every 2 hours', priority: 10,
        buyLink: shopLink('La Shield Fisico SPF 50 Sunscreen Gel'),
        imageUrl: '/images/products/sunscreen.png'
      },
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
    icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233497.png',
    ingredients: [
      { name: 'Retinoid (Adapalene)', benefit: 'Unclogs pores and prevents new comedones', priority: 10 },
      { name: 'Salicylic Acid', benefit: 'Dissolves pore-clogging debris', priority: 9 },
      { name: 'Azelaic Acid', benefit: 'Reduces inflammation and unclogs pores', priority: 8 },
      { name: 'Niacinamide', benefit: 'Controls sebum and strengthens skin barrier', priority: 7 },
      { name: 'Zinc', benefit: 'Anti-inflammatory and oil-regulating', priority: 6 },
    ],
    products: [
      {
        type: 'Treatment', suggestion: 'Minimalist 0.1% Adapalene Gel',
        usage: 'At night, start 3x per week', priority: 10,
        buyLink: shopLink('Minimalist 0.1% Adapalene Gel'),
        imageUrl: '/images/products/cream.png'
      },
      {
        type: 'Cleanser', suggestion: 'Cetaphil Gentle Foaming Cleanser',
        usage: 'Morning and night', priority: 9,
        buyLink: shopLink('Cetaphil Gentle Foaming Cleanser'),
        imageUrl: '/images/products/cleanser.png'
      },
      {
        type: 'Serum', suggestion: 'Minimalist 10% Niacinamide + Zinc Serum',
        usage: 'Morning, before moisturizer', priority: 8,
        buyLink: shopLink('Minimalist 10% Niacinamide Zinc Serum'),
        imageUrl: '/images/products/serum.png'
      },
      {
        type: 'Moisturizer', suggestion: 'Neutrogena Hydro Boost Water Gel',
        usage: 'After treatment, morning and night', priority: 7,
        buyLink: shopLink('Neutrogena Hydro Boost Water Gel'),
        imageUrl: '/images/products/moisturizer.png'
      },
      {
        type: 'Sunscreen', suggestion: 'Minimalist SPF 50 Sunscreen',
        usage: 'Every morning', priority: 10,
        buyLink: shopLink('Minimalist SPF 50 Sunscreen'),
        imageUrl: '/images/products/sunscreen.png'
      },
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
    icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233497.png',
    ingredients: [
      { name: 'Benzoyl Peroxide (2.5-5%)', benefit: 'Kills acne-causing bacteria on contact', priority: 10 },
      { name: 'Niacinamide', benefit: 'Calms redness and inflammation', priority: 9 },
      { name: 'Centella Asiatica', benefit: 'Soothes irritated skin and promotes healing', priority: 8 },
      { name: 'Azelaic Acid', benefit: 'Anti-inflammatory and antibacterial', priority: 8 },
      { name: 'Green Tea Extract', benefit: 'Antioxidant that reduces inflammation', priority: 6 },
    ],
    products: [
      {
        type: 'Spot Treatment', suggestion: 'Benzac AC 2.5% Benzoyl Peroxide Gel',
        usage: 'On affected areas at night', priority: 10,
        buyLink: shopLink('Benzac AC 2.5% Benzoyl Peroxide Gel'),
        imageUrl: '/images/products/cream.png'
      },
      {
        type: 'Cleanser', suggestion: 'CeraVe Foaming Facial Cleanser',
        usage: 'Morning and night', priority: 9,
        buyLink: shopLink('CeraVe Foaming Facial Cleanser'),
        imageUrl: '/images/products/faceWash.png'
      },
      {
        type: 'Serum', suggestion: 'Dot & Key Cica Calming Skin Clarifying Serum',
        usage: 'After cleansing, morning', priority: 8,
        buyLink: shopLink('Dot & Key Cica Calming Skin Clarifying Serum'),
        imageUrl: '/images/products/serum.png'
      },
      {
        type: 'Moisturizer', suggestion: 'CeraVe Moisturizing Cream',
        usage: 'Morning and night', priority: 8,
        buyLink: shopLink('CeraVe Moisturizing Cream'),
        imageUrl: '/images/products/cream.png'
      },
      {
        type: 'Sunscreen', suggestion: 'Aqualogica Glow+ Dewy Sunscreen SPF 50',
        usage: 'Every morning', priority: 10,
        buyLink: shopLink('Aqualogica Glow+ Dewy Sunscreen SPF 50'),
        imageUrl: '/images/products/sunscreen.png'
      },
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
    icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233497.png',
    ingredients: [
      { name: 'Benzoyl Peroxide (5%)', benefit: 'Kills P. acnes bacteria effectively', priority: 10 },
      { name: 'Salicylic Acid', benefit: 'Clears pores and reduces inflammation', priority: 9 },
      { name: 'Tea Tree Oil', benefit: 'Natural antibacterial agent', priority: 7 },
      { name: 'Sulfur', benefit: 'Dries out pimples and reduces bacteria', priority: 7 },
      { name: 'Niacinamide', benefit: 'Reduces redness and post-inflammatory marks', priority: 8 },
    ],
    products: [
      {
        type: 'Spot Treatment', suggestion: 'Benzac AC 5% Benzoyl Peroxide Gel',
        usage: 'Directly on pustules at night', priority: 10,
        buyLink: shopLink('Benzac AC 5% Benzoyl Peroxide Gel'),
        imageUrl: '/images/products/cream.png'
      },
      {
        type: 'Cleanser', suggestion: 'Minimalist 2% Salicylic Acid Face Wash',
        usage: 'Morning and night', priority: 9,
        buyLink: shopLink('Minimalist 2% Salicylic Acid Face Wash'),
        imageUrl: '/images/products/faceWash.png'
      },
      {
        type: 'Serum', suggestion: 'Minimalist 10% Niacinamide + Zinc Serum',
        usage: 'Morning, on clean skin', priority: 8,
        buyLink: shopLink('Minimalist 10% Niacinamide Zinc Serum'),
        imageUrl: '/images/products/serum.png'
      },
      {
        type: 'Moisturizer', suggestion: 'Plum Green Tea Oil-Free Moisturizer',
        usage: 'After serum, morning and night', priority: 7,
        buyLink: shopLink('Plum Green Tea Oil Free Moisturizer'),
        imageUrl: '/images/products/moisturizer.png'
      },
      {
        type: 'Sunscreen', suggestion: "Re'equil Ultra Matte Dry Touch Sunscreen SPF 50",
        usage: 'Every morning', priority: 10,
        buyLink: shopLink("Re'equil Ultra Matte Dry Touch Sunscreen SPF 50"),
        imageUrl: '/images/products/sunscreen.png'
      },
      {
        type: 'Mask', suggestion: 'Innisfree Super Volcanic Pore Clay Mask',
        usage: 'Once a week on affected areas', priority: 6,
        buyLink: shopLink('Innisfree Super Volcanic Pore Clay Mask'),
        imageUrl: '/images/products/mask.png'
      },
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
    icon: 'https://cdn-icons-png.flaticon.com/512/3233/3233497.png',
    ingredients: [
      { name: 'Benzoyl Peroxide (5-10%)', benefit: 'Penetrates deep to kill bacteria', priority: 10 },
      { name: 'Retinoid (Tretinoin)', benefit: 'Prevents cyst formation by unclogging deep pores', priority: 10 },
      { name: 'Niacinamide', benefit: 'Reduces inflammation and hyperpigmentation', priority: 8 },
      { name: 'Azelaic Acid', benefit: 'Anti-inflammatory for deep acne', priority: 8 },
      { name: 'Zinc Supplements', benefit: 'Internal anti-inflammatory support', priority: 7 },
    ],
    products: [
      {
        type: 'Treatment', suggestion: 'Minimalist 0.6% Retinol Face Cream',
        usage: 'Nightly as prescribed — consult a dermatologist first', priority: 10,
        buyLink: shopLink('Minimalist 0.6% Retinol Face Cream'),
        imageUrl: '/images/products/cream.png'
      },
      {
        type: 'Spot Treatment', suggestion: 'Benzac AC 5% Benzoyl Peroxide Gel',
        usage: 'On cysts, morning and night', priority: 9,
        buyLink: shopLink('Benzac AC 5% Benzoyl Peroxide Gel'),
        imageUrl: '/images/products/cream.png'
      },
      {
        type: 'Cleanser', suggestion: 'Cetaphil Gentle Skin Cleanser',
        usage: 'Morning and night — DO NOT scrub', priority: 9,
        buyLink: shopLink('Cetaphil Gentle Skin Cleanser'),
        imageUrl: '/images/products/cleanser.png'
      },
      {
        type: 'Serum', suggestion: 'Minimalist 10% Azelaic Acid Serum',
        usage: 'Nightly after cleansing', priority: 8,
        buyLink: shopLink('Minimalist 10% Azelaic Acid Serum'),
        imageUrl: '/images/products/serum.png'
      },
      {
        type: 'Moisturizer', suggestion: 'CeraVe Moisturizing Cream with Ceramides',
        usage: 'Morning and night', priority: 8,
        buyLink: shopLink('CeraVe Moisturizing Cream'),
        imageUrl: '/images/products/cream.png'
      },
      {
        type: 'Sunscreen', suggestion: 'La Shield Fisico SPF 50 Sunscreen Gel',
        usage: 'Every morning — crucial with retinoids', priority: 10,
        buyLink: shopLink('La Shield Fisico SPF 50 Sunscreen Gel'),
        imageUrl: '/images/products/sunscreen.png'
      },
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
      {
        type: 'Serum', suggestion: 'Garnier Bright Complete Vitamin C Serum',
        usage: 'Every morning before moisturizer', priority: 9,
        buyLink: shopLink('Garnier Bright Complete Vitamin C Serum'),
        imageUrl: '/images/products/serum.png'
      },
      {
        type: 'Moisturizer', suggestion: 'Neutrogena Hydro Boost Water Gel',
        usage: 'Morning and night', priority: 8,
        buyLink: shopLink('Neutrogena Hydro Boost Water Gel'),
        imageUrl: '/images/products/moisturizer.png'
      },
      {
        type: 'Sunscreen', suggestion: 'Minimalist SPF 50 Sunscreen',
        usage: 'Every morning, rain or shine', priority: 10,
        buyLink: shopLink('Minimalist SPF 50 Sunscreen'),
        imageUrl: '/images/products/sunscreen.png'
      },
      {
        type: 'Cleanser', suggestion: 'Simple Kind To Skin Refreshing Facial Wash',
        usage: 'Morning and night', priority: 8,
        buyLink: shopLink('Simple Kind To Skin Refreshing Facial Wash'),
        imageUrl: '/images/products/faceWash.png'
      },
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

const INGREDIENT_CONFLICTS = {
  'Retinol': ['AHA (Glycolic Acid)', 'Vitamin C', 'Benzoyl Peroxide (2.5-5%)', 'Benzoyl Peroxide (5%)', 'Benzoyl Peroxide (5-10%)'],
  'Retinoid (Adapalene)': ['AHA (Glycolic Acid)', 'Vitamin C'],
  'Retinoid (Tretinoin)': ['AHA (Glycolic Acid)', 'Vitamin C', 'Benzoyl Peroxide (5-10%)'],
  'AHA (Glycolic Acid)': ['Retinol', 'Retinoid (Adapalene)', 'Retinoid (Tretinoin)', 'Salicylic Acid'],
  'Benzoyl Peroxide (2.5-5%)': ['Retinol', 'Vitamin C'],
  'Benzoyl Peroxide (5%)': ['Retinol', 'Vitamin C'],
  'Benzoyl Peroxide (5-10%)': ['Retinol', 'Retinoid (Tretinoin)', 'Vitamin C'],
};

module.exports = { KNOWLEDGE_BASE, INGREDIENT_CONFLICTS };

