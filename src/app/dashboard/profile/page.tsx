import { createClient } from "@/utils/supabase/server";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { GlassCard } from "@/components/ui/GlassCard";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    // Fetch existing profile if it exists
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-white">Your Profile</h1>
                <p className="text-gray-400">Manage your personal information and account settings</p>
            </div>

            <GlassCard className="p-8">
                <ProfileForm user={user} profile={profile} />
            </GlassCard>
        </div>
    );
}
