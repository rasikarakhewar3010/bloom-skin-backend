const bcrypt = require("bcryptjs");
const User = require("../models/User");

// --- Input Validation Helpers ---
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isStrongPassword = (password) => {
  // At least 6 characters, at least one letter and one number
  return password && password.length >= 6 && /[a-zA-Z]/.test(password) && /\d/.test(password);
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // --- Validation ---
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields (name, email, password) are required." });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      return res.status(400).json({ message: "Name must be between 2 and 50 characters." });
    }

    if (!isValidEmail(trimmedEmail)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: "Password must be at least 6 characters with at least one letter and one number." });
    }

    const existing = await User.findOne({ email: trimmedEmail });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hash,
    });

    res.status(201).json({ message: "Registered successfully." });
  } catch (err) {

    res.status(500).json({ message: "Server error during registration. Please try again." });
  }
};

// @desc    Login callback (called after passport.authenticate succeeds)
// @route   POST /api/auth/login
exports.login = (req, res) => {
  // req.user is already set by passport at this point
  res.status(200).json({
    message: "Logged in successfully.",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};

// @desc    Logout user
// @route   GET /api/auth/logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {

      return res.status(500).json({ message: "Logout failed. Please try again." });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully." });
  });
};