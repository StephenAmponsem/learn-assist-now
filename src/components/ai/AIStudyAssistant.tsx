import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, Lightbulb, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIResponse {
  answer: string;
  confidence: number;
  relatedTopics: string[];
  sources: string[];
}

export const AIStudyAssistant = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const { toast } = useToast();

  const handleAskAI = async () => {
    if (!question.trim()) {
      toast({
        title: "Please enter a question",
        description: "Type your question in the text area above.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate AI response - In real implementation, this would call an AI API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse: AIResponse = {
        answer: `Based on your question about "${question}", here's a comprehensive explanation:\n\nThis topic involves several key concepts that are interconnected. The fundamental principles suggest that understanding the underlying mechanisms is crucial for mastering this subject.\n\nKey points to remember:\n1. Start with the basic definitions and principles\n2. Practice with examples to reinforce understanding\n3. Connect this concept to related topics you've studied\n\nWould you like me to provide more specific examples or explain any particular aspect in more detail?`,
        confidence: 0.85,
        relatedTopics: ["Basic Principles", "Practice Problems", "Advanced Applications"],
        sources: ["Course Materials", "Academic Resources", "Study Guide"]
      };
      
      setAiResponse(mockResponse);
      toast({
        title: "AI Response Generated",
        description: "The AI has analyzed your question and provided a detailed response.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setQuestion("");
    setAiResponse(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Study Assistant
          </CardTitle>
          <CardDescription>
            Get instant, intelligent answers to your study questions powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="ai-question" className="text-sm font-medium">
              Ask your question:
            </label>
            <Textarea
              id="ai-question"
              placeholder="Type your study question here... (e.g., 'Explain the concept of photosynthesis' or 'How do I solve quadratic equations?')"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleAskAI} 
              disabled={isLoading || !question.trim()}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Ask AI
                </>
              )}
            </Button>
            
            {aiResponse && (
              <Button variant="outline" onClick={handleClearChat}>
                Clear Chat
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {aiResponse && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              AI Response
              <Badge variant="secondary" className="ml-auto">
                {Math.round(aiResponse.confidence * 100)}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line text-sm leading-relaxed">
                {aiResponse.answer}
              </p>
            </div>
            
            {aiResponse.relatedTopics.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Related Topics:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {aiResponse.relatedTopics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {aiResponse.sources.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Sources:</h4>
                <div className="flex flex-wrap gap-2">
                  {aiResponse.sources.map((source, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};