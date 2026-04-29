import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthCallback = () => {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await checkAuth(); // This sets user + isLoggedIn in context
        navigate("/"); // Redirect to home on success
      } catch (err) {
        navigate("/login"); // Fallback on failure
      }
    };

    verify();
  }, [navigate, checkAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pink-400 mx-auto mb-4"></div>
        <p className="text-gray-500 text-lg">Verifying login...</p>
      </div>
    </div>
  );
};

export default AuthCallback;