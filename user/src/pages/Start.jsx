import React from "react";
import { Bike, ShieldCheck, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const Start = () => {
  const adminDashboardUrl = import.meta.env.VITE_API_ADMIN || "http://localhost:5174";
  const deliveryDashboardUrl = import.meta.env.VITE_API_DELIVERY || "http://localhost:5175";

  const dashboards = [
    {
      title: "User",
      icon: UserRound,
      description: "Create an account, donate food, and manage your contribution history with ease.",
      highlights: ["Quick sign up", "Food donation access", "Track your activity"],
      actionLabel: "Get Started",
      kind: "route",
      target: "/signup",
    },
    {
      title: "Admin",
      icon: ShieldCheck,
      description: "Oversee incoming donations, manage operations, and keep the platform coordinated.",
      highlights: ["Monitor donations", "Review dashboard activity", "Manage platform flow"],
      actionLabel: "Get Started",
      kind: "external",
      target: adminDashboardUrl,
    },
    {
      title: "Delivery",
      icon: Bike,
      description: "Handle assigned pickups and deliveries so donations reach the right destination fast.",
      highlights: ["View assigned orders", "Check delivery flow", "Support smooth logistics"],
      actionLabel: "Get Started",
      kind: "external",
      target: deliveryDashboardUrl,
    },
  ];

  return (
    <div className="theme-page min-h-screen px-4 pb-24 font-poppins">
      <div className="mx-auto max-w-7xl pt-20">
        <div className="mt-7 grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3">
          {dashboards.map(({ title, icon, description, highlights, actionLabel, kind, target }) => (
            <div
              key={title}
              className="theme-card flex h-full min-h-[480px] flex-col rounded-[30px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_rgba(91,74,55,0.16)] sm:min-h-[520px] sm:p-7 xl:min-h-[560px]"
            >
              <div className="grid min-h-[92px] grid-cols-[auto_1fr] items-start gap-4">
                <div className="rounded-[20px] border border-[rgba(79,127,125,0.18)] bg-[linear-gradient(180deg,rgba(221,235,229,0.92)_0%,rgba(255,250,243,0.96)_100%)] p-4 text-[var(--theme-accent-deep)] shadow-sm">
                  {React.createElement(icon, { className: "h-7 w-7" })}
                </div>
                <div className="flex min-h-full flex-col justify-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--theme-accent)]">
                    {title} Dashboard
                  </p>
                  <h2 className="mt-1 text-[2.2rem] leading-none font-bold text-[var(--theme-ink)] sm:text-[2.6rem]">{title}</h2>
                </div>
              </div>

              <p className="mt-6 text-base leading-8 text-[var(--theme-muted)] sm:min-h-[108px]">{description}</p>

              <div className="theme-subtle-panel mt-6 flex flex-1 flex-col rounded-[24px] px-5 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--theme-accent-deep)]">
                  Includes
                </p>
                <ul className="mt-3 space-y-3 text-[15px] leading-7 text-[var(--theme-ink)]">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--theme-accent)]"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-1">
                {kind === "route" ? (
                  <NavLink
                    to={target}
                    className="theme-button inline-flex w-full items-center justify-center rounded-[18px] px-6 py-3 text-lg font-semibold"
                  >
                    {actionLabel}
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    onClick={() => (window.location.href = target)}
                    className="theme-button inline-flex w-full items-center justify-center rounded-[18px] px-6 py-3 text-lg font-semibold"
                  >
                    {actionLabel}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Start;
