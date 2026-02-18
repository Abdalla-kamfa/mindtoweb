import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProjectList } from "@/components/dashboard/ProjectList";

export default async function ProjectsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: requests } = await supabase
        .from("service_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Projects</h1>
                    <p className="text-gray-400 mt-1">Manage and track your service requests</p>
                </div>
                <Link href="/dashboard/submit">
                    <Button>New Project</Button>
                </Link>
            </div>

            <ProjectList projects={requests || []} />
        </div>
    );
}
