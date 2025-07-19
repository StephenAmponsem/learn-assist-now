-- Create questions table
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  subject TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  tags TEXT[] DEFAULT '{}',
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  answer_count INTEGER DEFAULT 0,
  is_resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create answers table
CREATE TABLE public.answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  is_accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  target_audience TEXT NOT NULL DEFAULT 'all' CHECK (target_audience IN ('all', 'students', 'instructors')),
  is_pinned BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Questions policies
CREATE POLICY "Questions are viewable by everyone" 
ON public.questions FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create questions" 
ON public.questions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questions" 
ON public.questions FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own questions" 
ON public.questions FOR DELETE 
USING (auth.uid() = user_id);

-- Answers policies
CREATE POLICY "Answers are viewable by everyone" 
ON public.answers FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create answers" 
ON public.answers FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own answers" 
ON public.answers FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own answers" 
ON public.answers FOR DELETE 
USING (auth.uid() = user_id);

-- Announcements policies
CREATE POLICY "Announcements are viewable by everyone" 
ON public.announcements FOR SELECT USING (true);

CREATE POLICY "Instructors and admins can create announcements" 
ON public.announcements FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('instructor', 'admin')
  )
);

CREATE POLICY "Users can update their own announcements" 
ON public.announcements FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own announcements" 
ON public.announcements FOR DELETE 
USING (auth.uid() = user_id);

-- Add triggers for timestamps
CREATE TRIGGER update_questions_updated_at
BEFORE UPDATE ON public.questions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_answers_updated_at
BEFORE UPDATE ON public.answers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at
BEFORE UPDATE ON public.announcements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update answer count
CREATE OR REPLACE FUNCTION public.update_question_answer_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.questions 
    SET answer_count = answer_count + 1 
    WHERE id = NEW.question_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.questions 
    SET answer_count = answer_count - 1 
    WHERE id = OLD.question_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for answer count
CREATE TRIGGER update_answer_count_trigger
AFTER INSERT OR DELETE ON public.answers
FOR EACH ROW
EXECUTE FUNCTION public.update_question_answer_count();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.questions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.answers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.announcements;