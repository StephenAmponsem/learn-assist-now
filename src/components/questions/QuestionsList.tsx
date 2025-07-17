import { useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { QuestionForm } from "./QuestionForm";
import { SearchAndFilter } from "./SearchAndFilter";

export const QuestionsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [userVotes, setUserVotes] = useState<Record<string, "up" | "down">>({});

  const mockQuestions = [
    {
      id: "1",
      title: "How do I solve quadratic equations using the quadratic formula?",
      content: "I'm struggling with understanding when and how to apply the quadratic formula. Can someone explain the steps with an example?",
      author: "Sarah Johnson",
      course: "Mathematics 101",
      timestamp: "2 hours ago",
      tags: ["Mathematics", "Algebra", "Equations"],
      votes: 12,
      answers: 3,
      isAnswered: true,
    },
    {
      id: "2",
      title: "What is the difference between kinetic and potential energy?",
      content: "I understand the basic definitions, but I'm having trouble with practical applications and calculations.",
      author: "Mike Chen",
      course: "Physics 201",
      timestamp: "5 hours ago",
      tags: ["Physics", "Energy", "Mechanics"],
      votes: 8,
      answers: 2,
      isAnswered: false,
    },
    {
      id: "3",
      title: "How to balance chemical equations step by step?",
      content: "I'm preparing for my chemistry exam and need help understanding the systematic approach to balancing equations.",
      author: "Emma Davis",
      course: "Chemistry 101",
      timestamp: "1 day ago",
      tags: ["Chemistry", "Equations", "Stoichiometry"],
      votes: 15,
      answers: 5,
      isAnswered: true,
    },
    {
      id: "4",
      title: "Understanding Big O notation in algorithm analysis",
      content: "Can someone help me understand how to analyze the time complexity of recursive algorithms?",
      author: "Alex Kumar",
      course: "Computer Science 102",
      timestamp: "3 hours ago",
      tags: ["Computer Science", "Algorithms", "Complexity"],
      votes: 6,
      answers: 1,
      isAnswered: false,
    },
  ];

  const handleVote = (questionId: string, voteType: "up" | "down") => {
    setUserVotes(prev => ({
      ...prev,
      [questionId]: prev[questionId] === voteType ? undefined : voteType
    }));
  };

  const handleQuestionClick = (questionId: string) => {
    console.log("Navigate to question:", questionId);
    // This would navigate to the question detail page
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Questions & Answers</h2>
          <p className="text-muted-foreground">
            Ask questions and get help from the community
          </p>
        </div>
        <QuestionForm />
      </div>

      <SearchAndFilter onSearch={setSearchQuery} onFilter={setFilters} />

      <div className="space-y-4">
        {mockQuestions.map((question) => (
          <QuestionCard 
            key={question.id} 
            {...question} 
            userVote={userVotes[question.id] || null}
            onVote={handleVote}
            onClick={() => handleQuestionClick(question.id)}
          />
        ))}
      </div>

      {mockQuestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No questions found. Be the first to ask!</p>
        </div>
      )}
    </div>
  );
};