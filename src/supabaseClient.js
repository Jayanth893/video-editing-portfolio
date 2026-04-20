import { createClient } from '@supabase/supabase-js'

// --- SETUP INSTRUCTIONS ---
// 1. Go to https://supabase.com/
// 2. Create a project and get your URL and Anon Key from Settings > API
// 3. Create a table named "projects" with columns: id (int8), title (text), category (text), img (text), video (text)
// ---------------------------

const supabaseUrl = 'https://mzpqzollwtiplwgwxics.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16cHF6b2xsd3RpcGx3Z3d4aWNzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY1NjY5MiwiZXhwIjoyMDkyMjMyNjkyfQ.AU7VuNFSo5dfD661_19Z0xfcuYNlnmFHSLS3-k9T1gU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
