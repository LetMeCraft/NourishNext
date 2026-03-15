import React, { useState } from "react";
import { FaLeaf, FaHandsHelping, FaClock, FaMobileAlt } from "react-icons/fa";

const About = () => {
    return (
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen font-poppins">

            {/* Spacer */}
            <div className="h-20"></div>

            {/* Main About Section */}
            <section
                id="about"
                className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-15 flex flex-col lg:flex-row items-center gap-12"
            >
                {/* Left Side Text */}
                <div className="lg:w-1/2 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 leading-tight whitespace-nowrap">
                        About <span className="text-gray-900">Nourish Next</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-700">
                        We turn food waste into food hope. Connecting surplus meals to people
                        in need — fast, smart, and sustainably.
                    </p>
                    <p className="text-gray-600 italic">
                        "Because every bite shared today shapes the future we feed."
                    </p>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                        <div className="flex items-start space-x-4 p-6 bg-green-100 rounded-xl shadow-md hover:shadow-xl transition">
                            <FaLeaf className="text-green-600 text-3xl mt-1" />
                            <div>
                                <h3 className="font-semibold text-green-800 text-lg">Sustainability</h3>
                                <p className="text-gray-700 text-sm mt-1">
                                    Reducing waste, lowering emissions, and preserving resources.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-6 bg-green-100 rounded-xl shadow-md hover:shadow-xl transition">
                            <FaHandsHelping className="text-green-600 text-3xl mt-1" />
                            <div>
                                <h3 className="font-semibold text-green-800 text-lg">Community</h3>
                                <p className="text-gray-700 text-sm mt-1">
                                    Partnering with NGOs to feed the hungry across India.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-6 bg-green-100 rounded-xl shadow-md hover:shadow-xl transition">
                            <FaClock className="text-green-600 text-3xl mt-1" />
                            <div>
                                <h3 className="font-semibold text-green-800 text-lg">Efficiency</h3>
                                <p className="text-gray-700 text-sm mt-1">
                                    Real-time food tracking and optimized delivery routes.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 p-6 bg-green-100 rounded-xl shadow-md hover:shadow-xl transition">
                            <FaMobileAlt className="text-green-600 text-3xl mt-1" />
                            <div>
                                <h3 className="font-semibold text-green-800 text-lg">Technology</h3>
                                <p className="text-gray-700 text-sm mt-1">
                                    Easy-to-use app connecting donors, volunteers & NGOs seamlessly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Image */}
                <div className="lg:w-1/2 mt-15">
                    <img
                        src="img/community.webp"
                        alt="Community sharing food"
                        className="rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500"
                    />
                    <p className="text-lg md:text-xl text-gray-700 mt-10 leading-relaxed max-w-3xl mx-auto text-center">
                        Every shared meal is a gesture of kindness that feeds not just the body, but also hope and community. By turning surplus food into nourishment, we help build a future where no one goes hungry and every bite makes a difference.
                    </p>
                </div>


            </section>
            <section className=" min-h-screen font-poppins py-20 px-6 md:px-12 lg:px-24 mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-12 text-center">
                    Nourishing Communities, One Meal at a Time
                </h1>

                <div className="space-y-8 text-gray-700 max-w-6xl mx-auto text-justify text-base md:text-lg leading-relaxed">
                    <p>
                        Every meal counts when millions go hungry. We connect surplus food to those in need, transforming waste into hope and health.
                    </p>

                    <p>
                        Collaborating with NGOs and local partners, we recover leftover food from workplaces, events, and kitchens — delivering it efficiently and sustainably.
                    </p>

                    <h2 className="text-2xl font-semibold text-green-700 mt-10 mb-4">
                        Why It Matters
                    </h2>
                    <p>
                        Food waste is a major global crisis—while millions suffer from hunger daily, nearly one-third of all food produced is discarded, wasting vital resources like water, energy, and labor, and contributing significantly to climate change. At Feeding Futures, we tackle this issue head-on by rescuing surplus food and efficiently redirecting it to those in need through real-time tracking and smart logistics.
                    </p>
<p>
    Our mission goes beyond feeding the hungry; it’s about building a sustainable community that values every meal, protects our planet, and creates lasting impact. By turning food waste into nourishment, we’re shaping a healthier, more equitable future for all.
</p>
                    <h2 className="text-2xl font-semibold text-green-700 mt-10 mb-4">
                        Making a Difference
                    </h2>
                    <p>
                        Making a difference every day, we rescue surplus food—from small donations to large festival feasts—and transform it into thousands of nutritious meals for communities in need. Through strong partnerships with local NGOs and dedicated volunteers, we ensure every meal reaches those who need it most quickly and efficiently, creating a lasting positive impact across many lives each week.
                    </p>

                    <h2 className="text-2xl font-semibold text-green-700 mt-10 mb-4">
                        Join the Movement
                    </h2>
                    <p>
                        We invite you to be part of this journey — whether you’re a donor with surplus food, a volunteer with a heart to help, or a partner organization committed to change. Because every bite shared today shapes the future we feed.
                    </p>

                    <p className=" text-xl font-semibold text-green-600 italic">
                        Together, we can turn food waste into food hope — one meal at a time.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
