import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    let query = supabase
      .from('gallery')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true })
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: gallery, error } = await query;

    if (error) throw error;

    return NextResponse.json(gallery);
  } catch (error) {
    console.error('Galeri yüklenirken hata:', error);
    return NextResponse.json({ error: 'Galeri yüklenemedi' }, { status: 500 });
  }
}
