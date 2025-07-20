import { useState } from "react";
import { useQuestions } from "@/hooks/useQuestions";
import { useAuth } from "@/contexts/AuthContext";
import { QuestionCard } from "./QuestionCard";
import { QuestionForm } from "./QuestionForm";
import { SearchAndFilter } from "./SearchAndFilter";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export const QuestionsList = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const { questions, loading, error, createQuestion, voteQuestion } = useQuestions();
  const { user } = useAuth();

  const handleCreateQuestion = async (questionData: {
    title: string;
    content: string;
    subject: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
  }) => {
    try {
      await createQuestion(questionData);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || question.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === "all" || question.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Questions</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Questions</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading questions: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Questions</h1>
        {user && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Ask Question
          </Button>
        )}
      </div>

      <SearchAndFilter
        onSearch={setSearchTerm}
        onFilter={(filters) => {
          if (filters.course) setSelectedSubject(filters.course);
          // Handle other filters as needed
        }}
      />

      {showForm && (
        <QuestionForm 
          onSubmit={handleCreateQuestion}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No questions found matching your criteria.</p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <QuestionCard 
              key={question.id} 
              id={question.id}
              title={question.title}
              content={question.content}
              author={question.profiles?.display_name || 'Anonymous'}
              course={question.subject}
              timestamp={new Date(question.created_at).toLocaleDateString()}
              tags={question.tags}
              votes={question.upvotes - question.downvotes}
              answers={question.answer_count}
              isAnswered={question.is_resolved}
              onVote={(id, type) => voteQuestion(id, type)}
            />
          ))
        )}
      </div>
    </div>
  );
};