import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext.jsx";
import { useDataFetcher } from "../hooks.js";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Analytics = () => {
  const { isDarkMode } = useContext(AppContext);
  const { data, isLoading, error } = useDataFetcher();
  const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(true);
  const { donations = [], users = [], feedback = [] } = data || {};
  const ratedDonations = donations.filter((donation) => donation.rating != null);
  const validRatings = ratedDonations.filter((entry) => entry.rating > 0);

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

  if (isLoading) {
    if (!showLoadingSkeleton) {
      return (
        <div className="admin-page min-h-screen m-1 md:m-5">
          <div
            className={`rounded-2xl border p-8 text-center shadow-md ${
              isDarkMode
                ? "bg-slate-900 border-slate-700 text-slate-200"
                : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-100 text-sky-900"
            }`}
          >
            <h2 className="text-2xl font-bold">Analytics is taking longer than usual</h2>
            <p className="mt-2 text-sm opacity-80">
              We could not load analytics data yet. Please wait a moment or try refreshing.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="admin-page min-h-screen m-1 md:m-5 space-y-8">
        <div className="admin-skeleton h-10 w-72 rounded-xl" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-5 shadow-md ${
                isDarkMode
                  ? "bg-slate-900 border-slate-700"
                  : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-100"
              }`}
            >
              <div className="admin-skeleton mx-auto mb-4 h-5 w-36 rounded-md" />
              <div className="admin-skeleton mx-auto h-10 w-20 rounded-md" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-5 shadow-2xl ${
                isDarkMode
                  ? "bg-slate-900 border-slate-700"
                  : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-100"
              }`}
            >
              <div className="admin-skeleton mb-4 h-5 w-44 rounded-md" />
              <div className="admin-skeleton h-[300px] w-full rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page min-h-screen m-1 md:m-5">
        <div
          className={`rounded-2xl border p-8 text-center shadow-md ${
            isDarkMode
              ? "bg-slate-900 border-slate-700 text-slate-200"
              : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-100 text-sky-900"
          }`}
        >
          <h2 className="text-2xl font-bold">Analytics unavailable</h2>
          <p className="mt-2 text-sm opacity-80">{error}</p>
        </div>
      </div>
    );
  }

  const totalDonations = donations.length;
  const totalUsers = users.length;
  const totalFeedback = feedback.length;

  const statusCounts = donations.reduce((acc, donation) => {
    acc[donation.status] = (acc[donation.status] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  const categoryCounts = donations.reduce((acc, donation) => {
    acc[donation.category] = (acc[donation.category] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

  const timeData = donations.reduce((acc, donation) => {
    const date = new Date(donation.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const donationTimeline = Object.entries(timeData).map(([name, value]) => ({ name, value }));

  const userTimeData = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const userTimeline = Object.entries(userTimeData).map(([name, value]) => ({ name, value }));

  const genderCounts = users.reduce((acc, user) => {
    const gender = user.gender || "Unknown";
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});
  const genderData = Object.entries(genderCounts).map(([name, value]) => ({ name, value }));

  return (
    <div className="admin-page min-h-screen m-1 md:m-5">
      <h2 className="admin-fade-up mb-6 text-3xl font-bold text-sky-700 dark:text-sky-400">
        📊 Analytics Dashboard
      </h2>

      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <SummaryCard isDarkMode={isDarkMode} label="Total Donations" value={totalDonations} valueClass="text-blue-600" />
        <SummaryCard isDarkMode={isDarkMode} label="Total Users" value={totalUsers} valueClass="text-green-600" />
        <SummaryCard isDarkMode={isDarkMode} label="Total Feedback" value={totalFeedback} valueClass="text-yellow-600" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ChartCard title="Donation Status Overview" hasData={statusData.length > 0}>
          <BarChart data={statusData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" radius={[5, 5, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Donation Category Distribution" hasData={categoryData.length > 0}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label isAnimationActive={false}>
              {categoryData.map((entry, index) => (
                <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ChartCard>

        <ChartCard title="Donations Over Time" hasData={donationTimeline.length > 0}>
          <LineChart data={donationTimeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#00C49F" isAnimationActive={false} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Orders Rating" hasData={validRatings.length > 0}>
          {validRatings.length > 0 ? (
            <RadarChart
              outerRadius={120}
              data={validRatings.map((entry, index) => ({
                name: `Order ${index + 1}`,
                rating: entry.rating,
              }))}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fill: isDarkMode ? "white" : "black", fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Radar name="Rating" dataKey="rating" stroke="#FF8042" fill="#FF8042" fillOpacity={0.6} isAnimationActive={false} />
              <Tooltip formatter={(value) => `${value} ⭐`} />
            </RadarChart>
          ) : (
            <p className="mt-5 text-center">No ratings available</p>
          )}
        </ChartCard>

        <ChartCard title="User Gender Distribution" hasData={genderData.length > 0}>
          <PieChart>
            <Pie
              data={genderData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              label={{ fill: isDarkMode ? "white" : "black" }}
              paddingAngle={5}
              isAnimationActive={false}
            >
              {genderData.map((entry, index) => (
                <Cell key={`gender-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ChartCard>

        <ChartCard title="User Registrations Over Time" hasData={userTimeline.length > 0}>
          <AreaChart data={userTimeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" fill="#82ca9d" stroke="#82ca9d" isAnimationActive={false} />
          </AreaChart>
        </ChartCard>
      </div>
    </div>
  );
};

const SummaryCard = ({ isDarkMode, label, value, valueClass }) => (
  <div
    className={`admin-card admin-fade-up rounded-2xl bg-slate-900 p-5 text-center shadow-md hover:shadow-xl ${
      isDarkMode
        ? "bg-sky-900 brightness-90 text-white border border-slate-700"
        : "border-sky-50 bg-gradient-to-t from-blue-100 to-green-50 text-slate-900"
    }`}
  >
    <h3 className="text-lg font-semibold">{label}</h3>
    <p className={`text-3xl font-bold ${valueClass}`}>{value}</p>
  </div>
);

const ChartCard = ({ title, children, hasData = true }) => {
  const { isDarkMode } = useContext(AppContext);

  return (
    <div
      className={`admin-card admin-fade-up mb-6 rounded-2xl border p-5 shadow-2xl ${
        isDarkMode
          ? "bg-slate-900 border-slate-700"
          : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-100"
      }`}
    >
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      {hasData ? (
        <ResponsiveContainer width="100%" height={300}>
          {children}
        </ResponsiveContainer>
      ) : (
        <div className="flex h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-300/60 text-center text-sm opacity-80">
          Data will appear here once records are available.
        </div>
      )}
    </div>
  );
};

export default Analytics;
