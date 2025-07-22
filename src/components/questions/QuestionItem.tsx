import { useState } from "react";
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const QuestionItem = ({ question, onUpdate, onDelete }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(question.title);
  const [content, setContent] = useState(question.content);
  const { toast } = useToast();

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("questions")
      .update({ title, content })
      .eq("id", question.id);

    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated successfully" });
      setIsEditing(false);
      onUpdate?.();
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this question?");
    if (!confirm) return;

    const { error } = await supabase.from("questions").delete().eq("id", question.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted successfully" });
      onDelete?.();
    }
  };

  if (isEditing) {
    return (
      <div className="p-4 border rounded space-y-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <div className="flex gap-2">
          <Button onClick={handleUpdate}>Save</Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded space-y-1">
      <h3 className="font-semibold">{question.title}</h3>
      <p className="text-muted-foreground text-sm">{question.content}</p>
      <div className="flex gap-2 mt-2">
        <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>Edit</Button>
        <Button size="sm" variant="destructive" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};
