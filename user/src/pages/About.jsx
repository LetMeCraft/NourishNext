import React from "react";
import { FaLeaf, FaHandsHelping, FaClock, FaMobileAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="theme-page min-h-screen font-poppins">
      <div className="h-20"></div>

      <section
        id="about"
        className="mx-auto mt-15 flex max-w-7xl flex-col items-center gap-12 px-6 md:px-12 lg:flex-row lg:px-24"
      >
        <div className="space-y-6 lg:w-1/2">
          <h1 className="whitespace-nowrap text-4xl font-extrabold leading-tight text-[var(--theme-ink)] md:text-5xl">
            About <span className="text-[var(--theme-accent-deep)]">Nourish Next</span>
          </h1>

          <p className="text-lg text-[var(--theme-ink)]/85 md:text-xl">
            We turn food waste into food hope. Connecting surplus meals to people
            in need fast, smart, and sustainably.
          </p>
          <p className="italic text-[var(--theme-muted)]">
            "Because every bite shared today shapes the future we feed."
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="theme-card flex items-start space-x-4 rounded-[26px] p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(91,74,55,0.15)]">
              <FaLeaf className="mt-1 text-3xl text-[var(--theme-accent-deep)]" />
              <div>
                <h3 className="text-lg font-semibold text-[var(--theme-ink)]">Sustainability</h3>
                <p className="mt-1 text-sm text-[var(--theme-ink)]/80">
                  Reducing waste, lowering emissions, and preserving resources.
                </p>
              </div>
            </div>

            <div className="theme-card flex items-start space-x-4 rounded-[26px] p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(91,74,55,0.15)]">
              <FaHandsHelping className="mt-1 text-3xl text-[var(--theme-accent-deep)]" />
              <div>
                <h3 className="text-lg font-semibold text-[var(--theme-ink)]">Community</h3>
                <p className="mt-1 text-sm text-[var(--theme-ink)]/80">
                  Partnering with NGOs to feed the hungry across India.
                </p>
              </div>
            </div>

            <div className="theme-card flex items-start space-x-4 rounded-[26px] p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(91,74,55,0.15)]">
              <FaClock className="mt-1 text-3xl text-[var(--theme-accent-deep)]" />
              <div>
                <h3 className="text-lg font-semibold text-[var(--theme-ink)]">Efficiency</h3>
                <p className="mt-1 text-sm text-[var(--theme-ink)]/80">
                  Real-time food tracking and optimized delivery routes.
                </p>
              </div>
            </div>

            <div className="theme-card flex items-start space-x-4 rounded-[26px] p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(91,74,55,0.15)]">
              <FaMobileAlt className="mt-1 text-3xl text-[var(--theme-accent-deep)]" />
              <div>
                <h3 className="text-lg font-semibold text-[var(--theme-ink)]">Technology</h3>
                <p className="mt-1 text-sm text-[var(--theme-ink)]/80">
                  Easy-to-use app connecting donors, volunteers & NGOs seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-15 lg:w-1/2">
          <img
            src="img/community.webp"
            alt="Community sharing food"
            className="rounded-[32px] border border-[var(--theme-line)] shadow-[0_22px_56px_rgba(91,74,55,0.13)] transition-transform duration-500 hover:scale-105"
          />
          <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed text-[var(--theme-ink)]/85 md:text-xl">
            Every shared meal is a gesture of kindness that feeds not just the
            body, but also hope and community. By turning surplus food into
            nourishment, we help build a future where no one goes hungry and
            every bite makes a difference.
          </p>
        </div>
      </section>

      <section className="mx-auto min-h-screen px-6 py-20 font-poppins md:px-12 lg:px-24">
        <h1 className="mb-12 text-center text-4xl font-bold text-[var(--theme-ink)] md:text-5xl">
          Nourishing Communities, One Meal at a Time
        </h1>

        <div className="theme-card mx-auto max-w-6xl rounded-[32px] p-8 space-y-8 text-justify text-base leading-relaxed text-[var(--theme-ink)]/85 md:text-lg md:p-10">
          <p>
            Every meal counts when millions go hungry. We connect surplus food to
            those in need, transforming waste into hope and health.
          </p>

          <p>
            Collaborating with NGOs and local partners, we recover leftover food
            from workplaces, events, and kitchens, delivering it efficiently and
            sustainably.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-semibold text-[var(--theme-accent-deep)]">
            Why It Matters
          </h2>
          <p>
            Food waste is a major global crisis while millions suffer from hunger
            daily, nearly one-third of all food produced is discarded, wasting
            vital resources like water, energy, and labor, and contributing
            significantly to climate change. At Feeding Futures, we tackle this
            issue head-on by rescuing surplus food and efficiently redirecting it
            to those in need through real-time tracking and smart logistics.
          </p>
          <p>
            Our mission goes beyond feeding the hungry; it is about building a
            sustainable community that values every meal, protects our planet, and
            creates lasting impact. By turning food waste into nourishment, we are
            shaping a healthier, more equitable future for all.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-semibold text-[var(--theme-accent-deep)]">
            Making a Difference
          </h2>
          <p>
            Making a difference every day, we rescue surplus food from small
            donations to large festival feasts and transform it into thousands of
            nutritious meals for communities in need. Through strong partnerships
            with local NGOs and dedicated volunteers, we ensure every meal reaches
            those who need it most quickly and efficiently, creating a lasting
            positive impact across many lives each week.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-semibold text-[var(--theme-accent-deep)]">
            Join the Movement
          </h2>
          <p>
            We invite you to be part of this journey, whether you are a donor with
            surplus food, a volunteer with a heart to help, or a partner
            organization committed to change. Because every bite shared today
            shapes the future we feed.
          </p>

          <p className="text-xl font-semibold italic text-[var(--theme-accent-deep)]">
            Together, we can turn food waste into food hope one meal at a time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
