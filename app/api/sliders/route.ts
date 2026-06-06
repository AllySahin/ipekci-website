import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET() {
  try {
    const { data: sliders, error } = await supabase
      .from('sliders')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true });

    if (error) throw error;

    return NextResponse.json(sliders);
  } catch (error) {
    console.error('Slider getirme hatası:', error);
    return NextResponse.json({ error: 'Sliderlar yüklenemedi' }, { status: 500 });
  }
}
