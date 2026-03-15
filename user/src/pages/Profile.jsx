import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOut } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const gender = localStorage.getItem("gender");

  useEffect(() => {
    if (!name || !email) {
      navigate("/signup");
      return;
    }

    const fetchDonations = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/food-donation/get`,
          {
            email: localStorage.getItem("email"),
          }
        );
        setDonations(res.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, [email, name, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/start");
  };

  return (
    <div className="theme-page flex min-h-screen flex-col">
      <div className="mt-16 mb-10 flex flex-grow items-start justify-center px-4">
        <div className="theme-card-soft mt-10 w-full max-w-3xl rounded-[30px] p-6">
          <h2 className="mb-6 flex items-center text-3xl font-semibold text-[var(--theme-ink)]">
            <img src="img/user.png" alt="user" className="mr-3 h-10 w-10" />
            Your Profile
          </h2>

          <div className="space-y-3 text-[var(--theme-ink)]/85">
            <p>
              <span className="font-semibold">Name:</span> {name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {gender}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="theme-button mt-4 flex flex-row gap-2 rounded-[16px] py-2 pl-2 pr-4 font-bold"
          >
            <LogOut className="h-6 w-8" />
            Logout
          </button>

          <hr className="theme-divider my-6" />

          <h3 className="mb-3 text-2xl font-semibold text-[var(--theme-ink)]">Your Donations</h3>
          <div className="theme-card overflow-x-auto rounded-[24px] p-4">
            <div className="overflow-hidden rounded-t-[20px]">
              <table className="min-w-full bg-[linear-gradient(180deg,#fffaf4_0%,#f7f0e6_100%)] text-sm text-[var(--theme-ink)]/85">
                <thead className="theme-table-head">
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
                        className="border-b border-[var(--theme-line)] text-center transition-all hover:bg-[rgba(79,127,125,0.06)]"
                      >
                        <td className="max-w-40 truncate py-3 px-4 pl-10 text-left">
                          {item.foodname}
                        </td>
                        <td className="py-3 px-4">{item.meal}</td>
                        <td className="py-3 px-4">{item.category}</td>
                        <td className="py-3 px-4">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-4 text-center text-[var(--theme-muted)]">
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
