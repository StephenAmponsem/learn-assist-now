import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DashboardStats {
  totalQuestions: number;
  totalAnswers: number;
  totalAnnouncements: number;
  userQuestions: number;
  userAnswers: number;
  resolvedQuestions: number;
  recentActivity: {
    questions: number;
    announcements: number;
  };
}

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalQuestions: 0,
    totalAnswers: 0,
    totalAnnouncements: 0,
    userQuestions: 0,
    userAnswers: 0,
    resolvedQuestions: 0,
    recentActivity: {
      questions: 0,
      announcements: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchStats = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Get total counts
      const [questionsCount, answersCount, announcementsCount] = await Promise.all([
        supabase.from('questions').select('*', { count: 'exact', head: true }),
        supabase.from('answers').select('*', { count: 'exact', head: true }),
        supabase.from('announcements').select('*', { count: 'exact', head: true })
      ]);

      // Get user-specific counts
      const [userQuestionsCount, userAnswersCount] = await Promise.all([
        supabase.from('questions').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('answers').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
      ]);

      // Get resolved questions count
      const resolvedCount = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true })
        .eq('is_resolved', true);

      // Get recent activity (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const [recentQuestions, recentAnnouncements] = await Promise.all([
        supabase
          .from('questions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', weekAgo.toISOString()),
        supabase
          .from('announcements')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', weekAgo.toISOString())
      ]);

      setStats({
        totalQuestions: questionsCount.count || 0,
        totalAnswers: answersCount.count || 0,
        totalAnnouncements: announcementsCount.count || 0,
        userQuestions: userQuestionsCount.count || 0,
        userAnswers: userAnswersCount.count || 0,
        resolvedQuestions: resolvedCount.count || 0,
        recentActivity: {
          questions: recentQuestions.count || 0,
          announcements: recentAnnouncements.count || 0
        }
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Real-time subscription for stats updates
    const channel = supabase
      .channel('stats-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'questions' },
        () => fetchStats()
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'answers' },
        () => fetchStats()
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'announcements' },
        () => fetchStats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};