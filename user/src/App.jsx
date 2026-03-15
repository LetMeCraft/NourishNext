import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./components/Signup.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import FoodDonationForm from "./components/FoodDonationForm.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import DashboardLogins from "./pages/DashboardLogins.jsx";

function App() {
  const [navActive, setNavActive] = useState(false);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar navActive={navActive} setNavActive={setNavActive} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/start" element={<DashboardLogins />} />
        <Route path="/foodDonationForm" element={<FoodDonationForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
