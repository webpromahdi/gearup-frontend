"use server";
import { cookies } from "next/headers";

export type ProviderOrder = {
  id: string;
  status: "PLACED" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELLED";
  totalAmount: string;
  startDate: string;
  endDate: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  gearItem: {
    id: string;
    name: string;
    brand: string;
    image: string;
    pricePerDay: string;
    category?: { id: string; name: string };
  };
  payments?: {
    id: string;
    amount: string;
    status: string;
    paidAt?: string;
  }[];
};

const getProviderToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) throw new Error("Unauthorized");
  return accessToken;
};

export const getProviderOrdersAction = async (): Promise<ProviderOrder[]> => {
  const accessToken = await getProviderToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/orders`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Failed to fetch orders");
  return result.data?.orders ?? result.data?.rentalOrders ?? [];
};

export const updateProviderOrderStatusAction = async (
  id: string,
  status: "CONFIRMED" | "PICKED_UP" | "RETURNED",
): Promise<ProviderOrder> => {
  const accessToken = await getProviderToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/provider/orders/${id}`,
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
  if (!res.ok) throw new Error(result.message || "Failed to update order status");
  return result.data?.order ?? result.data;
};
