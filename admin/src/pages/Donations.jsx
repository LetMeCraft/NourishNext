import React from "react";
import TableComponent from "../components/TableComponent";

const Donations = ({ data, isLoading, isDarkMode }) => {
  // Columns for the donations table
  const columns = [
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

  // Handle missing or empty data safely & sort by latest date
  const sortedDonations = data?.donations
    ? [...data.donations].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  return (
    <div className="admin-page m-1 md:m-5">
      <h2 className="admin-fade-up text-3xl font-bold mb-6 text-sky-700 dark:text-sky-400">
        User Donations
      </h2>
      <TableComponent
        title="Donations"
        columns={columns}
        data={sortedDonations}
        loading={isLoading}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Donations;
