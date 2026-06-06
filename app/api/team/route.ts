import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

// GET - Aktif ekip üyelerini listele
export async function GET() {
  try {
    const { data: team, error } = await supabase
      .from('team')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(team);
  } catch (error) {
    console.error('Ekip üyeleri yüklenirken hata:', error);
    return NextResponse.json({ error: 'Ekip üyeleri yüklenemedi' }, { status: 500 });
  }
}
