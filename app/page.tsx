'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<'tr' | 'en' | 'ar'>(language);

  const content = {
    tr: {
      heading: "Abdullah İPEKCİ",
      section1: {
        title: "Hayatı",
        text: "Abdullah İPEKCİ 1983 yılında KIRIKKALE ilinde dünyaya gelmiştir. Kırıkkale Üniversitesi İktisadi ve İdari Bilimler Fakültesi İşletme bölümü mezunu olup, 1965 yılında Konya'dan Kırıkkale'ye göç eden Huğlu Tüfekleri'nin kurucularından Abdullah İPEKCİ'nin torunudur."
      },
      section2: {
        title: "Şirket Kuruluşu",
        text: "2009 yılında sermayesiz olarak kurduğu şirketini, küçük bir ofiste İpekci Turizm ve Seyahat Acentası adı altında hayata geçirmiştir. İpekci Turizm, hizmet vermeye başladığı günden itibaren güler yüzü, kaliteli hizmetinde ekonomik olabileceğini göstererek hızla yol almış farklı illerde ve farklı sektörlerde bir çok şubesini hayata geçirerek ciddi bir büyüme yakalamıştır."
      },
      section3: {
        title: "Belgeler ve Hedefler",
        text: "Türkiye'nin en seçkin seyahat acentalarının sahip olabileceği IATA ve TÜRSAB belgelerine sahip olan İpekci Turizm ve Seyahat Acentası bu belgeler ve ciddi projelerle bir kez daha büyümüş, bugüne kadar ki başarılarına başarı katmaya devam etmiştir. İpekci Turizm, misafirlerine Türkiye'nin dört bir yanından en kaliteli hizmeti sunmayı hedeflemiştir."
      },
      button: "Siteye Devam Et"
    },
    en: {
      heading: "Abdullah IPEKCI",
      section1: {
        title: "Life",
        text: "Abdullah IPEKCI has born in 1983 Kırıkkale. He has graduated Kırıkkale University Faculty of Economics and Administrative Sciences Business Section: he is grandson of Abdullah Ipekci, who is one of the founder of Huglu Rifle and migrated from Konya to Kırıkkale."
      },
      section2: {
        title: "Company Establishment",
        text: "He established a Ipekci Turizm Company in a small Office with wide ideas without a big capital in 2009, From the establihment date Ipekci Turizm shown that service sector also has genial and quality service with economical solutions, fast way to get in different cities with agents in different sectors and grown up with ideas."
      },
      section3: {
        title: "Certificates and Goals",
        text: "Ipekci Turizm has been awarded with TURSAB and IATA certificates which are high standart Tourism agents: due to these high standart services grown up and succeed in a short period of time with brilliant ideas. Ipekci Turizm hosted their clients not only in Turket but also all around the world."
      },
      button: "Continue to Site"
    },
    ar: {
      heading: "عبدالله إيبكجي",
      section1: {
        title: "الحياة",
        text: "ولد عبدالله إيبكجي في قريق قلعة عام ١٩٨٣، وهو خريج قسم ادارة الأعمال كلية العلوم الادارية والاقتصادية في جامعة قريق قلعة وحفيد السيد عبدالله إيبكجي احد مؤسسي بنادق هو غلو والذي هاجر من قونيا الى قريق قلعة سنة ١٩٦٠."
      },
      section2: {
        title: "تأسيس الشركة",
        text: "وقد أسس شركته سنة ٢٠٠٩ بدون رأس مال إذ انطلق بمشروعه من مكتب صغير تحت مسمى إيبكجي للسياحة وكالة للسفر، ومنذ اليوم الاول الذي بدأت فيه إيبكجي للسياحة لتقديم خدماتها اظهرت بوجوهها البشوش وخدمتها ذات الجودة بأنها ستكون اقتصادية وأخذت بالتقدم بسرعة وأحرزت نموا حقيقيا من خلال افتتاحها للعديد من الأفرع في المدن المختلفة."
      },
      section3: {
        title: "الشهادات والأهداف",
        text: "وقد حازت وكالة إيبكجي للسياحة والسفر على شهادات IATA و TURSAB التي تستطيع وكالات السياحة الأكثر تميزا في تركيا فقط من امتلاكها وهي بهذه الشهادات وبمشاريع الجادة قد أحرزت نموا جديدا وأضافت نجاحا آخرا الى نجاحاتها التي حققتها حتى الآن. ولقد هدفت الى تقديم أكثر الخدمات جودة لضيوفها القادمين من جميع أنحاء تركيا."
      },
      button: "متابعة إلى الموقع"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1ea] via-[#faf8f4] to-[#f0ebe3] pt-20 lg:pt-56">
      <div className="container mx-auto px-6 py-8">
        {/* Main Grid Layout - Content Left, Image + Button Right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left Side - All Text Content (3 columns) */}
          <div className={`lg:col-span-3 space-y-8 ${language === 'ar' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {/* Heading */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-2">
                {content[language].heading}
              </h1>
              <div className="w-24 h-1 bg-gold mt-4"></div>
            </div>
            
            {/* Section 1 - Life */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy mb-4">
                {content[language].section1.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {content[language].section1.text}
              </p>
            </div>

            {/* Section 2 - Company Establishment */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy mb-4">
                {content[language].section2.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {content[language].section2.text}
              </p>
            </div>

            {/* Section 3 - Certificates and Goals */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-navy mb-4">
                {content[language].section3.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {content[language].section3.text}
              </p>
            </div>
          </div>

          {/* Right Side - Image and Button (2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative w-full aspect-[3/4]">
              <Image
                src="/images/abdullah-ipekci.png"
                alt="Abdullah İpekci"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="/ana-sayfa-detay"
                className="w-full flex items-center justify-center gap-2 bg-gold text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-gold/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                {content[language].button}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
