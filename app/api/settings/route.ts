import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side client using service role key to bypass RLS for public settings reading
const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  try {
    const { data: settings, error } = await supabaseServer
      .from('settings')
      .select('*');

    if (error) throw error;

    // Map to key-value object
    const settingsObj: { [key: string]: string } = {};
    (settings || []).forEach((setting) => {
      // Exclude sensitive credentials for security
      if (
        setting.key !== 'netgsm_username' &&
        setting.key !== 'netgsm_password'
      ) {
        settingsObj[setting.key] = setting.value;
      }
    });

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error('Settings fetch error:', error);
    return NextResponse.json({ error: 'Ayarlar yüklenemedi' }, { status: 500 });
  }
}
