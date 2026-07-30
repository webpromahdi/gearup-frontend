const Availability = ({ active }: { active: boolean }) => {
  return (
    <span
      className={`relative inline-flex h-6 w-11 items-center rounded-full ${active ? "bg-emerald-500" : "bg-slate-300"}`}
    >
      <i
        className={`size-4 rounded-full bg-white transition ${active ? "ml-6" : "ml-1"}`}
      />
    </span>
  );
};

export default Availability;
