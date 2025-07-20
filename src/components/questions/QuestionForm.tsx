import { useState } from "react";
import { Plus, BookOpen, Tag } from "lucide-react";
import { AIQuestionEnhancer } from "@/components/ai/AIQuestionEnhancer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuestionFormProps {
  onSubmit?: (questionData: {
    title: string;
    content: string;
    subject: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
  }) => Promise<void>;
  onCancel?: () => void;
}

const predefinedTags = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "History", "Literature", "Economics", "Psychology", "Engineering"
];

export const QuestionForm = ({ onSubmit, onCancel }: QuestionFormProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [course, setCourse] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [showAIEnhancer, setShowAIEnhancer] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const questionData = {
      title,
      content,
      subject: course,
      difficulty: 'medium' as const,
      tags
    };
    
    try {
      await onSubmit?.(questionData);
      setIsOpen(false);
      // Reset form
      setTitle("");
      setContent("");
      setCourse("");
      setTags([]);
      setCustomTag("");
      setShowAIEnhancer(false);
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addCustomTag = () => {
    if (customTag.trim()) {
      addTag(customTag.trim());
      setCustomTag("");
    }
  };

  const handleAITagsSelected = (aiTags: string[]) => {
    const uniqueTags = Array.from(new Set([...tags, ...aiTags]));
    setTags(uniqueTags);
  };

  const handleAICategorySelected = (category: string) => {
    const courseMap: Record<string, string> = {
      "Mathematics": "math101",
      "Physics": "phys201", 
      "Chemistry": "chem101",
      "Computer Science": "cs102",
      "Biology": "bio101"
    };
    if (courseMap[category]) {
      setCourse(courseMap[category]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Ask Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Ask a Question
          </DialogTitle>
          <DialogDescription>
            Share your academic question with the community and get help from peers and instructors.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Question Title</label>
            <Input
              placeholder="What's your question about?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Course</label>
            <Select value={course} onValueChange={setCourse} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math101">Mathematics 101</SelectItem>
                <SelectItem value="phys201">Physics 201</SelectItem>
                <SelectItem value="chem101">Chemistry 101</SelectItem>
                <SelectItem value="cs102">Computer Science 102</SelectItem>
                <SelectItem value="bio101">Biology 101</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Question Details</label>
            <Textarea
              placeholder="Describe your question in detail. Include what you've tried and where you're stuck..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setShowAIEnhancer(e.target.value.length > 10);
              }}
              rows={4}
              required
            />
          </div>

          {showAIEnhancer && (
            <AIQuestionEnhancer
              questionText={content}
              onTagsSelected={handleAITagsSelected}
              onCategorySelected={handleAICategorySelected}
            />
          )}

          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-1">
              <Tag className="h-3 w-3" />
              Tags (Optional)
            </label>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {predefinedTags.filter(tag => !tags.includes(tag)).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => addTag(tag)}
                >
                  + {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add custom tag..."
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
              />
              <Button type="button" variant="outline" onClick={addCustomTag}>
                Add
              </Button>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => {
            setIsOpen(false);
            onCancel?.();
          }}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Post Question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};