import { Star, MessageSquare, ClipboardList } from "lucide-react";
import PageHeading from "@/components/shared/PageHeading";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const CustomerReviewsPage = () => {
  const reviews = [
    [
      "Trek MTB",
      "Jul 15-18",
      5,
      "Perfect bike, no issues at all!",
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=160&auto=format&fit=crop&q=80",
    ],
    [
      "GoPro Kit",
      "Jul 10-12",
      4,
      "Great quality, minor scratch but works fine.",
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=160&auto=format&fit=crop&q=80",
    ],
    [
      "Kayak",
      "Jul 1-3",
      5,
      "Best kayaking experience, highly recommend!",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=160&auto=format&fit=crop&q=80",
    ],
  ];
  return (
    <div className="p-5 sm:p-8">
      <PageHeading title="My Reviews" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            [Star, "4.6", "Avg rating given", "text-amber-500"],
            [MessageSquare, "5", "Total Reviews", "text-blue-600"],
            [ClipboardList, "2", "Pending Reviews", "text-[#e31824]"],
          ].map(([Icon, number, label, color]) => (
            <Card
              key={label as string}
              className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              <Icon className={`size-7 ${color}`} />
              <div>
                <p className="text-2xl font-extrabold text-[#1b2748]">
                  {number}
                </p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            </Card>
          ))}
        </div>
        <section className="mt-9">
          <h2 className="text-xl font-extrabold text-[#1b2748]">
            My Submitted Reviews
          </h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {reviews.map(([name, date, rating, text, image]) => (
              <Card
                key={name as string}
                className="rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              >
                <div className="flex gap-3">
                  <img
                    src={image as string}
                    alt={name as string}
                    className="size-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-extrabold text-[#1b2748]">{name}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Rental: {date}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex gap-0.5">
                  {Array.from({ length: rating as number }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  “{text}”
                </p>
                <p className="mt-5 text-xs text-slate-400">
                  Submitted Jul 10, 2025
                </p>
              </Card>
            ))}
          </div>
        </section>
        <section className="mt-10">
          <div className="rounded-t-xl bg-amber-100 px-5 py-4">
            <h2 className="font-extrabold text-amber-800">Pending Reviews</h2>
          </div>
          <div className="grid gap-4 rounded-b-xl bg-amber-50 p-5 lg:grid-cols-2">
            <Card className="flex flex-col gap-4 rounded-xl bg-white p-4 sm:flex-row sm:items-center">
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=180&auto=format&fit=crop&q=80"
                alt="REI Kingdom Tent"
                className="h-20 w-full rounded-lg object-cover sm:w-24"
              />
              <div className="flex-1">
                <h3 className="font-extrabold text-[#1b2748]">
                  REI Kingdom Tent 4P
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Returned: Jun 28, 2025
                </p>
              </div>
              <a
                href="#review-form"
                className="rounded-lg bg-[#e31824] px-4 py-2.5 text-center text-sm font-bold text-white"
              >
                Leave a Review
              </a>
            </Card>
            <Card className="flex flex-col gap-4 rounded-xl bg-white p-4 sm:flex-row sm:items-center">
              <img
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=180&auto=format&fit=crop&q=80"
                alt="Rossignol Ski Set"
                className="h-20 w-full rounded-lg object-cover sm:w-24"
              />
              <div className="flex-1">
                <h3 className="font-extrabold text-[#1b2748]">
                  Rossignol Ski Set
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Returned: Jun 15, 2025
                </p>
              </div>
              <a
                href="#review-form"
                className="rounded-lg bg-[#e31824] px-4 py-2.5 text-center text-sm font-bold text-white"
              >
                Leave a Review
              </a>
            </Card>
          </div>
        </section>
        <section
          id="review-form"
          className="mt-8 max-w-2xl rounded-xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
        >
          <h2 className="text-xl font-extrabold text-[#1b2748]">
            Leave a Review
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            How was the REI Kingdom Tent 4P?
          </p>
          <div className="mt-5 flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Button key={index} className="text-3xl text-amber-400">
                <Star
                  className={`size-8 ${index < 4 ? "fill-amber-400" : "fill-none"}`}
                />
              </Button>
            ))}
          </div>
          <label className="mt-5 block text-sm font-bold text-[#1b2748]">
            Your review
            <Textarea
              defaultValue="Amazing tent, easy setup and very spacious!"
              className="mt-2 min-h-30 w-full rounded-lg border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-[#e31824]"
            />
          </label>
          <div className="mt-5 flex items-center gap-4">
            <Button className="rounded-lg bg-[#e31824] px-5 py-3 text-sm font-bold text-white">
              Submit Review
            </Button>
            <a
              href="/dashboard/customer/reviews"
              className="text-sm font-bold text-slate-500"
            >
              Cancel
            </a>
          </div>
        </section>
      </div>
  );
};

export default CustomerReviewsPage;
