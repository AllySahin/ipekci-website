
import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

// GET - Tüm galeri kategorilerini getir (turlardan ve gallery_categories tablosundan)
export async function GET() {
  try {
    // Turlardan unique kategorileri çek
    const { data: tours, error: toursError } = await supabase
      .from('tours')
      .select('category')
      .eq('is_active', true);

    if (toursError) throw toursError;

    // gallery_categories tablosundan da eklenenleri çek
    const { data: galleryCategories, error: catError } = await supabase
      .from('gallery_categories')
      .select('*');

    if (catError) throw catError;

    // Turlardan ve gallery_categories'den gelenleri birleştir, tekrarları ayıkla
    const allCategories = [
      ...(tours || []).map((tour) => ({
        value: tour.category.toLowerCase()
          .replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i')
          .replace(/ğ/g, 'g').replace(/ç/g, 'c').replace(/ö/g, 'o'),
        label: tour.category,
      })),
      ...(galleryCategories || []).map((cat) => ({ value: cat.value, label: cat.label }))
    ];

    // Tekrarları ayıkla
    const uniqueCategories = Array.from(
      new Map(allCategories.map((cat) => [cat.value, cat])).values()
    );

    return NextResponse.json(uniqueCategories);
  } catch (error) {
    console.error('Kategoriler yüklenirken hata:', error);
    return NextResponse.json({ error: 'Kategoriler yüklenemedi' }, { status: 500 });
  }
}
