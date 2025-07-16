import { MessageCircle, ThumbsUp, Clock, User, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface QuestionCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: "student" | "instructor";
  timestamp: string;
  tags: string[];
  likes: number;
  replies: number;
  hasAnswer?: boolean;
  isAnswered?: boolean;
}

export const QuestionCard = ({
  title,
  content,
  author,
  authorRole,
  timestamp,
  tags,
  likes,
  replies,
  hasAnswer = false,
  isAnswered = false,
}: QuestionCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{content}</p>
          </div>
          {isAnswered && (
            <Badge variant="default" className="bg-success hover:bg-success/90">
              Answered
            </Badge>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {author.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{author}</span>
              <Badge variant={authorRole === "instructor" ? "default" : "secondary"} className="text-xs">
                {authorRole}
              </Badge>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timestamp}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {likes}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <MessageCircle className="h-4 w-4 mr-1" />
              {replies}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};