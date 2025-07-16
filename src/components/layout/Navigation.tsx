import { Home, MessageCircle, Megaphone, BookOpen, Users, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "questions", label: "Q&A", icon: MessageCircle },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "instructors", label: "Instructors", icon: Users },
  { id: "help", label: "Help", icon: HelpCircle },
];

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent hover:border-primary/20",
                  isActive && "border-primary text-primary bg-primary/5"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="whitespace-nowrap">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};