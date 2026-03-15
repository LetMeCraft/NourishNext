import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen font-poppins">
      {/* Banner */}
      <section
        className="w-full h-[90vh] bg-cover bg-center flex items-center justify-center pt-20"
        style={{ backgroundImage: "url('img/coverimage.jpeg')" }}
      ></section>

      <div className="flex justify-center mt-2">
        <>
          <style>
            {`
              @keyframes wiggle {
                0%, 100% { transform: rotate(-2deg) scale(1); box-shadow: 0 0 10px orange; }
                50% { transform: rotate(2deg) scale(1.1); box-shadow: 0 0 20px yellow; }
              }
              .hover-wiggle:hover {
                animation: wiggle 0.9s ease-in-out infinite;
              }
            `}
          </style>

          <NavLink
            to="/foodDonationForm"
            className="inline-block border-2 mt-1 rounded-lg border-red-500 shadow-lg shadow-red-900 bg-red-700 text-white uppercase tracking-widest px-10 py-3 font-semibold transition-all duration-500 ease-in-out hover:bg-red-700 hover:border-red-600 hover:shadow-2xl hover-wiggle"
          >
            Donate Food
          </NavLink>
        </>
      </div>

      {/* Content */}
      <div className="bg-green-600 p-6 max-w-3xl mt-5 mx-auto  rounded-2xl">
        <p className="text-white text-xl font-normal text-center">
          Cutting food waste is a delicious way of saving money, helping to
          feed the world and protect the planet.
        </p>
      </div>

      {/* Our Works */}
      <div className="p-6 max-w-5xl mx-auto mt-16">
        <p className="text-4xl text-center font-semibold underline decoration-green-500 decoration-4">
          Our Works
        </p>
        <p className="text-center text-3xl mt-8 mb-8 font-medium">
          "Look what we can do together."
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="img/p1.jpeg"
              alt="Work 1"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-90 rounded-2xl"
            />
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src="img/p4.jpeg"
              alt="Work 2"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-90 rounded-2xl"
            />
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src="img/p3.jpeg"
              alt="Work 3"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-90 rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Door Pickup */}
      <div className="max-w-4xl mx-auto mb-15 mt-20 grid place-items-center gap-4">
        <p className="text-4xl font-semibold underline decoration-green-500 decoration-4">
          DOOR PICKUP
        </p>
        <p className="text-3xl text-center px-4 mt-8 max-w-full font-medium ">
          Your donate will be immediately collected and sent to needy people
        </p>

        <img
          src="img/delivery.gif"
          alt="Delivery animation"
          className="w-120 mx-auto mt-5 rounded-xl shadow-lg bg-green-600 mix-blend-multiply"
        />
      </div>
    </div>
  );
};

export default Home;
