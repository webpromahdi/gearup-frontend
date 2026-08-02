import { cookies } from "next/headers";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { HeaderUser } from "@/components/shared/header/types";

export async function getHeaderUser(): Promise<HeaderUser | undefined> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) return undefined;

    const decoded = jwt.decode(token) as JwtPayload | null;
    if (!decoded) return undefined;

    const role = decoded.role as string;
    if (role !== "CUSTOMER" && role !== "PROVIDER" && role !== "ADMIN")
      return undefined;

    return {
      name: decoded.name ?? decoded.email ?? "User",
      email: decoded.email ?? "",
      image: decoded.image ?? undefined,
      role:
        role === "CUSTOMER"
          ? "customer"
          : role === "PROVIDER"
            ? "provider"
            : "admin",
    };
  } catch {
    return undefined;
  }
}
