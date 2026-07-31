"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getMyProfile } from "@/lib/api/auth.api";
import { ProfileCard } from "@/components/shared/profile/ProfileCard";
import { ProfileOverview } from "@/components/shared/profile/ProfileOverview";
import PageHeading from "@/components/shared/PageHeading";

const AdminProfilePage = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      router.push("/login");
    }
  }, [isError, router]);

  if (isLoading) {
    return (
      <div className="p-5 sm:p-8">
        <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="space-y-6">
          <div className="h-40 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!data?.success || !data?.data?.profile) return null;

  const user = data.data.profile;

  return (
    <div className="p-5 sm:p-8">
      <PageHeading title="My Profile" />
      <div className="space-y-6">
        <ProfileCard user={user} />
        <ProfileOverview profile={user.profile} user={user} />
      </div>
    </div>
  );
};

export default AdminProfilePage;
