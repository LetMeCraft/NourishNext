import express from "express";
import bcrypt from "bcryptjs";
import DeliveryPartner from "../models/delivery.js";

const router = express.Router();

// ------------------------
// DELIVERY PARTNER SIGNUP
// ------------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, gender, location } = req.body;

    // Check if email already exists
    const existingPartner = await DeliveryPartner.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new delivery partner
    const newPartner = new DeliveryPartner({
      name,
      email,
      password: hashedPassword,
      gender,
      location,
    });

    await newPartner.save();

    res.status(201).json({
      message: "Delivery partner registered successfully",
      user: {
        name: newPartner.name,
        email: newPartner.email,
        gender: newPartner.gender,
        location: newPartner.location,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error during signup", error: err.message });
  }
});

// ------------------------
// DELIVERY PARTNER LOGIN
// ------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const partner = await DeliveryPartner.findOne({ email });
    if (!partner) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, partner.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        name: partner.name,
        email: partner.email,
        gender: partner.gender,
        location: partner.location,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
});

export default router;
