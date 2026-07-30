import { AtSign, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Field({
  label,
  name,
  icon: Icon,
  placeholder,
  type = "text",
  suffix,
}: {
  label: string;
  name: string;
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
          name={name}
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
