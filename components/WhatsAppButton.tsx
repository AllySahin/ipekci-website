'use client';

import { MessageCircle, Phone } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '905015377071'; // WhatsApp number
  const message = encodeURIComponent('Merhaba, umre turları hakkında bilgi almak istiyorum.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Phone Button */}
      <a
        href="tel:+905015377071"
        className="bg-navy hover:bg-navy/90 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Telefon ile ara"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-full mr-3 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Telefon ile ara
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="WhatsApp ile iletişime geç"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-full mr-3 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp ile iletişime geç
        </span>
      </a>
    </div>
  );
}
