import type React from "react";
import { ArrowRight, Check, AtSign, LockKeyhole, User } from "lucide-react";
import Logo from "@/components/shared/Logo";
import AuthShell, { Field, GoogleButton } from "../_components/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {
  return (
    <AuthShell register>
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto w-fit lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.03em] text-[#1b2748]">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Start renting or listing gear in minutes
          </p>
        </div>
        <form className="mt-8 space-y-5">
          <Field label="Full Name" icon={User} placeholder="Your full name" />
          <Field
            label="Email Address"
            icon={AtSign}
            type="email"
            placeholder="your@email.com"
          />
          <div>
            <Field
              label="Password"
              icon={LockKeyhole}
              type="password"
              placeholder="Create a password"
              suffix
            />
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-full rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-bold text-emerald-600">Strong</span>
            </div>
          </div>
          <Field
            label="Confirm Password"
            icon={LockKeyhole}
            type="password"
            placeholder="Confirm your password"
            suffix
          />
          <fieldset>
            <legend className="text-sm font-bold text-[#1b2748]">
              I want to:
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="relative cursor-pointer rounded-xl border-2 border-[#e31824] bg-red-50 p-4">
                <Input
                  type="radio"
                  name="role"
                  defaultChecked
                  className="sr-only"
                />
                <Check className="absolute right-3 top-3 size-4 rounded-full bg-[#e31824] p-0.5 text-white" />
                <span className="text-xl">🏃</span>
                <span className="mt-2 block text-sm font-extrabold text-[#1b2748]">
                  Customer
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-600">
                  Rent gear for my adventures
                </span>
                <span className="mt-3 block text-[11px] font-semibold leading-5 text-slate-500">
                  • Browse gear
                  <br />• Rent by day
                  <br />• Track orders
                </span>
              </label>
              <label className="cursor-pointer rounded-xl border-2 border-slate-200 bg-white p-4">
                <Input type="radio" name="role" className="sr-only" />
                <span className="text-xl">🏪</span>
                <span className="mt-2 block text-sm font-extrabold text-[#1b2748]">
                  Provider
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-600">
                  List my gear and earn
                </span>
                <span className="mt-3 block text-[11px] font-semibold leading-5 text-slate-500">
                  • List equipment
                  <br />• Manage orders
                  <br />• Get paid
                </span>
              </label>
            </div>
          </fieldset>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-5 text-slate-600">
            <Checkbox className="mt-0.5 size-4 rounded border-slate-300 accent-[#e31824]" />
            I agree to the{" "}
            <a
              href="#terms"
              className="font-semibold text-[#e31824] hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#privacy"
              className="font-semibold text-[#e31824] hover:underline"
            >
              Privacy Policy
            </a>
          </label>
          <Button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#e31824] text-sm font-extrabold text-white transition hover:bg-[#c41520]">
            Create Account <ArrowRight className="size-4" />
          </Button>
        </form>
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">Or</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <GoogleButton register />
        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a href="/login" className="font-bold text-[#e31824] hover:underline">
            Sign In →
          </a>
        </p>
      </div>
    </AuthShell>
  );
}
