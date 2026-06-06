import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

// GET - Sadece onaylanmış yorumları getir
export async function GET() {
  try {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('is_approved', true)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Yorumlar yüklenirken hata:', error);
    return NextResponse.json({ error: 'Yorumlar yüklenemedi' }, { status: 500 });
  }
}

// POST - Yeni yorum ekle (onaysız olarak)
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.comment) {
      return NextResponse.json(
        { error: 'Ad ve yorum zorunludur' },
        { status: 400 }
      );
    }

    const { data: comment, error } = await supabase
      .from('comments')
      .insert({
        name: data.name,
        email: data.email || null,
        comment: data.comment,
        rating: data.rating || 5,
        is_approved: false,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Yorumunuz alındı! Onaylandıktan sonra yayınlanacaktır.',
      comment
    }, { status: 201 });
  } catch (error) {
    console.error('Yorum eklenirken hata:', error);
    return NextResponse.json({ error: 'Yorum eklenemedi' }, { status: 500 });
  }
}
