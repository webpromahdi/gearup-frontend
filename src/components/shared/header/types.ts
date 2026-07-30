import type React from "react";

export type UserRole = "customer" | "provider";

export interface HeaderUser {
  name: string;
  email: string;
  image?: string;
  role: UserRole;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface AccountLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}
