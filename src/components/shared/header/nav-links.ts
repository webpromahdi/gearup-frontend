import type { UserRole, AccountLink } from "./types";
import {
  DoorOpen,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  UserRound,
  WalletCards,
} from "lucide-react";

export const guestLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/gear" },
  { label: "Categories", href: "/#categories" },
  { label: "About Us", href: "/#about-us" },
  { label: "Contact", href: "/#contact" },
];

export const accountLinks: Record<UserRole, AccountLink[]> = {
  customer: [
    { label: "My Profile", href: "/profile", icon: UserRound },
    { label: "My Rentals", href: "/dashboard/customer/rentals", icon: Package },
    { label: "Settings", href: "/profile#settings", icon: Settings },
  ],
  provider: [
    { label: "My Profile", href: "/profile", icon: UserRound },
    { label: "Dashboard", href: "/dashboard/provider", icon: LayoutDashboard },
    { label: "My Gear", href: "/dashboard/provider/gear", icon: Package },
    {
      label: "Rental Requests",
      href: "/dashboard/provider/orders",
      icon: ShoppingBag,
    },
    {
      label: "Earnings",
      href: "/dashboard/provider/earnings",
      icon: WalletCards,
    },
    { label: "Settings", href: "/profile#settings", icon: Settings },
  ],
  admin: [
    { label: "My Profile", href: "/profile", icon: UserRound },
    { label: "Admin Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: UserRound },
    { label: "Manage Gear", href: "/dashboard/admin/gear", icon: Package },
    { label: "Settings", href: "/profile#settings", icon: Settings },
  ],
};

export const logoutLink = { label: "Log Out", href: "/", icon: DoorOpen };
