"use server";
import { cookies } from "next/headers";

const getAdminToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) throw new Error("Unauthorized");
  return accessToken;
};

export const getAdminUsersAction = async () => {
  const accessToken = await getAdminToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to fetch users");
  return result.data.users;
};

export const updateAdminUserStatusAction = async (
  id: string,
  status: "ACTIVE" | "SUSPENDED",
) => {
  const accessToken = await getAdminToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
    },
  );

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to update user status");
  return result.data;
};

export const getAdminGearAction = async () => {
  const accessToken = await getAdminToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/gear`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to fetch gear");
  return result.data.gearItems;
};

export const getAdminRentalsAction = async () => {
  const accessToken = await getAdminToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to fetch rentals");
  return result.data.rentalOrders;
};
