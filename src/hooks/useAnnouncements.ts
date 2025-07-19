import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Announcement {
  id: string;
  user_id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  target_audience: 'all' | 'students' | 'instructors';
  is_pinned: boolean;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    display_name: string | null;
    role: string;
  };
}

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, profile } = useAuth();

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('announcements')
        .select(`
          *,
          profiles:user_id (
            display_name,
            role
          )
        `)
        .or('expires_at.is.null,expires_at.gt.now()')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements((data || []) as unknown as Announcement[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();

    // Real-time subscription
    const channel = supabase
      .channel('announcements-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'announcements' },
        () => fetchAnnouncements()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const createAnnouncement = async (announcementData: {
    title: string;
    content: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    target_audience: 'all' | 'students' | 'instructors';
    is_pinned?: boolean;
    expires_at?: string;
  }) => {
    if (!user || !profile) throw new Error('User not authenticated');
    if (!['instructor', 'admin'].includes(profile.role)) {
      throw new Error('Only instructors and admins can create announcements');
    }

    const { error } = await supabase
      .from('announcements')
      .insert([{ ...announcementData, user_id: user.id }]);

    if (error) throw error;
  };

  const updateAnnouncement = async (id: string, updates: Partial<Announcement>) => {
    const { error } = await supabase
      .from('announcements')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  };

  const deleteAnnouncement = async (id: string) => {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  const canCreateAnnouncements = profile?.role === 'instructor' || profile?.role === 'admin';

  return {
    announcements,
    loading,
    error,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    canCreateAnnouncements,
    refetch: fetchAnnouncements
  };
};