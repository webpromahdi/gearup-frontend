import type React from "react";
// Use the newly added logo from public folder
const brandLogo = "/gearup-logo.png";

export default function Logo({ inverse = false }: { inverse?: boolean }) {
  return <img src={brandLogo} alt="GearUp" className={`h-auto w-[132px] object-contain ${inverse ? "brightness-0 invert" : ""}`} />;
}
