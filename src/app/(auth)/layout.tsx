import type { ReactNode } from "react";

import SiteHeader from "@/components/shared/SiteHeader";
import SiteFooter from "@/components/shared/SiteFooter";
import { AuthPanel } from "./_components/AuthPanel";
import { getHeaderUser } from "@/lib/getHeaderUser";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getHeaderUser();

  return (
    <div className="min-h-screen bg-white font-[Inter] text-[#1a1a2e]">
      <SiteHeader user={user} />

      <main className="grid lg:grid-cols-2">
        <AuthPanel />

        <section className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-white px-5 py-14 sm:px-8">
          {children}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
