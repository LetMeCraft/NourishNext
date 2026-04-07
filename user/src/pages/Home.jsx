import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  HandHeart,
  Leaf,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

const quotes = [
  "NourishNext turns extra meals into timely care.",
  "When good food is shared, communities feel the difference.",
  "Saving one meal can brighten an entire day.",
  "NourishNext helps generosity travel farther, faster, and better.",
  "Less waste, more dignity, and more people nourished.",
];

const works = [
  {
    img: "img/p1.jpeg",
    alt: "Children receiving meals",
    title: "Shared Plates, Shared Care",
    text: "Surplus food is redirected toward people who need support with speed and respect.",
  },
  {
    img: "img/p4.jpeg",
    alt: "Community support in action",
    title: "Partners Working Together",
    text: "Donors, volunteers, and delivery teams stay connected so help reaches the right place.",
  },
  {
    img: "img/p3.jpeg",
    alt: "Prepared food ready for support",
    title: "From Extra To Essential",
    text: "What might be wasted becomes a meaningful contribution for families and communities.",
  },
];

const steps = [
  {
    icon: HandHeart,
    title: "Share surplus food",
    text: "Homes, events, restaurants, and campuses can report extra food through NourishNext.",
  },
  {
    icon: Truck,
    title: "Coordinate pickup",
    text: "Our delivery flow helps partners collect donations quickly and keep updates clear.",
  },
  {
    icon: Users,
    title: "Support communities",
    text: "Meals are routed onward so good food serves people instead of going to waste.",
  },
];

const impactCards = [
  {
    icon: Leaf,
    title: "Lower Food Waste",
    text: "A smarter donation flow keeps usable food in circulation and out of landfills.",
  },
  {
    icon: ShieldCheck,
    title: "Stronger Coordination",
    text: "Clear donor, admin, and delivery touchpoints make every handoff more reliable.",
  },
  {
    icon: HandHeart,
    title: "Real Human Impact",
    text: "Each rescued meal becomes direct support, comfort, and dignity for someone nearby.",
  },
];

const Home = () => {
  const [activeQuote, setActiveQuote] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("email"))
  );
  const swipeStartX = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("email")));
    };

    window.addEventListener("storage", syncAuthState);
    window.addEventListener("authchange", syncAuthState);
    syncAuthState();

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("authchange", syncAuthState);
    };
  }, []);

  const goToPreviousQuote = () => {
    setActiveQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const goToNextQuote = () => {
    setActiveQuote((prev) => (prev + 1) % quotes.length);
  };

  const handlePointerDown = (event) => {
    swipeStartX.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    if (swipeStartX.current === null) return;

    const distance = event.clientX - swipeStartX.current;

    if (distance > 55) goToPreviousQuote();
    if (distance < -55) goToNextQuote();

    swipeStartX.current = null;
  };

  return (
    <div className="theme-page min-h-screen font-poppins">
      <style>
        {`
          @keyframes wiggle {
            0%, 100% { transform: rotate(-2deg) scale(1); box-shadow: 0 0 12px rgba(79, 127, 125, 0.26); }
            50% { transform: rotate(2deg) scale(1.08); box-shadow: 0 0 24px rgba(120, 163, 156, 0.34); }
          }

          .hover-wiggle:hover {
            animation: wiggle 0.9s ease-in-out infinite;
          }
        `}
      </style>

      <section className="px-4 pt-22 sm:px-6 sm:pt-24 lg:px-8">
        <div
          className="relative mx-auto min-h-[520px] max-w-7xl overflow-hidden rounded-[34px] border border-[rgba(255,250,243,0.55)] bg-cover bg-center shadow-[0_26px_58px_rgba(91,74,55,0.18)] sm:min-h-[620px] lg:min-h-[720px]"
          style={{ backgroundImage: "url('img/coverimage.jpeg')" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(33,53,52,0.62)_0%,rgba(54,82,80,0.42)_40%,rgba(246,239,229,0.14)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,250,243,0.24),transparent_34%)]" />

          <div className="relative flex min-h-[520px] items-end px-4 py-6 sm:min-h-[620px] sm:px-8 sm:py-8 lg:min-h-[720px] lg:px-12 lg:py-12">
            <div className="theme-card-soft w-full max-w-3xl rounded-[30px] p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--theme-accent-deep)]">
                Nourish Next
              </p>
              <h1 className="mt-4 max-w-2xl text-[clamp(2.2rem,5vw,4.6rem)] leading-[1.04] font-bold text-[var(--theme-ink)]">
                Rescue good food and move it toward people who need it most.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--theme-muted)] sm:text-lg">
                NourishNext brings donors, coordinators, and delivery partners
                together to reduce food waste and create a smoother path from
                surplus meals to real community support.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <NavLink
                  to={isLoggedIn ? "/donate" : "/start"}
                  className="theme-button hover-wiggle inline-flex items-center justify-center rounded-[18px] px-7 py-3 text-base font-semibold uppercase tracking-[0.16em]"
                >
                  {isLoggedIn ? "Donate Food" : "Start With NourishNext"}
                </NavLink>
                <NavLink
                  to="/about"
                  className="theme-button-secondary inline-flex items-center justify-center gap-2 rounded-[18px] px-7 py-3 text-base font-semibold"
                >
                  Learn Our Mission
                  <ArrowRight className="h-4 w-4" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-8 sm:px-6 lg:px-8">
        <div className="theme-card mx-auto max-w-4xl rounded-[30px] p-6 sm:p-8">
          <p className="text-center text-lg leading-8 text-[var(--theme-ink)] sm:text-xl">
            Cutting food waste is one of the most practical ways to protect the
            planet, support communities, and make generosity easier to act on.
          </p>
        </div>
      </section>

      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="theme-card rounded-[30px] p-5 sm:p-7">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.28em] text-[var(--theme-accent)]">
              NourishNext Voices
            </p>

            <div
              className="mt-5 overflow-hidden"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => {
                swipeStartX.current = null;
              }}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeQuote * 100}%)` }}
              >
                {quotes.map((quote) => (
                  <div key={quote} className="w-full shrink-0 px-1 sm:px-3">
                    <p className="text-center text-2xl leading-10 font-semibold italic text-[var(--theme-accent-deep)] sm:text-3xl sm:leading-[1.55]">
                      "{quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveQuote(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeQuote === index
                      ? "w-12 bg-[var(--theme-accent-deep)]"
                      : "w-9 bg-[rgba(79,127,125,0.24)] hover:bg-[rgba(79,127,125,0.38)]"
                  }`}
                  aria-label={`Show quote ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <p className="text-center text-[2.2rem] font-semibold text-[var(--theme-ink)] sm:text-5xl">
          Our Works
        </p>
        <p className="mt-5 text-center text-xl font-medium text-[var(--theme-muted)] sm:mx-auto sm:max-w-3xl sm:text-3xl">
          See how NourishNext turns thoughtful action into practical, visible impact.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {works.map((work) => (
            <article
              key={work.title}
              className="theme-card overflow-hidden rounded-[28px] p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(91,74,55,0.16)]"
            >
              <img
                src={work.img}
                alt={work.alt}
                className="h-60 w-full rounded-[22px] object-cover transition-transform duration-500 hover:scale-[1.04] sm:h-72"
              />
              <div className="px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
                <h3 className="text-2xl font-semibold text-[var(--theme-accent-deep)]">
                  {work.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--theme-muted)]">
                  {work.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="theme-card-soft rounded-[30px] p-7 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--theme-accent)]">
              How It Works
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[var(--theme-ink)] sm:text-4xl">
              A simpler flow from surplus food to meaningful support.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--theme-muted)] sm:text-lg">
              We adapted the stronger structure from the reference project here, but
              shaped it around NourishNext so the story, tone, and experience
              stay true to your project.
            </p>
          </div>

          <div className="grid gap-5">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="theme-card flex gap-4 rounded-[28px] p-5 sm:p-6"
              >
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,rgba(221,235,229,0.92)_0%,rgba(255,250,243,0.98)_100%)] text-[var(--theme-accent-deep)]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--theme-accent)]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-[var(--theme-ink)]">
                    {title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[var(--theme-muted)]">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
          <div className="theme-card rounded-[30px] p-7 sm:p-8">
            <p className="text-[2rem] font-semibold text-[var(--theme-ink)] sm:text-[2.4rem]">
              Door Pickup
            </p>
            <p className="mt-6 text-xl leading-9 font-medium text-[var(--theme-ink)] sm:text-3xl">
              Your donation can be collected quickly and moved forward with more
              clarity, care, and coordination.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--theme-muted)] sm:text-lg">
              NourishNext keeps the process simple for donors while helping
              admins and delivery partners manage the next steps smoothly.
            </p>
          </div>

          <div className="theme-card rounded-[30px] p-3 sm:p-4">
            <img
              src="img/delivery.gif"
              alt="Delivery animation"
              className="w-full rounded-[24px] bg-[var(--theme-card)] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="theme-card-soft rounded-[32px] p-7 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--theme-accent)]">
              Why It Matters
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[var(--theme-ink)] sm:text-4xl">
              NourishNext is built to reduce waste and increase meaningful reach.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--theme-muted)] sm:text-lg">
              We keep your softer NourishNext interface, but add clearer story
              sections so visitors understand the mission faster on mobile,
              tablet, and desktop.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {impactCards.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="theme-card rounded-[28px] p-6"
              >
                <div className="inline-flex rounded-[18px] bg-[linear-gradient(180deg,rgba(221,235,229,0.95)_0%,rgba(255,250,243,0.98)_100%)] p-3 text-[var(--theme-accent-deep)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-[var(--theme-ink)]">
                  {title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--theme-muted)]">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[34px] border border-[rgba(45,93,91,0.14)] bg-[linear-gradient(135deg,#2d5d5b_0%,#4f7f7d_100%)] p-8 text-center text-white shadow-[0_20px_42px_rgba(45,93,91,0.28)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#dfeee7]">
            Join The Movement
          </p>
          <h2 className="mt-4 text-3xl font-bold text-[#fffaf3] sm:text-5xl">
            Help NourishNext turn extra food into steady support.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#eef5f0] sm:text-lg">
            Every donation, pickup, and partnership helps us create a more
            caring and less wasteful system for sharing food.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <NavLink
              to="/start"
              className="inline-flex items-center justify-center rounded-[18px] bg-white px-7 py-3 font-semibold text-[var(--theme-accent-deep)] transition hover:-translate-y-0.5"
            >
              Go To Dashboards
            </NavLink>
            <NavLink
              to="/contact"
              className="inline-flex items-center justify-center rounded-[18px] border border-white/70 bg-white/8 px-7 py-3 font-semibold text-[#fffaf3] transition hover:bg-white/12"
            >
              Partner With NourishNext
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
