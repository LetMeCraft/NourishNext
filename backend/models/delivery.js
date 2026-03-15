import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String },
  location: { type: String },
}, { timestamps: true });

const DeliveryPartner = mongoose.model("DeliveryPartner", deliverySchema);
export default DeliveryPartner;
