import React from "react";
import TableComponent from "../components/TableComponent";

const Users = ({ data, isLoading, isDarkMode }) => {
  // Define the columns for the users table
  const usersColumns = [
    { header: "Name", field: "name" },
    { header: "Email", field: "email" },
    { header: "Gender", field: "gender" },
    { header: "Location", field: "location" },
    { header: "Date", field: "createdAt" },
  ];

  // Sort users by date (latest first)
  const sortedUsers = data?.users
    ? [...data.users].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  return (
    <div className="admin-page m-1 md:m-5">
      <h2 className="admin-fade-up text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">Users</h2>
      <TableComponent
        title="Users"
        columns={usersColumns}
        data={sortedUsers}
        loading={isLoading}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Users;
