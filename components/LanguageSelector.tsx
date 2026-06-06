'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { X, Globe } from 'lucide-react';
import FlagIcon from './FlagIcon';

interface LanguageSelectorProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function LanguageSelector({ isOpen: externalIsOpen, onClose: externalOnClose }: LanguageSelectorProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalOnClose ? externalOnClose : setInternalIsOpen;

  useEffect(() => {
    // İlk ziyarette modal açma - devre dışı bırakıldı
    // const hasSelectedLanguage = localStorage.getItem('language');
    // if (!hasSelectedLanguage) {
    //   setInternalIsOpen(true);
    // }
  }, []);

  const languages = [
    { code: 'tr' as const, name: 'Türkçe', countryCode: 'TR', flagCode: 'tr' as const },
    { code: 'en' as const, name: 'English', countryCode: 'EN', flagCode: 'gb' as const },
    { code: 'ar' as const, name: 'العربية', countryCode: 'AR', flagCode: 'sa' as const },
  ];

  const handleLanguageSelect = (lang: 'tr' | 'ar' | 'en') => {
    setLanguage(lang);
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={() => {
            if (externalOnClose) {
              externalOnClose();
            } else {
              setInternalIsOpen(false);
            }
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
            <Globe className="h-8 w-8 text-gold" />
          </div>
          <h2 className="text-2xl font-bold text-navy mb-2">Dil Seçimi</h2>
          <p className="text-gray-600">Lütfen bir dil seçin / اختر لغة / Choose a language</p>
        </div>

        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                language === lang.code
                  ? 'border-gold bg-gold/5'
                  : 'border-gray-200 hover:border-gold/50'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-12 flex-shrink-0">
                  <FlagIcon code={lang.flagCode} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-semibold text-gray-500 mb-1">{lang.countryCode}</span>
                  <span className={`text-lg font-bold ${
                    language === lang.code ? 'text-gold' : 'text-navy'
                  }`}>
                    {lang.name}
                  </span>
                </div>
              </div>
              {language === lang.code && (
                <div className="ml-auto bg-gold text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full mt-6 bg-gold text-white py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors"
        >
          Devam Et / استمر / Continue
        </button>
      </div>
    </div>
  );
}
