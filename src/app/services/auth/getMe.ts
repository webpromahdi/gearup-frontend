"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["my-profile"],
      },
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch profile data from server",
      };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Internal server error while fetching profile",
    };
  }
};
