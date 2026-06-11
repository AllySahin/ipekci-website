'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Star, CheckCircle, Clock, Users, Plane, Hotel, UtensilsCrossed, Heart, Shield, BookOpen, ArrowRight } from 'lucide-react';
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

export default function HacTurlariPage() {
  const { language } = useLanguage();
  const { t } = useTranslations();
  
  const tours: any[] = [];

  const hacInfo = [
    {
      icon: BookOpen,
      title: t('hajjPage.whatIsHajj'),
      description: t('hajjPage.whatIsHajjDesc')
    },
    {
      icon: Calendar,
      title: t('hajjPage.hajjPeriod'),
      description: t('hajjPage.hajjPeriodText')
    },
    {
      icon: MapPin,
      title: t('hajjPage.hajjPlaces'),
      description: t('hajjPage.hajjPlacesDesc')
    },
    {
      icon: Users,
      title: t('hajjPage.hajjConditions'),
      description: t('hajjPage.hajjConditionsDesc')
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-56" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/80 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
          alt="Hac Turları"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-6 text-center text-white">
          <div className="inline-block bg-gold/20 text-gold px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            {t('hajjPage.experience')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('tourPages.hajjTitle')}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            {t('hajjPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Hac Hakkında Genel Bilgi */}
      <section className="py-16 bg-gradient-to-b from-[#E8E0D5] to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">{t('hajjPage.aboutHajj')}</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              {t('hajjPage.aboutHajjDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {hacInfo.map((info, index) => (
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

      {/* Important Notice */}
      <section className="py-8 bg-gold/5 border-y border-gold/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-navy">{t('hajjPage.importantInfo')}</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>{t('hajjPage.hajjPeriod')}</strong> {t('hajjPage.hajjPeriodText')}</p>
                  <p><strong>{t('hajjPage.quota')}</strong> {t('hajjPage.quotaText')}</p>
                  <p><strong>{t('hajjPage.earlyReservation')}</strong> {t('hajjPage.earlyReservationText')}</p>
                  <p><strong>{t('hajjPage.requiredDocuments')}</strong> {t('hajjPage.requiredDocumentsText')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">{t('hajjPage.ourPackages')}</h2>
            <p className="text-gray-600 text-base">{t('umrahPage.ourPackagesDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-56">
                  <Image
                    src={tour.image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop'}
                    alt={tour.title_tr}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-gold text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg">
                    {tour.priceTag}
                  </div>
                  {tour.available && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                      {tour.quota} {language === 'ar' ? 'أشخاص متبقية' : language === 'en' ? 'Spots Left' : 'Kişi Kaldı'}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-2">{tour.title_tr}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-gold text-gold" />
                      <span className="font-semibold text-sm">{tour.rating}</span>
                    </div>
                    <span className="text-gray-500 text-xs">({tour.reviews} {language === 'ar' ? 'تقييم' : language === 'en' ? 'reviews' : 'değerlendirme'})</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gold" />
                      <span>{tour.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gold" />
                      <span>{tour.duration}</span>
                    </div>
                  </div>
                  
                  {/* Hotels */}
                  <div className="bg-[#F5F1E8] rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-sm text-navy mb-3 flex items-center gap-2">
                      <Hotel className="h-4 w-4 text-gold" />
                      {t('common.accommodationDetails')}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">{t('common.makkah')}:</span>
                        <p className="font-medium text-navy">{tour.hotels.mekke}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">{t('common.madinah')}:</span>
                        <p className="font-medium text-navy">{tour.hotels.medine}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">{t('hajjPage.mina')}</span>
                        <p className="font-medium text-navy">{tour.hotels.mina}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">{t('hajjPage.arafat')}</span>
                        <p className="font-medium text-navy">{tour.hotels.arafat}</p>
                      </div>
                    </div>
                  </div>

                  {/* Features - First 4 */}
                  <div className="mb-4">
                    <ul className="space-y-1.5">
                      {tour.features.slice(0, 4).map((feature: string, index: number) => (
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
                      <span className="text-2xl font-bold text-navy ml-1">{tour.price}</span>
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
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[#E8E0D5]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">{t('common.included')}</h2>
              <p className="text-gray-600 text-base">{t('hajjPage.includedDesc')}</p>
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
                    {t('hajjPage.transportationItem3')}
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
                    {t('hajjPage.accommodationItem1')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('hajjPage.accommodationItem2')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('hajjPage.accommodationItem3')}
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
                    {t('hajjPage.mealsItem1')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('hajjPage.mealsItem2')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('hajjPage.mealsItem3')}
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <Heart className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-bold text-navy">{t('hajjPage.services')}</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('hajjPage.servicesItem1')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('hajjPage.servicesItem2')}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {t('hajjPage.servicesItem3')}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-md border-2 border-gold/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-navy mb-2">{t('hajjPage.experienceAndTrust')}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {t('hajjPage.experienceText')}
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
