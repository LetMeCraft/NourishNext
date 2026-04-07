import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import TableComponent from "../components/TableComponent";
import { FaBox, FaClock, FaUsers, FaComments } from "react-icons/fa";

const Dashboard = ({ data, isLoading, isDarkMode }) => {
  const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(true);
  const totalDonations = data?.donations?.length || 0;
  const pendingDonations = data?.donations?.filter(
    (d) => d.status === "Pending"
  ).length || 0;
  const totalUsers = data?.users?.length || 0;

  // Columns for Donations Table
  const donationColumns = [
    { header: "Name", field: "name" },
    { header: "Food", field: "foodname" },
    { header: "Type", field: "meal" },
    { header: "Category", field: "category" },
    { header: "Phone No", field: "phoneno" },
    { header: "Address", field: "address" },
    { header: "District", field: "district" },
    { header: "Quantity", field: "quantity" },
    { header: "Status", field: "status" },
    { header: "Date", field: "createdAt" },
  ];

  // Sort donations by createdAt date (latest first), then take top 5
  const recentDonations = data?.donations
    ? [...data.donations]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    : [];

  useEffect(() => {
    if (!isLoading) {
      setShowLoadingSkeleton(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowLoadingSkeleton(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <main
      className={`admin-page p-3 md:p-4 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}
    >
      {isLoading ? (
        showLoadingSkeleton ? (
          <div className="space-y-8">
            <div className="admin-skeleton h-10 w-64 rounded-xl" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`rounded-2xl border p-6 shadow-lg ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-200"
                  }`}
                >
                  <div className="admin-skeleton mb-5 h-12 w-12 rounded-xl" />
                  <div className="admin-skeleton mb-3 h-4 w-32 rounded-md" />
                  <div className="admin-skeleton h-8 w-20 rounded-md" />
                </div>
              ))}
            </div>
            <div className="admin-skeleton h-10 w-56 rounded-xl" />
            <TableComponent
              title="Recent Donations"
              columns={donationColumns}
              data={[]}
              loading={true}
              isDarkMode={isDarkMode}
            />
          </div>
        ) : (
          <div
            className={`rounded-2xl border p-8 text-center shadow-md ${
              isDarkMode
                ? "bg-slate-900 border-slate-700 text-slate-200"
                : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-800 text-sky-900"
            }`}
          >
            <h2 className="text-2xl font-bold">Dashboard is taking longer than usual</h2>
            <p className="mt-2 text-sm opacity-80">
              We could not load dashboard data yet. Please wait a moment or try refreshing.
            </p>
          </div>
        )
      ) : (
        <>
          <h2 className="admin-fade-up text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">
            Dashboard Overview
          </h2>

          {/* Statistic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8">
            <StatCard
              title="Total Donations"
              value={totalDonations}
              icon={FaBox}
              color="green"
              isDarkMode={isDarkMode}
            />

            <StatCard
              title="Pending Collections"
              value={pendingDonations}
              icon={FaClock}
              color="yellow"
              isDarkMode={isDarkMode}
            />

            <StatCard
              title="Total Users"
              value={totalUsers}
              icon={FaUsers}
              color="blue"
              isDarkMode={isDarkMode}
            />

            <StatCard
              title="Feedbacks"
              value={data?.feedback?.length || 0}
              icon={FaComments}
              color="purple"
              isDarkMode={isDarkMode}
            />
          </div>

          <h2 className="admin-fade-up text-3xl mt-15 font-bold text-sky-700 dark:text-sky-400">
            Recent Donations
          </h2>

          {/* Donations Table */}
          <div className="mt-6">
            <TableComponent
              title="Recent Donations"
              columns={donationColumns}
              data={recentDonations}
              loading={isLoading}
              isDarkMode={isDarkMode}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
