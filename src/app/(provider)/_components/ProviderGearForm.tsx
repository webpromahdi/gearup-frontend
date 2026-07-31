import Availability from "@/components/shared/Availability";
import PageHeading from "@/components/shared/PageHeading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ProviderGearForm = ({ edit = false }: { edit?: boolean }) => {
  const bike =
    "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=300&auto=format&fit=crop&q=85";
  const title = edit ? "✏️ Edit Gear — Trek X-Caliber MTB" : "➕ List New Gear";
  return (
    <div className="p-5 sm:p-8">
      <PageHeading
        crumb={edit ? "Dashboard  ›  My Gear  ›  Edit Gear" : undefined}
        title={title}
      />
      <Card className="rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:p-7">
        <p className="mb-7 text-sm text-slate-500">
          Fill in the details to list your gear for rent
        </p>
        <form className="grid gap-5 md:grid-cols-2">
          <label className="block md:col-span-2 text-sm font-bold text-[#1b2748]">
            Gear Name*
            <Input
              defaultValue={edit ? "Trek X-Caliber Mountain Bike" : undefined}
              placeholder="e.g. Trek X-Caliber Mountain Bike"
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#e31824]"
            />
          </label>
          <label className="block md:col-span-2 text-sm font-bold text-[#1b2748]">
            Description*
            <Textarea
              defaultValue={
                edit
                  ? "Top-tier hardtail MTB with Shimano drivetrain, great for trail riding and daily adventure."
                  : undefined
              }
              placeholder="Describe your gear in detail..."
              className="mt-2 min-h-28 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-[#e31824]"
            />
          </label>
          <label className="text-sm font-bold text-[#1b2748]">
            Brand*
            <Input
              defaultValue={edit ? "Trek" : undefined}
              placeholder="Brand name"
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm"
            />
          </label>
          <label className="text-sm font-bold text-[#1b2748]">
            Category*
            <Select
              defaultValue={edit ? "Cycling" : ""}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="">Select category</option>
              {[
                "Camping",
                "Cycling",
                "Water Sports",
                "Winter Sports",
                "Fitness & Gym",
                "Rock Climbing",
                "Team Sports",
                "Photography",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </Select>
          </label>
          <label className="text-sm font-bold text-[#1b2748]">
            Price Per Day* ($)
            <Input
              type="number"
              defaultValue={edit ? 25 : undefined}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm"
            />
          </label>
          <label className="text-sm font-bold text-[#1b2748]">
            Stock*
            <Input
              type="number"
              min="1"
              defaultValue={edit ? 3 : undefined}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm"
            />
          </label>
          <label className="text-sm font-bold text-[#1b2748]">
            Condition*
            <Select
              defaultValue={edit ? "EXCELLENT" : ""}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="">Select condition</option>
              {["NEW", "EXCELLENT", "GOOD", "FAIR", "POOR"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </Select>
          </label>
          <label className="text-sm font-bold text-[#1b2748]">
            Address
            <Input
              defaultValue={edit ? "Dhanmondi, Dhaka" : undefined}
              placeholder="Pickup address"
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm"
            />
          </label>
          <label className="md:col-span-2 text-sm font-bold text-[#1b2748]">
            Image URL*
            <div className="mt-2 flex gap-4">
              <Input
                defaultValue={edit ? bike : undefined}
                placeholder="https://..."
                className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-sm"
              />
              <img
                src={bike}
                alt="Gear listing preview"
                className="size-16 rounded-lg object-cover"
              />
            </div>
          </label>
          <div className="md:col-span-2 flex items-center justify-between rounded-lg bg-slate-50 p-4">
            <div>
              <p className="text-sm font-bold text-[#1b2748]">Availability</p>
              <p className="mt-1 text-xs text-slate-500">
                Make available for rent immediately
              </p>
            </div>
            <Availability active />
          </div>
          <p className="md:col-span-2 text-xs text-slate-400">
            * Required fields
          </p>
          <div className="md:col-span-2 flex justify-end gap-3">
            <a
              href="/dashboard/provider/gear"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-600"
            >
              Cancel
            </a>
            <Button className="rounded-lg bg-[#e31824] px-5 py-3 text-sm font-bold text-white">
              {edit ? "Update Gear Listing" : "Submit Gear Listing"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProviderGearForm;
