"use server";

export type CustomerCategory = {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type CategoriesApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    categories?: CustomerCategory[];
  };
};

export const getPublicCategoriesAction = async (): Promise<CustomerCategory[]> => {
  const apiUrl = process.env.BACKEND_API_URL;
  if (!apiUrl) throw new Error("BACKEND_API_URL is not configured");

  const res = await fetch(`${apiUrl}/api/categories`, {
    cache: "no-store",
  });

  const result = (await res.json()) as CategoriesApiResponse;

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch categories");
  }

  return result.data?.categories ?? [];
};
