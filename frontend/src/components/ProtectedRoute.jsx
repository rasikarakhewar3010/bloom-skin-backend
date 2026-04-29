import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import OnboardingFlow from './OnboardingFlow';

/**
 * ProtectedRoute — Wraps private pages to redirect unauthenticated users.
 * Shows a subtle loading pulse while the auth session is being verified,
 * then either renders children or redirects to /login.
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading, user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(true);

  // While verifying session with the server, show a minimal loader
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-pink-100 rounded-full mb-4"></div>
          <div className="h-2 w-24 bg-pink-50 rounded"></div>
        </div>
      </div>
    );
  }

  // If not logged in after verification, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Check if onboarding is needed
  const needsOnboarding = user && (!user.skinProfile || !user.skinProfile.skinType);

  // User is authenticated — render the protected content
  return (
    <>
      {needsOnboarding && showOnboarding && (
        <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
      )}
      {children}
    </>
  );
};

export default ProtectedRoute;
