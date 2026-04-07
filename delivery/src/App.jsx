import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import { RouteSkeleton } from "./components/Skeletons.jsx";

const About = lazy(() => import("./pages/About.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const PastOrders = lazy(() => import("./pages/PastOrders.jsx"));
const Signup = lazy(() => import("./components/Signup.jsx"));

function ProtectedRoute({ isAllowed, children }) {
  const location = useLocation();
  if (!isAllowed) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem("email"));
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    function onStorage(e) {
      if (e.key === "email") {
        setIsLoggedIn(Boolean(e.newValue));
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />
        <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />

        <main className="flex flex-1 flex-col pt-16">
          <Suspense fallback={<RouteSkeleton />}>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />

              <Route
                path="/orders"
                element={<Orders />}
              />

              <Route
                path="/past-orders"
                element={
                  <ProtectedRoute isAllowed={isLoggedIn}>
                    <PastOrders />
                  </ProtectedRoute>
                }
              />

              <Route path="/contact" element={<Contact />} />

              <Route
                path="/signup"
                element={isLoggedIn ? <Navigate to="/orders" replace /> : <Signup onLogin={() => setIsLoggedIn(true)} />}
              />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
