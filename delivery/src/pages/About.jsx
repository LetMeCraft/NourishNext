import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Clock3,
  HandHelping,
  HeartHandshake,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const trustPoints = [
  {
    icon: Clock3,
    title: "Fast response",
    description:
      "Delivery partners can quickly accept nearby pickups and reduce food waiting time.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable coordination",
    description:
      "Clear pickup details, donor information, and live order progress keep every handoff organized.",
  },
  {
    icon: HeartHandshake,
    title: "Human impact",
    description:
      "Every collected meal supports families, shelters, and communities that need help most.",
  },
];

const howItWorks = [
  {
    icon: PackageCheck,
    title: "Food gets listed",
    description:
      "Restaurants, events, and canteens share surplus food that is ready for pickup.",
  },
  {
    icon: Truck,
    title: "Delivery partners collect",
    description:
      "Our delivery team accepts orders, heads to the pickup point, and confirms collection.",
  },
  {
    icon: HandHelping,
    title: "NGOs receive support",
    description:
      "Meals move quickly to trusted organizations so food reaches people instead of landfills.",
  },
];

const deliveryHighlights = [
  "See nearby food pickups and prioritize urgent requests.",
  "Track order status from pending to collected with a simple flow.",
  "Build trust between donors, delivery partners, and NGOs.",
  "Turn every route into measurable social impact.",
];

const About = () => {
  const navigate = useNavigate();
  const [activeTrustPoint, setActiveTrustPoint] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTrustPoint((prev) => (prev + 1) % trustPoints.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 text-slate-900">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.22),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.9),_rgba(255,255,255,0.45))]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur">
              <MapPin className="h-4 w-4" />
              Delivery partners powering hunger relief
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Pick up hope. Deliver meals. Keep good food moving.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              NourishNext connects surplus food with the people who need it
              most. This delivery platform helps partners respond faster, manage
              pickups smoothly, and turn every completed route into real impact.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-600"
              >
                Join the delivery network
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-7 py-3.5 text-base font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:border-emerald-200 hover:text-emerald-700"
              >
                Talk to our team
              </button>
            </div>

          </div>

          <div className="relative hidden md:block">
            <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-sky-300/40 blur-2xl" />
            <div className="absolute -right-6 bottom-8 h-28 w-28 rounded-full bg-emerald-300/40 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/80 bg-slate-900 p-6 text-white shadow-2xl shadow-indigo-300/30">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                  Delivery dashboard
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight">
                  The home base for every pickup.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/85">
                  Built for people on the move, this experience keeps routes
                  simple, updates visible, and food rescue work focused on speed
                  and care.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {deliveryHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-6 md:px-10">
        <div className="block md:hidden">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/75 shadow-md backdrop-blur">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeTrustPoint * 100}%)` }}
            >
              {trustPoints.map((point) => (
                <div key={point.title} className="w-full shrink-0 p-7">
                  <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 p-3 text-white">
                    <point.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{point.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            {trustPoints.map((point, index) => (
              <button
                key={point.title}
                type="button"
                onClick={() => setActiveTrustPoint(index)}
                className={`h-3 rounded-full transition-all duration-500 ${
                  index === activeTrustPoint
                    ? "w-20 bg-emerald-500"
                    : "w-14 bg-emerald-300/70"
                }`}
                aria-label={`Show ${point.title}`}
                aria-pressed={index === activeTrustPoint}
              />
            ))}
          </div>
        </div>
        
        

        <div className="hidden gap-6 md:grid lg:grid-cols-3">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="rounded-[1.75rem] border border-white/80 bg-white/75 p-7 shadow-md backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 p-3 text-white">
                <point.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{point.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-700">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
              A smoother path from surplus food to safe delivery.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              The delivery page should feel purposeful from the first second.
              This home page now introduces the mission clearly while staying
              connected to the order workflow your delivery partners already use.
            </p>
          </div>

          <div className="space-y-5">
            {howItWorks.map((item, index) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                  0{index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="rounded-[2rem] bg-slate-900 px-6 py-10 text-white shadow-2xl shadow-slate-400/20 sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">
                Join NourishNext
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Help us reduce waste and deliver dignity, one order at a time.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                Whether you are a delivery partner, NGO, or food provider, this
                network works best when more people join the route.
              </p>
            </div>

            <button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-3.5 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              Start now
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
