import { getMe } from "@/app/services/auth/getMe";
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/shared/profile/ProfileCard";
import { ProfileOverview } from "@/components/shared/profile/ProfileOverview";

export const metadata = {
  title: "My Profile | GearUp",
};

const ProfilePage = async () => {
  const result = await getMe();

  if (!result || !result.success) {
    redirect("/login");
  }

  const user = result.data.profile;

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-[#1b2748]">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your personal information and preferences
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <ProfileCard user={user} />
        <ProfileOverview profile={user.profile} user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
