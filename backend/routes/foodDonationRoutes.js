import express from "express";
import FoodDonation from "../models/foodDonation.js";

const router = express.Router();

/* ----------------------- CREATE A NEW DONATION ----------------------- */
router.post("/", async (req, res) => {
  const {
    foodname,
    meal,
    category,
    quantity,
    phoneno,
    district,
    address,
    name,
    email,
  } = req.body;

  if (
    !foodname ||
    !meal ||
    !category ||
    !quantity ||
    !phoneno ||
    !district ||
    !address ||
    !name
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const donation = new FoodDonation({
      foodname,
      meal,
      category,
      quantity,
      phoneno,
      district,
      address,
      name,
      email,
      status: "Pending",
    });

    await donation.save();
    res.status(201).json({ message: "Donation submitted successfully" });
  } catch (error) {
    console.error("❌ Error saving food donation:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

/* ----------------------- GET DONATIONS BY EMAIL ----------------------- */
router.post("/get", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const donations = await FoodDonation.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    console.error("❌ Error fetching donations:", error);
    res.status(500).json({ message: "Server error while fetching donations" });
  }
});

/* ----------------------- GET ALL DONATIONS ----------------------- */
router.get("/", async (req, res) => {
  try {
    const donations = await FoodDonation.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    console.error("❌ Error fetching all donations:", error);
    res.status(500).json({ message: "Server error while fetching donations" });
  }
});

/* ----------------------- UPDATE ORDER STATUS ----------------------- */
router.put("/:id/status", async (req, res) => {
  const { status, deliveryPartner } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const updatedDonation = await FoodDonation.findByIdAndUpdate(
      req.params.id,
      { status, deliveryPartner },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json(updatedDonation);
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ message: "Server error while updating status" });
  }
});

/* ----------------------- ASSIGN DELIVERY PARTNER ----------------------- */
router.put("/assign/:id", async (req, res) => {
  const { deliveryPartner } = req.body;
  if (!deliveryPartner) {
    return res.status(400).json({ message: "Delivery partner email is required" });
  }

  try {
    const donation = await FoodDonation.findByIdAndUpdate(
      req.params.id,
      { deliveryPartner },
      { new: true }
    );
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.json(donation);
  } catch (error) {
    console.error("❌ Error assigning delivery partner:", error);
    res.status(500).json({ message: "Error assigning delivery partner" });
  }
});

/* ----------------------- UPDATE RATING ----------------------- */
router.put("/rate/:id", async (req, res) => {
  const { rating } = req.body;

  if (rating == null || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const donation = await FoodDonation.findByIdAndUpdate(
      req.params.id,
      { rating },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json({
      message: "Rating updated successfully",
      donation,
    });
  } catch (error) {
    console.error("❌ Error updating rating:", error);
    res.status(500).json({ message: "Server error while updating rating" });
  }
});

export default router;
