const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

dotenv.config();
require("./config/passport");

const app = express();

// ✅ TRUST PROXY (REQUIRED FOR SECURE COOKIES ON RENDER)
app.set('trust proxy', 1);

// ------------------------------
// ✅ Middleware
// ------------------------------
app.use(express.json());
app.use(cookieParser());

// ✅ CORS: allow frontend to send cookies securely
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://bloom-skin-frontend.onrender.com",
  credentials: true,
}));

// ✅ Express Session with Mongo Store
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      secure: true,                    // ✅ required for HTTPS (Render)
      httpOnly: true,
      sameSite: 'none',                // ✅ required for cross-origin cookies
    },
  })
);

// ✅ Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// ✅ Debug Session
app.use((req, res, next) => {
  console.log("============== SESSION DEBUG ==============");
  console.log("Session:", req.session);
  console.log("User:", req.user);
  console.log("===========================================");
  next();
});

// ------------------------------
// ✅ Routes
// ------------------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/predict", require("./routes/prediction.routes"));
app.use("/api/history", require("./routes/history.routes"));

// ------------------------------
// ✅ MongoDB & Start Server
// ------------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at https://bloom-skin-backend.onrender.com or on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ DB connection error:", err));
