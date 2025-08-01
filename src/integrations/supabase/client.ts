// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hkbdwkzfzdvfmfqugeyg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrYmR3a3pmemR2Zm1mcXVnZXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDA0ODIsImV4cCI6MjA2ODM3NjQ4Mn0.JgB0iIJ3vf_E-SRXLLJMo8xYcF9SaT_1Y4O3bFekbkU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});