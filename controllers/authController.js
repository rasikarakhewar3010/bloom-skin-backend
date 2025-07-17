const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ✅ Register Controller
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    console.log(`✅ User registered: ${email}`);
    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("❌ Error in register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Login Controller (Passport handles authentication)
exports.login = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  console.log(`✅ User logged in: ${req.user.email}`);
  res.status(200).json({ message: "Logged in successfully", user: req.user });
};

// ✅ Logout Controller
exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error("❌ Error during logout:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid", {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    console.log("✅ User logged out");
    res.json({ message: "Logged out successfully" });
  });
};
