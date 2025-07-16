import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestionCard } from "./QuestionCard";

const mockQuestions = [
  {
    id: "1",
    title: "How to implement recursive functions in Python?",
    content: "I'm struggling to understand how recursive functions work in Python. Can someone explain with examples?",
    author: "Sarah Johnson",
    authorRole: "student" as const,
    timestamp: "2 hours ago",
    tags: ["Python", "Programming", "Recursion"],
    likes: 12,
    replies: 8,
    isAnswered: true,
  },
  {
    id: "2", 
    title: "Database normalization best practices",
    content: "What are the key principles of database normalization and when should I apply them?",
    author: "Mike Chen",
    authorRole: "student" as const,
    timestamp: "5 hours ago",
    tags: ["Database", "SQL", "Design"],
    likes: 7,
    replies: 3,
    isAnswered: false,
  },
  {
    id: "3",
    title: "React hooks vs class components",
    content: "When should I use React hooks versus traditional class components? What are the trade-offs?",
    author: "Emma Wilson",
    authorRole: "student" as const,
    timestamp: "1 day ago",
    tags: ["React", "JavaScript", "Frontend"],
    likes: 15,
    replies: 12,
    isAnswered: true,
  },
];

export const QuestionsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold">Questions & Answers</h1>
          <p className="text-muted-foreground">Ask questions and get help from instructors and peers</p>
        </div>
        <Button className="w-fit">
          <Plus className="h-4 w-4 mr-2" />
          Ask Question
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search questions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="unanswered">Unanswered</SelectItem>
              <SelectItem value="answered">Answered</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {mockQuestions.map((question) => (
          <QuestionCard key={question.id} {...question} />
        ))}
      </div>
    </div>
  );
};