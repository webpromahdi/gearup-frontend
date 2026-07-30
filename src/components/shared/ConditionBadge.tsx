const ConditionBadge = ({ condition }: { condition: string }) => {
  const c: Record<string, string> = {
    NEW: "bg-emerald-100 text-emerald-700",
    EXCELLENT: "bg-blue-100 text-blue-700",
    GOOD: "bg-amber-100 text-amber-700",
    FAIR: "bg-slate-100 text-slate-600",
    POOR: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-[0.05em] ${c[condition]}`}
    >
      {condition}
    </span>
  );
};

export default ConditionBadge;
