// ================================================
// config/passport.js for Bloom Skin
// ================================================

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ================================================
// ✅ Serialize user ID into session
// ================================================
passport.serializeUser((user, done) => {
  console.log("✅ Serializing user:", user.id);
  done(null, user.id);
});

// ================================================
// ✅ Deserialize user from session
// ================================================
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log("⚠️ User not found during deserialization:", id);
      return done(null, false);
    }
    console.log("✅ Deserialized user:", user.email || user.id);
    done(null, user);
  } catch (err) {
    console.error("❌ Error in deserializeUser:", err);
    done(err, null);
  }
});

// ================================================
// ✅ Local Strategy for email/password login
// ================================================
passport.use(new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user || !user.password) {
        console.log("⚠️ User not found or missing password:", email);
        return done(null, false, { message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("⚠️ Incorrect password for:", email);
        return done(null, false, { message: "Incorrect password" });
      }

      console.log("✅ LocalStrategy login successful for:", email);
      return done(null, user);
    } catch (err) {
      console.error("❌ Error in LocalStrategy:", err);
      return done(err);
    }
  }
));

// ================================================
// ✅ Google OAuth 2.0 Strategy
// ================================================
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log("✅ Google profile received:", profile.id, profile.displayName);

      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        console.log("✅ Existing Google user found:", user.email || user.id);
        return done(null, user);
      }

      // Handle if profile.emails is undefined
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : undefined;

      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: email,
      });

      console.log("✅ New Google user created:", user.email || user.id);
      return done(null, user);
    } catch (err) {
      console.error("❌ Error in GoogleStrategy:", err);
      return done(err, null);
    }
  }
));

module.exports = passport;
