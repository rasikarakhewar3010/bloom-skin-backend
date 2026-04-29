import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!password || !confirmPassword) {
      setMessage({ text: "Please fill in both fields.", type: "error" });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    if (password.length < 6 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      setMessage({
        text: "Password must be at least 6 characters with at least one letter and one number.",
        type: "error",
      });
      return;
    }

    setSubmitting(true);
    setMessage({ text: "", type: "" });

    const baseUrl = import.meta.env.VITE_API_URL || "";
    try {
      const res = await axios.post(`${baseUrl}/api/auth/reset-password/${token}`, { password }, {
        withCredentials: true,
      });
      setMessage({ text: res.data.message, type: "success" });

      // Auto-login if user data is returned
      if (res.data.user) {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setUser(res.data.user);
      }

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setMessage({
        text: err.response?.data?.error || "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center text-pink-500">
          Reset Password
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter your new password below.
        </p>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded-md text-sm text-center font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {submitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Back to{" "}
          <Link
            to="/login"
            className="text-pink-500 font-semibold underline hover:text-pink-600 transition"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
