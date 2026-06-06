import TourClient from './TourClient';
import supabase from '@/lib/supabase';
import { notFound } from 'next/navigation';

// Türkçe karakterleri slug'a çeviren fonksiyon
function slugify(text: string): string {
  const trMap: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'C',
    'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S',
    'ü': 'u', 'Ü': 'U'
  };

  return text
    .split('')
    .map(char => trMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Slug'dan ID'yi çıkar (format: "123-tur-adi")
  const tourId = parseInt(slug.split('-')[0]);

  if (isNaN(tourId)) {
    notFound();
  }

  // Veritabanından turu ID ile çek
  let tour;
  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('id', tourId)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    tour = data;
  } catch (error) {
    console.error('Veritabanı hatası:', error);
    // Veritabanı bağlantısı başarısız - fallback uyarı sayfası göster
    return (
      <div className="min-h-screen bg-gray-100 pt-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Veri Tabanı Bağlantı Hatası</h1>
          <p className="text-gray-600 mb-6">
            Şu anda tur detayları yüklenemiyor. Lütfen daha sonra tekrar deneyiniz.
          </p>
          <a href="/" className="inline-block bg-gold text-white px-6 py-3 rounded-lg hover:bg-gold/90 transition-colors font-semibold">
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    );
  }

  if (!tour) {
    notFound();
  }

  // jsonb alanları artık doğrudan nesne olarak geliyor, parse etmeye gerek yok
  const parsedTour = {
    ...tour,
    departure_date: new Date(tour.departure_date).toISOString().split('T')[0],
    return_date: new Date(tour.return_date).toISOString().split('T')[0],
  };

  return <TourClient tourData={parsedTour} />;
}
