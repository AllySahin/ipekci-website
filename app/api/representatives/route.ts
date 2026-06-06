import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

// GET - Aktif temsilcileri getir
export async function GET() {
  try {
    const { data: representatives, error } = await supabase
      .from('representatives')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true })
      .order('city', { ascending: true });

    if (error) throw error;

    return NextResponse.json(representatives);
  } catch (error) {
    console.error('Temsilciler getirilirken hata:', error);
    return NextResponse.json({ error: 'Temsilciler getirilirken bir hata oluştu' }, { status: 500 });
  }
}
