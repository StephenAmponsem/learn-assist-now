import { AnnouncementCard } from "./AnnouncementCard";
import { AnnouncementForm } from "./AnnouncementForm";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const AnnouncementsList = () => {
  const { announcements, loading, error } = useAnnouncements();
  const { user } = useAuth();

  const canCreateAnnouncement = user && ['instructor', 'admin'].includes(user.user_metadata?.role || '');

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Announcements</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading announcements: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Sort announcements to show pinned ones first
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Announcements</h2>
          <p className="text-muted-foreground">
            Important updates and information from instructors
          </p>
        </div>
        {canCreateAnnouncement && <AnnouncementForm />}
      </div>

      <div className="space-y-4">
        {sortedAnnouncements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No announcements available at the moment.</p>
          </div>
        ) : (
          sortedAnnouncements.map((announcement) => (
            <AnnouncementCard 
              key={announcement.id} 
              id={announcement.id}
              title={announcement.title}
              content={announcement.content}
              instructor={announcement.profiles?.display_name || 'Anonymous'}
              course={announcement.target_audience}
              timestamp={new Date(announcement.created_at).toLocaleDateString()}
              priority={announcement.priority as 'high' | 'medium' | 'low'}
              isPinned={announcement.is_pinned}
            />
          ))
        )}
      </div>
    </div>
  );
};