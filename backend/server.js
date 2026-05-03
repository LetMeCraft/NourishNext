import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Admin from "./models/Admin.js";
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import foodDonationRoutes from "./routes/foodDonationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";

dotenv.config({ override: true });

const app = express();

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

const configuredOrigins = (
  process.env.FRONTEND_URLS ||
  process.env.FRONTEND_URL ||
  ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const originAllowlist = new Set([
  ...DEFAULT_ALLOWED_ORIGINS,
  ...configuredOrigins,
]);

const mongoDbName = process.env.MONGO_DB_NAME || "nourish_next";
const rawMongoUri = (process.env.MONGO_URI || "").trim().replace(/^MONGO_URI=/, "");
const mongoUri = rawMongoUri || `mongodb://127.0.0.1:27017/${mongoDbName}`;
const allowVercelPreviewOrigins = process.env.ALLOW_VERCEL_PREVIEWS !== "false";
const defaultAdminProfile = {
  name: process.env.ADMIN_NAME || "Arpit Sharma",
  email: process.env.ADMIN_EMAIL || "admin@nourishnext.local",
  password: process.env.ADMIN_PASSWORD || "admin123",
  gender: process.env.ADMIN_GENDER || "Prefer not to say",
  location: process.env.ADMIN_LOCATION || "Chennai",
};

const globalForMongoose = globalThis;
const mongooseCache = globalForMongoose.__nourishNextMongoose ?? {
  connection: null,
  promise: null,
  adminPromise: null,
};

globalForMongoose.__nourishNextMongoose = mongooseCache;

const connectDb = async () => {
  if (mongooseCache.connection && mongoose.connection.readyState === 1) {
    return mongooseCache.connection;
  }

  if (!mongooseCache.promise) {
    mongooseCache.promise = mongoose
      .connect(mongoUri, { dbName: mongoDbName })
      .then((mongooseInstance) => {
        console.log(`MongoDB connected to ${mongooseInstance.connection.name}`);
        return mongooseInstance;
      })
      .catch((error) => {
        mongooseCache.promise = null;
        throw error;
      });
  }

  mongooseCache.connection = await mongooseCache.promise;
  return mongooseCache.connection;
};

const ensureDefaultAdmin = async () => {
  if (mongooseCache.adminPromise) {
    return mongooseCache.adminPromise;
  }

  mongooseCache.adminPromise = (async () => {
    const existingAdmin = await Admin.findOne({ email: defaultAdminProfile.email });
    if (existingAdmin) {
      return existingAdmin;
    }

    const admin = new Admin(defaultAdminProfile);
    await admin.save();
    console.log(`Default admin ensured for ${defaultAdminProfile.email}`);
    return admin;
  })().catch((error) => {
    mongooseCache.adminPromise = null;
    throw error;
  });

  return mongooseCache.adminPromise;
};

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (originAllowlist.has(origin)) {
    return true;
  }

  if (!allowVercelPreviewOrigins) {
    return false;
  }

  try {
    const { protocol, hostname } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.name || mongoDbName,
    connection: process.env.MONGO_URI ? "configured" : "using-local-default",
  });
});

app.get("/", (req, res) => {
  res.send("Nourish Next backend is running.");
});

app.use(async (req, res, next) => {
  if (!req.path.startsWith("/api")) {
    return next();
  }

  try {
    await connectDb();
    await ensureDefaultAdmin();
    return next();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return res.status(500).json({ message: "Database connection failed" });
  }
});

app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/food-donation", foodDonationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/delivery", deliveryRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;
