"use server";
import { cookies } from "next/headers";

const getCustomerToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) throw new Error("Unauthorized");
  return accessToken;
};

export const createReviewAction = async (payload: {
  rentalOrderId: string;
  rating: number;
  comment?: string;
}) => {
  const accessToken = await getCustomerToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Failed to submit review");
  }

  return result.data;
};

export const getCustomerReviewsAction = async () => {
  const accessToken = await getCustomerToken();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ["customer-reviews"] },
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch reviews");
  }

  return result.data.reviews;
};
