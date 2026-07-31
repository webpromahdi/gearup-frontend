"use server";
import { cookies } from "next/headers";

export type CreateRentalOrderPayload = {
  gearItemId: string;
  startDate: string;
  endDate: string;
  quantity: number;
};

export type RentalOrder = {
  id: string;
  startDate: string;
  endDate: string;
  quantity: number;
  totalAmount: string;
  status: "PLACED" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELLED";
  customerId: string;
  gearItemId: string;
  createdAt: string;
  updatedAt: string;
  gearItem?: {
    id: string;
    name: string;
    brand: string;
    image: string;
    pricePerDay: string;
    address: string;
    description?: string;
    stock: number;
    condition: string;
    category?: { id: string; name: string };
  };
  payments?: {
    id: string;
    transactionId: string;
    amount: string;
    paymentProvider: string;
    status: string;
    paidAt?: string;
    createdAt: string;
  }[];
};

const getCustomerToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) throw new Error("Unauthorized");
  return accessToken;
};

export const createRentalOrderAction = async (
  payload: CreateRentalOrderPayload,
): Promise<RentalOrder> => {
  const accessToken = await getCustomerToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Failed to create rental order");
  }

  return result.data.rentalOrder;
};

export const getCustomerRentalOrdersAction = async (): Promise<RentalOrder[]> => {
  const accessToken = await getCustomerToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch rental orders");
  }

  return result.data?.rentalOrders ?? [];
};

export const getCustomerRentalOrderByIdAction = async (
  id: string,
): Promise<RentalOrder> => {
  const accessToken = await getCustomerToken();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch rental order");
  }

  return result.data?.rentalOrder;
};
