import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

const accordionData = [
  {
    question: "How to donate food?",
    answer: (
      <>
        <p>
          1) Click on{" "}
          <NavLink
            to="/foodDonationForm"
            className="text-base text-[var(--theme-accent-deep)] underline transition-colors hover:text-[var(--theme-accent)]"
          >
            donate
          </NavLink>{" "}
          on the home page.
        </p>
        <p>2) Fill the details.</p>
        <p>3) Click on submit.</p>
        <img
          src="img/mobile.jpg"
          alt="mobile instruction"
          className="mt-2 w-full rounded bg-[var(--theme-mist)]"
        />
      </>
    ),
  },
  {
    question: "How will my donation be used?",
    answer: (
      <p className="p-2">
        Your donation will be used to support our mission and the various
        programs and initiatives that we have in place. Your donation will help
        us to continue providing assistance and support to those in need. You
        can find more information about our programs and initiatives on our
        website. If you have any specific questions or concerns, please feel
        free to contact us.
      </p>
    ),
  },
  {
    question: "What should I do if my food donation is near or past its expiration date?",
    answer: (
      <p className="p-2">
        We appreciate your willingness to donate, but to ensure the safety of
        our clients we cannot accept food that is near or past its expiration
        date. We recommend checking expiration dates before making a donation or
        contact us for further guidance.
      </p>
    ),
  },
];

const contactChannels = [
  {
    title: "Email",
    href: "mailto:meetarpit.codes@gmail.com",
    icon: Mail,
    value: "meetarpit.codes@gmail.com",
  },
  {
    title: "Call",
    href: "tel:+916006495865",
    icon: Phone,
    value: "+91 60064 95865",
  },
  {
    title: "GitHub",
    href: "https://github.com/LetMeCraft",
    icon: Github,
    value: "github.com/LetMeCraft",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/arpitsharma_ikr?igsh=MXd6eTNvNnJ2cGRiaQ==",
    icon: Instagram,
    value: "@arpitsharma_ikr",
  },
  {
    title: "WhatsApp",
    href: "https://wa.me/916006495865",
    icon: MessageCircle,
    value: "Let's chat on WhatsApp",
  },
];

function Contact() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="theme-page min-h-screen font-poppins">
      <div className="mx-auto mt-25 mb-14 grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2 md:px-6">
        <form
          onSubmit={handleSubmit}
          className="theme-card space-y-5 rounded-[30px] p-7 text-[var(--theme-ink)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(91,74,55,0.12)] md:p-8"
        >
          <div>
            <label htmlFor="name" className="mb-3 block text-[15px] font-semibold text-[var(--theme-ink)]">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="theme-input"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-3 block text-[15px] font-semibold text-[var(--theme-ink)]">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="theme-input"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-3 block text-[15px] font-semibold text-[var(--theme-ink)]">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="theme-input min-h-[180px] rounded-[22px]"
              required
            ></textarea>
          </div>
          <div className="pt-1">
            <button
              type="submit"
              name="send"
              className="theme-button rounded-[18px] px-8 py-3 text-lg font-semibold"
            >
              Send
            </button>
          </div>

          {submitStatus && (
            <div
              className={`rounded-[18px] border px-4 py-3 text-sm font-medium ${
                submitStatus === "success"
                  ? "border-[rgba(79,127,125,0.22)] bg-[rgba(221,235,229,0.7)] text-[var(--theme-accent-deep)]"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {submitStatus === "success"
                ? "Feedback submitted successfully!"
                : "Error submitting feedback. Please try again."}
            </div>
          )}

          <div className="theme-subtle-panel rounded-[22px] px-5 py-5 text-base leading-8 text-[var(--theme-ink)]">
            Your message matters to us. By reaching out, you help us create better experiences, stronger
            support, and more meaningful collaboration around Nourish Next.
          </div>
        </form>

        <div className="theme-card space-y-6 rounded-[30px] p-7 text-[var(--theme-ink)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(91,74,55,0.12)] md:p-8">
          <p className="border-b border-[rgba(79,127,125,0.14)] pb-4 text-[2rem] font-bold text-[var(--theme-accent-deep)]">
            Get in Touch
          </p>

          <div className="space-y-4">
            {contactChannels.map(({ title, href, icon, value }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between rounded-[24px] border border-[rgba(79,127,125,0.16)] bg-[linear-gradient(180deg,rgba(221,235,229,0.75)_0%,rgba(255,250,243,0.92)_100%)] px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(79,127,125,0.28)] hover:shadow-[0_16px_32px_rgba(91,74,55,0.12)]"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full border border-[rgba(79,127,125,0.14)] bg-[var(--theme-card)] p-3 text-[var(--theme-accent-deep)] shadow-sm">
                    {React.createElement(icon, { className: "h-5 w-5" })}
                  </div>
                  <div>
                    <p className="text-[1.05rem] font-semibold text-[var(--theme-accent-deep)]">{title}</p>
                    <p className="text-lg text-[var(--theme-ink)]">{value}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[var(--theme-accent-soft)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--theme-accent-deep)]" />
              </a>
            ))}
          </div>

          <div className="border-t border-[rgba(79,127,125,0.14)] pt-4">
            <p className="text-lg leading-8 text-[var(--theme-ink)]">
              We would love to stay connected. Reach out anytime for updates, support, and collaboration with{" "}
              <span className="font-semibold text-[var(--theme-accent-deep)]">Arpit Sharma</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mb-12 max-w-5xl px-6">
        <div className="theme-card rounded-[30px] p-8">
          <div className="help mx-auto mt-2 max-w-3xl">
            <p className="mb-7 text-center text-3xl font-bold text-[var(--theme-ink)]">
              Help & <span className="text-[var(--theme-accent-deep)]">FAQs</span>
            </p>
            {accordionData.map(({ question, answer }, index) => {
              const isActive = activeAccordion === index;
              return (
                <div
                  key={index}
                  className={`mb-4 block overflow-hidden rounded-[24px] border transition-all duration-300 ${
                    isActive
                      ? "border-[rgba(79,127,125,0.24)] bg-[var(--theme-card)] shadow-[0_16px_36px_rgba(91,74,55,0.12)]"
                      : "border-[var(--theme-line)] bg-[rgba(255,250,243,0.95)] shadow-sm hover:border-[rgba(79,127,125,0.18)] hover:shadow-md"
                  }`}
                >
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between px-6 py-4 text-left text-lg font-semibold transition-all duration-300 focus:outline-none ${
                      isActive
                        ? "bg-[linear-gradient(135deg,var(--theme-accent-deep),var(--theme-accent))] text-white"
                        : "bg-[var(--theme-card)] text-[var(--theme-ink)] hover:bg-[rgba(221,235,229,0.48)]"
                    }`}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isActive}
                  >
                    <span className="pr-4">{question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isActive && (
                    <div className="border-t border-[rgba(79,127,125,0.14)] bg-[linear-gradient(180deg,#fffaf4_0%,rgba(221,235,229,0.40)_100%)] px-6 py-5 text-[15px] leading-7 text-[var(--theme-ink)]">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
