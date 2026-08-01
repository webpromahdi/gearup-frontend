"use server";

export type CustomerGear = {
  id: string;
  name: string;
  description: string;
  brand: string;
  pricePerDay: string;
  stock: number;
  image: string;
  address: string;
  condition: "NEW" | "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  availability: boolean;
  providerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description: string;
  };
  provider?: {
    id: string;
    name: string;
    email: string;
  };
  reviews?: {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: string;
    customer?: {
      id: string;
      name: string;
    };
  }[];
};

type GearApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    gearItems?: CustomerGear[];
  };
};

export const getPublicGearsAction = async (): Promise<CustomerGear[]> => {
  const apiUrl = process.env.BACKEND_API_URL;
  if (!apiUrl) throw new Error("BACKEND_API_URL is not configured");

  const res = await fetch(`${apiUrl}/api/gear`, {
    cache: "no-store",
  });

  const result = (await res.json()) as GearApiResponse;

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch gear items");
  }

  return result.data?.gearItems ?? [];
};

export const getSingleGearAction = async (
  id: string,
): Promise<CustomerGear | null> => {
  const apiUrl = process.env.BACKEND_API_URL;
  if (!apiUrl) throw new Error("BACKEND_API_URL is not configured");

  const res = await fetch(`${apiUrl}/api/gear/${id}`, {
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(result.message || "Failed to fetch gear item");
  }
  return result.data?.gearItem as CustomerGear;
};
