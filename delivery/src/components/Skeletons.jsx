import React from "react";

const pulse = "animate-pulse rounded-xl bg-slate-200/80";

const SkeletonBar = ({ className = "" }) => (
  <div className={`${pulse} ${className}`} />
);

const OrderCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-white/90 bg-white/60 shadow-[0_18px_42px_rgba(15,23,42,0.09)] backdrop-blur">
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4 sm:p-6">
        <div className="mb-5 flex items-start gap-3">
          <SkeletonBar className="h-9 min-w-9 rounded-xl" />
          <div className="w-full">
            <SkeletonBar className="h-6 w-48" />
            <SkeletonBar className="mt-2 h-3 w-28" />
          </div>
        </div>
        <div className="grid gap-2">
          <SkeletonBar className="h-9 w-full" />
          <SkeletonBar className="h-9 w-full" />
          <SkeletonBar className="h-9 w-full" />
          <SkeletonBar className="h-9 w-full" />
          <SkeletonBar className="h-9 w-[82%]" />
        </div>
        <SkeletonBar className="mt-6 h-8 w-36 rounded-full" />
      </div>

      <div className="w-full border-t border-white/70 bg-slate-50/45 p-4 sm:p-6 md:w-[38%] md:border-l md:border-t-0 lg:w-[34%]">
        <div className="mb-5 rounded-2xl border border-white/70 bg-white/45 px-4 py-3">
          <SkeletonBar className="h-5 w-28" />
          <SkeletonBar className="mt-2 h-4 w-36" />
        </div>
        <div className="rounded-2xl border border-white/70 bg-white/40 px-3 py-4">
          <SkeletonBar className="mb-4 h-10 w-full rounded-full" />
          <div className="flex justify-between">
            <SkeletonBar className="h-10 w-16 rounded-lg" />
            <SkeletonBar className="h-10 w-16 rounded-lg" />
            <SkeletonBar className="h-10 w-16 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const RouteSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 p-4 sm:p-6">
    <div className="mx-auto max-w-6xl space-y-6">
      <SkeletonBar className="mx-auto h-10 w-64" />
      <SkeletonBar className="mx-auto h-2 w-36" />
      <div className="grid gap-6 md:grid-cols-2">
        <SkeletonBar className="h-48 w-full" />
        <SkeletonBar className="h-48 w-full" />
      </div>
      <SkeletonBar className="h-72 w-full" />
    </div>
  </div>
);

export const OrdersSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 px-4 py-7 sm:px-6 sm:py-9">
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-2xl border border-white/75 bg-white/45 p-3 shadow-[0_18px_42px_rgba(15,23,42,0.09)] sm:flex sm:items-center sm:justify-between sm:gap-4 sm:p-4">
        <SkeletonBar className="h-8 w-64" />
        <SkeletonBar className="mt-4 h-10 w-72 sm:mt-0" />
      </div>
      <div className="space-y-5">
        <OrderCardSkeleton />
        <OrderCardSkeleton />
      </div>
    </div>
  </div>
);

export const PastOrdersSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 px-4 py-7 sm:px-6 sm:py-9">
    <div className="mx-auto max-w-5xl">
      <SkeletonBar className="mb-5 h-10 w-56 rounded-full" />
      <div className="space-y-6">
        <OrderCardSkeleton />
        <OrderCardSkeleton />
      </div>
    </div>
  </div>
);
