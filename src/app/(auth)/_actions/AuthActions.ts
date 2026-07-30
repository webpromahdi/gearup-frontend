"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

//Login
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

//Register
const RegisterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
    role: z.enum(["CUSTOMER", "PROVIDER"]),
    acceptTerms: z.any().refine((val) => val === "on", {
      message: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
} | null;

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    role: formData.get("role"),
    acceptTerms: formData.get("acceptTerms"),
  };

  const parsed = RegisterSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      statusCode: 400,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { confirmPassword, acceptTerms, ...payload } = parsed.data;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    if (result.data?.accessToken) {
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

      const decoded = jwt.decode(result.data.accessToken) as JwtPayload | null;
      if (decoded?.role === "CUSTOMER") redirect("/dashboard/customer");
      else if (decoded?.role === "PROVIDER") redirect("/dashboard/provider");
      else if (decoded?.role === "ADMIN") redirect("/dashboard/admin");
      else redirect("/login");
    } else {
      redirect("/login");
    }
  }

  return result;
};
