import PageHeading from "@/components/shared/PageHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const CustomerPaymentPage = () => {
  return (
    <div className="p-5 sm:p-8">
      <PageHeading
          crumb="Dashboard  ›  My Rentals  ›  Pay for #ORD-2025-0089"
          title="Complete Payment"
        />
        <div className="grid gap-6 xl:grid-cols-[11fr_9fr]">
          <Card className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <h2 className="text-xl font-extrabold text-[#1b2748]">
              Order Summary
            </h2>
            <div className="mt-6 flex gap-4">
              <img
                src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=240&auto=format&fit=crop&q=85"
                alt="Trek mountain bike"
                className="size-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-extrabold text-[#1b2748]">
                  Trek X-Caliber Mountain Bike
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Adventure Gear Co.
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  Jul 15 – Jul 18, 2025 · 3 days
                </p>
                <p className="mt-1 text-sm text-slate-600">Quantity: 1 unit</p>
              </div>
            </div>
            <div className="my-6 border-t border-slate-200" />
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Gear rental (3 days × $25)</span>
                <span>$75.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Service fee (5%)</span>
                <span>$3.75</span>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between text-lg font-extrabold text-[#1b2748]">
                <span>Total</span>
                <span className="text-[#e31824]">$78.75</span>
              </div>
            </div>
            <span className="mt-7 inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
              Powered by Stripe
            </span>
          </Card>
          <Card className="rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <h2 className="text-xl font-extrabold text-[#1b2748]">
              💳 Complete Payment
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter your card details below
            </p>
            <div className="mt-6 space-y-4">
              <label className="block text-sm font-bold text-[#1b2748]">
                Card Number
                <div className="relative mt-2">
                  <Input
                    defaultValue="•••• •••• •••• 4242"
                    className="h-12 w-full rounded-lg border border-slate-200 px-3 pr-14 text-sm font-medium outline-none focus:border-[#e31824]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-blue-700 px-1.5 py-0.5 text-[10px] font-extrabold italic text-white">
                    VISA
                  </span>
                </div>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm font-bold text-[#1b2748]">
                  Expiry
                  <Input
                    placeholder="MM / YY"
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#e31824]"
                  />
                </label>
                <label className="text-sm font-bold text-[#1b2748]">
                  CVV
                  <Input
                    placeholder="•••"
                    className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#e31824]"
                  />
                </label>
              </div>
              <label className="block text-sm font-bold text-[#1b2748]">
                Cardholder Name
                <Input
                  defaultValue="John Doe"
                  className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#e31824]"
                />
              </label>
            </div>
            <Button className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#e31824] text-sm font-extrabold text-white hover:bg-[#c41520]">
              🔒 Pay $78.75 Securely
            </Button>
            <p className="mt-5 text-center text-xs font-bold text-slate-500">
              <span className="text-[#635bff]">stripe</span> · 256-bit SSL
              Encryption
            </p>
            <div className="mt-5 flex justify-center gap-2 text-xs font-extrabold text-slate-400">
              <span>VISA</span>
              <span>MASTERCARD</span>
              <span>AMEX</span>
              <span>DISCOVER</span>
            </div>
            <p className="mt-6 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">
              Full refund if cancelled 24 hours before rental start.
            </p>
          </Card>
        </div>
    </div>
  );
};

export default CustomerPaymentPage;
