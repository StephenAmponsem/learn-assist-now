import { AnnouncementCard } from "./AnnouncementCard";
import { AnnouncementForm } from "./AnnouncementForm";

export const AnnouncementsList = () => {
  const mockAnnouncements = [
    {
      id: "1",
      title: "Midterm Exam Schedule Released",
      content: "The midterm examination schedule for all courses has been published. Please check your course portals for specific dates and times.",
      instructor: "Dr. Amanda Rodriguez",
      course: "Computer Science",
      timestamp: "1 hour ago",
      priority: "high" as const,
      isPinned: true,
    },
    {
      id: "2",
      title: "Assignment 3 Due Date Extended",
      content: "Due to technical issues with the submission system, Assignment 3 deadline has been extended to Friday, March 15th at 11:59 PM.",
      instructor: "Prof. James Liu",
      course: "Data Structures",
      timestamp: "3 hours ago",
      priority: "medium" as const,
      isPinned: false,
    },
    {
      id: "3",
      title: "Guest Lecture on Machine Learning",
      content: "Join us for a special guest lecture by Dr. Sarah Chen from Google AI on 'The Future of Machine Learning in Industry' on March 20th.",
      instructor: "Dr. Michael Brown",
      course: "AI & ML",
      timestamp: "6 hours ago",
      priority: "low" as const,
      isPinned: false,
    },
    {
      id: "4",
      title: "Library Hours Extended During Finals",
      content: "The university library will extend its operating hours during the final examination period. New hours: 6 AM - 2 AM daily.",
      instructor: "Library Administration",
      course: "General",
      timestamp: "1 day ago",
      priority: "medium" as const,
      isPinned: true,
    },
  ];

  // Sort pinned announcements first
  const sortedAnnouncements = [...mockAnnouncements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
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
        <AnnouncementForm />
      </div>

      <div className="space-y-4">
        {sortedAnnouncements.map((announcement) => (
          <AnnouncementCard key={announcement.id} {...announcement} />
        ))}
      </div>

      {sortedAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No announcements found.</p>
        </div>
      )}
    </div>
  );
};