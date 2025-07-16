import { Megaphone, Clock, User, Pin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AnnouncementCardProps {
  id: string;
  title: string;
  content: string;
  instructor: string;
  course: string;
  timestamp: string;
  priority: "low" | "medium" | "high";
  isPinned?: boolean;
}

const priorityConfig = {
  low: { variant: "secondary" as const, label: "Info" },
  medium: { variant: "warning" as const, label: "Important" },
  high: { variant: "destructive" as const, label: "Urgent" },
};

export const AnnouncementCard = ({
  title,
  content,
  instructor,
  course,
  timestamp,
  priority,
  isPinned = false,
}: AnnouncementCardProps) => {
  const priorityInfo = priorityConfig[priority];

  return (
    <Card className={`hover:shadow-md transition-shadow ${isPinned ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isPinned && <Pin className="h-4 w-4 text-primary" />}
              <h3 className="font-semibold text-lg leading-tight">{title}</h3>
            </div>
            <p className="text-muted-foreground text-sm">{content}</p>
          </div>
          <Badge variant={priorityInfo.variant}>
            {priorityInfo.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          {/* Instructor Info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {instructor.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{instructor}</span>
              <span>•</span>
              <Badge variant="outline" className="text-xs">
                {course}
              </Badge>
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            {timestamp}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};