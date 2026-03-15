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
        className={`theme-input flex cursor-pointer items-center justify-between ${value ? "text-[var(--theme-ink)]" : "text-[var(--theme-muted)]"}`}
        onClick={() => setOpen(!open)}
      >
        {value || "Select gender"}
        <svg
          className={`h-5 w-5 text-[var(--theme-accent-deep)] transform ${open ? "rotate-180" : ""} transition-transform duration-200`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {open && (
        <ul className="theme-card absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-[20px] bg-[var(--theme-card)]">
          {options.map((opt) => (
            <li
              key={opt}
              className="cursor-pointer px-4 py-3 text-[var(--theme-ink)] transition-colors hover:bg-[rgba(79,127,125,0.10)]"
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
        className={`theme-input flex cursor-pointer items-center justify-between ${value ? "text-[var(--theme-ink)]" : "text-[var(--theme-muted)]"}`}
        onClick={() => setOpen(!open)}
      >
        {value || "Select location"}
        <svg
          className={`h-5 w-5 text-[var(--theme-accent-deep)] transform ${open ? "rotate-180" : ""} transition-transform duration-200`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {open && (
        <ul className="theme-card absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-[20px] bg-[var(--theme-card)]">
          {options.map((opt) => (
            <li
              key={opt}
              className="cursor-pointer px-4 py-3 text-[var(--theme-ink)] transition-colors hover:bg-[rgba(79,127,125,0.10)]"
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
    <div className={`theme-page flex items-center justify-center px-4 py-15 ${isSignup ? "min-h-screen" : "py-32"}`}>
      <form
        onSubmit={handleSubmit}
        className="theme-card-soft mt-5 w-full max-w-md rounded-[30px] p-7"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-[var(--theme-accent-deep)]">
          {isSignup ? "Create Your Account" : "Login to Your Account"}
        </h2>

        {isSignup && (
          <>
            <label className="mb-2 block text-[var(--theme-ink)]">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="theme-input mb-3"
            />

            <label className="mb-2 block text-[var(--theme-ink)]">Gender</label>
            <GenderSelect
              value={formData.gender}
              onChange={(val) => setFormData({ ...formData, gender: val })}
            />

            <label className="mb-2 block text-[var(--theme-ink)]">Location</label>
            <LocationSelect
              value={formData.location}
              onChange={(val) => setFormData({ ...formData, location: val })}
            />
          </>
        )}

        <label className="mb-2 block text-[var(--theme-ink)]">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="theme-input mb-3"
        />

        <label className="mb-2 block text-[var(--theme-ink)]">Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          className="theme-input mb-4"
        />

        <button
          type="submit"
          className="theme-button mb-3 w-full rounded-[18px] p-3 font-semibold"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && <p className="mb-2 text-center text-[var(--theme-accent-deep)]">{success}</p>}

        <p className="text-center text-sm text-[var(--theme-muted)]">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
              setSuccess("");
            }}
            className="cursor-pointer font-semibold text-[var(--theme-accent-deep)] hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;

