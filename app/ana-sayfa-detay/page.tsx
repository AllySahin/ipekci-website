'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Users, Award, CheckCircle, Calendar, Clock, MapPin, Send, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslations } from '@/lib/useTranslations';

interface Comment {
  id: number;
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
}

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

export default function HomePage() {
  const { language } = useLanguage();
  const { t } = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [upcomingTours, setUpcomingTours] = useState<any[]>([]);
  const [slides, setSlides] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback örnek veriler kaldırıldı - sadece veritabanından gelenler gösterilecek
  const fallbackTours: any[] = [];

  const fallbackSlides: any[] = [];

  const stats = [
    { icon: Users, label_key: 'homePage.stats.happyGuests', value: '10.000+' },
    { icon: Award, label_key: 'homePage.stats.yearsExperience', value: '15+' },
    { icon: Star, label_key: 'homePage.stats.satisfaction', value: '%98' },
  ];

  // Veritabanından turları ve slider'ları çek
  useEffect(() => {
    async function fetchData() {
      try {
        // Turları çek
        const toursResponse = await fetch('/api/tours?featured=true&limit=3');
        if (toursResponse.ok) {
          const toursData = await toursResponse.json();
          if (toursData && toursData.length > 0) {
            setUpcomingTours(toursData);
          } else {
            setUpcomingTours(fallbackTours);
          }
        } else {
          setUpcomingTours(fallbackTours);
        }

        // Slider'ları çek
        const slidersResponse = await fetch('/api/sliders');
        if (slidersResponse.ok) {
          const slidersData = await slidersResponse.json();
          if (slidersData && slidersData.length > 0) {
            // Sadece aktif slider'ları göster
            const activeSliders = slidersData.filter((s: any) => s.is_active !== false);
            setSlides(activeSliders.length > 0 ? activeSliders : fallbackSlides);
          } else {
            setSlides(fallbackSlides);
          }
        } else {
          setSlides(fallbackSlides);
        }

        // Galeri görsellerini çek
        const galleryResponse = await fetch('/api/gallery?limit=5');
        if (galleryResponse.ok) {
          const galleryData = await galleryResponse.json();
          setGalleryImages(galleryData || []);
        }

        // Yorumları çek
        const commentsResponse = await fetch('/api/comments');
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          setComments(commentsData.slice(0, 6) || []); // İlk 6 yorumu al
        }
      } catch (error) {
        console.error('Veri yüklenirken hata:', error);
        setUpcomingTours(fallbackTours);
        setSlides(fallbackSlides);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Slider otomatik geçiş
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen pt-20 lg:pt-56" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section with Video and Slider */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60 z-10" />
              <Image
                src={slide.image}
                alt={slide.title_tr}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
            {/* Left Side - Text Content */}
            <div className="text-white">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
                  }`}
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    {language === 'ar' ? slide.title_ar : slide.title_tr}
                  </h1>
                  <p className="text-base md:text-lg mb-6 text-gray-200">
                    {language === 'ar' ? slide.subtitle_ar : slide.subtitle_tr}
                  </p>
                  {slide.link && (
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-lg font-semibold text-base hover:bg-gold/90 transition-all transform hover:scale-105"
                    >
                      {t('common.readMore')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side - YouTube Video (Fixed) */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl ring-4 ring-gold/30 ring-offset-4 ring-offset-transparent animate-pulse-slow">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/7-Qf3g-0xEI?autoplay=1&mute=1"
                    title="YouTube Canlı Yayın"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-4 py-1.5 rounded-lg font-semibold text-xs shadow-lg z-10">
                    {t('homePage.liveStream')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-gold'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Upcoming Tours */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">{t('homePage.upcomingTours.title')}</h2>
            <p className="text-gray-600 text-base">{t('homePage.upcomingTours.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            ) : (
              upcomingTours.map((tour) => {
                const formatDate = (dateString: string) => {
                  const date = new Date(dateString);
                  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
                };
                
                const formatPrice = (price: number) => {
                  return `$${price.toLocaleString('en-US')}`;
                };

                return (
                  <div key={tour.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative h-56">
                      <Image
                        src={tour.image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop'}
                        alt={tour.title_tr || `Tur ${tour.id}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-gold text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-lg">
                        {formatPrice(tour.price_2_person)}+
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gold" />
                          <span>{formatDate(tour.departure_date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-gold" />
                          <span>{tour.days} {t('upcomingTours.days')} / {tour.nights} {t('upcomingTours.nights')}</span>
                        </div>
                      </div>
                      
                      <div className="bg-[#F5F1E8] rounded-lg p-4 mb-6 space-y-2.5">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                          <div className="text-sm">
                            <span className="font-semibold text-navy">{t('upcomingTours.departure')}:</span>
                            <span className="text-gray-700 ml-2">{tour.departure_city}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm">
                            <span className="font-semibold text-navy">{t('upcomingTours.transfer')}:</span>
                            <span className="text-gray-700 ml-2">{tour.hotel_makkah} - {tour.hotel_madinah}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-navy mt-0.5 flex-shrink-0" />
                          <div className="text-sm">
                            <span className="font-semibold text-navy">{t('upcomingTours.return')}:</span>
                            <span className="text-gray-700 ml-2">{tour.departure_city}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gold text-xs">$</span>
                          <span className="text-2xl font-bold text-navy ml-1">{tour.price_2_person.toLocaleString('en-US')}</span>
                        </div>
                        <Link
                          href={`/tur/${tour.id}-${slugify(tour.title_tr)}`}
                          className="bg-navy text-white px-5 py-2 rounded-lg hover:bg-navy/90 transition-colors font-semibold text-xs"
                        >
                          {t('common.readMore')}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/umre-turlari"
              className="inline-flex items-center gap-2 text-navy font-semibold text-lg hover:text-gold transition-colors"
            >
              {t('homePage.upcomingTours.viewAll')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-3">{t('homePage.gallery.title')}</h2>
            <p className="text-gray-600 text-base">{t('homePage.gallery.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {galleryImages.length > 0 && galleryImages.map((item, index) => (
              <div key={item.id} className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title_tr}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/galeri"
              className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-navy/90 transition-all hover:scale-105"
            >
              {t('homePage.gallery.viewAll')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-[#E8E0D5] via-white to-[#f0e8d9]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-block bg-gold/20 text-gold px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
              {t('homePage.stats.yearsExperience').replace('Yıllık Tecrübe', '30 Yıllık Deneyim')}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">{t('homePage.whyChooseUs.title')}</h2>
            <p className="text-gray-600 text-base">{t('homePage.whyChooseUs.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Card 1 */}
            <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:border-2 hover:border-blue-500/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-navy text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <div className="h-1 w-16 bg-blue-500 rounded-full mb-3"></div>
                </div>
              </div>
              <h3 className="font-bold text-base text-navy mb-1.5">{t('homePage.whyChooseUs.feature1')}</h3>
              <p className="text-gray-600 text-xs mb-3">{t('whyUs.feature1.description')}</p>
              <div className="flex items-center gap-1 text-green-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">{t('homePage.guaranteed')}</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:border-2 hover:border-purple-500/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-navy text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <div className="h-1 w-16 bg-purple-500 rounded-full mb-3"></div>
                </div>
              </div>
              <h3 className="font-bold text-lg text-navy mb-2">{t('homePage.whyChooseUs.feature2')}</h3>
              <p className="text-gray-600 text-sm mb-3">{t('whyUs.feature2.description')}</p>
              <div className="flex items-center gap-1 text-green-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">{t('homePage.guaranteed')}</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:border-2 hover:border-orange-500/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-navy text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <div className="h-1 w-16 bg-orange-500 rounded-full mb-3"></div>
                </div>
              </div>
              <h3 className="font-bold text-lg text-navy mb-2">{t('homePage.whyChooseUs.feature3')}</h3>
              <p className="text-gray-600 text-sm mb-3">{t('whyUs.feature3.description')}</p>
              <div className="flex items-center gap-1 text-green-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">{t('homePage.guaranteed')}</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:border-2 hover:border-red-500/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-navy text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <div className="h-1 w-16 bg-red-500 rounded-full mb-3"></div>
                </div>
              </div>
              <h3 className="font-bold text-lg text-navy mb-2">{t('homePage.whyChooseUs.feature4')}</h3>
              <p className="text-gray-600 text-sm mb-3">{t('whyUs.feature4.description')}</p>
              <div className="flex items-center gap-1 text-green-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">{t('homePage.guaranteed')}</span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:border-2 hover:border-green-500/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-navy text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <div className="h-1 w-16 bg-green-500 rounded-full mb-3"></div>
                </div>
              </div>
              <h3 className="font-bold text-lg text-navy mb-2">{t('homePage.whyChooseUs.feature5')}</h3>
              <p className="text-gray-600 text-sm mb-3">{t('whyUs.feature5.description')}</p>
              <div className="flex items-center gap-1 text-green-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">{t('homePage.guaranteed')}</span>
              </div>
            </div>

            {/* Card 6 */}
            <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:border-2 hover:border-yellow-500/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-navy text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  6
                </div>
                <div className="flex-1">
                  <div className="h-1 w-16 bg-yellow-500 rounded-full mb-3"></div>
                </div>
              </div>
              <h3 className="font-bold text-lg text-navy mb-2">{t('homePage.whyChooseUs.feature6')}</h3>
              <p className="text-gray-600 text-sm mb-3">{t('whyUs.feature6.description')}</p>
              <div className="flex items-center gap-1 text-green-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">{t('homePage.guaranteed')}</span>
              </div>
            </div>

            {/* Card 7 */}
            <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:border-2 hover:border-cyan-500/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-navy text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  7
                </div>
                <div className="flex-1">
                  <div className="h-1 w-16 bg-cyan-500 rounded-full mb-3"></div>
                </div>
              </div>
              <h3 className="font-bold text-lg text-navy group-hover:text-gold mb-2 transition-colors">{t('homePage.whyChooseUs.feature7')}</h3>
              <p className="text-gray-600 text-sm mb-3">{t('whyUs.feature7.description')}</p>
              <div className="flex items-center gap-1 text-green-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">{t('homePage.guaranteed')}</span>
              </div>
            </div>

            {/* Card 8 */}
            <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:border-2 hover:border-blue-600/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-navy text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  8
                </div>
                <div className="flex-1">
                  <div className="h-1 w-16 bg-blue-600 rounded-full mb-3"></div>
                </div>
              </div>
              <h3 className="font-bold text-lg text-navy mb-2">{t('homePage.whyChooseUs.feature8')}</h3>
              <p className="text-gray-600 text-sm mb-3">{t('whyUs.feature8.description')}</p>
              <div className="flex items-center gap-1 text-green-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">{t('homePage.guaranteed')}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">{t('contactForm.subtitle').split(',')[0]}?</p>
            <Link
              href="/iletisim"
              className="inline-block bg-navy text-white px-8 py-3 rounded-lg hover:bg-navy/90 transition-colors font-semibold"
            >
              {t('common.contact')}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-[#f0e8d9]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="text-center mb-5">
              <h2 className="text-xl md:text-2xl font-bold text-navy mb-2">
                {t('contactForm.title')}
              </h2>
              <p className="text-gray-600 text-xs">
                {t('contactForm.subtitle')}
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-navy font-medium mb-1.5 text-sm">
                    {t('contactForm.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-navy font-medium mb-1.5 text-sm">
                    {t('contactForm.phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-navy font-medium mb-1.5 text-sm">
                    {t('contactForm.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-navy font-medium mb-1.5 text-sm">
                    {t('contactForm.date')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-navy font-medium mb-1.5 text-sm">
                  {t('contactForm.persons')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder={t('homePage.howManyPeople')}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-navy font-medium mb-1.5 text-sm">
                  {t('contactForm.message')}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                  placeholder={t('contactPage.messagePlaceholder')}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                    required
                  />
                  <span className="text-xs text-gray-700">
                    {t('contactForm.kvkk')}{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                  />
                  <span className="text-xs text-gray-700">
                    {t('contactForm.whatsappOpt')}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                {t('contactForm.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-3">{t('homePage.testimonials.title')}</h2>
            <p className="text-gray-600 text-base">{t('homePage.testimonials.subtitle')}</p>
          </div>

          {comments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-[#F5F1E8] rounded-xl p-5 relative transition-shadow hover:shadow-lg">
                  <Quote className="absolute top-4 right-4 h-10 w-10 text-gold/20" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-gold to-gold/70 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {comment.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-navy">{comment.name}</h3>
                      <div className="flex gap-0.5 mb-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < comment.rating ? 'fill-gold text-gold' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    {comment.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">{t('homePage.noComments')}</p>
            </div>
          )}

          <div className="text-center">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold font-semibold text-lg hover:text-gold/80 transition-colors"
            >
              <Star className="h-5 w-5 fill-gold" />
              {t('homePage.viewAllReviews')}
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navy to-navy/90 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('homePage.cta.title')}</h2>
          <p className="text-xl mb-8 text-gray-200">{t('homePage.cta.subtitle')}</p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold/90 transition-all transform hover:scale-105"
          >
            {t('homePage.cta.button')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
