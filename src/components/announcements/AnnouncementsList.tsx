import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AnnouncementCard } from "./AnnouncementCard";

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

export const AnnouncementsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === "all" || announcement.priority === filterBy;
    return matchesSearch && matchesFilter;
  });

  // Sort pinned announcements first
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Announcements</h1>
        <p className="text-muted-foreground">Stay updated with the latest news and updates from your instructors</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search announcements..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">Urgent</SelectItem>
              <SelectItem value="medium">Important</SelectItem>
              <SelectItem value="low">Info</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {sortedAnnouncements.length > 0 ? (
          sortedAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} {...announcement} />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No announcements found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};