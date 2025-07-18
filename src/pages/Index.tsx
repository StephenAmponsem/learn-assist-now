import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { QuestionsList } from "@/components/questions/QuestionsList";
import { AnnouncementsList } from "@/components/announcements/AnnouncementsList";
import { AIStudyAssistant } from "@/components/ai/AIStudyAssistant";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard />;
      case "questions":
        return <QuestionsList />;
      case "announcements":
        return <AnnouncementsList />;
      case "courses":
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Courses</h2>
            <p className="text-muted-foreground">Course management coming soon...</p>
          </div>
        );
      case "instructors":
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Instructors</h2>
            <p className="text-muted-foreground">Instructor directory coming soon...</p>
          </div>
        );
      case "help":
        return <AIStudyAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
