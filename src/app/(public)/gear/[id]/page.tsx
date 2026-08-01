import {
  CalendarDays,
  Star,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  User,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getSingleGearAction } from "@/app/(customer)/_actions/gearActions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gear = await getSingleGearAction(id);

  if (!gear) {
    notFound();
  }

  const reviews = gear.reviews || [];
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(
          1,
        )
      : "0.0";
  const providerName = gear.provider?.name || "Unknown Provider";

  const specs = [
    ["Brand", gear.brand],
    ["Condition", gear.condition],
    ["Stock", `${gear.stock} units left`],
    ["Address", gear.address || "Dhaka, Bangladesh"],
    ["Category", gear.category?.name || "Uncategorized"],
  ];

  // rating percentages
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingCounts[r.rating - 1]++;
    }
  });

  return (
    <main className="mx-auto max-w-7xl px-5 py-9 lg:px-8">
      <div className="mb-6 text-sm text-slate-500">
        <Link
          href="/gear"
          className="font-semibold text-[#e31824] hover:underline"
        >
          Browse Gear
        </Link>
        <span className="mx-2">/</span>
        <span>{gear.name}</span>
      </div>
      <section className="grid gap-9 lg:grid-cols-[minmax(0,3fr)_minmax(340px,2fr)]">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200">
            <img
              src={gear.image}
              alt={gear.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[gear.image, gear.image, gear.image].map((src, index) => (
              <button
                key={index}
                className={`aspect-[4/3] p-0 overflow-hidden rounded-lg border-2 ${index === 0 ? "border-[#e31824]" : "border-transparent"}`}
              >
                <img
                  src={src}
                  alt={`${gear.name} preview ${index + 1}`}
                  className="h-full w-full object-cover opacity-80 transition hover:opacity-100"
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="inline-flex rounded-full bg-[#e31824] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-white">
            {gear.category?.name || "Gear"}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[#1b2748] sm:text-4xl">
            {gear.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`size-4 ${index < Math.round(Number(avgRating)) ? "fill-[#f4b740] text-[#f4b740]" : "text-slate-300"}`}
                />
              ))}
            </span>
            <strong>{avgRating}</strong>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600">{totalReviews} reviews</span>
            <a
              href="#reviews"
              className="font-semibold text-blue-600 hover:underline"
            >
              Read all reviews
            </a>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-sm font-extrabold uppercase text-blue-700">
              {providerName.substring(0, 2)}
            </span>
            <p className="text-sm text-slate-600">
              Listed by{" "}
              <strong className="text-[#1b2748]">{providerName}</strong>{" "}
              <span className="mx-1 text-slate-300">|</span>{" "}
              <Star className="mb-0.5 inline size-3.5 fill-[#f4b740] text-[#f4b740]" />{" "}
              Provider
            </p>
          </div>
          <div className="my-6 border-t border-slate-200" />
          <div className="flex items-end gap-3">
            <p className="text-4xl font-extrabold tracking-[-0.04em] text-[#e31824]">
              ৳{gear.pricePerDay}
              <span className="text-lg font-bold">/day</span>
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-700">
              Condition: {gear.condition}
            </span>
            <span className="rounded-full bg-amber-100 px-3 py-1.5 text-amber-700">
              Stock: {gear.stock} units left
            </span>
            {gear.availability ? (
              <span className="rounded-full bg-green-100 px-3 py-1.5 text-green-700">
                ✓ Available
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-3 py-1.5 text-red-700">
                ✕ Not Available
              </span>
            )}
          </div>
          <p className="mt-6 leading-7 text-slate-600">
            {gear.description ||
              `Rent the ${gear.name} today. Excellent for all your needs. Listed by a verified provider on GearUp.`}
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 text-sm">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-2 border-b border-slate-200 last:border-0"
              >
                <span className="bg-slate-50 px-4 py-3 font-bold text-[#1b2748]">
                  {label}
                </span>
                <span className="px-4 py-3 text-slate-600">{value}</span>
              </div>
            ))}
          </div>
          <div className="my-6 border-t border-slate-200" />
          <section className="rounded-xl bg-[#f5f6fa] p-5">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#1b2748]">
              <CalendarDays className="size-5 text-[#e31824]" />
              Select Your Rental Period
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <label className="text-xs font-bold text-slate-600">
                Start Date
                <Input
                  type="text"
                  defaultValue="Jul 20, 2025"
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-[#1b2748]"
                />
              </label>
              <label className="text-xs font-bold text-slate-600">
                End Date
                <Input
                  type="text"
                  defaultValue="Jul 23, 2025"
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-[#1b2748]"
                />
              </label>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-bold text-[#1b2748]">
                Quantity:
              </span>
              <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                <Button className="flex size-9 items-center justify-center text-slate-500">
                  <Minus className="size-4" />
                </Button>
                <span className="w-8 text-center text-sm font-bold">1</span>
                <Button className="flex size-9 items-center justify-center text-[#e31824]">
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
            <div className="my-5 border-t border-slate-200" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">
                Duration: <strong className="text-[#1b2748]">3 days</strong>
              </span>
              <span className="font-extrabold text-[#1b2748]">
                Subtotal: ৳{(parseInt(gear.pricePerDay) * 3).toLocaleString()}
              </span>
            </div>
            <Button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#e31824] text-sm font-extrabold text-white hover:bg-[#c41520]">
              <ShoppingCart className="size-4" />
              Rent Now — ৳{(parseInt(gear.pricePerDay) * 3).toLocaleString()}
            </Button>
            <Button className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#e31824] bg-white text-sm font-bold text-[#e31824] hover:bg-red-50">
              <Heart className="size-4" />
              Save to Wishlist
            </Button>
            <p className="mt-4 text-center text-xs font-medium text-slate-500">
              🔒 Secure payment via Stripe
            </p>
          </section>
        </div>
      </section>

      <section id="reviews" className="mt-16 border-t border-slate-200 pt-10">
        <div className="flex gap-6 overflow-x-auto scrollbar-none border-b border-slate-200">
          <a
            href="#reviews"
            className="whitespace-nowrap border-b-2 border-[#e31824] pb-4 text-sm font-extrabold text-[#e31824]"
          >
            Reviews ({totalReviews})
          </a>
          <a
            href="#provider"
            className="whitespace-nowrap border-b-2 border-transparent pb-4 text-sm font-bold text-slate-500"
          >
            Provider Info
          </a>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)]">
          <div className="space-y-6">
            {/* Rating Box */}
            <div className="rounded-xl bg-[#f5f6fa] p-6 text-center">
              <p className="text-5xl font-extrabold text-[#1b2748]">
                {avgRating}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                out of 5
              </p>
              <div className="mt-3 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`size-4 ${index < Math.round(Number(avgRating)) ? "fill-[#f4b740] text-[#f4b740]" : "text-slate-300"}`}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Based on {totalReviews} reviews
              </p>
              <div className="mt-6 space-y-2 text-xs">
                {[5, 4, 3, 2, 1].map((score) => {
                  const count = ratingCounts[score - 1];
                  const percent =
                    totalReviews > 0
                      ? Math.round((count / totalReviews) * 100)
                      : 0;
                  return (
                    <div key={score} className="flex items-center gap-2">
                      <span className="w-5 text-right">{score}★</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-[#f4b740]"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-7">{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Provider Info Box */}
            {gear.provider && (
              <div
                id="provider"
                className="rounded-xl border border-slate-200 p-6"
              >
                <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-[#1b2748]">
                  Provider Info
                </h3>
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-extrabold uppercase text-blue-700">
                    {providerName.substring(0, 2)}
                  </span>
                  <div>
                    <p className="font-bold text-[#1b2748]">{providerName}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Verified Provider
                    </p>
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-slate-400" />
                    <a
                      href={`mailto:${gear.provider.email}`}
                      className="hover:underline"
                    >
                      {gear.provider.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-slate-400" />
                    <span>Member since 2024</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <Card className="rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                No reviews yet for this gear.
              </Card>
            ) : (
              reviews.map((r) => {
                const customerName = r.customer?.name || "Anonymous";
                const initials = customerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase();
                const dateStr = new Date(r.createdAt).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "short", day: "numeric" },
                );

                return (
                  <Card
                    key={r.id}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <div className="flex gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-extrabold text-[#e31824]">
                        {initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-bold text-[#1b2748]">
                            {customerName}
                          </p>
                          <p className="text-xs text-slate-400">{dateStr}</p>
                        </div>
                        <div className="mt-1 flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`size-3.5 ${index < r.rating ? "fill-[#f4b740] text-[#f4b740]" : "text-slate-300"}`}
                            />
                          ))}
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {r.comment || "No comment provided."}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#e31824]">
              More to explore
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.025em] text-[#1b2748]">
              You Might Also Like
            </h2>
          </div>
          <Link
            href="/gear"
            className="hidden text-sm font-bold text-[#e31824] sm:block"
          >
            View all gear →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
      </section>
    </main>
  );
}
