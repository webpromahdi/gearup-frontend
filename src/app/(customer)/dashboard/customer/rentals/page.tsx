"use client";
import { useQuery } from "@tanstack/react-query";
import { Package, PackageOpen } from "lucide-react";
import Link from "next/link";
import PageHeading from "@/components/shared/PageHeading";
import StatusBadge from "@/components/shared/StatusBadge";
import { getCustomerRentalOrdersAction } from "@/app/(customer)/_actions/rentalActions";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const CustomerRentalsListPage = () => {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customer-rental-orders"],
    queryFn: getCustomerRentalOrdersAction,
  });

  return (
    <div className="p-5 sm:p-8">
      <PageHeading crumb="Dashboard  ›  My Rentals" title="My Rentals" />

      {isLoading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#e31824]" />
        </div>
      ) : isError ? (
        <div className="flex h-[40vh] items-center justify-center text-red-500">
          Failed to load rentals.
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white py-20 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <PackageOpen className="mb-4 size-16 text-slate-300" />
          <p className="text-lg font-bold text-slate-500">
            You have no rentals yet.
          </p>
          <Link
            href="/dashboard/customer/rent"
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-[#e31824] px-5 text-sm font-bold text-white transition hover:bg-[#c41520]"
          >
            Rent New Gear
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((rental) => (
            <Link
              key={rental.id}
              href={`/dashboard/customer/rentals/${rental.id}`}
              className="group overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-28 items-center border-b border-slate-100 p-4">
                {rental.gearItem?.image ? (
                  <img
                    src={rental.gearItem.image}
                    alt={rental.gearItem.name}
                    className="h-full w-24 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-full w-24 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Package className="size-8 text-slate-300" />
                  </div>
                )}
                <div className="ml-4 flex-1">
                  <h3 className="font-bold text-[#1b2748] line-clamp-1 group-hover:text-[#e31824]">
                    {rental.gearItem?.name ?? "Gear Item"}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {rental.gearItem?.brand}
                  </p>
                  <p className="mt-2 text-[11px] text-slate-400">
                    {formatDate(rental.startDate)} –{" "}
                    {formatDate(rental.endDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-slate-50 px-4 py-3">
                <span className="text-xs font-bold text-slate-500">
                  Total:{" "}
                  <span className="text-[#1b2748]">
                    ${parseFloat(rental.totalAmount).toFixed(2)}
                  </span>
                </span>
                <StatusBadge status={rental.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerRentalsListPage;
