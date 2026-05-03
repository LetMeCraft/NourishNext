import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { PastOrdersSkeleton } from "../components/Skeletons.jsx";

const DetailRow = ({ label, value, valueClassName = "" }) => (
  <div className="grid gap-0.5 rounded-xl border border-white/55 bg-white/35 px-3 py-2 sm:grid-cols-[7rem_1fr] sm:gap-3">
    <span className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-slate-500">{label}</span>
    <span className={`break-words text-gray-600 ${valueClassName}`}>{value || "—"}</span>
  </div>
);

const PastOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yourEmail, setYourEmail] = useState("");
  const [ratings, setRatings] = useState({}); // temporary (user-selected)
  const [submittedRatings, setSubmittedRatings] = useState({}); // actually submitted ones
  const [activeRatingOrderId, setActiveRatingOrderId] = useState(null);
  const [hoveredStars, setHoveredStars] = useState({});

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      setError("No email found in local storage. Please log in first.");
      setLoading(false);
      return;
    }

    setYourEmail(storedEmail);

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/food-donation`);
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();

        const collectedOrders = data.filter(
          (order) =>
            order.deliveryPartner === storedEmail &&
            order.status === "Collected"
        );

        const sorted = collectedOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Initialize submitted ratings (from DB)
        const initialSubmittedRatings = sorted.reduce((acc, order) => {
          if (order.rating && order.rating > 0) acc[order._id] = order.rating;
          return acc;
        }, {});

        setSubmittedRatings(initialSubmittedRatings);
        setOrders(sorted);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError("Failed to load your past collected orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!activeRatingOrderId) return;

      const clickedInsideRatingSection = event.target.closest(
        `[data-rating-box="${activeRatingOrderId}"]`
      );
      if (clickedInsideRatingSection) return;

      setRatings((prev) => {
        const next = { ...prev };
        delete next[activeRatingOrderId];
        return next;
      });
      setHoveredStars((prev) => {
        const next = { ...prev };
        delete next[activeRatingOrderId];
        return next;
      });
      setActiveRatingOrderId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeRatingOrderId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShowRating = (orderId) => {
    if (activeRatingOrderId === orderId) {
      setRatings((prev) => {
        const next = { ...prev };
        delete next[orderId];
        return next;
      });
      setHoveredStars((prev) => {
        const next = { ...prev };
        delete next[orderId];
        return next;
      });
      setActiveRatingOrderId(null);
      return;
    }

    if (activeRatingOrderId) {
      setRatings((prev) => {
        const next = { ...prev };
        delete next[activeRatingOrderId];
        return next;
      });
      setHoveredStars((prev) => {
        const next = { ...prev };
        delete next[activeRatingOrderId];
        return next;
      });
    }

    setActiveRatingOrderId(orderId);
  };

  const handleSetRating = (orderId, value) => {
    setRatings((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const handleSubmitRating = async (orderId) => {
    const rating = ratings[orderId];
    if (!rating) return alert("Please select a rating before submitting.");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/food-donation/rate/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update rating");

      setActiveRatingOrderId(null);
      setSubmittedRatings((prev) => ({ ...prev, [orderId]: rating }));
      setHoveredStars((prev) => {
        const next = { ...prev };
        delete next[orderId];
        return next;
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, rating } : order
        )
      );
    } catch (err) {
      console.error("❌ Error submitting rating:", err);
      alert("Failed to submit rating. Please try again later.");
    }
  };

  if (loading)
    return <PastOrdersSkeleton />;

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 flex justify-center items-center h-64 text-red-600 font-medium text-center">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100">
      <div className="mx-auto max-w-5xl px-4 py-7 sm:px-6 sm:py-9">
        <div className="mb-5">
          {orders.length > 0 && (
            <p className="inline-flex rounded-full border border-white/80 bg-white/55 px-4 py-2 text-sm font-medium text-slate-600 shadow-[0_12px_28px_rgba(15,23,42,0.07)] backdrop-blur">
              Total Collected Orders:{" "}
              <span className="text-indigo-600 font-semibold">
                {orders.length}
              </span>
            </p>
          )}
        </div>

        <div className="space-y-5">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-white/80 bg-white/45 px-6 py-12 text-center shadow-[0_16px_36px_rgba(15,23,42,0.08)] backdrop-blur">
              <p className="text-base font-semibold text-slate-700">No completed orders yet</p>
              <p className="mt-1 text-sm text-slate-500">Collected orders for {yourEmail} will appear here.</p>
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={order._id}
                className="overflow-hidden rounded-2xl border border-white/90 bg-white/60 shadow-[0_18px_42px_rgba(15,23,42,0.09)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(15,23,42,0.12)]"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left Section */}
                  <div className="flex-1 p-4 sm:p-6">
                    <div className="mb-5 flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 min-w-9 items-center justify-center rounded-xl bg-emerald-100 text-base font-bold text-emerald-700 shadow-sm">
                        #{index + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="break-words text-xl font-bold leading-snug text-indigo-700">
                          {order.foodname}
                        </h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                          Completed pickup
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-2 text-sm">
                      <DetailRow label="Meal" value={order.meal} />
                      <DetailRow label="Category" value={order.category} />
                      <DetailRow label="Quantity" value={`${order.quantity} kg`} />
                      <DetailRow label="Address" value={order.address} />
                      <DetailRow label="District" value={order.district} />
                      <DetailRow label="Phone" value={order.phoneno} />
                      <DetailRow
                        label="Email"
                        value={order.email}
                        valueClassName="font-medium text-green-600"
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-slate-600">
                        Current Status
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold shadow-sm ${order.status === "Collected"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-sky-100 text-sky-700"
                          }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="w-full border-t border-white/70 bg-slate-50/45 p-4 sm:p-6 md:w-[38%] md:border-l md:border-t-0 lg:w-[34%]">
                    <div className="flex h-full flex-col justify-between gap-5 items-start md:items-end">
                      <div className="flex w-full flex-col rounded-2xl border border-white/70 bg-white/45 px-4 py-3 md:items-end">
                        <h4 className="break-words text-lg font-bold text-indigo-700">
                          {order.name}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      {/* ⭐ Rating Section */}
                      <div
                        className="flex w-full flex-col items-start space-y-2 rounded-2xl border border-white/70 bg-white/40 px-4 py-4 font-semibold text-yellow-500 md:items-end"
                        data-rating-box={order._id}
                      >
                        {submittedRatings[order._id] ? (
                          // ⭐ Show saved rating
                            <div className="flex flex-wrap gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                key={star}
                                size={24}
                                className={
                                  star <= submittedRatings[order._id]
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        ) : activeRatingOrderId !== order._id ? (
                          <button
                            onClick={() => handleShowRating(order._id)}
                            className="rounded-xl border border-yellow-300 bg-yellow-100 px-4 py-2 text-sm text-yellow-700 shadow-sm transition hover:bg-yellow-200"
                          >
                            ⭐ Give Rating
                          </button>
                        ) : (
                            <div className="flex flex-col items-center">
                              <div className="mb-2 flex flex-wrap justify-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                  key={star}
                                  size={24}
                                  className={`cursor-pointer transition ${star <=
                                      (hoveredStars[order._id] ||
                                        ratings[order._id] ||
                                        0)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                    }`}
                                  onMouseEnter={() =>
                                    setHoveredStars((prev) => ({
                                      ...prev,
                                      [order._id]: star,
                                    }))
                                  }
                                  onMouseLeave={() =>
                                    setHoveredStars((prev) => ({
                                      ...prev,
                                      [order._id]: null,
                                    }))
                                  }
                                  onClick={() =>
                                    handleSetRating(order._id, star)
                                  }
                                />
                              ))}
                            </div>
                            <button
                              onClick={() => handleSubmitRating(order._id)}
                              className="text-xs px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                            >
                              Submit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PastOrder;
