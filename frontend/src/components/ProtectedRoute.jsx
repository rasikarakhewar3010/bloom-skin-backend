import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — Wraps private pages to redirect unauthenticated users.
 * Shows a subtle loading pulse while the auth session is being verified,
 * then either renders children or redirects to /login.
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

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

  // User is authenticated — render the protected content
  return children;
};

export default ProtectedRoute;
