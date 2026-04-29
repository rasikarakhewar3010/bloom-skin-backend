import React, { useState, useEffect, useCallback } from 'react';
import { getDashboardStats } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
import { NavbarDemo } from '../NavbarDemo';

// ─────────────────────────────────────────────
//  BLOOM SCORE RING — Animated circular gauge
// ─────────────────────────────────────────────
const BloomScoreRing = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    let frame;
    let current = 0;
    const step = () => {
      current += 1;
      if (current > score) current = score;
      setAnimatedScore(current);
      if (current < score) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const getScoreColor = (s) => {
    if (s >= 80) return '#10B981';
    if (s >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const color = getScoreColor(animatedScore);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="12" />
        <circle
          cx="90" cy="90" r={radius} fill="none" stroke={color} strokeWidth="12"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 90 90)"
          style={{ transition: 'stroke-dashoffset 0.5s ease-out, stroke 0.5s ease-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-extrabold" style={{ color }}>{animatedScore}</span>
        <span className="text-xs text-gray-500 font-medium">BLOOM SCORE</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  STAT CARD — Reusable metric display
// ─────────────────────────────────────────────
const StatCard = ({ icon, label, value, subtext, className = '' }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow ${className}`}>
    <div className="flex items-start gap-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
//  CONDITION BAR CHART — Horizontal bars
// ─────────────────────────────────────────────
const ConditionChart = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-gray-400 text-sm text-center py-8">No condition data yet.</p>;
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.name} className="group">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">{item.name}</span>
            <span className="text-xs font-semibold text-gray-500">{item.count} scans ({item.percentage}%)</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full transition-all duration-700 ease-out group-hover:opacity-90"
              style={{
                width: `${(item.count / maxCount) * 100}%`,
                backgroundColor: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
//  SEVERITY TREND — Mini sparkline
// ─────────────────────────────────────────────
const SeverityTrend = ({ data }) => {
  if (!data || data.length < 2) return <p className="text-gray-400 text-sm text-center py-8">Need at least 2 scans for trend data.</p>;

  const recent = data.slice(-15);
  const width = 400;
  const height = 120;
  const padding = 10;
  const maxConf = Math.max(...recent.map(d => d.confidence));
  const minConf = Math.min(...recent.map(d => d.confidence));
  const range = maxConf - minConf || 0.1;

  const points = recent.map((d, i) => {
    const x = padding + (i / (recent.length - 1)) * (width - 2 * padding);
    const y = padding + (1 - (d.confidence - minConf) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ maxHeight: '140px' }}>
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
          fill="url(#trendGrad)"
        />
        <polyline
          points={points}
          fill="none"
          stroke="#EC4899"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {recent.map((d, i) => {
          const x = padding + (i / (recent.length - 1)) * (width - 2 * padding);
          const y = padding + (1 - (d.confidence - minConf) / range) * (height - 2 * padding);
          return <circle key={i} cx={x} cy={y} r="3.5" fill="#EC4899" stroke="white" strokeWidth="2" />;
        })}
      </svg>
      <div className="flex justify-between text-xs text-gray-400 mt-1 px-2">
        <span>{new Date(recent[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        <span className="text-gray-500 font-medium">Severity over time →</span>
        <span>{new Date(recent[recent.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  RECENT SCANS — Small scan preview cards
// ─────────────────────────────────────────────
const RecentScans = ({ scans }) => {
  if (!scans || scans.length === 0) return null;

  const getSeverityColor = (sev) => {
    const colors = { low: 'bg-green-100 text-green-700', moderate: 'bg-yellow-100 text-yellow-700', high: 'bg-orange-100 text-orange-700', severe: 'bg-red-100 text-red-700' };
    return colors[sev] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-3">
      {scans.map((scan) => (
        <div key={scan.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <img src={scan.imageUrl} alt="scan" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{scan.prediction}</p>
            <p className="text-xs text-gray-500">{new Date(scan.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-bold text-pink-500">{(scan.confidence * 100).toFixed(0)}%</span>
            {scan.severity && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSeverityColor(scan.severity)}`}>
                {scan.severity}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
//  MAIN DASHBOARD PAGE
// ─────────────────────────────────────────────
const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.response?.status === 401 ? 'Please log in to view your dashboard.' : 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

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
        <button onClick={() => navigate('/login')} className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
          Go to Login
        </button>
      </div>
    );
  }

  if (!stats) return null;

  const trendEmoji = { improving: '📈', worsening: '📉', stable: '➡️', none: '🆕' };
  const trendText = { improving: 'Improving', worsening: 'Needs Attention', stable: 'Stable', none: 'Start Scanning' };

  return (
    <>
    <NavbarDemo />
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Skin Health Dashboard
          </h1>
          <p className="mt-2 text-gray-500 text-lg">Your skin's journey, visualized.</p>
        </div>

        {/* Top Row — Bloom Score + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bloom Score Card */}
          <div className="lg:col-span-1 bg-white rounded-3xl shadow-lg border border-gray-100 p-6 flex flex-col items-center justify-center">
            <BloomScoreRing score={stats.bloomScore} />
            <p className="mt-4 text-sm text-gray-600 text-center max-w-[200px]">
              {stats.bloomScore >= 80 ? 'Excellent skin health!' : stats.bloomScore >= 50 ? 'Room for improvement' : 'Focus on your routine'}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-4">
            <StatCard icon="🔬" label="Total Scans" value={stats.totalScans} subtext={stats.insights.scanFrequency} />
            <StatCard icon={trendEmoji[stats.insights.trendDirection]} label="Trend" value={trendText[stats.insights.trendDirection]} />
            <StatCard icon="🎯" label="Most Common" value={stats.insights.mostCommon || '—'} subtext={stats.conditionFrequency[0] ? `${stats.conditionFrequency[0].percentage}% of scans` : ''} />
            <StatCard icon="🔥" label="Scan Streak" value={`${stats.streak} weeks`} subtext="Keep scanning weekly!" />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Condition Distribution */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📊</span> Condition Distribution
            </h2>
            <ConditionChart data={stats.conditionFrequency} />
          </div>

          {/* Severity Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📈</span> Severity Trend
            </h2>
            <SeverityTrend data={stats.severityTrend} />
          </div>
        </div>

        {/* Recent Scans */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span>🕐</span> Recent Scans
            </h2>
            <button onClick={() => navigate('/history')} className="text-sm text-pink-500 hover:text-pink-600 font-medium transition">
              View All →
            </button>
          </div>
          <RecentScans scans={stats.recentScans} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button onClick={() => navigate('/aichat')} className="p-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-center">
            <span className="text-2xl mb-2 block">📸</span>
            <span className="font-bold">New Scan</span>
          </button>
          <button onClick={() => navigate('/recommendations')} className="p-5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-center">
            <span className="text-2xl mb-2 block">🧬</span>
            <span className="font-bold">View Recommendations</span>
          </button>
          <button onClick={() => navigate('/routine')} className="p-5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-center">
            <span className="text-2xl mb-2 block">🗓️</span>
            <span className="font-bold">My Routine</span>
          </button>
        </div>

      </div>
    </div>
    </>
  );
};

export default DashboardPage;
