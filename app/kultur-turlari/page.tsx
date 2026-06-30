'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Star, CheckCircle, Clock, Plane, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/useTranslations';
import BookComponent from '../umre-turlari/BookComponent';

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

interface Tour {
  id: number;
  title_tr: string;
  description_tr: string;
  category: string;
  departure_city: string;
  departure_date: string;
  return_date: string;
  days: number;
  nights: number;
  price_2_person: number;
  price_3_person: number;
  price_4_person: number;
  airline: string;
  hotel_name: string;
  image: string;
  package_name_tr: string;
  included_tr: string[];
  excluded_tr: string[];
  itinerary_tr: { day: number; title: string; description: string }[];
  isActive: boolean;
  featured: boolean;
}

export default function KulturTurlariPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslations();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('/api/tours?category=Kültür');
        const data = await response.json();
        console.log('Fetched tours:', data);
        setTours(data);
      } catch (error) {
        console.error('Turlar yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-56">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/70 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1549144511-f099e773c147?w=1920&h=800&fit=crop"
          alt="Kültür Turları"
          fill
          className="object-cover"
        />
        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-4">{t('tourPages.culturalTitle')}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {t('culturalPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-navy mb-8 text-center">{t('culturalPage.aboutTitle')}</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t('culturalPage.intro1')}
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {t('culturalPage.intro2')}
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
                    <Plane className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="font-bold text-navy mb-2">{t('culturalPage.comfortableTransport')}</h4>
                  <p className="text-sm text-gray-600">
                    {t('culturalPage.comfortableTransportDesc')}
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="font-bold text-navy mb-2">{t('culturalPage.expertGuides')}</h4>
                  <p className="text-sm text-gray-600">
                    {t('culturalPage.expertGuidesDesc')}
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
                    <Star className="h-8 w-8 text-gold" />
                  </div>
                  <h4 className="font-bold text-navy mb-2">{t('culturalPage.fiveStarHotels')}</h4>
                  <p className="text-sm text-gray-600">
                    {t('culturalPage.fiveStarHotelsDesc')}
                  </p>
                </div>
              </div>

              {/* PDF Book Section (Kültür Turları) */}
              <div className="my-16">
                <div className="text-center mb-8">
                  <div className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    Kültür Turları Katalog
                  </div>
                  <h2 className="text-3xl font-bold text-navy mb-4">
                    Kültür Turları Kataloğumuz
                  </h2>
                  <p className="text-gray-600 text-base max-w-2xl mx-auto">
                    Kültür turlarımızın detaylı bilgilerini içeren kataloğumuzu inceleyebilirsiniz.
                  </p>
                </div>
                <div className="max-w-5xl mx-auto">
                  <BookComponent imagePrefix="/kultur_images/" totalPages={25} imageExtension=".jpeg" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-gold/90 to-gold text-white p-8 rounded-xl my-8">
                <h3 className="text-2xl font-bold mb-4">{t('culturalPage.uniqueMapTitle')}</h3>
                <p className="mb-4 leading-relaxed">
                  {t('culturalPage.uniqueMapText')}
                </p>
              </div>

              <div className="bg-gradient-to-r from-navy to-navy/90 text-white p-8 rounded-xl my-8">
                <h3 className="text-2xl font-bold mb-4">{t('culturalPage.natureToursTitle')}</h3>
                <p className="mb-4 leading-relaxed">
                  {t('culturalPage.natureToursText')}
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-8 rounded-xl my-8">
                <h3 className="text-2xl font-bold mb-4">{t('culturalPage.everyCornerTitle')}</h3>
                <p className="leading-relaxed">
                  {t('culturalPage.everyCornerText')}
                </p>
              </div>

              <p className="text-gray-700 text-center">
                {t('culturalPage.detailContact')} <Link href="/iletisim" className="text-gold font-semibold hover:underline">{t('culturalPage.contactUs')}</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-navy mb-8 text-center">{t('culturalPage.ourToursTitle')}</h2>
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div>
              <p className="mt-4 text-gray-600">{t('culturalPage.loading')}</p>
            </div>
          ) : tours.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">{t('culturalPage.noTours')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {tours.map((tour) => (
                <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Image */}
                  <div className="relative h-64">
                    <Image
                      src={tour.image}
                      alt={tour.title_tr}
                      fill
                      className="object-cover"
                    />
                    {tour.featured && (
                      <div className="absolute top-4 right-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {t('culturalPage.popular')}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-navy mb-3">{tour.title_tr}</h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{tour.description_tr}</p>

                    {/* Info Row */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gold" />
                        <span>{tour.days} {t('culturalPage.day')} {tour.nights} {t('culturalPage.night')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gold" />
                        <span>{tour.departure_city}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gold">
                          {tour.price_2_person.toLocaleString('tr-TR')}₺
                        </span>
                        <span className="text-sm text-gray-500">2 {t('culturalPage.person2')}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        3 {t('culturalPage.person2')}: {tour.price_3_person.toLocaleString('tr-TR')}₺ | 
                        4 {t('culturalPage.person2')}: {tour.price_4_person.toLocaleString('tr-TR')}₺
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">{t('culturalPage.packageContent')}</h4>
                      <ul className="space-y-1">
                        {tour.included_tr.slice(0, 4).map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                        {tour.included_tr.length > 4 && (
                          <li className="text-sm text-gold">+{tour.included_tr.length - 4} {t('culturalPage.more')}</li>
                        )}
                      </ul>
                    </div>

                    {/* Button */}
                    <Link
                      href={`/tur/${tour.id}-${slugify(tour.title_tr)}`}
                      className="block text-center bg-navy text-white py-3 rounded-lg hover:bg-navy/90 transition-colors font-semibold"
                    >
                      {t('culturalPage.viewDetails')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
