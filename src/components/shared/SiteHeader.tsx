import Link from "next/link";
import Logo from "./Logo";
import { MobileDrawer } from "./header/MobileDrawer";
import { GuestActions, UserMenu } from "./header/UserMenu";
import { guestLinks } from "./header/nav-links";
import type { HeaderUser } from "./header/types";

interface SiteHeaderProps {
  user?: HeaderUser;
}

const SiteHeader = ({ user }: SiteHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-[0_1px_8px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="container flex h-[70px] items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="GearUp home">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {guestLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-sm font-semibold transition-colors hover:text-[#e31824] ${
                label === "Browse Gear" ? "text-[#e31824]" : "text-[#1a1a2e]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden items-center sm:flex">
          {user ? <UserMenu user={user} /> : <GuestActions />}
        </div>

        {/* Mobile Hamburger / Drawer */}
        <div className="sm:hidden">
          <MobileDrawer user={user} />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
