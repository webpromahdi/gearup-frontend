import {
  ChevronRight,
  ChevronLeft,
  ListFilter,
  Filter,
} from "lucide-react";
import BrowseCard from "@/components/shared/BrowseCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { getPublicCategoriesAction } from "@/app/(public)/_actions/homeActions";
import { getPublicGearsAction } from "@/app/(customer)/_actions/gearActions";
import { SidebarFilters } from "./_components/GearFilters";
import { ActiveFilters } from "./_components/ActiveFilters";
import { ChevronDown } from "lucide-react";

export default async function GearBrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const categories = await getPublicCategoriesAction();
  let gearItems = await getPublicGearsAction();

  // Parse filters
  const categoryFilters = query.categories
    ? (query.categories as string).split(",")
    : [];
  const maxPrice = query.maxPrice
    ? parseInt(query.maxPrice as string)
    : 1000;
  const conditionFilters = query.conditions
    ? (query.conditions as string).split(",")
    : [];
  const availableOnly = query.availableOnly === "true";

  // Apply filters
  if (categoryFilters.length > 0) {
    gearItems = gearItems.filter((g) => categoryFilters.includes(g.categoryId));
  }
  if (maxPrice < 1000) {
    gearItems = gearItems.filter((g) => parseInt(g.pricePerDay) <= maxPrice);
  }
  if (conditionFilters.length > 0) {
    gearItems = gearItems.filter((g) => conditionFilters.includes(g.condition));
  }
  if (availableOnly) {
    gearItems = gearItems.filter((g) => g.availability);
  }

  // Formatting for BrowseCard compatibility
  const formattedItems = gearItems.map((g) => ({
    id: g.id,
    name: g.name,
    brand: g.brand,
    category: g.category?.name || "Uncategorized",
    price: parseInt(g.pricePerDay),
    rating: 4.5,
    reviews: 12,
    condition: g.condition,
    image: g.image,
  }));

  const activeFiltersCount =
    categoryFilters.length +
    conditionFilters.length +
    (maxPrice < 1000 ? 1 : 0) +
    (availableOnly ? 1 : 0);

  return (
    <>
      <section className="border-b border-slate-200 bg-white py-9">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#e31824]">
            Gear rental marketplace
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.025em] text-[#1b2748] sm:text-4xl">
            Browse All Gear
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Desktop Sidebar */}
          <aside className="hidden h-fit rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] lg:sticky lg:top-24 lg:block">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#1b2748]">
                <ListFilter className="size-5 text-[#e31824]" />
                Filters
              </h2>
            </div>
            <SidebarFilters categories={categories} />
          </aside>

          <section>
            {/* Mobile Top Bar (Row 1: Filters & Sort, Row 2: Results & Grid/List, Row 3: Filter Chips) */}
            <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:hidden">
              <div className="flex items-center justify-between gap-3">
                <Sheet>
                  <SheetTrigger className="flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-bold text-[#1b2748] transition-colors hover:bg-slate-50">
                    <ListFilter className="size-3.5 text-[#e31824]" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e31824] text-[10px] text-white">
                        {activeFiltersCount}
                      </span>
                    )}
                  </SheetTrigger>
                  <SheetContent
                    side="bottom"
                    className="flex !h-[85vh] flex-col overflow-hidden rounded-t-2xl px-0 pb-0"
                  >
                    <SheetHeader className="flex-row items-center justify-between border-b border-slate-100 px-5 pb-4 pt-4 shrink-0">
                      <SheetTitle className="mt-0 flex items-center gap-2 text-lg font-extrabold text-[#1b2748]">
                        <ListFilter className="size-5 text-[#e31824]" />
                        Filters
                      </SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto px-5 pb-6 pt-4">
                      <SidebarFilters categories={categories} hideApplyButton />
                    </div>
                    <div className="sticky bottom-0 z-10 w-full shrink-0 border-t border-slate-100 bg-white p-5 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
                      <SheetClose asChild>
                        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#e31824] text-sm font-bold text-white shadow-md transition hover:bg-[#c41520]">
                          <Filter className="size-4" />
                          View Results
                        </button>
                      </SheetClose>
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="relative flex-1 min-w-0">
                  <select
                    defaultValue="newest"
                    className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-2.5 pr-8 text-xs font-semibold text-slate-600 outline-none focus:border-[#e31824]"
                  >
                    <option value="newest">Sort by: Newest First</option>
                    <option value="popularity">Sort by: Popularity</option>
                    <option value="price-asc">Sort by: Price (Low to High)</option>
                    <option value="price-desc">Sort by: Price (High to Low)</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-600">
                  Showing <span className="font-bold text-[#e31824]">{formattedItems.length}</span>{" "}
                  results for{" "}
                  <span className="font-bold text-[#1b2748]">“All Gear”</span>
                </p>
              </div>

              {activeFiltersCount > 0 && (
                <div className="scrollbar-none flex items-center gap-2 overflow-x-auto border-t border-slate-100 pt-4">
                  <ActiveFilters categories={categories} />
                </div>
              )}
            </div>

            {/* Tablet Top Bar */}
            <div className="mb-7 hidden flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] md:flex xl:hidden">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">
                  Showing <span className="font-bold text-[#e31824]">{formattedItems.length}</span>{" "}
                  results for{" "}
                  <span className="font-bold text-[#1b2748]">“All Gear”</span>
                </p>
                <div className="relative w-48">
                  <select
                    defaultValue="newest"
                    className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-semibold text-slate-600 outline-none focus:border-[#e31824]"
                  >
                    <option value="newest">Sort by: Newest First</option>
                    <option value="popularity">Sort by: Popularity</option>
                    <option value="price-asc">Sort by: Price (Low to High)</option>
                    <option value="price-desc">Sort by: Price (High to Low)</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <div className="scrollbar-none flex items-center gap-2 overflow-x-auto border-t border-slate-100 pt-4">
                  <ActiveFilters categories={categories} />
                </div>
              )}
            </div>

            {/* Desktop Top Bar */}
            <div className="mb-7 hidden flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] xl:flex">
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <p className="shrink-0 whitespace-nowrap text-sm font-medium text-slate-600">
                  Showing <span className="font-bold text-[#e31824]">{formattedItems.length}</span>{" "}
                  results for{" "}
                  <span className="font-bold text-[#1b2748]">“All Gear”</span>
                </p>
                <div className="relative w-48">
                  <select
                    defaultValue="newest"
                    className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-semibold text-slate-600 outline-none focus:border-[#e31824]"
                  >
                    <option value="newest">Sort by: Newest First</option>
                    <option value="popularity">Sort by: Popularity</option>
                    <option value="price-asc">Sort by: Price (Low to High)</option>
                    <option value="price-desc">Sort by: Price (High to Low)</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Bottom Row */}
              {activeFiltersCount > 0 && (
                <div className="flex items-center border-t border-slate-100 pt-4">
                  <ActiveFilters categories={categories} />
                </div>
              )}
            </div>

            {/* Content Grid */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {formattedItems.map((item) => (
                <BrowseCard key={item.id} item={item as any} />
              ))}
              {formattedItems.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-500 font-medium">No gear found matching your criteria.</p>
                </div>
              )}
            </div>

            {formattedItems.length > 0 && (
              <nav className="mt-10 flex flex-wrap items-center justify-center gap-1 text-sm font-bold">
                <a
                  href="#prev"
                  className="flex h-9 items-center gap-1 rounded-lg px-3 text-slate-500 hover:bg-white"
                >
                  <ChevronLeft className="size-4" />
                  Prev
                </a>
                {[1, 2, 3, 4, 5].map((page) => (
                  <a
                    key={page}
                    href={`#page-${page}`}
                    className={`flex size-9 items-center justify-center rounded-lg ${
                      page === 1
                        ? "bg-[#e31824] text-white"
                        : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    {page}
                  </a>
                ))}
                <a
                  href="#next"
                  className="flex h-9 items-center gap-1 rounded-lg px-3 text-slate-500 hover:bg-white"
                >
                  Next
                  <ChevronRight className="size-4" />
                </a>
              </nav>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
