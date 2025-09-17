import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://uvvqdbbuadlupdhffach.supabase.co";  
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dnFkYmJ1YWRsdXBkaGZmYWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NDUwOTYsImV4cCI6MjA1OTAyMTA5Nn0.92w1291JsjEGZ0BAKgXej2UOdYdCorwFlzwXvvdOi5M";  

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
