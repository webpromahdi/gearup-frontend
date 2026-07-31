"use server";

export type ProviderCategory = {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type CategoriesApiResponse =
  | ProviderCategory[]
  | {
      data?: ProviderCategory[] | { categories?: ProviderCategory[] };
      message?: string;
    };

export const getProviderCategoriesAction = async (): Promise<
  ProviderCategory[]
> => {
  const apiUrl = process.env.BACKEND_API_URL;

  if (!apiUrl) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  const res = await fetch(`${apiUrl}/api/categories`, {
    cache: "no-store",
  });

  const result = (await res.json()) as CategoriesApiResponse;

  if (!res.ok) {
    throw new Error(
      "message" in result && result.message
        ? result.message
        : "Failed to fetch categories",
    );
  }

  if (Array.isArray(result)) return result;
  if (Array.isArray(result.data)) return result.data;
  if (Array.isArray(result.data?.categories)) return result.data.categories;

  return [];
};
