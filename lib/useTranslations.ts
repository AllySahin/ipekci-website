import { useLanguage } from './LanguageContext';
import trMessages from '@/messages/tr.json';
import arMessages from '@/messages/ar.json';
import enMessages from '@/messages/en.json';

type Messages = typeof trMessages;

const messages: Record<'tr' | 'ar' | 'en', Messages> = {
  tr: trMessages,
  ar: arMessages,
  en: enMessages as Messages,
};

export function useTranslations() {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return { t, language };
}
