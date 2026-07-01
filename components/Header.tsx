'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, Menu, Globe } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import { useLanguage } from '@/lib/LanguageContext';
import FlagIcon from './FlagIcon';

interface HeaderProps {
  onMenuClick?: () => void;
  onLanguageClick?: () => void;
}

export default function Header({ onMenuClick, onLanguageClick }: HeaderProps) {
  const { language, setLanguage } = useLanguage();
  
  const languages = [
    { code: 'tr' as const, flagCode: 'tr' as const },
    { code: 'en' as const, flagCode: 'gb' as const },
    { code: 'ar' as const, flagCode: 'sa' as const },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-sm border-b border-gray-200" style={{ backgroundColor: '#35509a' }}>
        {/* Mobile Header */}
        <div className="lg:hidden h-20 px-4 flex items-center justify-center relative">
          {/* Logo - Centered */}
          <Link href="/" className="flex items-center">
            <div className="relative w-60 h-16">
              <Image
                src="/images/ipekci-logo.png"
                alt="İpekci Turizm"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          
          {/* Hamburger Menu - Absolute Right */}
          <button
            onClick={onMenuClick}
            className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Menüyü aç"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:grid h-56 px-6 grid-cols-3 items-center gap-4">
          {/* Left - TR Logo and Language Selector */}
          <div className="flex flex-col items-start justify-center gap-1 pl-6">
            <div className="relative w-52 h-32 pointer-events-none">
              <Image
                src="/images/tr.png"
                alt="TR"
                fill
                className="object-contain"
              />
            </div>
            
            {/* Language Selector */}
            <div className="flex gap-1.5 w-52 relative z-10">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    console.log('Changing language to:', lang.code);
                    setLanguage(lang.code);
                  }}
                  className={`relative px-2.5 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 flex-1 ${
                    language === lang.code
                      ? 'bg-gold text-white shadow-lg'
                      : 'bg-white text-navy hover:bg-white/90 hover:shadow-md'
                  }`}
                >
                  <div className="w-6 h-5 flex-shrink-0">
                    <FlagIcon code={lang.flagCode} />
                  </div>
                  <span className="text-xs font-bold">
                    {lang.code.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Logo - Centered */}
          <Link href="/" className="h-full py-6 group flex justify-center">
            <div className="relative h-full aspect-[10/1] group-hover:opacity-90 transition-opacity">
              <Image
                src="/images/ipekci-logo.png"
                alt="İpekci Turizm"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          
          {/* Right - Ayet */}
          <div className="flex items-center justify-end h-full py-12 pr-6">
            <div className="text-white text-right max-w-xs">
              <p className="text-base leading-relaxed opacity-90 italic">
                "Safâ ile Merve Allah'ın nişânelerindendir; dolayısıyla hac veya umre yaparak Beytullah'ı ziyaret eden bir kimsenin bu yerleri tavaf etmesinde kendisi için bir günah yoktur."
              </p>
              <p className="text-sm mt-3 opacity-75">Bakara Suresi 158</p>
            </div>
          </div>
        </div>
      </header>

      <WhatsAppButton />
    </>
  );
}

