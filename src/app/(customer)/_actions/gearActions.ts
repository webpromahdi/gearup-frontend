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
