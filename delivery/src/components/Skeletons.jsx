import React from "react";

const pulse = "animate-pulse rounded-xl bg-slate-200/80";

const SkeletonBar = ({ className = "" }) => (
  <div className={`${pulse} ${className}`} />
);

const OrderCardSkeleton = () => (
  <div className="overflow-hidden rounded-lg border-2 border-white bg-slate-100 shadow-sm">
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4 sm:p-6">
        <SkeletonBar className="mb-4 h-7 w-44" />
        <div className="space-y-2">
          <SkeletonBar className="h-4 w-full" />
          <SkeletonBar className="h-4 w-[92%]" />
          <SkeletonBar className="h-4 w-[82%]" />
          <SkeletonBar className="h-4 w-[88%]" />
          <SkeletonBar className="h-4 w-[70%]" />
        </div>
        <SkeletonBar className="mt-6 h-8 w-36 rounded-full" />
      </div>

      <div className="w-full border-t border-white/70 p-4 sm:p-6 md:w-[38%] md:border-l md:border-t-0 lg:w-[34%]">
        <div className="mb-6 flex flex-col items-start md:items-end">
          <SkeletonBar className="h-5 w-28" />
          <SkeletonBar className="mt-2 h-4 w-36" />
        </div>
        <SkeletonBar className="mb-4 h-8 w-full rounded-full" />
        <div className="flex justify-between">
          <SkeletonBar className="h-10 w-16 rounded-lg" />
          <SkeletonBar className="h-10 w-16 rounded-lg" />
          <SkeletonBar className="h-10 w-16 rounded-lg" />
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
  <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 p-4 sm:p-6">
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 text-center">
        <SkeletonBar className="mx-auto h-10 w-44" />
        <SkeletonBar className="mx-auto mt-4 h-1 w-32" />
      </div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SkeletonBar className="h-8 w-64" />
        <SkeletonBar className="h-10 w-72" />
      </div>
      <div className="space-y-6">
        <OrderCardSkeleton />
        <OrderCardSkeleton />
      </div>
    </div>
  </div>
);

export const PastOrdersSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-tl from-sky-100 via-indigo-100 to-green-100 p-4 sm:p-6">
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <SkeletonBar className="mx-auto h-10 w-72" />
        <SkeletonBar className="mx-auto mt-4 h-1 w-44" />
      </div>
      <div className="space-y-6">
        <OrderCardSkeleton />
        <OrderCardSkeleton />
      </div>
    </div>
  </div>
);

