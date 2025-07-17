import { useState } from "react";
import { Plus, Megaphone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const AnnouncementForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [course, setCourse] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [isPinned, setIsPinned] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ title, content, course, priority, isPinned });
    setIsOpen(false);
    // Reset form
    setTitle("");
    setContent("");
    setCourse("");
    setPriority("medium");
    setIsPinned(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Announcement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Create Announcement
          </DialogTitle>
          <DialogDescription>
            Share important information with your students. Announcements will be visible to all enrolled students.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium">
              Announcement Title
            </Label>
            <Input
              id="title"
              placeholder="Enter announcement title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="course" className="text-sm font-medium">
              Course
            </Label>
            <Select value={course} onValueChange={setCourse} required>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math101">Mathematics 101</SelectItem>
                <SelectItem value="phys201">Physics 201</SelectItem>
                <SelectItem value="chem101">Chemistry 101</SelectItem>
                <SelectItem value="cs102">Computer Science 102</SelectItem>
                <SelectItem value="bio101">Biology 101</SelectItem>
                <SelectItem value="all">All Courses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content" className="text-sm font-medium">
              Message
            </Label>
            <Textarea
              id="content"
              placeholder="Write your announcement message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="priority" className="text-sm font-medium">
                Priority Level
              </Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as "low" | "medium" | "high")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Info)</SelectItem>
                  <SelectItem value="medium">Medium (Important)</SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      High (Urgent)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="pinned"
                checked={isPinned}
                onCheckedChange={setIsPinned}
              />
              <Label htmlFor="pinned" className="text-sm font-medium">
                Pin announcement
              </Label>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Publish Announcement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};