import React, { useState, useEffect, useRef } from "react";
import { FaClock, FaSyncAlt, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { OrdersSkeleton } from "../components/Skeletons.jsx";

const DetailRow = ({ label, value, valueClassName = "" }) => (
  <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-1">
    <span className="font-semibold text-gray-700 sm:shrink-0">{label} :</span>
    <span className={`break-words text-gray-600 ${valueClassName}`}>{value || "—"}</span>
  </div>
);

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveryPartner, setDeliveryPartner] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [infoMessage, setInfoMessage] = useState(null);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [signInCountdown, setSignInCountdown] = useState(5);
  const [dragPercentByOrder, setDragPercentByOrder] = useState({});
  const [activeDragOrderId, setActiveDragOrderId] = useState(null);
  const dragSessionRef = useRef(null);

  // Fetch delivery partner email and location from localStorage
  useEffect(() => {
    const email = localStorage.getItem("email");
    const location = localStorage.getItem("location");
    if (email) setDeliveryPartner(email);
    if (location) setUserLocation(location);
  }, []);
  
useEffect(() => {
  const timers = [];

  orders.forEach((order) => {
    if (order.showConfirm) {
      const timer = setTimeout(() => {
        const basePercent =
          order.status === "Pending" ? 0 : order.status === "Processing" ? 50 : 100;
        setDragPercentByOrder((prev) => ({ ...prev, [order._id]: basePercent }));
        setOrders((prev) =>
          prev.map((o) =>
            o._id === order._id ? { ...o, showConfirm: false } : o
          )
        );
      }, 3000);
      timers.push(timer);
    }
  });

  return () => timers.forEach((t) => clearTimeout(t));
}, [orders]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/food-donation`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sorted);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Inline info message handler
  const showTemporaryMessage = (text) => {
    setInfoMessage(text);
    setTimeout(() => setInfoMessage(null), 3000);
  };

  const openSignInPrompt = () => {
    setSignInCountdown(5);
    setShowSignInPrompt(true);
  };

  const getBasePercent = (status) => {
    if (status === "Pending") return 0;
    if (status === "Processing") return 50;
    return 100;
  };

  const getTargetPercent = (status) => {
    if (status === "Pending") return 50;
    if (status === "Processing") return 100;
    return 100;
  };

  const canDragStatus = (status) =>
    status === "Pending" || status === "Processing";

  const setOrderDragPercent = (orderId, percent) => {
    setDragPercentByOrder((prev) => ({ ...prev, [orderId]: percent }));
  };

  const resetOrderDrag = (orderId, status) => {
    setOrderDragPercent(orderId, getBasePercent(status));
  };

  const cleanupPointerListeners = () => {
    window.removeEventListener("pointermove", handleGlobalPointerMove);
    window.removeEventListener("pointerup", handleGlobalPointerUp);
    window.removeEventListener("pointercancel", handleGlobalPointerUp);
  };

  const handleGlobalPointerMove = (event) => {
    const session = dragSessionRef.current;
    if (!session) return;

    const deltaX = event.clientX - session.startX;
    const rightDragOnly = Math.max(deltaX, 0);
    const deltaPercent = (rightDragOnly / session.trackWidth) * 100;
    const nextPercent = Math.min(
      session.targetPercent,
      Math.max(session.basePercent, session.basePercent + deltaPercent)
    );

    session.currentPercent = nextPercent;
    setOrderDragPercent(session.orderId, nextPercent);
  };

  const handleGlobalPointerUp = () => {
    const session = dragSessionRef.current;
    if (!session) return;

    const triggerPercent =
      session.basePercent + (session.targetPercent - session.basePercent) * 0.82;
    const didReachEnd = session.currentPercent >= triggerPercent;

    if (didReachEnd) {
      setOrderDragPercent(session.orderId, session.targetPercent);
      if (!deliveryPartner) {
        openSignInPrompt();
      } else {
        window.setTimeout(() => {
          setOrders((prev) =>
            prev.map((o) =>
              o._id === session.orderId ? { ...o, showConfirm: true } : o
            )
          );
        }, 120);
      }
    } else {
      setOrderDragPercent(session.orderId, session.basePercent);
    }

    setActiveDragOrderId(null);
    dragSessionRef.current = null;
    cleanupPointerListeners();
  };

  const startOrderDrag = (order, event) => {
    if (!canDragStatus(order.status)) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const basePercent = getBasePercent(order.status);
    const targetPercent = getTargetPercent(order.status);

    dragSessionRef.current = {
      orderId: order._id,
      startX: event.clientX,
      trackWidth: Math.max(rect.width, 1),
      basePercent,
      targetPercent,
      currentPercent: basePercent,
    };

    setActiveDragOrderId(order._id);
    setOrderDragPercent(order._id, basePercent);

    window.addEventListener("pointermove", handleGlobalPointerMove);
    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);
  };

  const handleStatusChange = async (id, currentStatus) => {
    if (!deliveryPartner) {
      openSignInPrompt();
      return;
    }

    // Check if user already has a processing order
    const hasProcessing = orders.some(
      (order) =>
        order.status === "Processing" && order.deliveryPartner === deliveryPartner
    );

    if (currentStatus === "Pending" && hasProcessing) {
      setSelectedStatus("Processing");
      setLocationFilter("All");
      resetOrderDrag(id, currentStatus);
      showTemporaryMessage("You already have one processing order.");
      return;
    }

    let nextStatus;
    if (currentStatus === "Pending") nextStatus = "Processing";
    else if (currentStatus === "Processing") nextStatus = "Collected";
    else return; // Prevent skipping steps

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/food-donation/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: nextStatus,
            deliveryPartner,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");

      const updated = await response.json();
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? updated : order))
      );
      setOrderDragPercent(id, getBasePercent(updated.status));

      showTemporaryMessage(
        nextStatus === "Processing"
          ? "Order accepted!"
          : "Order marked as collected!"
      );

      if (nextStatus === "Processing") {
        setSelectedStatus("Processing");
        navigate("/orders");
      } else if (nextStatus === "Collected") {
        navigate("/past-orders");
      }
    } catch (error) {
      console.error("❌ Error updating status:", error);
      setOrderDragPercent(id, getBasePercent(currentStatus));
      showTemporaryMessage("Failed to update status. Try again.");
    }
  };

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    if (selectedStatus === "Processing") {
      return (
        order.status === "Processing" &&
        order.deliveryPartner === deliveryPartner
      );
    }

    if (selectedStatus === "All") {
      return (
        (order.status === "Pending" ||
          (order.status === "Processing" &&
            order.deliveryPartner === deliveryPartner)) &&
        (locationFilter === "All" ||
          (order.district === userLocation && order.status !== "Collected"))
      );
    }

    if (selectedStatus === "Pending") {
      return (
        order.status === "Pending" &&
        (locationFilter === "All" ||
          (order.district === userLocation && order.status !== "Collected"))
      );
    }

    return false;
  });

  useEffect(() => {
    if (!showSignInPrompt) return undefined;

    const interval = window.setInterval(() => {
      setSignInCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setShowSignInPrompt(false);
          navigate("/signup", { state: { from: { pathname: "/orders" } } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [showSignInPrompt, navigate]);

  useEffect(() => {
    const hasOrderConfirmPopup = orders.some((order) => order.showConfirm);
    const isAnyPopupOpen = hasOrderConfirmPopup || showSignInPrompt;

    if (!isAnyPopupOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [orders, showSignInPrompt]);

  useEffect(() => {
    if (!showSignInPrompt) return;

    setDragPercentByOrder((prev) => {
      const next = { ...prev };
      orders.forEach((order) => {
        next[order._id] = getBasePercent(order.status);
      });
      return next;
    });
  }, [showSignInPrompt, orders]);

  useEffect(() => {
    return () => {
      cleanupPointerListeners();
    };
  }, []);

  if (loading)
    return <OrdersSkeleton />;

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 flex justify-center items-center text-red-600 font-medium">
        {error}
      </div>
    );

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const pageTitle =
    selectedStatus === "All" ? "Orders" : selectedStatus;

  return (
    <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 relative">
      {/* Inline info message */}
      {infoMessage && (
        <div className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-indigo-600 px-6 py-3 text-center text-sm font-medium text-white opacity-100 shadow-lg transition-opacity duration-300">
          {infoMessage}
        </div>

      )}

      {showSignInPrompt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 px-4">
          <div className="w-full max-w-md rounded-2xl border border-indigo-200 bg-white p-5 text-center shadow-xl sm:p-6">
            <p className="text-base font-semibold text-indigo-700 sm:text-lg">
              You are not signed in. Sign in to accept orders.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Redirecting to sign in in {signInCountdown}...
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSignInPrompt(false);
                  navigate("/signup", { state: { from: { pathname: "/orders" } } });
                }}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setShowSignInPrompt(false)}
                className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        {!deliveryPartner && (
          <div className="mb-4 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700">
            You are viewing orders as a guest. Sign in to accept or update an order.
          </div>
        )}

        {/* Title */}
        <div className="flex justify-center px-4">
          <div className="pb-6 pt-2 text-center sm:pb-8 sm:pt-3">
            <p className="text-[1.7rem] font-bold tracking-[0.06em] text-sky-800 sm:text-[2.15rem]">
              {pageTitle}
            </p>
            <div className="mx-auto mt-1 mb-3 h-0.5 w-full max-w-[18rem] rounded-full bg-sky-700/50 sm:max-w-[22rem]" />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Location Toggle */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-sm font-medium text-gray-700">Show:</span>
            <div
              onClick={() =>
                setLocationFilter(locationFilter === "All" ? "Nearby" : "All")
              }
              className={`relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${locationFilter === "Nearby"
                ? "bg-gradient-to-r from-indigo-500 via-sky-400 to-green-400"
                : "bg-blue-300"
                }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${locationFilter === "Nearby" ? "translate-x-8" : "translate-x-0"
                  }`}
              ></div>
            </div>

            <span
              className={`text-sm font-medium transition-colors duration-300 ${locationFilter === "Nearby" ? "text-indigo-600" : "text-gray-600"
                }`}
            >
              {locationFilter === "Nearby" ? "Nearby Only" : "All Locations"}
            </span>
          </div>

          {/* Status Filter */}
          <div className="w-full overflow-x-auto pb-1 sm:w-auto">
            <div className="flex min-w-max gap-2">
              {["All", "Pending", "Processing"].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-md border border-white text-sm font-medium transition-all ${selectedStatus === status
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 hover:bg-gradient-to-tr hover:from-sky-200 hover:to-green-100"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found.</p>
          ) : (
            filteredOrders.map((order, index) => (
              <div
                key={order._id}
                className="bg-slate-100 border-2 border-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left Section - Order Details */}
                  <div className="flex-1 p-4 sm:p-6">
                    <div className="mb-4 flex items-start gap-3">
                      <span className="text-sky-500 font-semibold text-lg mr-3">
                        #{index + 1}
                      </span>
                      <h3 className="min-w-0 break-words text-xl font-bold text-indigo-600">
                        {order.foodname}
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm">
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

                    <div className="mt-6 flex flex-wrap items-center gap-2 text-lg">
                      <span className="mb-1 block text-sm font-semibold text-gray-700 sm:mb-0">
                        Current Status :
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "Collected"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                          }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="w-full border-t border-white/70 p-4 sm:p-6 md:w-[38%] md:border-l md:border-t-0 lg:w-[34%]">
                    <div className="flex h-full flex-col justify-between gap-5 items-start md:items-end">
                      <div className="mb-6 flex flex-col justify-center items-start md:items-end">
                        <h4 className="text-lg font-bold text-indigo-700">
                          {order.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="flex w-full flex-col items-center justify-center">
                        <div className="mb-2 flex items-center space-x-2 text-center font-semibold">
                          <span
                            className={`text-sm ${order.status === "Pending"
                              ? "text-blue-600"
                              : order.status === "Processing"
                                ? "text-green-600"
                                : "text-gray-500"
                              }`}
                          >
                            {order.status === "Pending"
                              ? "Swipe to accept order"
                              : order.status === "Processing"
                                ? "Swipe if order collected"
                                : ""}
                          </span>
                          {(order.status === "Pending" ||
                            order.status === "Processing") && (
                              <span
                                className={`text-lg ${order.status === "Pending"
                                  ? "text-blue-600"
                                  : "text-green-600"
                                  }`}
                              >
                                →
                              </span>
                            )}
                        </div>

                        <div className="mb-4 w-full max-w-sm">
                          <div className="relative w-full">
                            <div
                              role="slider"
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-valuenow={
                                dragPercentByOrder[order._id] ??
                                getBasePercent(order.status)
                              }
                              className={`relative h-10 w-full touch-none select-none overflow-hidden rounded-full border border-white/70 bg-gradient-to-r from-yellow-300 via-blue-400 to-green-400 ${
                                deliveryPartner && canDragStatus(order.status)
                                  ? "cursor-grab ring-2 ring-indigo-300 active:cursor-grabbing"
                                  : "cursor-not-allowed opacity-60"
                              }`}
                              onPointerDown={(event) => startOrderDrag(order, event)}
                            >
                              <div
                                className={`absolute left-0 top-0 h-full rounded-full bg-white/28 ${
                                  activeDragOrderId === order._id
                                    ? ""
                                    : "transition-[width] duration-200"
                                }`}
                                style={{
                                  width: `${
                                    dragPercentByOrder[order._id] ??
                                    getBasePercent(order.status)
                                  }%`,
                                }}
                              />
                              <div
                                className={`absolute top-1/2 h-7 w-7 rounded-full border-2 border-white bg-white shadow-[0_6px_14px_rgba(15,23,42,0.28)] ${
                                  activeDragOrderId === order._id
                                    ? ""
                                    : "transition-all duration-200"
                                }`}
                                style={{
                                  left: `calc((100% - 1.75rem) * ${
                                    Math.min(
                                      100,
                                      Math.max(
                                        0,
                                        dragPercentByOrder[order._id] ??
                                          getBasePercent(order.status)
                                      )
                                    ) / 100
                                  })`,
                                  transform: "translateY(-50%)",
                                }}
                              />
                            </div>

                            {/* Labels */}
                            <div className="flex justify-between text-xs mt-2">
                              <span className="flex flex-col items-center text-yellow-600">
                                <FaClock className="mb-1" />
                                Pending
                              </span>
                              <span className="flex flex-col items-center text-blue-600">
                                <FaSyncAlt className="mb-1" />
                                Processing
                              </span>
                              <span className="flex flex-col items-center text-green-600">
                                <FaCheck className="mb-1" />
                                Collected
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Auto-close confirmation */}
                        {order.showConfirm && (
                          <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
                            onClick={() => {
                              setOrders((prev) =>
                                prev.map((o) =>
                                  o._id === order._id ? { ...o, showConfirm: false } : o
                                )
                              );
                              resetOrderDrag(order._id, order.status);
                            }}
                          >
                              <div
                                className="w-[90%] max-w-sm rounded-md border border-indigo-200 bg-indigo-50/95 p-6 text-center shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                              >
                              <p className="text-sm text-indigo-700 font-medium mb-4">
                                {order.status === "Pending"
                                  ? "Do you want to accept this order?"
                                  : order.status === "Processing"
                                    ? "Order Collected?"
                                    : ""}
                              </p>
                              <div className="flex justify-center space-x-4">
                                <button
                                  onClick={() => {
                                    setOrders((prev) =>
                                      prev.map((o) =>
                                        o._id === order._id ? { ...o, showConfirm: false } : o
                                      )
                                    );
                                    resetOrderDrag(order._id, order.status);
                                  }}
                                  className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                                >
                                  No
                                </button>
                                <button
                                  onClick={() => {
                                    handleStatusChange(order._id, order.status);
                                    setOrders((prev) =>
                                      prev.map((o) =>
                                        o._id === order._id ? { ...o, showConfirm: false } : o
                                      )
                                    );
                                  }}
                                  className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                >
                                  Yes
                                </button>
                              </div>
                            </div>
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

export default Orders;
