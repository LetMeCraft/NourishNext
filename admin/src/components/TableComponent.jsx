import React, { useEffect, useState } from "react";

const renderCellValue = (item, col) => {
  if (col.field === "createdAt") {
    if (item[col.field]) {
      const date = new Date(item[col.field]);
      const day = date.getDate();
      const month = date.toLocaleString("en-GB", { month: "short" });
      const year = date.getFullYear();
      return `${month}\u00A0${day},\u00A0${year}`;
    }

    return "—";
  }

  if (col.field === "status") {
    const status = item[col.field] || "—";
    const baseBadge = "px-3 py-1 rounded-full text-xs font-bold";
    const statusStyles = {
      Collected: "bg-[#d0fae5] text-[#006045]",
      Pending: "bg-[#fef3c6] text-[#973c00]",
      Default: "bg-blue-200 text-blue-600",
    };

    const statusClass = statusStyles[status] || statusStyles.Default;
    return <span className={`${baseBadge} ${statusClass}`}>{status}</span>;
  }

  if (col.field === "quantity") {
    return item[col.field] ? `${item[col.field]} kg` : "—";
  }

  return item[col.field] || "—";
};

const TableComponent = ({ title, columns, data, loading, isDarkMode }) => {
  const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(true);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  useEffect(() => {
    if (!loading) {
      setShowLoadingSkeleton(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowLoadingSkeleton(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (!expandedMessageId) return undefined;

    const openedAt = window.scrollY;

    const timer = setTimeout(() => {
      setExpandedMessageId(null);
    }, 10000);

    const closeExpandedMessage = () => {
      if (Math.abs(window.scrollY - openedAt) > 420) {
        setExpandedMessageId(null);
      }
    };

    document.addEventListener("scroll", closeExpandedMessage, true);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("scroll", closeExpandedMessage, true);
    };
  }, [expandedMessageId]);

  if (loading) {
    if (!showLoadingSkeleton) {
      return (
        <section
          className={`admin-table-shell border rounded-lg p-8 text-center shadow-md ${
            isDarkMode
              ? "bg-slate-900 border-slate-700 text-slate-200"
              : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-800 text-sky-900"
          }`}
        >
          <h3 className="text-2xl font-bold">{title || "This section"} is taking longer than usual</h3>
          <p className="mt-2 text-sm opacity-80">
            We could not load this section yet. Please wait a moment or try refreshing.
          </p>
        </section>
      );
    }

    return (
      <section
        className={`admin-table-shell border rounded-lg p-4 shadow-md ${
          isDarkMode
            ? "bg-slate-900 border-slate-700"
            : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-800"
        }`}
      >
        <div className="space-y-5 md:hidden">
          {Array.from({ length: 3 }).map((_, cardIndex) => (
            <div
              key={cardIndex}
              className={`rounded-2xl border p-4 ${
                isDarkMode
                  ? "border-sky-800 bg-slate-800/80"
                  : "border-sky-200 bg-white/75"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="admin-skeleton h-5 w-12 rounded-md" />
                <div className="admin-skeleton h-8 w-24 rounded-full" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: Math.min(columns.length, 6) }).map((__, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-[88px_1fr] gap-3">
                    <div className="admin-skeleton h-4 rounded-md" />
                    <div className="admin-skeleton h-4 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden space-y-4 md:block">
          <div className="flex gap-3">
            {Array.from({ length: Math.min(columns.length + 1, 6) }).map((_, index) => (
              <div key={index} className="admin-skeleton h-5 flex-1 rounded-md" />
            ))}
          </div>

          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-3">
              {Array.from({ length: Math.min(columns.length + 1, 6) }).map((__, colIndex) => (
                <div key={colIndex} className="admin-skeleton h-10 flex-1 rounded-lg" />
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section
        className={`admin-table-shell border rounded-lg p-8 text-center shadow-md ${
          isDarkMode
            ? "bg-slate-900 border-slate-700 text-slate-300"
            : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-800 text-sky-900"
        }`}
      >
        <h3 className="text-xl font-semibold">{title || "Records"}</h3>
        <p className="mt-2 text-sm opacity-80">
          No data is available right now. New records will appear here when the backend returns results.
        </p>
      </section>
    );
  }

  return (
    <section
      className={`admin-table-shell admin-fade-up border rounded-lg p-2 md:p-4 shadow-md hover:shadow-lg ${
        isDarkMode
          ? "bg-slate-900 border-slate-700"
          : "bg-gradient-to-b from-blue-100 to-green-50 border-sky-800"
      }`}
    >
      <div className="space-y-5 md:hidden">
        {data.map((item, index) => (
          <article
            key={item._id || item.id || `${title}-${index}`}
            className={`rounded-2xl border p-3 ${
              isDarkMode
                ? "border-sky-800 bg-slate-800/80"
                : "border-sky-200 bg-white/75"
            }`}
          >
            <div className={`mb-3 flex items-center ${columns.some((col) => col.field === "status") ? "justify-between" : "justify-start"}`}>
              <span className="text-sm font-bold text-pink-500">#{index + 1}</span>
              {columns.some((col) => col.field === "status") ? (
                <div className="flex justify-end">
                  {renderCellValue(item, { field: "status" })}
                </div>
              ) : null}
            </div>

            <div className="grid gap-3">
              {columns.map((col) => (
                  col.field === "status" ? null :
                  <div
                    key={`${col.field}-${item._id || item.id || index}`}
                    className="grid grid-cols-[78px_1fr] gap-16 text-sm"
                  >
                    <span className={`font-semibold ${isDarkMode ? "text-pink-400" : "text-pink-500"}`}>
                      {col.header}
                    </span>
                    <div className={`min-w-0 overflow-hidden ${
                      col.field === "email"
                        ? "truncate text-[13px]"
                        : "break-words"
                    } ${isDarkMode ? "text-slate-300" : "text-sky-800"}`}>
                      {col.field === "message" ? (
                        <div>
                          <p
                            className="break-words"
                            style={
                              expandedMessageId === (item._id || item.id || index)
                                ? undefined
                                : {
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }
                            }
                          >
                            {item[col.field] || "—"}
                          </p>
                          {item[col.field] && item[col.field].length > 120 && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedMessageId((prev) => {
                                  const nextId =
                                    prev === (item._id || item.id || index)
                                      ? null
                                      : (item._id || item.id || index);
                                  return nextId;
                                })
                              }
                              className="mt-2 text-xs font-semibold text-cyan-400"
                            >
                              {expandedMessageId === (item._id || item.id || index) ? "Show less" : "Show full"}
                            </button>
                          )}
                        </div>
                      ) : (
                        renderCellValue(item, col)
                      )}
                    </div>
                  </div>
                )).filter(Boolean)}
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full table-auto">
          <thead className={`text-sm uppercase ${isDarkMode ? "text-slate-300" : "text-sky-900"}`}>
            <tr>
              <th className="p-3 text-left text-pink-500">#</th>
              {columns.map((col) => (
                <th key={col.field} className="p-3 text-left text-pink-500">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={item._id || item.id || `${title}-${index}`}
                className={`admin-interactive border-t ${
                  isDarkMode ? "border-sky-800 hover:bg-slate-800/70" : "border-purple-400 hover:bg-white/45"
                }`}
              >
                <td className={`p-3 text-sm font-semibold ${isDarkMode ? "text-slate-300" : "text-sky-800"}`}>
                  {index + 1}
                </td>

                {columns.map((col) => (
                  <td
                    key={`${col.field}-${item._id || item.id || index}`}
                    className={`p-3 text-sm font-semibold ${isDarkMode ? "text-slate-300" : "text-sky-800"}`}
                  >
                    {renderCellValue(item, col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TableComponent;
