import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaChevronDown,
  FaGithub,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const contactLinks = [
  {
    title: "Email",
    value: "meetarpit.codes@gmail.com",
    href: "mailto:meetarpit.codes@gmail.com",
    icon: FaEnvelope,
  },
  {
    title: "Call",
    value: "+91 60064 95865",
    href: "tel:+916006495865",
    icon: FaPhoneAlt,
  },
  {
    title: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/916006495865",
    icon: FaWhatsapp,
  },
  {
    title: "GitHub",
    value: "github.com/LetMeCraft",
    href: "https://github.com/LetMeCraft",
    icon: FaGithub,
  },
  {
    title: "Instagram",
    value: "@arpitsharma_ikr",
    href: "https://www.instagram.com/arpitsharma_ikr?igsh=MXd6eTNvNnJ2cGRiaQ==",
    icon: FaInstagram,
  },
];

const accordionData = [
  {
    question: "How do I join as a delivery partner?",
    answer: (
      <>
        <p>
          1. Click on{" "}
          <NavLink
            to="/signup"
            className="text-green-700 text-base underline transition-colors hover:text-green-500"
          >
            Join Us
          </NavLink>{" "}
          from the navbar.
        </p>
        <p>2. Complete your account details and log in.</p>
        <p>3. Start accepting pickup requests from the Orders page.</p>
      </>
    ),
  },
  {
    question: "How do I manage delivery requests?",
    answer: (
      <p className="p-2">
        Open <strong>Orders</strong> to view active requests. Accept an order,
        follow pickup details, and update status after collection so NGOs can
        coordinate smoothly.
      </p>
    ),
  },
  {
    question: "Where can I check completed deliveries?",
    answer: (
      <p className="p-2">
        Visit <strong>History</strong> (Past Orders) in your dashboard to see
        completed deliveries and track your contribution over time.
      </p>
    ),
  },
];

function Contact() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleAccordion = (index) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert("Please fill all fields!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white font-poppins">
      <div className="flex justify-center px-4">
        <div className="pb-6 pt-6 text-center sm:pb-8 sm:pt-8">
          <p className="text-[1.7rem] font-bold tracking-[0.06em] text-sky-800 sm:text-[2.15rem]">
            Support <span className="text-slate-950">&</span> Connection
          </p>
          <div className="mx-auto mt-1 mb-3 h-0.5 w-full max-w-[18rem] rounded-full bg-sky-700/50 sm:max-w-[22rem]" />
        </div>
      </div>

      <div className="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 text-gray-700 shadow-md transition-shadow duration-300 hover:shadow-lg sm:p-6"
        >
          <div>
            <label htmlFor="name" className="mb-1 block font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-600"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-600"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block font-semibold">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-600"
              required
            />
          </div>
          <button
            type="submit"
            name="send"
            disabled={isSubmitting}
            className={`rounded-xl px-6 py-2.5 font-semibold text-white transition ${
              isSubmitting
                ? "cursor-not-allowed bg-[linear-gradient(135deg,#0ea5e9_0%,#0284c7_100%)] shadow-[0_0_0_4px_rgba(14,165,233,0.14),0_12px_24px_rgba(14,165,233,0.18)]"
                : "bg-[linear-gradient(135deg,#0284c7_0%,#0369a1_100%)] shadow-[0_12px_24px_rgba(2,132,199,0.18)] hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(2,132,199,0.22)]"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>

          <p className="mt-4 rounded-xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-sm leading-6 text-slate-700">
            Your message matters to us. By reaching out, you help us create
            more smiles and reduce food waste. We&apos;ll get back to you soon.
          </p>

          {submitStatus && (
            <div
              className={`mt-4 rounded-xl border px-4 py-3 text-sm font-medium ${
                submitStatus === "success"
                  ? "border-sky-200 bg-sky-50 text-sky-700"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {submitStatus === "success"
                ? "Thank you for reaching out!"
                : "Error submitting feedback. Please try again."}
            </div>
          )}
        </form>

        <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 text-gray-700 shadow-md transition-shadow duration-300 hover:shadow-lg sm:p-6">
          <p className="border-b border-sky-200 pb-2 text-xl font-semibold text-sky-700">
            Get in Touch
          </p>

          <div className="grid gap-3">
            {contactLinks.map(({ title, value, href, icon: Icon }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-start gap-3 rounded-xl bg-sky-50 px-4 py-3 transition hover:bg-sky-100"
              >
                <span className="mt-0.5 rounded-full bg-white p-2 text-sky-600 shadow-sm">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-sky-700">
                    {title}
                  </span>
                  <span className="block break-all text-sm text-gray-700 sm:text-base">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-sky-50 px-4 py-3">
            <span className="mt-0.5 rounded-full bg-white p-2 text-sky-600 shadow-sm">
              <FaMapMarkerAlt className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-sky-700">
                Location
              </span>
              <span className="block text-sm text-gray-700 sm:text-base">
                Chennai, Tamil Nadu
              </span>
            </span>
          </div>

          <div className="border-t border-sky-200 pt-4">
            <p className="text-sm leading-6 text-gray-600">
              We would love to stay connected. Reach out anytime for updates,
              support, and stories from{" "}
              <span className="font-semibold text-sky-700">
                NourishNext
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mb-12 max-w-4xl rounded-xl bg-gradient-to-b from-sky-50 to-white p-5 sm:p-8">
        <div className="help mx-auto mt-3 max-w-2xl sm:mt-5">
          <p className="mb-6 text-center text-2xl font-bold text-gray-700 sm:mb-7">
            Help & FAQs?
          </p>
          {accordionData.map(({ question, answer }, index) => {
            const isActive = activeAccordion === index;
            return (
              <div key={index} className="mb-4 rounded">
                <button
                  className={`flex w-full items-center justify-between text-left text-base font-semibold text-white transition-transform duration-300 focus:outline-none sm:text-lg ${
                    isActive ? "rounded-t" : "rounded"
                  } bg-gradient-to-b from-blue-300 to-blue-400 px-4 py-3 hover:scale-[1.01]`}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isActive}
                >
                  <span>{question}</span>
                  <span
                    className={`ml-4 inline-flex items-center justify-center text-blue-100 transition-transform duration-300 ${
                      isActive ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <FaChevronDown className="text-base sm:text-lg" />
                  </span>
                </button>
                {isActive && (
                  <div className="mt-1 mb-8 border-t border-blue-600 bg-gradient-to-b from-white to-blue-100 p-4 sm:mb-12">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Contact;
