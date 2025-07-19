import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Question {
  id: string;
  user_id: string;
  title: string;
  content: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  upvotes: number;
  downvotes: number;
  answer_count: number;
  is_resolved: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    display_name: string | null;
    role: string;
  };
}

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('questions')
        .select(`
          *,
          profiles:user_id (
            display_name,
            role
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuestions((data || []) as unknown as Question[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();

    // Real-time subscription
    const channel = supabase
      .channel('questions-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'questions' },
        () => fetchQuestions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const createQuestion = async (questionData: {
    title: string;
    content: string;
    subject: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
  }) => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('questions')
      .insert([{ ...questionData, user_id: user.id }]);

    if (error) throw error;
  };

  const updateQuestion = async (id: string, updates: Partial<Question>) => {
    const { error } = await supabase
      .from('questions')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  };

  const deleteQuestion = async (id: string) => {
    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  const voteQuestion = async (id: string, voteType: 'up' | 'down') => {
    const question = questions.find(q => q.id === id);
    if (!question) return;

    const updates = voteType === 'up' 
      ? { upvotes: question.upvotes + 1 }
      : { downvotes: question.downvotes + 1 };

    await updateQuestion(id, updates);
  };

  return {
    questions,
    loading,
    error,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    voteQuestion,
    refetch: fetchQuestions
  };
};