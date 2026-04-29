import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [flash, setFlash] = useState({ message: "", type: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setUser, checkAuth } = useAuth();

  const toggle = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", email: "", password: "" });
    setFlash({ message: "", type: "" });
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value || "",
    }));
  };

  const showFlash = (message, type) => {
    setFlash({ message, type });
    setTimeout(() => setFlash({ message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    // Client-side validation
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      showFlash("Please fill in all required fields.", "error");
      return;
    }

    const baseUrl = import.meta.env.VITE_API_URL || "";
    setSubmitting(true);
    const url = isLogin ? `${baseUrl}/api/auth/login` : `${baseUrl}/api/auth/register`;
    const dataToSend = isLogin
      ? { email: form.email, password: form.password }
      : form;

    try {
      const res = await axios.post(url, dataToSend, {
        withCredentials: true,
      });
      showFlash(`${isLogin ? "Login" : "Signup"} Successful`, "success");

      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);

      // Store user data if returned
      if (res.data?.user) {
        setUser(res.data.user);
      }

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      showFlash(err.response?.data?.error || err.response?.data?.message || err.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    // Use full URL for production
    const baseUrl = import.meta.env.VITE_API_URL || "";
    window.open(`${baseUrl}/api/auth/google`, "_self");
  };

  // Check session on mount (e.g., after Google redirect)
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      return;
    }

    // Verify session with server
    checkAuth().then(() => {
      // checkAuth updates isLoggedIn state internally
    });
  }, []);

  // Redirect when login state changes
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4 relative">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {flash.message && (
          <div
            className={`mb-4 p-3 rounded-md text-sm text-center font-medium ${
              flash.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {flash.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {isLogin && (
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-pink-500 hover:text-pink-600 font-medium transition"
              >
                Forgot Password?
              </Link>
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-400 font-medium">or</div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full border py-2 rounded-md hover:bg-gray-50 transition"
        >
          <FcGoogle size={22} />
          <span className="text-gray-700">Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggle}
            className="text-pink-500 font-semibold underline hover:text-pink-600 transition"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;