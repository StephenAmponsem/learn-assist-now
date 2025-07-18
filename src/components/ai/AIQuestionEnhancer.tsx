import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Tag, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIEnhancement {
  suggestedTags: string[];
  category: string;
  duplicateWarning?: {
    isLikely: boolean;
    similarQuestions: string[];
  };
  improvements: string[];
}

interface AIQuestionEnhancerProps {
  questionText: string;
  onTagsSelected: (tags: string[]) => void;
  onCategorySelected: (category: string) => void;
}

export const AIQuestionEnhancer = ({ 
  questionText, 
  onTagsSelected, 
  onCategorySelected 
}: AIQuestionEnhancerProps) => {
  const [enhancement, setEnhancement] = useState<AIEnhancement | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (questionText.length > 10) {
      analyzeQuestion();
    }
  }, [questionText]);

  const analyzeQuestion = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis - In real implementation, this would call an AI API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockEnhancement: AIEnhancement = {
        suggestedTags: ["mathematics", "algebra", "problem-solving", "equations"],
        category: "Mathematics",
        duplicateWarning: {
          isLikely: Math.random() > 0.7,
          similarQuestions: [
            "How to solve linear equations?",
            "What are the steps for solving algebraic equations?"
          ]
        },
        improvements: [
          "Consider adding specific examples",
          "Include your current level of understanding",
          "Specify which part you're struggling with"
        ]
      };
      
      setEnhancement(mockEnhancement);
      onCategorySelected(mockEnhancement.category);
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "Failed to analyze question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleTagToggle = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newSelectedTags);
    onTagsSelected(newSelectedTags);
  };

  const applyAllSuggestions = () => {
    if (enhancement) {
      setSelectedTags(enhancement.suggestedTags);
      onTagsSelected(enhancement.suggestedTags);
      toast({
        title: "Suggestions Applied",
        description: "All AI suggestions have been applied to your question.",
      });
    }
  };

  if (!questionText || questionText.length <= 10) {
    return null;
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 animate-pulse" />
            AI is analyzing your question...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!enhancement) return null;

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Question Enhancement
          </h3>
          <Button size="sm" variant="outline" onClick={applyAllSuggestions}>
            Apply All
          </Button>
        </div>

        {/* Suggested Tags */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            Suggested Tags:
          </label>
          <div className="flex flex-wrap gap-2">
            {enhancement.suggestedTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => handleTagToggle(tag)}
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            Suggested Category:
          </label>
          <Badge variant="secondary">{enhancement.category}</Badge>
        </div>

        {/* Duplicate Warning */}
        {enhancement.duplicateWarning?.isLikely && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Similar questions found
                </p>
                <div className="space-y-1">
                  {enhancement.duplicateWarning.similarQuestions.map((q, index) => (
                    <p key={index} className="text-xs text-yellow-700 dark:text-yellow-300">
                      • {q}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Improvements */}
        {enhancement.improvements.length > 0 && (
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Suggestions for improvement:
            </label>
            <ul className="space-y-1">
              {enhancement.improvements.map((improvement, index) => (
                <li key={index} className="text-xs text-muted-foreground">
                  • {improvement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};