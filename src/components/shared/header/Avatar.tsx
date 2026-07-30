"use client";

import { CircleUserRound } from "lucide-react";
import type { HeaderUser } from "./types";

interface AvatarProps {
  user: HeaderUser;
  size?: "sm" | "md";
}

export const Avatar = ({ user, size = "md" }: AvatarProps) => {
  const dimensions = size === "sm" ? "size-9" : "size-11";

  if (user.image) {
    return (
      <img
        src={user.image}
        alt={`${user.name} profile`}
        className={`${dimensions} rounded-full object-cover ring-2 ring-slate-100`}
      />
    );
  }

  return (
    <span
      aria-label={`${user.name} avatar`}
      className={`flex ${dimensions} items-center justify-center rounded-full bg-[#1b2748] text-white ring-2 ring-slate-100`}
    >
      <CircleUserRound className="size-5" />
    </span>
  );
}
