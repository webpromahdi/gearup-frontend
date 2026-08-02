import { CustomerGear } from "@/app/(customer)/_actions/gearActions";

export type FilterOptions = {
  categories: string[];
  maxPrice: number;
  conditions: string[];
  availableOnly: boolean;
};

export const filterGears = (
  gears: CustomerGear[],
  options: FilterOptions
): CustomerGear[] => {
  let filtered = [...gears];

  if (options.categories.length > 0) {
    filtered = filtered.filter((g) => options.categories.includes(g.categoryId));
  }
  if (options.maxPrice < 1000) {
    filtered = filtered.filter((g) => parseInt(g.pricePerDay) <= options.maxPrice);
  }
  if (options.conditions.length > 0) {
    filtered = filtered.filter((g) => options.conditions.includes(g.condition));
  }
  if (options.availableOnly) {
    filtered = filtered.filter((g) => g.availability);
  }

  return filtered;
};
