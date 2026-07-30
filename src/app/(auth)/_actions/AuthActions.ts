"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

// Zod server side validation
const LoginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
} | null;

export const loginAction = async (
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> => {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const parsed = LoginSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      statusCode: 400,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    const decoded = jwt.decode(result.data.accessToken) as JwtPayload;
    if (decoded.role === "CUSTOMER") redirect("/dashboard/customer");
    else if (decoded.role === "PROVIDER") redirect("/dashboard/provider");
    else if (decoded.role === "ADMIN") redirect("/dashboard/admin");
  }

  return result;
};
