import type React from "react";
import { CheckCircle2, AtSign, Eye } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SiteHeader from "@/components/shared/SiteHeader";
import SiteFooter from "@/components/shared/SiteFooter";

export function AuthPanel({ register = false }: { register?: boolean }) {
  const title = register
    ? "Join GearUp Today"
    : "Your Next Adventure Starts Here";
  const subtitle = register
    ? "List your gear or rent what you need — it's free to join."
    : "Join 1,200+ adventurers renting premium outdoor gear.";
  return (
    <aside className="relative hidden overflow-hidden bg-[#1b2748] lg:flex lg:min-h-[780px] lg:items-center lg:justify-center">
      <img
        src="https://i.ibb.co/gFLcqLT5/auth.webp"
        alt="Hiker walking through a mountain landscape"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#1b2748]/85" />
      <div className="relative z-10 max-w-md px-10 text-center text-white">
        <div className="mx-auto w-fit">
          <Logo inverse />
        </div>
        <h2 className="mt-10 text-4xl font-extrabold leading-tight tracking-[-0.03em]">
          {title}
        </h2>
        <p className="mt-5 text-lg leading-7 text-slate-200">{subtitle}</p>
        {register ? (
          <div className="mt-11 grid grid-cols-3 gap-6 border-y border-white/20 py-6">
            {[
              ["300+", "Providers"],
              ["5,000+", "Gear Items"],
              ["50+", "Categories"],
            ].map(([number, label]) => (
              <div key={label}>
                <p className="text-2xl font-extrabold">{number}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-300">
                  {label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <ul className="mx-auto mt-10 max-w-xs space-y-4 text-left text-sm font-semibold text-slate-100">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0 text-white" />
              Verified Providers
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0 text-white" />
              Flexible Dates
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="size-5 shrink-0 text-white" />
              Secure Payments
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
}

export function Field({
  label,
  icon: Icon,
  placeholder,
  type = "text",
  suffix,
}: {
  label: string;
  icon: typeof AtSign;
  placeholder: string;
  type?: string;
  suffix?: boolean;
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-[#1b2748]">
        {label}
      </label>
      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#e31824] focus:ring-2 focus:ring-red-100"
        />
        {suffix && (
          <Eye className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        )}
      </div>
    </div>
  );
}

export function GoogleButton({ register = false }: { register?: boolean }) {
  return (
    <Button
      type="button"
      className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white text-sm font-bold text-[#1b2748] transition hover:bg-slate-50"
    >
      <span className="text-lg font-extrabold">
        <span className="text-[#4285F4]">G</span>
      </span>
      {register ? "Sign up with Google" : "Continue with Google"}
    </Button>
  );
}

export default function AuthShell({
  children,
  register = false,
}: {
  children: React.ReactNode;
  register?: boolean;
}) {
  return (
    <div className="min-h-screen bg-white font-[Inter] text-[#1a1a2e]">
      <SiteHeader />
      <main className="grid lg:grid-cols-2">
        <AuthPanel register={register} />
        <section className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-white px-5 py-14 sm:px-8">
          {children}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
