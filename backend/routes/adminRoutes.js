import express from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Feedback from "../models/feedback.js";
import FoodDonation from "../models/foodDonation.js";

const router = express.Router();

const serializeAdmin = (admin) => ({
  name: admin.name,
  email: admin.email,
  gender: admin.gender,
  location: admin.location,
  createdAt: admin.createdAt,
});

router.post("/signup", async (req, res) => {
  const { name, email, password, gender, location } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const admin = new Admin({ name, email, password, gender, location });
    await admin.save();

    return res.status(201).json({
      message: "Admin account created successfully",
      user: serializeAdmin(admin),
    });
  } catch (error) {
    console.error("Admin signup error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: serializeAdmin(admin),
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error });
  }
});

router.get("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    return res.json(feedback);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching feedback", error });
  }
});

router.get("/donations", async (req, res) => {
  try {
    const donations = await FoodDonation.find();
    return res.json(donations);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching donations", error });
  }
});

export default router;
