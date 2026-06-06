'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Plane, Compass, MapPin, Palmtree, Info, Mail, Instagram, Facebook, X, Image, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useState } from 'react';
import FlagIcon from './FlagIcon';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const menuItems = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/umre-turlari', label: t('nav.umrah'), icon: Plane },
    { href: '/hac-turlari', label: t('nav.hajj'), icon: Plane },
    { href: '/kultur-turlari', label: t('nav.cultural'), icon: Palmtree },
    { href: '/hakkimizda', label: t('nav.about'), icon: Info },
    { href: '/galeri', label: t('nav.gallery'), icon: Image },
    { href: '/iletisim', label: t('nav.contact'), icon: Mail },
  ];

  const languages = [
    { code: 'tr' as const, name: 'Türkçe', flagCode: 'tr' as const },
    { code: 'ar' as const, name: 'العربية', flagCode: 'sa' as const },
    { code: 'en' as const, name: 'English', flagCode: 'gb' as const },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 top-20"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`group fixed left-0 top-20 lg:top-56 bottom-0 bg-[#192332] text-white overflow-y-auto shadow-xl transition-all duration-300 scrollbar-hide z-50 ${
        isOpen 
          ? 'w-64 translate-x-0' // Mobile open
          : 'w-16 -translate-x-full lg:translate-x-0 lg:hover:w-64' // Mobile closed, desktop normal
      }`}>
        {/* Close button for mobile */}
        {isOpen && (
          <div className="lg:hidden flex justify-end p-2">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Menüyü Kapat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

      <nav className="p-2">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#34495E] text-white'
                      : 'text-gray-300 hover:bg-[#34495E] hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${
                    isOpen ? 'mx-0' : 'mx-auto lg:group-hover:mx-0'
                  }`} />
                  <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Language Selector */}
      <div className={`px-2 py-3 border-t border-white/10 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
      }`}>
        <button
          onClick={() => setShowLangMenu(!showLangMenu)}
          className="flex items-center gap-4 px-3 py-3 rounded-lg transition-all text-gray-300 hover:bg-[#34495E] hover:text-white w-full"
        >
          <Globe className={`h-5 w-5 flex-shrink-0 ${
            isOpen ? 'mx-0' : 'mx-auto lg:group-hover:mx-0'
          }`} />
          <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
          }`}>
            {languages.find(l => l.code === language)?.name}
          </span>
        </button>
        
        {showLangMenu && (
          <div className="mt-2 space-y-1 pl-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setShowLangMenu(false);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all w-full text-left ${
                  language === lang.code
                    ? 'bg-gold/20 text-gold'
                    : 'text-gray-400 hover:bg-[#34495E] hover:text-white'
                }`}
              >
                <div className="w-8 h-6 flex-shrink-0">
                  <FlagIcon code={lang.flagCode} />
                </div>
                <span className="text-sm">{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Social Media - Footer */}
      <div className={`absolute bottom-0 left-0 right-0 p-2 border-t border-white/10 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'
      }`}>
        <div className="flex items-center gap-3 px-2">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gold transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gold transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <span className="text-sm text-[#5DADE2] ml-2 whitespace-nowrap">Bizi Takip Edin</span>
        </div>
      </div>
    </aside>
    </>
  );
}
