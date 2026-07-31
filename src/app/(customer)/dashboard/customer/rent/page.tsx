"use client";
import { useQuery } from "@tanstack/react-query";
import PageHeading from "@/components/shared/PageHeading";
import {
  Search,
  MapPin,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPublicGearsAction } from "@/app/(customer)/_actions/gearActions";
import { getPublicCategoriesAction } from "@/app/(customer)/_actions/categoryActions";
import Link from "next/link";

const categoryColorPalette = [
  { color: "text-red-500", bg: "bg-red-50" },
  { color: "text-emerald-500", bg: "bg-emerald-50" },
  { color: "text-amber-500", bg: "bg-amber-50" },
  { color: "text-blue-500", bg: "bg-blue-50" },
  { color: "text-indigo-500", bg: "bg-indigo-50" },
  { color: "text-green-500", bg: "bg-green-50" },
  { color: "text-orange-500", bg: "bg-orange-50" },
  { color: "text-pink-500", bg: "bg-pink-50" },
  { color: "text-purple-500", bg: "bg-purple-50" },
  { color: "text-cyan-500", bg: "bg-cyan-50" },
];

const conditionBadge: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  EXCELLENT: "bg-emerald-100 text-emerald-700",
  GOOD: "bg-green-100 text-green-700",
  FAIR: "bg-amber-100 text-amber-700",
  POOR: "bg-red-100 text-red-700",
};

const CustomerRentGearPage = () => {
  const { data: gearItems = [], isLoading: isLoadingGear } = useQuery({
    queryKey: ["public-gears"],
    queryFn: getPublicGearsAction,
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["public-categories"],
    queryFn: getPublicCategoriesAction,
  });

  const availableGears = gearItems.filter((g) => g.availability);
  const isLoading = isLoadingGear || isLoadingCategories;

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#e31824]" />
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-8">
      <PageHeading
        title="Rent New Gear"
        subtitle="Discover and rent high-quality gear for your next adventure."
      />

      {/* Search and Filter Bar */}
      <Card className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] lg:flex-row lg:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search gear, brand or keyword..."
            className="pl-9 bg-transparent border-slate-200"
          />
        </div>
        <div className="w-full lg:w-48">
          <Select defaultValue="all-categories">
            <SelectTrigger className="bg-transparent border-slate-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full lg:w-48">
          <Select defaultValue="all-locations">
            <SelectTrigger className="bg-transparent border-slate-200">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-locations">All Locations</SelectItem>
              <SelectItem value="dhaka">Dhaka</SelectItem>
              <SelectItem value="chittagong">Chittagong</SelectItem>
              <SelectItem value="sylhet">Sylhet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full bg-[#e31824] hover:bg-[#c41520] lg:w-32">
          Search
        </Button>
      </Card>

      {/* Browse by Category */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1b2748]">
            Browse by Category
          </h2>
          <a
            href="#"
            className="text-sm font-bold text-[#e31824] hover:underline"
          >
            View All
          </a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.length === 0 && (
            <p className="text-sm text-slate-400">No categories found.</p>
          )}
          {categories.map((cat, idx) => {
            const palette =
              categoryColorPalette[idx % categoryColorPalette.length];
            const gearCount = gearItems.filter(
              (g) => g.categoryId === cat.id,
            ).length;
            return (
              <div
                key={cat.id}
                className="flex min-w-[130px] cursor-pointer flex-col items-center justify-center rounded-xl bg-white py-4 px-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition border border-transparent hover:border-[#e31824] hover:shadow-md"
              >
                <span
                  className={`flex size-11 items-center justify-center rounded-full ${palette.bg} mb-2.5`}
                >
                  <Tag className={`size-5 ${palette.color}`} />
                </span>
                <p className="text-sm font-bold text-[#1b2748] text-center">
                  {cat.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {gearCount} items
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Gear List */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#1b2748]">Available Gear</h2>
          <p className="text-sm text-slate-500">
            {availableGears.length} items found
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="condition">
            <SelectTrigger className="w-[120px] bg-white h-9 text-sm">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="condition">Condition</SelectItem>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="EXCELLENT">Excellent</SelectItem>
              <SelectItem value="GOOD">Good</SelectItem>
              <SelectItem value="FAIR">Fair</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <span className="text-sm font-medium text-slate-700">
              Available Only
            </span>
            <div className="w-9 h-5 bg-[#0fc172] rounded-full flex items-center p-0.5 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-4"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Sort By</span>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[130px] bg-white h-9 text-sm border-none shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {availableGears.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white py-20 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <Tag className="mb-4 size-12 text-slate-300" />
          <p className="text-lg font-bold text-slate-500">
            No gear available right now.
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Check back soon for new listings!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {availableGears.map((gear) => (
            <Card
              key={gear.id}
              className="group overflow-hidden rounded-xl bg-white p-0 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col border-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={gear.image}
                  alt={gear.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white text-slate-400 shadow-md transition hover:text-[#e31824]">
                  <Heart className="size-4" />
                </button>
                <span className="absolute bottom-3 left-3 rounded px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-white/90 text-[#1b2748]">
                  {gear.category?.name ?? "—"}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-extrabold text-[#1b2748] truncate">
                  {gear.name}
                </h3>
                <p className="text-sm text-slate-500">{gear.brand}</p>

                {gear.address && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="size-3.5 shrink-0" />
                    <span className="truncate">{gear.address}</span>
                  </div>
                )}

                <div className="mt-1 flex items-center gap-1.5 text-xs">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[#1b2748]">—</span>
                  <span
                    className={`ml-1 rounded px-1.5 py-0.5 text-[10px] font-extrabold uppercase ${conditionBadge[gear.condition] ?? "bg-slate-100 text-slate-600"}`}
                  >
                    {gear.condition}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="font-extrabold text-[#e31824]">
                    ${gear.pricePerDay}{" "}
                    <span className="text-xs font-normal text-slate-500">
                      / day
                    </span>
                  </p>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
                    Available
                  </span>
                </div>

                <Link
                  href={`/dashboard/customer/rent/${gear.id}`}
                  className="mt-4 flex h-10 w-full items-center justify-center rounded-md bg-[#e31824] text-sm font-bold text-white transition hover:bg-[#c41520]"
                >
                  Rent Now
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="size-9 rounded-lg border-slate-200"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="default"
          className="size-9 rounded-lg bg-[#e31824] p-0 font-bold hover:bg-[#c41520]"
        >
          1
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-9 rounded-lg border-slate-200"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default CustomerRentGearPage;
