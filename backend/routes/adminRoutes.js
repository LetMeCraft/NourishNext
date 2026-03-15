import express from "express";
import User from "../models/User.js";
import Feedback from "../models/feedback.js";
import FoodDonation from "../models/foodDonation.js";

const router = express.Router();

// ✅ Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// ✅ Get all feedback

router.get("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback); // frontend can use fb.createdAt as date
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
});

// ✅ Get all donations
router.get("/donations", async (req, res) => {
  try {
    const donations = await FoodDonation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error });
  }
});

export default router;
