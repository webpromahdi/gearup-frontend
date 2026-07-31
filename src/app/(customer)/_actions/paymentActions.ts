"use server";
import { cookies } from "next/headers";

const getCustomerToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) throw new Error("Unauthorized");
  return accessToken;
};

export const createCheckoutSessionAction = async (
  rentalOrderId: string,
): Promise<{ url: string }> => {
  const accessToken = await getCustomerToken();

  const frontendUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        rentalOrderId,
        successUrl: `${frontendUrl}/payment/success`,
        cancelUrl: `${frontendUrl}/payment/cancel`,
      }),
    },
  );

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Failed to create checkout session");
  }

  return result.data;
};
