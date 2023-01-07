import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import secure from "ssl-express-www";
import session from "express-session";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Upload Route for Profile Picture
import uploadRoutesProfilePicture from "./routes/uploadRoutesProfilePicture.js";

//  API
import stripe from "./routes/stripe.js";

// Google
import authRoutes from "./routes/authRoutes.js";
import passport from "./config/passport.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.VITE_NODE_ENV === "development") {
  app.use(morgan("dev"), cors());
}

if (process.env.VITE_NODE_ENV === "production") {
  app.use(secure, cors());
}

app.use(express.json());

// Session
app.use(
  session({
    secret: process.env.VITE_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", cors());
app.use("/api", cors());
app.use("/api/", cors());

app.use("/api/products", productRoutes, cors());
app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes, cors());
app.use("/api/rates", orderRoutes, cors());
app.use("/api/upload", uploadRoutes);
app.use("/api/stripe", stripe);
app.use("/api/uploadprofilepicture", uploadRoutesProfilePicture);
app.use("/api/auth", authRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.VITE_NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "frontend", "build", "index.html"),
      cors()
    )
  );
} else {
  app.get(
    "/",
    (req, res) => {
      res.send("API is running....");
    },
    cors()
  );
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.VITE_PORT || 7500;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.VITE_NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
