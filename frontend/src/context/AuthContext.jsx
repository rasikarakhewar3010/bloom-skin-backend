import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check actual session status on mount (not just localStorage)
  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get("/api/auth/me", {
        withCredentials: true,
      });
      if (res.data?.user) {
        setUser(res.data.user);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      } else {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      }
    } catch (err) {
      // Not authenticated — clear state
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Quick optimistic check from localStorage first
    const storedLogin = localStorage.getItem("isLoggedIn") === "true";
    if (storedLogin) {
      setIsLoggedIn(true);
    }
    // Then verify with the actual server session
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
    } catch (err) {

    } finally {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, loading, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
