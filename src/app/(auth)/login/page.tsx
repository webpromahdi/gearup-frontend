import type React from "react";
import { AtSign, LockKeyhole } from "lucide-react";
import Logo from "@/components/shared/Logo";
import AuthShell, { Field, GoogleButton } from "../_components/AuthShell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  return <AuthShell><div className="w-full max-w-md"><div className="text-center"><div className="mx-auto w-fit lg:hidden"><Logo /></div><h1 className="mt-6 text-3xl font-extrabold tracking-[-0.03em] text-[#1b2748]">Welcome Back</h1><p className="mt-2 text-sm text-slate-500">Sign in to your GearUp account</p></div><form className="mt-8 space-y-5"><Field label="Email Address" icon={AtSign} type="email" placeholder="your@email.com" /><Field label="Password" icon={LockKeyhole} type="password" placeholder="Enter your password" suffix /><div className="flex items-center justify-between gap-4"><label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600"><Checkbox className="size-4 rounded border-slate-300 accent-[#e31824]" />Remember me</label><a href="#forgot" className="text-sm font-bold text-[#e31824] hover:underline">Forgot Password?</a></div><Button className="flex h-12 w-full items-center justify-center rounded-lg bg-[#e31824] text-sm font-extrabold text-white transition hover:bg-[#c41520]">Sign In</Button></form><div className="my-7 flex items-center gap-4"><div className="h-px flex-1 bg-slate-200" /><span className="text-xs font-medium text-slate-400">Or continue with</span><div className="h-px flex-1 bg-slate-200" /></div><GoogleButton /><p className="mt-8 text-center text-sm text-slate-500">Don&apos;t have an account? <a href="/register" className="font-bold text-[#e31824] hover:underline">Sign Up →</a></p></div></AuthShell>;
}
