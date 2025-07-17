import { MessageCircle, Clock, User, ThumbsUp, GraduationCap, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  course: string;
  timestamp: string;
  tags: string[];
  votes: number;
  answers: number;
  isAnswered?: boolean;
  userVote?: "up" | "down" | null;
  onVote?: (questionId: string, voteType: "up" | "down") => void;
  onClick?: () => void;
}

export const QuestionCard = ({
  id,
  title,
  content,
  author,
  course,
  timestamp,
  tags,
  votes,
  answers,
  isAnswered = false,
  userVote = null,
  onVote,
  onClick,
}: QuestionCardProps) => {
  
  const handleVote = (voteType: "up" | "down") => {
    onVote?.(id, voteType);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center gap-1 pt-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 hover:bg-primary/20 ${
                userVote === "up" ? "text-primary bg-primary/10" : "text-muted-foreground"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleVote("up");
              }}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <span className={`text-sm font-medium ${
              votes > 0 ? "text-primary" : votes < 0 ? "text-destructive" : "text-muted-foreground"
            }`}>
              {votes}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 hover:bg-destructive/20 rotate-180 ${
                userVote === "down" ? "text-destructive bg-destructive/10" : "text-muted-foreground"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleVote("down");
              }}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
          </div>

          {/* Content Section */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2 leading-tight hover:text-primary">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{content}</p>
              </div>
              
              {isAnswered && (
                <Badge variant="success" className="shrink-0">
                  <Award className="h-3 w-3 mr-1" />
                  Solved
                </Badge>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between pl-16">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {author.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{author}</span>
              <span>•</span>
              <Badge variant="outline" className="text-xs">
                {course}
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              <span>{answers} answers</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timestamp}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};