import React from "react";
import PageHeading from "@/components/shared/PageHeading";
import {
  Search,
  MapPin,
  Calendar,
  Heart,
  Star,
  Bike,
  Tent,
  Camera,
  Waves,
  Snowflake,
  Dumbbell,
  MountainSnow,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const categories = [
  { name: "Cycling", items: 24, icon: Bike, color: "text-red-500", bg: "bg-red-50" },
  { name: "Camping", items: 18, icon: Tent, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Photography", items: 32, icon: Camera, color: "text-amber-500", bg: "bg-amber-50" },
  { name: "Water Sports", items: 16, icon: Waves, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Winter Sports", items: 12, icon: Snowflake, color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "Fitness & Gym", items: 20, icon: Dumbbell, color: "text-green-500", bg: "bg-green-50" },
  { name: "Rock Climbing", items: 14, icon: MountainSnow, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Team Sports", items: 22, icon: Trophy, color: "text-pink-500", bg: "bg-pink-50" },
];

const gearItems = [
  {
    id: 1,
    title: "Sony Alpha A7 III",
    brand: "Sony",
    category: "Photography",
    location: "Dhanmondi, Dhaka",
    rating: 4.8,
    reviews: 32,
    price: 35,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80",
    available: true,
    tagColor: "text-purple-600 bg-purple-100",
  },
  {
    id: 2,
    title: "Trek X-Caliber MTB",
    brand: "Trek",
    category: "Cycling",
    location: "Mirpur, Dhaka",
    rating: 4.9,
    reviews: 18,
    price: 25,
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=500&auto=format&fit=crop&q=80",
    available: true,
    tagColor: "text-red-600 bg-red-100",
  },
  {
    id: 3,
    title: "REI Camping Tent",
    brand: "REI",
    category: "Camping",
    location: "Uttara, Dhaka",
    rating: 4.7,
    reviews: 21,
    price: 20,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&auto=format&fit=crop&q=80",
    available: true,
    tagColor: "text-emerald-600 bg-emerald-100",
  },
  {
    id: 4,
    title: "GoPro Hero 12",
    brand: "GoPro",
    category: "Photography",
    location: "Banani, Dhaka",
    rating: 4.9,
    reviews: 41,
    price: 30,
    image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=500&auto=format&fit=crop&q=80",
    available: true,
    tagColor: "text-purple-600 bg-purple-100",
  },
  {
    id: 5,
    title: "Perception Kayak",
    brand: "Perception",
    category: "Water Sports",
    location: "Hatirjheel, Dhaka",
    rating: 4.6,
    reviews: 15,
    price: 28,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&auto=format&fit=crop&q=80",
    available: true,
    tagColor: "text-blue-600 bg-blue-100",
  },
];

const CustomerRentGearPage = () => {
  return (
    <div className="p-5 sm:p-8">
      <PageHeading
        title="Rent New Gear"
        subtitle="Discover and rent high-quality gear for your next adventure."
      />

      {/* Search and Filter Bar */}
      <Card className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] lg:flex-row lg:items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search gear, brand or keyword..."
            className="pl-9 bg-transparent border-slate-200"
          />
        </div>
        <div className="w-full lg:w-48">
          <Select defaultValue="all-categories">
            <SelectTrigger className="bg-transparent border-slate-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              <SelectItem value="cycling">Cycling</SelectItem>
              <SelectItem value="camping">Camping</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full lg:w-48">
          <Select defaultValue="all-locations">
            <SelectTrigger className="bg-transparent border-slate-200">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-locations">All Locations</SelectItem>
              <SelectItem value="dhaka">Dhaka</SelectItem>
              <SelectItem value="chittagong">Chittagong</SelectItem>
              <SelectItem value="sylhet">Sylhet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full relative lg:w-48">
          <Calendar className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Select dates"
            className="bg-transparent border-slate-200 pr-9"
          />
        </div>
        <Button className="w-full bg-[#e31824] hover:bg-[#c41520] lg:w-32">
          Search
        </Button>
      </Card>

      {/* Browse by Category */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1b2748]">Browse by Category</h2>
          <a href="#" className="text-sm font-bold text-[#e31824] hover:underline">
            View All
          </a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex min-w-[130px] cursor-pointer flex-col items-center justify-center rounded-xl bg-white py-4 px-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition border border-transparent hover:border-[#e31824] hover:shadow-md"
            >
              <span className={`flex size-11 items-center justify-center rounded-full ${cat.bg} mb-2.5`}>
                <cat.icon className={`size-5 ${cat.color}`} />
              </span>
              <p className="text-sm font-bold text-[#1b2748]">{cat.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{cat.items} items</p>
            </div>
          ))}
        </div>
      </div>

      {/* Available Gear List */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-[#1b2748]">Available Gear</h2>
          <p className="text-sm text-slate-500">128 items found</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="condition">
            <SelectTrigger className="w-[120px] bg-white h-9 text-sm">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="condition">Condition</SelectItem>
              <SelectItem value="new">Like New</SelectItem>
              <SelectItem value="good">Good</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="price">
            <SelectTrigger className="w-[130px] bg-white h-9 text-sm">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price Range</SelectItem>
              <SelectItem value="0-20">$0 - $20</SelectItem>
              <SelectItem value="21-50">$21 - $50</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <span className="text-sm font-medium text-slate-700">Available Only</span>
            <div className="w-9 h-5 bg-[#0fc172] rounded-full flex items-center p-0.5 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full translate-x-4"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Sort By</span>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[130px] bg-white h-9 text-sm border-none shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {gearItems.map((gear) => (
          <Card key={gear.id} className="group overflow-hidden rounded-xl bg-white p-0 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={gear.image}
                alt={gear.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white text-slate-400 shadow-md transition hover:text-[#e31824]">
                <Heart className="size-4" />
              </button>
              <span className={`absolute bottom-3 left-3 rounded px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider ${gear.tagColor}`}>
                {gear.category}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-extrabold text-[#1b2748] truncate">{gear.title}</h3>
              <p className="text-sm text-slate-500">{gear.brand}</p>
              
              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="size-3.5" />
                <span className="truncate">{gear.location}</span>
              </div>
              
              <div className="mt-1 flex items-center gap-1.5 text-xs">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-[#1b2748]">{gear.rating}</span>
                <span className="text-slate-400">({gear.reviews})</span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="font-extrabold text-[#e31824]">
                  ${gear.price} <span className="text-xs font-normal text-slate-500">/ day</span>
                </p>
                {gear.available && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
                    Available
                  </span>
                )}
              </div>

              <Button className="mt-4 w-full bg-[#e31824] hover:bg-[#c41520] font-bold">
                Rent Now
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-center gap-2">
        <Button variant="outline" size="icon" className="size-9 rounded-lg border-slate-200">
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="default" className="size-9 rounded-lg bg-[#e31824] p-0 font-bold hover:bg-[#c41520]">
          1
        </Button>
        <Button variant="ghost" className="size-9 rounded-lg p-0 font-medium text-slate-600">
          2
        </Button>
        <Button variant="ghost" className="size-9 rounded-lg p-0 font-medium text-slate-600">
          3
        </Button>
        <Button variant="ghost" className="size-9 rounded-lg p-0 font-medium text-slate-600">
          4
        </Button>
        <Button variant="ghost" className="size-9 rounded-lg p-0 font-medium text-slate-600">
          5
        </Button>
        <span className="px-1 text-slate-400">...</span>
        <Button variant="ghost" className="size-9 rounded-lg p-0 font-medium text-slate-600">
          9
        </Button>
        <Button variant="outline" size="icon" className="size-9 rounded-lg border-slate-200">
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default CustomerRentGearPage;
