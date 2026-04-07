import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const inputClassName =
  "w-full rounded-2xl border border-cyan-200 bg-white/90 px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

const fieldLabelClassName =
  "mb-1.5 block text-sm font-semibold tracking-wide text-slate-700";

// ==================== Gender Select ====================
const GenderSelect = ({ value, onChange, disabled = false }) => {
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
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        className={`${inputClassName} flex items-center justify-between text-left ${
          value ? "text-slate-800" : "text-slate-400"
        } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
      >
        <span>{value || "Select gender"}</span>
        <svg
          className={`h-5 w-5 text-cyan-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-cyan-200 bg-white p-2 shadow-xl">
          {options.map((opt) => (
            <li
              key={opt}
              className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-cyan-50"
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

// ==================== Location Select ====================
const LocationSelect = ({ value, onChange, disabled = false }) => {
  const [open, setOpen] = useState(false);
  const options = ["Chennai", "Coimbatore", "Madurai"];
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        className={`${inputClassName} flex items-center justify-between text-left ${
          value ? "text-slate-800" : "text-slate-400"
        } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
      >
        <span>{value || "Select location"}</span>
        <svg
          className={`h-5 w-5 text-cyan-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-cyan-200 bg-white p-2 shadow-xl">
          {options.map((opt) => (
            <li
              key={opt}
              className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-cyan-50"
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

// ==================== Auth Form (Signup / Login) ====================
const AuthForm = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (isSubmitting) return;
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const url = isSignup
        ? `${import.meta.env.VITE_API_BASE_URL}/api/delivery/signup`
        : `${import.meta.env.VITE_API_BASE_URL}/api/delivery/login`;

      const res = await axios.post(url, formData);
      setSuccess(res.data.message);
      const user = res.data.user;

      if (user) {
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("gender", user.gender);
        localStorage.setItem("location", user.location);

        if (onLogin) onLogin();
        navigate("/orders");
      } else if (isSignup) {
        const loginRes = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/delivery/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        const loginUser = loginRes.data.user;
        localStorage.setItem("name", loginUser.name);
        localStorage.setItem("email", loginUser.email);
        localStorage.setItem("gender", loginUser.gender);
        localStorage.setItem("location", loginUser.location);

        if (onLogin) onLogin();
        navigate("/orders");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={`relative overflow-hidden bg-[linear-gradient(180deg,#f8fcf9_0%,#edf5f0_100%)] px-4 sm:px-6 lg:px-8 ${
        isSignup
          ? "flex min-h-[calc(100vh-4rem)] items-center py-4 sm:py-5"
          : "flex flex-1 min-h-full items-center py-3 sm:py-4"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.08),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.06),_transparent_26%)]" />
      <div className="relative mx-auto w-full max-w-2xl rounded-[1.8rem] shadow-[0_20px_48px_rgba(15,23,42,0.06),0_0_0_1px_rgba(167,243,208,0.22),0_0_14px_rgba(110,231,183,0.08)]">
        <div className="rounded-[1.9rem] bg-[#eef3ef]/85 p-4 sm:p-5 lg:p-6">
          <form onSubmit={handleSubmit} className="rounded-[1.5rem] bg-[#f5f8f6] p-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)] sm:p-5">
            <div className="mx-auto max-w-2xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
                    {isSignup ? "New Partner" : "Partner Login"}
                  </span>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                    {isSignup ? "Create delivery access" : "Login to continue"}
                  </h2>
                </div>

                <div className="inline-flex rounded-full border border-cyan-100 bg-cyan-50 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignup(true);
                      setError("");
                      setSuccess("");
                    }}
                    disabled={isSubmitting}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isSignup
                        ? "bg-cyan-600 text-white shadow-md"
                        : "text-cyan-700"
                    } ${isSubmitting ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignup(false);
                      setError("");
                      setSuccess("");
                    }}
                    disabled={isSubmitting}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      !isSignup
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-600"
                    } ${isSubmitting ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    Login
                  </button>
                </div>
              </div>

              {isSubmitting && (
                <div className="mt-4 flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-700">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-600 border-t-transparent" />
                  {isSignup ? "Creating your account..." : "Logging you in..."}
                </div>
              )}

              <div className="mt-5 space-y-3.5">
                {isSignup && (
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={fieldLabelClassName}>Name</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        disabled={isSubmitting}
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className={fieldLabelClassName}>Gender</label>
                      <GenderSelect
                        value={formData.gender}
                        disabled={isSubmitting}
                        onChange={(val) =>
                          !isSubmitting && setFormData({ ...formData, gender: val })
                        }
                      />
                    </div>

                    <div>
                      <label className={fieldLabelClassName}>Location</label>
                      <LocationSelect
                        value={formData.location}
                        disabled={isSubmitting}
                        onChange={(val) =>
                          !isSubmitting && setFormData({ ...formData, location: val })
                        }
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className={fieldLabelClassName}>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className={fieldLabelClassName}>Password</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    disabled={isSubmitting}
                    className={inputClassName}
                  />
                </div>

                {error && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(2,18,38,0.18)] transition ${
                    isSubmitting
                      ? "cursor-not-allowed opacity-70"
                      : "hover:-translate-y-0.5 hover:bg-cyan-500"
                  }`}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    {isSubmitting && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    )}
                    {isSubmitting
                      ? isSignup
                        ? "Processing..."
                        : "Processing..."
                      : isSignup
                        ? "Create delivery account"
                        : "Login to dashboard"}
                  </span>
                </button>

                <p className="text-center text-sm leading-6 text-slate-500">
                  {isSignup ? "Already have an account?" : "Do not have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignup(!isSignup);
                      setError("");
                      setSuccess("");
                    }}
                    disabled={isSubmitting}
                    className={`font-semibold text-cyan-700 underline-offset-4 transition ${
                      isSubmitting
                        ? "cursor-not-allowed opacity-60"
                        : "hover:text-cyan-600 hover:underline"
                    }`}
                  >
                    {isSignup ? "Login here" : "Sign up here"}
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
