"use server";
import { cookies } from "next/headers";

const getAdminToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) throw new Error("Unauthorized");
  return accessToken;
};

export const getCategoriesAction = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = await res.json();
  return result;
};

export const createCategoryAction = async (payload: {
  name: string;
  description?: string;
}) => {
  const accessToken = await getAdminToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to create category");
  return result;
};

export const updateCategoryAction = async (
  id: string,
  payload: { name: string; description?: string },
) => {
  const accessToken = await getAdminToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to update category");
  return result;
};

export const deleteCategoryAction = async (id: string) => {
  const accessToken = await getAdminToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to delete category");
  return result;
};
