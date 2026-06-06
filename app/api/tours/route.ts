import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let query = supabase
      .from('tours')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: tours, error } = await query;

    if (error) throw error;

    return NextResponse.json(tours);
  } catch (error) {
    console.error('Turları getirme hatası:', error);
    return NextResponse.json({ error: 'Turlar yüklenemedi' }, { status: 500 });
  }
}
