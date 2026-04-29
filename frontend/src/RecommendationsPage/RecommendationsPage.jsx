import React, { useState, useEffect, useCallback } from 'react';
import { getRecommendations } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
import { NavbarDemo } from '../NavbarDemo';

// ─────────────────────────────────────────────
//  INGREDIENT CARD
// ─────────────────────────────────────────────
const IngredientCard = ({ ingredient }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-pink-200 transition-all group">
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-bold text-gray-800 text-sm group-hover:text-pink-600 transition-colors">{ingredient.name}</h4>
      <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-full">P{ingredient.priority}</span>
    </div>
    <p className="text-xs text-gray-600 leading-relaxed">{ingredient.benefit}</p>
    {ingredient.relevantConditions && ingredient.relevantConditions.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-1">
        {ingredient.relevantConditions.map((c) => (
          <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c}</span>
        ))}
      </div>
    )}
  </div>
);

// ─────────────────────────────────────────────
//  PRODUCT CARD
// ─────────────────────────────────────────────
const ProductCard = ({ product }) => {
  const typeIcons = {
    Cleanser: '🧴', Exfoliant: '✨', Serum: '💧', Treatment: '💊',
    'Spot Treatment': '🎯', Moisturizer: '🧊', Sunscreen: '☀️', Mask: '🎭',
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center text-lg">
          {typeIcons[product.type] || '💊'}
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">{product.type}</span>
          {product.relevantCondition && (
            <span className="text-xs text-gray-400 ml-2">for {product.relevantCondition}</span>
          )}
        </div>
      </div>
      <h4 className="font-bold text-gray-800 text-sm mb-1">{product.suggestion}</h4>
      <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
        <span>🕐</span> {product.usage}
      </p>
      {product.buyLink && (
        <a
          href={product.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all shadow-sm hover:shadow-md"
        >
          🛒 Shop Best Price →
        </a>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
//  CONDITION BREAKDOWN CARD
// ─────────────────────────────────────────────
const ConditionBreakdown = ({ conditions }) => {
  if (!conditions || conditions.length === 0) return null;

  const trendBadge = (trend) => {
    const styles = {
      improving: 'bg-green-100 text-green-700',
      worsening: 'bg-red-100 text-red-700',
      stable: 'bg-gray-100 text-gray-600',
    };
    const icons = { improving: '↗', worsening: '↘', stable: '→' };
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[trend] || styles.stable}`}>
        {icons[trend] || '→'} {trend}
      </span>
    );
  };

  return (
    <div className="space-y-3">
      {conditions.map((c) => (
        <div key={c.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 rounded-full" style={{ backgroundColor: getConditionColor(c.name) }} />
            <div>
              <p className="text-sm font-bold text-gray-800">{c.name}</p>
              <p className="text-xs text-gray-500">{c.count} detections · {c.percentage}% of scans</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600">{(c.avgConfidence * 100).toFixed(0)}% avg</span>
            {trendBadge(c.trend)}
          </div>
        </div>
      ))}
    </div>
  );
};

function getConditionColor(name) {
  const colors = { Blackheads: '#6B7280', Whiteheads: '#F59E0B', Papules: '#EF4444', Pustules: '#F97316', Cyst: '#DC2626', 'Clear Skin': '#10B981' };
  return colors[name] || '#8B5CF6';
}

// ─────────────────────────────────────────────
//  MAIN RECOMMENDATIONS PAGE
// ─────────────────────────────────────────────
const RecommendationsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getRecommendations();
      setData(result);
    } catch (err) {
      setError(err.response?.status === 401 ? 'Please log in to view recommendations.' : 'Failed to load recommendations.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg font-medium">{error}</p>
        <button onClick={() => navigate('/login')} className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">Go to Login</button>
      </div>
    );
  }

  if (!data) return null;

  const { summary, recommendations, conditionBreakdown } = data;
  const tabs = [
    { key: 'ingredients', label: '🧪 Ingredients', count: recommendations.ingredients.length },
    { key: 'products', label: '🛍️ Products', count: recommendations.products.length },
    { key: 'tips', label: '💡 Tips', count: recommendations.tips.length },
  ];

  return (
    <>
    <NavbarDemo />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Your Recommendations
          </h1>
          <p className="mt-2 text-gray-500 text-lg">Personalized skincare insights from your scan history.</p>
        </div>

        {/* Summary Banner */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Score */}
            <div className="flex-shrink-0 text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-extrabold text-white shadow-lg ${
                summary.bloomScore >= 80 ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                summary.bloomScore >= 50 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                'bg-gradient-to-br from-red-400 to-rose-500'
              }`}>
                {summary.bloomScore}
              </div>
              <p className="text-xs text-gray-500 mt-1">Bloom Score</p>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-800">{summary.trendMessage}</p>
              <p className="text-sm text-gray-500 mt-1">{summary.message}</p>
              <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-medium">
                  {summary.totalScans} total scans
                </span>
                {summary.topCondition && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                    Top: {summary.topCondition}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Condition Breakdown */}
        {conditionBreakdown && conditionBreakdown.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🔬</span> Your Condition Analysis
            </h2>
            <ConditionBreakdown conditions={conditionBreakdown} />
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 sm:flex-none py-3 px-6 text-center font-medium transition-colors relative cursor-pointer
                ${activeTab === tab.key
                  ? 'text-pink-600 border-b-2 border-pink-500'
                  : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab.label}
              <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'ingredients' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.ingredients.map((ing, i) => (
              <IngredientCard key={i} ingredient={ing} />
            ))}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.products.map((prod, i) => (
              <ProductCard key={i} product={prod} />
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-3">
            {recommendations.tips.map((tip, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-start gap-3">
                <span className="text-lg mt-0.5">💡</span>
                <div>
                  <p className="text-sm text-gray-700">{tip.text}</p>
                  <span className="text-xs text-gray-400 mt-1 inline-block">Related to: {tip.condition}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Avoid Section */}
        {recommendations.avoidIngredients && recommendations.avoidIngredients.length > 0 && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
              <span>⚠️</span> Ingredients to Avoid
            </h3>
            <div className="flex flex-wrap gap-2">
              {recommendations.avoidIngredients.map((ing, i) => (
                <span key={i} className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">{ing}</span>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/routine')} className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
            🗓️ Generate My Routine
          </button>
          <button onClick={() => navigate('/dashboard')} className="px-8 py-3 bg-white text-gray-700 font-bold rounded-full shadow border border-gray-200 hover:bg-gray-50 transition-all">
            📊 View Dashboard
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default RecommendationsPage;
