import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="theme-page min-h-screen font-poppins">
      <section
        className="flex h-[90vh] w-full items-center justify-center bg-cover bg-center pt-20"
        style={{ backgroundImage: "url('img/coverimage.jpeg')" }}
      ></section>

      <div className="mt-2 flex justify-center">
        <>
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

          <NavLink
            to="/Start"
            className="theme-button hover-wiggle mt-1 inline-block rounded-[20px] border border-[rgba(79,127,125,0.18)] px-10 py-3 font-semibold uppercase tracking-widest"
          >
            Donate Food
          </NavLink>
        </>
      </div>

      <div className="theme-card mx-auto mt-5 max-w-3xl rounded-[28px] p-6">
        <p className="text-center text-xl font-normal text-[var(--theme-ink)]">
          Cutting food waste is a delicious way of saving money, helping to
          feed the world and protect the planet.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl p-6">
        <p className="text-4xl text-center font-semibold underline decoration-[var(--theme-accent)] decoration-4">
          Our Works
        </p>
        <p className="mt-8 mb-8 text-center text-3xl font-medium text-[var(--theme-ink)]">
          "Look what we can do together."
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="theme-card overflow-hidden rounded-[28px] p-1">
            <img
              src="img/p1.jpeg"
              alt="Work 1"
              className="h-full w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-90"
            />
          </div>
          <div className="theme-card overflow-hidden rounded-[28px] p-1">
            <img
              src="img/p4.jpeg"
              alt="Work 2"
              className="h-full w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-90"
            />
          </div>
          <div className="theme-card overflow-hidden rounded-[28px] p-1">
            <img
              src="img/p3.jpeg"
              alt="Work 3"
              className="h-full w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-90"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 mb-15 grid max-w-4xl place-items-center gap-4">
        <p className="text-4xl font-semibold underline decoration-[var(--theme-accent)] decoration-4">
          DOOR PICKUP
        </p>
        <p className="mt-8 max-w-full px-4 text-center text-3xl font-medium text-[var(--theme-ink)]">
          Your donate will be immediately collected and sent to needy people
        </p>

        <img
          src="img/delivery.gif"
          alt="Delivery animation"
          className="theme-card w-120 mx-auto mt-5 rounded-[28px] bg-[var(--theme-card)] p-3"
        />
      </div>
    </div>
  );
};

export default Home;
