// routes/feedback.js

import express from "express";
import Feedback from "../models/feedback.js";

const router = express.Router();

// @route   POST /api/feedback
// @desc    Submit feedback
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res.status(200).json({ message: "Feedback saved successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Failed to save feedback" });
  }
});

export default router;
