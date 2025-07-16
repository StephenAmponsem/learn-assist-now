import { BookOpen, MessageCircle, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";

const recentQuestions = [
  {
    id: "1",
    title: "How to optimize database queries?",
    content: "Looking for best practices to improve query performance in PostgreSQL...",
    author: "Alex Thompson",
    authorRole: "student" as const,
    timestamp: "30 min ago",
    tags: ["Database", "PostgreSQL"],
    likes: 5,
    replies: 2,
    isAnswered: false,
  },
  {
    id: "2",
    title: "React component lifecycle explained",
    content: "Can someone break down the React component lifecycle methods?",
    author: "Maria Garcia",
    authorRole: "student" as const,
    timestamp: "1 hour ago",
    tags: ["React", "JavaScript"],
    likes: 8,
    replies: 4,
    isAnswered: true,
  },
];

const recentAnnouncements = [
  {
    id: "1",
    title: "Final Project Guidelines Released",
    content: "The guidelines for your final project submissions are now available...",
    instructor: "Dr. Sarah Wilson",
    course: "Software Engineering",
    timestamp: "2 hours ago",
    priority: "high" as const,
    isPinned: true,
  },
  {
    id: "2",
    title: "Office Hours Schedule Update",
    content: "Updated office hours for this week due to conference attendance...",
    instructor: "Prof. David Kim",
    course: "Data Science",
    timestamp: "4 hours ago",
    priority: "medium" as const,
    isPinned: false,
  },
];

const stats = [
  {
    title: "Active Courses",
    value: "6",
    icon: BookOpen,
    description: "Currently enrolled",
    color: "text-blue-600",
  },
  {
    title: "Questions Asked",
    value: "23",
    icon: MessageCircle,
    description: "This semester",
    color: "text-green-600",
  },
  {
    title: "Instructors",
    value: "8",
    icon: Users,
    description: "Available for help",
    color: "text-purple-600",
  },
  {
    title: "Progress",
    value: "87%",
    icon: TrendingUp,
    description: "Course completion",
    color: "text-orange-600",
  },
];

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, Student!</h1>
        <p className="text-muted-foreground">Here's what's happening in your academic community today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Questions</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentQuestions.map((question) => (
              <QuestionCard key={question.id} {...question} />
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Latest Announcements</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentAnnouncements.map((announcement) => (
              <AnnouncementCard key={announcement.id} {...announcement} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};