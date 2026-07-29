import type React from "react";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  return <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-[0_1px_8px_rgba(0,0,0,0.08)] backdrop-blur"><div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 lg:px-8"><a href="/" aria-label="GearUp home"><Logo /></a><nav className="hidden items-center gap-7 lg:flex"><a href="/" className="text-sm font-semibold text-[#1a1a2e] hover:text-[#e31824]">Home</a><a href="/gear" className="text-sm font-semibold text-[#e31824]">Browse Gear</a><a href="/#categories" className="text-sm font-semibold text-[#1a1a2e] hover:text-[#e31824]">Categories</a><a href="/#about-us" className="text-sm font-semibold text-[#1a1a2e] hover:text-[#e31824]">About Us</a><a href="/#contact" className="text-sm font-semibold text-[#1a1a2e] hover:text-[#e31824]">Contact</a></nav><div className="hidden items-center sm:flex"><a href="/login" className="rounded-lg bg-[#e31824] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#c41520]">Log In</a></div><a href="/gear" className="sm:hidden"><Menu className="size-6 text-[#1b2748]" /></a></div></header>;
}
