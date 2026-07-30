import type { ReactNode } from "react";
import SiteHeader from "@/components/shared/SiteHeader";
import SiteFooter from "@/components/shared/SiteFooter";
import { getHeaderUser } from "@/lib/getHeaderUser";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getHeaderUser();

  return (
    <div className="flex min-h-screen flex-col font-[Inter] text-[#1a1a2e]">
      <SiteHeader user={user} />
      <main className="flex-1 bg-slate-50/50">{children}</main>
      <SiteFooter />
    </div>
  );
}
