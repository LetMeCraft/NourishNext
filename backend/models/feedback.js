import mongoose from "mongoose";

// Define Mongoose schema
const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt
  }
);

// Create model
const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
