import React from "react";

const colorClasses = {
  blue: "text-sky-600 bg-sky-100",
  yellow: "text-yellow-600 bg-yellow-100",
  purple: "text-purple-600 bg-purple-100",
  green: "text-emerald-600 bg-emerald-100",
};

const darkClasses = {
  blue: "dark:bg-sky-900 dark:text-sky-300",
  yellow: "dark:bg-yellow-900 dark:text-yellow-300",
  purple: "dark:bg-purple-900 dark:text-purple-300",
  green: "dark:bg-emerald-900 dark:text-emerald-300",
};

const StatCard = ({ icon: Icon, title, value, isDarkMode, color }) => {
  return (
    <div
      className={`admin-card admin-fade-up p-6 min-w-full rounded-2xl shadow-lg ${isDarkMode ? "bg-slate-700 brightness-90 text-white" : "bg-gradient-to-t from-blue-100 to-green-50 text-slate-900"} hover:shadow-xl`}
    >
      <div className="flex items-center flex-col gap-4 justify-between mb-4">
       
        <div
          className={`p-3 rounded-xl ${colorClasses[color]} ${
            isDarkMode ? darkClasses[color] : ""
          }`}
        >
          {/* Render the icon component passed as a prop */}
          <Icon className="w-7 h-7" />
        </div> 
         <h3
          className={`text-sm font-semibold uppercase ${
            isDarkMode ? "text-white" : "text-slate-700"
          }`}
        >
          {title}
        </h3>
        <p className="text-4xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
