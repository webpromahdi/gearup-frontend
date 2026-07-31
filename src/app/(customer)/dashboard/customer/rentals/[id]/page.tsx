import { MapPin, Phone, Check, Circle } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import PageHeading from "@/components/shared/PageHeading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const CustomerRentalDetailsPage = () => {
  const steps = [
    ["PLACED", true],
    ["CONFIRMED", true],
    ["PAID", false],
    ["PICKED_UP", false],
    ["RETURNED", false],
    ["CANCELLED", false],
  ];
  return (
    <div className="p-5 sm:p-8">
      <PageHeading
          crumb="Dashboard  ›  My Rentals  ›  Rental #ORD-2025-0089"
          title="Rental Details"
        />
        <div className="grid gap-6 xl:grid-cols-[3fr_2fr]">
          <Card className="overflow-hidden rounded-xl bg-white p-0 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-none">
            <img
              src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=900&auto=format&fit=crop&q=85"
              alt="Trek X-Caliber mountain bike"
              className="aspect-[21/9] w-full object-cover"
            />
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#1b2748]">
                  Trek X-Caliber Mountain Bike
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Trek &nbsp;•&nbsp; Cycling
                </p>
              </div>
              <StatusBadge status="CONFIRMED" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-y-5 border-t border-slate-100 pt-6 text-sm">
              <p className="text-slate-500">
                Rental period{" "}
                <strong className="block pt-1 text-[#1b2748]">
                  Jul 15, 2025 — Jul 18, 2025
                </strong>
              </p>
              <p className="text-slate-500">
                Duration{" "}
                <strong className="block pt-1 text-[#1b2748]">
                  3 days · 1 unit
                </strong>
              </p>
              <p className="text-slate-500">
                Price per day{" "}
                <strong className="block pt-1 text-[#1b2748]">$25.00</strong>
              </p>
              <p className="text-slate-500">
                Total amount{" "}
                <strong className="block pt-1 text-xl text-[#e31824]">
                  $75.00
                </strong>
              </p>
              </div>
            </div>
          </Card>
          <Card className="h-fit rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <h2 className="text-xl font-extrabold text-[#1b2748]">
              Order Summary
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Order ID</dt>
                <dd className="font-bold">#ORD-2025-0089</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Placed on</dt>
                <dd className="font-bold">Jul 13, 2025</dd>
              </div>
            </dl>
            <div className="my-6 border-t border-slate-100" />
            <p className="font-bold text-[#1b2748]">Adventure Gear Co.</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="size-4 text-[#e31824]" />
              Dhanmondi, Dhaka
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Phone className="size-4 text-[#e31824]" />
              +880 1700-111000
            </p>
            <div className="my-6 border-t border-slate-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#1b2748]">
                Payment status
              </span>
              <StatusBadge status="PENDING" />
            </div>
            <a
              href="/dashboard/customer/payment/ord-2025-0089"
              className="mt-5 flex h-12 items-center justify-center rounded-lg bg-[#e31824] text-sm font-extrabold text-white hover:bg-[#c41520]"
            >
              Pay Now
            </a>
            <p className="mt-4 text-center text-xs font-semibold text-slate-500">
              🔒 Payments secured by Stripe
            </p>
          </Card>
        </div>
        <section className="mt-8 rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <h2 className="text-xl font-extrabold text-[#1b2748]">
            Order Progress
          </h2>
          <div className="mt-8 grid grid-cols-3 gap-y-7 md:grid-cols-6">
            {steps.map(([label, completed], index) => (
              <div
                key={label as string}
                className="relative text-center before:absolute before:top-5 before:left-1/2 before:hidden before:h-0.5 before:w-full before:bg-slate-200 md:before:block first:before:hidden"
              >
                <span
                  className={`relative z-10 mx-auto flex size-10 items-center justify-center rounded-full ${index === 1 ? "border-4 border-blue-200 bg-blue-600 text-white" : completed ? "bg-emerald-500 text-white" : "border-2 border-slate-300 bg-white text-slate-400"}`}
                >
                  {completed ? (
                    <Check className="size-5" />
                  ) : (
                    <Circle className="size-3" />
                  )}
                </span>
                <p
                  className={`mt-3 text-xs font-extrabold ${label === "CANCELLED" ? "text-slate-400 line-through" : "text-[#1b2748]"}`}
                >
                  {(label as string).replaceAll("_", " ")}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-8 rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <h2 className="mb-5 text-xl font-extrabold text-[#1b2748]">
            Payment History
          </h2>
          <div className="overflow-x-auto">
            <Table className="min-w-[600px] w-full text-left text-sm">
              <TableHeader className="border-b border-slate-200 text-xs uppercase tracking-[0.08em] text-slate-500">
                <TableRow>
                  {["TXN ID", "Amount", "Provider", "Status", "Date"].map(
                    (item) => (
                      <TableHead key={item} className="pb-3">
                        {item}
                      </TableHead>
                    ),
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="py-4 font-bold">
                    TXN-2025-0089
                  </TableCell>
                  <TableCell className="py-4">$75.00</TableCell>
                  <TableCell className="py-4">Stripe</TableCell>
                  <TableCell className="py-4">
                    <StatusBadge status="PENDING" />
                  </TableCell>
                  <TableCell className="py-4 text-slate-500">
                    Jul 13, 2025
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Rental History / Other Rentals */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-extrabold text-[#1b2748]">
            Other Rentals
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "ORD-2025-0042",
                item: "Sony Alpha A7 III",
                date: "Jun 10 - Jun 12, 2025",
                status: "COMPLETED",
                color: "bg-emerald-100 text-emerald-700",
                image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80"
              },
              {
                id: "ORD-2025-0018",
                item: "REI Camping Tent",
                date: "May 01 - May 05, 2025",
                status: "COMPLETED",
                color: "bg-emerald-100 text-emerald-700",
                image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&auto=format&fit=crop&q=80"
              },
              {
                id: "ORD-2025-0005",
                item: "GoPro Hero 12",
                date: "Jan 15 - Jan 18, 2025",
                status: "CANCELLED",
                color: "bg-slate-100 text-slate-700",
                image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=500&auto=format&fit=crop&q=80"
              }
            ].map((rental, idx) => (
              <Card key={idx} className="overflow-hidden rounded-xl border-none bg-white p-0 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col">
                <div className="flex h-24 items-center border-b border-slate-100">
                  <img src={rental.image} alt={rental.item} className="h-full w-24 shrink-0 object-cover" />
                  <div className="p-3">
                    <h3 className="font-bold text-[#1b2748] line-clamp-1">{rental.item}</h3>
                    <p className="mt-1 text-xs text-slate-500">{rental.date}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-slate-50 px-3 py-2.5">
                  <span className="text-xs font-medium text-slate-500">{rental.id}</span>
                  <span className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase ${rental.color}`}>
                    {rental.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
  );
};

export default CustomerRentalDetailsPage;
