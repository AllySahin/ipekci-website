'use client';

import Image from 'next/image';
import { Calendar, Clock, MapPin, Plane, CheckCircle, X, Users, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function TourClient({ tourData }: { tourData: any }) {
  const [selectedPeople, setSelectedPeople] = useState(3);
  const { language } = useLanguage();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('en-US')}`;
  };

  const currentPrice = selectedPeople === 2 
    ? tourData.price_2_person 
    : selectedPeople === 3 
    ? tourData.price_3_person 
    : tourData.price_4_person;

  return (
    <div className="min-h-screen pt-20 lg:pt-56" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60 z-10" />
        <Image
          src={tourData.image}
          alt={language === 'ar' ? tourData.title_ar : tourData.title_tr}
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-6">
          <div className="max-w-3xl">
            {tourData.package_name_tr && (
              <div className="inline-block bg-gold text-white px-4 py-2 rounded-lg font-semibold text-sm mb-4">
                {language === 'ar' ? tourData.package_name_ar : tourData.package_name_tr}
              </div>
            )}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {language === 'ar' ? tourData.title_ar : tourData.title_tr}
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              {language === 'ar' ? tourData.description_ar : tourData.description_tr}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-[#F5F1E8]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <Calendar className="h-6 w-6 text-gold mx-auto mb-2" />
                  <div className="text-sm text-gray-600 mb-1">{language === 'ar' ? 'المغادرة' : 'Kalkış'}</div>
                  <div className="font-bold text-base text-navy">{formatDate(tourData.departure_date)}</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <Clock className="h-6 w-6 text-gold mx-auto mb-2" />
                  <div className="text-sm text-gray-600 mb-1">{language === 'ar' ? 'المدة' : 'Süre'}</div>
                  <div className="font-bold text-base text-navy">{tourData.days} {language === 'ar' ? 'يوم' : 'Gün'} / {tourData.nights} {language === 'ar' ? 'ليلة' : 'Gece'}</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <MapPin className="h-6 w-6 text-gold mx-auto mb-2" />
                  <div className="text-sm text-gray-600 mb-1">{language === 'ar' ? 'المدينة' : 'Şehir'}</div>
                  <div className="font-bold text-base text-navy">{tourData.departure_city}</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <Plane className="h-6 w-6 text-gold mx-auto mb-2" />
                  <div className="text-sm text-gray-600 mb-1">{language === 'ar' ? 'شركة الطيران' : 'Havayolu'}</div>
                  <div className="font-bold text-base text-navy">{tourData.airline}</div>
                </div>
              </div>

              {/* Hotels */}
              {(tourData.hotel_makkah || tourData.hotel_madinah || tourData.hotel_name) && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-gold" />
                    </div>
                    {language === 'ar' ? 'فنادق الإقامة' : 'Konaklama Oteli'}
                  </h2>
                  {tourData.hotel_makkah && tourData.hotel_madinah ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xs text-gray-600 mb-1">{language === 'ar' ? 'فندق مكة' : 'Mekke Oteli'}</h3>
                        <div className="font-bold text-base text-navy mb-1">{tourData.hotel_makkah}</div>
                        {tourData.kaaba_distance && (
                          <div className="text-sm text-teal">{tourData.kaaba_distance}m {language === 'ar' ? 'إلى الكعبة' : "Kabe'ye"}</div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xs text-gray-600 mb-1">{language === 'ar' ? 'فندق المدينة' : 'Medine Oteli'}</h3>
                        <div className="font-bold text-base text-navy mb-1">{tourData.hotel_madinah}</div>
                        {tourData.masjid_distance && (
                          <div className="text-sm text-teal">{tourData.masjid_distance}m {language === 'ar' ? 'إلى المسجد النبوي' : "Mescid-i Nebevi'ye"}</div>
                        )}
                      </div>
                    </div>
                  ) : tourData.hotel_name ? (
                    <div>
                      <h3 className="text-xs text-gray-600 mb-1">{language === 'ar' ? 'الفندق' : 'Otel'}</h3>
                      <div className="font-bold text-lg text-navy">{tourData.hotel_name}</div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Included */}
              {((language === 'ar' ? tourData.included_ar : tourData.included_tr) && (language === 'ar' ? tourData.included_ar : tourData.included_tr).length > 0) && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-navy mb-4">{language === 'ar' ? 'ما هو مشمول في السعر' : 'Fiyata Dahil Olanlar'}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(language === 'ar' ? tourData.included_ar : tourData.included_tr).map((item: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-base text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Not Included */}
              {((language === 'ar' ? tourData.excluded_ar : tourData.excluded_tr) && (language === 'ar' ? tourData.excluded_ar : tourData.excluded_tr).length > 0) && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-navy mb-4">{language === 'ar' ? 'ما هو غير مشمول في السعر' : 'Fiyata Dahil Olmayanlar'}</h2>
                  <div className="space-y-2">
                    {(language === 'ar' ? tourData.excluded_ar : tourData.excluded_tr).map((item: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <span className="text-base text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tour Program */}
              {((language === 'ar' ? tourData.itinerary_ar : tourData.itinerary_tr) && (language === 'ar' ? tourData.itinerary_ar : tourData.itinerary_tr).length > 0) && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-lg font-bold text-navy mb-4">{language === 'ar' ? 'برنامج الجولة' : 'Tur Programı'}</h2>
                  <div className="space-y-3">
                    {(language === 'ar' ? tourData.itinerary_ar : tourData.itinerary_tr).map((item: any, index: number) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-12 h-12 bg-gold text-white rounded-lg flex items-center justify-center font-bold text-base flex-shrink-0">
                          {item.day}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-navy mb-1">{item.title}</h3>
                          <p className="text-gray-600 text-base">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Pricing */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-lg">
                  <h3 className="text-xl font-bold text-navy mb-4">{language === 'ar' ? 'التسعير' : 'Fiyatlandırma'}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <button
                      onClick={() => setSelectedPeople(2)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        selectedPeople === 2
                          ? 'border-gold bg-[#FFF9E6]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gold" />
                        <span className="font-medium text-base text-navy">2 {language === 'ar' ? 'أشخاص' : 'Kişi'}</span>
                      </div>
                      <span className="font-bold text-gold text-lg">{formatPrice(tourData.price_2_person)}</span>
                    </button>
                    <button
                      onClick={() => setSelectedPeople(3)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        selectedPeople === 3
                          ? 'border-gold bg-[#FFF9E6]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gold" />
                        <span className="font-medium text-base text-navy">3 {language === 'ar' ? 'أشخاص' : 'Kişi'}</span>
                      </div>
                      <span className="font-bold text-gold text-lg">{formatPrice(tourData.price_3_person)}</span>
                    </button>
                    <button
                      onClick={() => setSelectedPeople(4)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        selectedPeople === 4
                          ? 'border-gold bg-[#FFF9E6]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gold" />
                        <span className="font-medium text-base text-navy">4 {language === 'ar' ? 'أشخاص' : 'Kişi'}</span>
                      </div>
                      <span className="font-bold text-gold text-lg">{formatPrice(tourData.price_4_person)}</span>
                    </button>
                  </div>

                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold text-base transition-colors flex items-center justify-center gap-2 mb-3">
                    <Phone className="h-5 w-5" />
                    {language === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp ile İletişim'}
                  </button>

                  <button className="w-full bg-navy hover:bg-navy/90 text-white py-3 rounded-lg font-semibold text-base transition-colors flex items-center justify-center gap-2">
                    <Mail className="h-5 w-5" />
                    {language === 'ar' ? 'احصل على معلومات' : 'Bilgi Al'}
                  </button>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      {language === 'ar' 
                        ? 'الأسعار للشخص الواحد وقد تختلف حسب مشاركة الغرفة. اتصل بنا للحصول على معلومات مفصلة.' 
                        : 'Fiyatlar kişi başı olup, oda paylaşımına göre değişkenlik gösterebilir. Detaylı bilgi için bizimle iletişime geçin.'}
                    </p>
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
