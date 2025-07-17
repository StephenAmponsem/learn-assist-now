import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatsCard } from "./StatsCard";
import { 
  MessageCircle, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock,
  Award,
  ChevronRight,
  Target,
  Star
} from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-glow rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
        <p className="text-primary-foreground/90">
          Ready to continue your learning journey? You have 3 new notifications and 2 pending assignments.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Questions Asked"
          value={12}
          description="This semester"
          icon={MessageCircle}
          trend={{ value: 20, label: "from last month", isPositive: true }}
        />
        <StatsCard
          title="Answers Received"
          value={28}
          description="Total responses"
          icon={Award}
          trend={{ value: 15, label: "response rate", isPositive: true }}
        />
        <StatsCard
          title="Course Progress"
          value="78%"
          description="Average completion"
          icon={Target}
          trend={{ value: 5, label: "this week", isPositive: true }}
        />
        <StatsCard
          title="Reputation Score"
          value={156}
          description="Community points"
          icon={Star}
          trend={{ value: 12, label: "this month", isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="h-5 w-5 text-primary" />
              Ask a Question
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Get help from instructors and peers
            </p>
            <Button className="w-full">
              Start Asking
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              Browse Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Explore available courses and materials
            </p>
            <Button variant="outline" className="w-full">
              View Courses
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Connect with Instructors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Find and contact your instructors
            </p>
            <Button variant="outline" className="w-full">
              Find Instructors
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Questions
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "How to solve quadratic equations?", time: "2 hours ago", status: "answered" },
              { title: "Understanding React hooks", time: "5 hours ago", status: "pending" },
              { title: "Database normalization help", time: "1 day ago", status: "answered" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
                <Badge variant={item.status === "answered" ? "success" : "secondary"}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Latest Announcements
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Midterm exam schedule released", course: "Mathematics 101", priority: "high" },
              { title: "Assignment deadline extended", course: "Physics 201", priority: "medium" },
              { title: "Guest lecture next week", course: "Computer Science", priority: "low" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.course}</p>
                </div>
                <Badge variant={
                  item.priority === "high" ? "destructive" : 
                  item.priority === "medium" ? "warning" : "secondary"
                }>
                  {item.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};