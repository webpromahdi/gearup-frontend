const brandLogo = "/gearup-logo.png";

const Logo = ({ inverse = false }: { inverse?: boolean }) => {
  return (
    <img
      src={brandLogo}
      alt="GearUp"
      className={`h-auto w-[132px] object-contain ${inverse ? "brightness-0 invert" : ""}`}
    />
  );
};

export default Logo;
