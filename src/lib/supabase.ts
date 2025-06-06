import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// Client for public operations (using anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role key for admin operations
export const adminSupabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Type definitions for contact form data
export interface ContactFormData {
  id?: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  status?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}
