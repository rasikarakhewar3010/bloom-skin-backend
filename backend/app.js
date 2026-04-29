const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const path = require("path");

dotenv.config();
require("./config/passport");

const app = express();

// ------------------------------
// ✅ Middleware
// ------------------------------
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ CORS: allow frontend to send cookies
app.use(cors({
  origin: process.env.FRONTEND_URL, // e.g. http://localhost:5173
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
      secure: process.env.NODE_ENV === "production", // true in prod only
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());



// ------------------------------
// ✅ Routes
// ------------------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/predict", require("./routes/prediction.routes"));
app.use("/api/history", require("./routes/history.routes"));
app.use("/api/recommendations", require("./routes/recommendation.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/routine", require("./routes/routine.routes"));

// ------------------------------
// ✅ MongoDB & Start Server
// ------------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {

    });
  })