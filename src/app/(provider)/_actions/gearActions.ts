"use server";
import { cookies } from "next/headers";

export type CreateProviderGearPayload = {
  name: string;
  description: string;
  brand: string;
  pricePerDay: number;
  stock: number;
  image: string;
  address?: string;
  condition: "NEW" | "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  availability?: boolean;
  categoryId: string;
};

const getProviderToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) throw new Error("Unauthorized");
  return accessToken;
};

export const createProviderGearAction = async (
  payload: CreateProviderGearPayload,
) => {
  const accessToken = await getProviderToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok)
    throw new Error(result.message || "Failed to create gear listing");
  return result;
};

export const getProviderGearAction = async () => {
  let accessToken: string | undefined;
  try {
    accessToken = await getProviderToken();
  } catch {
    return null;
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/provider/gear`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await res.json();
  if (!res.ok)
    throw new Error(result.message || "Failed to fetch provider gear");
  return result;
};

export const getSingleGearAction = async (id: string) => {
  let accessToken: string | undefined;
  try {
    accessToken = await getProviderToken();
  } catch {
    return null;
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to fetch gear");
  return result;
};

export const deleteProviderGearAction = async (id: string) => {
  const accessToken = await getProviderToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/gear/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to delete gear");
  return result;
};

export const updateProviderGearAction = async (
  id: string,
  payload: Partial<CreateProviderGearPayload>,
) => {
  const accessToken = await getProviderToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/gear/${id}`,
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
  if (!res.ok) throw new Error(result.message || "Failed to update gear");
  return result;
};
