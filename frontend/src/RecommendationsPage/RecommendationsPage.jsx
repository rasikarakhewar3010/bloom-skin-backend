import React, { useState, useEffect, useCallback } from 'react';
import { getRecommendations } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
import { NavbarDemo } from '../NavbarDemo';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────
//  SKIN OVERVIEW ITEM
// ─────────────────────────────────────────────
const OverviewItem = ({ label, value, icon, index }) => {
  const statusColors = {
    Good: 'text-emerald-500',
    Balanced: 'text-emerald-500',
    Moderate: 'text-amber-500',
    'Needs care': 'text-rose-500',
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
      className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
    >
      <div className="flex items-center gap-3">
        <span className="text-pink-400 w-5 text-center text-sm">{icon}</span>
        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-tight">{label}</span>
      </div>
      <span className={`text-[11px] font-bold ${statusColors[value] || 'text-gray-800'}`}>{value}</span>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
//  CONDITION CARD (LIST ITEM)
// ─────────────────────────────────────────────
const ConditionListItem = ({ condition, index }) => {
  const colors = { 
    Blackheads: '#6B7280', 
    Whiteheads: '#F59E0B', 
    Papules: '#EF4444', 
    Pustules: '#F97316', 
    Cyst: '#DC2626', 
    'Clear Skin': '#10B981' 
  };
  const color = colors[condition.name] || '#8B5CF6';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1 }}
      className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
    >

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            {/* Dynamic Icon from Backend */}
            <img src={condition.icon} className="w-7 h-7 grayscale opacity-70" alt="icon" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-base">{condition.name}</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              {condition.count} detections · {condition.percentage}% of scans
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <span className="text-gray-400">{(condition.avgConfidence * 100).toFixed(0)}% avg</span>
          <span className="text-gray-400">→ {condition.trend}</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${condition.percentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
            className="h-full rounded-full" 
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
//  PRODUCT CARD
// ─────────────────────────────────────────────
const ProductCard = ({ product, index }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.a 
      layout
      href={product.buyLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="bg-white border border-gray-100 rounded-[28px] p-5 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group relative overflow-hidden cursor-pointer no-underline"
    >

      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
      
      <div className="relative aspect-square mb-5 bg-gray-50/30 rounded-2xl overflow-hidden flex items-center justify-center p-4">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-pink-100 border-t-pink-400 rounded-full animate-spin" />
          </div>
        )}
        {product.imageUrl ? (
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: imgLoaded ? 1 : 0, scale: imgLoaded ? 1 : 0.9 }}
            src={product.imageUrl} 
            alt={product.suggestion} 
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://cdn-icons-png.flaticon.com/512/3233/3233497.png";
              e.target.className = "w-16 h-16 opacity-10 grayscale";
              setImgLoaded(true);
            }}
            className="max-h-[85%] max-w-[85%] object-contain mix-blend-multiply group-hover:scale-110 transition-all duration-700 pointer-events-none" 
          />
        ) : (
          <span className="text-5xl opacity-10">🛍️</span>
        )}
      </div>

      <div className="flex-1 relative z-10 text-left">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-xs">
            {product.type === 'Sunscreen' ? '☀️' : product.type === 'Serum' ? '💧' : '💊'}
          </div>
          <div>
            <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">{product.type}</p>
            {product.relevantCondition && (
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">for {product.relevantCondition}</p>
            )}
          </div>
        </div>
        
        <h4 className="font-bold text-gray-900 text-[14px] mb-2 leading-tight group-hover:text-pink-600 transition-colors">
          {product.suggestion}
        </h4>
        
        <p className="text-[11px] text-gray-400 font-semibold flex items-center gap-1.5 mb-5">
          <span className="text-xs">🕐</span> {product.usage}
        </p>

        <div className="bg-pink-50/30 rounded-2xl p-4 mb-5 border border-pink-100/10 backdrop-blur-sm">
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-2">Why this product?</p>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Specifically recommended to treat your detected <span className="font-bold text-pink-500">{product.relevantCondition}</span>.
          </p>
        </div>
      </div>

      <div className="w-full py-3.5 bg-pink-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl group-hover:bg-pink-600 transition-all shadow-md group-hover:shadow-lg text-center relative z-10">
        View Product
      </div>
    </motion.a>
  );
};



// ─────────────────────────────────────────────
//  MAIN PAGE
// ─────────────────────────────────────────────
const RecommendationsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getRecommendations();
      setData(result);
    } catch (err) {
      setError(err.response?.status === 401 ? 'Please log in to view recommendations.' : 'Failed to load data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 border-t-2 border-b-2 border-pink-400 rounded-full"
        />
        <p className="text-pink-400 font-bold text-xs uppercase tracking-widest animate-pulse">Personalizing your recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 px-4">
        <p className="text-red-500 text-lg font-medium mb-4">{error}</p>
        <button onClick={() => navigate('/login')} className="px-10 py-4 bg-pink-500 text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-lg">Go to Login</button>
      </div>
    );
  }

  if (!data) return null;

  const { summary, recommendations, conditionBreakdown } = data;

  return (
    <>
    <NavbarDemo />
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen bg-white pb-20"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* HERO SECTION - PREMIUM VERSION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[40px] bg-gradient-to-br from-pink-50/40 via-white to-pink-50/10 border border-pink-100/10 p-10 sm:p-14 mb-10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-200/20 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-xl">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-5 tracking-tight"
            >
              Your Recommendations <motion.span 
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="inline-block text-pink-400 text-3xl align-top"
              >✦</motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-gray-500 font-medium max-w-sm leading-relaxed"
            >
              Advanced skincare insights curated from your scan history and skin profile.
            </motion.p>
          </div>

          {/* Premium Floating Hero Image */}
          <div className="absolute top-0 right-0 h-full w-1/2 flex items-center justify-end pointer-events-none pr-4 sm:pr-8 lg:pr-12">
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6, 
                ease: "easeInOut" 
              }}
              className="relative h-[80%] sm:h-[90%] lg:h-[105%]"
            >
              <img 
                src="/images/reccomandation_page_image.png" 
                alt="Skincare" 
                className="h-full w-auto object-contain mix-blend-multiply drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* TOP METRICS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Bloom Score Circle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 bg-white rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 flex flex-col items-center justify-center text-center group"
          >
            <div className="relative w-36 h-36 mb-5">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="66" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                <motion.circle 
                  cx="72" cy="72" r="66" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  className="text-pink-500"
                  strokeDasharray={415}
                  initial={{ strokeDashoffset: 415 }}
                  animate={{ strokeDashoffset: 415 - (415 * summary.bloomScore) / 100 }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-4xl font-bold text-gray-900"
                >{summary.bloomScore}</motion.span>
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">/100</span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 group-hover:text-pink-500 transition-colors">
              Bloom Score <span className="text-gray-200 cursor-help">ⓘ</span>
            </p>
          </motion.div>

          {/* Status Banner */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 bg-white rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 flex flex-col justify-center"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
              Your skin condition has been <br />
              <motion.span 
                animate={{ color: ['#ec4899', '#db2777', '#ec4899'] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-pink-500"
              >
                {summary.overallTrend === 'stable' ? 'relatively stable' : summary.overallTrend === 'improving' ? 'improving' : 'changing'}
              </motion.span>.
            </h3>
            <p className="text-sm text-gray-500 font-medium mb-6">
              {summary.message}
            </p>
            <div className="flex gap-2">
              <div className="px-4 py-1.5 bg-pink-50/50 text-pink-500 text-[9px] font-bold uppercase tracking-wider rounded-full border border-pink-100/10">
                {summary.totalScans} Total Scans
              </div>
              <div className="px-4 py-1.5 bg-purple-50/50 text-purple-500 text-[9px] font-bold uppercase tracking-wider rounded-full border border-purple-100/10">
                Top: {summary.topCondition}
              </div>
            </div>
          </motion.div>

          {/* Skin Overview Grid - FULLY DYNAMIC FROM BACKEND */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-4 bg-white rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 flex flex-col justify-center"
          >
            <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-50 pb-2">Skin Overview</h4>
            <div className="space-y-0.5">
              {summary.skinOverview?.map((item, i) => (
                <OverviewItem key={i} index={i} {...item} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* CONDITION ANALYSIS SECTION */}
        <div className="mb-16">
          <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <span className="text-lg">🌸</span> Your Condition Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {conditionBreakdown.map((c, i) => (
              <ConditionListItem key={i} index={i} condition={c} />
            ))}
          </div>
        </div>

        {/* TABS SELECTOR */}
        <div className="flex items-center gap-10 mb-10 border-b border-gray-100 overflow-x-auto no-scrollbar">
          {[
            { key: 'products', label: 'Products', icon: '🛍️', count: recommendations.products.length },
            { key: 'ingredients', label: 'Ingredients', icon: '🧪', count: recommendations.ingredients.length },
            { key: 'tips', label: 'Tips', icon: '💡', count: recommendations.tips.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-5 px-1 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2.5 whitespace-nowrap transition-all relative
                ${activeTab === tab.key ? 'text-pink-500' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <span className={`text-xl transition-all ${activeTab === tab.key ? 'scale-110 grayscale-0' : 'grayscale opacity-40'}`}>{tab.icon}</span>
              {tab.label} <span className="text-gray-300 ml-1">{tab.count}</span>
              {activeTab === tab.key && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 w-full h-1 bg-pink-500 rounded-full" 
                />
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="mb-16 min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'products' && (
              <motion.div 
                key="products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {recommendations.products.map((prod, i) => (
                  <ProductCard key={i} index={i} product={prod} />
                ))}
              </motion.div>
            )}

            {activeTab === 'ingredients' && (
              <motion.div 
                key="ingredients"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {recommendations.ingredients.map((ing, i) => {
                  // Dynamic Category Coloring
                  const isActive = ing.name.includes('Acid') || ing.name.includes('Retinol') || ing.name.includes('Benzoyl');
                  const isSoothing = ing.name.includes('Cica') || ing.name.includes('Centella') || ing.name.includes('Tea Tree') || ing.name.includes('Green Tea');
                  const isHydrating = ing.name.includes('Hyaluronic') || ing.name.includes('Ceramide') || ing.name.includes('Glycerin');
                  
                  const colors = isActive ? { bg: 'bg-amber-50', text: 'text-amber-500', glow: 'bg-amber-400/20', label: 'Active' }
                               : isSoothing ? { bg: 'bg-emerald-50', text: 'text-emerald-500', glow: 'bg-emerald-400/20', label: 'Soothing' }
                               : isHydrating ? { bg: 'bg-blue-50', text: 'text-blue-500', glow: 'bg-blue-400/20', label: 'Hydrating' }
                               : { bg: 'bg-pink-50', text: 'text-pink-500', glow: 'bg-pink-400/20', label: 'Treatment' };

                  return (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      key={i} 
                      className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden cursor-pointer"
                    >
                      {/* Holographic Glow */}
                      <div className={`absolute top-0 left-0 w-24 h-24 ${colors.glow} blur-3xl rounded-full -ml-12 -mt-12 group-hover:scale-150 transition-transform duration-1000`} />
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center text-2xl grayscale group-hover:grayscale-0 transition-all duration-500`}>
                          🧪
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`${colors.text} text-[9px] font-bold uppercase tracking-widest bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-gray-50`}>
                            {colors.label}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-bold text-gray-900 text-[15px] mb-2 leading-tight relative z-10 group-hover:text-pink-600 transition-colors">
                        {ing.name}
                      </h4>
                      <p className="text-[12px] text-gray-500 leading-relaxed font-medium mb-6 relative z-10">
                        {ing.benefit}
                      </p>

                      {/* Scientific Strength Indicator */}
                      <div className="relative z-10 pt-4 border-t border-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Recommendation Strength</span>
                          <span className={`text-[10px] font-bold ${colors.text}`}>P{ing.priority}</span>
                        </div>
                        <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${ing.priority * 10}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full ${colors.text.replace('text', 'bg')} rounded-full`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}


            {activeTab === 'tips' && (
              <motion.div 
                key="tips"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {recommendations.tips.map((tip, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    key={i} 
                    className="bg-white border border-gray-100 rounded-[32px] p-8 flex items-start gap-6 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden cursor-pointer"
                  >
                    {/* Decorative Insight Glow */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-100/20 blur-[50px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
                    
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex-shrink-0 flex items-center justify-center text-3xl transition-all duration-500 group-hover:bg-amber-100 group-hover:rotate-12">
                      <motion.span
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >💡</motion.span>
                    </div>
                    
                    <div className="relative z-10 flex-1">
                      <p className="text-[16px] text-gray-800 font-bold leading-relaxed mb-4 group-hover:text-gray-900 transition-colors">
                        {tip.text}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-px w-6 bg-pink-100" />
                        <span className="px-3 py-1 bg-pink-50 text-pink-500 text-[9px] font-bold uppercase tracking-[0.15em] rounded-full border border-pink-100/20">
                          {tip.condition}
                        </span>
                      </div>
                    </div>
                    
                    {/* Subtle Quote Mark */}
                    <div className="absolute top-6 right-8 text-4xl text-gray-50 font-serif pointer-events-none select-none">
                      &rdquo;
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* INGREDIENTS TO AVOID */}
        {recommendations.avoidIngredients && recommendations.avoidIngredients.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-[11px] font-bold text-rose-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <span className="text-lg">⚠️</span> Ingredients to Avoid
            </h2>
            <div className="flex flex-wrap gap-3">
              {recommendations.avoidIngredients.map((ing, i) => (
                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(254, 242, 242, 1)' }}
                  key={i} 
                  className="bg-rose-50/30 border border-rose-100/30 px-6 py-4 rounded-2xl flex items-center gap-3 transition-all group cursor-default"
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-100/40 flex items-center justify-center text-rose-500 group-hover:animate-pulse">🔥</div>
                  <span className="text-[11px] font-bold text-rose-700 uppercase tracking-widest">{ing}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* FINAL ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center py-12 border-t border-gray-100">
          <motion.button 
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/routine')} 
            className="w-full sm:w-72 h-14 bg-pink-500 text-white font-bold uppercase tracking-widest text-[11px] rounded-2xl shadow-[0_10px_25px_-5px_rgba(236,72,153,0.3)] hover:bg-pink-600 transition-all flex items-center justify-center gap-3"
          >
            <span className="text-lg">✨</span> Generate My Routine
          </motion.button>
          <motion.button 
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dashboard')} 
            className="w-full sm:w-72 h-14 bg-white text-gray-800 font-bold uppercase tracking-widest text-[11px] rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
          >
            <span className="text-lg">📊</span> View Dashboard
          </motion.button>
        </div>

      </div>
    </motion.div>
    </>
  );
};

export default RecommendationsPage;
