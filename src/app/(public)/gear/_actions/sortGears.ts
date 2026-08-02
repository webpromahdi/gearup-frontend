import { CustomerGear } from "@/app/(customer)/_actions/gearActions";

export const sortGears = (
  gears: CustomerGear[],
  sortOption: string
): CustomerGear[] => {
  const sorted = [...gears];

  switch (sortOption) {
    case "price-asc":
      return sorted.sort(
        (a, b) => parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay)
      );
    case "price-desc":
      return sorted.sort(
        (a, b) => parseFloat(b.pricePerDay) - parseFloat(a.pricePerDay)
      );
    case "popularity":
      // Since reviews are mocked in formatting, we'll sort by number of actual reviews if they exist, 
      // or fallback to a predefined logic.
      return sorted.sort(
        (a, b) => (b.reviews?.length || 0) - (a.reviews?.length || 0)
      );
    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
};
