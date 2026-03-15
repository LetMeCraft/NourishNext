import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOut } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);

    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const gender = localStorage.getItem("gender");

    useEffect(() => {
        if (!name || !email) {
            navigate("/signup");
        } else {
            fetchDonations();
        }
    }, []);

    const fetchDonations = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/food-donation/get`, {
                email: localStorage.getItem("email"),
            });
            setDonations(res.data); // Store donations in state
        } catch (error) {
            console.error("Error fetching donations:", error);
        }
    };


    const handleLogout = () => {
        localStorage.clear();
        navigate("/start");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Main content area that grows to push footer down */}
            <div className="flex-grow flex items-start justify-center mt-16 mb-10 px-4">
                <div className="w-full max-w-3xl bg-gradient-to-t from-green-50 to-teal-50 rounded-2xl shadow-md p-6 mt-10">
                    <h2 className="text-3xl text-gray-800 font-semibold mb-6 flex items-center">
                        <img src="img/user.png" alt="user" className="w-10 h-10 mr-3" />
                        Your Profile
                    </h2>

                    <div className="text-gray-700 space-y-3">
                        <p><span className="font-semibold">Name:</span> {name}</p>
                        <p><span className="font-semibold">Email:</span> {email}</p>
                        <p><span className="font-semibold">Gender:</span> {gender}</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-4 bg-red-600 text-white font-bold pr-4 pl-2 py-2 flex flex-row gap-2 rounded-md hover:scale-105 hover:bg-red-500"
                    >
                        {/* Logout */}
                        <LogOut className="w-8 h-6" />
                        Logout
                    </button>

                    <hr className="my-6" />

                    <h3 className="text-2xl font-semibold text-cyan-800 mb-3">Your Donations</h3>
                    <div className="border-cyan-600 border-1 rounded-xl shadow-lg overflow-x-auto p-4">
                        <div className="overflow-hidden rounded-t-xl ">
                            <table className="min-w-full text-sm text-gray-700 bg-gradient-to-r from-white to-teal-50">
                                <thead className="bg-gradient-to-r from-green-400 to-teal-500 text-white">
                                    <tr>
                                        <th className="py-3 px-4 pl-10 text-left">Food</th>
                                        <th className="py-3 px-4 text-center">Type</th>
                                        <th className="py-3 px-4 text-center">Category</th>
                                        <th className="py-3 px-4 text-center">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.length > 0 ? (
                                        donations.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="border-green-600 border-b text-center hover:bg-gray-50 transition-all"
                                            >
                                                <td className="py-3 pl-10 px-4 max-w-40 truncate text-left">{item.foodname}</td>
                                                <td className="py-3 px-4">{item.meal}</td>
                                                <td className="py-3 px-4">{item.category}</td>
                                                <td className="py-3 px-4">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="py-4 text-center text-gray-500">
                                                No donations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
