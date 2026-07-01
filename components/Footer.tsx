'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useTranslations } from '@/lib/useTranslations';

export default function Footer() {
  const { t } = useTranslations();
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6 bg-white p-4 rounded-lg inline-block">
              <div className="relative w-40 h-16">
                <Image
                  src="/images/ipekci-logo.png"
                  alt="İpekci Turizm"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Güvenilir ve kaliteli hizmet anlayışımızla, unutulmaz seyahat deneyimleri sunuyoruz.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li><Link href="/umre-turlari" className="text-gray-400 hover:text-gold transition-colors">{t('nav.umrah')}</Link></li>
              <li><Link href="/hac-turlari" className="text-gray-400 hover:text-gold transition-colors">{t('nav.hajj')}</Link></li>
              <li><Link href="/kultur-turlari" className="text-gray-400 hover:text-gold transition-colors">{t('nav.cultural')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.corporate')}</h3>
            <ul className="space-y-2">
              <li><Link href="/hakkimizda" className="text-gray-400 hover:text-gold transition-colors">{t('nav.about')}</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-gold transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <a href="tel:+903182248282" className="text-gray-400 hover:text-gold transition-colors">(0318) 224 82 82</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <a href="mailto:ipekciturizmacenta@gmail.com" className="text-gray-400 hover:text-gold transition-colors">ipekciturizmacenta@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <a 
                  href="https://www.google.com/maps/dir//%C4%B0pekci+Turizm+Hac+ve+Umre+Acentas%C4%B1,+Ovac%C4%B1k,+H%C3%BCrriyet+Cd.+NO+:+32%5CC,+71200+K%C4%B1r%C4%B1kkale+Merkez%2FK%C4%B1r%C4%B1kkale/@39.8798958,33.4700523,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4081df4cf1753563:0x5f1464515f20e1eb!2m2!1d33.5034731!2d39.8422221?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold transition-colors"
                >
                  {t('footer.address')}
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} İpekci Turizm. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
