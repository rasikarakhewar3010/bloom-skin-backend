const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ✅ Serialize user ID to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ✅ Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log("⚠️ User not found during deserialization:", id);
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    console.error("❌ Error in deserializeUser:", err);
    done(err, null);
  }
});

// ✅ Local Strategy (email + password)
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

      return done(null, user);
    } catch (err) {
      console.error("❌ Error in LocalStrategy:", err);
      return done(err);
    }
  }
));

// ✅ Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        return done(null, user);
      }

      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      });

      done(null, user);
    } catch (err) {
      console.error("❌ Error in GoogleStrategy:", err);
      done(err, null);
    }
  }
));

module.exports = passport;
