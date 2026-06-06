'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users, Star, CheckCircle, Clock, Plane, Hotel, UtensilsCrossed, Heart, BookOpen, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslations } from '@/lib/useTranslations';

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

export default function UmreTurlariPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const { t } = useTranslations();

  // Fallback örnek veriler kaldırıldı - sadece veritabanından gelenler gösterilecek
  const fallbackTours: any[] = [];

  // Veritabanından umre turlarını çek
  useEffect(() => {
    async function fetchTours() {
      try {
        const response = await fetch('/api/tours?category=Umre');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setTours(data);
          } else {
            setTours(fallbackTours);
          }
        } else {
          setTours(fallbackTours);
        }
      } catch (error) {
        console.error('Umre turları yüklenirken hata:', error);
        setTours(fallbackTours);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  const umreInfo = [
    {
      icon: BookOpen,
      title: t('umrahPage.whatIsUmrah'),
      description: t('umrahPage.whatIsUmrahDesc')
    },
    {
      icon: MapPin,
      title: t('umrahPage.holyPlaces'),
      description: t('umrahPage.holyPlacesDesc')
    },
    {
      icon: Calendar,
      title: t('umrahPage.bestTimes'),
      description: t('umrahPage.bestTimesDesc')
    },
    {
      icon: Heart,
      title: t('umrahPage.spiritualValue'),
      description: t('umrahPage.spiritualValueDesc')
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-56" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/80 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=1080&fit=crop"
          alt="Umre Turları"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <div className="inline-block bg-gold/20 text-gold px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            {t('umrahPage.experience')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('tourPages.umrahTitle')}</h1>
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <p className="text-base md:text-lg leading-relaxed text-gray-100">
              {t('umrahPage.introText')}
            </p>
          </div>
        </div>
      </section>

      {/* Umre Hakkında Genel Bilgi */}
      <section className="py-16 bg-gradient-to-b from-[#E8E0D5] to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">{t('umrahPage.aboutUmrah')}</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              {t('umrahPage.aboutUmrahDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {umreInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <info.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-bold text-lg text-navy mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medine Hakkında Bölüm */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop"
                  alt="Medine"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {t('umrahPage.medina')}
                </div>
                <h2 className="text-3xl font-bold text-navy mb-6">
                  {t('umrahPage.prophetCity')}
                </h2>
                <div className="prose prose-lg">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t('umrahPage.medinaText1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('umrahPage.medinaText2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16 bg-gradient-to-b from-[#F5F1E8] to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">{t('umrahPage.ourPackages')}</h2>
            <p className="text-gray-600 text-base">{t('umrahPage.ourPackagesDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {loading ? (
              // Loading skeleton
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            ) : (
              tours.map((tour) => {
                const formatDate = (dateString: string) => {
                  const date = new Date(dateString);
                  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
                };
                
                const formatPrice = (price: number) => {
                  return price.toLocaleString('tr-TR');
                };

                return (
                  <div key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative h-56">
                      <Image
                        src={tour.image || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop'}
                        alt={(language === 'ar' ? tour.title_ar : tour.title_tr) || `Tur ${tour.id}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-gold text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg">
                        ₺{formatPrice(tour.price_2_person)}+
                      </div>
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                        {t('common.available')}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-navy mb-2">{language === 'ar' ? tour.title_ar : tour.title_tr}</h3>

                      <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gold" />
                          <span>{formatDate(tour.departure_date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-gold" />
                          <span>{tour.days} {t('umrahPage.days')} / {tour.nights} {t('umrahPage.nights')}</span>
                        </div>
                      </div>
                      
                      {/* Hotels */}
                      <div className="bg-[#F5F1E8] rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-sm text-navy mb-3 flex items-center gap-2">
                          <Hotel className="h-4 w-4 text-gold" />
                          {t('common.accommodationDetails')}
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-gray-500">{t('common.makkah')}:</span>
                            <p className="font-medium text-navy">{tour.hotel_makkah}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">{t('common.madinah')}:</span>
                            <p className="font-medium text-navy">{tour.hotel_madinah}</p>
                          </div>
                        </div>
                      </div>

                      {/* Features - First 4 */}
                      <div className="mb-4">
                        <ul className="space-y-1.5">
                          {(language === 'ar' ? tour.included_ar : tour.included_tr) && (language === 'ar' ? tour.included_ar : tour.included_tr).slice(0, 4).map((feature: string, index: number) => (
                            <li key={index} className="flex items-center gap-2 text-xs text-gray-600">
                              <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-gold text-xs">₺</span>
                          <span className="text-2xl font-bold text-navy ml-1">{formatPrice(tour.price_2_person)}</span>
                        </div>
                        <Link
                          href={`/tur/${tour.id}-${slugify(tour.title_tr)}`}
                          className="bg-navy text-white px-5 py-2 rounded-lg hover:bg-navy/90 transition-colors font-semibold text-xs flex items-center gap-2"
                        >
                          {t('common.detailedInfo')}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[#E8E0D5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">{t('common.included')}</h2>
              <p className="text-gray-600 text-base">{t('common.includedDesc')}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <Plane className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-bold text-navy">{t('umrahPage.transportation')}</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.transportationItem1')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.transportationItem2')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.transportationItem3')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.transportationItem4')}
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <Hotel className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-bold text-navy">{t('umrahPage.accommodation')}</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.accommodationItem1')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.accommodationItem2')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.accommodationItem3')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.accommodationItem4')}
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <UtensilsCrossed className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-bold text-navy">{t('umrahPage.meals')}</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.mealsItem1')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.mealsItem2')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.mealsItem3')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.mealsItem4')}
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <Heart className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-bold text-navy">{t('umrahPage.guidance')}</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.guidanceItem1')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.guidanceItem2')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.guidanceItem3')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('umrahPage.guidanceItem4')}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-md border-2 border-gold/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-navy mb-2">{t('umrahPage.happyGuests')}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {t('umrahPage.happyGuestsText')}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <a 
                      href="tel:+905001234567" 
                      className="text-gold font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>+90 500 123 45 67</span>
                    </a>
                    <span className="text-gray-400">|</span>
                    <a 
                      href="mailto:info@ipekci.com" 
                      className="text-gold font-semibold hover:underline"
                    >
                      info@ipekci.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
