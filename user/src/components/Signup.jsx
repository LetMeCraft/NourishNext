import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Gender Select Component
const GenderSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const options = ["Male", "Female", "Other", "Prefer not to say"];
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full mb-3" ref={ref}>
      <div
        className={`w-full p-3 rounded-lg border border-green-500 bg-gray-50 flex justify-between items-center cursor-pointer ${value ? "text-gray-800" : "text-gray-500"}`}
        onClick={() => setOpen(!open)}
      >
        {value || "Select gender"}
        <svg
          className={`w-5 h-5 text-green-600 transform ${open ? "rotate-180" : ""} transition-transform duration-200`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {open && (
        <ul className="absolute z-10 w-full bg-white border border-green-500 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt}
              className="p-3 hover:bg-gradient-to-b from-green-100 to-green-300 text-gray-700 cursor-pointer transition-colors"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Location Select Component
const LocationSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const options = ["Chennai", "Coimbatore", "Madurai" ];
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full mb-3" ref={ref}>
      <div
        className={`w-full p-3 rounded-lg border border-green-500 bg-gray-50 flex justify-between items-center cursor-pointer ${value ? "text-gray-800" : "text-gray-500"}`}
        onClick={() => setOpen(!open)}
      >
        {value || "Select location"}
        <svg
          className={`w-5 h-5 text-green-600 transform ${open ? "rotate-180" : ""} transition-transform duration-200`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {open && (
        <ul className="absolute z-10 w-full bg-white border border-green-500 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt}
              className="p-3 hover:bg-gradient-to-b from-green-100 to-green-300 text-gray-700 cursor-pointer transition-colors"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Auth Form Component
const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const url = isSignup
        ? `${import.meta.env.VITE_API_BASE_URL}/api/users/signup`
        : `${import.meta.env.VITE_API_BASE_URL}/api/users/login`;

      const res = await axios.post(url, formData);
      setSuccess(res.data.message);

      const user = res.data.user;

      if (user) {
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("gender", user.gender);
        localStorage.setItem("location", user.location);
        navigate("/");
      } else if (isSignup) {
        const loginRes = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
          email: formData.email,
          password: formData.password,
        });

        const loginUser = loginRes.data.user;

        localStorage.setItem("name", loginUser.name);
        localStorage.setItem("email", loginUser.email);
        localStorage.setItem("gender", loginUser.gender);
        localStorage.setItem("location", loginUser.location);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={`flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 py-15 ${isSignup ? "min-h-screen" : "py-32"}`}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gradient-to-t from-green-100 mt-5 to-white p-6 rounded-xl shadow-xl border border-green-200"
      >
        <h2 className="text-2xl font-bold text-green-600 text-center mb-5">
          {isSignup ? "Create Your Account" : "Login to Your Account"}
        </h2>

        {isSignup && (
          <>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full mb-3 p-3 rounded-lg border border-green-500 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-600"
            />

            <label className="block text-gray-700 mb-1">Gender</label>
            <GenderSelect
              value={formData.gender}
              onChange={(val) => setFormData({ ...formData, gender: val })}
            />

            <label className="block text-gray-700 mb-1">Location</label>
            <LocationSelect
              value={formData.location}
              onChange={(val) => setFormData({ ...formData, location: val })}
            />
          </>
        )}

        <label className="block text-gray-700 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full mb-3 p-3 rounded-lg border border-green-500 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-600"
        />

        <label className="block text-gray-700 mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          className="w-full mb-4 p-3 rounded-lg bg-gray-50 border border-green-500 focus:outline-none focus:ring-1 focus:ring-green-600"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold mb-3 shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-center mb-2">{success}</p>}

        <p className="text-gray-600 text-center text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
              setSuccess("");
            }}
            className="text-green-600 cursor-pointer font-semibold hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
