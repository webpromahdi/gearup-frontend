import {
  Share2,
  Camera,
  MapPin,
  Phone,
  MessageCircle,
  Video,
  Mail,
} from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer id="contact" className="bg-[#1b2748] px-5 pt-14 text-white">
      <div className="mx-auto grid w-full gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8 xl:px-12">
        <div>
          <Logo inverse />
          <p className="mt-5 max-w-xs text-sm leading-6 text-slate-300">
            Rent sports and outdoor gear instantly. Adventure more, own less.
          </p>
          <div className="mt-6 flex gap-3">
            {[Share2, Camera, MessageCircle, Video].map((Icon, index) => (
              <Link
                key={index}
                href="#contact"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-red-300 hover:bg-[#e31824] hover:text-white"
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.12em]">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li>
              <Link href="/gear">Browse Gear</Link>
            </li>
            <li>
              <Link href="/#how-it-works">How It Works</Link>
            </li>
            <li>
              <Link href="/#about-us">About Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.12em]">
            Categories
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li>Camping & Hiking</li>
            <li>Cycling</li>
            <li>Water Sports</li>
            <li>Winter Sports</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.12em]">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-slate-300">
            <li className="flex gap-3">
              <Mail className="size-4 shrink-0 text-red-300" />
              support@gearup.com
            </li>
            <li className="flex gap-3">
              <Phone className="size-4 shrink-0 text-red-300" />
              +880 1700-000000
            </li>
            <li className="flex gap-3">
              <MapPin className="size-4 shrink-0 text-red-300" />
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15 py-6">
        <div className="mx-auto flex w-full flex-col gap-3 text-center text-xs text-slate-400 sm:flex-row sm:justify-between lg:px-8 xl:px-12">
          <p>© 2025 GearUp. All rights reserved.</p>
          <p>Privacy Policy &nbsp; · &nbsp; Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
