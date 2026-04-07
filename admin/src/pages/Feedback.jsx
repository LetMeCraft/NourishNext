// Feedback.jsx

import React from "react";
import TableComponent from "../components/TableComponent";

const Feedback = ({ data, isLoading, isDarkMode }) => {
  // Define the columns for the feedback table
  const feedbackColumns = [
    { header: "Name", field: "name" },
    { header: "Email", field: "email" },
    { header: "Message", field: "message" },
    { header: "Date", field: "createdAt" },
  ];

  return (
    <div className="admin-page m-1 md:m-5">
      <h2 className="admin-fade-up text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">Feedback</h2>
      <TableComponent
        columns={feedbackColumns}
        data={data.feedback} // Assuming data.feedback contains the feedback data
        loading={isLoading}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Feedback;
