import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Website için anon key kullanıyoruz (RLS kuralları geçerli)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
