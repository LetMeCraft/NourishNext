import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import DeliveryPartner from "../models/delivery.js";
import FoodDonation from "../models/foodDonation.js";
import Feedback from "../models/feedback.js";

dotenv.config({ override: true });

const mongoDbName = process.env.MONGO_DB_NAME || "nourish_next";
const rawMongoUri = (process.env.MONGO_URI || "").trim().replace(/^MONGO_URI=/, "");
const mongoUri = rawMongoUri || `mongodb://127.0.0.1:27017/${mongoDbName}`;

const defaultAdmin = {
  name: process.env.ADMIN_NAME || "Arpit Sharma",
  email: process.env.ADMIN_EMAIL || "admin@nourishnext.local",
  password: process.env.ADMIN_PASSWORD || "admin123",
  gender: process.env.ADMIN_GENDER || "Prefer not to say",
  location: process.env.ADMIN_LOCATION || "Chennai",
};

const demoUsers = [
  {
    name: "Ananya Ravi",
    email: "ananya@nourishnext.demo",
    password: "demo123",
    gender: "Female",
    location: "Chennai",
  },
  {
    name: "Rahul Menon",
    email: "rahul@nourishnext.demo",
    password: "demo123",
    gender: "Male",
    location: "Coimbatore",
  },
  {
    name: "Meera Joseph",
    email: "meera@nourishnext.demo",
    password: "demo123",
    gender: "Female",
    location: "Madurai",
  },
];

const demoPartners = [
  {
    name: "Kavin Raj",
    email: "kavin.delivery@nourishnext.demo",
    password: "demo123",
    gender: "Male",
    location: "Chennai",
  },
  {
    name: "Priya Nair",
    email: "priya.delivery@nourishnext.demo",
    password: "demo123",
    gender: "Female",
    location: "Madurai",
  },
  {
    name: "Sanjay Kumar",
    email: "sanjay.delivery@nourishnext.demo",
    password: "demo123",
    gender: "Male",
    location: "Coimbatore",
  },
];

const demoFeedback = [
  {
    name: "Ananya Ravi",
    email: "ananya@nourishnext.demo",
    message: "The donation flow feels smooth and reassuring. It was easy to submit food details quickly.",
  },
  {
    name: "Rahul Menon",
    email: "rahul@nourishnext.demo",
    message: "Would love a map-based pickup tracker in the future, but the current process already feels well organized.",
  },
  {
    name: "Meera Joseph",
    email: "meera@nourishnext.demo",
    message: "Appreciate how clearly NourishNext connects donors, admins, and delivery partners in one place.",
  },
  {
    name: "Kavin Raj",
    email: "kavin.delivery@nourishnext.demo",
    message: "The delivery dashboard is helpful for keeping track of active and completed pickups during demos.",
  },
];

const demoDonations = [
  {
    foodname: "Vegetable Biryani",
    meal: "veg",
    category: "cooked-food",
    quantity: "35",
    phoneno: "9876543210",
    district: "chennai",
    address: "12 Gandhi Street, T Nagar, Chennai",
    name: "Ananya Ravi",
    email: "ananya@nourishnext.demo",
    status: "Pending",
    rating: 0,
    deliveryPartner: "",
  },
  {
    foodname: "Packed Rotis And Dal",
    meal: "veg",
    category: "packed-food",
    quantity: "20",
    phoneno: "9840011122",
    district: "chennai",
    address: "44 Anna Salai, Chennai",
    name: "Ananya Ravi",
    email: "ananya@nourishnext.demo",
    status: "Processing",
    rating: 0,
    deliveryPartner: "kavin.delivery@nourishnext.demo",
  },
  {
    foodname: "Rice And Curry Packets",
    meal: "veg",
    category: "packed-food",
    quantity: "28",
    phoneno: "9790099001",
    district: "coimbatore",
    address: "18 Cross Cut Road, Coimbatore",
    name: "Rahul Menon",
    email: "rahul@nourishnext.demo",
    status: "Pending",
    rating: 0,
    deliveryPartner: "",
  },
  {
    foodname: "Fresh Grocery Kit",
    meal: "veg",
    category: "raw-food",
    quantity: "16",
    phoneno: "9788812345",
    district: "madurai",
    address: "7 KK Nagar, Madurai",
    name: "Meera Joseph",
    email: "meera@nourishnext.demo",
    status: "Pending",
    rating: 0,
    deliveryPartner: "",
  },
  {
    foodname: "Idli Breakfast Batch",
    meal: "veg",
    category: "cooked-food",
    quantity: "24",
    phoneno: "9003100456",
    district: "chennai",
    address: "81 Mylapore Tank Road, Chennai",
    name: "Ananya Ravi",
    email: "ananya@nourishnext.demo",
    status: "Collected",
    rating: 5,
    deliveryPartner: "kavin.delivery@nourishnext.demo",
  },
  {
    foodname: "Veg Meals For Shelter",
    meal: "veg",
    category: "cooked-food",
    quantity: "30",
    phoneno: "9094500786",
    district: "madurai",
    address: "22 Palace Road, Madurai",
    name: "Meera Joseph",
    email: "meera@nourishnext.demo",
    status: "Collected",
    rating: 4,
    deliveryPartner: "priya.delivery@nourishnext.demo",
  },
  {
    foodname: "Chennai Lemon Rice Packs",
    meal: "veg",
    category: "packed-food",
    quantity: "18",
    phoneno: "9003100781",
    district: "chennai",
    address: "15 Usman Road, T Nagar, Chennai",
    name: "Ananya Ravi",
    email: "ananya@nourishnext.demo",
    status: "Pending",
    rating: 0,
    deliveryPartner: "",
  },
  {
    foodname: "Chennai Dinner Parcel Set",
    meal: "veg",
    category: "cooked-food",
    quantity: "22",
    phoneno: "9840098765",
    district: "chennai",
    address: "9 Besant Avenue, Adyar, Chennai",
    name: "Rahul Menon",
    email: "rahul@nourishnext.demo",
    status: "Processing",
    rating: 0,
    deliveryPartner: "kavin.delivery@nourishnext.demo",
  },
  {
    foodname: "Chennai Fruit Crates",
    meal: "veg",
    category: "raw-food",
    quantity: "14",
    phoneno: "9884412345",
    district: "chennai",
    address: "3 Market Lane, Koyambedu, Chennai",
    name: "Meera Joseph",
    email: "meera@nourishnext.demo",
    status: "Collected",
    rating: 5,
    deliveryPartner: "kavin.delivery@nourishnext.demo",
  },
  {
    foodname: "Coimbatore Sambar Rice Batch",
    meal: "veg",
    category: "cooked-food",
    quantity: "26",
    phoneno: "9790011223",
    district: "coimbatore",
    address: "24 RS Puram Main Road, Coimbatore",
    name: "Rahul Menon",
    email: "rahul@nourishnext.demo",
    status: "Pending",
    rating: 0,
    deliveryPartner: "",
  },
  {
    foodname: "Coimbatore Grocery Essentials",
    meal: "veg",
    category: "raw-food",
    quantity: "19",
    phoneno: "9788811122",
    district: "coimbatore",
    address: "42 Peelamedu Road, Coimbatore",
    name: "Ananya Ravi",
    email: "ananya@nourishnext.demo",
    status: "Processing",
    rating: 0,
    deliveryPartner: "sanjay.delivery@nourishnext.demo",
  },
  {
    foodname: "Coimbatore Packed Breakfast",
    meal: "veg",
    category: "packed-food",
    quantity: "21",
    phoneno: "9094012345",
    district: "coimbatore",
    address: "6 Avinashi Road, Coimbatore",
    name: "Meera Joseph",
    email: "meera@nourishnext.demo",
    status: "Collected",
    rating: 4,
    deliveryPartner: "sanjay.delivery@nourishnext.demo",
  },
  {
    foodname: "Madurai Curd Rice Boxes",
    meal: "veg",
    category: "packed-food",
    quantity: "17",
    phoneno: "9003214567",
    district: "madurai",
    address: "10 Anna Nagar, Madurai",
    name: "Meera Joseph",
    email: "meera@nourishnext.demo",
    status: "Pending",
    rating: 0,
    deliveryPartner: "",
  },
  {
    foodname: "Madurai Mixed Meals",
    meal: "veg",
    category: "cooked-food",
    quantity: "25",
    phoneno: "9094512345",
    district: "madurai",
    address: "31 East Masi Street, Madurai",
    name: "Rahul Menon",
    email: "rahul@nourishnext.demo",
    status: "Processing",
    rating: 0,
    deliveryPartner: "priya.delivery@nourishnext.demo",
  },
  {
    foodname: "Madurai Vegetable Supply Kit",
    meal: "veg",
    category: "raw-food",
    quantity: "15",
    phoneno: "9788901234",
    district: "madurai",
    address: "5 Alagar Kovil Road, Madurai",
    name: "Ananya Ravi",
    email: "ananya@nourishnext.demo",
    status: "Collected",
    rating: 5,
    deliveryPartner: "priya.delivery@nourishnext.demo",
  },
];

const connectDb = async () => {
  await mongoose.connect(mongoUri, { dbName: mongoDbName });
  console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);
};

const upsertAdmin = async (payload) => {
  let admin = await Admin.findOne({ email: payload.email });

  if (!admin) {
    admin = new Admin(payload);
  } else {
    admin.name = payload.name;
    admin.gender = payload.gender;
    admin.location = payload.location;
    admin.password = payload.password;
  }

  await admin.save();
  return admin;
};

const upsertUser = async (payload) => {
  let user = await User.findOne({ email: payload.email });

  if (!user) {
    user = new User(payload);
  } else {
    user.name = payload.name;
    user.gender = payload.gender;
    user.location = payload.location;
    user.password = payload.password;
  }

  await user.save();
  return user;
};

const upsertDeliveryPartner = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  let partner = await DeliveryPartner.findOne({ email: payload.email });

  if (!partner) {
    partner = new DeliveryPartner({
      ...payload,
      password: hashedPassword,
    });
  } else {
    partner.name = payload.name;
    partner.gender = payload.gender;
    partner.location = payload.location;
    partner.password = hashedPassword;
  }

  await partner.save();
  return partner;
};

const upsertFeedback = async (payload) => {
  const existing = await Feedback.findOne({
    email: payload.email,
    message: payload.message,
  });

  if (existing) {
    existing.name = payload.name;
    await existing.save();
    return existing;
  }

  const feedback = new Feedback(payload);
  await feedback.save();
  return feedback;
};

const upsertDonation = async (payload) => {
  const existing = await FoodDonation.findOne({
    email: payload.email,
    foodname: payload.foodname,
    address: payload.address,
  });

  if (existing) {
    Object.assign(existing, payload);
    await existing.save();
    return existing;
  }

  const donation = new FoodDonation(payload);
  await donation.save();
  return donation;
};

const main = async () => {
  try {
    await connectDb();

    await upsertAdmin(defaultAdmin);
    await Promise.all(demoUsers.map(upsertUser));
    await Promise.all(demoPartners.map(upsertDeliveryPartner));
    await Promise.all(demoFeedback.map(upsertFeedback));
    await Promise.all(demoDonations.map(upsertDonation));

    console.log("");
    console.log("Demo data seeded successfully.");
    console.log("Admin login:");
    console.log(`  ${defaultAdmin.email} / ${defaultAdmin.password}`);
    console.log("Demo donor logins:");
    demoUsers.forEach((user) => {
      console.log(`  ${user.email} / ${user.password}`);
    });
    console.log("Demo delivery logins:");
    demoPartners.forEach((partner) => {
      console.log(`  ${partner.email} / ${partner.password}`);
    });
  } finally {
    await mongoose.disconnect();
  }
};

main().catch((error) => {
  console.error("Failed to seed demo data:", error);
  process.exitCode = 1;
});
