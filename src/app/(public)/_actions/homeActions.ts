"use server";

export type PublicCategory = {
  id: string;
  name: string;
  description?: string | null;
};

export type PublicGear = {
  id: string;
  name: string;
  brand: string;
  description: string;
  pricePerDay: string;
  stock: number;
  image: string;
  condition: "NEW" | "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  availability: boolean;
  categoryId: string;
  providerId: string;
  category: { id: string; name: string };
  provider?: { id: string; name: string; email: string };
  reviews: { id: string; rating: number; comment?: string | null }[];
};

const API = () => {
  const url = process.env.BACKEND_API_URL;
  if (!url) throw new Error("BACKEND_API_URL is not configured");
  return url;
};

//  Fetch Categories
export const getPublicCategoriesAction = async (): Promise<
  PublicCategory[]
> => {
  try {
    const res = await fetch(`${API()}/api/categories`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);
    return result.data?.categories ?? [];
  } catch {
    return [];
  }
};

//Fetch Top Gear
export const getTopGearsAction = async (limit = 8): Promise<PublicGear[]> => {
  try {
    const res = await fetch(`${API()}/api/gear`, {
      next: { revalidate: 600 },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);

    const items: PublicGear[] = result.data?.gearItems ?? [];
    if (items.length === 0) return [];

    // Sort by avg rating
    const sorted = [...items].sort((a, b) => {
      const avgA =
        a.reviews.length > 0
          ? a.reviews.reduce((s, r) => s + r.rating, 0) / a.reviews.length
          : 0;
      const avgB =
        b.reviews.length > 0
          ? b.reviews.reduce((s, r) => s + r.rating, 0) / b.reviews.length
          : 0;
      return avgB - avgA;
    });

    return sorted.slice(0, limit);
  } catch {
    return [];
  }
};

export type PublicReview = {
  id: string;
  rating: number;
  comment: string | null;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  gearItem: {
    id: string;
    name: string;
    image: string;
  };
  createdAt: string;
};

export const getPublicReviewsAction = async (
  limit = 6,
): Promise<PublicReview[]> => {
  try {
    const res = await fetch(`${API()}/api/reviews/public`, {
      next: { revalidate: 600 },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);

    const reviews: PublicReview[] = result.data?.reviews ?? [];

    return reviews.filter((r) => r.rating === 5 && r.comment).slice(0, limit);
  } catch {
    return [];
  }
};

export type PlatformStats = {
  gearCount: number;
  customerCount: number;
  providerCount: number;
  categoryCount: number;
};

export const getPlatformStatsAction = async (): Promise<PlatformStats> => {
  try {
    const res = await fetch(`${API()}/api/gear/meta/stats`, {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);
    return result.data || { gearCount: 5000, customerCount: 1200, providerCount: 300, categoryCount: 50 };
  } catch {
    return { gearCount: 5000, customerCount: 1200, providerCount: 300, categoryCount: 50 };
  }
};
