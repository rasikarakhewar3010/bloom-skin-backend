import React, { useState, useEffect, useCallback } from 'react';
import { getRoutine } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
import { NavbarDemo } from '../NavbarDemo';

// ─────────────────────────────────────────────
//  ROUTINE STEP CARD
// ─────────────────────────────────────────────
const RoutineStepCard = ({ step, index }) => {
  const typeIcons = {
    Cleanser: '🧴', Exfoliant: '✨', Serum: '💧', Treatment: '💊',
    'Spot Treatment': '🎯', Moisturizer: '🧊', Sunscreen: '☀️', Mask: '🎭',
  };

  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all group">
      {/* Step Number */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-white flex items-center justify-center text-sm font-bold shadow-sm">
        {index + 1}
      </div>

      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 bg-gray-50 group-hover:bg-pink-50 rounded-xl flex items-center justify-center text-xl transition-colors">
        {typeIcons[step.type] || '💊'}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">{step.type}</span>
          {step.forCondition && (
            <span className="text-xs text-gray-400">· for {step.forCondition}</span>
          )}
        </div>
        <h4 className="font-bold text-gray-800 text-sm">{step.product}</h4>
        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
          <span>🕐</span> {step.usage}
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  CONFLICT ALERT
// ─────────────────────────────────────────────
const ConflictAlert = ({ conflicts }) => {
  if (!conflicts || conflicts.length === 0) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
      <h3 className="text-base font-bold text-amber-800 mb-3 flex items-center gap-2">
        <span className="text-lg">⚠️</span> Ingredient Conflicts Detected
      </h3>
      <div className="space-y-2">
        {conflicts.map((conflict, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-amber-100/50 rounded-lg">
            <span className="text-amber-500 mt-0.5 flex-shrink-0">⚡</span>
            <div>
              <p className="text-sm text-amber-900 font-medium">
                <span className="font-bold">{conflict.a}</span> × <span className="font-bold">{conflict.b}</span>
              </p>
              <p className="text-xs text-amber-700 mt-0.5">{conflict.warning}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  ADAPTATION NOTE
// ─────────────────────────────────────────────
const AdaptationNote = ({ note }) => {
  if (!note) return null;

  const isImproving = note.type === 'improving';
  return (
    <div className={`rounded-2xl p-5 mb-8 border ${
      isImproving ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'
    }`}>
      <h3 className={`text-base font-bold mb-1 flex items-center gap-2 ${
        isImproving ? 'text-green-800' : 'text-orange-800'
      }`}>
        <span className="text-lg">{isImproving ? '🎉' : '⚠️'}</span>
        Routine Adaptation
      </h3>
      <p className={`text-sm ${isImproving ? 'text-green-700' : 'text-orange-700'}`}>
        {note.message}
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────
//  ACTIVE INGREDIENTS
// ─────────────────────────────────────────────
const ActiveIngredients = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>🧪</span> Active Ingredients in Your Routine
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ingredients.map((ing, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-6 h-6 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              {ing.priority}
            </div>
            <div>
              <p className="text-sm font-semibold text-purple-800">{ing.name}</p>
              <p className="text-xs text-purple-600">{ing.benefit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  MAIN ROUTINE PAGE
// ─────────────────────────────────────────────
const RoutinePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('morning');
  const navigate = useNavigate();

  const fetchRoutine = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getRoutine();
      setData(result);
    } catch (err) {
      setError(err.response?.status === 401 ? 'Please log in to view your routine.' : 'Failed to generate routine.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRoutine(); }, [fetchRoutine]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-400 mx-auto"></div>
          <p className="mt-4 text-gray-500">Generating your personalized routine...</p>
        </div>
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

  const { routine, basedOn } = data;
  const currentSteps = timeOfDay === 'morning' ? routine.morning : routine.night;

  return (
    <>
    <NavbarDemo />
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Your Skincare Routine
          </h1>
          <p className="mt-2 text-gray-500 text-lg">{basedOn.message}</p>
        </div>

        {/* Based On Info */}
        {basedOn.latestScan && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-shrink-0 flex items-center gap-2">
                {basedOn.conditions.map((c) => (
                  <span key={c} className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-semibold">{c}</span>
                ))}
              </div>
              <div className="text-center sm:text-left flex-1">
                <p className="text-sm text-gray-600">
                  Latest scan: <span className="font-semibold text-gray-800">{basedOn.latestScan.prediction}</span> at{' '}
                  <span className="font-semibold text-pink-500">{(basedOn.latestScan.confidence * 100).toFixed(0)}%</span> confidence
                </p>
                {basedOn.latestScan.description && (
                  <p className="text-xs text-gray-500 mt-1">{basedOn.latestScan.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Adaptation Note */}
        <AdaptationNote note={routine.adaptationNote} />

        {/* Conflict Alerts */}
        <ConflictAlert conflicts={routine.conflicts} />

        {/* AM / PM Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1 flex shadow-inner">
            <button
              onClick={() => setTimeOfDay('morning')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                timeOfDay === 'morning'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ☀️ Morning
            </button>
            <button
              onClick={() => setTimeOfDay('night')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                timeOfDay === 'night'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🌙 Night
            </button>
          </div>
        </div>

        {/* Routine Steps */}
        <div className="space-y-3 mb-8">
          {currentSteps && currentSteps.length > 0 ? (
            currentSteps.map((step, i) => (
              <RoutineStepCard key={i} step={step} index={i} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400">No specific steps for this time. Complete a scan for personalized routine.</p>
            </div>
          )}
        </div>

        {/* Weekly Extras */}
        {routine.weekly && routine.weekly.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📅</span> Weekly Treatments
            </h3>
            <div className="space-y-3">
              {routine.weekly.map((step, i) => (
                <RoutineStepCard key={i} step={step} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Active Ingredients */}
        <div className="mb-8">
          <ActiveIngredients ingredients={routine.activeIngredients} />
        </div>

        {/* Avoid Section */}
        {routine.avoidIngredients && routine.avoidIngredients.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
            <h3 className="text-base font-bold text-red-700 mb-3 flex items-center gap-2">
              <span>🚫</span> Avoid These Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {routine.avoidIngredients.map((ing, i) => (
                <span key={i} className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">{ing}</span>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/aichat')} className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
            📸 New Scan
          </button>
          <button onClick={() => navigate('/recommendations')} className="px-8 py-3 bg-white text-gray-700 font-bold rounded-full shadow border border-gray-200 hover:bg-gray-50 transition-all">
            🧬 View Recommendations
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default RoutinePage;
