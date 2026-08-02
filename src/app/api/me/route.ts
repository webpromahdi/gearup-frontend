import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// This API route acts as a secure proxy to fetch the logged-in user's profile from the backend.
// It is needed because client components cannot read the `httpOnly` accessToken cookie directly.
export const GET = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 },
    );
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `accessToken=${accessToken}`,
      },
      next: { revalidate: 0 },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
};
