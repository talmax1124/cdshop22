import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import secure from "ssl-express-www";
import session from "cookie-session";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import rateRoutes from "./routes/rateRoutes.js";

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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"), cors());
}

if (process.env.NODE_ENV === "production") {
  app.use(secure, cors());
}

app.use(express.json());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// use the cors package to enable CORS with various options

// let corsClientEnv = process.env.CLIENT_URL;

// Allow headers for CORS

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type" /*, "Authorization"*/],
};

app.use(cors(corsOptions));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("API is running..."), cors());

app.use("/api/products", productRoutes, cors());
app.use("/api/articles", articleRoutes, cors());
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes, cors());
app.use("/api/rates", rateRoutes, cors());
app.use("/api/upload", uploadRoutes);
app.use("/api/stripe", stripe);
app.use("/api/uploadprofilepicture", uploadRoutesProfilePicture);
app.use("/api/auth", authRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
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

const PORT = process.env.PORT || 7500;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

///Testing
